# EthDenver_SEISA : ZK & AI at the service of security !

SEISA is a platform for provable audit on-chain; allowing end-users to get access to the security health of a web3 project (DeFi protocol, DAO smart contracts, ... etc) via an online dashboard.
The solution uses ZK technology and is empowered by AI. 
Our solution centralizes the audit reports and make them easy readable)

## How it works ? :
- we upload the audit reports on-chain (for example on IPFS / Pinata / others)
- we process/ extract data from the audit reports ion order to make them understandable to end-user and easy accessible online (ie. : no need to go to projects' website in order to look for the audit report). The report is easily accessible via our platform; it is enough to have the address of the smart contract of the project to access it's security health.
- if the user can't understand some vulnerability, it can get help from the AI chatbot integrated with our platform.

### The solution uses Zero Knowledge to :
- Bring the proof of validity of a vulnerability (ie. : I prefer to let you **Eman** elaborate this for more relevancy)
- Access the auditor's ratings while preseraving their privacy  (ie. : the users can access the rating given by auidtors without revealing the auditor's identity) 

### The solution uses AI in order to :
- Extract data from the audit reports (pdf, forms, .. etc)
- Give statstics about the detected vulnerabilities (from minor to critical ones) ==> the form can be a detailed list + summary + (graphics with repartition of vulnerabilites degree ?) 
- Access to an AI chatbot in order allow to end user to have access to specific exaplanations if needed (for example : what's a re-entrancy attack ? )

**Question**: what happen if a vulnerability is solved by the project ? does the audit report evolve in time ? ...

## RoadMap :
- Create a  platform centralizing the audits (dashboard, .. etc)
- Adapt the code in order to integrate it with Metamask and generates a pop-up when a user connects to an audited projects (pop-up shows a summary of the security health of the project)
- Adapt the code and integrate it in plugin (ie. chrome extension)
- **Question** : Can we give access to project's onwers to upload their audit report and let the AI organize the data and make it available to the end user 

## Business Perspective : 
- The tools eases access of auditors to a tool that processes the audit reports and extracts meaningful data
- The gathered data by time ( smart contracts code in solidity / Rust / Cairo + corresponding Vulnerabilities) will serve as a training data for a Machine Learning Model that will allow to detect automatically a vulnerability

## Technical Stack 

## Access SEISA here 
Vercel link to the UI ? 

## Annex / Ideas / Pele-mele :

https://skynet.certik.com/projects/aave ===> the link is specific to CErtik audits, but our solution is more global , more inclusive and centralizing all types of audits. 
We should mention that one project can be audited by many auditors : Certick, hacken, nethermind, solo experts, .. etc 

so it's at this stage that resides also our innovation !
