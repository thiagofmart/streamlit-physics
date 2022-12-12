import numpy as np
import pandas as pd
import plotly.express as px
import streamlit as st
from utils import get_sin_df


st.markdown("""
# Sinusoidal Function
""")
frequency = st.slider("F = Frequency", min_value=0.5, max_value=5.0, value=1.0)
amplitude = st.slider("A = Amplitude", min_value=0.5, max_value=5.0, value=1.0)
period = st.slider("P = Period", min_value=np.pi, max_value=5*np.pi, value=2*np.pi)
hshift = st.slider("Hs = Horizontal Shift", min_value=-3.0, max_value=3.0, value=0.0)
vshift = st.slider("Vs = Vertical Shift", min_value=-4.0, max_value=4.0, value=0.0)

fig = px.line(
    get_sin_df(frequency, amplitude, period, hshift, vshift),
    title="f(x) = A * sin( F * (P * x + Hs) ) + Vs",
    range_x=[-5*np.pi, 5*np.pi],
    range_y=[-5, 5]
)

st.plotly_chart(fig)