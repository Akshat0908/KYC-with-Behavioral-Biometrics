import tensorflow as tf
from tensorflow.keras import layers, models

# Create a simple model
model = models.Sequential()
model.add(layers.Dense(10, activation='relu', input_shape=(20,)))  # Assuming input shape is (20,)
model.add(layers.Dense(1, activation='sigmoid'))

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Save the model
model.save('model/behavioral_model.h5')

