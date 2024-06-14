import json
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load training data
with open('AllGamesConsolidated.json', 'r') as f:
    data = json.load(f)
df = pd.DataFrame(data)

# Check for missing values
print(df.isnull().sum())

# Identify columns with mixed data types
for col in df.columns:
    if df[col].apply(type).nunique() > 1:
        print(f"Column '{col}' has mixed data types.")

# Handle mixed data types
for col in df.columns:
    if df[col].apply(type).nunique() > 1:
        df[col] = df[col].astype(str)

# Fill missing values for numeric columns
numeric_cols = df.select_dtypes(include=['number']).columns
df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].mean())

# Encode categorical variables
df = pd.get_dummies(df, drop_first=True)

# Normalize numerical features
numerical_features = ['formulaawayWinPercentage', 'awaySeriesPercentage', 'awayNextWinningPercentage', 'formulahomeWinPercentage', 'homeSeriesPercentage', 'homeNextWinningPercentage', 'awayTotalPercentage', 'homeTotalPercentage', 'overallDiff', 'stdDev', 'awayCarrerEra', 'awayCurrentEra', 'awayFinalEra', 'awayAVG', 'awayOPS', 'awayOBP', 'awaySLG', 'homeCarrerEra', 'homeCurrentEra', 'homeFinalEra', 'homeAVG', 'homeOPS', 'homeOBP', 'homeSLG']
scaler = StandardScaler()
df[numerical_features] = scaler.fit_transform(df[numerical_features])

X = df.drop('isOver', axis=1)
y = df['isOver']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define a RandomForest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make predictions on test data
predictions = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, predictions)
print(f'Accuracy: {accuracy}')

# Load new JSON data
with open('NewGamesConsolidated.json', 'r') as f:
    new_data = json.load(f)
new_df = pd.DataFrame(new_data)

# Save the 'game', 'isHomeWinner', and 'isOver' columns for later use
game_column = new_df['game'].copy()
isHomeWinner_column = new_df['isHomeWinner'].copy()
isOver_column = new_df['isOver'].copy()

# Ensure the columns exist in new_df before applying get_dummies
categorical_cols = ['game', 'time', 'away', 'home', 'formulaWinner', 'seriesWinner', 'nextWinners', 'overallWinner', 'awayPitcher', 'homePitcher', 'isHomeWinner', 'isOver' ,'date']
categorical_cols_existing = [col for col in categorical_cols if col in new_df.columns]

# Get dummy variables for categorical columns in new_df
new_df = pd.get_dummies(new_df, columns=categorical_cols_existing, drop_first=True)

# Add missing columns to new_df
missing_cols = set(X.columns) - set(new_df.columns)
for col in missing_cols:
    new_df[col] = 0

# Reorder columns of new_df to match the order in X
new_X = new_df[X.columns]

# Normalize numerical features in new_X using the same scaler
new_X.loc[:, numerical_features] = scaler.transform(new_X[numerical_features])

# Make predictions
new_predictions_probs = model.predict_proba(new_X)

# Get the class with the highest probability for each prediction
most_confident_predictions = np.argmax(new_predictions_probs, axis=1)

# Get the top 3 most confident predictions
top_3_indices = np.argsort(new_predictions_probs[:, 1])[-15:][::-1]

# Print the top 3 most confident predictions and the corresponding values
for i in top_3_indices:
    print("Most confident prediction:", most_confident_predictions[i])
    print("Probability:", new_predictions_probs[i][most_confident_predictions[i]])
    print("Value of 'game' column:", game_column.iloc[i])
    print("Value of 'isHomeWinner' column:", isHomeWinner_column.iloc[i])
    print("Value of 'isOver' column:", isOver_column.iloc[i])
    print()
