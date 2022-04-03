import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import sys
dataset=pd.read_csv('DummyDataset.csv')
x=dataset.iloc[:,6:8].values
y=dataset.iloc[:,8].values
from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size = 0.20, random_state = 0)
from sklearn.tree import DecisionTreeRegressor
regressor = DecisionTreeRegressor(random_state = 0)
regressor.fit(x, y)
y_pred = regressor.predict(x_test)
import sklearn.metrics as sm
# print("R2 score =", round(sm.r2_score(y_test, y_pred), 2))
print(regressor.predict([[int(sys.argv[1]), int(sys.argv[2])]]))