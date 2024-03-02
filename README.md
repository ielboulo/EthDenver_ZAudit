# EthDenver_ZTrust : ZK & Security
ZTrust is a platform for provable audit on-chain; allowing end-users to get access to the security health of a web3 project (DeFi protocol, DAO smart contracts, ... etc) via an online dashboard.
The solution uses ZK technology to allow security reviewing companies to keep their reviewers private and the AI integration allows us for an easier user experience. 
Our solution centralizes the audit reports and make them easy understandable.

## How it works
-  Company A pays Company B to perform a security review over a scope of contracts in an agreed upon timeframe
- Company B sends in their teams to "hack" the contracts
- Once Company B finishes, a final report is generated and published onchain. 
- Our application extracts the security review reports and makes them understandable to end-user and easy accessible online (ie: no need to go to projects' website in order to look for the security review report). AI intergration will further improve the users experience. 

### Zero Knowledge Implemenation
- We will use RiscZero to generate POVs (Proof of Vulnerability)
- Security reviewers will be able to submit reviews to a public board while retaining their privacy

### AI Solution
- Extract data from the audit reports (pdf, forms, .. etc)
- Give statstics about the detected vulnerabilities (from minor to critical ones) ==> the form can be a detailed list + summary + (graphics with repartition of vulnerabilites degree ?) 
- Access to an AI chatbot in order allow to end user to have access to specific exaplanations if needed (for example : what's a re-entrancy attack ? )

## RoadMap :
- Create a  platform centralizing the audits (dashboard, .. etc)
- Adapt the code in order to integrate it with Metamask and generates a pop-up when a user connects to an audited projects (pop-up shows a summary of the security health of the project)
- Adapt the code and integrate it in plugin (ie. chrome extension)
- **Question** : Can we give access to project's onwers to upload their audit report and let the AI organize the data and make it available to the end user 

## Business Perspective : 
- The tools eases access of auditors to a tool that processes the audit reports and extracts meaningful data
- The gathered data by time ( smart contracts code in solidity / Rust / Cairo + corresponding Vulnerabilities) will serve as a training data for a Machine Learning Model that will allow to detect automatically a vulnerability

## Technical Stack 
- Risc-Zero
- ADX
- Polyg
