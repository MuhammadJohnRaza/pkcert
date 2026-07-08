// Cyber Shield CTF - Application Logic

// --- Global Application State ---
const state = {
    currentTab: 'home',
    countdownDate: new Date().getTime() + (24 * 60 * 60 * 1000 * 24), // 24 days from now
    userScore: 0,
    userSolves: 0,
    challenges: [
        {
            id: 'web-1',
            category: 'web',
            name: 'SQL Injection 101',
            difficulty: 'easy',
            points: 100,
            solves: 342,
            description: 'A local library has launched their search catalog, but it seems their developer forgot to sanitize inputs. Can you access the hidden administrator account and retrieve the flag?',
            hint: 'Try adding a single quote to the search input and look for SQL syntax errors. Use UNION queries.',
            hintCost: 15,
            flag: 'CS2026{s1mpl3_sql1_un1on}',
            links: [{ name: 'Target Portal URL', url: '#' }],
            solved: false,
            hintRevealed: false
        },
        {
            id: 'web-2',
            category: 'web',
            name: 'Session Hijack',
            difficulty: 'medium',
            points: 250,
            solves: 124,
            description: 'We have intercepted a test deployment of a payroll server. Our intelligence suggests the administrator token is stored insecurely in cookie parameters. Elevate your privilege to admin and check your profile.',
            hint: 'The cookie is Base64 encoded. Try decoding it, changing the username field to "admin", re-encoding, and refreshing.',
            hintCost: 35,
            flag: 'CS2026{b64_c00k1e_manipulati0n}',
            links: [{ name: 'Web Target', url: '#' }],
            solved: false,
            hintRevealed: false
        },
        {
            id: 'web-3',
            category: 'web',
            name: 'API Admin Override',
            difficulty: 'hard',
            points: 450,
            solves: 28,
            description: 'The admin dashboard checks for localized requests. We need to spoof our headers to make the backend believe we are requests originating from the internal server loopback interface.',
            hint: 'Look into headers like X-Forwarded-For, X-Real-IP, or X-Originating-IP. Standard values like 127.0.0.1 might do the trick.',
            hintCost: 60,
            flag: 'CS2026{h3ad3r_sp00f_local_bypass}',
            links: [{ name: 'Access API Endpoint', url: '#' }],
            solved: false,
            hintRevealed: false
        },
        {
            id: 'crypto-1',
            category: 'crypto',
            name: 'Caesar Twist',
            difficulty: 'easy',
            points: 100,
            solves: 412,
            description: 'We found this cipher text left behind by a defaced agent: "PH1026{f3so1h_e1sk3u_w1vw}". We suspect a standard shift cipher was used, but the shift amount varies by 1 with each character index.',
            hint: 'Write a quick python script that shifts the first character by 1, the second by 2, the third by 3, etc.',
            hintCost: 10,
            flag: 'CS2026{c4esar_v4ry1ng_sh1ft}',
            links: [],
            solved: false,
            hintRevealed: false
        },
        {
            id: 'crypto-2',
            category: 'crypto',
            name: 'RSA Primer',
            difficulty: 'medium',
            points: 300,
            solves: 89,
            description: 'Given the public modulus N, the exponent e, and the ciphertext C, recover the plaintext. Values: N=3233, e=17, C=855. Note: Keep in mind the prime factors of N are small.',
            hint: 'Factorize N into primes p and q. Calculate phi(N) = (p-1)*(q-1). Compute private key d = modInverse(e, phi). Retrieve plaintext M = C^d mod N.',
            hintCost: 40,
            flag: 'CS2026{rsa_sm4ll_modulus_fac}',
            links: [],
            solved: false,
            hintRevealed: false
        },
        {
            id: 'rev-1',
            category: 'rev',
            name: 'Bytes & Pieces',
            difficulty: 'easy',
            points: 150,
            solves: 215,
            description: 'Reverse engineer this simple executable. It takes user input and compares it against an array of XOR-encoded byte values. Extract the correct password to unlock the flag.',
            hint: 'Open the binary in Ghidra or IDA Pro. Look for the main check loop and copy the static byte array, then XOR it with 0x5A.',
            hintCost: 20,
            flag: 'CS2026{xor_binary_extraction}',
            links: [{ name: 'Download Executable', url: '#' }],
            solved: false,
            hintRevealed: false
        },
        {
            id: 'rev-2',
            category: 'rev',
            name: 'Anti-Debugging Shield',
            difficulty: 'hard',
            points: 400,
            solves: 37,
            description: 'This binary checks if a debugger is attached (using IsDebuggerPresent and PEB checks) and mutates the execution path if monitored. Bypass these active anti-debugging blocks to read the correct flag.',
            hint: 'Patch the binary instructions in a hex editor to replace the check jumps (e.g. change JZ to JMP), or configure your debugger to hide itself.',
            hintCost: 50,
            flag: 'CS2026{peb_bypass_patching_win}',
            links: [{ name: 'Download Challenge File', url: '#' }],
            solved: false,
            hintRevealed: false
        },
        {
            id: 'pwn-1',
            category: 'pwn',
            name: 'Stack overflow 101',
            difficulty: 'medium',
            points: 200,
            solves: 110,
            description: 'Run the program and find the overflow vulnerability. The target buffer size is 64 bytes, but the program uses standard gets() to read input, allowing you to overwrite the return address to target function "win".',
            hint: 'Calculate the padding distance between your buffer start and the return address. Overwrite the EIP/RIP with the address of win().',
            hintCost: 30,
            flag: 'CS2026{stack_ov3rfl0w_r3t2w1n}',
            links: [{ name: 'Target Server IP:Port', url: '#' }],
            solved: false,
            hintRevealed: false
        },
        {
            id: 'forensics-1',
            category: 'forensics',
            name: 'Steganographic Secrets',
            difficulty: 'easy',
            points: 100,
            solves: 298,
            description: 'A suspicious image was sent between threat actors. Our forensics team suspects secret documents are concealed inside using steganographic embedding techniques. Find the hidden password.',
            hint: 'Check the image using exiftool first. If nothing is there, try running steghide with an empty password or common passwords like "admin", "flag", or "password".',
            hintCost: 15,
            flag: 'CS2026{stegh1de_h1dd3n_d4t4}',
            links: [{ name: 'Download Image.jpg', url: '#' }],
            solved: false,
            hintRevealed: false
        }
    ],
    teams: [
        { name: 'BitSliders', solves: 8, score: 2400 },
        { name: 'NullByte', solves: 7, score: 2150 },
        { name: 'RootAccess', solves: 6, score: 1900 },
        { name: 'CyberWizards', solves: 5, score: 1650 },
        { name: 'BufferBusters', solves: 4, score: 1300 }
    ],
    announcements: [
        { time: '17:05', title: 'New Challenge Added', text: 'Anti-Debugging Shield (Reverse Engineering, 400 pts) is now online!' },
        { time: '16:50', title: 'First Blood on API Override', text: 'Team BitSliders has solved API Admin Override! Congrats on the first blood!' },
        { time: '15:30', title: 'System Status Update', text: 'We have resolved the latency issue on the Web-2 server. Happy hacking!' }
    ],
    activeChallenge: null,
    isRegistered: false,
    teamName: "Player (You)"
};

// --- DOM Elements ---
const DOM = {
    navLinks: document.querySelectorAll('.nav-link'),
    tabContents: document.querySelectorAll('.tab-content'),
    countdownTimer: document.getElementById('countdownTimer'),
    announcementsList: document.getElementById('announcementsList'),
    challengesGrid: document.getElementById('challengesGrid'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    scoreboardBody: document.getElementById('scoreboardBody'),
    scoreChart: document.getElementById('scoreChart'),
    
    // Stats elements
    statTeams: document.getElementById('statTeams'),
    statSolves: document.getElementById('statSolves'),
    statChallenges: document.getElementById('statChallenges'),
    
    // Modal elements
    challengeModal: document.getElementById('challengeModal'),
    modalCategory: document.getElementById('modalCategory'),
    modalTitle: document.getElementById('modalTitle'),
    modalPoints: document.getElementById('modalPoints'),
    modalDifficulty: document.getElementById('modalDifficulty'),
    modalSolvesCount: document.getElementById('modalSolvesCount'),
    modalDescription: document.getElementById('modalDescription'),
    modalLinks: document.getElementById('modalLinks'),
    hintBtn: document.getElementById('hintBtn'),
    hintCost: document.getElementById('hintCost'),
    hintContent: document.getElementById('hintContent'),
    hintText: document.getElementById('hintText'),
    flagInput: document.getElementById('flagInput'),
    submitFlagBtn: document.getElementById('submitFlagBtn'),
    submissionFeedback: document.getElementById('submissionFeedback'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    
    // Registration elements
    registerBtn: document.getElementById('registerBtn'),
    registerModal: document.getElementById('registerModal'),
    registerForm: document.getElementById('registerForm'),
    registerFeedback: document.getElementById('registerFeedback'),
    closeRegisterModalBtn: document.getElementById('closeRegisterModalBtn')
};

// --- Initializer Function ---
function init() {
    setupNavigation();
    setupCountdown();
    setupFilters();
    renderAnnouncements();
    renderChallenges();
    renderScoreboard();
    setupAccordions();
    setupModalEvents();
    setupRegistration();
    drawScoreChart();
    
    // Start automated live announcement simulator
    setInterval(simulateAnnouncements, 40000);
}

// --- Navigation Handler ---
function setupNavigation() {
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    state.currentTab = tabId;
    
    // Update Nav Active Class
    DOM.navLinks.forEach(link => {
        if(link.getAttribute('data-tab') === tabId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Update Tab Active Classes
    DOM.tabContents.forEach(tab => {
        if(tab.id === `${tabId}-tab`) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Custom redraws on specific tabs
    if(tabId === 'scoreboard') {
        drawScoreChart();
    }
}

// --- Countdown Timer Logic ---
function setupCountdown() {
    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = state.countdownDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            DOM.countdownTimer.innerHTML = "EVENT ENDED";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }, 1000);
}

// --- Filter Challenges Handler ---
function setupFilters() {
    DOM.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            DOM.filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            renderChallenges(filter);
        });
    });
}

// --- Render Announcements ---
function renderAnnouncements() {
    DOM.announcementsList.innerHTML = '';
    state.announcements.forEach(ann => {
        const item = document.createElement('div');
        item.className = 'announcement-item';
        item.innerHTML = `
            <div class="announcement-time">${ann.time}</div>
            <div class="announcement-content">
                <h4>${ann.title}</h4>
                <p>${ann.text}</p>
            </div>
        `;
        DOM.announcementsList.appendChild(item);
    });
}

// --- Simulate Random Live Announcements ---
function simulateAnnouncements() {
    const events = [
        { title: 'New Solve', text: 'Team NullByte has solved Stack overflow 101!' },
        { title: 'New Solve', text: 'Team BufferBusters has solved Caesar Twist!' },
        { title: 'Admin Notice', text: 'Hints for session hijacking are now available at a reduced point penalty.' },
        { title: 'Score Update', text: 'Team RootAccess has climbed to Rank 3!' }
    ];

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    const timeNow = new Date();
    const timeStr = `${String(timeNow.getHours()).padStart(2, '0')}:${String(timeNow.getMinutes()).padStart(2, '0')}`;

    state.announcements.unshift({
        time: timeStr,
        title: randomEvent.title,
        text: randomEvent.text
    });

    // Keep list clean
    if(state.announcements.length > 5) {
        state.announcements.pop();
    }

    renderAnnouncements();
    
    // Pulse update to stats
    if(randomEvent.title === 'New Solve') {
        const currentSolves = parseInt(DOM.statSolves.innerText.replace(/,/g, ''));
        DOM.statSolves.innerText = (currentSolves + 1).toLocaleString();
    }
}

// --- Render Challenges Grid ---
function renderChallenges(filter = 'all') {
    DOM.challengesGrid.innerHTML = '';
    const filtered = state.challenges.filter(c => filter === 'all' || c.category === filter);
    
    if (filtered.length === 0) {
        DOM.challengesGrid.innerHTML = '<div class="no-challenges">No challenges found.</div>';
        return;
    }

    filtered.forEach(chal => {
        const card = document.createElement('div');
        card.className = `challenge-card ${chal.solved ? 'solved' : ''}`;
        card.setAttribute('data-id', chal.id);
        
        card.innerHTML = `
            <div>
                <div class="card-header">
                    <span class="card-category">${chal.category}</span>
                    ${chal.solved ? '<i class="fa-solid fa-circle-check solved-icon"></i>' : ''}
                </div>
                <h3 class="card-title">${chal.name}</h3>
            </div>
            <div class="card-footer">
                <span class="card-points">
                    <i class="fa-solid fa-shield-halved"></i> ${chal.points}
                </span>
                <span class="card-difficulty diff-${chal.difficulty}">${chal.difficulty}</span>
            </div>
        `;

        card.addEventListener('click', () => openChallengeModal(chal));
        DOM.challengesGrid.appendChild(card);
    });

    // Update dynamic challenges active count
    DOM.statChallenges.innerText = state.challenges.length;
}

// --- Challenge Modal Functionality ---
function openChallengeModal(chal) {
    state.activeChallenge = chal;
    
    DOM.modalCategory.innerText = chal.category.toUpperCase();
    DOM.modalTitle.innerText = chal.name;
    DOM.modalPoints.innerHTML = `<i class="fa-solid fa-star"></i> ${chal.points} pts`;
    DOM.modalDifficulty.className = `modal-difficulty diff-${chal.difficulty}`;
    DOM.modalDifficulty.innerText = chal.difficulty.toUpperCase();
    DOM.modalSolvesCount.innerText = `${chal.solves} solves`;
    DOM.modalDescription.innerText = chal.description;
    
    // Clear dynamic elements
    DOM.modalLinks.innerHTML = '';
    DOM.flagInput.value = '';
    DOM.submissionFeedback.className = 'feedback-msg';
    DOM.submissionFeedback.innerText = '';
    
    // Display resources
    const resourceDiv = document.getElementById('challengeResources');
    if (chal.links && chal.links.length > 0) {
        resourceDiv.classList.remove('hidden');
        chal.links.forEach(link => {
            const a = document.createElement('a');
            a.className = 'resource-link';
            a.href = link.url;
            a.innerHTML = `<i class="fa-solid fa-download"></i> ${link.name}`;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                alert(`Downloading ${link.name} file mock attachment...`);
            });
            DOM.modalLinks.appendChild(a);
        });
    } else {
        resourceDiv.classList.add('hidden');
    }

    // Hint Configuration
    DOM.hintCost.innerText = chal.hintCost;
    if(chal.hintRevealed) {
        DOM.hintContent.classList.remove('hidden');
        DOM.hintText.innerText = chal.hint;
        DOM.hintBtn.classList.add('hidden');
    } else {
        DOM.hintContent.classList.add('hidden');
        DOM.hintBtn.classList.remove('hidden');
    }

    // Disable submitting if already solved
    if (chal.solved) {
        DOM.flagInput.disabled = true;
        DOM.submitFlagBtn.disabled = true;
        DOM.flagInput.placeholder = 'Solved!';
        DOM.submissionFeedback.className = 'feedback-msg success';
        DOM.submissionFeedback.innerText = 'Correct flag! Challenge Completed.';
    } else {
        DOM.flagInput.disabled = false;
        DOM.submitFlagBtn.disabled = false;
        DOM.flagInput.placeholder = 'CS2026{...}';
    }

    // Open Modal UI
    DOM.challengeModal.classList.add('open');
}

function setupModalEvents() {
    DOM.closeModalBtn.addEventListener('click', () => {
        DOM.challengeModal.classList.remove('open');
    });

    // Close on click outside container
    document.querySelector('#challengeModal .modal-overlay').addEventListener('click', () => {
        DOM.challengeModal.classList.remove('open');
    });

    // Hint Button
    DOM.hintBtn.addEventListener('click', () => {
        if (!state.activeChallenge) return;
        
        const confirmHint = confirm(`Are you sure you want to reveal the hint? This will deduct ${state.activeChallenge.hintCost} points from your final challenge reward!`);
        if (confirmHint) {
            state.activeChallenge.hintRevealed = true;
            DOM.hintContent.classList.remove('hidden');
            DOM.hintText.innerText = state.activeChallenge.hint;
            DOM.hintBtn.classList.add('hidden');
        }
    });

    // Flag Submission
    DOM.submitFlagBtn.addEventListener('click', submitFlagAttempt);
    DOM.flagInput.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') submitFlagAttempt();
    });
}

function submitFlagAttempt() {
    const inputVal = DOM.flagInput.value.trim();
    const chal = state.activeChallenge;
    
    if(!chal || !inputVal) return;

    if (inputVal === chal.flag) {
        chal.solved = true;
        chal.solves++;
        
        let earnedPoints = chal.points;
        if(chal.hintRevealed) {
            earnedPoints = Math.max(10, chal.points - chal.hintCost);
        }
        
        state.userScore += earnedPoints;
        state.userSolves += 1;

        // Feedback UI
        DOM.submissionFeedback.className = 'feedback-msg success';
        DOM.submissionFeedback.innerText = `CONGRATULATIONS! Flag verified. +${earnedPoints} pts earned!`;
        DOM.flagInput.disabled = true;
        DOM.submitFlagBtn.disabled = true;

        // Update score in local lists & chart
        updateScoreboardWithUser();
        
        // Re-render challenges & stats
        setTimeout(() => {
            renderChallenges();
            renderScoreboard();
            drawScoreChart();
            DOM.challengeModal.classList.remove('open');
        }, 1500);
    } else {
        DOM.submissionFeedback.className = 'feedback-msg error';
        DOM.submissionFeedback.innerText = 'Incorrect Flag. Verify spelling and formatting.';
    }
}

// --- Scoreboard Sync Logic ---
function updateScoreboardWithUser() {
    // If not registered, register user team automatically or update existing
    let userTeamIndex = state.teams.findIndex(t => t.name === state.teamName);
    
    if (userTeamIndex === -1) {
        state.teams.push({
            name: state.teamName,
            solves: state.userSolves,
            score: state.userScore
        });
    } else {
        state.teams[userTeamIndex].score = state.userScore;
        state.teams[userTeamIndex].solves = state.userSolves;
    }

    // Sort scoreboard
    state.teams.sort((a, b) => b.score - a.score);
}

function renderScoreboard() {
    DOM.scoreboardBody.innerHTML = '';
    
    // Sort copy
    const sortedTeams = [...state.teams].sort((a, b) => b.score - a.score);
    const maxScore = sortedTeams[0] ? sortedTeams[0].score : 1;

    sortedTeams.forEach((team, idx) => {
        const rank = idx + 1;
        let rankBadgeClass = 'rank-normal';
        if (rank === 1) rankBadgeClass = 'rank-1';
        else if (rank === 2) rankBadgeClass = 'rank-2';
        else if (rank === 3) rankBadgeClass = 'rank-3';

        const pct = (team.score / maxScore) * 100;

        const row = document.createElement('tr');
        if (team.name === state.teamName) {
            row.style.background = 'rgba(0, 229, 255, 0.05)';
            row.style.borderLeft = '3px solid var(--neon-cyan)';
        }

        row.innerHTML = `
            <td class="col-rank">
                <span class="rank-badge ${rankBadgeClass}">${rank}</span>
            </td>
            <td class="col-team">${team.name} ${team.name === state.teamName ? '<span class="badge" style="background:var(--neon-cyan); color:#000; margin-left:8px;">YOU</span>' : ''}</td>
            <td class="col-solves">${team.solves} solves</td>
            <td class="col-score">${team.score}</td>
            <td class="col-progress">
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${pct}%"></div>
                </div>
            </td>
        `;
        DOM.scoreboardBody.appendChild(row);
    });
}

// --- Scoreboard Custom Canvas Chart Drawer ---
function drawScoreChart() {
    const ctx = DOM.scoreChart.getContext('2d');
    if(!ctx) return;

    // Set chart dimensions based on container parent
    const parent = DOM.scoreChart.parentElement;
    DOM.scoreChart.width = parent.clientWidth;
    DOM.scoreChart.height = parent.clientHeight || 250;

    const width = DOM.scoreChart.width;
    const height = DOM.scoreChart.height;

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    // Config Layout
    const padding = { top: 30, right: 120, bottom: 40, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Draw Background Grid
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.05)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    const gridRows = 4;
    for (let i = 0; i <= gridRows; i++) {
        const y = padding.top + (chartHeight * i / gridRows);
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();

        // Label values (mock score reference)
        ctx.fillStyle = '#64748b';
        ctx.font = '10px monospace';
        ctx.textAlign = 'right';
        const scoreVal = Math.round(2500 - (2500 * i / gridRows));
        ctx.fillText(scoreVal, padding.left - 10, y + 4);
    }

    // Vertical grid lines (time markers)
    const gridCols = 5;
    for (let i = 0; i <= gridCols; i++) {
        const x = padding.left + (chartWidth * i / gridCols);
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, height - padding.bottom);
        ctx.stroke();

        // Time values
        ctx.fillStyle = '#64748b';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        const hour = 12 + i * 2;
        ctx.fillText(`${hour}:00`, x, height - padding.bottom + 18);
    }

    // Team Progression Data paths
    const chartColors = [
        '#ffd700', // Gold
        '#00e5ff', // Cyan
        '#bd00ff', // Purple
        '#00ff88', // Green
        '#ffaa00', // Amber
        '#ff3b30'  // Red (for User if not top 5)
    ];

    const sortedTeams = [...state.teams].sort((a, b) => b.score - a.score).slice(0, 5);
    
    // Add user path if user is not in top 5
    const isUserInTop5 = sortedTeams.some(t => t.name === state.teamName);
    if (!isUserInTop5) {
        const userTeam = state.teams.find(t => t.name === state.teamName);
        if(userTeam) sortedTeams.push(userTeam);
    }

    sortedTeams.forEach((team, teamIdx) => {
        // Draw path progression
        const color = team.name === state.teamName ? '#00e5ff' : (chartColors[teamIdx] || '#ffffff');
        
        ctx.strokeStyle = color;
        ctx.lineWidth = team.name === state.teamName ? 3 : 2;
        ctx.beginPath();

        const numSteps = 5;
        // Mocking incremental steps for team curves
        const points = [];
        
        // Initial point at start
        points.push({ x: padding.left, y: height - padding.bottom });

        // Generate mock historical trajectory matching final score
        for(let step = 1; step <= numSteps; step++) {
            const factor = step / numSteps;
            const x = padding.left + (chartWidth * factor);
            
            // Generate non-linear scale points
            let yVal = team.score * Math.pow(factor, 1.2);
            // Cap at actual score
            if (step === numSteps) yVal = team.score;
            
            const y = height - padding.bottom - (chartHeight * (yVal / 2500));
            points.push({ x, y });
        }

        // Draw line
        ctx.moveTo(points[0].x, points[0].y);
        for(let i = 1; i < points.length; i++) {
            // Cubic bezier smoothing
            const xc = (points[i-1].x + points[i].x) / 2;
            const yc = (points[i-1].y + points[i].y) / 2;
            ctx.quadraticCurveTo(points[i-1].x, points[i-1].y, xc, yc);
        }
        ctx.lineTo(points[points.length-1].x, points[points.length-1].y);
        ctx.stroke();

        // Draw Endpoint Glow Dot
        const finalPt = points[points.length - 1];
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(finalPt.x, finalPt.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw label at final point
        ctx.fillStyle = team.name === state.teamName ? '#fff' : '#94a3b8';
        ctx.font = team.name === state.teamName ? 'bold 11px sans-serif' : '10px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(team.name, finalPt.x + 8, finalPt.y + 3);
    });
}

// --- Accordions Logic (FAQ) ---
function setupAccordions() {
    const accHeaders = document.querySelectorAll('.accordion-header');
    
    accHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            
            const isOpen = item.classList.contains('open');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('open');
                i.querySelector('.accordion-content').style.maxHeight = null;
            });

            if (!isOpen) {
                item.classList.add('open');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

// --- Registration Logic ---
function setupRegistration() {
    DOM.registerBtn.addEventListener('click', () => {
        DOM.registerModal.classList.add('open');
    });

    DOM.closeRegisterModalBtn.addEventListener('click', () => {
        DOM.registerModal.classList.remove('open');
    });

    document.querySelector('#registerModal .modal-overlay').addEventListener('click', () => {
        DOM.registerModal.classList.remove('open');
    });

    DOM.registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const tName = document.getElementById('teamName').value.trim();
        
        if (tName) {
            state.teamName = tName;
            state.isRegistered = true;
            
            // Add user team to scoreboard state
            updateScoreboardWithUser();
            
            // Update register UI
            DOM.registerBtn.innerHTML = `<i class="fa-solid fa-users-gear"></i> Team Dashboard`;
            DOM.registerFeedback.className = 'register-feedback success';
            DOM.registerFeedback.innerText = `Team "${tName}" Registered Successfully! Redirecting...`;

            // Update header status
            const activeTeamsCount = parseInt(DOM.statTeams.innerText.replace(/,/g, ''));
            DOM.statTeams.innerText = (activeTeamsCount + 1).toLocaleString();

            setTimeout(() => {
                DOM.registerModal.classList.remove('open');
                DOM.registerFeedback.innerText = '';
                
                // Switch to challenges tab automatically to start playing
                switchTab('challenges');
                renderChallenges();
                renderScoreboard();
                drawScoreChart();
            }, 1500);
        }
    });
}

// Start application when window loads
window.addEventListener('load', init);

// Handle canvas redraws on window resize
window.addEventListener('resize', () => {
    if (state.currentTab === 'scoreboard') {
        drawScoreChart();
    }
});

// =============================================================================
// RAG ASSISTANT MODULE
// =============================================================================

const RAG_API = 'http://127.0.0.1:5055/api';

const ragState = {
    notebookId: null,
    sessionId: null,
    sources: [],
    selectedFile: null,
    sending: false,
};

// --- DOM refs (populated lazily after tab renders) ---
function ragEl(id) { return document.getElementById(id); }

// =============================================================================
// Notebooks
// =============================================================================
async function ragLoadNotebooks() {
    const sel = ragEl('notebookSelect');
    if (!sel) return;
    try {
        const res = await fetch(`${RAG_API}/notebooks`);
        if (!res.ok) throw new Error(await res.text());
        const notebooks = await res.json();
        sel.innerHTML = '<option value="">— Select notebook —</option>';
        notebooks.forEach(nb => {
            const opt = document.createElement('option');
            opt.value = nb.id;
            opt.textContent = nb.name || nb.title || nb.id;
            sel.appendChild(opt);
        });
        if (ragState.notebookId) sel.value = ragState.notebookId;
    } catch (e) {
        sel.innerHTML = '<option value="">⚠ API offline</option>';
        console.warn('[RAG] Failed to load notebooks:', e);
    }
}

async function ragCreateNotebook() {
    const name = prompt('New notebook name (e.g. "CTF Intel 2026"):');
    if (!name) return;
    try {
        const res = await fetch(`${RAG_API}/notebooks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        if (!res.ok) throw new Error(await res.text());
        const nb = await res.json();
        await ragLoadNotebooks();
        ragEl('notebookSelect').value = nb.id;
        ragState.notebookId = nb.id;
        ragOnNotebookSelect(nb.id);
        ragToast(`Notebook "${name}" created`);
    } catch (e) {
        ragToast('Failed to create notebook: ' + e.message, 'error');
    }
}

async function ragOnNotebookSelect(id) {
    ragState.notebookId = id;
    ragState.sessionId = null;
    if (!id) {
        ragEl('sendChatBtn').disabled = true;
        ragEl('chatInput').disabled = true;
        return;
    }
    ragEl('sendChatBtn').disabled = false;
    ragEl('chatInput').disabled = false;
    await ragLoadSources();
    await ragLoadSessions();
}

// =============================================================================
// Sources
// =============================================================================
async function ragLoadSources() {
    if (!ragState.notebookId) return;
    const list = ragEl('sourcesList');
    if (!list) return;
    list.innerHTML = '<p class="empty-list-msg">Loading…</p>';
    try {
        // Correct endpoint: /sources?notebook_id=...
        const res = await fetch(`${RAG_API}/sources?notebook_id=${encodeURIComponent(ragState.notebookId)}`);
        if (!res.ok) throw new Error(await res.text());
        const sources = await res.json();
        ragState.sources = sources;
        ragRenderSources(sources);
        ragEl('hudSourceCount').textContent = sources.length;
    } catch (e) {
        list.innerHTML = '<p class="empty-list-msg">Failed to load sources.</p>';
        console.warn('[RAG] Load sources error:', e);
    }
}

function ragRenderSources(sources) {
    const list = ragEl('sourcesList');
    if (!list) return;
    if (!sources || sources.length === 0) {
        list.innerHTML = '<p class="empty-list-msg">No intelligence sources ingested yet.</p>';
        return;
    }
    list.innerHTML = '';
    sources.forEach(src => {
        // API returns 'type' field (link | file | text), not source_type
        const icon = src.type === 'link' ? 'fa-link' : src.type === 'file' ? 'fa-file-code' : 'fa-align-left';
        const embBadge = src.embedded
            ? '<span style="font-size:0.65rem;color:var(--color-primary);margin-left:4px;" title="Embedded & ready for vector search">● indexed</span>'
            : src.status === 'running' || src.status === 'new'
              ? '<span style="font-size:0.65rem;color:var(--color-text-muted);margin-left:4px;">⏳ indexing</span>'
              : '<span style="font-size:0.65rem;color:var(--color-text-muted);margin-left:4px;">○ not indexed</span>';
        const item = document.createElement('div');
        item.className = 'source-item';
        item.innerHTML = `
            <div class="source-item-meta">
                <span class="source-item-icon"><i class="fa-solid ${icon}"></i></span>
                <span class="source-item-title" title="${src.title || src.id}">${src.title || 'Untitled Source'}${embBadge}</span>
            </div>
            <div class="source-item-actions">
                <button class="btn-icon-danger" title="Delete source" onclick="ragDeleteSource('${src.id}')">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>`;
        list.appendChild(item);
    });
}

async function ragDeleteSource(sourceId) {
    if (!confirm('Delete this intelligence source? This cannot be undone.')) return;
    try {
        const res = await fetch(`${RAG_API}/sources/${encodeURIComponent(sourceId)}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(await res.text());
        ragToast('Source deleted');
        await ragLoadSources();
    } catch (e) {
        ragToast('Delete failed: ' + e.message, 'error');
    }
}

// =============================================================================
// Source list auto-refresh (read-only — uploads are done via Open Notebook UI)
// =============================================================================
let _sourceRefreshTimer = null;
function ragStartSourceRefresh() {
    if (_sourceRefreshTimer) clearInterval(_sourceRefreshTimer);
    // Refresh sources every 15 s so indexed status updates automatically
    _sourceRefreshTimer = setInterval(() => {
        if (ragState.notebookId) ragLoadSources();
    }, 15000);
}

// =============================================================================
// Sessions
// =============================================================================
async function ragLoadSessions() {
    if (!ragState.notebookId) return;
    const sel = ragEl('sessionSelect');
    if (!sel) return;
    try {
        const res = await fetch(`${RAG_API}/chat/sessions?notebook_id=${encodeURIComponent(ragState.notebookId)}`);
        if (!res.ok) return;
        const sessions = await res.json();
        sel.innerHTML = '<option value="">+ New Session</option>';
        sessions.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.id;
            opt.textContent = s.title || `Session ${s.id.split(':')[1]?.slice(0,6) || '...'}`;
            sel.appendChild(opt);
        });
        if (ragState.sessionId) sel.value = ragState.sessionId;
    } catch (e) {
        console.warn('[RAG] Load sessions error:', e);
    }
}

async function ragOnSessionSelect(sessionId) {
    ragState.sessionId = sessionId || null;
    const msgBox = ragEl('chatMessages');
    if (!msgBox) return;
    if (!sessionId) {
        // Fresh session — show welcome message
        msgBox.innerHTML = `
            <div class="message system">
                <div class="message-sender"><i class="fa-solid fa-robot"></i> INTEL CORPS AI</div>
                <div class="message-text">New session ready. Ask me anything about your ingested intelligence.</div>
            </div>`;
        return;
    }
    // Load existing messages
    try {
        const res = await fetch(`${RAG_API}/chat/sessions/${encodeURIComponent(sessionId)}`);
        if (!res.ok) return;
        const data = await res.json();
        msgBox.innerHTML = '';
        if (data.messages && data.messages.length) {
            data.messages.forEach(m => ragAppendMessage(m.type === 'human' ? 'user' : 'assistant', m.content));
        } else {
            ragAppendMessage('system', 'Session loaded with no prior messages.');
        }
        msgBox.scrollTop = msgBox.scrollHeight;
    } catch (e) {
        console.warn('[RAG] Load session messages error:', e);
    }
}

// =============================================================================
// Chat
// =============================================================================
function ragAppendMessage(role, content) {
    const msgBox = ragEl('chatMessages');
    if (!msgBox) return;

    const sender = role === 'user' ? 'YOU (OPERATOR)' : role === 'assistant' ? 'INTEL CORPS AI' : 'SYSTEM';
    const icon = role === 'user' ? 'fa-user-secret' : role === 'assistant' ? 'fa-robot' : 'fa-circle-info';

    const div = document.createElement('div');
    div.className = `message ${role}`;
    // Simple markdown-like rendering
    const html = ragRenderMarkdown(content);
    div.innerHTML = `
        <div class="message-sender"><i class="fa-solid ${icon}"></i> ${sender}</div>
        <div class="message-text">${html}</div>`;
    msgBox.appendChild(div);
    msgBox.scrollTop = msgBox.scrollHeight;
}

function ragRenderMarkdown(text) {
    // Basic code block
    text = text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    // Inline code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Bold
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // Newlines to paragraph breaks (preserve code blocks)
    const lines = text.split('\n');
    const parts = [];
    let inPre = false;
    lines.forEach(line => {
        if (line.startsWith('<pre>')) inPre = true;
        if (line.endsWith('</pre>')) { inPre = false; parts.push(line); return; }
        if (inPre) { parts.push(line + '\n'); return; }
        if (line.trim() === '') { parts.push('</p><p>'); } else { parts.push(line + ' '); }
    });
    return `<p>${parts.join('')}</p>`.replace(/<p><\/p>/g, '');
}

async function ragSendMessage() {
    if (ragState.sending) return;
    const input = ragEl('chatInput');
    const message = input.value.trim();
    if (!message || !ragState.notebookId) return;

    input.value = '';
    input.style.height = 'auto';

    ragAppendMessage('user', message);

    // Show typing indicator
    const typingId = 'typing-indicator-' + Date.now();
    const msgBox = ragEl('chatMessages');
    const typing = document.createElement('div');
    typing.id = typingId;
    typing.className = 'message assistant';
    typing.innerHTML = `
        <div class="message-sender"><i class="fa-solid fa-robot"></i> INTEL CORPS AI</div>
        <div class="message-text" style="color:var(--color-text-muted);font-style:italic">
            <span class="spinner-small" style="display:inline-block;margin-right:8px"></span>Analysing intel…
        </div>`;
    msgBox.appendChild(typing);
    msgBox.scrollTop = msgBox.scrollHeight;

    ragState.sending = true;
    ragEl('sendChatBtn').disabled = true;

    try {
        // 1. Create or reuse session
        if (!ragState.sessionId) {
            const sRes = await fetch(`${RAG_API}/chat/sessions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    notebook_id: ragState.notebookId,
                    title: `Session – ${new Date().toLocaleTimeString()}`
                })
            });
            if (!sRes.ok) throw new Error(await sRes.text());
            const sData = await sRes.json();
            ragState.sessionId = sData.id;
            await ragLoadSessions();
            ragEl('sessionSelect').value = ragState.sessionId;
        }

        // 2. Build context — pass null context_config so backend auto-includes all sources
        const ctxRes = await fetch(`${RAG_API}/chat/context`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                notebook_id: ragState.notebookId,
                context_config: null
            })
        });
        const ctxData = ctxRes.ok ? await ctxRes.json() : { context: { sources: [], notes: [] }, token_count: 0 };

        // Update HUD — show estimated tokens (char_count / 4 ≈ tokens)
        ragEl('hudTokenCount').textContent = ctxData.token_count || Math.round((ctxData.char_count || 0) / 4) || 0;

        // 3. Execute chat
        const chatRes = await fetch(`${RAG_API}/chat/execute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                session_id: ragState.sessionId,
                message,
                context: ctxData.context || {}
            })
        });
        if (!chatRes.ok) throw new Error(await chatRes.text());
        const chatData = await chatRes.json();

        // Remove typing indicator
        document.getElementById(typingId)?.remove();

        // Append AI reply (last message)
        const msgs = chatData.messages || [];
        const lastAi = [...msgs].reverse().find(m => m.type === 'ai' || m.type === 'assistant');
        if (lastAi) {
            ragAppendMessage('assistant', lastAi.content);
        } else {
            ragAppendMessage('assistant', '*(No response received — check that Ollama is running)*');
        }
    } catch (e) {
        document.getElementById(typingId)?.remove();
        ragAppendMessage('assistant', `⚠ Error: ${e.message}`);
        console.error('[RAG] Chat error:', e);
    } finally {
        ragState.sending = false;
        ragEl('sendChatBtn').disabled = false;
        input.focus();
    }
}

// =============================================================================
// Toast Notification
// =============================================================================
function ragToast(msg, type = 'success') {
    let toastEl = document.getElementById('rag-toast');
    if (!toastEl) {
        toastEl = document.createElement('div');
        toastEl.id = 'rag-toast';
        toastEl.style.cssText = `
            position: fixed; bottom: 30px; right: 30px; z-index: 9999;
            padding: 12px 20px; border-radius: 8px; font-family: var(--font-heading);
            font-weight: 600; font-size: 0.9rem; transition: all 0.4s ease;
            opacity: 0; pointer-events: none; max-width: 320px;`;
        document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.style.background = type === 'error'
        ? 'linear-gradient(135deg, rgba(255,59,48,0.9), rgba(180,30,20,0.9))'
        : 'linear-gradient(135deg, rgba(0,229,255,0.9), rgba(0,100,180,0.9))';
    toastEl.style.color = '#fff';
    toastEl.style.border = type === 'error' ? '1px solid rgba(255,59,48,0.5)' : '1px solid rgba(0,229,255,0.5)';
    toastEl.style.boxShadow = '0 8px 24px rgba(0,0,0,0.5)';
    toastEl.style.opacity = '1';
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => { toastEl.style.opacity = '0'; }, 3000);
}

// =============================================================================
// RAG Tab Setup (called once when tab first becomes visible)
// =============================================================================
let ragInitialized = false;

function setupRagTab() {
    if (ragInitialized) return;
    ragInitialized = true;

    // Notebook select change
    ragEl('notebookSelect')?.addEventListener('change', e => ragOnNotebookSelect(e.target.value));

    // Create notebook button
    ragEl('createNotebookBtn')?.addEventListener('click', ragCreateNotebook);

    // Session select
    ragEl('sessionSelect')?.addEventListener('change', e => ragOnSessionSelect(e.target.value));

    // Clear chat
    ragEl('clearChatBtn')?.addEventListener('click', () => {
        ragState.sessionId = null;
        ragEl('sessionSelect').value = '';
        ragEl('chatMessages').innerHTML = `
            <div class="message system">
                <div class="message-sender"><i class="fa-solid fa-robot"></i> INTEL CORPS AI</div>
                <div class="message-text">Chat cleared. Select a notebook and start a new query.</div>
            </div>`;
    });

    // Chat input — auto-resize textarea
    const chatInput = ragEl('chatInput');
    if (chatInput) {
        chatInput.disabled = true;
        chatInput.addEventListener('input', () => {
            chatInput.style.height = 'auto';
            chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
            ragEl('sendChatBtn').disabled = chatInput.value.trim().length === 0 || !ragState.notebookId;
        });
        chatInput.addEventListener('keydown', e => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!ragEl('sendChatBtn').disabled) ragSendMessage();
            }
        });
    }

    // Send button
    ragEl('sendChatBtn')?.addEventListener('click', ragSendMessage);

    // Load initial data and start background source refresh
    ragLoadNotebooks();
    ragStartSourceRefresh();
}

// Patch switchTab to initialise RAG on first visit
const _origSwitchTab = switchTab;
window.switchTab = function(tabId) {
    _origSwitchTab(tabId);
    if (tabId === 'rag') setupRagTab();
};


