# VeriFace Project Board

This document outlines the GitHub Project Board structure, labels, and issue breakdown per milestone.

## Labels
- `frontend` (blue)
- `backend` (green)
- `ml` (purple)
- `devops` (orange)
- `docs` (yellow)
- `testing` (cyan)
- `bug` (red)
- `enhancement` (light blue)
- `priority:critical` (dark red)
- `priority:high` (red)
- `priority:medium` (orange)
- `priority:low` (yellow)
- `good first issue` (green)

## Issues Breakdown

### Milestone 1: Foundation (Day 1-2)
- [x] **#1 Initialize repository structure** (`devops`, `priority:critical`) → Fadil
  - Setup mono-repo folders for frontend, backend, ml.
- [x] **#2 Configure GitHub Actions CI** (`devops`, `priority:high`) → Fadil
  - Basic linting and testing pipelines.
- [x] **#3 Set up Docker configuration** (`devops`, `priority:high`) → Fadil
  - `docker-compose.yml` and Dockerfiles.
- [x] **#4 Create FastAPI backend skeleton** (`backend`, `priority:critical`) → Member 2
  - Initial routing and health checks.
- [x] **#5 Create React frontend scaffold** (`frontend`, `priority:critical`) → Joe Thomas
  - Vite + React + Tailwind setup.
- [x] **#6 Design database schema** (`backend`, `priority:high`) → Member 2
  - SQLite models setup.
- [x] **#7 Create project documentation** (`docs`, `priority:medium`) → Fadil
  - Architecture, Roadmap, API docs.

### Milestone 2: ML Core (Day 3-4)
- [ ] **#8 Implement deepfake detection model** (`ml`, `priority:critical`) → Member 2
  - PyTorch EfficientNet inference script.
- [ ] **#9 Build image preprocessing pipeline** (`ml`, `priority:high`) → Member 2
  - Resize, normalize, augmentation utilities.
- [ ] **#10 Implement face detection with OpenCV** (`ml`, `priority:high`) → Member 2
  - Face extraction before model inference.
- [ ] **#11 Integrate text detection model** (`ml`, `priority:critical`) → Member 2
  - HuggingFace RoBERTa setup.
- [ ] **#12 Create ML model loading utilities** (`ml`, `priority:medium`) → Member 2
  - Singleton loaders, caching.
- [ ] **#13 Write ML unit tests** (`testing`, `priority:medium`) → Jose Alex
  - Basic input/output shape checks.

### Milestone 3: Integration (Day 5-6)
- [ ] **#14 Build account detection model** (`ml`, `priority:high`) → Member 2
  - Scikit-learn Gradient Boosting setup.
- [ ] **#15 Implement feature engineering pipeline** (`ml`, `priority:high`) → Jose Alex
  - Transform raw account data to model inputs.
- [ ] **#16 Implement Trust Score engine** (`ml`, `priority:critical`) → Fadil
  - Weighted algorithm for final score.
- [ ] **#17 Connect API routes to ML pipeline** (`backend`, `priority:critical`) → Member 2
  - Wire FastAPI endpoints to ML functions.
- [ ] **#18 API integration testing** (`testing`, `priority:high`) → Jose Alex
  - Pytest with FastAPI TestClient.
- [ ] **#19 Set up test datasets** (`testing`, `priority:medium`) → Jose Alex
  - Gather sample images/texts for CI.

### Milestone 4: Frontend (Day 7-8)
- [ ] **#20 Build Dashboard page with stats** (`frontend`, `priority:critical`) → Joe Thomas
  - Main layout and summary widgets.
- [ ] **#21 Implement file upload with drag-and-drop** (`frontend`, `priority:high`) → Joe Thomas
  - Dropzone for image/video upload.
- [ ] **#22 Create analysis results display** (`frontend`, `priority:high`) → Joe Thomas
  - Display raw ML outputs clearly.
- [ ] **#23 Build Trust Score visualization** (`frontend`, `priority:high`) → Joe Thomas
  - Gauges and charts for the trust score.
- [ ] **#24 Implement responsive design** (`frontend`, `priority:medium`) → Joe Thomas
  - Mobile and tablet optimizations.
- [ ] **#25 Add loading states and error handling** (`frontend`, `priority:medium`) → Joe Thomas
  - Spinners, toast notifications.

### Milestone 5: Testing (Day 9)
- [ ] **#26 End-to-end API tests** (`testing`, `priority:critical`) → Jose Alex
  - Full flow testing from upload to DB save.
- [ ] **#27 Frontend component tests** (`testing`, `priority:high`) → Jose Alex
  - React Testing Library setup.
- [ ] **#28 ML model accuracy validation** (`testing`, `priority:high`) → Jose Alex
  - Run benchmark datasets.
- [ ] **#29 Edge case and error handling tests** (`testing`, `priority:medium`) → Jose Alex
  - Malformed inputs, large files.
- [ ] **#30 Performance benchmarking** (`testing`, `priority:low`) → Jose Alex
  - RPS and latency checks.

### Milestone 6: Demo & Polish (Day 10)
- [ ] **#31 Performance optimization** (`backend`, `frontend`, `priority:medium`) → All
  - Query optimization, bundle size reduction.
- [ ] **#32 Documentation finalization** (`docs`, `priority:high`) → Fadil
  - Update README, ensure all docs are accurate.
- [ ] **#33 Demo preparation** (`docs`, `priority:critical`) → All
  - Prepare exact script and data for demo.
- [ ] **#34 UI polish and animations** (`frontend`, `priority:medium`) → Joe Thomas
  - Transitions, micro-interactions.
- [ ] **#35 Final bug fixes** (`bug`, `priority:high`) → All
  - Triage and fix any remaining critical issues.
