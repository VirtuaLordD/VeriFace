# Security Policy

## Supported Versions

We are committed to maintaining the security of VeriFace. We currently provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| 0.9.x   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within VeriFace, please do not disclose it publicly until it has been resolved. Instead, report it to our security team via email at: **veriface-security@example.com**

### What to Include in a Report

To help us address the issue quickly, please include the following details in your report:
- A description of the vulnerability and its potential impact.
- Detailed steps to reproduce the issue (including any necessary code snippets or payloads).
- Which components are affected (e.g., API, ML models, frontend dashboard).
- Any potential workarounds or mitigation strategies you may be aware of.

### Response Timeline Expectations

- **Acknowledgment:** We will acknowledge receipt of your vulnerability report within 48 hours.
- **Triage:** We aim to triage the issue and confirm the vulnerability within 5 business days.
- **Resolution:** A fix will be developed and released as soon as possible, prioritizing critical vulnerabilities.
- **Updates:** We will keep you informed of our progress as we work on a fix.

## Responsible Disclosure Policy

We kindly ask that you:
- Give us a reasonable amount of time to correct the issue before making any information public.
- Do not exploit the vulnerability for any purpose other than testing and reporting.
- Avoid violating privacy, destroying data, or disrupting our services.

## Security Best Practices for Contributors

When contributing to VeriFace, please keep the following security practices in mind:
- **Dependency Management:** Regularly update your dependencies and monitor them for known vulnerabilities (e.g., using `npm audit` or `safety` for Python).
- **Data Handling:** Ensure that any PII or sensitive data is handled securely and in compliance with privacy regulations.
- **Input Validation:** Always validate and sanitize user inputs, especially file uploads for media analysis, to prevent injection attacks or path traversal.
- **Authentication:** Do not commit secrets, API keys, or credentials to the repository. Use environment variables.
