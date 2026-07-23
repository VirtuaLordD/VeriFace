$gh = "C:\Program Files\GitHub CLI\gh.exe"
$repo = "VirtuaLordD/VeriFace"

# Helper function
function New-Issue {
    param($title, $body, $labels, $milestone)
    $labelStr = ($labels -join ",")
    & $gh issue create --repo $repo --title $title --body $body --label $labelStr --milestone $milestone 2>&1
    Write-Output "Created: $title"
}

# ===== Milestone 1: Foundation (Day 1-2) - Issues 1-7 (closed) =====

New-Issue "Initialize repository structure" "Setup mono-repo folders for frontend, backend, ml, datasets, models, docs, and tests.`n`n**Assignee:** Fadil`n**Status:** Done" "devops,priority:critical" "Foundation (Day 1-2)"
New-Issue "Configure GitHub Actions CI" "Set up backend CI (Python lint + pytest) and frontend CI (Node lint + build) workflows.`n`n**Assignee:** Fadil`n**Status:** Done" "devops,priority:high" "Foundation (Day 1-2)"
New-Issue "Set up Docker configuration" "Create docker-compose.yml and Dockerfiles for frontend and backend services.`n`n**Assignee:** Fadil`n**Status:** Done" "devops,priority:high" "Foundation (Day 1-2)"
New-Issue "Create FastAPI backend skeleton" "Scaffold FastAPI app with modular router architecture, health checks, and CORS configuration.`n`n**Assignee:** Member 2`n**Status:** Done" "backend,priority:critical" "Foundation (Day 1-2)"
New-Issue "Create React frontend scaffold" "Set up Vite + React 19 + Tailwind CSS v4 with component stubs and routing.`n`n**Assignee:** Joe Thomas`n**Status:** Done" "frontend,priority:critical" "Foundation (Day 1-2)"
New-Issue "Design database schema" "Create SQLAlchemy models for AnalysisResult and configure SQLite database.`n`n**Assignee:** Member 2`n**Status:** Done" "backend,priority:high" "Foundation (Day 1-2)"
New-Issue "Create project documentation" "Write README, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY docs. Create architecture diagrams and API docs.`n`n**Assignee:** Fadil`n**Status:** Done" "docs,priority:medium" "Foundation (Day 1-2)"

# ===== Milestone 2: ML Core (Day 3-4) - Issues 8-13 =====

New-Issue "Implement deepfake detection model" "Integrate EfficientNet-B0 PyTorch model for binary classification (real vs fake).`n`n### Tasks`n- [ ] Download/train EfficientNet-B0 weights`n- [ ] Implement forward pass with proper preprocessing`n- [ ] Add batch inference support`n- [ ] Test with sample images`n`n**Assignee:** Member 2" "ml,priority:critical" "ML Core (Day 3-4)"
New-Issue "Build image preprocessing pipeline" "Create image preprocessing utilities: resize to 224x224, normalize with ImageNet stats, handle various formats.`n`n### Tasks`n- [ ] Implement torchvision transforms pipeline`n- [ ] Add EXIF orientation handling`n- [ ] Support JPEG, PNG, WebP formats`n`n**Assignee:** Member 2" "ml,priority:high" "ML Core (Day 3-4)"
New-Issue "Implement face detection with OpenCV" "Extract face regions from images before deepfake analysis using OpenCV DNN face detector.`n`n### Tasks`n- [ ] Implement face detection using cv2.dnn`n- [ ] Add face cropping and alignment`n- [ ] Handle multiple faces in single image`n- [ ] Fallback to Haar cascades if DNN unavailable`n`n**Assignee:** Member 2" "ml,priority:high" "ML Core (Day 3-4)"
New-Issue "Integrate text detection model" "Set up HuggingFace RoBERTa-based AI text detector for classifying human vs AI-generated text.`n`n### Tasks`n- [ ] Load roberta-base-openai-detector model`n- [ ] Implement tokenization and inference`n- [ ] Add long text chunking strategy`n- [ ] Include statistical pattern analysis (burstiness, perplexity)`n`n**Assignee:** Member 2" "ml,priority:critical" "ML Core (Day 3-4)"
New-Issue "Create ML model loading utilities" "Build singleton model loaders with caching, device management, and graceful error handling.`n`n### Tasks`n- [ ] Implement lazy loading pattern`n- [ ] Add GPU/CPU device auto-detection`n- [ ] Create model download utilities`n`n**Assignee:** Member 2" "ml,priority:medium" "ML Core (Day 3-4)"
New-Issue "Write ML unit tests" "Create pytest tests for all ML modules: input/output shape checks, edge cases, and error handling.`n`n### Tasks`n- [ ] Test deepfake detector interface`n- [ ] Test text detector interface`n- [ ] Test preprocessing pipeline`n- [ ] Test trust score computation`n`n**Assignee:** Jose Alex" "testing,priority:medium" "ML Core (Day 3-4)"

# ===== Milestone 3: Integration (Day 5-6) - Issues 14-19 =====

New-Issue "Build account detection model" "Implement scikit-learn GradientBoostingClassifier for fake social media account detection.`n`n### Tasks`n- [ ] Define feature set and model architecture`n- [ ] Implement training pipeline`n- [ ] Save/load model with joblib`n- [ ] Extract feature importance`n`n**Assignee:** Member 2" "ml,priority:high" "Integration (Day 5-6)"
New-Issue "Implement feature engineering pipeline" "Transform raw social media profile data into model-ready features.`n`n### Tasks`n- [ ] Extract: account age, follower ratio, post frequency`n- [ ] Calculate username entropy and digit ratio`n- [ ] Add engagement rate computation`n- [ ] Implement StandardScaler normalization`n`n**Assignee:** Jose Alex" "ml,priority:high" "Integration (Day 5-6)"
New-Issue "Implement Trust Score engine" "Build the weighted multi-signal trust score aggregation algorithm.`n`n### Tasks`n- [ ] Implement weighted combination (deepfake=0.4, text=0.35, account=0.25)`n- [ ] Handle partial inputs gracefully`n- [ ] Define risk levels: low/medium/high/critical`n- [ ] Add confidence normalization`n`n**Assignee:** Fadil" "ml,priority:critical" "Integration (Day 5-6)"
New-Issue "Connect API routes to ML pipeline" "Wire FastAPI endpoint handlers to actual ML model inference functions.`n`n### Tasks`n- [ ] Connect /deepfake/analyze/* to DeepfakeDetector`n- [ ] Connect /text/analyze/* to TextDetector`n- [ ] Connect /account/verify/* to AccountDetector`n- [ ] Connect /trust-score/* to TrustScoreEngine`n- [ ] Add file handling and temp storage`n`n**Assignee:** Member 2" "backend,priority:critical" "Integration (Day 5-6)"
New-Issue "API integration testing" "Write pytest integration tests using FastAPI TestClient for all endpoints.`n`n### Tasks`n- [ ] Test deepfake image upload flow`n- [ ] Test text analysis flow`n- [ ] Test account verification flow`n- [ ] Test trust score aggregation`n- [ ] Test error responses`n`n**Assignee:** Jose Alex" "testing,priority:high" "Integration (Day 5-6)"
New-Issue "Set up test datasets" "Gather and organize sample images, texts, and account profiles for CI testing.`n`n### Tasks`n- [ ] Collect sample real/fake images`n- [ ] Prepare human/AI text samples`n- [ ] Create mock account profiles`n- [ ] Add to tests/fixtures directory`n`n**Assignee:** Jose Alex" "testing,priority:medium" "Integration (Day 5-6)"

# ===== Milestone 4: Frontend (Day 7-8) - Issues 20-25 =====

New-Issue "Build Dashboard page with stats" "Implement the main dashboard with summary statistics widgets and quick action buttons.`n`n### Tasks`n- [ ] Display total analyses, threats detected, average trust score`n- [ ] Add quick action cards for each analysis type`n- [ ] Implement recent analyses table`n- [ ] Connect to backend API`n`n**Assignee:** Joe Thomas" "frontend,priority:critical" "Frontend (Day 7-8)"
New-Issue "Implement file upload with drag-and-drop" "Build drag-and-drop file upload using react-dropzone with preview and validation.`n`n### Tasks`n- [ ] Implement dropzone with file type filtering`n- [ ] Add image preview thumbnails`n- [ ] Show upload progress bar`n- [ ] Validate file size limits`n`n**Assignee:** Joe Thomas" "frontend,priority:high" "Frontend (Day 7-8)"
New-Issue "Create analysis results display" "Build result display components showing ML outputs with confidence meters and details.`n`n### Tasks`n- [ ] Display deepfake detection results with confidence bar`n- [ ] Display text analysis results with highlights`n- [ ] Display account verification risk factors`n- [ ] Add export/share functionality`n`n**Assignee:** Joe Thomas" "frontend,priority:high" "Frontend (Day 7-8)"
New-Issue "Build Trust Score visualization" "Create interactive trust score display with gauges, charts, and component breakdowns.`n`n### Tasks`n- [ ] Circular gauge for overall score`n- [ ] Bar/radar chart for component scores (Recharts)`n- [ ] Color-coded risk level indicator`n- [ ] Animated score transitions`n`n**Assignee:** Joe Thomas" "frontend,priority:high" "Frontend (Day 7-8)"
New-Issue "Implement responsive design" "Ensure all pages work well on mobile, tablet, and desktop screens.`n`n### Tasks`n- [ ] Mobile sidebar collapse/hamburger menu`n- [ ] Responsive grid layouts`n- [ ] Touch-friendly interactions`n- [ ] Test on multiple viewport sizes`n`n**Assignee:** Joe Thomas" "frontend,priority:medium" "Frontend (Day 7-8)"
New-Issue "Add loading states and error handling" "Implement loading spinners, skeleton screens, toast notifications, and error boundaries.`n`n### Tasks`n- [ ] Add loading skeletons for data fetching`n- [ ] Implement toast notification system`n- [ ] Add error boundary components`n- [ ] Handle network errors gracefully`n`n**Assignee:** Joe Thomas" "frontend,priority:medium" "Frontend (Day 7-8)"

# ===== Milestone 5: Testing (Day 9) - Issues 26-30 =====

New-Issue "End-to-end API tests" "Full flow testing from file upload through ML inference to database storage.`n`n### Tasks`n- [ ] Test complete deepfake detection flow`n- [ ] Test complete text analysis flow`n- [ ] Test complete account verification flow`n- [ ] Verify database records are created`n`n**Assignee:** Jose Alex" "testing,priority:critical" "Testing (Day 9)"
New-Issue "Frontend component tests" "Set up React Testing Library and write component tests.`n`n### Tasks`n- [ ] Test FileUpload component`n- [ ] Test TrustScoreBadge rendering`n- [ ] Test form validation`n- [ ] Test navigation routing`n`n**Assignee:** Jose Alex" "testing,priority:high" "Testing (Day 9)"
New-Issue "ML model accuracy validation" "Run benchmark datasets through all models and validate accuracy metrics.`n`n### Tasks`n- [ ] Evaluate deepfake detector accuracy/F1`n- [ ] Evaluate text detector accuracy/F1`n- [ ] Evaluate account detector accuracy/F1`n- [ ] Document baseline metrics`n`n**Assignee:** Jose Alex" "testing,priority:high" "Testing (Day 9)"
New-Issue "Edge case and error handling tests" "Test malformed inputs, oversized files, empty payloads, and concurrent requests.`n`n### Tasks`n- [ ] Test with corrupted image files`n- [ ] Test with very long/short text inputs`n- [ ] Test with missing profile fields`n- [ ] Test API rate limiting behavior`n`n**Assignee:** Jose Alex" "testing,priority:medium" "Testing (Day 9)"
New-Issue "Performance benchmarking" "Measure and document API response times, throughput, and ML inference latency.`n`n### Tasks`n- [ ] Benchmark individual endpoint latency`n- [ ] Measure ML inference time per model`n- [ ] Test concurrent request handling`n- [ ] Document performance baselines`n`n**Assignee:** Jose Alex" "testing,priority:low" "Testing (Day 9)"

# ===== Milestone 6: Demo & Polish (Day 10) - Issues 31-35 =====

New-Issue "Performance optimization" "Optimize backend queries, frontend bundle size, and ML inference speed.`n`n### Tasks`n- [ ] Profile and optimize slow endpoints`n- [ ] Reduce frontend bundle with code splitting`n- [ ] Add model inference caching`n- [ ] Optimize Docker image sizes`n`n**Assignee:** All" "backend,frontend,priority:medium" "Demo & Polish (Day 10)"
New-Issue "Documentation finalization" "Update all documentation to reflect final implementation. Ensure accuracy.`n`n### Tasks`n- [ ] Update README with final screenshots`n- [ ] Verify API docs match implementation`n- [ ] Update architecture diagrams if needed`n- [ ] Add deployment guide`n`n**Assignee:** Fadil" "docs,priority:high" "Demo & Polish (Day 10)"
New-Issue "Demo preparation" "Prepare the exact script, sample data, and presentation for the ideathon demo.`n`n### Tasks`n- [ ] Write demo script with talking points`n- [ ] Prepare curated demo datasets`n- [ ] Test demo flow end-to-end`n- [ ] Create presentation slides`n`n**Assignee:** All" "docs,priority:critical" "Demo & Polish (Day 10)"
New-Issue "UI polish and animations" "Add micro-interactions, transitions, and visual polish to the frontend.`n`n### Tasks`n- [ ] Add page transition animations`n- [ ] Implement hover effects on cards`n- [ ] Add score count-up animations`n- [ ] Polish color scheme and typography`n`n**Assignee:** Joe Thomas" "frontend,priority:medium" "Demo & Polish (Day 10)"
New-Issue "Final bug fixes" "Triage and fix any remaining critical issues before the demo.`n`n### Tasks`n- [ ] Review all open bugs`n- [ ] Fix critical and high priority bugs`n- [ ] Smoke test all features`n- [ ] Final code review`n`n**Assignee:** All" "bug,priority:high" "Demo & Polish (Day 10)"

Write-Output "`n===== All issues created! ====="
