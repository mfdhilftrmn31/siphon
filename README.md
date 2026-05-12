
<div align="center">

```
███████╗██╗██████╗ ██╗  ██╗ ██████╗ ███╗   ██╗
██╔════╝██║██╔══██╗██║  ██║██╔═══██╗████╗  ██║
███████╗██║██████╔╝███████║██║   ██║██╔██╗ ██║
╚════██║██║██╔═══╝ ██╔══██║██║   ██║██║╚██╗██║
███████║██║██║     ██║  ██║╚██████╔╝██║ ╚████║
╚══════╝╚═╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
```

**See what others miss.**

[![Status](https://img.shields.io/badge/status-early%20development-orange?style=flat-square)](https://github.com/mfdhilftrmn31/siphon)
[![License](https://img.shields.io/badge/license-CC%20BY%204.0-blueviolet?style=flat-square)](./LICENSE)
[![Built With](https://img.shields.io/badge/built%20with-Tauri%20%2B%20React-7C3AED?style=flat-square)](https://tauri.app)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-22C55E?style=flat-square)](https://github.com/mfdhilftrmn31/siphon/pulls)

</div>

---

> ⚠️ **EARLY DEVELOPMENT — Work in Progress**
> SIPHON is actively being built. Most features are not yet functional. Community contributions and support are highly appreciated.

---

## What is SIPHON?

SIPHON is a free, open-source desktop web proxy and API anomaly detection tool built specifically for penetration testers.

Unlike traditional proxy tools, SIPHON doesn't just intercept traffic — it **learns what normal looks like** for your target's API, then automatically flags anything that deviates. Hidden bugs, inconsistent responses, and business logic flaws surface on their own. You investigate what matters.

Think Burp Suite — but with a modern UI, passive intelligence, and zero licensing cost.

---

## Built With

<div align="center">

| Layer | Technology |
|---|---|
| 🖥️ Desktop Framework | Tauri v2 |
| ⚛️ UI | React 18 + TypeScript |
| 🎨 Styling | Tailwind CSS + Shadcn/ui |
| 🗃️ State | Zustand + TanStack Query |
| 🔌 HTTP Client | Axios |
| 🐍 Backend *(coming soon)* | Python + mitmproxy |

</div>

---

## Features

| Feature | Status |
|---|---|
| HTTP/HTTPS Proxy Interception | 🔨 In Progress |
| Live HTTP History + Filters | 🔨 In Progress |
| Intercept & Edit Requests | 🔨 In Progress |
| Scope Manager | 🔨 In Progress |
| API Anomaly Detection (Inspector) | 🔨 In Progress |
| Token Sequencer Analysis | 🔨 In Progress |
| Passive Scanner | 🔨 In Progress |
| Repeater | 🔨 In Progress |
| Fuzzer | 🔨 In Progress |
| Decoder (Base64, JWT, Hex, SHA, MD5) | 🔨 In Progress |
| Collaborator (self-hosted) | 📋 Planned |
| Backend Proxy Engine (Python) | 📋 Planned |
| Dark Mode | 📋 Planned |

---

## Getting Started

> ⚠️ For developers and early testers only — not production ready.

### Prerequisites

- Kali Linux / Ubuntu / Debian
- Node.js v20 LTS (via nvm)
- Rust + Cargo

### Install System Dependencies (Kali Linux)

```bash
sudo apt update
sudo apt install -y libwebkit2gtk-4.1-dev libssl-dev libgtk-3-dev \
  libayatana-appindicator3-dev librsvg2-dev curl wget file build-essential
```

### Install Node.js via nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20 && nvm use 20
```

### Install Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env
```

### Run SIPHON

```bash
git clone https://github.com/mfdhilftrmn31/siphon.git
cd siphon/frontend
npm install
npm run tauri dev
```

---

## Contributing

SIPHON is built for the pentesting community. All contributions are welcome — whether it's code, bug reports, feature ideas, or documentation.

```bash
# 1. Fork this repo
# 2. Create your branch
git checkout -b feature/your-feature

# 3. Commit your changes
git commit -m "Add your feature"

# 4. Push and open a Pull Request
git push origin feature/your-feature
```

---

## Support the Project

SIPHON is and will always be **free and open source**.

If this tool helps your work and you want to support its development:

**₿ Bitcoin**
```
a91o...
```

Every contribution keeps this project alive. Thank you.

---

## Contact & Collaboration

Have ideas? Want to collaborate or partner?

| Platform | Link |
|---|---|
| 📧 Email | muhamadfadhilfaturohman@gmail.com |
| 💼 LinkedIn | [mfdhilftrmn](https://linkedin.com/in/mfdhilftrmn) |
| 🐙 GitHub | [mfdhilftrmn31](https://github.com/mfdhilftrmn31) |

---

## License

SIPHON is released under the **Creative Commons Attribution 4.0 International (CC BY 4.0)** license.

- ✅ Free to use for any purpose including commercial
- ✅ Free to modify and distribute
- ✅ Free to build upon this project
- ⚠️ **You must give appropriate credit** — do not remove copyright notices
- ⚠️ Contact the author for commercial collaboration

© 2025 Muhamad Fadhil Faturohman

---

<div align="center">
<sub>Built for pentesters, by a pentester.</sub>
</div>
