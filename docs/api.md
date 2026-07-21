# VeriFace API Documentation

## Base URL
`http://localhost:8000/api/v1`

## Authentication
None (future enhancement)

## Endpoints

### 1. `GET /health`
- **Description**: Basic health check to see if the server is running.
- **Request Parameters**: None
- **Response Schema**:
```json
{
  "status": "string",
  "version": "string"
}
```
- **Example Response**:
```json
{
  "status": "ok",
  "version": "1.0.0"
}
```
- **Status Codes**: 200 OK

### 2. `GET /health/ready`
- **Description**: Deep health check to ensure models and database are ready.
- **Request Parameters**: None
- **Response Schema**:
```json
{
  "status": "string",
  "models_loaded": "boolean",
  "db_connected": "boolean"
}
```
- **Status Codes**: 200 OK, 503 Service Unavailable

### 3. `POST /deepfake/analyze/image`
- **Description**: Analyze an uploaded image for deepfake artifacts.
- **Request Body**: `multipart/form-data` (file: Image)
- **Response Schema**:
```json
{
  "id": "string",
  "is_deepfake": "boolean",
  "confidence": "number",
  "artifacts": ["string"]
}
```
- **Status Codes**: 200 OK, 400 Bad Request, 422 Unprocessable Entity

### 4. `POST /deepfake/analyze/video`
- **Description**: Analyze an uploaded video for deepfake artifacts.
- **Request Body**: `multipart/form-data` (file: Video)
- **Response Schema**:
```json
{
  "id": "string",
  "is_deepfake": "boolean",
  "confidence": "number",
  "frames_analyzed": "integer"
}
```
- **Status Codes**: 200 OK, 400 Bad Request

### 5. `GET /deepfake/results/{id}`
- **Description**: Retrieve deepfake analysis results by ID.
- **Request Parameters**: `id` (path)
- **Response Schema**: Same as POST analysis.
- **Status Codes**: 200 OK, 404 Not Found

### 6. `POST /text/analyze/text`
- **Description**: Analyze text for spam, fraud, or bot generation.
- **Request Body**: 
```json
{
  "text": "string"
}
```
- **Response Schema**:
```json
{
  "id": "string",
  "spam_probability": "number",
  "fraud_indicators": ["string"]
}
```
- **Status Codes**: 200 OK, 422 Unprocessable Entity

### 7. `GET /text/results/{id}`
- **Description**: Retrieve text analysis results by ID.
- **Request Parameters**: `id` (path)
- **Response Schema**: Same as POST text analysis.
- **Status Codes**: 200 OK, 404 Not Found

### 8. `POST /account/verify/account`
- **Description**: Verify an account's risk level based on features.
- **Request Body**:
```json
{
  "username": "string",
  "followers": "integer",
  "following": "integer",
  "account_age_days": "integer"
}
```
- **Response Schema**:
```json
{
  "id": "string",
  "risk_level": "string",
  "bot_probability": "number"
}
```
- **Status Codes**: 200 OK

### 9. `GET /account/results/{id}`
- **Description**: Retrieve account verification results by ID.
- **Request Parameters**: `id` (path)
- **Response Schema**: Same as POST account verify.
- **Status Codes**: 200 OK, 404 Not Found

### 10. `POST /trust-score/compute`
- **Description**: Compute a unified trust score from existing analysis results.
- **Request Body**:
```json
{
  "entity_id": "string",
  "analysis_ids": ["string"]
}
```
- **Response Schema**:
```json
{
  "id": "string",
  "entity_id": "string",
  "trust_score": "number"
}
```
- **Status Codes**: 200 OK, 400 Bad Request

### 11. `GET /trust-score/{id}`
- **Description**: Retrieve a computed trust score by ID.
- **Request Parameters**: `id` (path)
- **Response Schema**: Same as POST trust-score compute.
- **Status Codes**: 200 OK, 404 Not Found

### 12. `POST /trust-score/aggregate`
- **Description**: Aggregate multiple trust scores over time.
- **Request Body**:
```json
{
  "entity_id": "string",
  "time_window_days": "integer"
}
```
- **Response Schema**:
```json
{
  "entity_id": "string",
  "average_score": "number",
  "trend": "string"
}
```
- **Status Codes**: 200 OK
