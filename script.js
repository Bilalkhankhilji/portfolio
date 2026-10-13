document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = '#0b0f19';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '1px solid #1e293b';
            }
        });
    }

    // Interactive Terminal Functionality
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalBody = document.getElementById('terminal-body');

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value.trim().toLowerCase();
                terminalInput.value = '';

                // Log the executed command
                const logLine = document.createElement('div');
                logLine.className = 'terminal-command-log';
                logLine.innerHTML = `<span class="prompt">bilal@bra-sec-node:~$</span> <span class="user-cmd">${escapeHTML(cmd)}</span>`;
                terminalOutput.appendChild(logLine);

                // Process response
                const responseLine = document.createElement('div');
                responseLine.className = 'output';

                switch (cmd) {
                    case 'help':
                        responseLine.innerHTML = `
                            Available commands:<br>
                            - <span class="prompt">about</span>: Brief summary of background and role<br>
                            - <span class="prompt">skills</span>: Summary of core technical competencies<br>
                            - <span class="prompt">projects</span>: Active security repositories<br>
                            - <span class="prompt">contact</span>: Direct email and location details<br>
                            - <span class="prompt">clear</span>: Clear terminal console<br>
                            - <span class="prompt">sudo</span>: Superuser check
                        `;
                        break;
                    case 'about':
                        responseLine.innerHTML = `Assistant Network Administrator at Balochistan Revenue Authority. Focused on enterprise network resilience, server hardening, and threat mitigation.`;
                        break;
                    case 'skills':
                        responseLine.innerHTML = `Linux (Ubuntu/RHEL), UFW, Fail2ban, Bash Scripting, Python (Sockets), PHP (PDO Prepared Statements), SIEM Log Parsing, TCP/IP.`;
                        break;
                    case 'projects':
                        responseLine.innerHTML = `
                            1. enterprse-network-hardening-siem<br>
                            2. python-port-scanner<br>
                            3. owasp-web-security-labs
                        `;
                        break;
                    case 'contact':
                        responseLine.innerHTML = `Email: bilalkhantaraqai@gmail.com | Location: Quetta, Balochistan, Pakistan`;
                        break;
                    case 'sudo':
                        responseLine.className = 'output text-success';
                        responseLine.innerHTML = `[+] Access Granted: Muhammad Bilal holds root privileges on this node.`;
                        break;
                    case 'clear':
                        terminalOutput.innerHTML = '';
                        return;
                    case '':
                        return;
                    default:
                        responseLine.innerHTML = `Command not recognized: '<span style="color:#ef4444;">${escapeHTML(cmd)}</span>'. Type <span class="prompt">'help'</span> for a list of commands.`;
                }

                terminalOutput.appendChild(responseLine);
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&#34;' }[tag] || tag)
        );
    }
});