# VeriFace Architecture Documentation

## System Architecture

```mermaid
graph TB
    subgraph Client["Client Layer"]
        Browser["Web Browser"]
    end

    subgraph Frontend["Frontend - React 19 + Tailwind CSS 4"]
        SPA["Single Page Application"]
        Router["React Router v7"]
        State["State Management"]
        APIClient["Axios API Client"]
    end

    subgraph API["API Layer - FastAPI"]
        Gateway["API Gateway :8000"]
        Middleware["CORS / Validation"]
        Routes["Route Handlers"]
        Schemas["Pydantic Schemas"]
    end

    subgraph ML["ML Pipeline Layer"]
        DF["Deepfake Detector"]
        TD["Text Detector"]
        AD["Account Detector"]
        TSE["Trust Score Engine"]
    end

    subgraph Models["ML Models"]
        EfficientNet["EfficientNet-B0\n(PyTorch)"]
        RoBERTa["RoBERTa\n(Transformers)"]
        GBClassifier["Gradient Boosting\n(Scikit-learn)"]
    end

    subgraph Data["Data Layer"]
        SQLite[("SQLite DB")]
        FileStore["File Storage"]
        ModelCache["Model Cache"]
    end

    Browser --> SPA
    SPA --> Router --> State --> APIClient
    APIClient -->|HTTP/REST| Gateway
    Gateway --> Middleware --> Routes --> Schemas
    Schemas --> DF & TD & AD
    DF --> EfficientNet
    TD --> RoBERTa
    AD --> GBClassifier
    DF & TD & AD --> TSE
    TSE --> SQLite
    Routes --> SQLite
    EfficientNet & RoBERTa & GBClassifier --> ModelCache
    DF --> FileStore
```

## Data Flow Diagrams

### 1. Image Deepfake Detection Flow
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Preprocessor
    participant FaceDetector
    participant Model
    participant TrustScore

    User->>Frontend: Upload Image
    Frontend->>API: POST /deepfake/analyze/image
    API->>Preprocessor: Validate & Read Image
    Preprocessor->>FaceDetector: Extract Faces
    FaceDetector->>Model: Run Inference
    Model->>TrustScore: Send Raw Scores
    TrustScore->>API: Return Formatted Result
    API->>Frontend: JSON Response
    Frontend->>User: Display Results
```

### 2. Text Analysis Flow
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Tokenizer
    participant Model
    participant Analyzer

    User->>Frontend: Submit Text
    Frontend->>API: POST /text/analyze/text
    API->>Tokenizer: Clean & Tokenize
    Tokenizer->>Model: Run Inference
    Model->>Analyzer: Extract Patterns
    Analyzer->>API: Return Formatted Result
    API->>Frontend: JSON Response
    Frontend->>User: Display Results
```

### 3. Account Verification Flow
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant FeatureExtractor
    participant Model
    participant RiskAnalyzer

    User->>Frontend: Submit Profile URL/Data
    Frontend->>API: POST /account/verify/account
    API->>FeatureExtractor: Parse & Extract Features
    FeatureExtractor->>Model: Run Inference
    Model->>RiskAnalyzer: Calculate Risk
    RiskAnalyzer->>API: Return Formatted Result
    API->>Frontend: JSON Response
    Frontend->>User: Display Results
```

### 4. Trust Score Aggregation Flow
```mermaid
sequenceDiagram
    participant API
    participant Aggregator
    participant Weights
    participant DB

    API->>Aggregator: Submit Multiple Results
    Aggregator->>Weights: Fetch Config
    Weights->>Aggregator: Apply Weighting
    Aggregator->>DB: Store Final Score
    DB->>API: Return Aggregate Result
```

## Deployment Architecture

```mermaid
graph TD
    subgraph Host["Docker Host"]
        subgraph Network["VeriFace Bridge Network"]
            NGINX["Frontend Container\n(Node.js / Vite)"]
            FASTAPI["Backend Container\n(Python / Uvicorn)"]
        end
        Volume1["./models : /app/models"]
        Volume2["./datasets : /app/datasets"]
        Volume3["./backend : /app"]
    end
    
    User((User)) -->|HTTP 5173| NGINX
    User -->|HTTP 8000| FASTAPI
    FASTAPI -.-> Volume1
    FASTAPI -.-> Volume2
    FASTAPI -.-> Volume3
```

## Database Schema

```mermaid
erDiagram
    AnalysisResult {
        string id PK
        string type "deepfake, text, account"
        string input_hash
        float score
        json metadata
        datetime created_at
    }
    
    TrustScore {
        string id PK
        string entity_id
        float final_score
        json components
        datetime calculated_at
    }
    
    AnalysisResult ||--o{ TrustScore : contributes_to
```
