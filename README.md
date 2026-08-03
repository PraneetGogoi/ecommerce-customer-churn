```markdown
# E-commerce Customer Churn Prediction & Analytics 🛒📉

![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)
![Plotly](https://img.shields.io/badge/Plotly-%233F4F75.svg?style=for-the-badge&logo=plotly&logoColor=white)

An end-to-end machine learning and data engineering pipeline designed to predict customer churn in an e-commerce environment. This project transforms raw customer behavior metrics into actionable insights using a robust Random Forest classification model, interactive data visualizations, and a highly structured PostgreSQL backend optimized for real-time dashboard integration.

## 🚀 Key Features

* **Predictive Modeling:** Implements a `RandomForestClassifier` to accurately identify at-risk customers based on 14 engineered features (e.g., account age, engagement scores, return rates).
* **Interactive Visual Analytics:** Features dynamic visualizations built with Plotly and Seaborn, providing deep dives into feature importance, engagement vs. satisfaction matrices, and loyalty membership impacts.
* **Production-Ready Database Architecture:** Includes a complete PostgreSQL schema (`schema.sql`) that maps features and targets into a unified view (`dashboard_analytics_view`), ready to be plugged into BI tools or custom web dashboards.
* **Feature Importance Analysis:** Highlights the most critical drivers of customer churn to help businesses prioritize retention strategies.

## 🛠️ Tech Stack

* **Languages:** Python 3.11+, SQL
* **Database:** PostgreSQL
* **Machine Learning:** Scikit-Learn, Pandas, NumPy
* **Data Visualization:** Plotly Express, Matplotlib, Seaborn

## 📂 Repository Structure

```text
├── ecommerce_customer_features.csv   # Raw feature dataset (6,000 records)
├── ecommerce_customer_targets.csv    # Target variable dataset (Churn: Yes/No)
├── schema.sql                        # PostgreSQL DDL and Analytical Views
├── model.ipynb                       # Data cleaning, EDA, Visualizations, and Model Training
└── README.md
```

<img width="1710" height="990" alt="Screenshot 2026-04-04 at 1 20 45 AM" src="https://github.com/user-attachments/assets/987c38b3-0523-434c-9116-8f18938205a3" />

<img width="1710" height="988" alt="Screenshot 2026-04-04 at 1 21 17 AM" src="https://github.com/user-attachments/assets/26b47bcc-cad6-452b-a3c8-bc2cc118b7bb" />


## ⚙️ Installation & Usage

### 1. Database Setup
To set up the backend database for analytics:
1. Ensure PostgreSQL is installed and running.
2. Execute the schema file in your database:
```bash
psql -U your_username -d your_database -f schema.sql
```

### 2. Python Environment Setup
Ensure you have the necessary data science libraries installed:
```bash
pip install pandas numpy scikit-learn matplotlib seaborn plotly
```

### 3. Run the Analysis & Model
Open `model.ipynb` in Jupyter Notebook or JupyterLab:
```bash
jupyter notebook model.ipynb
```
Run the cells sequentially to process the data, generate the interactive visual reports, and train the Random Forest model.

## 📊 Key Insights & Visualizations

The notebook generates several core visualizations for dashboarding:
* **Churn Distribution:** Baseline understanding of the retention rate.
* **Engagement vs. Satisfaction:** Scatter plots identifying critical thresholds where customers are most likely to abandon the platform.
* **Predictive Feature Importance:** A ranked bar chart outputted by the model, detailing which specific customer behaviors (e.g., cart abandonment rate, days since last purchase) are the strongest predictors of churn.

## 🔮 Future Enhancements

* **Full-Stack Dashboard Deployment:** Connect the PostgreSQL view to a dynamic frontend framework (like Dash, FastAPI, or Django) for real-time monitoring.
* **Agentic AI Integration:** Implement a multi-agent system using LangGraph to automatically analyze new churn data and generate natural language retention strategies.
* **Pipeline Automation:** Dockerize the environment and set up automated data ingestion scripts for real-time updates.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! 
