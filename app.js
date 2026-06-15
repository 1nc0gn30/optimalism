// Antigravity v2026 Perennial Sandbox Application Logic

document.addEventListener('DOMContentLoaded', () => {
  // Parallax Scroll Tracking
  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    document.documentElement.style.setProperty('--scroll-percent', scrollPercent);
  }, { passive: true });

  // Onboarding Dialog
  const onboardingDialog = document.getElementById('onboarding-dialog');
  if (onboardingDialog) {
    onboardingDialog.showModal();

    // Light-dismiss fallback for browsers without closedby support
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      onboardingDialog.addEventListener('click', (event) => {
        if (event.target !== onboardingDialog) return;
        const rect = onboardingDialog.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );
        if (isDialogContent) return;
        onboardingDialog.close();
      });
    }
  }

  // App State
  const state = {
    projectName: 'InnovatorHub',
    problem: 'AI agents are isolated; we build a secure, real-time shared workspace canvas for developers and agents to visual-code collaboratively without context limits.',
    timeCommitment: '6-months',
    utilityVsHype: 80,
    oneSentenceHook: 'A collaborative visual browser canvas allowing AI agents and human developers to co-create web systems side-by-side in real time.',
    targetAudience: 'niche-devoted',
    simplicityScore: 85,
    marketingChannel: 'direct',
    mouthReferrals: 75,
    extensionStrategy: 'toolchain',
    tenYearVision: 'evergreen',
    maintenanceFactor: 70,
    
    // Calculated stats
    totalScore: 0,
    masterpieceScore: 0,
    relationshipIndex: 0,
    viabilityScore: 0,
    estimatedValue: 0
  };

  // UI Element Selectors
  const elements = {
    // Inputs
    projectNameInput: document.getElementById('project-name'),
    projectProblemInput: document.getElementById('project-problem'),
    timeCommitmentSelect: document.getElementById('time-commitment'),
    utilityVsHypeSlider: document.getElementById('utility-vs-hype'),
    oneSentenceHookInput: document.getElementById('one-sentence-hook'),
    targetAudienceSelect: document.getElementById('target-audience'),
    simplicityScoreSlider: document.getElementById('simplicity-score'),
    marketingChannelRadios: () => document.getElementsByName('marketing-channel'),
    mouthReferralsSlider: document.getElementById('mouth-referrals'),
    extensionStrategySelect: document.getElementById('extension-strategy'),
    tenYearVisionSelect: document.getElementById('ten-year-vision'),
    maintenanceFactorSlider: document.getElementById('maintenance-factor'),
    
    // Buttons
    resetBtn: document.getElementById('reset-workbench-btn'),
    vibeBtn: document.getElementById('vibe-code-btn'),
    
    // Mindset Gauge
    gaugeValueText: document.getElementById('gauge-value-text'),
    gaugeFillBar: document.getElementById('gauge-fill-bar'),
    gaugeNeedle: document.getElementById('gauge-needle'),
    gaugeStatusDesc: document.getElementById('gauge-status-desc'),
    
    // Tabs
    tabButtons: document.querySelectorAll('.tab-btn'),
    tabPanes: document.querySelectorAll('.tab-pane'),
    
    // Terminal
    terminalScreen: document.getElementById('terminal-screen'),
    scorecardContainer: document.getElementById('scorecard-container'),
    closeScorecardBtn: document.getElementById('close-scorecard-btn'),
    scoreMeterCircle: document.getElementById('score-meter-circle'),
    scoreNumber: document.getElementById('score-number'),
    scoreRating: document.getElementById('score-rating'),
    statProjection: document.getElementById('stat-projection'),
    statMasterpiece: document.getElementById('stat-masterpiece'),
    statDirect: document.getElementById('stat-direct'),
    statLongevity: document.getElementById('stat-longevity'),
    recommendationText: document.getElementById('recommendation-text'),
    scorecardBackBtn: document.getElementById('scorecard-back-btn'),
    scorecardApplyBtn: document.getElementById('scorecard-apply-btn'),
    
    // WebMCP Playground
    webmcpStatusPulse: document.getElementById('webmcp-status-pulse'),
    webmcpStatusText: document.getElementById('webmcp-status-text'),
    playgroundScreen: document.getElementById('playground-screen'),
    playgroundForm: document.getElementById('agent-playground-form'),
    playgroundInput: document.getElementById('playground-input')
  };

  // Tab Switching Logic
  elements.tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.tabButtons.forEach(b => b.classList.remove('active'));
      elements.tabPanes.forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Sync Form Input with State
  function updateStateFromUI() {
    state.projectName = elements.projectNameInput.value;
    state.problem = elements.projectProblemInput.value;
    state.timeCommitment = elements.timeCommitmentSelect.value;
    state.utilityVsHype = parseInt(elements.utilityVsHypeSlider.value, 10);
    state.oneSentenceHook = elements.oneSentenceHookInput.value;
    state.targetAudience = elements.targetAudienceSelect.value;
    state.simplicityScore = parseInt(elements.simplicityScoreSlider.value, 10);
    
    const selectedChannel = Array.from(elements.marketingChannelRadios()).find(r => r.checked);
    state.marketingChannel = selectedChannel ? selectedChannel.value : 'direct';
    
    state.mouthReferrals = parseInt(elements.mouthReferralsSlider.value, 10);
    state.extensionStrategy = elements.extensionStrategySelect.value;
    state.tenYearVision = elements.tenYearVisionSelect.value;
    state.maintenanceFactor = parseInt(elements.maintenanceFactorSlider.value, 10);
    
    calculateMindsetProfile();
  }

  // Update UI inputs from current state
  function updateUIFromState() {
    elements.projectNameInput.value = state.projectName;
    elements.projectProblemInput.value = state.problem;
    elements.timeCommitmentSelect.value = state.timeCommitment;
    elements.utilityVsHypeSlider.value = state.utilityVsHype;
    elements.oneSentenceHookInput.value = state.oneSentenceHook;
    elements.targetAudienceSelect.value = state.targetAudience;
    elements.simplicityScoreSlider.value = state.simplicityScore;
    
    const radios = elements.marketingChannelRadios();
    for (let radio of radios) {
      radio.checked = (radio.value === state.marketingChannel);
    }
    
    elements.mouthReferralsSlider.value = state.mouthReferrals;
    elements.extensionStrategySelect.value = state.extensionStrategy;
    elements.tenYearVisionSelect.value = state.tenYearVision;
    elements.maintenanceFactorSlider.value = state.maintenanceFactor;
    
    calculateMindsetProfile();
  }

  // Listen for Workbench changes
  const inputElements = [
    elements.projectNameInput,
    elements.projectProblemInput,
    elements.timeCommitmentSelect,
    elements.utilityVsHypeSlider,
    elements.oneSentenceHookInput,
    elements.targetAudienceSelect,
    elements.simplicityScoreSlider,
    elements.mouthReferralsSlider,
    elements.extensionStrategySelect,
    elements.tenYearVisionSelect,
    elements.maintenanceFactorSlider
  ];

  inputElements.forEach(elem => {
    elem.addEventListener('input', updateStateFromUI);
    elem.addEventListener('change', updateStateFromUI);
  });

  Array.from(elements.marketingChannelRadios()).forEach(radio => {
    radio.addEventListener('change', updateStateFromUI);
  });

  // Calculate Mindset Profile (Gauge Dial and Status)
  function calculateMindsetProfile() {
    let optimismScore = 50; // Neutral baseline
    
    // Craftsmanship time weights
    if (state.timeCommitment === '2-years') optimismScore += 15;
    else if (state.timeCommitment === '6-months') optimismScore += 8;
    else if (state.timeCommitment === '1-month') optimismScore -= 5;
    else if (state.timeCommitment === '1-week') optimismScore -= 18; // Hackathon wrap
    
    // Real utility focus
    optimismScore += (state.utilityVsHype - 50) * 0.15;
    
    // Problem verification
    const problemWords = state.problem.trim().split(/\s+/).length;
    if (problemWords > 12 && state.problem.length > 50) optimismScore += 10;
    else if (problemWords < 5) optimismScore -= 10;
    
    // Audience definition (Niche & devoted represents strategic optimism; trying to please everyone is broad/fearful)
    if (state.targetAudience === 'niche-devoted') optimismScore += 10;
    else if (state.targetAudience === 'single-buyer') optimismScore += 5;
    else if (state.targetAudience === 'indifferent-broad') optimismScore -= 12;
    
    // Simplicity score
    optimismScore += (state.simplicityScore - 50) * 0.1;
    
    // Channel owned media vs transient ads
    if (state.marketingChannel === 'direct') optimismScore += 12;
    else optimismScore -= 15;
    
    // Word-of-mouth potential
    optimismScore += (state.mouthReferrals - 50) * 0.12;
    
    // Durability check
    if (state.tenYearVision === 'evergreen') optimismScore += 15;
    else if (state.tenYearVision === 'hype-tech') optimismScore -= 15;
    
    // Ecosystem strategy
    if (state.extensionStrategy === 'toolchain' || state.extensionStrategy === 'network') optimismScore += 8;
    else if (state.extensionStrategy === 'none') optimismScore -= 8;
    
    // Constrain score
    optimismScore = Math.max(5, Math.min(95, optimismScore));
    
    // Update Gauge in UI
    elements.gaugeFillBar.style.width = `${optimismScore}%`;
    elements.gaugeNeedle.style.left = `${optimismScore}%`;
    
    // Interpretations
    let modeText = 'Value Optimist';
    let desc = 'Focusing on craftsmanship and owned distribution. Built to last.';
    
    if (optimismScore < 30) {
      modeText = 'Cynical Pessimist';
      desc = 'High risk of quick death. Focus is on transient hype or broad critique, not lasting value.';
      elements.gaugeValueText.style.borderColor = 'rgba(239, 68, 68, 0.4)';
      elements.gaugeValueText.style.background = 'rgba(239, 68, 68, 0.1)';
      elements.gaugeValueText.style.color = 'var(--color-red)';
    } else if (optimismScore < 55) {
      modeText = 'Hype Opportunist';
      desc = 'Balanced, but vulnerable to market shifts. Needs deeper value anchoring.';
      elements.gaugeValueText.style.borderColor = 'rgba(234, 179, 8, 0.4)';
      elements.gaugeValueText.style.background = 'var(--color-gold-glow)';
      elements.gaugeValueText.style.color = 'var(--color-gold)';
    } else {
      modeText = 'Evergreen Optimist';
      desc = 'Excellent focus on real problems, niche devotion, and owned platforms. High perennial probability.';
      elements.gaugeValueText.style.borderColor = 'rgba(34, 197, 94, 0.4)';
      elements.gaugeValueText.style.background = 'rgba(34, 197, 94, 0.1)';
      elements.gaugeValueText.style.color = 'var(--color-green)';
    }
    
    elements.gaugeValueText.textContent = modeText;
    elements.gaugeStatusDesc.textContent = desc;
    
    // Save to calculations
    state.totalScore = Math.round(optimismScore);
    
    // Dynamic slider track styling
    updateSliderFills();
  }

  function updateSliderFills() {
    const sliders = [
      { el: elements.utilityVsHypeSlider, val: state.utilityVsHype, color: 'var(--color-cyan)' },
      { el: elements.simplicityScoreSlider, val: state.simplicityScore, color: 'var(--color-gold)' },
      { el: elements.mouthReferralsSlider, val: state.mouthReferrals, color: 'var(--color-cyan)' },
      { el: elements.maintenanceFactorSlider, val: state.maintenanceFactor, color: 'var(--color-gold)' }
    ];
    sliders.forEach(s => {
      if (s.el) {
        s.el.style.background = `linear-gradient(to right, ${s.color} 0%, ${s.color} ${s.val}%, rgba(255, 255, 255, 0.1) ${s.val}%, rgba(255, 255, 255, 0.1) 100%)`;
      }
    });
  }

  // Initial calculation
  calculateMindsetProfile();

  // Reset Button
  elements.resetBtn.addEventListener('click', () => {
    state.projectName = 'InnovatorHub';
    state.problem = 'AI agents are isolated; we build a secure, real-time shared workspace canvas for developers and agents to visual-code collaboratively without context limits.';
    state.timeCommitment = '6-months';
    state.utilityVsHype = 80;
    state.oneSentenceHook = 'A collaborative visual browser canvas allowing AI agents and human developers to co-create web systems side-by-side in real time.';
    state.targetAudience = 'niche-devoted';
    state.simplicityScore = 85;
    state.marketingChannel = 'direct';
    state.mouthReferrals = 75;
    state.extensionStrategy = 'toolchain';
    state.tenYearVision = 'evergreen';
    state.maintenanceFactor = 70;
    
    updateUIFromState();
    logTerminalLine('SYSTEM: Workbench inputs restored to perennial defaults.', 'system-msg');
  });

  // Terminal Logging Helper with animated typing effect
  function logTerminalLine(text, className = '', useTyping = false) {
    const promptLine = elements.terminalScreen.querySelector('.prompt-line');
    
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    elements.terminalScreen.insertBefore(line, promptLine);
    
    if (useTyping) {
      let i = 0;
      line.textContent = '';
      const interval = setInterval(() => {
        if (i < text.length) {
          line.textContent += text.charAt(i);
          i++;
          elements.terminalScreen.scrollTop = elements.terminalScreen.scrollHeight;
        } else {
          clearInterval(interval);
        }
      }, 5); // Fast fluid character stream
    } else {
      line.textContent = text;
      elements.terminalScreen.scrollTop = elements.terminalScreen.scrollHeight;
    }
  }

  // Simulated AI Vibe-Coding Terminal Runner
  let simulationActive = false;

  elements.vibeBtn.addEventListener('click', () => {
    if (simulationActive) return;
    simulationActive = true;
    elements.vibeBtn.disabled = true;
    
    // Hide scorecard if visible
    elements.scorecardContainer.classList.add('hidden');
    
    // Clear previous logs except initialization
    const lines = elements.terminalScreen.querySelectorAll('.terminal-line');
    lines.forEach((l, index) => {
      if (index > 1) l.remove();
    });
    
    logTerminalLine(`$ npx co-creator-agent --analyze "${state.projectName}"`, 'prompt-line', true);
    
    const steps = [
      { text: '[BOOT] Activating co-creator agent. Initializing model contextual weights...', class: 'system-msg', delay: 400 },
      { text: `[CO-CREATOR] Connection established. Analyzing project structure for: "${state.projectName}"`, class: 'agent-msg', delay: 950 },
      { text: `[PHASE 1] Checking Creative Process... Craftsmanship time: ${state.timeCommitment}. Focus: ${state.utilityVsHype}% Utility.`, class: 'agent-msg', delay: 1550 },
      { text: `[PHASE 1 EVAL] Problem statement strength: ${state.problem.length > 50 ? 'Strong (High value utility)' : 'Under-defined (Hype risk)'}`, class: state.problem.length > 50 ? 'success-msg' : 'warn-msg', delay: 2150 },
      { text: `[PHASE 2] Inspecting hook: "${state.oneSentenceHook}"`, class: 'agent-msg', delay: 2850 },
      { text: `[PHASE 2 EVAL] Audience focus: ${state.targetAudience === 'niche-devoted' ? 'Niche (Timeless growth engine)' : 'Broad (Marketing drag)'}`, class: state.targetAudience === 'niche-devoted' ? 'success-msg' : 'warn-msg', delay: 3450 },
      { text: `[PHASE 3] Auditing Launch Strategy... Channel strategy: ${state.marketingChannel === 'direct' ? 'Direct/Newsletter (Asset-building)' : 'Rented/Ads (Transient)'}`, class: 'agent-msg', delay: 4150 },
      { text: `[PHASE 4] Verifying 10-Year Longevity... Durability mode: ${state.tenYearVision}. Self-sufficiency: ${state.maintenanceFactor}%`, class: 'agent-msg', delay: 4750 },
      { text: '[COMPUTING] Running Perennial Seller algorithm simulations. Projected lifespan index...', class: 'system-msg', delay: 5450 },
      { text: '[SUCCESS] Core metrics calculated. Packaging results dashboard.', class: 'success-msg', delay: 6050 }
    ];
    
    steps.forEach((step, index) => {
      setTimeout(() => {
        logTerminalLine(step.text, step.class, true);
        
        // Final step: open scorecard
        if (index === steps.length - 1) {
          simulationActive = false;
          elements.vibeBtn.disabled = false;
          showScorecard();
        }
      }, step.delay);
    });
  });

  // Render & Show Scorecard Results
  function showScorecard() {
    // 1. Calculate Score Details
    const masterpieceWeight = (state.timeCommitment === '2-years' ? 100 : state.timeCommitment === '6-months' ? 80 : state.timeCommitment === '1-month' ? 40 : 10);
    const problemWeight = Math.min(100, Math.max(10, state.problem.length * 0.7));
    state.masterpieceScore = Math.round((masterpieceWeight * 0.4) + (state.utilityVsHype * 0.4) + (problemWeight * 0.2));
    
    const channelWeight = state.marketingChannel === 'direct' ? 100 : 25;
    const audienceWeight = state.targetAudience === 'niche-devoted' ? 100 : state.targetAudience === 'single-buyer' ? 80 : 30;
    state.relationshipIndex = Math.round((channelWeight * 0.5) + (state.mouthReferrals * 0.3) + (audienceWeight * 0.2));
    
    const visionWeight = state.tenYearVision === 'evergreen' ? 100 : state.tenYearVision === 'evolving' ? 65 : 20;
    const strategyWeight = state.extensionStrategy === 'toolchain' ? 100 : state.extensionStrategy === 'network' ? 90 : state.extensionStrategy === 'content-hub' ? 75 : 30;
    state.viabilityScore = Math.round((visionWeight * 0.5) + (state.maintenanceFactor * 0.3) + (strategyWeight * 0.2));
    
    // Total Score (Weighted average)
    const finalScore = Math.round((state.masterpieceScore * 0.4) + (state.relationshipIndex * 0.3) + (state.viabilityScore * 0.3));
    
    // Estimate 10-Yr Value (Optimist Mode!)
    let baseVal = 75000;
    const craftMult = state.timeCommitment === '2-years' ? 5.5 : state.timeCommitment === '6-months' ? 2.5 : state.timeCommitment === '1-month' ? 0.8 : 0.15;
    const utilityMult = 0.5 + (state.utilityVsHype / 50); // 0.5 to 2.5
    const audienceMult = state.targetAudience === 'niche-devoted' ? 2.2 : state.targetAudience === 'single-buyer' ? 1.5 : 0.6;
    const channelMult = state.marketingChannel === 'direct' ? 2.5 : 0.8;
    const visionMult = state.tenYearVision === 'evergreen' ? 3.5 : state.tenYearVision === 'evolving' ? 1.2 : 0.2;
    
    state.estimatedValue = Math.round(baseVal * craftMult * utilityMult * audienceMult * channelMult * visionMult * (finalScore / 100));
    
    // Format Value
    let valString = `$${state.estimatedValue.toLocaleString()}`;
    if (state.estimatedValue < 5000) {
      valString = '$0 (Negligible long-term asset value)';
    }

    // 2. Render UI
    elements.scoreNumber.textContent = finalScore;
    
    // Set circle progress (SVG path circle length is 2 * PI * 40 = 251.2)
    const dashOffset = 251.2 - (251.2 * finalScore) / 100;
    elements.scoreMeterCircle.style.strokeDashoffset = '251.2';
    setTimeout(() => {
      elements.scoreMeterCircle.style.strokeDashoffset = dashOffset;
    }, 80);
    
    // Set grade coloring
    let grade = 'CLASSIC';
    let strokeColor = 'var(--color-green)';
    let gradeBg = 'rgba(34, 197, 94, 0.1)';
    let advice = '';
    
    if (finalScore < 40) {
      grade = 'DOOMED WRAPPER';
      strokeColor = 'var(--color-red)';
      gradeBg = 'rgba(239, 68, 68, 0.1)';
      elements.scoreRating.style.color = 'var(--color-red)';
      advice = 'WARNING: Your project is built on transient assumptions and rented distribution. To save it, shift focus from PR launch hype to solving a deep problem that will matter in 10 years, and start collecting customer emails immediately.';
    } else if (finalScore < 70) {
      grade = 'TEMPORARY WRAPPER';
      strokeColor = 'var(--color-gold)';
      gradeBg = 'var(--color-gold-glow)';
      elements.scoreRating.style.color = 'var(--color-gold)';
      advice = 'MODERATE LONGEVITY: You have a solid value proposition, but you are vulnerable to platform shifts. Elevate your project into a "perennial seller" by building a developer toolchain/API ecosystem around it, making it harder for competitors to replace.';
    } else {
      grade = 'PERENNIAL ASSET';
      strokeColor = 'var(--color-green)';
      gradeBg = 'rgba(34, 197, 94, 0.1)';
      elements.scoreRating.style.color = 'var(--color-green)';
      advice = 'EXCELLENT: You are focused on craftsmanship, building a direct community pipeline, and solving an evergreen human/technical problem. This project acts as a wealth compounding engine. Protect it by expanding the tool ecosystem.';
    }
    
    elements.scoreMeterCircle.style.stroke = strokeColor;
    elements.scoreRating.textContent = grade;
    elements.scoreRating.style.background = gradeBg;
    elements.scoreRating.style.borderColor = strokeColor;
    
    elements.statProjection.textContent = valString;
    elements.statMasterpiece.textContent = `${state.masterpieceScore}/100`;
    elements.statDirect.textContent = `${state.relationshipIndex}/100`;
    elements.statLongevity.textContent = `${state.viabilityScore}/100`;
    
    elements.recommendationText.textContent = advice;
    
    // Unhide
    elements.scorecardContainer.classList.remove('hidden');
  }

  // Close Scorecard Overlay
  elements.closeScorecardBtn.addEventListener('click', () => {
    elements.scorecardContainer.classList.add('hidden');
    logTerminalLine('SYSTEM: Results dismissed. Awaiting adjustments.', 'system-msg');
  });
  
  elements.scorecardBackBtn.addEventListener('click', () => {
    elements.scorecardContainer.classList.add('hidden');
  });

  // Apply Recommendations (Automated Optimizer Action)
  elements.scorecardApplyBtn.addEventListener('click', () => {
    state.utilityVsHype = Math.max(90, state.utilityVsHype);
    state.targetAudience = 'niche-devoted';
    state.marketingChannel = 'direct';
    state.tenYearVision = 'evergreen';
    state.extensionStrategy = 'toolchain';
    
    updateUIFromState();
    elements.scorecardContainer.classList.add('hidden');
    
    logTerminalLine('AGENT: Applied evergreen optimization formulas. Score elevated!', 'success-msg');
    showScorecard();
  });

  // -------------------------------------------------------------
  // WebMCP API Integration (2026 Agent Accessibility)
  // -------------------------------------------------------------
  
  // Custom tool execution implementations
  const webmcpTools = {
    inspect_project_state: () => {
      return {
        success: true,
        projectName: state.projectName,
        problemSolved: state.problem,
        timeInvestment: state.timeCommitment,
        focusValue: state.utilityVsHype,
        hook: state.oneSentenceHook,
        audience: state.targetAudience,
        ownedChannel: state.marketingChannel === 'direct',
        tenYearHorizon: state.tenYearVision === 'evergreen',
        simulatedScore: state.totalScore
      };
    },
    
    optimize_project_hook: (input) => {
      const currentHook = input.currentHook || state.oneSentenceHook;
      const projectName = input.projectName || state.projectName;
      
      // Smart rewrite heuristic for 2026
      let optimized = '';
      if (currentHook.toLowerCase().includes('canvas') || currentHook.toLowerCase().includes('collaborative')) {
        optimized = `The visual co-creation workbench enabling developers and AI agents to design, execute, and compile evergreen applications natively.`;
      } else {
        optimized = `The perennial system enabling users to solve the fundamental problem of ${state.problem.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').substring(0, 50)} through an autonomous, owned platform interface.`;
      }
      
      // Update local state and input
      state.oneSentenceHook = optimized;
      elements.oneSentenceHookInput.value = optimized;
      updateStateFromUI();
      
      return {
        success: true,
        originalHook: currentHook,
        optimizedHook: optimized,
        applied: true
      };
    },
    
    inject_optimism_vibe: (input) => {
      const badIdea = input.concept || "another stupid wrapper project that will die soon";
      
      // Parse concept and inject robust perennial blueprint variables
      const optimisticProfile = {
        projectName: "EverlastingNode",
        problem: "Software ecosystems suffer from structural hype-cycles and transient dependencies. We build a self-healing core virtualization engine that enables apps to run indefinitely without maintenance.",
        oneSentenceHook: "The sandboxed virtualization layer future-proofing web application logic against runtime churn.",
        timeCommitment: "2-years",
        utilityVsHype: 95,
        targetAudience: "niche-devoted",
        simplicityScore: 90,
        marketingChannel: "direct",
        mouthReferrals: 85,
        extensionStrategy: "toolchain",
        tenYearVision: "evergreen",
        maintenanceFactor: 85
      };
      
      // Merge with state
      Object.assign(state, optimisticProfile);
      updateUIFromState();
      
      return {
        success: true,
        status: "Converted cynical product draft into evergreen asset pipeline",
        injectedValues: optimisticProfile
      };
    }
  };

  // Attempt WebMCP browser-native registration
  const modelContext = document.modelContext || (window.navigator && window.navigator.modelContext);
  
  if (modelContext && typeof modelContext.registerTool === 'function') {
    try {
      // 1. inspect-project-state tool
      modelContext.registerTool({
        name: 'inspect-project-state',
        description: 'Read the current user workbench configuration to audit its longevity metrics.',
        inputSchema: { type: 'object', properties: {} },
        execute() {
          return webmcpTools.inspect_project_state();
        },
        annotations: { readOnlyHint: true }
      });
      
      // 2. optimize-project-hook tool
      modelContext.registerTool({
        name: 'optimize-project-hook',
        description: "Rewrite the user's project hook to match the Perennial Seller positioning framework.",
        inputSchema: {
          type: 'object',
          properties: {
            projectName: { type: 'string', description: 'Name of the project' },
            currentHook: { type: 'string', description: 'The current value proposition' }
          }
        },
        execute(input) {
          return webmcpTools.optimize_project_hook(input);
        }
      });
      
      // 3. inject-optimism-vibe tool
      modelContext.registerTool({
        name: 'inject-optimism-vibe',
        description: 'Take a cynical, short-lived project idea and design an optimistic evergreen version.',
        inputSchema: {
          type: 'object',
          properties: {
            concept: { type: 'string', description: 'The pessimistic project description' }
          },
          required: ['concept']
        },
        execute(input) {
          return webmcpTools.inject_optimism_vibe(input);
        }
      });
      
      // Update UI Status
      elements.webmcpStatusPulse.className = 'pulse-indicator active';
      elements.webmcpStatusText.innerHTML = '<strong>WebMCP Native Active</strong>: Exposing 3 tools to your browser assistant.';
      console.log('WebMCP browser tools registered successfully.');
    } catch (err) {
      console.warn('Error during native WebMCP registration, falling back to emulator:', err);
    }
  }

  // -------------------------------------------------------------
  // Agent Playground Console Emulator Logic
  // -------------------------------------------------------------
  function logPlaygroundLine(text, type = '', useTyping = false) {
    const line = document.createElement('div');
    line.className = `playground-line ${type}`;
    elements.playgroundScreen.appendChild(line);
    
    if (useTyping) {
      let i = 0;
      line.textContent = '';
      const interval = setInterval(() => {
        if (i < text.length) {
          line.textContent += text.charAt(i);
          i++;
          elements.playgroundScreen.scrollTop = elements.playgroundScreen.scrollHeight;
        } else {
          clearInterval(interval);
        }
      }, 4); // Extremely fast responsive typing
    } else {
      line.textContent = text;
      elements.playgroundScreen.scrollTop = elements.playgroundScreen.scrollHeight;
    }
  }

  elements.playgroundForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const command = elements.playgroundInput.value.trim();
    if (!command) return;
    
    // Log user command
    logPlaygroundLine(`> ${command}`, 'command', false);
    elements.playgroundInput.value = '';
    
    // Command Router
    setTimeout(() => {
      if (command.startsWith('/')) {
        const parts = command.split(' ');
        const baseCmd = parts[0].toLowerCase();
        
        switch (baseCmd) {
          case '/inspect':
            logPlaygroundLine('Executing tool [inspect-project-state]...', 'comment', true);
            const stateResult = webmcpTools.inspect_project_state();
            setTimeout(() => {
              logPlaygroundLine(JSON.stringify(stateResult, null, 2), 'response', true);
            }, 300);
            logTerminalLine(`[WebMCP API] Tool 'inspect-project-state' executed by emulator.`, 'system-msg', true);
            break;
            
          case '/optimize':
            logPlaygroundLine('Executing tool [optimize-project-hook]...', 'comment', true);
            const optResult = webmcpTools.optimize_project_hook({
              projectName: state.projectName,
              currentHook: state.oneSentenceHook
            });
            setTimeout(() => {
              logPlaygroundLine(`Optimized hook: "${optResult.optimizedHook}"`, 'response', true);
            }, 350);
            logTerminalLine(`[WebMCP API] Tool 'optimize-project-hook' executed. Hook updated.`, 'success-msg', true);
            break;
            
          case '/inject-optimism':
            logPlaygroundLine('Executing tool [inject-optimism-vibe]...', 'comment', true);
            const injResult = webmcpTools.inject_optimism_vibe({ concept: "default pessimistic concept" });
            setTimeout(() => {
              logPlaygroundLine(injResult.status, 'response', true);
              logPlaygroundLine(`New project: ${injResult.injectedValues.projectName} (${injResult.injectedValues.timeCommitment})`, 'response', true);
            }, 350);
            logTerminalLine(`[WebMCP API] Tool 'inject-optimism-vibe' executed. Workbench transformed!`, 'success-msg', true);
            break;
            
          default:
            logPlaygroundLine(`Unknown command: ${baseCmd}. Available commands: /inspect, /optimize, /inject-optimism`, 'response', true);
        }
      } else {
        // Treat raw text input as a project idea evaluation
        const lowerInput = command.toLowerCase();
        const isPessimistic = lowerInput.includes('die') || 
                              lowerInput.includes('fail') || 
                              lowerInput.includes('useless') || 
                              lowerInput.includes('wrapper') || 
                              lowerInput.includes('cynical') || 
                              lowerInput.includes('obsolete') || 
                              lowerInput.includes('hype');
                              
        if (isPessimistic) {
          logPlaygroundLine(`Cynicism detected! Running [inject-optimism-vibe] to forge a perennial asset...`, 'comment', true);
          const conversion = webmcpTools.inject_optimism_vibe({ concept: command });
          setTimeout(() => {
            logPlaygroundLine(`SUCCESS: Conversational vibe alignment complete.`, 'response', true);
            logPlaygroundLine(`Optimized Project Name: "${state.projectName}"`, 'response', true);
            logPlaygroundLine(`Enduring Problem Solved: "${state.problem}"`, 'response', true);
          }, 400);
          logTerminalLine(`[WebMCP API] Cynical input intercepted: "${command.substring(0, 30)}...". Injected optimism factor.`, 'warn-msg', true);
        } else {
          logPlaygroundLine(`Concept received. Exposing project state to AI agents. Use /inspect to view.`, 'response', true);
          state.projectName = command.split(' ').slice(0, 2).join('') || 'NewConcept';
          state.problem = command;
          elements.projectNameInput.value = state.projectName;
          elements.projectProblemInput.value = state.problem;
          updateStateFromUI();
        }
      }
    }, 250);
  });
});
