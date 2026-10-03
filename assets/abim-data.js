/*
 * BOLO.IM — internal medicine board-preparation question bank data module.
 *
 * Loaded by abim.html (classic script, assigns to window.ABIM_DATA) so the
 * bank can grow without touching the engine — the same pattern the platform
 * already uses for flash-data.js and chapters.js.
 *
 * Schema:
 *   SYSTEMS  — blueprint category registry: label, exam weight, rune class.
 *   TASKS    — exam task registry (the cognitive skill an item tests).
 *   QUESTIONS — single-best-answer clinical vignettes:
 *     { id, system, task, extraTags?, vignette, leadIn, options, correct,
 *       explanation, flashcards[3] }
 *
 * Content note: facts follow current ACC/AHA, ADA, IDSA/ATS, ACG/AASLD,
 * ACR, KDIGO and ASH guideline positions as tested on ABIM certification.
 */
(function () {
  "use strict";

  var SYSTEMS = {
    CV:    { label: "🫀 Cardiology",         weight: "14%", cls: "cardio" },
    ENDO:  { label: "🧪 Endocrinology",      weight: "9%",  cls: "endo" },
    GI:    { label: "🍽 Gastroenterology",   weight: "9%",  cls: "gi" },
    ID:    { label: "🦠 Infectious Disease", weight: "9%",  cls: "id-tag" },
    PULM:  { label: "🫁 Pulmonary",          weight: "9%",  cls: "pulm" },
    RHEUM: { label: "🦴 Rheumatology",       weight: "9%",  cls: "rheum" },
    NEPH:  { label: "🫘 Nephrology",         weight: "6%",  cls: "neph" },
    HEME:  { label: "🩸 Hematology",         weight: "6%",  cls: "heme" },
    ONC:   { label: "🎗 Oncology",           weight: "6%",  cls: "onc" },
    NEURO: { label: "🧠 Neurology",          weight: "4%",  cls: "neuro" },
    PSYCH: { label: "🧩 Psychiatry",         weight: "4%",  cls: "psych" },
    DERM:  { label: "🧴 Dermatology",        weight: "3%",  cls: "derm" },
    OBGYN: { label: "🤰 Obstetrics & Gyn",   weight: "3%",  cls: "obgyn" },
    FOUND: { label: "⚖️ Foundations & Ethics", weight: "HY", cls: "found" },
    GERI:  { label: "🧓 Geriatric Medicine", weight: "3%",  cls: "geri" },
    CRIT:  { label: "🏥 Critical Care",      weight: "HY",  cls: "crit" }
  };

  var TASKS = {
    DX:    "🩺 Diagnosis",
    TEST:  "🔬 Diagnostic Testing",
    RX:    "💊 Treatment",
    PATHO: "🧬 Pathophysiology",
    NEXT:  "🎯 Next Step in Management",
    RISK:  "📊 Risk & Screening"
  };

  var QUESTIONS = [

    /* ================= Cardiovascular Disease (14%) ================= */
    {
      id: "cv-device-gdmt",
      system: "CV",
      task: "NEXT",
      vignette: "A 58-year-old male presents with new-onset fatigue and dyspnea. Echocardiogram reveals an LVEF of 35%. He is started on sacubitril/valsartan, carvedilol, spironolactone, and dapagliflozin. EKG shows normal sinus rhythm with a QRS of 110 ms.",
      leadIn: "What is the most appropriate next step regarding device therapy?",
      options: [
        "Place an Implantable Cardioverter-Defibrillator (ICD) immediately.",
        "Refer for Cardiac Resynchronization Therapy (CRT).",
        "Not currently indicated; optimize Guideline-Directed Medical Therapy (GDMT) and reassess LVEF in 3 months.",
        "Place an ICD after 40 days of GDMT, since the LVEF is ≤ 35%."
      ],
      correct: 2,
      explanation: "For newly diagnosed HFrEF without a secondary-prevention indication, optimize tolerated Guideline-Directed Medical Therapy (GDMT) and reassess LVEF after at least 3 months before a primary-prevention ICD decision. Persistent low EF, symptom class, etiology, and expected meaningful survival &gt; 1 year determine eligibility. CRT is not indicated with QRS &lt; 120 ms under ACC/AHA/HFSA guidance; this patient's QRS is 110 ms.",
      flashcards: [
        { f: "In HFrEF, what are the 4 medication pillars to optimize before device decisions?", b: "ARNI/ACEi/ARB, evidence-based beta-blocker, MRA, and SGLT2 inhibitor.", x: "These therapies can raise LVEF enough to avoid ICD placement and independently reduce mortality or HF hospitalization.", t: "Trap: Diuretics improve congestion but are not a disease-modifying GDMT pillar for ICD timing.", m: "4 pillars before hardware",
          tb: { h: ["Pillar", "Examples"], r: [["RAAS-neprilysin", "ARNI preferred; ACEi or ARB"], ["Beta-blocker", "Carvedilol, metoprolol succinate"], ["MRA", "Spironolactone or eplerenone"], ["SGLT2 inhibitor", "Dapagliflozin or empagliflozin"]] } },
        { f: "Before a primary-prevention ICD in newly treated HFrEF, how long should GDMT be optimized?", b: "At least 3 months of optimal GDMT, then reassess LVEF for persistent ≤35%.", x: "Waiting avoids implanting ICDs in patients whose EF recovers with neurohormonal and SGLT2 blockade.", t: "Trap: Do not implant immediately after diagnosis solely because EF is low; optimize therapy first.", m: "3 months before the box",
          tb: { h: ["Step", "Timing"], r: [["Start or optimize", "4 GDMT pillars"], ["Wait period", "≥3 months"], ["Reassess", "LVEF after GDMT"], ["ICD if still eligible", "LVEF ≤35% with indication"]] } },
        { f: "In HFrEF on GDMT, what QRS pattern/duration gives a Class I CRT indication?", b: "Sinus rhythm, LBBB with QRS ≥150 ms, LVEF ≤35%, and NYHA II, III, or ambulatory IV symptoms.", x: "CRT benefits patients with electrical dyssynchrony; benefit is greatest with true LBBB and very wide QRS.", t: "Trap: QRS <120 ms is not a CRT indication under US HF guidance; selected LBBB patients at 120–149 ms may benefit.", m: "LBBB-150 gets CRT",
          tb: { h: ["CRT Class I item", "Requirement"], r: [["LVEF", "≤35%"], ["Symptoms", "NYHA II, III, ambulatory IV on GDMT"], ["Rhythm and QRS", "Sinus rhythm, LBBB"], ["QRS duration", "≥150 ms"]] } }
      ]
    },
    {
      id: "cv-rv-infarct",
      system: "CV",
      task: "RX",
      vignette: "A 62-year-old man presents with 40 minutes of crushing substernal chest pain. Blood pressure is 96/62 mm Hg, heart rate 54/min, and lungs are clear. ECG shows ST-segment elevation in leads II, III, and aVF; a right-sided ECG shows ST elevation in V4R. He chewed 325 mg of aspirin en route.",
      leadIn: "Which of the following medications is most important to AVOID at this time?",
      options: [
        "High-intensity atorvastatin.",
        "A loading dose of a P2Y12 inhibitor.",
        "Systemic anticoagulation with unfractionated heparin.",
        "Sublingual nitroglycerin."
      ],
      correct: 3,
      explanation: "ST elevation in V4R identifies right ventricular infarction complicating an inferior STEMI. The infarcted RV is <strong>preload-dependent</strong>, so nitrates (and diuretics) can precipitate profound hypotension — treat hypotension with IV fluids instead. Aspirin, a P2Y12 inhibitor, anticoagulation, and a high-intensity statin remain standard ACS care.",
      flashcards: [
        { f: "In inferior STEMI with RV infarct on V4R, which drugs should be avoided?", b: "Nitrates and diuretics; give IV fluids for hypotension.", x: "The infarcted right ventricle is preload-dependent, so venodilation or diuresis can collapse LV filling and blood pressure.", t: "Trap: Nitroglycerin helps routine ACS pain but can cause profound hypotension in RV infarction.", m: "Right ventricle runs on preload",
          tb: { h: ["Drug or action", "RV infarct effect"], r: [["Nitrates", "Avoid; lowers preload"], ["Diuretics", "Avoid; lowers preload"], ["IV fluids", "Use for hypotension"], ["Reperfusion", "Urgent PCI if STEMI"]] } },
        { f: "In ACS, when is sublingual nitroglycerin contraindicated?", b: "RV infarction, SBP <90 mm Hg, or recent PDE-5 inhibitor use.", x: "Nitrates reduce preload and systemic vascular resistance; PDE-5 inhibitors amplify vasodilation.", t: "Trap: Ongoing chest pain is not enough to give nitrates if hypotension, RV infarct, or PDE-5 exposure is present.", m: "No nitrates: RV, low BP, PDE-5",
          tb: { h: ["Nitro contraindication", "Reason"], r: [["RV infarct", "Preload dependent"], ["SBP <90", "Worsens hypotension"], ["Recent PDE-5 inhibitor", "Severe hypotension risk"]] } },
        { f: "What initial medical bundle is still indicated in RV infarct STEMI?", b: "Aspirin, P2Y12 inhibitor, anticoagulation, high-intensity statin; beta-blocker only if no shock/HF/bradycardia.", x: "RV infarct changes preload management, not the need for antithrombotic and plaque-stabilizing ACS therapy.", t: "Trap: Avoiding nitrates does not mean withholding aspirin, P2Y12 therapy, heparin, or statin.", m: "RV infarct changes preload, not ACS basics" }
      ]
    },
    {
      id: "cv-hfpef",
      system: "CV",
      task: "PATHO",
      vignette: "A 74-year-old woman with long-standing hypertension, obesity (BMI 38), type 2 diabetes, chronic kidney disease, and paroxysmal atrial fibrillation reports progressive exertional dyspnea and leg swelling. NT-proBNP is elevated. Echocardiogram shows an LVEF of 62%, concentric left ventricular hypertrophy, left atrial enlargement, and grade II diastolic dysfunction.",
      leadIn: "Which of the following best explains her heart failure syndrome?",
      options: [
        "Irreversible loss of contractile myocardium from a prior, clinically silent myocardial infarction.",
        "A stiff, non-compliant left ventricle with impaired relaxation, driven by a chronic pro-inflammatory comorbidity state.",
        "A high-output state due to chronic anemia, with arteriovenous shunting increasing cardiac demand.",
        "Primary pulmonary arterial remodeling causing right ventricular pressure overload and secondary LV underfilling."
      ],
      correct: 1,
      explanation: "This is heart failure with preserved ejection fraction (HFpEF): a <strong>stiff, non-compliant left ventricle</strong> with impaired relaxation. The phenotype is driven by a systemic pro-inflammatory comorbidity state — chronic hypertension, metabolic syndrome, obesity, atrial fibrillation, advanced age, and chronic kidney disease.",
      flashcards: [
        { f: "How is HFpEF defined in a patient with dyspnea and edema?", b: "HF symptoms/signs with LVEF ≥50% plus evidence of diastolic dysfunction or elevated filling pressures.", x: "The key physiology is a stiff, noncompliant LV that fills at high pressure despite preserved systolic EF.", t: "Trap: A normal EF does not exclude HF; look for congestion, natriuretic peptides, and diastolic findings.", m: "Preserved EF, pressured filling" },
        { f: "Which comorbidity cluster commonly drives HFpEF?", b: "Hypertension, obesity/metabolic syndrome, AF, CKD, older age, and systemic inflammation.", x: "Comorbidities promote endothelial dysfunction, fibrosis, and impaired relaxation rather than primary pump failure.", t: "Trap: HFpEF is not simply mild HFrEF; its dominant problem is filling and comorbidity-driven inflammation.", m: "Old, stiff, inflamed ventricle" },
        { f: "Which drug class reduces HF hospitalization in HFpEF?", b: "SGLT2 inhibitors.", x: "Empagliflozin and dapagliflozin reduce HF events across the EF spectrum, even without diabetes.", t: "Trap: Most classic HFrEF drugs have less robust HFpEF outcome benefit; SGLT2 inhibitors are the high-yield exception.", m: "SGLT2 spans the EF spectrum" }
      ]
    },
    {
      id: "cv-af-anticoag",
      system: "CV",
      task: "RISK",
      vignette: "A 68-year-old woman with hypertension and type 2 diabetes is found to have asymptomatic atrial fibrillation on a routine ECG. Echocardiogram shows a structurally normal heart with no mitral stenosis and no prosthetic valve. Renal and hepatic function are normal.",
      leadIn: "What is the most appropriate strategy to reduce her stroke risk?",
      options: [
        "Aspirin 81 mg daily.",
        "A direct oral anticoagulant such as apixaban.",
        "Warfarin titrated to an INR of 2–3.",
        "No antithrombotic therapy; reassess in 1 year."
      ],
      correct: 1,
      explanation: "Her CHA₂DS₂-VASc score is 4 (hypertension, diabetes, age 65–74, female sex), well above the anticoagulation threshold. In nonvalvular atrial fibrillation, <strong>DOACs are preferred over warfarin</strong>; aspirin is not an acceptable substitute for anticoagulation. Warfarin is reserved for mechanical valves or moderate-severe mitral stenosis.",
      flashcards: [
        { f: "At what CHA₂DS₂-VASc score is anticoagulation recommended for nonvalvular AF?", b: "≥2 in men or ≥3 in women; consider at 1 in men or 2 in women.", x: "Female sex alone is a risk modifier; age, HF, HTN, diabetes, stroke/TIA, and vascular disease drive most stroke risk.", t: "Trap: Bleeding scores guide risk reduction, not automatic withholding of anticoagulation when stroke risk is high.", m: "2 men, 3 women: anticoagulate",
          tb: { h: ["Sex", "Recommend OAC", "Consider OAC"], r: [["Men", "CHA2DS2-VASc ≥2", "Score 1"], ["Women", "CHA2DS2-VASc ≥3", "Score 2"]] } },
        { f: "When is warfarin preferred over a DOAC for stroke prevention in AF?", b: "Mechanical heart valve or moderate-to-severe mitral stenosis.", x: "These valvular AF groups were excluded from pivotal DOAC trials and have higher thrombosis risk requiring VKA therapy.", t: "Trap: Bioprosthetic valves and most native valve lesions are not the same as mechanical valve or severe MS.", m: "Mechanical valve or bad MS → warfarin",
          tb: { h: ["AF setting", "Preferred agent"], r: [["Nonvalvular AF", "DOAC usually preferred"], ["Mechanical valve", "Warfarin"], ["Moderate-severe MS", "Warfarin"]] } },
        { f: "Is aspirin adequate stroke prevention for AF with elevated CHA₂DS₂-VASc?", b: "No; use oral anticoagulation unless contraindicated.", x: "Aspirin provides far less embolic protection while still causing clinically important bleeding.", t: "Trap: Aspirin may be used for coronary disease, but it is not a substitute for AF anticoagulation.", m: "Aspirin is not anticoagulation" }
      ]
    },
    {
      id: "cv-severe-as",
      system: "CV",
      task: "RX",
      vignette: "A 78-year-old man reports two episodes of exertional syncope and worsening dyspnea. Examination reveals a harsh, late-peaking crescendo-decrescendo systolic murmur at the right upper sternal border radiating to the carotids, with a delayed and diminished carotid upstroke. Echocardiogram shows a heavily calcified aortic valve with a valve area of 0.8 cm² and a mean gradient of 48 mm Hg; LVEF is 60%.",
      leadIn: "What is the most appropriate management?",
      options: [
        "Exercise stress testing to provoke symptoms.",
        "Initiate an ACE inhibitor and reassess in 6 months.",
        "Balloon aortic valvuloplasty as definitive therapy.",
        "Aortic valve replacement (surgical or transcatheter)."
      ],
      correct: 3,
      explanation: "Severe aortic stenosis (valve area ≤ 1.0 cm², mean gradient ≥ 40 mm Hg) with symptoms — syncope, angina, or heart failure — is a <strong>Class I indication for valve replacement</strong>. Medical therapy does not alter the disease course, valvuloplasty is only a bridge, and exercise testing is contraindicated in symptomatic severe AS.",
      flashcards: [
        { f: "What is the treatment for symptomatic severe aortic stenosis?", b: "Aortic valve replacement by SAVR or TAVR.", x: "Symptoms such as syncope, angina, or HF mark high mortality; no medication relieves fixed valve obstruction long term.", t: "Trap: Diuretics may palliate congestion but do not alter severe AS prognosis.", m: "Symptoms plus severe AS → replace" },
        { f: "What echo criteria define severe aortic stenosis?", b: "Valve area ≤1.0 cm², mean gradient ≥40 mm Hg, or peak velocity ≥4.0 m/s.", x: "Discordant low-flow states can obscure gradients, so integrate valve area, velocity, EF, and flow.", t: "Trap: A loud murmur alone is not severity; use Doppler hemodynamics and valve area.", m: "1-40-4: AVA 1, gradient 40, velocity 4",
          tb: { h: ["Echo measure", "Severe AS"], r: [["Valve area", "≤1.0 cm²"], ["Mean gradient", "≥40 mm Hg"], ["Peak velocity", "≥4.0 m/s"]] } },
        { f: "When is exercise stress testing contraindicated in aortic stenosis?", b: "Symptomatic severe AS.", x: "Exertion can provoke syncope, ischemia, or sudden death when fixed outflow obstruction is already symptomatic.", t: "Trap: Stress testing can help truly asymptomatic severe AS, but not when symptoms are present.", m: "Symptomatic severe AS: do not stress it" }
      ]
    },

    /* ================= Endocrinology (9%) ================= */
    {
      id: "endo-thyroid-storm",
      system: "ENDO",
      task: "RX",
      vignette: "A 29-year-old woman with untreated Graves disease presents after an upper respiratory infection with fever of 39.4 °C, heart rate 152/min in atrial fibrillation, agitation, vomiting, and diarrhea. Her Burch-Wartofsky score is 65. IV propranolol is started.",
      leadIn: "What is the most appropriate sequencing of further therapy?",
      options: [
        "Give an iodine solution immediately, then propylthiouracil 6 hours later.",
        "Give propylthiouracil now, then an iodine solution at least 1 hour later.",
        "Arrange urgent radioactive iodine ablation.",
        "Proceed directly to emergency thyroidectomy."
      ],
      correct: 1,
      explanation: "In thyroid storm, the thionamide (<strong>PTU</strong>) must be given <strong>before</strong> iodine: iodine administered first provides substrate for new hormone synthesis and worsens the storm. PTU also blocks peripheral T4→T3 conversion. Give iodine at least 1 hour after PTU, plus glucocorticoids, cooling, and treatment of the precipitant.",
      flashcards: [
        { f: "In thyroid storm, when should iodine be given relative to PTU?", b: "Give PTU first, then iodine at least 1 hour later.", x: "Thionamide blocks new hormone synthesis before iodine acutely blocks release, preventing iodine from becoming substrate.", t: "Trap: Iodine before PTU can worsen storm by fueling new thyroid hormone synthesis.", m: "PTU before iodine",
          tb: { h: ["Order", "Therapy", "Purpose"], r: [["1", "Beta-blocker", "Adrenergic control"], ["2", "PTU", "Block synthesis and T4→T3"], ["3", "Iodine ≥1 h later", "Block release"], ["4", "Glucocorticoid", "Reduce T4→T3"]] } },
        { f: "Which thyroid storm therapies reduce peripheral T4→T3 conversion?", b: "PTU, propranolol, and glucocorticoids.", x: "T3 is the more active hormone, so blocking conversion rapidly reduces adrenergic and metabolic toxicity.", t: "Trap: Methimazole blocks synthesis but does not meaningfully block peripheral T4→T3 conversion.", m: "T4 to T3 blockers: PTU, propranolol, prednisone",
          tb: { h: ["Therapy", "T4→T3 effect"], r: [["PTU", "Strong inhibition"], ["Propranolol", "High-dose inhibition"], ["Glucocorticoids", "Inhibition plus adrenal support"]] } },
        { f: "What Burch-Wartofsky score is highly suggestive of thyroid storm?", b: "≥45.", x: "The score weights fever, CNS changes, tachyarrhythmia, GI/hepatic dysfunction, HF, and a precipitant.", t: "Trap: Do not wait for thyroid labs to look extreme; storm is a clinical diagnosis and TSH/T4 may not distinguish severity.", m: "45 seals the storm" }
      ]
    },
    {
      id: "endo-dka-k",
      system: "ENDO",
      task: "NEXT",
      vignette: "A 24-year-old woman with type 1 diabetes presents with nausea, vomiting, and abdominal pain after missing insulin doses. Glucose is 480 mg/dL, arterial pH 7.12, bicarbonate 10 mEq/L, and the anion gap is 24. Serum potassium is 3.1 mEq/L. IV normal saline is infusing.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Begin an IV insulin infusion immediately while potassium is 3.1 mEq/L and replace potassium later.",
        "Replete potassium and hold insulin until potassium exceeds 3.5 mEq/L.",
        "Give IV sodium bicarbonate now to accelerate correction of metabolic acidosis and improve hemodynamics.",
        "Give subcutaneous long-acting insulin with rapid-acting correction doses and admit to the ward for monitoring."
      ],
      correct: 1,
      explanation: "DKA causes total-body potassium depletion despite variable serum levels. Insulin shifts potassium intracellularly, so starting insulin with a potassium of 3.1 mEq/L risks life-threatening hypokalemia and arrhythmia. <strong>Hold insulin until K &gt; 3.5 mEq/L</strong> while repleting (2024 ADA/EASD hyperglycemic crises consensus; older guidance used 3.3). Bicarbonate is considered only for severe acidosis with pH &lt; 7.0, not this patient's pH of 7.12.",
      flashcards: [
        { f: "In DKA, at what potassium level must insulin be held?", b: "If K <3.5 mEq/L, replete first and delay insulin until K >3.5 (2024 consensus).", x: "Despite serum K, DKA has total-body potassium depletion; insulin shifts K intracellularly and can trigger fatal arrhythmias.", t: "Trap: The hyperglycemia looks urgent, but insulin before K correction is dangerous when K is <3.5.", m: "K before insulin if under 3.5",
          tb: { h: ["Serum K", "Insulin plan", "Potassium plan"], r: [["<3.5", "Delay until >3.5", "Replete first"], [">3.5 to <5.0", "Give insulin", "Add K to fluids"], ["≥5.0", "Give insulin", "Monitor K closely"]] } },
        { f: "During DKA treatment, when should dextrose be added to IV fluids?", b: "When glucose falls below 250 mg/dL, while continuing insulin until DKA resolves.", x: "Dextrose prevents hypoglycemia so insulin can keep suppressing ketogenesis and clear ketoacidosis.", t: "Trap: Do not stop insulin just because glucose normalizes; the acidosis may persist.", m: "Dextrose lets insulin finish the gap" },
        { f: "What defines resolution of DKA during treatment?", b: "Plasma ketones <0.6 mmol/L plus pH ≥7.3 or bicarbonate ≥18 mEq/L.", x: "Ketone clearance proves ketoacidosis has resolved; the anion gap can mislead because treatment may cause hyperchloremia.", t: "Trap: Do not stop insulin just because glucose is <200; ketoacidosis may persist.", m: "Close ketones, not just glucose",
          tb: { h: ["DKA resolution item", "Target"], r: [["Ketones", "<0.6 mmol/L"], ["pH", "≥7.3"], ["Bicarbonate", "≥18 mEq/L"], ["Need", "Ketones plus pH or HCO3"]] } }
      ]
    },
    {
      id: "endo-adrenal-crisis",
      system: "ENDO",
      task: "RX",
      vignette: "A 61-year-old man on chronic prednisone for polymyalgia rheumatica stopped his steroids abruptly 4 days ago. He presents with fever, vomiting, profound fatigue, and hypotension (BP 78/50 mm Hg) that responds poorly to 2 L of IV crystalloid. Sodium is 128 mEq/L and glucose 58 mg/dL.",
      leadIn: "What is the most appropriate immediate management?",
      options: [
        "Give 3% saline for the hyponatremia.",
        "Perform a cosyntropin stimulation test and treat based on the result.",
        "Start norepinephrine and obtain an adrenal CT.",
        "IV hydrocortisone now, without waiting for confirmatory testing."
      ],
      correct: 3,
      explanation: "Abrupt withdrawal of chronic glucocorticoids causes adrenal crisis: refractory hypotension, hyponatremia, and hypoglycemia. <strong>Treatment must never be delayed for diagnostic testing</strong> — give IV hydrocortisone (which also has mineralocorticoid activity at stress doses) plus aggressive fluids and dextrose.",
      flashcards: [
        { f: "What is the immediate treatment for suspected adrenal crisis?", b: "IV hydrocortisone 100 mg plus isotonic fluids and dextrose.", x: "Hydrocortisone replaces cortisol and provides mineralocorticoid effect at stress doses; hypoglycemia and shock can be rapidly fatal.", t: "Trap: Draw cortisol if feasible, but never delay steroids for cosyntropin testing.", m: "Shock + steroids stopped: hydrocortisone now" },
        { f: "Which presentation should trigger empiric treatment for adrenal crisis?", b: "Refractory hypotension with hyponatremia, hypoglycemia, or recent steroid withdrawal.", x: "Loss of cortisol impairs vascular responsiveness to catecholamines and can mimic septic or distributive shock.", t: "Trap: Normal saline alone may not fix shock if cortisol deficiency is the driver.", m: "Cortisol restores pressor response" },
        { f: "How does primary adrenal insufficiency differ from secondary adrenal insufficiency?", b: "Primary has hyperkalemia and hyperpigmentation; secondary usually lacks both.", x: "Primary adrenal failure raises ACTH and lowers aldosterone; pituitary or steroid-withdrawal disease preserves aldosterone.", t: "Trap: Chronic steroid withdrawal causes secondary AI, so hyperkalemia is not expected.", m: "Primary = pigment and potassium",
          tb: { h: ["Feature", "Primary AI", "Secondary AI"], r: [["Aldosterone", "Low", "Usually preserved"], ["Potassium", "High", "Usually normal"], ["Skin", "Hyperpigmentation", "No hyperpigmentation"], ["ACTH", "High", "Low or inappropriately normal"]] } }
      ]
    },

    /* ================= Gastroenterology (9%) ================= */
    {
      id: "gi-variceal",
      system: "GI",
      task: "RX",
      vignette: "A 54-year-old man with cirrhosis due to alcohol-associated liver disease presents with hematemesis. Blood pressure is 92/58 mm Hg, heart rate 118/min. Hemoglobin is 8.9 g/dL. Two large-bore IVs are placed and crystalloid is started; urgent endoscopy is arranged.",
      leadIn: "Which combination is the most appropriate immediate pharmacologic management?",
      options: [
        "Fresh frozen plasma and vitamin K to normalize the INR before endoscopy, with vasoactive drugs delayed.",
        "IV proton-pump inhibitor alone and transfuse to hemoglobin 10 g/dL before endoscopic therapy.",
        "Start a nonselective beta-blocker immediately as the sole portal-pressure therapy during active bleeding.",
        "IV octreotide plus IV ceftriaxone, with restrictive transfusion after hemodynamic stabilization."
      ],
      correct: 3,
      explanation: "Suspected variceal hemorrhage is managed with a vasoactive agent (<strong>octreotide</strong>) plus <strong>prophylactic antibiotics</strong> (ceftriaxone), which reduce rebleeding and mortality. After stabilization, use a <strong>restrictive transfusion threshold (Hb &lt; 7 g/dL)</strong>, generally targeting 7–9 g/dL. Ongoing shock or major active blood loss may require transfusion before that laboratory threshold; hemoglobin can initially underestimate hemorrhage. Beta-blockers are for prophylaxis after stabilization, not during active bleeding.",
      flashcards: [
        { f: "What drugs are started immediately for suspected acute variceal hemorrhage?", b: "IV octreotide plus prophylactic IV ceftriaxone.", x: "Vasoactive therapy lowers portal inflow; antibiotics reduce infections, rebleeding, and mortality in cirrhotic GI bleeding.", t: "Trap: Endoscopy is urgent, but do not wait for it to start octreotide and antibiotics.", m: "Octreotide plus ceftriaxone before scope",
          tb: { h: ["Medication", "Role in variceal bleed"], r: [["Octreotide", "Lowers portal pressure"], ["Ceftriaxone", "Prevents infection"], ["PPI", "Use until source clarified"]] } },
        { f: "What hemoglobin threshold is used for transfusion in upper GI bleeding?", b: "Usually Hb <7 g/dL after stabilization; individualize for ongoing shock, major blood loss, or cardiac ischemia.", x: "Restrictive transfusion avoids raising portal pressure and is associated with better outcomes in variceal bleeding.", t: "Trap: Do not wait for Hb <7 during uncontrolled hemorrhagic shock; Hb may lag acute blood loss.", m: "Restrict after resuscitation" },
        { f: "During active variceal bleeding, what is the role of nonselective beta-blockers?", b: "Hold during the acute bleed; use after stabilization for secondary prophylaxis.", x: "Beta-blockers prevent future variceal bleeding but may worsen hypotension during hemorrhage.", t: "Trap: Carvedilol/nadolol are prophylaxis drugs, not acute hemostatic therapy.", m: "Beta-block after the bleed",
          tb: { h: ["Phase", "NSBB role"], r: [["Active bleed", "Hold"], ["After stabilization", "Secondary prophylaxis"], ["With band ligation", "Reduces rebleeding"]] } }
      ]
    },
    {
      id: "gi-crc-screening",
      system: "GI",
      task: "RISK",
      vignette: "A healthy, asymptomatic 38-year-old man asks about colorectal cancer screening. His father was diagnosed with colon cancer at age 52. He has no GI symptoms, and his examination is normal.",
      leadIn: "What is the most appropriate screening recommendation?",
      options: [
        "Begin screening colonoscopy at age 45, repeating every 10 years.",
        "Begin screening colonoscopy at age 40, repeating every 5 years.",
        "Annual fecal immunochemical testing beginning now.",
        "No screening needed until age 50."
      ],
      correct: 1,
      explanation: "With a first-degree relative diagnosed with colorectal cancer before age 60, screening colonoscopy begins at <strong>age 40 — or 10 years before the relative's diagnosis age, whichever is earlier</strong> — and repeats every 5 years. Average-risk screening now starts at age 45.",
      flashcards: [
        { f: "When should average-risk colorectal cancer screening begin?", b: "Age 45.", x: "Screening options include colonoscopy every 10 years or stool-based tests at recommended intervals if average risk.", t: "Trap: Family history or hereditary syndromes move patients out of average-risk stool-test pathways.", m: "Average risk starts at 45" },
        { f: "A first-degree relative had CRC before 60; when and how often is colonoscopy done?", b: "Start at age 40 or 10 years before diagnosis, whichever is earlier; repeat every 5 years.", x: "Early familial CRC risk is high enough that colonoscopy is preferred over stool-based screening.", t: "Trap: Do not use the average-risk age 45 start or 10-year interval in this scenario.", m: "Family before 60: 40 or 10 earlier, every 5",
          tb: { h: ["Family history", "Start", "Interval"], r: [["FDR CRC <60", "40 or 10 y before", "Every 5 y"], ["Two FDRs any age", "40 or 10 y before", "Every 5 y"], ["One FDR ≥60", "Age 40", "Average-risk interval"]] } },
        { f: "Who can use stool-based colorectal cancer screening tests?", b: "Average-risk patients; any positive stool test requires colonoscopy.", x: "Stool tests detect occult blood or abnormal DNA but cannot remove polyps or diagnose the source.", t: "Trap: A positive FIT is not repeated for confirmation; it mandates colonoscopy.", m: "Positive stool test goes to scope" }
      ]
    },
    {
      id: "gi-cdiff",
      system: "GI",
      task: "RX",
      vignette: "A 67-year-old woman develops profuse watery diarrhea, abdominal cramping, and leukocytosis of 17,000/µL ten days after completing a course of clindamycin. Stool testing is positive for Clostridioides difficile toxin. She is hemodynamically stable with no ileus. This is her first episode.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "IV vancomycin 15 mg/kg every 12 hours.",
        "Oral metronidazole.",
        "Oral fidaxomicin or oral vancomycin.",
        "Loperamide and oral rehydration alone."
      ],
      correct: 2,
      explanation: "First-line therapy for an initial, non-fulminant C. difficile episode is <strong>oral fidaxomicin</strong> (preferred) or <strong>oral vancomycin</strong>. Oral metronidazole is no longer first-line. IV vancomycin does not reach the gut lumen, and antimotility monotherapy is inappropriate.",
      flashcards: [
        { f: "What is first-line therapy for an initial nonfulminant C. difficile infection?", b: "Oral fidaxomicin preferred, or oral vancomycin.", x: "Fidaxomicin is narrower spectrum and lowers recurrence risk compared with vancomycin in many patients.", t: "Trap: Metronidazole is no longer preferred first-line when fidaxomicin or vancomycin is available.", m: "Fidax or vanco by mouth" },
        { f: "How is fulminant C. difficile infection treated?", b: "High-dose oral vancomycin plus IV metronidazole; add rectal vancomycin if ileus.", x: "Fulminant disease means hypotension, shock, ileus, or megacolon; IV metronidazole reaches inflamed colon systemically.", t: "Trap: IV vancomycin treats bloodstream gram-positives but does not reach the gut lumen for C. difficile.", m: "Fulminant C diff: vanco PO plus metro IV",
          tb: { h: ["Fulminant feature", "Treatment implication"], r: [["Hypotension or shock", "High-dose oral vancomycin"], ["Ileus", "Add rectal vancomycin"], ["Severe systemic illness", "Add IV metronidazole"]] } },
        { f: "How are recurrent C. difficile episodes managed?", b: "Fidaxomicin or vancomycin taper-pulse; consider screened FMT or approved microbiota therapy after antibiotics for recurrent disease.", x: "Recurrence reflects disrupted microbiota and persistent spores, so taper or microbiota restoration reduces relapse. Bezlotoxumab was discontinued in the US in 2025.", t: "Trap: Microbiota products prevent recurrence after antibacterial treatment; they do not replace antibiotics for an active episode.", m: "Recurrence means spores and microbiome",
          tb: { h: ["Episode pattern", "Options"], r: [["First recurrence", "Fidaxomicin or vanco taper"], ["Multiple recurrences", "Screened FMT or microbiota therapy"], ["Microbiota timing", "After antibacterial treatment"]] } }
      ]
    },

    /* ================= Infectious Disease (9%) ================= */
    {
      id: "id-cap",
      system: "ID",
      task: "RX",
      vignette: "A 45-year-old previously healthy man has 3 days of fever, productive cough, and pleuritic chest pain. He has no chronic illnesses and has taken no antibiotics in the past 90 days. Oxygen saturation is 97% on room air and his CURB-65 score is 0. Chest radiograph shows a right lower lobe infiltrate. Outpatient treatment is planned.",
      leadIn: "What is the most appropriate empiric antibiotic therapy?",
      options: [
        "Oseltamivir monotherapy.",
        "Vancomycin plus piperacillin-tazobactam.",
        "Ceftriaxone plus azithromycin.",
        "High-dose amoxicillin."
      ],
      correct: 3,
      explanation: "For a <strong>healthy outpatient</strong> with community-acquired pneumonia and no recent antibiotic exposure, first-line empiric therapy is <strong>high-dose amoxicillin</strong> (or doxycycline). Combination and broad-spectrum regimens are reserved for patients with comorbidities or inpatients; MRSA/Pseudomonas coverage requires specific risk factors.",
      flashcards: [
        { f: "What is empiric therapy for CAP in a healthy outpatient without recent antibiotics?", b: "High-dose amoxicillin or doxycycline.", x: "These cover typical pneumococcus; macrolide monotherapy depends on low local pneumococcal resistance.", t: "Trap: Broad combination therapy is for comorbid outpatients or inpatients, not healthy low-risk outpatients.", m: "Healthy outpatient CAP: amox or doxy" },
        { f: "How are comorbid outpatients with CAP treated empirically?", b: "Amoxicillin/clavulanate or cephalosporin plus macrolide/doxycycline, or respiratory fluoroquinolone alone.", x: "Comorbidities increase risk for resistant pneumococcus and gram-negative pathogens, requiring broader coverage.", t: "Trap: MRSA or Pseudomonas coverage requires specific prior isolation or recent hospitalization with IV antibiotics.", m: "Comorbid CAP needs atypical plus broader typical",
          tb: { h: ["Outpatient CAP", "Empiric therapy"], r: [["Healthy", "Amoxicillin or doxycycline"], ["Comorbid combo", "Beta-lactam plus mac/doxy"], ["Comorbid alternative", "Respiratory fluoroquinolone"]] } },
        { f: "What CURB-65 score generally supports hospitalizing CAP?", b: "Score ≥2; ATS/IDSA prefers the Pneumonia Severity Index plus clinical judgment for admission decisions.", x: "CURB-65 assigns a point for confusion, BUN >19 mg/dL (urea >7 mmol/L), RR ≥30, SBP <90 or DBP ≤60, and age ≥65.", t: "Trap: A low score does not override hypoxemia, inability to take PO, or unsafe outpatient follow-up.", m: "CURB-65: 2 usually comes in",
          tb: { h: ["CURB-65 score", "Usual site"], r: [["0-1", "Outpatient usually"], ["2", "Hospitalize generally"], ["3-5", "Severe; consider ICU"]] } }
      ]
    },
    {
      id: "id-lyme-em",
      system: "ID",
      task: "RX",
      vignette: "A 34-year-old man from Connecticut presents in July with 2 days of a slowly expanding, 8-cm erythematous annular patch with central clearing on his thigh, along with fatigue and myalgias. He hikes frequently but does not recall a tick bite. He has no neurologic or cardiac findings.",
      leadIn: "What is the most appropriate management?",
      options: [
        "Order Lyme serology and treat only if positive.",
        "Treat empirically with oral doxycycline now.",
        "Obtain a skin biopsy of the lesion.",
        "Reassure him; the rash will resolve without therapy."
      ],
      correct: 1,
      explanation: "This is <strong>erythema migrans</strong> — a clinical diagnosis sufficient to treat early localized Lyme disease. Serology is frequently <strong>falsely negative in the first weeks</strong> of infection, so testing should not delay therapy. Oral doxycycline for 10 days is a recommended regimen; amoxicillin or cefuroxime for 14 days are alternatives.",
      flashcards: [
        { f: "How is erythema migrans after tick exposure managed diagnostically?", b: "Diagnose clinically and treat; do not wait for serology.", x: "Antibodies are often negative in the first weeks, while the expanding annular rash is sufficient for early Lyme disease.", t: "Trap: Two-tier serology is for uncertain or disseminated presentations, not classic erythema migrans.", m: "Bullseye is a bedside diagnosis" },
        { f: "What is first-line oral therapy for early localized Lyme disease?", b: "Doxycycline for 10 days; amoxicillin or cefuroxime are alternatives.", x: "Doxycycline also covers possible Anaplasma coinfection in endemic tick exposures.", t: "Trap: A single prophylactic doxycycline dose is only for high-risk asymptomatic Ixodes bites, not erythema migrans.", m: "EM gets a treatment course, not one dose" },
        { f: "When is Lyme serology most appropriate?", b: "Suspected disseminated Lyme disease such as AV block, facial palsy, meningitis, or arthritis.", x: "Later disease has a stronger antibody response, so two-tier testing is more sensitive and specific.", t: "Trap: Testing low-pretest-probability fatigue or aches creates false positives.", m: "Late Lyme is when serology shines" }
      ]
    },
    {
      id: "id-latent-tb",
      system: "ID",
      task: "NEXT",
      vignette: "An asymptomatic 41-year-old nurse who previously lived in a high-TB-incidence country has a positive interferon-gamma release assay on pre-employment screening. She has no cough, fever, night sweats, or weight loss. Chest radiograph is normal. She has never been treated for tuberculosis, has no known hepatic disease, and takes no interacting medications.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Begin four-drug RIPE therapy (rifampin, isoniazid, pyrazinamide, ethambutol) for active tuberculosis.",
        "Treat latent tuberculosis with a short-course rifamycin regimen such as 4 months of rifampin.",
        "No treatment; repeat the chest radiograph annually and treat only if it becomes abnormal.",
        "Repeat the IGRA in 3 months to confirm before considering any therapy."
      ],
      correct: 1,
      explanation: "A positive IGRA with no symptoms and a normal chest radiograph defines <strong>latent TB infection</strong>. Treatment reduces lifetime reactivation risk; <strong>short-course rifamycin regimens</strong> (4 months rifampin, or 3 months weekly isoniazid-rifapentine) are preferred over 9 months of isoniazid for completion and hepatotoxicity. Active disease must be excluded first — it was, by symptoms and imaging.",
      flashcards: [
        { f: "What supports latent TB infection after a positive IGRA?", b: "Evidence of TB infection without clinical or radiographic active disease after appropriate evaluation.", x: "Active pulmonary disease must be excluded first because monotherapy would select resistance. Low-risk healthcare personnel with an unexpected positive screen need a second test for confirmation.", t: "Trap: A positive IGRA cannot distinguish latent from active TB; symptoms, risk, and imaging guide evaluation.", m: "Infection without active disease = latent" },
        { f: "What preferred short-course regimens treat latent TB infection?", b: "4 months daily rifampin or 3 months weekly isoniazid plus rifapentine.", x: "Rifamycin-based regimens have higher completion and less hepatotoxicity than 9 months of isoniazid.", t: "Trap: Check drug interactions; rifamycins induce CYP enzymes and can reduce DOAC or contraceptive levels.", m: "4R or 3HP beat 9H" },
        { f: "Why can latent TB be treated with one or two drugs but active TB cannot?", b: "Latent TB has low organism burden; active TB requires multidrug therapy to prevent resistance.", x: "Rapidly replicating bacilli in active disease harbor spontaneous resistant mutants unless treated with combination therapy.", t: "Trap: Never start latent TB monotherapy until active TB has been ruled out.", m: "Latent is few bugs; active is many" }
      ]
    },

    /* ================= Pulmonary (9%) ================= */
    {
      id: "pulm-osa",
      system: "PULM",
      task: "TEST",
      vignette: "A 52-year-old obese man with hypertension resistant to three antihypertensives reports loud snoring, witnessed apneas, and daytime sleepiness (Epworth score 14). He has no heart failure, COPD, neuromuscular disease, or opioid use.",
      leadIn: "What is the most appropriate next diagnostic step?",
      options: [
        "Overnight pulse oximetry alone.",
        "Empiric auto-titrating CPAP without testing.",
        "Home sleep apnea testing.",
        "CT imaging of the neck and upper airway."
      ],
      correct: 2,
      explanation: "With a <strong>high pretest probability of obstructive sleep apnea</strong> and <strong>no significant cardiopulmonary comorbidity</strong>, a home sleep apnea test is the appropriate first study. In-laboratory polysomnography is reserved for comorbid heart failure, COPD, neuromuscular disease, hypoventilation, or a negative/inconclusive home study.",
      flashcards: [
        { f: "Who is appropriate for home sleep apnea testing?", b: "Uncomplicated adults with high pretest probability of moderate-to-severe OSA.", x: "Home testing performs best when the clinical likelihood is high and there is no major cardiopulmonary or neuromuscular disease.", t: "Trap: Negative or inconclusive home testing requires in-lab polysomnography if suspicion remains.", m: "High probability and uncomplicated can test at home" },
        { f: "Which hypertension pattern should prompt screening for OSA symptoms?", b: "Resistant hypertension.", x: "Intermittent hypoxemia and sympathetic surges worsen BP control and often coexist with obesity and daytime sleepiness.", t: "Trap: Do not screen by sleepiness alone; snoring, witnessed apneas, and resistant HTN are key clues.", m: "Resistant BP snores for a reason" },
        { f: "What is first-line treatment for symptomatic obstructive sleep apnea?", b: "CPAP.", x: "Positive airway pressure splints the upper airway, improving sleepiness, quality of life, and blood pressure.", t: "Trap: Weight loss helps but should not delay CPAP in symptomatic moderate-to-severe OSA.", m: "CPAP splints the airway" }
      ]
    },
    {
      id: "pulm-pe-doac",
      system: "PULM",
      task: "RX",
      vignette: "A 48-year-old woman develops pleuritic chest pain and dyspnea 5 days after a transatlantic flight. Heart rate is 102/min, blood pressure 128/80 mm Hg, oxygen saturation 95%. CT pulmonary angiography shows a segmental pulmonary embolism. Troponin and renal function are normal, and she has no hypotension.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Warfarin monotherapy starting today without a parenteral bridge.",
        "Systemic thrombolysis with alteplase.",
        "An IVC filter.",
        "A direct oral anticoagulant such as apixaban or rivaroxaban."
      ],
      correct: 3,
      explanation: "For hemodynamically stable PE, <strong>DOACs are first-line</strong>; apixaban and rivaroxaban can be started without a heparin lead-in. Thrombolysis is reserved for massive PE with <strong>hypotension</strong>. IVC filters are for patients who cannot be anticoagulated, and warfarin requires overlapping parenteral anticoagulation.",
      flashcards: [
        { f: "What is first-line anticoagulation for hemodynamically stable pulmonary embolism?", b: "A DOAC; apixaban or rivaroxaban can start without heparin lead-in.", x: "DOACs are as effective as warfarin for most VTE and cause less intracranial bleeding, with simpler outpatient use.", t: "Trap: Dabigatran and edoxaban require initial parenteral anticoagulation; apixaban/rivaroxaban do not.", m: "Stable PE likes a DOAC" },
        { f: "When is systemic thrombolysis indicated for pulmonary embolism?", b: "Massive PE with hypotension or shock.", x: "Thrombolysis rapidly relieves obstructive shock but increases major bleeding, so it is reserved for instability.", t: "Trap: RV strain with normal BP is submassive PE; anticoagulation is usual unless deterioration occurs.", m: "Shock PE gets lysis" },
        { f: "How long is anticoagulation given for VTE provoked by a transient risk factor?", b: "3 months.", x: "After surgery, travel, or estrogen exposure, recurrence risk falls once the provoking factor is gone.", t: "Trap: Unprovoked or persistent-risk VTE often needs extended therapy if bleeding risk is acceptable.", m: "Provoked clot: 3 months" }
      ]
    },
    {
      id: "pulm-copd-dx",
      system: "PULM",
      task: "TEST",
      vignette: "A 58-year-old man with a 35-pack-year smoking history reports 2 years of progressive exertional dyspnea and a chronic productive cough. Examination reveals a prolonged expiratory phase and scattered wheezes. You suspect chronic obstructive pulmonary disease.",
      leadIn: "What is required to confirm the diagnosis?",
      options: [
        "An elevated serum alpha-1 antitrypsin level in a smoker with chronic cough and wheezing.",
        "Hyperinflation on chest radiograph without confirmatory airflow obstruction testing.",
        "A post-bronchodilator FEV1/FVC ratio below 0.70 on spirometry.",
        "A DLCO below 80% of predicted to document emphysema physiology in a symptomatic long-term smoker."
      ],
      correct: 2,
      explanation: "COPD is confirmed by demonstrating <strong>fixed airflow obstruction: a post-bronchodilator FEV1/FVC &lt; 0.70</strong>. Imaging and DLCO support assessment but are not diagnostic. Alpha-1 antitrypsin should be checked at least once in every COPD patient but is a cause, not the definition.",
      flashcards: [
        { f: "What spirometry result confirms COPD?", b: "Post-bronchodilator FEV1/FVC <0.70.", x: "Persistent airflow obstruction after bronchodilator distinguishes COPD from fully reversible asthma physiology.", t: "Trap: CT emphysema or symptoms support COPD but do not replace diagnostic spirometry.", m: "COPD is post-bronchodilator obstruction" },
        { f: "Which interventions have survival benefit in COPD?", b: "Smoking cessation, long-term oxygen for severe chronic resting hypoxemia, and triple inhaler therapy in selected high-risk exacerbators.", x: "Oxygen improves survival when PaO₂ ≤55 mm Hg or SaO₂ ≤88%, or PaO₂ 56–59 with cor pulmonale/polycythemia. Triple therapy has mortality evidence in selected symptomatic patients with prior exacerbations.", t: "Trap: Oxygen does not improve survival for moderate hypoxemia alone; inhaled steroids are not indicated for every COPD patient.", m: "Quit smoke, indicated oxygen, selected triple therapy" },
        { f: "Who with COPD should be tested for alpha-1 antitrypsin deficiency?", b: "All patients with COPD at least once.", x: "Testing is especially high-yield with young onset, minimal smoking, basilar emphysema, or family history.", t: "Trap: Do not restrict testing only to never-smokers; guidelines recommend once-per-patient testing.", m: "Every COPD gets one A1AT check" }
      ]
    },

    /* ================= Rheumatology (9%) ================= */
    {
      id: "rheum-gout",
      system: "RHEUM",
      task: "DX",
      vignette: "A 48-year-old man awakens with excruciating pain, redness, and swelling of the right first metatarsophalangeal joint. He drinks beer daily and takes hydrochlorothiazide. Temperature is 37.6 °C. Serum urate is 8.2 mg/dL.",
      leadIn: "What is the most appropriate next step to establish the diagnosis?",
      options: [
        "Accept the elevated serum urate as diagnostic of gout and avoid joint aspiration during the flare.",
        "Arthrocentesis with polarized light microscopy of synovial fluid.",
        "Plain radiograph of the foot to confirm urate crystal deposition in the first attack.",
        "Begin empiric allopurinol and reassess serum urate in 2 weeks instead of sampling the joint."
      ],
      correct: 1,
      explanation: "To establish a definitive crystal diagnosis, perform <strong>arthrocentesis with polarized microscopy</strong>; send Gram stain and culture to assess for coexisting infection. Gout shows <strong>needle-shaped, negatively birefringent</strong> monosodium urate crystals. Serum urate is not diagnostic and may be normal during an acute flare. Urate-lowering therapy alone does not treat acute pain.",
      flashcards: [
        { f: "On synovial fluid microscopy, how do gout and pseudogout crystals differ?", b: "Gout: needle-shaped, negatively birefringent MSU; pseudogout: rhomboid, weakly positively birefringent CPPD.", x: "Crystals establish crystal arthritis but do not exclude coexisting septic arthritis; also send Gram stain and culture.", t: "Trap: Do not diagnose acute monoarthritis by serum urate alone; aspirate when diagnosis or infection is uncertain.", m: "Needles are negative; rhomboids are positive",
          tb: { h: ["Crystal disease", "Shape", "Birefringence"], r: [["Gout", "Needle", "Negative"], ["Pseudogout", "Rhomboid", "Weak positive"]] } },
        { f: "Can a normal serum urate level during an acute flare rule out gout?", b: "No; serum urate may be normal or low during a gout flare.", x: "Inflammation and renal handling can transiently lower urate, so synovial fluid crystals are the diagnostic gold standard.", t: "Trap: Hyperuricemia is common and not diagnostic without compatible arthritis or crystals.", m: "Urate can lie during a flare" },
        { f: "If a patient on allopurinol develops an acute gout flare, what should be done with it?", b: "Continue allopurinol; treat the flare and use prophylaxis when starting urate-lowering therapy.", x: "Stopping urate-lowering therapy causes urate swings that can prolong or trigger flares.", t: "Trap: Do not start urate lowering alone for acute pain; use NSAID, colchicine, or glucocorticoid for the flare.", m: "Do not stop the allopurinol train" }
      ]
    },
    {
      id: "rheum-gca",
      system: "RHEUM",
      task: "NEXT",
      vignette: "A 72-year-old woman reports 2 weeks of new temporal headache, jaw pain with chewing, and this morning, transient monocular vision loss lasting 5 minutes. The right temporal artery is tender and nodular. ESR is 96 mm/h and CRP is markedly elevated.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Begin low-dose aspirin alone and reassess in 1 week.",
        "Schedule temporal artery biopsy and withhold treatment until the result returns.",
        "Order MRI of the brain and defer therapy.",
        "Start high-dose glucocorticoids immediately, then arrange temporal artery biopsy."
      ],
      correct: 3,
      explanation: "Giant cell arteritis with visual symptoms threatens <strong>permanent blindness</strong> — glucocorticoids must be started <strong>immediately</strong>, before biopsy. The temporal artery biopsy remains diagnostic for at least 2 weeks after starting steroids, so treatment never waits for tissue confirmation.",
      flashcards: [
        { f: "What is the first step in suspected giant cell arteritis with visual symptoms?", b: "Immediate high-dose glucocorticoids, preferably IV methylprednisolone.", x: "Vision loss can become permanent within hours to days, so treatment precedes diagnostic confirmation.", t: "Trap: Temporal artery biopsy is important but must not delay steroids.", m: "Vision symptoms: steroids before biopsy" },
        { f: "After starting steroids for suspected GCA, how long can temporal artery biopsy remain positive?", b: "At least 2 weeks.", x: "Skip lesions require an adequate specimen, but histologic arteritis often persists after therapy begins.", t: "Trap: A negative biopsy does not fully exclude GCA if clinical suspicion is high or disease is segmental.", m: "Biopsy window stays open after steroids" },
        { f: "Which clinical clues strongly suggest giant cell arteritis?", b: "Age >50, new headache, jaw claudication, visual symptoms, and ESR/CRP elevation.", x: "Polymyalgia rheumatica symptoms occur in about half, reflecting shared large-vessel inflammation.", t: "Trap: Jaw claudication is ischemic chewing pain, not TMJ clicking or chronic jaw soreness.", m: "Over 50 with jaw and vision: think GCA" }
      ]
    },
    {
      id: "rheum-ra-mtx",
      system: "RHEUM",
      task: "RX",
      vignette: "A 44-year-old woman has 3 months of symmetric pain and swelling of the MCP and PIP joints of both hands with 90 minutes of morning stiffness. Examination confirms synovitis in 10 joints and moderate-to-high disease activity. Anti-CCP antibodies are strongly positive and radiographs show periarticular osteopenia without erosions. She is not pregnant or planning pregnancy, and CBC, kidney function, and liver tests are normal.",
      leadIn: "What is the most appropriate initial therapy?",
      options: [
        "Long-term daily prednisone as monotherapy.",
        "NSAIDs alone, escalating the dose as needed.",
        "Methotrexate with folic acid supplementation.",
        "A TNF inhibitor as first-line monotherapy."
      ],
      correct: 2,
      explanation: "This is rheumatoid arthritis, and early initiation of a disease-modifying agent prevents irreversible joint destruction. <strong>Methotrexate is the anchor first-line DMARD</strong> (with folic acid to limit toxicity). NSAIDs and steroids relieve symptoms but do not alter disease course as monotherapy; biologics are added after inadequate methotrexate response.",
      flashcards: [
        { f: "Which autoantibody is most specific for rheumatoid arthritis?", b: "Anti-CCP antibody.", x: "Anti-CCP also predicts erosive disease; rheumatoid factor is less specific and can appear in infections or other autoimmune disease.", t: "Trap: A positive RF alone is not diagnostic of RA.", m: "Anti-CCP is RA-specific" },
        { f: "What is preferred initial DMARD therapy for moderate-to-high activity rheumatoid arthritis?", b: "Weekly methotrexate with folic acid supplementation, if no contraindication.", x: "Early DMARD therapy prevents erosions and disability; monitor CBC, liver tests, renal function, and hepatitis status. Hydroxychloroquine may be preferred for low disease activity.", t: "Trap: Methotrexate is weekly, not daily, and is teratogenic; avoid in pregnancy and significant liver disease.", m: "Methotrexate is the weekly RA anchor" },
        { f: "What role do NSAIDs and glucocorticoids have in rheumatoid arthritis?", b: "NSAIDs relieve symptoms; glucocorticoids may be a short bridge but are not an acceptable long-term substitute for DMARDs.", x: "Steroids can suppress inflammation and erosions but have substantial cumulative toxicity; treat-to-target DMARD therapy is the foundation.", t: "Trap: Pain improvement on prednisone should not delay starting a DMARD.", m: "NSAIDs soothe; DMARDs anchor long-term control" }
      ]
    },

    /* ================= Nephrology (6%) ================= */
    {
      id: "neph-hyponatremia",
      system: "NEPH",
      task: "RX",
      vignette: "A 58-year-old woman with small cell lung cancer is brought in after a witnessed generalized seizure. She is confused. Serum sodium is 114 mEq/L, serum osmolality 238 mOsm/kg, urine osmolality 450 mOsm/kg, and urine sodium 60 mEq/L. She is clinically euvolemic.",
      leadIn: "What is the most appropriate immediate treatment?",
      options: [
        "Oral salt tablets and a vasopressin receptor antagonist as outpatient-style therapy for SIADH.",
        "Fluid restriction alone while observing for spontaneous improvement after the seizure.",
        "Rapid infusion of isotonic saline at 500 mL/h to expand effective arterial volume and suppress ADH release.",
        "A 100-mL bolus of 3% hypertonic saline, repeated as needed for symptoms."
      ],
      correct: 3,
      explanation: "Severe symptomatic hyponatremia (seizures, obtundation) is treated with <strong>100-mL boluses of 3% saline</strong> to urgently raise sodium by 4–6 mEq/L and stop cerebral edema. This is SIADH (euvolemic, concentrated urine, urine Na &gt; 30); isotonic saline can paradoxically worsen the sodium. Correction must not exceed ~8 mEq/L per 24 h to avoid osmotic demyelination.",
      flashcards: [
        { f: "How is severe symptomatic hyponatremia with seizure treated?", b: "3% saline 100-mL IV boluses to raise Na by 4–6 mEq/L initially.", x: "A small rapid rise reduces cerebral edema; after symptoms improve, slow correction prevents demyelination.", t: "Trap: Fluid restriction is for chronic SIADH, not a seizure from acute severe hyponatremia.", m: "Seizure sodium: 3% bolus, small rise" },
        { f: "What is the maximum usual sodium correction in hyponatremia per 24 hours?", b: "≤8 mEq/L in 24 hours.", x: "Overcorrection can cause osmotic demyelination, especially with alcoholism, malnutrition, liver disease, or hypokalemia.", t: "Trap: Symptom control needs only a 4–6 mEq/L rise, not normalization in one day.", m: "8 per day keeps myelin safe" },
        { f: "What lab pattern supports SIADH as the cause of hyponatremia?", b: "Euvolemia, serum osm <275, urine osm >100, and urine Na >30 mEq/L.", x: "ADH-driven water retention keeps urine inappropriately concentrated despite hypotonic plasma.", t: "Trap: Isotonic saline can worsen SIADH because sodium is excreted while water is retained.", m: "SIADH: dilute blood, concentrated urine",
          tb: { h: ["SIADH feature", "Typical finding"], r: [["Volume status", "Euvolemic"], ["Serum osm", "<275 mOsm/kg"], ["Urine osm", ">100 mOsm/kg"], ["Urine Na", ">30 mEq/L"]] } }
      ]
    },
    {
      id: "neph-prerenal",
      system: "NEPH",
      task: "DX",
      vignette: "A 76-year-old man with 3 days of vomiting and poor oral intake has a creatinine of 2.4 mg/dL (baseline 1.0) and BUN of 58 mg/dL. He is orthostatic with dry mucous membranes. Urinalysis shows a bland sediment; fractional excretion of sodium is 0.4%. He takes no nephrotoxic medications.",
      leadIn: "Which of the following best characterizes his acute kidney injury?",
      options: [
        "Acute tubular necrosis from ischemia.",
        "Prerenal azotemia from volume depletion.",
        "Acute interstitial nephritis.",
        "Obstructive (postrenal) nephropathy."
      ],
      correct: 1,
      explanation: "A BUN:creatinine ratio &gt; 20:1, <strong>FeNa &lt; 1%</strong>, bland urine sediment, and a clear volume-loss history define <strong>prerenal azotemia</strong> — intact tubules are avidly reclaiming sodium. ATN would show FeNa &gt; 2% with muddy brown granular casts. Treatment is volume repletion.",
      flashcards: [
        { f: "Which urine/lab pattern supports prerenal azotemia?", b: "FeNa <1%, BUN:Cr >20:1, bland sediment, and concentrated urine.", x: "Intact tubules avidly reclaim sodium and water in response to low effective arterial volume.", t: "Trap: FeNa is unreliable with diuretics or some intrinsic AKI; FeUrea can help but is not definitive.", m: "Dry kidneys hold sodium",
          tb: { h: ["Finding", "Prerenal", "ATN"], r: [["FeNa", "<1%", ">2%"], ["BUN:Cr", ">20:1", "Often <15:1"], ["Sediment", "Bland", "Muddy brown casts"], ["Urine", "Concentrated", "Less concentrated"]] } },
        { f: "Which urine findings support acute tubular necrosis rather than prerenal AKI?", b: "Muddy brown granular casts; FeNa is often >2% but may be lower.", x: "Tubular injury impairs sodium reabsorption and sheds epithelial casts; early, septic, or pigment-associated ATN can still have low FeNa.", t: "Trap: Persistent AKI after fluids suggests tubular injury but is not diagnostic without the clinical context.", m: "Muddy brown means tubules down" },
        { f: "Which fractional excretion test may help assess AKI after diuretic exposure?", b: "Fractional excretion of urea; <35% supports prerenal physiology but does not prove it.", x: "Diuretics increase urinary sodium; urea handling is less directly affected, but sepsis, CKD, and diuretics can still limit FeUrea accuracy.", t: "Trap: Neither FeNa nor FeUrea should replace volume assessment, urine microscopy, and serial clinical response.", m: "Fractional excretion supports, not settles" }
      ]
    },

    /* ================= Hematology (6%) ================= */
    {
      id: "heme-ida-gi",
      system: "HEME",
      task: "NEXT",
      vignette: "A 66-year-old man is found to have a hemoglobin of 9.8 g/dL with an MCV of 72 fL on routine labs. Ferritin is 8 ng/mL and transferrin saturation is 5%. He reports no overt bleeding, melena, or NSAID use, and he has never had colorectal cancer screening.",
      leadIn: "In addition to iron repletion, what is the most appropriate next step?",
      options: [
        "Bone marrow biopsy with iron staining.",
        "Oral iron replacement with repeat CBC in 3 months.",
        "Colonoscopy and upper endoscopy.",
        "CT colonography without upper endoscopy."
      ],
      correct: 2,
      explanation: "New iron deficiency anemia in a man (or postmenopausal woman) is <strong>presumed gastrointestinal blood loss until proven otherwise</strong> — occult malignancy must be excluded with colonoscopy and upper endoscopy, regardless of symptoms. Iron alone would mask the underlying lesion.",
      flashcards: [
        { f: "What evaluation is required for new iron deficiency anemia in a man?", b: "Bidirectional endoscopy: colonoscopy and upper endoscopy.", x: "Occult GI blood loss, including malignancy, is presumed until proven otherwise even without GI symptoms.", t: "Trap: Iron replacement alone can correct anemia while delaying cancer diagnosis.", m: "Iron-poor man needs both scopes" },
        { f: "What ferritin cutoff supports iron deficiency in anemic adults?", b: "Ferritin <45 ng/mL supports iron deficiency; lower cutoffs are more specific but less sensitive.", x: "Ferritin reflects iron stores but rises with inflammation, so iron deficiency can exist at higher ferritin in chronic disease.", t: "Trap: A normal ferritin does not exclude iron deficiency during inflammation or liver disease.", m: "Ferritin 45 is the AGA cutoff" },
        { f: "How do iron studies distinguish IDA from anemia of chronic disease?", b: "IDA: low ferritin, low iron, high TIBC. ACD: normal/high ferritin, low iron, low TIBC.", x: "Inflammation raises hepcidin, trapping iron in macrophages and lowering transferrin production.", t: "Trap: Both can have low serum iron; TIBC and ferritin provide the distinction.", m: "IDA high TIBC; inflammation low TIBC",
          tb: { h: ["Iron study", "IDA", "ACD"], r: [["Ferritin", "Low", "Normal or high"], ["Serum iron", "Low", "Low"], ["TIBC", "High", "Low"], ["Transferrin sat", "Low", "Low"]] } }
      ]
    },
    {
      id: "heme-hit",
      system: "HEME",
      task: "NEXT",
      vignette: "A 70-year-old woman on postoperative day 7 after hip arthroplasty, receiving prophylactic unfractionated heparin, develops a platelet count of 62,000/µL (from 210,000 on admission) and a new swollen, painful left leg. Doppler confirms a DVT. Her 4Ts score is high.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Stop heparin and begin warfarin with daily INR monitoring.",
        "Pause heparin pending PF4 antibody and functional assay results.",
        "Replace unfractionated heparin with therapeutic enoxaparin.",
        "Stop all heparin and begin therapeutic argatroban."
      ],
      correct: 3,
      explanation: "A &gt; 50% platelet fall on days 5–10 of heparin plus new thrombosis supports <strong>HIT with thrombosis</strong>. Stop all heparin, including LMWH and flushes, and begin <strong>therapeutic non-heparin anticoagulation</strong> without waiting for confirmation. Send a PF4 immunoassay and, when indicated, a functional assay. Avoid routine platelet transfusion, although active bleeding or a high-risk procedure can warrant it. Do not start warfarin before platelet recovery because early protein C depletion can cause venous limb gangrene.",
      flashcards: [
        { f: "When should heparin-induced thrombocytopenia be suspected?", b: ">50% platelet fall 5–10 days after heparin exposure, especially with new thrombosis.", x: "HIT antibodies activate platelets through PF4-heparin complexes, creating a paradoxically prothrombotic state.", t: "Trap: Platelets often do not fall below 20,000/µL; severe thrombocytopenia suggests another cause.", m: "Day 5 to 10 platelet fall with clot" },
        { f: "What is the immediate management of suspected HIT with thrombosis?", b: "Stop all heparin and start argatroban, bivalirudin, or fondaparinux.", x: "All heparin sources include LMWH and line flushes; alternative anticoagulation prevents new and progressive thrombosis.", t: "Trap: Do not wait for confirmatory PF4 testing when clinical probability is intermediate/high.", m: "Stop every heparin molecule" },
        { f: "What should be avoided initially in HIT?", b: "Warfarin before platelet recovery (usually ≥150,000/µL) and routine prophylactic platelet transfusion.", x: "Warfarin can rapidly lower protein C and cause venous limb gangrene; therapeutic non-heparin anticoagulation is needed.", t: "Trap: Platelet transfusion may be necessary for active bleeding or a high-risk procedure; HIT is not an absolute transfusion ban.", m: "No warfarin before platelet recovery" }
      ]
    },

    /* ================= Oncology (6%) ================= */
    {
      id: "onc-tls",
      system: "ONC",
      task: "RX",
      vignette: "A 23-year-old man with newly diagnosed Burkitt lymphoma develops oliguria 36 hours after starting chemotherapy. He has no tetany or seizures. Labs: potassium 6.8 mEq/L, phosphorus 8.1 mg/dL, calcium 6.2 mg/dL, uric acid 15 mg/dL, creatinine 3.1 mg/dL (baseline 0.9). His G6PD activity was normal before chemotherapy.",
      leadIn: "In addition to aggressive IV hydration and treatment of hyperkalemia, what is the most appropriate therapy?",
      options: [
        "Urine alkalinization with sodium bicarbonate.",
        "Allopurinol alone.",
        "Rasburicase.",
        "IV calcium to normalize the serum calcium."
      ],
      correct: 2,
      explanation: "This is established <strong>tumor lysis syndrome</strong>: hyperkalemia, hyperphosphatemia, hyperuricemia, hypocalcemia, and AKI. <strong>Rasburicase</strong> rapidly degrades existing uric acid; allopurinol only blocks new production. Alkalinization is no longer recommended (it worsens calcium-phosphate precipitation), and hypocalcemia in TLS is corrected only if symptomatic (tetany, seizures, arrhythmia), with cautious IV calcium gluconate.",
      flashcards: [
        { f: "What electrolyte pattern defines tumor lysis syndrome?", b: "Hyperkalemia, hyperphosphatemia, hyperuricemia, hypocalcemia, often with AKI.", x: "Rapid tumor cell breakdown releases intracellular potassium, phosphate, and nucleic acids that become uric acid.", t: "Trap: Treat symptomatic hypocalcemia only; routine calcium can worsen calcium-phosphate precipitation.", m: "Cells spill K, phosphate, urate",
          tb: { h: ["TLS analyte", "Direction"], r: [["Potassium", "High"], ["Phosphate", "High"], ["Uric acid", "High"], ["Calcium", "Low"]] } },
        { f: "In established tumor lysis syndrome, why choose rasburicase over allopurinol?", b: "Rasburicase degrades existing uric acid; allopurinol only prevents new uric acid formation.", x: "Rasburicase rapidly lowers urate but is contraindicated in G6PD deficiency due to hemolysis/methemoglobinemia risk.", t: "Trap: Allopurinol is useful prophylaxis, not rapid rescue for marked existing hyperuricemia.", m: "Rasburicase removes urate already there",
          tb: { h: ["Drug", "Best use", "Key action"], r: [["Rasburicase", "Established TLS", "Degrades uric acid"], ["Allopurinol", "Prevention", "Blocks new uric acid"]] } },
        { f: "What is the main prevention strategy for tumor lysis syndrome before chemotherapy?", b: "Aggressive IV hydration, with risk-based urate-lowering prophylaxis.", x: "High urine flow limits uric acid and calcium-phosphate crystal deposition in renal tubules.", t: "Trap: Urine alkalinization is not recommended because it promotes calcium-phosphate precipitation.", m: "Hydrate before lysis" }
      ]
    },
    {
      id: "onc-hypercalcemia",
      system: "ONC",
      task: "RX",
      vignette: "A 61-year-old woman with squamous cell lung cancer presents with confusion, polyuria, constipation, and dehydration. Serum calcium is 14.6 mg/dL, albumin is normal, and PTH is suppressed with an elevated PTH-related peptide.",
      leadIn: "What is the most appropriate FIRST step in treatment?",
      options: [
        "Urgent hemodialysis.",
        "IV zoledronic acid.",
        "IV furosemide.",
        "IV isotonic saline."
      ],
      correct: 3,
      explanation: "Begin <strong>IV isotonic saline</strong> to correct this patient's volume depletion, adjusting the rate to cardiac and renal function. For calcium &gt; 14 mg/dL, also initiate <strong>calcitonin plus denosumab or an IV bisphosphonate</strong>; hydration is not sufficient alone. Calcitonin works within hours but is limited to 48–72 hours by tachyphylaxis. Antiresorptive therapy provides sustained control, and the Endocrine Society conditionally favors denosumab over an IV bisphosphonate. Loop diuretics are used only for volume overload, not routine calciuresis; dialysis is considered for severe refractory disease or inability to hydrate safely.",
      flashcards: [
        { f: "What is the first treatment step for severe hypercalcemia of malignancy?", b: "Aggressive IV isotonic saline.", x: "Hypercalcemia causes nephrogenic diabetes insipidus and vomiting, leading to profound volume depletion and reduced calciuresis.", t: "Trap: Loop diuretics are only for volume overload after repletion, not first-line calcium lowering.", m: "First fill the tank" },
        { f: "Which therapies provide rapid versus sustained control of severe malignant hypercalcemia?", b: "Calcitonin acts within hours; denosumab or an IV bisphosphonate provides sustained antiresorptive control.", x: "Start both promptly with volume repletion when calcium exceeds 14 mg/dL; do not wait for the bridge to wear off before starting antiresorptive therapy.", t: "Trap: Limit calcitonin to 48–72 hours because tachyphylaxis develops.", m: "Calcitonin bridges; antiresorptives sustain",
          tb: { h: ["Agent", "Role"], r: [["Saline", "Restore volume"], ["Calcitonin", "Rapid 48–72-hour bridge"], ["Denosumab or IV bisphosphonate", "Sustained calcium control"]] } },
        { f: "What lab pattern suggests humoral hypercalcemia of malignancy?", b: "High calcium, suppressed PTH, and elevated PTHrP.", x: "Squamous cancers commonly secrete PTHrP; bone metastases and lymphoma calcitriol are other mechanisms.", t: "Trap: Primary hyperparathyroidism has non-suppressed PTH, not elevated PTHrP.", m: "PTH down, PTHrP up: malignancy" }
      ]
    },

    /* ================= Neurology (4%) ================= */
    {
      id: "neuro-stroke-lysis",
      system: "NEURO",
      task: "RX",
      vignette: "A 66-year-old woman develops sudden right-sided weakness and aphasia. She arrives 90 minutes after symptom onset. Blood pressure is 178/98 mm Hg, glucose 110 mg/dL. Non-contrast head CT shows no hemorrhage. She takes no anticoagulants and has no recent surgery or prior intracranial hemorrhage.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Lower the blood pressure below 140/90 before any further therapy.",
        "Aspirin now and admit for observation.",
        "IV thrombolysis now.",
        "Full-dose IV heparin infusion."
      ],
      correct: 2,
      explanation: "She has disabling ischemic stroke symptoms within the standard <strong>4.5-hour window</strong> for IV thrombolysis, no identified contraindication, and BP below <strong>185/110 mm Hg</strong>. Give IV alteplase or tenecteplase according to protocol without delaying vascular imaging and thrombectomy assessment. Mechanical thrombectomy is highly effective for eligible large-vessel occlusion and may be indicated in addition to IV thrombolysis. Hold antithrombotics for 24 hours after lysis and obtain follow-up imaging before starting them; routine urgent full-dose heparin does not improve acute stroke outcomes.",
      flashcards: [
        { f: "What time window and BP threshold allow IV thrombolysis for acute ischemic stroke?", b: "Within 4.5 hours of last-known-well and BP <185/110 before treatment.", x: "Eligible patients need rapid noncontrast head CT to exclude hemorrhage before alteplase or tenecteplase.", t: "Trap: Mildly elevated BP below 185/110 is not a reason to withhold thrombolysis.", m: "4.5 hours and 185/110",
          tb: { h: ["IV thrombolysis item", "Threshold"], r: [["Time window", "≤4.5 h from last known well"], ["Before treatment BP", "<185/110"], ["After treatment BP", "<180/105"]] } },
        { f: "After IV thrombolysis for ischemic stroke, what is done for the next 24 hours?", b: "Keep BP <180/105 and hold antiplatelets/anticoagulants until repeat imaging.", x: "Early antithrombotics increase hemorrhagic transformation risk after fibrinolysis.", t: "Trap: Aspirin is appropriate when no lysis is given, but it is delayed 24 hours after lysis.", m: "After lysis: 180/105 and no thinners" },
        { f: "Which stroke patients may benefit from mechanical thrombectomy up to 24 hours?", b: "Selected patients with anterior large-vessel occlusion and favorable imaging mismatch.", x: "Thrombectomy physically removes clot and is additive to IV thrombolysis when both are indicated.", t: "Trap: Thrombectomy eligibility does not mean skipping IV lysis if the patient is eligible and within window.", m: "Big anterior clot can go to 24 hours" }
      ]
    },

    /* ================= Geriatric Medicine (3%) ================= */
    {
      id: "geri-delirium",
      system: "GERI",
      task: "NEXT",
      vignette: "An 84-year-old man admitted 2 days ago for pneumonia becomes acutely confused overnight, with inattention and disorganized thinking that fluctuates through the day. He is pulling at his IV lines. He wears hearing aids that are in a drawer, has a urinary catheter without a clear indication, and received diphenhydramine for sleep last night.",
      leadIn: "What is the most appropriate initial management?",
      options: [
        "Start donepezil and arrange formal cognitive assessment.",
        "Schedule low-dose lorazepam for overnight agitation.",
        "Use wrist restraints to protect lines and the catheter.",
        "Reorient, restore hearing aids, and remove avoidable triggers."
      ],
      correct: 3,
      explanation: "Acute, fluctuating inattention in a hospitalized elder is <strong>delirium</strong>. First-line management is <strong>nonpharmacologic</strong>: reorientation, sensory aids, sleep protocols, mobilization, removing catheters/restraints, and discontinuing deliriogenic drugs (anticholinergics like diphenhydramine, benzodiazepines). Benzodiazepines and restraints worsen delirium; antipsychotics are reserved for dangerous agitation.",
      flashcards: [
        { f: "What CAM features diagnose delirium in a hospitalized older adult?", b: "Acute fluctuating course and inattention, plus disorganized thinking or altered consciousness.", x: "Inattention is the core feature that distinguishes delirium from baseline dementia.", t: "Trap: Dementia is chronic and progressive; delirium is acute, fluctuating, and often reversible.", m: "CAM: acute inattention plus thinking or consciousness",
          tb: { h: ["CAM feature", "Needed?"], r: [["Acute fluctuating course", "Required"], ["Inattention", "Required"], ["Disorganized thinking", "Either this"], ["Altered consciousness", "Or this"]] } },
        { f: "What is first-line management of hospital delirium?", b: "Nonpharmacologic bundle: reorientation, sensory aids, sleep, mobilization, remove catheters, stop deliriogenic drugs.", x: "Correcting triggers and restoring normal cues treats the brain dysfunction without adding sedating toxicity.", t: "Trap: Diphenhydramine, benzodiazepines, restraints, and Foley catheters often worsen delirium.", m: "Orient, senses, sleep, move, remove" },
        { f: "When are medications used for delirium agitation?", b: "Low-dose antipsychotic only if agitation threatens safety; benzodiazepines mainly for alcohol/benzo withdrawal.", x: "Sedatives can worsen confusion, falls, and aspiration, so use the lowest dose for the shortest time.", t: "Trap: Treat insomnia or restlessness with environmental measures first, not routine sedatives.", m: "Danger only: tiny antipsychotic" }
      ]
    }
    ,

    /* ========== V2 expansion — additional high-yield classics ========== */
    {
      id: "cv-pericarditis",
      system: "CV",
      task: "RX",
      vignette: "A 32-year-old man has 2 days of sharp, pleuritic substernal chest pain that improves when he sits up and leans forward, following a viral illness. A triphasic friction rub is heard at the left sternal border. ECG shows diffuse concave ST-segment elevation with PR-segment depression. Troponin is normal and echocardiogram shows no effusion.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Urgent cardiac catheterization.",
        "High-dose prednisone.",
        "High-dose NSAID plus colchicine.",
        "Therapeutic anticoagulation with heparin."
      ],
      correct: 2,
      explanation: "Acute idiopathic/viral pericarditis is treated with a <strong>high-dose NSAID (or aspirin) plus colchicine</strong>; colchicine lowers recurrence. Glucocorticoids increase recurrence risk and are reserved for selected NSAID contraindications or specific indications such as autoimmune disease after infection is excluded. Uremic pericarditis primarily requires initiation or intensification of dialysis. Diffuse ST elevation with PR depression should not be mistaken for STEMI; anticoagulation does not treat pericarditis.",
      flashcards: [
        { f: "What clinical and ECG findings suggest acute pericarditis?", b: "Pleuritic positional chest pain, friction rub, diffuse concave ST elevation, and PR depression.", x: "Inflamed pericardium causes pain worse supine and better leaning forward; ECG changes are widespread rather than territorial.", t: "Trap: STEMI has regional ST elevation with reciprocal changes, not diffuse PR depression.", m: "Pleuritic, positional, PR depression" },
        { f: "What is first-line treatment for idiopathic or viral acute pericarditis?", b: "High-dose NSAID or aspirin plus colchicine.", x: "Colchicine reduces inflammatory recurrence when added to anti-inflammatory therapy.", t: "Trap: Anticoagulation is not analgesia and may increase hemorrhagic effusion risk.", m: "NSAID plus colchicine" },
        { f: "Why are glucocorticoids avoided as routine initial therapy for acute pericarditis?", b: "They increase recurrence risk.", x: "Reserve steroids for selected contraindications or specific indications such as autoimmune disease; uremic pericarditis primarily needs dialysis.", t: "Trap: Quick symptom relief with steroids can create rebound recurrent pericarditis.", m: "Steroids soothe then recur" }
      ]
    },
    {
      id: "endo-phpt-fhh",
      system: "ENDO",
      task: "TEST",
      vignette: "A 58-year-old asymptomatic woman has a serum calcium of 11.2 mg/dL on routine labs, confirmed on repeat. PTH is 88 pg/mL (elevated), 25-OH vitamin D is normal, and creatinine is normal. She takes no thiazides or lithium. Parathyroidectomy is being considered.",
      leadIn: "What test should be obtained before attributing this to primary hyperparathyroidism?",
      options: [
        "Technetium-sestamibi parathyroid scan.",
        "PTH-related peptide level.",
        "Serum protein electrophoresis.",
        "24-hour urine calcium (with creatinine)."
      ],
      correct: 3,
      explanation: "Hypercalcemia with a non-suppressed PTH is PTH-dependent: primary hyperparathyroidism or <strong>familial hypocalciuric hypercalcemia (FHH)</strong>. Obtain <strong>24-hour urine calcium and creatinine</strong>: a calcium/creatinine clearance ratio &lt; 0.01 favors FHH, but overlap exists and vitamin D deficiency, CKD, or thiazides can lower urinary calcium. Family history or genetic testing may clarify ambiguous cases. FHH usually needs no surgery. Sestamibi localizes disease only after biochemical diagnosis.",
      flashcards: [
        { f: "Hypercalcemia with non-suppressed PTH suggests which two diagnoses?", b: "Primary hyperparathyroidism or familial hypocalciuric hypercalcemia.", x: "PTH should be suppressed by hypercalcemia; a normal or high value is inappropriate and PTH-dependent.", t: "Trap: Malignancy hypercalcemia usually suppresses PTH.", m: "High calcium should shut PTH off" },
        { f: "What urine test helps distinguish FHH from primary hyperparathyroidism?", b: "24-hour urine calcium with Ca/Cr clearance ratio; <0.01 favors FHH but has overlap.", x: "FHH has altered calcium-sensing receptor set point, causing renal calcium retention and mild lifelong hypercalcemia.", t: "Trap: Exclude low-calcium-intake, vitamin D deficiency, CKD, and thiazide effects before interpreting low urine calcium.", m: "FHH holds calcium in blood, not urine",
          tb: { h: ["Feature", "FHH", "Primary HPT"], r: [["Urine calcium", "Low", "Normal or high"], ["Ca/Cr clearance", "<0.01", "Usually >0.02"], ["Family pattern", "Autosomal dominant", "Usually sporadic"], ["Surgery", "Not helpful", "Can be curative"]] } },
        { f: "Name key surgery indications for asymptomatic primary hyperparathyroidism.", b: "Age <50, Ca >1 mg/dL above normal, osteoporosis/fracture, eGFR <60, stones, or high urine calcium.", x: "These features predict renal or skeletal complications even without classic symptoms.", t: "Trap: Sestamibi localizes a gland only after biochemical diagnosis; it does not diagnose PHPT.", m: "PHPT surgery: young, calcium, bone, kidney" }
      ]
    },
    {
      id: "gi-sbp",
      system: "GI",
      task: "RX",
      vignette: "A 59-year-old man with cirrhosis and known ascites presents with fever, diffuse abdominal tenderness, and worsening confusion. Diagnostic paracentesis shows an ascitic fluid polymorphonuclear count of 480/µL. Creatinine is 1.4 mg/dL.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Oral ciprofloxacin as an outpatient.",
        "IV cefotaxime plus IV albumin.",
        "IV metronidazole alone.",
        "Immediate large-volume paracentesis as sole therapy."
      ],
      correct: 1,
      explanation: "An ascitic PMN count ≥ 250/µL diagnoses <strong>spontaneous bacterial peritonitis</strong>. Treatment is a third-generation cephalosporin (<strong>cefotaxime</strong>) plus <strong>IV albumin</strong> (1.5 g/kg on day 1, 1 g/kg on day 3), which reduces hepatorenal syndrome and mortality — especially with renal dysfunction, as here.",
      flashcards: [
        { f: "What ascitic fluid PMN count diagnoses spontaneous bacterial peritonitis?", b: "PMN ≥250 cells/µL.", x: "Culture may be negative, so PMN threshold drives empiric treatment in cirrhosis with ascites.", t: "Trap: Do not wait for positive ascitic cultures before starting cefotaxime or ceftriaxone.", m: "250 PMNs means SBP" },
        { f: "When treating SBP, what albumin regimen reduces hepatorenal syndrome?", b: "Albumin 1.5 g/kg day 1 and 1 g/kg day 3.", x: "Albumin expands effective arterial volume and lowers renal failure and mortality risk, especially with renal dysfunction or high bilirubin.", t: "Trap: Albumin is adjunctive; it does not replace third-generation cephalosporin therapy.", m: "Albumin day 1 and day 3 protects kidneys" },
        { f: "After recovery from SBP, what long-term prevention is indicated?", b: "Secondary antibiotic prophylaxis while risk persists, generally until transplant, death, or durable resolution of ascites.", x: "Prior SBP carries high recurrence risk; choose an agent such as TMP-SMX or ciprofloxacin according to local resistance and patient factors.", t: "Trap: Reassess prophylaxis if ascites resolves or toxicity develops; it is not automatically lifelong regardless of circumstances.", m: "Prior SBP: prevent recurrence while ascites persists" }
      ]
    },
    {
      id: "id-ie-cultures",
      system: "ID",
      task: "NEXT",
      vignette: "A 44-year-old man with a bicuspid aortic valve has 3 weeks of low-grade fevers, night sweats, fatigue, and a new diastolic murmur. He is hemodynamically stable and does not appear toxic. Splinter hemorrhages are noted under two fingernails.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Start empiric vancomycin and ceftriaxone immediately, then obtain one blood culture.",
        "Obtain 3 sets of blood cultures from separate venipuncture sites before starting antibiotics.",
        "Order a transesophageal echocardiogram and defer cultures.",
        "Check Lyme serology and blood smear."
      ],
      correct: 1,
      explanation: "In a <strong>stable, non-toxic</strong> patient with suspected subacute infective endocarditis, obtain <strong>three blood culture sets from separate sites before antibiotics</strong> — bacteremia in IE is continuous, and premature antibiotics are the leading cause of culture-negative endocarditis. Empiric therapy starts after cultures; echocardiography (TTE first) follows.",
      flashcards: [
        { f: "In stable suspected infective endocarditis, what comes before antibiotics?", b: "Obtain 3 sets of blood cultures from separate venipuncture sites.", x: "IE bacteremia is usually continuous, and antibiotics before cultures are a leading cause of culture-negative endocarditis.", t: "Trap: If the patient is septic or unstable, cultures are still drawn promptly but antibiotics are not delayed.", m: "Three cultures before antibiotics if stable" },
        { f: "What major-criterion categories are used in the 2023 Duke-ISCVID endocarditis criteria?", b: "Qualifying microbiology, qualifying cardiac imaging, and direct surgical evidence in appropriate circumstances.", x: "Typical cultures remain central; selected molecular/serologic tests, cardiac CT, and FDG-PET/CT can also qualify under defined conditions.", t: "Trap: A new murmur alone is not a major criterion; significant new regurgitation documented on imaging can be.", m: "Duke majors: bugs, imaging, direct surgical evidence",
          tb: { h: ["Major category", "Examples"], r: [["Microbiology", "Qualifying cultures or specific tests"], ["Imaging", "Vegetation, abscess, new regurgitation"], ["Additional imaging", "Qualifying CT or FDG-PET/CT"], ["Surgical", "Direct IE evidence when criteria permit"]] } },
        { f: "What is the echocardiography sequence for suspected endocarditis?", b: "TTE first, then TEE if TTE is negative/nondiagnostic or prosthetic valve/device is present.", x: "TEE is more sensitive for vegetations, abscesses, prosthetic valves, and intracardiac devices.", t: "Trap: A negative TTE does not exclude IE when suspicion remains high.", m: "TTE first, TEE if still suspicious",
          tb: { h: ["Echo step", "Use when"], r: [["TTE first", "Initial test"], ["TEE next", "TTE negative or nondiagnostic"], ["TEE early", "Prosthetic valve or device"]] } }
      ]
    },
    {
      id: "pulm-lights",
      system: "PULM",
      task: "TEST",
      vignette: "A 63-year-old man has a new unilateral pleural effusion. Thoracentesis: pleural fluid protein 4.1 g/dL (serum 6.8), pleural LDH 310 U/L (serum 190; upper limit of normal 220), glucose 70 mg/dL, pH 7.36.",
      leadIn: "How should this effusion be classified?",
      options: [
        "Complicated parapneumonic effusion requiring a chest tube.",
        "Transudate by Light's criteria.",
        "Exudate by Light's criteria.",
        "Chylothorax."
      ],
      correct: 2,
      explanation: "Light's criteria call an effusion an <strong>exudate if ANY one</strong> is met: pleural/serum protein &gt; 0.5 (here 0.60), pleural/serum LDH &gt; 0.6 (here 1.63), or pleural LDH &gt; two-thirds the upper limit of normal serum LDH. This fluid meets all three — pursue exudate causes (malignancy, infection, PE). The normal pH and glucose argue against a complicated parapneumonic effusion.",
      flashcards: [
        { f: "What are Light's criteria for an exudative pleural effusion?", b: "Any one: pleural/serum protein >0.5, pleural/serum LDH >0.6, or pleural LDH >2/3 serum ULN.", x: "The criteria are highly sensitive for inflammation-driven pleural disease and intentionally overcall some transudates.", t: "Trap: Meeting just one criterion is enough to classify the effusion as exudative.", m: "One Light turns it exudative",
          tb: { h: ["Light criterion", "Exudate if"], r: [["Protein ratio", "Pleural/serum >0.5"], ["LDH ratio", "Pleural/serum >0.6"], ["Pleural LDH", ">2/3 serum ULN"]] } },
        { f: "What pathophysiology separates transudative from exudative pleural effusions?", b: "Transudates reflect pressure/oncotic imbalance; exudates reflect pleural inflammation or injury.", x: "HF, cirrhosis, and nephrotic syndrome cause transudates; infection, malignancy, and PE cause exudates.", t: "Trap: Diuresed HF can pseudo-exudate by Light's criteria; use serum-pleural albumin gradient if uncertain.", m: "Pressure transudes; inflammation exudes",
          tb: { h: ["Effusion type", "Mechanism", "Examples"], r: [["Transudate", "Pressure or oncotic", "HF, cirrhosis"], ["Exudate", "Inflammation or injury", "Cancer, pneumonia"]] } },
        { f: "When does a parapneumonic effusion require chest tube drainage?", b: "Frank pus, positive Gram stain/culture, or pH ≤7.2; loculation or low glucose supports drainage in context.", x: "For pH 7.2–7.4, integrate LDH, glucose, size, septations, and ongoing fever. Low glucose is especially useful when pH is unavailable or unreliable.", t: "Trap: Do not base drainage on an isolated glucose value without considering infection, imaging, and reliable pH.", m: "Pus, pathogens, low pH: drain",
          tb: { h: ["Finding", "Drainage implication"], r: [["Frank pus", "Drain"], ["pH ≤7.2", "Drain if safely accessible"], ["Positive microbiology", "Drain"], ["Intermediate pH or low glucose", "Integrate clinical and imaging risk"], ["Loculation", "Strong concern for complicated infection"]] } }
      ]
    },
    {
      id: "rheum-axspa",
      system: "RHEUM",
      task: "DX",
      vignette: "A 26-year-old man has 8 months of insidious low back pain and buttock pain with morning stiffness lasting 90 minutes. Pain improves with exercise, worsens with rest, and wakes him in the second half of the night. Examination shows reduced lumbar flexion. Neurologic examination is normal.",
      leadIn: "What is the most appropriate initial diagnostic study?",
      options: [
        "Bone scan to screen for sacroiliac inflammation before obtaining targeted pelvic radiographs.",
        "Immediate MRI of the entire spine to identify inflammatory spondylitis and guide early biologic therapy.",
        "HLA-B27 testing alone as the initial diagnostic study without imaging the sacroiliac joints.",
        "Plain radiographs of the sacroiliac joints."
      ],
      correct: 3,
      explanation: "This is <strong>inflammatory back pain</strong> (age &lt; 45, insidious onset &gt; 3 months, morning stiffness, improvement with exercise, night pain) suggesting axial spondyloarthritis. The first imaging study is <strong>plain radiography of the sacroiliac joints</strong>; MRI of the SI joints follows if radiographs are normal but suspicion persists. HLA-B27 supports but never makes the diagnosis alone.",
      flashcards: [
        { f: "What features define inflammatory back pain suggestive of axial spondyloarthritis?", b: "Onset <45, insidious >3 months, morning stiffness, improves with exercise, worse with rest, night pain.", x: "Inflammatory pain improves with movement because stiffness reflects sacroiliac and spinal inflammation, not mechanical strain.", t: "Trap: Mechanical back pain worsens with activity and improves with rest.", m: "Young back pain better with motion" },
        { f: "What is the first imaging test for suspected axial spondyloarthritis?", b: "Plain radiographs of the sacroiliac joints.", x: "MRI detects early active sacroiliitis if radiographs are normal but clinical suspicion remains high.", t: "Trap: HLA-B27 supports the diagnosis but cannot diagnose axial spondyloarthritis alone.", m: "SI x-ray first, MRI next" },
        { f: "What is first-line treatment for axial spondyloarthritis?", b: "NSAIDs plus exercise/physical therapy.", x: "Continuous mobility preserves posture and function; TNF or IL-17 inhibitors are used when disease remains active.", t: "Trap: Methotrexate may help peripheral arthritis but is not effective for axial disease.", m: "Move and NSAID first" }
      ]
    },
    {
      id: "neph-hyperk",
      system: "NEPH",
      task: "NEXT",
      vignette: "A 66-year-old man with CKD stage 4 missed dialysis evaluation and presents with weakness. Potassium is 7.1 mEq/L. ECG shows peaked T waves and a widened QRS complex.",
      leadIn: "What is the most appropriate FIRST intervention?",
      options: [
        "IV insulin with dextrose.",
        "IV calcium gluconate.",
        "Oral potassium binder.",
        "Sodium polystyrene sulfonate retention enema."
      ],
      correct: 1,
      explanation: "Hyperkalemia with ECG changes is a cardiac emergency: give <strong>IV calcium first</strong> to stabilize the myocardium within minutes — it does not lower potassium but prevents arrhythmia while shifting agents (insulin/dextrose, beta-agonists) and removal therapies (binders, diuretics, dialysis) take effect.",
      flashcards: [
        { f: "What is the first medication for hyperkalemia with ECG changes?", b: "IV calcium gluconate.", x: "Calcium stabilizes the cardiac membrane within minutes, buying time for shifting and removal therapies.", t: "Trap: Calcium does not lower serum potassium; do not stop after calcium alone.", m: "ECG changes get calcium first",
          tb: { h: ["Goal", "Therapy", "Speed"], r: [["Stabilize myocardium", "IV calcium", "Minutes"], ["Shift into cells", "Insulin, albuterol", "Minutes-hours"], ["Remove K", "Diuretic, binder, HD", "Hours"]] } },
        { f: "Which therapies rapidly shift potassium intracellularly?", b: "IV insulin with dextrose and nebulized albuterol.", x: "These stimulate cellular potassium uptake through insulin and beta-2 adrenergic pathways, with temporary effect.", t: "Trap: Sodium bicarbonate is mainly useful when significant metabolic acidosis is present, not routine shifting.", m: "Insulin and albuterol shift K" },
        { f: "Which treatments remove potassium from the body?", b: "Loop diuretics, GI potassium binders, and hemodialysis.", x: "Removal prevents rebound after temporary intracellular shifting; dialysis is fastest and definitive in ESRD or refractory cases.", t: "Trap: Insulin and albuterol shift potassium but do not eliminate total-body potassium.", m: "Shift buys time; removal finishes" }
      ]
    },
    {
      id: "heme-b12",
      system: "HEME",
      task: "RX",
      vignette: "A 68-year-old woman has fatigue, a hemoglobin of 10.1 g/dL with an MCV of 112 fL, and new bilateral paresthesias with impaired vibratory and position sense. Renal function is normal. Serum B12 is 210 pg/mL (low-normal). Methylmalonic acid and homocysteine are both markedly elevated.",
      leadIn: "What is the most appropriate management?",
      options: [
        "Bone marrow biopsy.",
        "Begin high-dose folic acid alone.",
        "Begin vitamin B12 replacement.",
        "Begin oral copper replacement."
      ],
      correct: 2,
      explanation: "A low-normal B12 with <strong>elevated methylmalonic acid</strong> confirms tissue B12 deficiency — MMA is the key discriminator, since folate deficiency raises homocysteine but <strong>not MMA</strong>. The neurologic findings (dorsal column dysfunction — subacute combined degeneration) demand prompt B12 repletion; folate alone can correct the anemia while neurologic damage progresses.",
      flashcards: [
        { f: "Which metabolite distinguishes vitamin B12 deficiency from folate deficiency?", b: "Methylmalonic acid; it rises in B12 deficiency but not folate deficiency.", x: "Both deficiencies can raise homocysteine, so MMA is the key biochemical discriminator.", t: "Trap: A low-normal serum B12 can still be true deficiency if MMA is elevated.", m: "MMA means missing B12" },
        { f: "What neurologic syndrome is caused by vitamin B12 deficiency?", b: "Subacute combined degeneration of dorsal columns and corticospinal tracts.", x: "Loss of vibration/proprioception, sensory ataxia, and spasticity can occur even before marked macrocytosis.", t: "Trap: Folate deficiency causes megaloblastosis but not dorsal column neurologic disease.", m: "B12 hits columns and corticospinal tracts" },
        { f: "Why should folate not be given alone for megaloblastic anemia until B12 deficiency is excluded?", b: "Folate can correct anemia while B12-related neurologic injury progresses.", x: "Hematologic response can mask the diagnosis and delay irreversible neurologic treatment.", t: "Trap: Treat suspected B12 deficiency promptly; do not wait for neurologic deficits to become irreversible.", m: "Folate can hide the anemia, not save nerves" }
      ]
    },
    {
      id: "onc-feb-neutropenia",
      system: "ONC",
      task: "RX",
      vignette: "A 54-year-old woman on day 10 after chemotherapy for breast cancer presents with a temperature of 38.6 °C and rigors. She looks well, blood pressure is normal, and there is no localizing source. Absolute neutrophil count is 300/µL, and her oncology team anticipates more than 7 additional days of neutropenia. Blood cultures are drawn.",
      leadIn: "What is the most appropriate immediate therapy?",
      options: [
        "IV vancomycin monotherapy.",
        "Await culture results before any antibiotics.",
        "Oral amoxicillin-clavulanate.",
        "IV cefepime monotherapy."
      ],
      correct: 3,
      explanation: "Febrile neutropenia (ANC &lt; 500/µL + fever) is an oncologic emergency: start an <strong>anti-pseudomonal beta-lactam</strong> (cefepime, piperacillin-tazobactam, or a carbapenem) <strong>immediately after cultures</strong>, within the hour. Vancomycin is ADDED only for specific indications (catheter infection, skin/soft-tissue source, pneumonia, instability) — never monotherapy.",
      flashcards: [
        { f: "How is febrile neutropenia defined in a chemotherapy patient?", b: "ANC <500/µL or expected to fall below 500 within 48 h, with temperature ≥38.3°C once or ≥38.0°C for at least 1 hour.", x: "Neutropenic patients may lack localizing signs; prolonged neutropenia or significant comorbidity favors inpatient IV antipseudomonal therapy.", t: "Trap: Do not wait for culture results or an obvious source before treating.", m: "Fever plus ANC under 500 is an emergency",
          tb: { h: ["Component", "Definition"], r: [["Neutropenia", "ANC <500 or expected within 48 h"], ["Single fever", "≥38.3°C once"], ["Sustained fever", "≥38.0°C for ≥1 hour"]] } },
        { f: "What empiric antibiotic is first-line for high-risk febrile neutropenia?", b: "Anti-pseudomonal beta-lactam monotherapy such as cefepime, piperacillin-tazobactam, or meropenem.", x: "Pseudomonas coverage within 1 hour reduces mortality; blood cultures should be drawn first if this does not delay therapy.", t: "Trap: Ceftriaxone lacks reliable Pseudomonas coverage for high-risk febrile neutropenia.", m: "Cefepime covers Pseudomonas fast" },
        { f: "When should vancomycin be added to febrile neutropenia therapy?", b: "Catheter infection, skin/soft-tissue infection, pneumonia, hemodynamic instability, or known MRSA risk.", x: "Routine vancomycin adds toxicity and resistance without improving outcomes when gram-positive risk is absent.", t: "Trap: Vancomycin is never adequate monotherapy because it lacks gram-negative/Pseudomonas coverage.", m: "Vanco only for gram-positive clues",
          tb: { h: ["Add vancomycin if", "Example"], r: [["Line concern", "Catheter infection"], ["Skin focus", "Cellulitis or SSTI"], ["Pulmonary focus", "Pneumonia"], ["Unstable", "Hypotension or shock"]] } }
      ]
    },
    {
      id: "neuro-bell",
      system: "NEURO",
      task: "RX",
      vignette: "A 41-year-old woman awoke yesterday with right facial droop. She cannot raise her right eyebrow, close the right eye completely, or smile on the right. There is no limb weakness, dysarthria, or sensory loss, and the remainder of the neurologic examination is normal.",
      leadIn: "What is the most appropriate management?",
      options: [
        "Urgent CT angiography and stroke-team evaluation.",
        "Start prednisone within 72 hours and protect the eye.",
        "Eye protection and reassessment without glucocorticoids.",
        "Begin ceftriaxone for Lyme-associated facial neuropathy."
      ],
      correct: 1,
      explanation: "Weakness involving the <strong>forehead</strong> localizes to a peripheral facial nerve lesion — Bell palsy — not a cortical stroke (which spares the forehead). <strong>Oral glucocorticoids within 72 hours</strong> improve the odds of complete recovery; add lubricating drops/night taping because incomplete eye closure risks exposure keratopathy. Antivirals are optionally added in severe palsy.",
      flashcards: [
        { f: "How does Bell palsy facial weakness differ from cortical stroke facial weakness?", b: "Bell palsy involves the forehead; cortical stroke spares the forehead.", x: "The upper face receives bilateral cortical input, so central lesions usually preserve forehead movement.", t: "Trap: Forehead involvement points peripheral CN VII, but other neurologic deficits still require stroke evaluation.", m: "Forehead involved = peripheral",
          tb: { h: ["Feature", "Bell palsy", "Cortical stroke"], r: [["Lesion type", "Peripheral CN VII", "Upper motor neuron"], ["Forehead", "Weak", "Spared"], ["Other deficits", "Usually absent", "Often present"]] } },
        { f: "What treatment improves recovery in Bell palsy if started early?", b: "Oral prednisone within 72 hours of onset.", x: "Steroids reduce facial nerve inflammation and improve the chance of complete functional recovery.", t: "Trap: Antivirals may be added for severe palsy but do not replace corticosteroids.", m: "Prednisone by 72 hours" },
        { f: "What eye protection is needed in Bell palsy with incomplete closure?", b: "Lubricating drops by day, ointment and taping or patching at night.", x: "Loss of blinking and lagophthalmos expose the cornea, risking abrasion, ulceration, and vision loss.", t: "Trap: Eye pain or vision change is not benign dryness; evaluate urgently for keratopathy.", m: "Close the eye to save the cornea" }
      ]
    },
    {
      id: "geri-osteoporosis",
      system: "GERI",
      task: "RX",
      vignette: "A 72-year-old woman has a screening DEXA scan showing a femoral neck T-score of −2.8. She has no history of fracture, normal renal function, normal calcium and vitamin D levels, and no esophageal disease. She can remain upright after taking medications.",
      leadIn: "In addition to calcium, vitamin D and weight-bearing exercise, what is the most appropriate therapy?",
      options: [
        "Systemic estrogen therapy as first-line treatment.",
        "Calcium and vitamin D supplementation alone.",
        "An oral bisphosphonate such as alendronate.",
        "Repeat DEXA in 2 years before any treatment."
      ],
      correct: 2,
      explanation: "A T-score ≤ −2.5 defines osteoporosis and warrants pharmacotherapy; <strong>oral bisphosphonates are first-line</strong> and reduce vertebral and hip fractures. Calcium/vitamin D alone are inadequate once osteoporosis is established. Counsel: take fasting with water, remain upright 30 minutes.",
      flashcards: [
        { f: "Who should receive pharmacologic therapy for osteoporosis?", b: "T-score ≤−2.5, hip/vertebral fragility fracture, or osteopenia with FRAX hip ≥3% or major ≥20%.", x: "These thresholds identify patients whose fracture risk is high enough that medication benefits outweigh harms.", t: "Trap: Calcium and vitamin D alone are inadequate once treatment thresholds are met.", m: "Minus 2.5 or fracture risk: treat",
          tb: { h: ["Indication", "Treatment threshold"], r: [["BMD", "T-score ≤−2.5"], ["Fragility fracture", "Hip or vertebral"], ["FRAX hip", "≥3%"], ["FRAX major", "≥20%"]] } },
        { f: "How should oral alendronate be taken to reduce esophageal injury?", b: "Take fasting with a full glass of water and remain upright for at least 30 minutes.", x: "Bisphosphonates bind bone but can irritate the esophagus if they reflux or lodge after dosing.", t: "Trap: Avoid oral bisphosphonates with inability to sit upright, major esophageal disease, or eGFR <30–35.", m: "Alendronate: water and upright" },
        { f: "Who should be screened for osteoporosis with DEXA?", b: "All women ≥65, and younger postmenopausal women with elevated fracture risk.", x: "DEXA T-score compares bone density with young adult peak bone mass to classify osteopenia and osteoporosis.", t: "Trap: A Z-score is for age-matched comparison, not the standard diagnostic threshold in postmenopausal osteoporosis.", m: "DEXA starts with women 65" }
      ]
    },
    {
      id: "crit-septic-shock",
      system: "CRIT",
      task: "RX",
      vignette: "A 58-year-old man with pneumonia has a blood pressure of 78/44 mm Hg and lactate of 4.2 mmol/L despite a 30 mL/kg crystalloid bolus. Blood cultures were drawn and broad-spectrum antibiotics started within the first hour. He remains hypotensive with a MAP of 55 mm Hg.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Begin stress-dose hydrocortisone as the next step.",
        "Give another 60 mL/kg crystalloid bolus before any vasopressor.",
        "Start dopamine as the first-line vasopressor.",
        "Start norepinephrine to target a MAP of at least 65 mm Hg."
      ],
      correct: 3,
      explanation: "Persistent hypotension with elevated lactate after initial resuscitation warrants <strong>norepinephrine</strong>, the first-line vasopressor, targeting an initial MAP of <strong>65 mm Hg</strong>. Do not delay pressors for another fixed large fluid bolus; reassess fluid responsiveness and congestion dynamically. Dopamine causes more arrhythmias. IV hydrocortisone can be added when septic shock has an ongoing vasopressor requirement; it does not replace starting norepinephrine.",
      flashcards: [
        { f: "What are the key hour-1 sepsis bundle actions?", b: "Measure lactate, obtain blood cultures before antibiotics, give broad-spectrum antibiotics, and 30 mL/kg crystalloid if hypotensive or lactate ≥4.", x: "Early source-directed antibiotics and perfusion restoration reduce mortality; cultures should not significantly delay antibiotics.", t: "Trap: Do not give fluids blindly forever; reassess perfusion and overload after the initial bolus.", m: "Hour 1: lactate, cultures, antibiotics, fluids",
          tb: { h: ["Hour-1 action", "When or why"], r: [["Lactate", "Measure; repeat if >2"], ["Cultures", "Before antibiotics"], ["Antibiotics", "Broad-spectrum now"], ["Crystalloid", "30 mL/kg if hypotension or lactate ≥4"], ["Vasopressors", "If hypotensive after fluids"]] } },
        { f: "After 30 mL/kg crystalloid, what vasopressor is first-line for septic shock?", b: "Norepinephrine to target MAP ≥65 mm Hg.", x: "Norepinephrine raises vascular tone with fewer arrhythmias than dopamine; vasopressin is commonly added next.", t: "Trap: Dopamine is not preferred except select bradycardic patients with low arrhythmia risk.", m: "After fluids: norepinephrine to 65" },
        { f: "How is septic shock defined after adequate fluid resuscitation?", b: "Vasopressors needed to keep MAP ≥65 plus lactate >2 mmol/L.", x: "The definition captures circulatory failure and cellular/metabolic stress despite volume repletion.", t: "Trap: Hypotension alone before fluids is sepsis-induced hypotension; shock requires persistent vasopressor need after fluids.", m: "Shock = pressors plus lactate after fluids",
          tb: { h: ["After fluids", "Septic shock criterion"], r: [["Vasopressor need", "Maintain MAP ≥65"], ["Lactate", ">2 mmol/L"], ["Context", "Adequate fluid resuscitation"]] } }
      ]
    }
    ,

    /* ========== V2.2 expansion — twelve more board classics ========== */
    {
      id: "cv-hocm",
      system: "CV",
      task: "DX",
      vignette: "A 19-year-old collegiate athlete is evaluated after an episode of syncope during a sprint. His uncle died suddenly at age 34. Examination reveals a harsh crescendo-decrescendo systolic murmur at the left lower sternal border that becomes LOUDER with Valsalva and standing, and softer with squatting. Carotid upstrokes are brisk and bifid.",
      leadIn: "What is the most likely diagnosis?",
      options: [
        "Hypertrophic obstructive cardiomyopathy.",
        "Valvular aortic stenosis.",
        "Innocent flow murmur.",
        "Mitral valve prolapse with regurgitation."
      ],
      correct: 0,
      explanation: "Exertional syncope, a family history of sudden death, and a systolic murmur that <strong>intensifies with preload-reducing maneuvers</strong> (Valsalva, standing) identify dynamic LVOT obstruction — <strong>hypertrophic cardiomyopathy</strong>. Aortic stenosis behaves oppositely (softer with Valsalva, delayed carotids). Confirm with echocardiography and screen first-degree relatives.",
      flashcards: [
        { f: "Which bedside maneuvers make the HOCM murmur louder?", b: "Valsalva and standing; squatting and handgrip make it softer.", x: "Lower preload shrinks the LV cavity and worsens dynamic outflow obstruction, intensifying the murmur.", t: "Trap: Aortic stenosis usually gets softer with Valsalva and has delayed carotid upstroke.", m: "Less preload, louder HOCM",
          tb: { h: ["Maneuver", "Preload/afterload", "HOCM murmur"], r: [["Valsalva", "Decreases preload", "Louder"], ["Standing", "Decreases preload", "Louder"], ["Squatting", "Increases preload", "Softer"], ["Handgrip", "Increases afterload", "Softer"]] } },
        { f: "What is the feared complication of hypertrophic cardiomyopathy in young athletes?", b: "Sudden cardiac death from ventricular arrhythmia.", x: "Risk assessment includes arrhythmic syncope, family sudden death, massive hypertrophy, LV apical aneurysm, EF <50%, NSVT, and extensive MRI scar.", t: "Trap: Screen first-degree relatives with echocardiography and sometimes genetic testing; do not reassure by normal ECG alone.", m: "Syncope plus family death raises risk" },
        { f: "What is first-line therapy for symptomatic obstructive HCM?", b: "A nonvasodilating beta-blocker; verapamil or diltiazem if not tolerated and otherwise appropriate.", x: "Slowing heart rate improves diastolic filling and reduces dynamic LVOT obstruction.", t: "Trap: Avoid dehydration and nitrates; use diuretics cautiously only for congestion. Verapamil may be harmful with hypotension or very severe obstruction.", m: "Slow and fill the ventricle" }
      ]
    },
    {
      id: "endo-pheo",
      system: "ENDO",
      task: "TEST",
      vignette: "A 39-year-old woman has episodic severe headaches, palpitations, and drenching sweats lasting 20 minutes, with blood pressure recorded at 224/112 mm Hg during an episode. Between episodes she feels well. An adrenal nodule was incidentally noted on a prior CT.",
      leadIn: "What is the most appropriate diagnostic test?",
      options: [
        "Plasma free metanephrines or 24-hour urine fractionated metanephrines.",
        "MIBG (metaiodobenzylguanidine) scintigraphy to localize the tumor.",
        "Adrenal vein sampling to lateralize hormone secretion.",
        "Renal artery duplex ultrasonography to evaluate for renovascular hypertension."
      ],
      correct: 0,
      explanation: "Paroxysmal hypertension with the classic triad — episodic <strong>headache, palpitations, diaphoresis</strong> — plus an adrenal nodule suggests pheochromocytoma. Diagnosis is <strong>biochemical first</strong>: plasma free metanephrines or 24-hour urine fractionated metanephrines. Functional imaging (MIBG) localizes only after biochemical confirmation.",
      flashcards: [
        { f: "What symptom triad suggests pheochromocytoma in a patient with paroxysmal hypertension?", b: "Episodic headache, palpitations, and diaphoresis.", x: "Catecholamine surges cause abrupt adrenergic symptoms and can be triggered by surgery, anesthesia, or certain drugs.", t: "Trap: Sustained essential hypertension is common; the paroxysmal adrenergic spells are the clue.", m: "Headache, sweat, palpitations" },
        { f: "What is the initial diagnostic test for suspected pheochromocytoma?", b: "Plasma free metanephrines or 24-hour urine fractionated metanephrines.", x: "Metanephrines are continuously produced within the tumor, making them more sensitive than episodic catecholamine levels.", t: "Trap: Localizing imaging comes after biochemical confirmation, not before.", m: "Metanephrines before maps" },
        { f: "Before pheochromocytoma surgery, what blockade sequence is required?", b: "Alpha-blockade first for 10–14 days, then beta-blockade if needed.", x: "Alpha blockade prevents hypertensive crisis; beta blockade first leaves unopposed alpha vasoconstriction.", t: "Trap: Never start a beta-blocker before alpha blockade in suspected pheochromocytoma.", m: "Alpha before beta",
          tb: { h: ["Step", "Blockade sequence"], r: [["1", "Alpha-blockade 10-14 days"], ["2", "Volume and salt repletion"], ["3", "Beta-blocker only if needed"], ["Never", "Beta before alpha"]] } }
      ]
    },
    {
      id: "gi-celiac",
      system: "GI",
      task: "TEST",
      vignette: "A 28-year-old woman has 6 months of bloating, intermittent diarrhea, and fatigue. Labs show iron deficiency anemia unresponsive to oral iron. She has an intensely pruritic vesicular rash on both elbows. She currently eats a regular, gluten-containing diet.",
      leadIn: "What is the most appropriate initial test?",
      options: [
        "Tissue transglutaminase IgA antibody with a total IgA level.",
        "Begin an empiric gluten-free diet before serologic testing and reassess symptoms in 6 weeks.",
        "Stool culture and ova/parasites as the first test for chronic diarrhea with dermatitis herpetiformis.",
        "HLA-DQ2/DQ8 genotyping as the first test while she is still eating a gluten-containing diet."
      ],
      correct: 0,
      explanation: "Diarrhea + refractory iron deficiency + dermatitis herpetiformis is celiac disease until proven otherwise. The best initial test is <strong>tTG-IgA with a total IgA</strong> (IgA deficiency causes false negatives) — obtained <strong>while still eating gluten</strong>. Starting a gluten-free diet first invalidates both serology and biopsy; HLA typing is only useful for its negative predictive value.",
      flashcards: [
        { f: "What is the best initial test for suspected celiac disease?", b: "tTG-IgA plus total IgA while the patient is eating gluten.", x: "IgA deficiency can cause false-negative tTG-IgA; gluten avoidance can normalize serology and biopsy.", t: "Trap: Do not start a gluten-free diet before testing if the patient is stable.", m: "Test while eating gluten" },
        { f: "What duodenal biopsy findings confirm celiac disease?", b: "Villous atrophy, crypt hyperplasia, and increased intraepithelial lymphocytes.", x: "Immune-mediated gluten injury reduces absorptive surface, causing diarrhea, weight loss, and iron deficiency.", t: "Trap: Positive serology usually needs biopsy confirmation in adults before lifelong diet labeling.", m: "Flat villi, deep crypts, many lymphocytes" },
        { f: "Which rash is classically associated with celiac disease?", b: "Dermatitis herpetiformis: intensely pruritic vesicles on extensor surfaces.", x: "It reflects granular IgA deposition in dermal papillae and responds to gluten-free diet; dapsone can speed relief.", t: "Trap: Dapsone treats itching but does not replace a strict gluten-free diet.", m: "Itchy extensor vesicles point to celiac" }
      ]
    },
    {
      id: "id-hiv-pcp",
      system: "ID",
      task: "RX",
      vignette: "A 36-year-old man is newly diagnosed with HIV infection. He is asymptomatic. CD4 count is 120/µL and the viral load is 85,000 copies/mL. Toxoplasma IgG is negative. Antiretroviral therapy is being initiated today.",
      leadIn: "In addition to ART, what is the most appropriate management?",
      options: [
        "Start trimethoprim-sulfamethoxazole prophylaxis.",
        "Start azithromycin prophylaxis for MAC.",
        "No prophylaxis; ART alone is sufficient at this CD4 count.",
        "Start fluconazole prophylaxis for cryptococcosis."
      ],
      correct: 0,
      explanation: "This untreated patient has CD4 120/µL and detectable HIV RNA, so start <strong>Pneumocystis jirovecii prophylaxis with TMP-SMX</strong>. NIH indications include CD4 &lt;100 regardless of viral load, or CD4 100–200 with detectable HIV RNA; prophylaxis is also recommended at CD4 &lt;200 when initiating ART. TMP-SMX covers toxoplasmosis when CD4 &lt;100 with positive IgG. Routine MAC prophylaxis is unnecessary when effective ART is promptly started, and primary fluconazole prophylaxis is not standard US care.",
      flashcards: [
        { f: "When is primary PCP prophylaxis indicated in HIV?", b: "CD4 <100 regardless of viral load, or CD4 100–200 with detectable HIV RNA; also at CD4 <200 when initiating ART. TMP-SMX is preferred.", x: "Sustained viral suppression modifies risk at CD4 100–200; TMP-SMX also prevents toxoplasmosis when IgG-positive and CD4 <100.", t: "Trap: A suppressed patient with CD4 150 may not need indefinite prophylaxis; aerosolized pentamidine does not prevent toxoplasmosis.", m: "PCP prevention uses CD4 plus viral control",
          tb: { h: ["Prophylaxis", "Indication", "Preferred"], r: [["PCP", "CD4 <100, or 100–200 with viremia", "TMP-SMX"], ["Toxoplasma", "CD4 <100 + IgG", "TMP-SMX"], ["MAC", "CD4 <50 without effective ART", "Azithromycin"], ["Candida", "Routine none", "Treat disease"]] } },
        { f: "Is MAC prophylaxis still routine in HIV?", b: "No — not needed when effective ART is being initiated (historically azithromycin at CD4 < 50).", x: "Effective ART rapidly lowers disseminated MAC risk, so primary azithromycin is usually unnecessary if ART can start promptly. Reserve MAC treatment for proven disease.", t: "Trap: Azithromycin prophylaxis is only considered at CD4 <50 when ART is not started or remains ineffective.", m: "MAC <50 only if ART is not working" },
        { f: "When is ART started relative to an opportunistic infection?", b: "Promptly — within ~2 weeks for most OIs; DELAY in cryptococcal meningitis because early ART worsens IRIS mortality.", x: "Early ART improves survival for most OIs, but CNS cryptococcosis is different because inflammatory swelling can be fatal. Timing is a board favorite.", t: "Trap: Do not delay ART for PCP; the classic delay is cryptococcal meningitis, not most OIs.", m: "Most OIs: ART in 2 weeks; cryptococcus waits" }
      ]
    },
    {
      id: "pulm-asthma-ics",
      system: "PULM",
      task: "RX",
      vignette: "A 24-year-old woman with asthma uses an albuterol inhaler alone. She now has symptoms three times weekly and wakes with nighttime cough twice monthly. She is using her albuterol more days than not during bad weeks. Spirometry is normal between episodes.",
      leadIn: "What is the most appropriate change in therapy?",
      options: [
        "Begin low-dose inhaled corticosteroid–formoterol as needed.",
        "Increase scheduled albuterol frequency to twice daily and before exercise without adding controller therapy.",
        "Add a long-acting beta-agonist alone to albuterol, without inhaled corticosteroid coverage.",
        "Begin daily oral prednisone for 2 weeks as controller therapy, then taper based on symptom frequency."
      ],
      correct: 0,
      explanation: "Symptoms more than twice weekly mean uncontrolled disease on SABA alone — and SABA-only therapy is no longer recommended at any severity because it leaves inflammation untreated. The preferred strategy is <strong>low-dose ICS-formoterol as needed</strong> (escalating to maintenance-and-reliever therapy). <strong>LABA monotherapy without ICS increases asthma deaths</strong>.",
      flashcards: [
        { f: "Why is SABA-only asthma therapy no longer recommended?", b: "It leaves airway inflammation untreated and increases exacerbations and mortality — every adult should receive ICS-containing therapy.", x: "Asthma symptoms reflect airway inflammation even when intermittent; ICS-containing relievers reduce severe exacerbations compared with albuterol alone.", t: "Trap: Frequent SABA use is a marker of poor control, not reassurance that rescue therapy is working.", m: "Asthma always needs an anti-inflammatory" },
        { f: "What is the preferred asthma reliever strategy?", b: "Low-dose ICS-formoterol as needed — also usable as maintenance-and-reliever therapy (MART/SMART).", x: "Formoterol has rapid onset and can safely pair with ICS for reliever use; other LABAs such as salmeterol are not used as rescue therapy.", t: "Trap: ICS-salmeterol is not a reliever strategy; the as-needed regimen specifically uses ICS-formoterol.", m: "Only formoterol is fast enough for ICS reliever" },
        { f: "Why is LABA monotherapy dangerous in asthma?", b: "Without an inhaled corticosteroid it increases asthma deaths — LABAs must ALWAYS be paired with ICS.", x: "LABA bronchodilation can mask worsening inflammation, so unopposed LABA increases fatal attacks. Combination inhalers avoid that risk.", t: "Trap: COPD may use LABA/LAMA without ICS; asthma requires ICS whenever a LABA is used.", m: "LABA never walks alone in asthma" }
      ]
    },
    {
      id: "rheum-sle",
      system: "RHEUM",
      task: "TEST",
      vignette: "A 24-year-old woman has 3 months of fatigue, symmetric small-joint arthralgias, a facial rash sparing the nasolabial folds that worsens with sun exposure, and pleuritic chest pain. CBC shows mild leukopenia. Urinalysis is pending.",
      leadIn: "What is the most appropriate initial serologic test?",
      options: [
        "Antinuclear antibody (ANA).",
        "Anti-double-stranded DNA antibody as the first test.",
        "Rheumatoid factor.",
        "ANCA panel."
      ],
      correct: 0,
      explanation: "Malar rash, photosensitivity, polyarthritis, serositis and cytopenias suggest systemic lupus. <strong>ANA is the screening test</strong> — nearly 100% sensitive, so a negative ANA argues strongly against SLE. If positive, confirm with the <strong>specific</strong> antibodies: anti-dsDNA (tracks nephritis activity) and anti-Smith.",
      flashcards: [
        { f: "What is the serologic strategy in suspected SLE?", b: "ANA is the sensitive SCREEN (negative ANA nearly excludes SLE); anti-dsDNA and anti-Smith are the SPECIFIC confirmators.", x: "ANA is highly sensitive, making it best for screening when pretest probability is reasonable. Specific antibodies help classify disease and organ risk.", t: "Trap: Anti-dsDNA is specific but not sensitive enough to be the initial screening test.", m: "ANA screens; dsDNA/Smith seals",
          tb: { h: ["Test", "Best use", "Key point"], r: [["ANA", "Screen", "Very sensitive"], ["Anti-dsDNA", "Confirm", "Tracks nephritis"], ["Anti-Smith", "Confirm", "Highly specific"], ["C3/C4", "Monitor", "Low in flares"]] } },
        { f: "Which drug belongs in essentially every SLE regimen?", b: "Hydroxychloroquine — reduces flares, thrombosis, and organ damage; requires periodic retinal screening.", x: "Hydroxychloroquine is disease-modifying in SLE and lowers flare and thrombosis risk. Eye toxicity is dose- and duration-related, so screening matters.", t: "Trap: Do not reserve hydroxychloroquine only for rash or arthritis; use it broadly unless contraindicated.", m: "Lupus baseline drug: hydroxychloroquine" },
        { f: "How is lupus nephritis detected early?", b: "Regular urinalysis + urine protein/creatinine ratio, with anti-dsDNA and complement (C3/C4) monitoring; biopsy classifies the lesion.", x: "Proteinuria or cellular casts may be the first sign of nephritis; biopsy guides immunosuppression class rather than simply confirming SLE.", t: "Trap: A normal creatinine can miss active nephritis; screen urine, complements, and anti-dsDNA trends.", m: "Lupus kidney trouble shows first in urine" }
      ]
    },
    {
      id: "neph-ckd-acei",
      system: "NEPH",
      task: "RX",
      vignette: "A 61-year-old man with type 2 diabetes has blood pressure 148/92 mm Hg on no therapy. eGFR is 52 mL/min/1.73 m² and the urine albumin-creatinine ratio is 780 mg/g. Potassium is 4.4 mEq/L.",
      leadIn: "What is the most appropriate initial antihypertensive?",
      options: [
        "An ACE inhibitor (or ARB).",
        "Amlodipine.",
        "Hydrochlorothiazide.",
        "Combined ACE inhibitor plus ARB for maximal proteinuria reduction."
      ],
      correct: 0,
      explanation: "In proteinuric (albuminuric) CKD — especially diabetic kidney disease — <strong>ACE inhibitors or ARBs are first-line</strong>: they lower intraglomerular pressure and slow progression. The two must <strong>never be combined</strong> (hyperkalemia, AKI). A creatinine rise up to ~30% after initiation may be acceptable if stable and potassium and volume status are appropriate; a rise is not required for benefit.",
      flashcards: [
        { f: "What is first-line antihypertensive therapy in proteinuric CKD?", b: "An ACE inhibitor OR an ARB — slows progression; NEVER combine the two (hyperkalemia, AKI).", x: "Efferent arteriolar dilation lowers intraglomerular pressure, reducing albuminuria and long-term scarring. Benefit is strongest when albuminuria is present.", t: "Trap: Do not combine ACEi plus ARB; dual blockade increases AKI and hyperkalemia without outcome benefit.", m: "Protein in urine → block angiotensin" },
        { f: "How much creatinine rise is acceptable after starting an ACEi/ARB?", b: "Up to ~30% within the first weeks — recheck Cr/K in 1–2 weeks; a larger rise suggests bilateral renal artery stenosis.", x: "A small creatinine rise reflects hemodynamic lowering of filtration pressure, not tubular injury. Monitor potassium because aldosterone falls.", t: "Trap: A rise >30% suggests renal artery stenosis, volume depletion, NSAIDs, or overdiuresis.", m: "30% creatinine bump can be expected",
          tb: { h: ["Creatinine rise", "Meaning", "Action"], r: [["≤30%", "Expected hemodynamic", "Recheck Cr and K"], [">30%", "Possible RAS or volume", "Evaluate and hold"], ["High K", "Low aldosterone effect", "Adjust therapy"], ["Bilateral RAS", "Large GFR drop", "Avoid ACEi or ARB"]] } },
        { f: "Which other drug classes slow diabetic CKD progression?", b: "SGLT2 inhibitors (major renal protection), plus finerenone for residual albuminuria in type 2 diabetes.", x: "SGLT2 inhibitors reduce intraglomerular pressure via tubuloglomerular feedback; finerenone blocks mineralocorticoid-driven fibrosis.", t: "Trap: DPP-4 inhibitors lower glucose but do not provide the same kidney-outcome protection.", m: "SGLT2 for kidney pressure, finerenone for fibrosis" }
      ]
    },
    {
      id: "heme-aiha",
      system: "HEME",
      task: "RX",
      vignette: "A 45-year-old woman has one week of fatigue and dark urine. Examination shows pallor, scleral icterus, and a palpable spleen tip. Hemoglobin is 7.9 g/dL, reticulocytes 9%, LDH elevated, haptoglobin undetectable, indirect bilirubin 3.1 mg/dL. Peripheral smear shows spherocytes. The direct antiglobulin (Coombs) test is positive for IgG.",
      leadIn: "What is the most appropriate initial treatment?",
      options: [
        "Glucocorticoids.",
        "Urgent splenectomy.",
        "Plasma exchange.",
        "Iron supplementation."
      ],
      correct: 0,
      explanation: "Hemolysis (high retics/LDH/indirect bilirubin, absent haptoglobin) with <strong>spherocytes and a positive IgG DAT</strong> is <strong>warm autoimmune hemolytic anemia</strong>. First-line therapy is <strong>glucocorticoids</strong>; rituximab or splenectomy are for refractory/relapsing disease. Transfuse if unstable even without a perfectly compatible crossmatch.",
      flashcards: [
        { f: "What is the lab signature of hemolysis?", b: "↑ reticulocytes, ↑ LDH, ↑ indirect bilirubin, and LOW haptoglobin.", x: "Low haptoglobin occurs because free hemoglobin binds it during intravascular or brisk extravascular hemolysis. Reticulocytosis shows marrow compensation.", t: "Trap: Isolated anemia with low retics suggests underproduction, not hemolysis.", m: "Hemolysis: retics and LDH up, haptoglobin down" },
        { f: "What test supports autoimmune hemolytic anemia in a patient with hemolysis?", b: "A positive direct antiglobulin test; warm AIHA typically has IgG coating and spherocytes.", x: "DAT detects RBC-bound antibody or complement. Interpret it with evidence of hemolysis; a minority of AIHA cases are DAT-negative with standard testing.", t: "Trap: A positive DAT alone is not proof of active hemolysis; hereditary spherocytosis usually has a negative DAT.", m: "Warm AIHA: hemolysis plus IgG DAT and spherocytes",
          tb: { h: ["Feature", "Warm AIHA", "Hereditary sphere"], r: [["DAT", "Positive IgG", "Negative"], ["Smear", "Spherocytes", "Spherocytes"], ["Mechanism", "Autoimmune", "Membrane defect"], ["First therapy", "Steroids", "Support or spleen"]] } },
        { f: "What is first-line therapy for warm AIHA?", b: "Glucocorticoids; add rituximab in severe disease or inadequate response. Do not delay urgently needed transfusion.", x: "Work with transfusion medicine to exclude clinically significant alloantibodies and select appropriately antigen-matched RBCs; an autoantibody may make all crossmatches reactive.", t: "Trap: Searching for 'least incompatible' blood does not establish transfusion safety and should not delay lifesaving RBCs.", m: "Warm AIHA: steroids and blood-bank coordination" }
      ]
    },
    {
      id: "onc-breast-screen",
      system: "ONC",
      task: "RISK",
      vignette: "A 42-year-old average-risk woman asks when she should begin breast cancer screening. She has no family history of breast or ovarian cancer, no prior chest radiation, and no personal history of breast disease.",
      leadIn: "According to USPSTF breast screening guidance, what is the most appropriate recommendation?",
      options: [
        "Biennial screening mammography now, continuing through age 74.",
        "Annual breast MRI now, continuing through age 74.",
        "Biennial mammography beginning at age 50 through age 74.",
        "Annual breast ultrasound now, continuing through age 74."
      ],
      correct: 0,
      explanation: "The USPSTF (2024) recommends <strong>biennial screening mammography for all average-risk women ages 40–74</strong>; waiting until age 50 delays recommended screening. Breast MRI is reserved for high-risk women (BRCA carriers, prior chest radiation, lifetime risk ≳ 20%). Ultrasound does not replace mammography for routine average-risk screening.",
      flashcards: [
        { f: "What is the current USPSTF breast cancer screening recommendation?", b: "Biennial screening mammography for average-risk women ages 40–74 (2024 update).", x: "The 2024 USPSTF update starts average-risk screening at 40 because benefits outweigh harms in that age range. Shared decision-making still matters.", t: "Trap: Annual mammography is not the USPSTF default; it recommends biennial screening.", m: "40 to 74, every 2 years" },
        { f: "Who needs supplemental breast MRI screening?", b: "High-risk women: BRCA carriers, chest radiation at a young age, or estimated lifetime risk ≳ 20%.", x: "MRI is more sensitive but causes false positives, so it is reserved for markedly elevated lifetime risk rather than dense breasts alone.", t: "Trap: Average-risk family history does not automatically mean MRI; use genetics/risk modeling.", m: "MRI is for very high lifetime risk" },
        { f: "Which family history features suggest BRCA and warrant genetics referral?", b: "Breast cancer < 50, bilateral or male breast cancer, ovarian/pancreatic cancer, multiple affected relatives, Ashkenazi ancestry.", x: "BRCA patterns cluster breast and ovarian-spectrum cancers and early onset disease. Identifying carriers changes screening and prevention for relatives.", t: "Trap: A single older postmenopausal breast cancer in one relative is less suggestive than early, bilateral, male, or ovarian cancer.", m: "BRCA clues: early, bilateral, male, ovarian" }
      ]
    },
    {
      id: "neuro-status",
      system: "NEURO",
      task: "RX",
      vignette: "A 31-year-old man with epilepsy is brought in actively convulsing; the seizure has lasted 8 minutes by EMS report. Glucose is 96 mg/dL. He has IV access, oxygen is applied, and he is positioned safely.",
      leadIn: "What is the most appropriate immediate pharmacologic therapy?",
      options: [
        "IV lorazepam.",
        "IV levetiracetam as the first drug.",
        "Oral lorazepam via nasogastric tube.",
        "IV mannitol."
      ],
      correct: 0,
      explanation: "A seizure lasting ≥ 5 minutes is <strong>status epilepticus</strong>. First-line therapy is an <strong>IV benzodiazepine — lorazepam</strong> (or IM midazolam without IV access). A second-line agent (fosphenytoin, valproate, or levetiracetam) follows immediately after benzodiazepines, not instead of them.",
      flashcards: [
        { f: "Define status epilepticus.", b: "≥ 5 minutes of continuous seizure activity, or recurrent seizures without recovery of consciousness between them.", x: "Neuronal injury risk rises after about 5 minutes, so treatment starts before waiting for spontaneous termination. Recovery between seizures resets the clock.", t: "Trap: Do not use the old 30-minute definition at the bedside; treat at 5 minutes.", m: "Five minutes is status" },
        { f: "What is the first-line drug in status epilepticus?", b: "An IV benzodiazepine — lorazepam IV, or midazolam IM when there is no IV access.", x: "Benzodiazepines rapidly potentiate GABA and stop seizures fastest. Airway monitoring is essential, but respiratory risk is lower than ongoing seizure risk.", t: "Trap: Levetiracetam is second-line loading, not the first medication before benzodiazepine.", m: "Benzos break the seizure first" },
        { f: "What follows benzodiazepines in status epilepticus?", b: "A second-line agent: fosphenytoin, valproate, or levetiracetam — then anesthetic infusions (propofol/midazolam) if refractory.", x: "Longer-acting antiseizure loading prevents recurrence after the benzodiazepine wears off. Refractory cases require ICU anesthetic coma and EEG.", t: "Trap: Repeating small benzodiazepine doses indefinitely delays definitive second-line therapy.", m: "Benzo now, load longer-acting next",
          tb: { h: ["Step", "Medication", "Purpose"], r: [["First", "Lorazepam IV", "Stop seizure fast"], ["No IV", "Midazolam IM", "Rapid access"], ["Second", "Fosphenytoin etc", "Prevent recurrence"], ["Refractory", "Propofol or midazolam", "ICU coma"]] } }
      ]
    },
    {
      id: "geri-incontinence",
      system: "GERI",
      task: "RX",
      vignette: "A 68-year-old woman reports urine leakage when she coughs, sneezes, laughs, or lifts groceries. She denies urgency, frequency, nocturia, or leakage preceded by a sudden need to void. Urinalysis is normal and post-void residual is 40 mL.",
      leadIn: "What is the most appropriate initial management?",
      options: [
        "Pelvic floor muscle (Kegel) training.",
        "Oxybutynin.",
        "Mirabegron.",
        "Referral for a midurethral sling as the first step."
      ],
      correct: 0,
      explanation: "Leakage with cough/sneeze/exertion and no urgency is <strong>stress incontinence</strong> (urethral sphincter/pelvic floor failure). First-line therapy is <strong>pelvic floor muscle training</strong> (plus weight loss if obese). Antimuscarinics and mirabegron treat URGE incontinence; surgery is for refractory stress incontinence.",
      flashcards: [
        { f: "How do stress and urge incontinence differ?", b: "Stress: leak with cough/sneeze/exertion (sphincter/pelvic floor failure). Urge: sudden overwhelming need with large-volume leak (detrusor overactivity).", x: "Stress incontinence is a storage problem from outlet weakness; urge incontinence is detrusor overactivity. History usually distinguishes them.", t: "Trap: Postvoid residual is for overflow symptoms, not classic stress leakage with exertion.", m: "Cough leak = stress; gotta-go leak = urge",
          tb: { h: ["Type", "Typical leak", "Mechanism", "First step"], r: [["Stress", "Cough or exertion", "Outlet weakness", "Kegels"], ["Urge", "Sudden gotta go", "Detrusor overactive", "Bladder training"], ["Overflow", "Dribbling", "Retention", "Check PVR"], ["Functional", "Cannot reach toilet", "Mobility or cognition", "Modify barriers"]] } },
        { f: "What is first-line therapy for stress incontinence?", b: "Pelvic floor muscle (Kegel) training ± weight loss; midurethral sling surgery for refractory cases.", x: "Kegel training strengthens urethral support and is low risk. Benefit depends on correct technique and sustained practice.", t: "Trap: Antimuscarinics treat urge symptoms; they do not fix sphincter weakness in stress incontinence.", m: "Kegels strengthen the outlet" },
        { f: "What is first-line therapy for urge incontinence?", b: "Bladder training first; then mirabegron or antimuscarinics — beware anticholinergic cognitive effects in older adults.", x: "Bladder training increases functional bladder capacity and suppresses urgency. Drug choice must consider hypertension, cognition, and constipation.", t: "Trap: Oxybutynin is anticholinergic and can worsen confusion, dry mouth, and falls in older adults.", m: "Urge starts with bladder training" }
      ]
    },
    {
      id: "crit-anaphylaxis",
      system: "CRIT",
      task: "RX",
      vignette: "A 27-year-old man develops diffuse urticaria, lip swelling, wheezing, and lightheadedness within 10 minutes of a bee sting. Blood pressure is 86/50 mm Hg, heart rate 124/min, and he is audibly wheezing.",
      leadIn: "What is the most appropriate immediate treatment?",
      options: [
        "Intramuscular epinephrine in the mid-outer thigh.",
        "IV diphenhydramine plus famotidine.",
        "IV methylprednisolone plus isotonic saline.",
        "Nebulized albuterol plus supplemental oxygen."
      ],
      correct: 0,
      explanation: "Skin findings plus respiratory compromise and hypotension after an allergen is <strong>anaphylaxis</strong> — the only first-line therapy is <strong>IM epinephrine (0.3–0.5 mg of 1 mg/mL) in the mid-outer thigh</strong>, repeated every 5–15 minutes as needed. Antihistamines, steroids, and bronchodilators are adjuncts that never substitute for or delay epinephrine.",
      flashcards: [
        { f: "What is the first-line treatment of anaphylaxis?", b: "IM epinephrine 0.3–0.5 mg (1 mg/mL) in the mid-outer thigh, repeated every 5–15 min — antihistamines and steroids are adjuncts only.", x: "IM thigh injection gives fast absorption and treats airway edema, bronchospasm, and shock through α and β effects. Delay increases mortality.", t: "Trap: H1 blockers relieve hives only; they do not treat hypotension or airway edema.", m: "Epi first, thigh fast" },
        { f: "What defines anaphylaxis?", b: "Acute onset with skin/mucosal involvement PLUS respiratory compromise, hypotension, or severe GI symptoms after a likely allergen.", x: "Anaphylaxis is clinical; skin findings may be absent, especially with shock. Treat immediately when two organ systems or hypotension follow exposure.", t: "Trap: Do not wait for tryptase or rash if respiratory compromise and hypotension are present.", m: "Two systems after allergen = anaphylaxis" },
        { f: "What follows epinephrine in anaphylaxis?", b: "Supine positioning + IV fluids, airway support, observation for biphasic reactions, and discharge with an epinephrine autoinjector + allergy referral.", x: "Large-volume crystalloid may be needed because vasodilation and capillary leak cause distributive shock. Biphasic reactions can recur after improvement.", t: "Trap: Steroids do not act fast enough for acute treatment and should never delay epinephrine.", m: "After epi: lay flat, fill tank, watch rebound" }
      ]
    }
    ,

    /* ─────────────────────────────────────────────────────────────────
     * V2.3 expansion — 27 more board classics, incl. three new blueprint
     * systems (Psychiatry 4%, Dermatology 3%, Obstetrics & Gynecology 3%).
     * ───────────────────────────────────────────────────────────────── */
    {
      id: "cv-tamponade",
      system: "CV",
      task: "NEXT",
      vignette: "A 61-year-old woman with metastatic lung adenocarcinoma presents with 3 days of progressive dyspnea and lightheadedness. Blood pressure is 84/62 mm Hg, heart rate 128/min. Jugular venous pressure is elevated to the angle of the jaw, heart sounds are distant, and systolic pressure falls by 18 mm Hg with inspiration. ECG shows low voltage with beat-to-beat variation in QRS amplitude. Bedside echocardiogram shows a large circumferential effusion with right ventricular diastolic collapse.",
      leadIn: "What is the most appropriate next step in management?",
      options: [
        "IV furosemide to reduce venous congestion.",
        "Urgent pericardiocentesis.",
        "Sublingual nitroglycerin and admission for observation.",
        "CT pulmonary angiography."
      ],
      correct: 1,
      explanation: "Hypotension, raised JVP, and muffled heart sounds (<strong>Beck triad</strong>) with <strong>pulsus paradoxus</strong>, electrical alternans, and RV diastolic collapse define <strong>cardiac tamponade</strong> — the treatment is <strong>urgent pericardial drainage</strong>. The heart is preload-dependent: diuretics and nitrates drop filling pressure and can precipitate arrest; IV fluid is only a temporizing bridge.",
      flashcards: [
        { f: "What is Beck triad?", b: "Hypotension, elevated JVP, and muffled heart sounds — the classic bedside signature of cardiac tamponade.", x: "Tamponade equalizes diastolic pressures and limits ventricular filling. Beck triad is specific but not always complete.", t: "Trap: Muffled sounds may be absent; echo evidence of chamber collapse plus shock drives action.", m: "Beck: low pressure, high neck veins, quiet heart" },
        { f: "What is pulsus paradoxus?", b: "An inspiratory fall in systolic BP of more than 10 mm Hg — seen in tamponade (also severe asthma/COPD).", x: "Inspiratory RV filling shifts the septum left, exaggerating the normal systolic BP drop. It marks constrained ventricular filling.", t: "Trap: Pulsus paradoxus also occurs in severe asthma; JVP elevation and echo point to tamponade.", m: "Pulsus >10 points to constrained filling" },
        { f: "Which drugs are dangerous in cardiac tamponade?", b: "Diuretics, nitrates, and other vasodilators — the ventricle is preload-dependent; give fluids as a bridge to pericardiocentesis.", x: "Because stroke volume depends on preload, reducing venous return can cause circulatory collapse. Drainage is definitive.", t: "Trap: Diuresis helps volume-overload pericardial effusions, not tamponade physiology with shock.", m: "Tamponade is preload-dependent" }
      ]
    },
    {
      id: "cv-aortic-dissection",
      system: "CV",
      task: "RX",
      vignette: "A 64-year-old man with long-standing poorly controlled hypertension develops abrupt, tearing chest pain radiating to the interscapular back. Blood pressure is 184/102 mm Hg in the right arm and 152/88 mm Hg in the left; heart rate is 108/min. A new early diastolic decrescendo murmur is heard. CT angiography shows a dissection flap involving the ascending aorta. Cardiothoracic surgery has been paged.",
      leadIn: "What is the most appropriate initial medical therapy while awaiting surgery?",
      options: [
        "IV unfractionated heparin plus chewed aspirin 325 mg for presumed ACS.",
        "IV nitroprusside as monotherapy titrated to systolic BP 100–120 mm Hg.",
        "IV esmolol titrated to heart rate 60–80/min and systolic BP < 120 mm Hg.",
        "IV alteplase for presumed acute coronary occlusion."
      ],
      correct: 2,
      explanation: "This is a <strong>Stanford type A (ascending) aortic dissection</strong> — a surgical emergency. Meanwhile, <strong>anti-impulse therapy</strong> starts with an <strong>IV beta-blocker</strong> (esmolol, labetalol) to reduce dP/dt: target <strong>HR 60–80/min and SBP &lt; 120 mm Hg</strong> (or the lowest BP that maintains end-organ perfusion)<strong></strong>. A vasodilator such as nitroprusside is added only <em>after</em> beta-blockade, because alone it causes reflex tachycardia that propagates the tear. Anticoagulants and thrombolytics are contraindicated.",
      flashcards: [
        { f: "Stanford type A vs type B aortic dissection — management?", b: "Type A (ascending aorta) → emergency surgery. Type B (descending only) → medical therapy unless complicated (malperfusion, rupture → TEVAR).", x: "Ascending dissections threaten rupture, tamponade, and coronary involvement, so surgery is urgent. Uncomplicated descending dissections often heal with impulse control.", t: "Trap: Pain location does not classify dissection; anatomy on imaging determines type A vs B.", m: "A ascends to surgery; B begins with beta-blockade",
          tb: { h: ["Type", "Anatomy", "Main treatment"], r: [["Stanford A", "Ascending involved", "Emergency surgery"], ["Stanford B", "Descending only", "Medical therapy"], ["Complicated B", "Rupture or malperfusion", "TEVAR"], ["Both", "Acute tear", "Beta-block first"]] } },
        { f: "What are the targets of anti-impulse therapy in dissection?", b: "IV beta-blocker FIRST to HR 60–80/min, then SBP < 120 mm Hg — add a vasodilator only after beta-blockade.", x: "Reducing shear stress requires slowing heart rate before lowering pressure. Reflex tachycardia can extend the intimal tear.", t: "Trap: Nitroprusside before beta-blockade may worsen dissection through reflex sympathetic activation.", m: "Impulse control: HR 60-80 before SBP <120",
          tb: { h: ["Target", "Goal", "How"], r: [["Heart rate", "60–80/min", "IV beta-blocker"], ["SBP", "<120 mm Hg", "After HR control"], ["Perfusion", "Maintain organs", "Avoid overshoot"], ["Vasodilator", "If SBP still high", "Only after beta-block"]] } },
        { f: "Best imaging for suspected aortic dissection?", b: "CT angiography if stable; bedside TEE if hemodynamically unstable (MRI is accurate but slow).", x: "CTA is fast and widely available; TEE is portable for unstable patients or those who cannot leave the resuscitation bay.", t: "Trap: MRI is accurate but too slow for most unstable acute dissections.", m: "Stable CTA, unstable TEE" }
      ]
    },
    {
      id: "cv-ldl-190",
      system: "CV",
      task: "RISK",
      vignette: "A 38-year-old man is seen for a routine visit. He has no symptoms and no known cardiovascular disease, diabetes, or hypertension. His father had a myocardial infarction at age 46. Examination shows thickening of the Achilles tendons. Fasting LDL cholesterol is 214 mg/dL on two measurements; TSH, liver chemistries, and urine protein are normal.",
      leadIn: "What is the most appropriate management?",
      options: [
        "Calculate 10-year ASCVD risk and treat only if ≥ 7.5%.",
        "Therapeutic lifestyle changes and recheck lipids in 12 months.",
        "Obtain a coronary artery calcium score to decide on therapy.",
        "Start a high-intensity statin."
      ],
      correct: 3,
      explanation: "An <strong>LDL ≥ 190 mg/dL</strong> (here with tendon xanthomas and premature family CAD → likely <strong>familial hypercholesterolemia</strong>) warrants a <strong>high-intensity statin without risk calculation</strong>. Assess adherence and LDL response, add nonstatin therapy if the risk-specific LDL goal is not reached, and arrange family cascade screening. The 2026 ACC/AHA dyslipidemia guideline uses <strong>PREVENT-ASCVD</strong> for appropriate primary-prevention risk discussions, but a low calculated risk or CAC of zero does not justify deferring treatment of this severe hypercholesterolemia.",
      flashcards: [
        { f: "How does the 2026 ACC/AHA guideline stratify primary-prevention lipid risk?", b: "Use PREVENT-ASCVD: borderline 3% to <5%, intermediate 5% to <10%, high ≥10% 10-year risk.", x: "Lipid-lowering therapy is reasonable at borderline risk and recommended at intermediate risk after discussion. LDL ≥190 mg/dL warrants treatment without a risk calculation.", t: "Trap: Do not apply the old pooled-cohort 7.5% threshold to PREVENT or use CAC to defer therapy for LDL ≥190.", m: "PREVENT: 3, 5, 10; LDL 190 skips calculation",
          tb: { h: ["PREVENT risk", "Category", "Usual approach"], r: [["<3%", "Low", "Lifestyle; assess modifiers"], ["3% to <5%", "Borderline", "Consider lipid therapy"], ["5% to <10%", "Intermediate", "Recommend after discussion"], ["≥10%", "High", "Lipid-lowering therapy"]] } },
        { f: "What defines high-intensity statin therapy?", b: "Lowers LDL by ≥ 50%: atorvastatin 40–80 mg or rosuvastatin 20–40 mg daily.", x: "High-intensity dosing targets percent reduction, not just crossing a single LDL threshold. Recheck lipids to confirm adherence and response.", t: "Trap: Simvastatin 20–40 mg is moderate intensity, not high intensity.", m: "High intensity halves LDL" },
        { f: "When does a coronary artery calcium score help?", b: "Intermediate-risk primary prevention when the statin decision is uncertain — CAC 0 favors deferring; CAC ≥ 100 (or ≥ 75th percentile) favors a statin.", x: "CAC refines risk when benefit is uncertain; calcium burden identifies subclinical plaque and motivates statin use.", t: "Trap: CAC 0 does not override diabetes, LDL ≥190, active smoking, or strong premature family history.", m: "CAC is for uncertain middle-risk decisions" }
      ]
    },
    {
      id: "endo-primary-aldo",
      system: "ENDO",
      task: "TEST",
      vignette: "A 46-year-old woman has blood pressure 164/100 mm Hg despite maximal doses of amlodipine, lisinopril, and chlorthalidone. A serum potassium of 3.2 mEq/L was documented before any diuretic was ever prescribed. She has no headaches, palpitations, or cushingoid features. Creatinine is normal.",
      leadIn: "What is the most appropriate initial diagnostic test?",
      options: [
        "Plasma aldosterone concentration and plasma renin activity (aldosterone-to-renin ratio).",
        "24-hour urine fractionated metanephrines and catecholamines.",
        "Renal artery duplex ultrasonography to evaluate for renovascular hypertension.",
        "Overnight 1-mg dexamethasone suppression test for cortisol excess."
      ],
      correct: 0,
      explanation: "<strong>Resistant hypertension</strong> with <strong>spontaneous hypokalemia</strong> strongly suggests <strong>primary aldosteronism</strong>, a common endocrine cause of secondary hypertension. Screen with morning aldosterone and renin, interpreting the <strong>aldosterone-to-renin ratio</strong> together with absolute values. Correct hypokalemia and consider medication interference to avoid false negatives. The 2025 Endocrine Society guideline suggests screening all adults with hypertension. Suppression testing is selective, not mandatory with overt renin-independent aldosterone excess or when proceeding directly to medical treatment. Surgical candidates generally need adrenal CT and adrenal vein sampling.",
      flashcards: [
        { f: "Who should be screened for primary aldosteronism under 2025 guidance?", b: "The Endocrine Society suggests screening all adults with hypertension; resistant hypertension or hypokalemia is especially high-yield.", x: "Aldosterone excess causes sodium retention and suppressed renin; many patients are normokalemic. Implementation depends on resources and clinical priorities.", t: "Trap: Correct hypokalemia before testing because low potassium can suppress aldosterone and produce a false negative.", m: "Hypertension opens the aldosterone screen" },
        { f: "What is the diagnostic pathway after a positive aldosterone-renin screen?", b: "Selectively use suppression testing; surgical candidates generally need adrenal CT and adrenal vein sampling to lateralize.", x: "Suppression testing helps when the probability is intermediate and surgery is desired; overt biochemical disease or planned medical therapy can bypass it.", t: "Trap: Do not send directly to adrenalectomy based only on a CT nodule; incidentalomas are common.", m: "Screen, choose pathway, lateralize before surgery",
          tb: { h: ["Step", "Test or decision", "Purpose"], r: [["Screen", "Aldosterone and renin", "Renin-independent secretion"], ["Clarify if needed", "Suppression test", "Intermediate probability"], ["Surgical workup", "Adrenal CT", "Define anatomy"], ["Lateralize", "Adrenal veins", "Guide surgery"]] } },
        { f: "How is primary aldosteronism treated?", b: "Unilateral adenoma → laparoscopic adrenalectomy. Bilateral hyperplasia → mineralocorticoid receptor antagonist (spironolactone or eplerenone).", x: "Removing a unilateral source can cure or improve hypertension; bilateral disease needs receptor blockade to stop aldosterone effects.", t: "Trap: ACE inhibitors are not definitive therapy for bilateral primary aldosteronism; use spironolactone or eplerenone.", m: "One adrenal: remove; two adrenals: block" }
      ]
    },
    {
      id: "endo-t2dm-ascvd",
      system: "ENDO",
      task: "RX",
      vignette: "A 62-year-old man with type 2 diabetes had a myocardial infarction 1 year ago. He takes metformin 1000 mg twice daily, aspirin, high-intensity atorvastatin, metoprolol succinate, and lisinopril. Hemoglobin A1c is 7.9%. eGFR is 72 mL/min/1.73 m²; urine albumin-to-creatinine ratio is normal. LVEF is 55%. BMI is 33.",
      leadIn: "What is the most appropriate addition to his regimen?",
      options: [
        "Glipizide, a sulfonylurea, titrated to fasting glucose as an inexpensive add-on with potent A1c lowering.",
        "A GLP-1 receptor agonist with proven cardiovascular benefit (e.g., semaglutide).",
        "Sitagliptin, a DPP-4 inhibitor, for its weight neutrality and presumed cardiovascular risk reduction.",
        "Basal insulin glargine, titrated to fasting glucose 80–130 mg/dL, as preferred ASCVD risk reduction."
      ],
      correct: 1,
      explanation: "In type 2 diabetes with <strong>established ASCVD</strong>, the ADA recommends a <strong>GLP-1 receptor agonist or SGLT2 inhibitor with demonstrated cardiovascular benefit</strong> — <strong>independent of A1c and of metformin use</strong>. With obesity, a GLP-1 RA also delivers weight loss. Sulfonylureas, DPP-4 inhibitors, and insulin lower glucose without reducing major adverse cardiovascular events.",
      flashcards: [
        { f: "T2DM + established ASCVD: which drug classes are preferred?", b: "GLP-1 receptor agonist or SGLT2 inhibitor with proven CV benefit — regardless of A1c or metformin use.", x: "Cardiorenal benefit from these agents is partly independent of glucose lowering, so use them even when A1c is near goal.", t: "Trap: Sulfonylureas lower A1c but have no proven ASCVD outcome benefit and can cause hypoglycemia.", m: "ASCVD diabetes: GLP-1 RA or SGLT2i regardless of A1c",
          tb: { h: ["Phenotype", "Preferred class", "Main benefit"], r: [["ASCVD", "GLP-1 RA or SGLT2i", "MACE reduction"], ["Obesity", "GLP-1 RA", "Weight loss"], ["Need oral", "SGLT2i", "Cardiorenal"], ["Hypoglycemia risk", "Avoid sulfonylurea", "Less low glucose"]] } },
        { f: "T2DM + heart failure or CKD: which drug class is preferred?", b: "SGLT2 inhibitor — reduces HF hospitalization and slows CKD progression (GLP-1 RA if SGLT2i not tolerated or for added ASCVD/weight benefit).", x: "SGLT2 inhibitors reduce intraglomerular pressure and HF hospitalization; they are prioritized when HF or CKD dominates the phenotype.", t: "Trap: GLP-1 RA is excellent for weight and ASCVD but is not the first choice for symptomatic HF benefit.", m: "HF or CKD phenotype points to SGLT2i" },
        { f: "What is the general A1c target in nonpregnant adults?", b: "< 7% for most; less stringent (< 8%) for older adults, frailty, limited life expectancy, or hypoglycemia risk.", x: "Targets are individualized by time to benefit, comorbidity, and hypoglycemia risk. Avoid overtreatment in frail or older patients.", t: "Trap: A universal A1c <6.5% is not appropriate for patients at high hypoglycemia risk.", m: "Most adults aim for A1c under 7, frailty loosens" }
      ]
    },
    {
      id: "gi-pancreatitis",
      system: "GI",
      task: "RX",
      vignette: "A 47-year-old woman presents with 12 hours of severe epigastric pain radiating to the back with nausea. Lipase is 1,850 U/L (normal < 60). Temperature 37.4 °C, BP 128/76 mm Hg, HR 102/min. Bilirubin 1.1 mg/dL, ALT 92 U/L. Ultrasound shows cholelithiasis with a normal-caliber common bile duct. She is started on moderate goal-directed lactated Ringer's solution and analgesia.",
      leadIn: "In addition, what is the most appropriate management?",
      options: [
        "Prophylactic IV imipenem to reduce bacterial translocation and prevent infected pancreatic necrosis.",
        "Strict NPO with total parenteral nutrition until lipase normalizes and pain fully resolves.",
        "Oral feeding as soon as tolerated, with cholecystectomy during this admission.",
        "ERCP within 24 hours to clear possible microlithiasis from the common bile duct and prevent recurrence."
      ],
      correct: 2,
      explanation: "<strong>Acute pancreatitis</strong> = 2 of 3: typical pain, <strong>lipase ≥ 3× ULN</strong>, or imaging findings. Care is <strong>moderate goal-directed lactated Ringer's</strong> (aggressive fluids increase volume overload without benefit), analgesia, and <strong>early oral feeding</strong> (enteral beats parenteral). <strong>Prophylactic antibiotics are not indicated</strong>. ERCP within 24 h is for concomitant <strong>cholangitis</strong>; persistent biliary obstruction also warrants therapeutic ERCP. Neither is present here. For mild gallstone pancreatitis, <strong>same-admission cholecystectomy</strong> prevents recurrence.",
      flashcards: [
        { f: "How is acute pancreatitis diagnosed?", b: "2 of 3: characteristic epigastric pain, lipase (or amylase) ≥ 3× ULN, or characteristic imaging findings.", x: "Enzyme elevation alone is insufficient if symptoms and imaging do not fit. Lipase is preferred because it is more pancreas-specific than amylase.", t: "Trap: CT is not required for straightforward early pancreatitis meeting pain plus lipase criteria.", m: "Pancreatitis diagnosis: 2 of 3" },
        { f: "Fluids and nutrition in acute pancreatitis?", b: "Moderate goal-directed lactated Ringer's (not aggressive) and early oral feeding as tolerated; enteral is preferred to TPN.", x: "Early enteral feeding preserves gut barrier function and reduces infections. LR may reduce inflammatory acidosis compared with normal saline.", t: "Trap: Prolonged NPO and routine TPN are outdated unless enteral feeding truly fails.", m: "Feed the gut early; do not flood aggressively" },
        { f: "When is ERCP indicated in gallstone pancreatitis?", b: "Urgently within 24 h for cholangitis; persistent biliary obstruction also warrants therapeutic ERCP, with timing guided by severity.", x: "Without cholangitis or ongoing obstruction, do not perform routine early ERCP. Mild gallstone pancreatitis needs same-admission cholecystectomy.", t: "Trap: Prophylactic antibiotics for sterile pancreatitis or necrosis are not indicated.", m: "ERCP for infected or obstructed ducts",
          tb: { h: ["Scenario", "ERCP?", "Next step"], r: [["Cholangitis", "Yes, within 24 h", "Drain duct"], ["Persistent block", "Yes", "Clear duct"], ["Mild gallstone", "No routine", "Same-admit chole"], ["Sterile necrosis", "No", "Supportive care"]] } }
      ]
    },
    {
      id: "gi-hcv",
      system: "GI",
      task: "TEST",
      vignette: "A 41-year-old man undergoes one-time hepatitis C screening at a routine visit. He reports remote injection drug use 15 years ago. He feels well. Examination is normal. ALT is 58 U/L; platelet count and albumin are normal. Hepatitis C antibody is reactive.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Quantitative HCV RNA (PCR).",
        "Liver biopsy.",
        "Repeat HCV antibody in 6 months.",
        "Start sofosbuvir-velpatasvir without further testing."
      ],
      correct: 0,
      explanation: "A reactive HCV antibody shows <strong>exposure</strong>, not necessarily active infection — some patients spontaneously clear the virus but remain antibody-positive. Confirm <strong>viremia with HCV RNA</strong>. If positive, check <strong>HBsAg, anti-HBc, and anti-HBs</strong> before DAAs because HBV can reactivate, and assess fibrosis noninvasively (FIB-4, elastography). Biopsy is rarely needed. Pangenotypic DAAs cure &gt; 95% of appropriately treated patients.",
      flashcards: [
        { f: "Who should be screened for hepatitis C?", b: "All adults at least once (CDC ≥ 18 y; USPSTF 18–79 y), every pregnancy, and periodically with ongoing risk such as injection drug use.", x: "Universal screening catches silent chronic infection before cirrhosis and hepatocellular carcinoma. Repeat testing is risk-based.", t: "Trap: Birth-cohort-only screening is outdated; all adults need at least one test.", m: "HCV screen once for all adults, repeat for risk" },
        { f: "What follows a positive HCV antibody?", b: "HCV RNA — antibody persists after spontaneous clearance or cure, so only RNA proves active infection.", x: "Antibody cannot distinguish past cleared infection from active viremia. RNA also documents cure after treatment.", t: "Trap: Do not diagnose chronic active HCV from antibody positivity alone.", m: "Antibody means exposed; RNA means infected",
          tb: { h: ["Result", "Meaning", "Next step"], r: [["Ab negative", "No exposure likely", "Repeat if recent risk"], ["Ab positive", "Exposed sometime", "Check HCV RNA"], ["RNA positive", "Active infection", "Stage and treat"], ["RNA negative", "Cleared or cured", "No active HCV"]] } },
        { f: "What are simplified pangenotypic HCV regimens for eligible treatment-naive adults?", b: "Sofosbuvir-velpatasvir for 12 weeks or glecaprevir-pibrentasvir for 8 weeks; assess fibrosis, interactions, and HBV status first.", x: "DAAs are short, oral, and highly curative; advanced liver disease, prior therapy, and some genotype/cirrhosis combinations require different pathways.", t: "Trap: Glecaprevir is a protease inhibitor and must not be used in decompensated cirrhosis.", m: "Modern HCV: short oral cures after eligibility review" }
      ]
    },
    {
      id: "id-meningitis",
      system: "ID",
      task: "NEXT",
      vignette: "A 64-year-old man is brought in with 18 hours of fever, severe headache, and neck stiffness. He is confused and oriented only to person. Temperature 39.6 °C, BP 118/70 mm Hg. Kernig sign is positive. There is no papilledema or focal deficit. Two sets of blood cultures have just been drawn.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Lumbar puncture immediately, then tailor antibiotics to CSF Gram stain and culture results after the procedure.",
        "Head CT, then lumbar puncture, then antibiotics after CSF is collected for definitive microbiologic diagnosis.",
        "IV dexamethasone, vancomycin, ceftriaxone, and ampicillin now; head CT before lumbar puncture.",
        "IV acyclovir alone pending MRI because confusion suggests viral encephalitis rather than meningitis."
      ],
      correct: 2,
      explanation: "Suspected <strong>bacterial meningitis</strong> requires antibiotics within the first hour — <strong>never delay therapy for imaging or LP</strong>. Altered consciousness is an indication for <strong>CT before LP</strong>, so give treatment first. Empiric adult regimen: <strong>vancomycin + ceftriaxone</strong>, plus <strong>ampicillin if age ≥ 50</strong> or immunocompromised (Listeria). Give <strong>dexamethasone</strong> just before or with the first antibiotic dose (mortality benefit in pneumococcal meningitis).",
      flashcards: [
        { f: "Empiric therapy for community-acquired bacterial meningitis in adults?", b: "Vancomycin + ceftriaxone (or cefotaxime); add ampicillin if age ≥ 50 or immunocompromised to cover Listeria; plus dexamethasone.", x: "Empiric therapy must cover pneumococcus, meningococcus, and resistant strains; older or immunocompromised adults need Listeria coverage.", t: "Trap: Ceftriaxone alone misses resistant pneumococcus and Listeria risk groups.", m: "Adult meningitis: vanc + ceftriaxone; add amp at 50",
          tb: { h: ["Patient group", "Empiric regimen", "Extra"], r: [["Adult <50", "Vanc + ceftriaxone", "Dexamethasone"], ["Age ≥50", "Add ampicillin", "Listeria cover"], ["Immunocompromised", "Add ampicillin", "Listeria cover"], ["Beta-lactam allergy", "ID-guided alternative", "Do not delay"]] } },
        { f: "When is head CT needed before lumbar puncture?", b: "Immunocompromise, known CNS lesion, new seizure, papilledema, altered consciousness, or focal deficit — but start antibiotics before the scan.", x: "CT indications identify mass-effect risk before LP, but meningitis mortality rises when antibiotics are delayed. Draw blood cultures first if possible.", t: "Trap: Do not wait for CT or LP results before giving antibiotics in a toxic patient.", m: "CT may precede LP, never precedes antibiotics" },
        { f: "When should dexamethasone be given in bacterial meningitis?", b: "10–20 min before or with the first antibiotic dose; continue only if pneumococcus is confirmed (mortality and hearing benefit).", x: "Steroids blunt inflammatory injury triggered by bacterial lysis, especially pneumococcus. They work only if given before or with antibiotics.", t: "Trap: Starting dexamethasone hours after antibiotics adds little benefit.", m: "Steroids must beat or meet the antibiotic" }
      ]
    },
    {
      id: "id-abscess",
      system: "ID",
      task: "RX",
      vignette: "A 29-year-old man has a 4-day history of a painful lump on his thigh. There is a 3.5-cm fluctuant, erythematous, tender nodule with 1 cm of surrounding erythema. Temperature 37.2 °C, HR 82/min. He has no diabetes or immunosuppression. MRSA is common in the community.",
      leadIn: "What is the most appropriate management?",
      options: [
        "Incision and drainage.",
        "Oral cephalexin alone.",
        "Admission for IV vancomycin.",
        "Warm compresses and recheck in 1 week."
      ],
      correct: 0,
      explanation: "A <strong>purulent skin abscess</strong> needs <strong>incision and drainage</strong> — source control is the primary therapy. Add an <strong>MRSA-active oral agent</strong> (TMP-SMX, doxycycline, clindamycin) for systemic signs, extensive cellulitis, multiple sites, immunosuppression, extremes of age, or failure of I&amp;D; trials also show modest cure benefit after drainage. Cephalexin alone does not cover MRSA.",
      flashcards: [
        { f: "Purulent vs nonpurulent skin infection — empiric treatment?", b: "Purulent (abscess/furuncle) → I&D ± MRSA-active agent. Nonpurulent cellulitis → cover β-hemolytic strep (cephalexin, cefazolin).", x: "Pus requires drainage because antibiotics penetrate poorly into walled-off collections. Antibiotics are adjunctive when host or systemic risk is higher.", t: "Trap: Nonpurulent cellulitis is usually streptococcal; MRSA coverage is not always needed.", m: "Pus needs a path out",
          tb: { h: ["Infection", "Likely pathogen", "Treatment"], r: [["Abscess", "S aureus incl MRSA", "I&D ± MRSA drug"], ["Furuncle", "S aureus", "Drain if large"], ["Cellulitis", "Strep", "Cephalexin"], ["Nec fasc", "Mixed or GAS", "Surgery + broad abx"]] } },
        { f: "Which oral antibiotics cover community MRSA?", b: "TMP-SMX, doxycycline/minocycline, clindamycin (variable resistance), and linezolid.", x: "TMP-SMX and doxycycline cover MRSA but have weaker streptococcal coverage, so combine if cellulitis is nonpurulent and strep is a concern.", t: "Trap: Cephalexin alone does not cover community MRSA in a purulent abscess.", m: "MRSA oral quartet: TMP-SMX, doxy, clinda, linezolid" },
        { f: "What are red flags for necrotizing fasciitis?", b: "Pain out of proportion to exam, rapid spread, crepitus, bullae/skin necrosis, systemic toxicity → emergent surgical exploration + broad antibiotics.", x: "Necrotizing infection is a surgical disease; early exploration saves life and limb. Imaging must not delay surgery when suspicion is high.", t: "Trap: Normal skin early or modest fever does not exclude necrotizing fasciitis if pain is severe.", m: "Pain out of proportion = cut early" }
      ]
    },
    {
      id: "id-syphilis",
      system: "ID",
      task: "RX",
      vignette: "A 26-year-old man presents with a 1-week nonpruritic rash involving the trunk, palms, and soles, with generalized lymphadenopathy and painless gray mucous patches in the mouth. He recalls a painless genital ulcer that healed 2 months ago. RPR is reactive at 1:64 and treponemal EIA is positive. HIV test is negative. He has no drug allergies and no neurologic or ocular symptoms.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Benzathine penicillin G 2.4 million units IM weekly for 3 weeks.",
        "Aqueous penicillin G IV for 14 days.",
        "Ceftriaxone 500 mg IM once.",
        "Benzathine penicillin G 2.4 million units IM once."
      ],
      correct: 3,
      explanation: "Rash on the <strong>palms and soles</strong>, mucous patches, and lymphadenopathy after a healed chancre = <strong>secondary syphilis</strong>. Primary, secondary, and early latent syphilis are treated with a <strong>single dose of benzathine penicillin G 2.4 million units IM</strong>. Three weekly doses are for late latent or unknown duration; IV aqueous penicillin is for neurosyphilis or ocular/otic syphilis. Warn about the <strong>Jarisch-Herxheimer reaction</strong>.",
      flashcards: [
        { f: "Treatment of primary, secondary, or early latent syphilis?", b: "Benzathine penicillin G 2.4 million units IM × 1 (late latent/unknown duration: weekly × 3).", x: "Benzathine penicillin provides prolonged low levels that eradicate early Treponema pallidum. Stage determines duration.", t: "Trap: Three weekly doses are for late latent or unknown duration, not secondary syphilis.", m: "Early syphilis gets one benzathine shot",
          tb: { h: ["Stage", "Penicillin regimen", "Duration"], r: [["Primary", "Benzathine G IM", "Once"], ["Secondary", "Benzathine G IM", "Once"], ["Early latent", "Benzathine G IM", "Once"], ["Late latent", "Benzathine G IM", "Weekly ×3"]] } },
        { f: "Treatment of neurosyphilis or ocular syphilis?", b: "Aqueous crystalline penicillin G IV 18–24 million units/day for 10–14 days.", x: "Neurosyphilis needs treponemicidal CSF concentrations, achieved by high-dose aqueous IV penicillin. Eye and ear disease are treated the same.", t: "Trap: Benzathine IM does not achieve adequate CSF levels for neurosyphilis.", m: "Neurosyphilis needs IV CSF levels" },
        { f: "Syphilis treatment with penicillin allergy?", b: "Nonpregnant: doxycycline 100 mg BID × 14 days (28 days if late). Pregnant: penicillin desensitization, then penicillin.", x: "Pregnancy is special because only penicillin reliably treats the fetus. Desensitization is mandatory when allergic.", t: "Trap: Doxycycline is contraindicated in pregnancy and cannot replace penicillin for congenital prevention.", m: "Pregnancy allergy still gets penicillin after desensitization" }
      ]
    },
    {
      id: "pulm-lofgren",
      system: "PULM",
      task: "RX",
      vignette: "A 32-year-old woman presents with 2 weeks of fever, painful bilateral ankle swelling, and tender red nodules on both shins. She has mild dry cough. Chest radiograph shows bilateral hilar lymphadenopathy with clear lung fields. Calcium, creatinine, liver chemistries, ECG, and eye examination are normal.",
      leadIn: "What is the most appropriate management?",
      options: [
        "NSAIDs and clinical observation.",
        "Prednisone 40 mg daily.",
        "Methotrexate.",
        "Mediastinoscopy with lymph node biopsy."
      ],
      correct: 0,
      explanation: "Erythema nodosum + bilateral hilar adenopathy + ankle periarthritis/fever = <strong>Löfgren syndrome</strong>, an acute sarcoidosis presentation so specific that biopsy is usually unnecessary and with <strong>&gt; 90% spontaneous remission</strong>. Treat symptoms with <strong>NSAIDs</strong>. Glucocorticoids are reserved for important progressive/symptomatic disease or organ threat, including clinically significant hypercalcemia. This patient has no such indication.",
      flashcards: [
        { f: "What is Löfgren syndrome?", b: "Acute sarcoidosis: erythema nodosum + bilateral hilar adenopathy + ankle periarthritis/fever — excellent prognosis, treat with NSAIDs.", x: "This triad is so specific for sarcoidosis that biopsy is usually unnecessary. The natural history is spontaneous remission in most patients.", t: "Trap: Do not biopsy every patient with classic Löfgren syndrome and benign course.", m: "Löfgren triad often heals itself" },
        { f: "Why does sarcoidosis cause hypercalcemia?", b: "Granuloma macrophages express 1-α-hydroxylase → excess calcitriol (1,25-(OH)₂ vitamin D) → increased gut calcium absorption.", x: "Macrophage 1-α-hydroxylase is not feedback-regulated like kidney enzyme, so vitamin D activation can continue despite hypercalcemia.", t: "Trap: Sarcoid hypercalcemia has high 1,25-OH₂ D, not primary hyperparathyroidism physiology.", m: "Sarcoid macrophages make calcitriol" },
        { f: "When are glucocorticoids indicated in sarcoidosis?", b: "Important symptomatic/progressive lung disease, organ-threatening cardiac, neurologic, ocular, or renal disease, or clinically significant hypercalcemia.", x: "Treatment balances disease severity against toxicity; mild isolated laboratory abnormalities do not automatically require systemic steroids.", t: "Trap: Asymptomatic bilateral hilar adenopathy alone often needs observation, not prednisone.", m: "Steroids for organ threat, not quiet nodes" }
      ]
    },
    {
      id: "pulm-lung-screen",
      system: "PULM",
      task: "RISK",
      vignette: "A 56-year-old woman asks about lung cancer screening. She smoked 1 pack per day from age 18 to 46 (28 pack-years) and quit 10 years ago. She is active and has no respiratory symptoms or major comorbidities.",
      leadIn: "What is the most appropriate recommendation?",
      options: [
        "No screening because she quit more than 5 years ago.",
        "Annual low-dose chest CT.",
        "Annual chest radiograph.",
        "Sputum cytology every 2 years."
      ],
      correct: 1,
      explanation: "USPSTF (2021): <strong>annual low-dose CT</strong> for adults <strong>50–80 years</strong> with <strong>≥ 20 pack-years</strong> who <strong>currently smoke or quit within the past 15 years</strong>. She qualifies. Stop screening once she has been smoke-free 15 years, or if a health problem limits life expectancy or willingness to have curative surgery. Chest radiograph and sputum cytology do not reduce mortality.",
      flashcards: [
        { f: "USPSTF lung cancer screening criteria?", b: "Annual low-dose CT for age 50–80, ≥ 20 pack-years, and currently smoking or quit within 15 years.", x: "Low-dose CT detects early lung cancer in high-risk smokers and reduces mortality; CXR and sputum cytology do not.", t: "Trap: A normal chest radiograph is not an adequate screening test for eligible patients.", m: "50-80, 20 pack-years, current or quit <15" },
        { f: "When does USPSTF lung cancer screening stop?", b: "At age >80, after 15 smoke-free years, or when health limits life expectancy or willingness/ability to undergo curative surgery.", x: "This is the USPSTF framework; the 2023 American Cancer Society guideline does not use a years-since-quitting cutoff.", t: "Trap: Name the guideline; a 15-year quit cutoff is not universal across screening recommendations.", m: "USPSTF: 80, quit 15, or no curative option" },
        { f: "Incidental solid lung nodule < 6 mm in a low-risk patient — follow-up?", b: "No routine follow-up (Fleischner); high-risk patients may have optional CT at 12 months.", x: "Tiny nodules in low-risk patients are usually benign granulomas or scars. Follow-up depends on size, risk, and nodule features.", t: "Trap: Fleischner incidental nodule guidance is not the same as formal lung cancer screening protocols.", m: "Tiny low-risk incidental nodules can rest" }
      ]
    },
    {
      id: "rheum-septic-arthritis",
      system: "RHEUM",
      task: "TEST",
      vignette: "A 68-year-old man with a history of gout and type 2 diabetes develops acute pain and swelling of the right knee over 24 hours. Temperature 38.6 °C. The knee is warm, erythematous, and has a large effusion with pain on any passive motion. WBC 15,800/µL.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Start colchicine for presumed gout and reassess in 48 hours, given his prior gout and monoarticular presentation.",
        "Arthrocentesis with synovial cell count, Gram stain, culture, and crystal analysis.",
        "Serum uric acid level to confirm or exclude gout before aspirating the acutely inflamed knee.",
        "MRI of the knee to evaluate for osteomyelitis or effusion before diagnostic synovial fluid analysis."
      ],
      correct: 1,
      explanation: "An <strong>acute hot monoarthritis requires urgent exclusion of infection</strong> — joint destruction can occur quickly. In this stable patient, perform <strong>arthrocentesis</strong> (cell count, Gram stain, culture, crystals) before antibiotics; in septic shock, obtain samples promptly but do not delay antibiotics. A gout history does not exclude infection: <strong>crystals and infection can coexist</strong>. Serum urate and imaging cannot reliably distinguish them.",
      flashcards: [
        { f: "Which synovial WBC count suggests septic arthritis?", b: "> 50,000/µL with > 90% neutrophils (often > 100,000) — but lower counts do not exclude it; culture decides.", x: "Bacterial joint infection destroys cartilage quickly, so synovial fluid culture is decisive even when WBC is below classic thresholds.", t: "Trap: A WBC below 50,000 does not rule out septic arthritis, especially early or immunosuppressed cases.", m: "Hot monoarthritis is septic until tapped" },
        { f: "Does finding crystals exclude septic arthritis?", b: "No — gout/CPPD and infection can coexist; always send Gram stain and culture.", x: "Crystals cause intense inflammation but do not sterilize the joint. Coexisting infection is uncommon but dangerous.", t: "Trap: Never stop after seeing urate or CPP crystals; still send Gram stain and culture.", m: "Crystals do not sterilize a joint" },
        { f: "Most common organisms in septic arthritis?", b: "Staphylococcus aureus overall; Neisseria gonorrhoeae in young sexually active adults (tenosynovitis, pustules, migratory arthralgia).", x: "S aureus dominates because it adheres to damaged synovium; gonococcal disease often presents with migratory symptoms and dermatitis.", t: "Trap: Young age and sexual activity shift concern to gonococcus, not just gout.", m: "Staph overall; gonococcus in young sexually active adults" }
      ]
    },
    {
      id: "rheum-pmr",
      system: "RHEUM",
      task: "RX",
      vignette: "A 72-year-old woman has 6 weeks of bilateral shoulder and hip girdle aching with morning stiffness lasting 2 hours. She has difficulty getting out of bed and raising her arms to comb her hair. Strength is normal when tested. She denies headache, jaw claudication, or visual symptoms. ESR is 68 mm/h; CK and TSH are normal.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Prednisone 60 mg daily.",
        "Methotrexate monotherapy.",
        "Prednisone 15 mg daily.",
        "Naproxen alone."
      ],
      correct: 2,
      explanation: "Age &gt; 50, bilateral <strong>shoulder/hip girdle pain and stiffness</strong>, high ESR, normal CK and true strength = <strong>polymyalgia rheumatica</strong>. Treat with <strong>low-dose prednisone (12.5–25 mg/day)</strong>, with a dramatic response in days (a poor response should prompt a search for another diagnosis), then taper over at least a year. High-dose steroids are for <strong>giant cell arteritis</strong>, which develops in up to ~20% — screen for headache, jaw claudication, and visual symptoms at every visit.",
      flashcards: [
        { f: "What is the classic presentation of polymyalgia rheumatica?", b: "Age > 50, bilateral shoulder and hip girdle aching with prolonged morning stiffness, raised ESR/CRP, normal CK and true strength.", x: "PMR is periarticular inflammation causing pain-limited motion rather than muscle fiber injury. ESR/CRP are typically high.", t: "Trap: Objective weakness or high CK points away from PMR toward inflammatory myopathy.", m: "PMR: old, stiff shoulders and hips, normal CK" },
        { f: "How is polymyalgia rheumatica treated?", b: "Prednisone 12.5–25 mg/day with a rapid, dramatic response, then a slow taper (≥ 12 months); methotrexate is a steroid-sparing agent for relapse.", x: "Rapid steroid response supports the diagnosis, but relapse is common during taper. Monitor for giant cell arteritis symptoms throughout.", t: "Trap: High-dose steroids are for suspected GCA with vision risk, not uncomplicated PMR.", m: "PMR prednisone is low-dose and dramatic" },
        { f: "PMR vs inflammatory myopathy — key distinction?", b: "PMR: pain and stiffness, normal strength and CK. Myositis: true proximal weakness with elevated CK.", x: "Myositis affects muscle cells, causing true weakness and enzyme leak. PMR patients may say weak but test strength is normal when pain controlled.", t: "Trap: Difficulty rising from a chair can be pain inhibition in PMR; check CK and true power.", m: "Pain-limited PMR is not true myositis weakness",
          tb: { h: ["Feature", "PMR", "Myositis"], r: [["Main symptom", "Pain and stiffness", "True weakness"], ["Strength exam", "Normal", "Proximal weak"], ["CK", "Normal", "Elevated"], ["Steroid dose", "Low dose", "Higher dose"]] } }
      ]
    },
    {
      id: "neph-toxic-alcohol",
      system: "NEPH",
      task: "RX",
      vignette: "A 44-year-old man is found confused. Na 140, K 4.6, Cl 100, HCO₃⁻ 8 mEq/L; BUN 14 mg/dL; glucose 90 mg/dL; creatinine 1.9 mg/dL. Arterial pH 7.12, PaCO₂ 20 mm Hg. Measured serum osmolality is 330 mOsm/kg. Lactate and ketones are normal. Urinalysis shows envelope-shaped crystals.",
      leadIn: "In addition to hemodialysis evaluation, what is the most appropriate treatment?",
      options: [
        "IV sodium bicarbonate alone.",
        "IV fomepizole.",
        "IV N-acetylcysteine as an empiric antidote.",
        "IV insulin infusion."
      ],
      correct: 1,
      explanation: "Anion gap = 140 − (100 + 8) = <strong>32</strong>. Calculated osmolality = 2(140) + 90/18 + 14/2.8 = 290, so the <strong>osmolar gap is 40</strong>. Expected PaCO₂ (Winter) = 1.5(8) + 8 ± 2 = 20 → appropriately compensated. A high anion gap acidosis with a high osmolar gap, AKI, and <strong>calcium oxalate crystals</strong> = <strong>ethylene glycol</strong>. Block alcohol dehydrogenase with <strong>fomepizole</strong> and dialyze for severe acidosis, AKI, or end-organ damage.",
      flashcards: [
        { f: "How is the serum anion gap calculated?", b: "Na⁺ − (Cl⁻ + HCO₃⁻); normal ≈ 10–12 — lower the expected value by ~2.5 for every 1 g/dL fall in albumin.", x: "Albumin is a major unmeasured anion; hypoalbuminemia can hide a dangerous gap. Correcting prevents false reassurance.", t: "Trap: A normal uncorrected gap in low albumin does not exclude high-AG acidosis.", m: "Gap = Na minus (Cl + HCO3); drop 2.5 per 1 g/dL albumin fall" },
        { f: "What does an elevated osmolar gap (> 10) with high-AG acidosis suggest?", b: "Toxic alcohol: ethylene glycol (AKI, calcium oxalate crystals) or methanol (visual loss) → fomepizole ± hemodialysis.", x: "Parent alcohols raise the osmolar gap early; toxic metabolites later drive acidosis and organ injury. Fomepizole blocks new metabolite formation.", t: "Trap: Isopropanol causes osmolar gap with ketosis but no high anion gap acidosis.", m: "Osm gap plus AG acidosis = toxic alcohol until proven otherwise",
          tb: { h: ["Alcohol", "Acid-base", "Classic clue"], r: [["Ethylene glycol", "High AG + osm gap", "Oxalate crystals, AKI"], ["Methanol", "High AG + osm gap", "Visual injury"], ["Isopropanol", "Osm gap, no AG", "Ketosis"], ["Treatment", "Fomepizole", "Dialyze if severe"]] } },
        { f: "What is Winter's formula?", b: "Expected PaCO₂ = 1.5 × HCO₃⁻ + 8 ± 2 — higher means a concomitant respiratory acidosis, lower a respiratory alkalosis.", x: "Respiratory compensation has predictable limits; mismatches reveal a second primary acid-base disorder. This guides urgency and ventilation.", t: "Trap: Do not call low PaCO₂ panic alone; it may be appropriate compensation for metabolic acidosis.", m: "Winter checks whether lungs are matching the acid" }
      ]
    },
    {
      id: "neph-stone-prevention",
      system: "NEPH",
      task: "RX",
      vignette: "A 45-year-old man has had three calcium oxalate kidney stones in 4 years. A 24-hour urine collection shows urine volume 1.4 L, high urinary calcium, high urinary sodium, and normal citrate, oxalate, and uric acid. Serum calcium and PTH are normal. He has heard he should cut out dairy.",
      leadIn: "What is the most appropriate recommendation?",
      options: [
        "Restrict dietary calcium to < 400 mg/day and increase oxalate restriction as the main prevention strategy for recurrent stones.",
        "Begin vitamin C 1 g daily to acidify the urine and dissolve calcium oxalate crystals.",
        "Increase fluids to urine output > 2.5 L/day, keep normal dietary calcium, reduce sodium, and start a thiazide diuretic.",
        "Start allopurinol 300 mg daily to lower urinary uric acid and reduce heterogeneous calcium oxalate nucleation."
      ],
      correct: 2,
      explanation: "For recurrent <strong>calcium oxalate stones with idiopathic hypercalciuria</strong>: high fluid intake (<strong>urine &gt; 2.5 L/day</strong>), <strong>normal dietary calcium</strong> (1,000–1,200 mg/day; restriction <em>increases</em> oxalate absorption and stone risk), <strong>low sodium</strong> and moderate animal protein, plus a <strong>thiazide</strong> to lower urinary calcium. Vitamin C is metabolized to oxalate. Allopurinol is for hyperuricosuria.",
      flashcards: [
        { f: "Why should calcium NOT be restricted in calcium oxalate stone formers?", b: "Dietary calcium binds oxalate in the gut — restriction increases oxalate absorption, urinary oxalate, and stone risk.", x: "Calcium in meals binds intestinal oxalate, lowering absorption. Pair calcium with low sodium and high fluid intake for recurrence prevention.", t: "Trap: Calcium supplements between meals may raise risk; normal dietary calcium with meals is preferred.", m: "Calcium with meals traps oxalate" },
        { f: "Drug therapy matched to the 24-hour urine finding?", b: "Hypercalciuria → thiazide; hypocitraturia → potassium citrate; hyperuricosuria → allopurinol (or potassium citrate for uric acid stones).", x: "A 24-hour urine personalizes prevention by identifying calcium, citrate, uric acid, oxalate, sodium, and volume abnormalities.", t: "Trap: Allopurinol is not for every calcium stone; use it when hyperuricosuria is present.", m: "24-hour urine picks the prevention pill",
          tb: { h: ["Urine finding", "Drug", "Effect"], r: [["Hypercalciuria", "Thiazide", "Lowers urine Ca"], ["Hypocitraturia", "K citrate", "Raises citrate"], ["Hyperuricosuria", "Allopurinol", "Lowers uric acid"], ["Low volume", "Fluids", "Urine >2.5 L/day"]] } },
        { f: "Acute ureteral stone management?", b: "Stable distal stone ≤10 mm → analgesia and observation; tamsulosin helps most for stones >5 mm. Infected obstruction → antibiotics plus urgent drainage.", x: "Very small stones often pass without expulsive therapy; infection behind an obstruction can cause sepsis and needs a stent or nephrostomy.", t: "Trap: Medical expulsive therapy is inappropriate with sepsis, threatened kidney function, or uncontrolled pain.", m: "Infected obstruction is drainage, not just passage" }
      ]
    },
    {
      id: "heme-ttp",
      system: "HEME",
      task: "NEXT",
      vignette: "A 38-year-old woman presents with 3 days of fatigue, headache, and intermittent word-finding difficulty. Temperature 37.9 °C. Hemoglobin 7.8 g/dL, platelets 14,000/µL, LDH 1,450 U/L, haptoglobin undetectable, indirect bilirubin 3.2 mg/dL. Peripheral smear shows many schistocytes. PT/INR and fibrinogen are normal; creatinine is 1.3 mg/dL. Direct antiglobulin test is negative.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Urgent therapeutic plasma exchange plus glucocorticoids.",
        "Platelet transfusion.",
        "Await ADAMTS13 activity before starting treatment.",
        "IV unfractionated heparin."
      ],
      correct: 0,
      explanation: "<strong>Microangiopathic hemolytic anemia</strong> (schistocytes, high LDH, low haptoglobin, DAT-negative) + <strong>severe thrombocytopenia</strong> + neurologic symptoms with normal coagulation = <strong>TTP</strong> (high PLASMIC score). Untreated mortality is ~90%: start <strong>plasma exchange and glucocorticoids immediately</strong> after drawing ADAMTS13 (&lt; 10% confirms); add <strong>caplacizumab</strong> ± rituximab. <strong>Platelet transfusion</strong> may worsen thrombosis — avoid unless bleeding is life-threatening.",
      flashcards: [
        { f: "What is the minimum needed to suspect TTP?", b: "MAHA (schistocytes, high LDH, low haptoglobin) + thrombocytopenia — the full pentad (fever, renal, neuro) is usually absent.", x: "TTP is platelet-rich microthrombosis from severe ADAMTS13 deficiency; waiting for the full pentad delays life-saving therapy.", t: "Trap: Renal failure is often milder than HUS and need not be present.", m: "TTP needs only MAHA plus low platelets to act" },
        { f: "What is the treatment of immune TTP?", b: "Immediate plasma exchange + glucocorticoids, plus caplacizumab ± rituximab — do not wait for ADAMTS13 results.", x: "Plasma exchange removes inhibitor and replaces ADAMTS13; steroids suppress antibody production. Caplacizumab blocks platelet-vWF binding.", t: "Trap: Do not wait for ADAMTS13 activity before starting plasma exchange if suspicion is high.", m: "TTP: exchange plasma before labs return" },
        { f: "Which lab confirms TTP, and how do coagulation tests help?", b: "ADAMTS13 activity < 10%. PT/aPTT and fibrinogen are normal in TTP but abnormal in DIC.", x: "Normal coagulation separates TTP from DIC, where clotting factors are consumed and PT/aPTT rise.", t: "Trap: Platelet transfusion can worsen thrombosis in TTP unless bleeding is life-threatening.", m: "ADAMTS13 <10 with normal PT/aPTT points to TTP",
          tb: { h: ["Feature", "TTP", "DIC"], r: [["Platelets", "Low", "Low"], ["Smear", "Schistocytes", "Schistocytes"], ["PT/aPTT", "Normal", "Prolonged"], ["Fibrinogen", "Normal", "Low"]] } }
      ]
    },
    {
      id: "heme-itp",
      system: "HEME",
      task: "RX",
      vignette: "A 29-year-old woman notices leg petechiae and gum bleeding when brushing. She takes no medications. She is otherwise well and has no splenomegaly or lymphadenopathy. Platelets 12,000/µL; hemoglobin and WBC with differential are normal. Peripheral smear shows large platelets and no schistocytes. HIV and hepatitis C tests are negative; pregnancy test is negative.",
      leadIn: "What is the most appropriate initial treatment?",
      options: [
        "Prednisone (or high-dose dexamethasone).",
        "Platelet transfusion to raise the count above 50,000/µL.",
        "Splenectomy as first-line definitive therapy.",
        "Plasma exchange for presumed thrombotic microangiopathy."
      ],
      correct: 0,
      explanation: "Isolated thrombocytopenia with large platelets and an otherwise normal CBC/smear = <strong>immune thrombocytopenia (ITP)</strong>, a diagnosis of exclusion (check HIV, HCV ± H. pylori). Treat adults with <strong>platelets &lt; 30,000/µL or bleeding</strong> with <strong>glucocorticoids</strong>; add <strong>IVIG</strong> when a rapid rise is needed (severe bleeding, procedures). Second-line options: TPO-receptor agonists, rituximab, and splenectomy (deferred ≥ 12 months).",
      flashcards: [
        { f: "When should adult ITP be treated?", b: "Platelets < 30,000/µL or clinically significant bleeding — first-line glucocorticoids (prednisone ≤ 6 weeks or dexamethasone pulses).", x: "ITP bleeding risk rises as platelets fall, but asymptomatic mild thrombocytopenia can be observed. Smear rules out pseudothrombocytopenia and TMA.", t: "Trap: Treat the patient, not just a platelet count above 30,000 without bleeding.", m: "ITP treats bleeding or platelets under 30" },
        { f: "When is IVIG used in ITP?", b: "When a rapid platelet rise is needed: serious bleeding or before an urgent procedure (with steroids ± platelet transfusion if life-threatening).", x: "IVIG blocks Fc-mediated platelet clearance and works within days, making it useful for bleeding or procedures. Its effect is temporary.", t: "Trap: Platelet transfusion alone is rapidly destroyed; reserve for life-threatening bleeding with IVIG/steroids.", m: "IVIG is the fast temporary platelet boost" },
        { f: "What secondary causes are checked in suspected ITP?", b: "HIV, hepatitis C, drugs, pregnancy, and lymphoproliferative or autoimmune disease; consider H. pylori based on prevalence or GI symptoms.", x: "Secondary ITP can improve when the trigger is treated, and missing HIV or HCV changes management and counseling.", t: "Trap: Bone marrow biopsy is not routine in typical isolated ITP with a normal smear.", m: "Isolated platelets low: check secondary triggers" }
      ]
    },
    {
      id: "onc-cord-compression",
      system: "ONC",
      task: "NEXT",
      vignette: "A 71-year-old man with metastatic castration-resistant prostate cancer reports 3 weeks of worsening mid-back pain that is worse lying down. Since yesterday he has had leg weakness and difficulty climbing stairs. He has 4/5 hip flexor strength bilaterally, brisk knee reflexes, and decreased sensation below the umbilicus. Rectal tone is normal.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Thoracic spine radiographs and analgesia.",
        "Bone scintigraphy and oncology consultation.",
        "Lumbar MRI and urologic evaluation for retention.",
        "IV dexamethasone and urgent MRI of the entire spine."
      ],
      correct: 3,
      explanation: "New back pain in a patient with cancer, plus <strong>motor weakness and a sensory level</strong> = <strong>metastatic spinal cord compression</strong>, an oncologic emergency: neurologic status at treatment predicts outcome. Give <strong>IV dexamethasone immediately</strong> and obtain an <strong>MRI of the entire spine</strong> (multilevel disease is common). Definitive therapy: <strong>surgical decompression</strong> (good candidates, instability) and/or <strong>radiation therapy</strong>.",
      flashcards: [
        { f: "What is the initial management of malignant spinal cord compression?", b: "IV dexamethasone immediately + urgent MRI of the entire spine, then radiation and/or surgical decompression.", x: "Steroids reduce vasogenic edema around the cord while MRI defines level and extent. Entire-spine imaging matters because metastases can be multifocal.", t: "Trap: Do not wait for MRI before giving dexamethasone when neurologic deficits suggest compression.", m: "Cancer back pain plus deficit: steroids then MRI whole spine" },
        { f: "What predicts outcome in spinal cord compression?", b: "Neurologic function at presentation — patients ambulatory at treatment usually stay ambulatory.", x: "Once paraplegia is established, recovery is unlikely; preserving ambulation is the treatment goal. Time to therapy is critical.", t: "Trap: Pain control alone misses the emergency; neurologic status predicts outcome.", m: "Ambulatory in, ambulatory out" },
        { f: "What is a red-flag back pain feature in cancer patients?", b: "New/progressive pain, pain worse lying down or at night, thoracic location, radicular band-like pain, or any neurologic deficit.", x: "Night/rest pain and neurologic signs suggest tumor, infection, or fracture rather than mechanical strain. Cancer history lowers the imaging threshold.", t: "Trap: Lumbar x-ray can miss epidural disease; MRI is the test for cord compression.", m: "Night/rest pain in cancer earns MRI" }
      ]
    },
    {
      id: "neuro-myasthenia",
      system: "NEURO",
      task: "TEST",
      vignette: "A 34-year-old woman reports 3 months of intermittent double vision and drooping eyelids that worsen toward evening, plus difficulty chewing at the end of meals. Examination shows bilateral ptosis that worsens with sustained upgaze and improves after an ice pack. Pupils, reflexes, and sensation are normal.",
      leadIn: "What is the most appropriate initial diagnostic test?",
      options: [
        "Acetylcholine receptor antibodies.",
        "Lumbar puncture.",
        "Voltage-gated calcium channel antibodies.",
        "Brain MRI with contrast."
      ],
      correct: 0,
      explanation: "<strong>Fatigable</strong> ptosis, diplopia, and bulbar weakness with <strong>spared pupils and reflexes</strong> = <strong>myasthenia gravis</strong>. Test first for <strong>acetylcholine receptor antibodies</strong> (positive in ~85% of generalized MG); if negative, check MuSK antibodies and do repetitive nerve stimulation or single-fiber EMG. Once confirmed, get a <strong>chest CT for thymoma</strong>. VGCC antibodies are for Lambert-Eaton (proximal weakness that improves with use, hyporeflexia, autonomic symptoms).",
      flashcards: [
        { f: "How is myasthenia gravis diagnosed?", b: "AChR antibodies first (then MuSK); electrodiagnostics: decremental repetitive stimulation, single-fiber EMG (most sensitive); then chest CT for thymoma.", x: "AChR antibodies are specific and common in generalized MG; electrophysiology confirms impaired neuromuscular transmission when antibodies are negative.", t: "Trap: Lambert-Eaton has hyporeflexia and improves with use; test VGCC antibodies instead.", m: "MG: AChR first, thymus next",
          tb: { h: ["Feature", "MG", "Lambert-Eaton"], r: [["Antibody", "AChR or MuSK", "VGCC"], ["Reflexes", "Normal", "Low"], ["Use effect", "Worsens", "Improves"], ["Cancer link", "Thymoma", "Small cell lung"]] } },
        { f: "Which drugs can worsen myasthenia gravis?", b: "Aminoglycosides, fluoroquinolones, macrolides, magnesium, beta-blockers, and neuromuscular blockers (also checkpoint inhibitors).", x: "These drugs impair neuromuscular transmission or increase weakness, precipitating respiratory failure in susceptible patients.", t: "Trap: Fluoroquinolones and macrolides are not benign in MG; choose alternatives when possible.", m: "MG hates certain antibiotics and magnesium" },
        { f: "How is myasthenic crisis managed?", b: "ICU care, serial FVC/NIF and bulbar assessment, early airway support when needed, and IVIG or plasma exchange.", x: "FVC below about 20 mL/kg is a warning, not a stand-alone intubation rule. Weak cough, secretions, bulbar dysfunction, fatigue, and trends guide airway decisions. Steroids may initially worsen weakness.", t: "Trap: Normal pulse oximetry does not exclude respiratory muscle failure; pyridostigmine is commonly held while intubated to limit secretions.", m: "Watch ventilation and bulbar function, not saturation alone" }
      ]
    },
    {
      id: "psych-mdd",
      system: "PSYCH",
      task: "RX",
      vignette: "A 34-year-old woman has 2 months of depressed mood, loss of interest in activities, early-morning awakening, poor concentration, fatigue, and feelings of worthlessness that are affecting her work. PHQ-9 score is 17. She has passive thoughts that life is not worth living but no plan or intent. She has never had periods of elevated mood, decreased need for sleep, or impulsivity. TSH and CBC are normal.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Alprazolam as needed for anxiety and insomnia.",
        "Sertraline, with follow-up in 2–4 weeks and a safety plan.",
        "Quetiapine monotherapy at bedtime for mood and sleep.",
        "Lithium titrated to a serum level of 0.6–1.0 mEq/L."
      ],
      correct: 1,
      explanation: "She meets criteria for <strong>major depressive disorder</strong> (≥ 5 symptoms for ≥ 2 weeks including depressed mood or anhedonia) and is moderately severe. First-line therapy is an <strong>SSRI</strong> (sertraline, escitalopram) and/or psychotherapy. Screen for <strong>bipolar disorder</strong> first (antidepressant monotherapy can trigger mania), assess suicide risk and make a safety plan, and follow up closely. Benzodiazepines do not treat depression.",
      flashcards: [
        { f: "What are the DSM-5 criteria for major depressive disorder?", b: "≥ 5 of 9 symptoms (SIG E CAPS + depressed mood) for ≥ 2 weeks, including depressed mood or anhedonia, with functional impairment.", x: "SIG E CAPS helps recall neurovegetative symptoms, but diagnosis also requires distress or impairment and exclusion of substances or mania.", t: "Trap: Bereavement does not exclude MDD if full criteria and impairment are present.", m: "Five for two weeks, mood or interest required" },
        { f: "How long is an adequate antidepressant trial, and how long is treatment continued?", b: "4–8 weeks at a therapeutic dose; continue ≥ 6–12 months after remission (longer if recurrent).", x: "Response takes weeks because downstream receptor and neuroplastic changes lag serotonin reuptake blockade. Continue after remission to prevent relapse.", t: "Trap: Do not switch after only 1 week for lack of effect unless adverse effects are intolerable.", m: "Antidepressants need weeks, maintenance needs months" },
        { f: "What must be screened for before starting an antidepressant?", b: "Prior mania/hypomania (bipolar disorder) and suicide risk — warn young adults (< 25) about early suicidality.", x: "Antidepressant monotherapy can precipitate mania in bipolar disorder. Safety planning addresses access to lethal means and follow-up.", t: "Trap: Benzodiazepines may reduce anxiety briefly but do not treat core depression or suicide risk.", m: "Before SSRI: bipolar screen and safety plan" }
      ]
    },
    {
      id: "psych-alcohol-withdrawal",
      system: "PSYCH",
      task: "RX",
      vignette: "A 52-year-old man admitted 2 days ago for a tibial fracture becomes agitated and tremulous. He sees insects crawling on the wall and is disoriented. Temperature 38.1 °C, HR 126/min, BP 168/98 mm Hg; he is diaphoretic. His wife reports he drinks a fifth of vodka daily. Glucose is 112 mg/dL.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "IV haloperidol titrated to agitation, plus IV thiamine.",
        "IV metoprolol with oral clonidine, plus IV thiamine.",
        "Titrated IV benzodiazepines plus IV thiamine.",
        "IV levetiracetam with seizure precautions and IV thiamine."
      ],
      correct: 2,
      explanation: "Disorientation, hallucinations, fever, and autonomic hyperactivity <strong>48–96 h after the last drink</strong> = <strong>delirium tremens</strong> (mortality up to 5% untreated). <strong>Benzodiazepines</strong> are the cornerstone (symptom-triggered via CIWA-Ar in milder withdrawal; aggressive IV dosing in DTs; phenobarbital if refractory). Give <strong>thiamine</strong> to prevent Wernicke encephalopathy. Antipsychotics lower the seizure threshold and beta-blockers mask signs — adjuncts only.",
      flashcards: [
        { f: "What is the timeline of alcohol withdrawal?", b: "Tremor/anxiety 6–24 h; hallucinosis 12–48 h; seizures 6–48 h; delirium tremens 48–96 h after the last drink.", x: "Withdrawal severity reflects CNS hyperexcitability after chronic GABA enhancement and NMDA upregulation. DTs occur late and are life-threatening.", t: "Trap: Hallucinosis can occur with clear sensorium; delirium tremens includes confusion and autonomic instability.", m: "Withdrawal clock: tremor, hallucinosis, seizures, DTs",
          tb: { h: ["Syndrome", "Timing", "Key feature"], r: [["Tremor", "6–24 h", "Anxiety, tremor"], ["Hallucinosis", "12–48 h", "Clear sensorium"], ["Seizures", "6–48 h", "Generalized"], ["DTs", "48–96 h", "Delirium, fever"]] } },
        { f: "How are benzodiazepines dosed for alcohol withdrawal?", b: "Use symptom-triggered protocols in communicative patients; severe withdrawal delirium needs monitored IV treatment with objective sedation assessment.", x: "Lorazepam avoids active metabolites and is useful with impaired liver function. CIWA-Ar depends on patient responses and is unreliable in delirious or intubated patients.", t: "Trap: Do not use CIWA-Ar to guide treatment in a patient unable to answer reliably; antipsychotics are adjuncts, not seizure-preventing monotherapy.", m: "CIWA needs communication; delirium needs objective monitoring" },
        { f: "Which medications treat alcohol use disorder after withdrawal?", b: "Naltrexone (avoid with opioids or acute hepatitis), acamprosate (renally cleared — avoid in severe CKD), disulfiram (adherence-dependent).", x: "Relapse-prevention medication should start after acute withdrawal is controlled and contraindications are checked. Pair with counseling.", t: "Trap: Naltrexone cannot be used in patients taking opioids; it can precipitate withdrawal.", m: "AUD relapse meds start after detox",
          tb: { h: ["Medication", "Avoid if", "Pearl"], r: [["Naltrexone", "Opioids, acute hepatitis", "Reduces craving"], ["Acamprosate", "Severe CKD", "Renally cleared"], ["Disulfiram", "Poor adherence", "Aversive reaction"], ["Gabapentin", "Misuse risk", "Adjunct option"]] } }
      ]
    },
    {
      id: "derm-melanoma",
      system: "DERM",
      task: "NEXT",
      vignette: "A 49-year-old fair-skinned man has a pigmented lesion on his upper back that his wife says has grown over 6 months. It measures 8 mm, has irregular notched borders, and shows black, brown, and blue-gray areas. It looks different from all his other nevi.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Reassess with photography in 3 months.",
        "Superficial shave biopsy.",
        "Cryotherapy.",
        "Excisional biopsy with 1–3 mm margins."
      ],
      correct: 3,
      explanation: "Asymmetry, irregular Border, multiple Colors, Diameter &gt; 6 mm, and Evolution (<strong>ABCDE</strong>) plus the <strong>ugly duckling sign</strong> → suspected <strong>melanoma</strong>. Perform a <strong>full-thickness excisional biopsy with narrow (1–3 mm) margins</strong>, because accurate <strong>Breslow thickness</strong>, the key prognostic factor, needs the full depth. Superficial shave or destructive therapy can transect the tumor and prevent staging.",
      flashcards: [
        { f: "What are the ABCDEs of melanoma?", b: "Asymmetry, Border irregularity, Color variation, Diameter > 6 mm, Evolution (change) — plus the 'ugly duckling' sign.", x: "Evolution is often the most sensitive warning sign; ugly duckling compares a lesion to the patient’s other nevi.", t: "Trap: Symmetry and uniform color favor benign nevus, but changing lesions still need evaluation.", m: "ABCDE plus ugly duckling" },
        { f: "What biopsy is preferred for a suspected melanoma?", b: "Full-thickness excisional biopsy with 1–3 mm margins (deep saucerization acceptable) — never cryotherapy or a superficial shave.", x: "Full-depth sampling preserves Breslow depth, which determines staging and treatment. Narrow margins avoid compromising later definitive excision.", t: "Trap: Superficial shave can transect melanoma and underestimate depth.", m: "Suspected melanoma needs depth-preserving biopsy" },
        { f: "What is the most important prognostic factor in localized melanoma?", b: "Breslow thickness (tumor depth) — it determines excision margins and the need for sentinel lymph node biopsy.", x: "Depth correlates with nodal metastasis and survival; ulceration and mitotic rate add risk information.", t: "Trap: Diameter is a screening clue, not the main prognostic factor after diagnosis.", m: "Depth drives melanoma prognosis" }
      ]
    },
    {
      id: "derm-sjs",
      system: "DERM",
      task: "NEXT",
      vignette: "A 31-year-old woman started lamotrigine for bipolar disorder 3 weeks ago. Two days ago she developed fever and sore throat, followed by painful dusky red macules with central blistering on her trunk and face. She has oral erosions, crusted lips, and conjunctival injection. Epidermal detachment involves about 8% of body surface area, and the Nikolsky sign is positive.",
      leadIn: "What is the most important next step?",
      options: [
        "Treat with prednisone and reassess lamotrigine use after dermatology review.",
        "Stop lamotrigine; admit for specialized care and urgent eye assessment.",
        "Stop lamotrigine; prescribe cetirizine and outpatient topical corticosteroids.",
        "Stop lamotrigine; begin IV antibiotics for staphylococcal scalded skin syndrome."
      ],
      correct: 1,
      explanation: "Painful skin with <strong>mucosal involvement</strong> and epidermal detachment &lt; 10% BSA, 1–4 weeks after a high-risk drug = <strong>Stevens-Johnson syndrome</strong> (10–30% overlap; &gt; 30% TEN). <strong>Immediate withdrawal of the culprit</strong> is the most important intervention. Provide burn-unit supportive care, early <strong>ophthalmology</strong> input to prevent scarring and blindness, and never rechallenge. Systemic steroids are controversial and never replace drug withdrawal.",
      flashcards: [
        { f: "How are SJS, SJS/TEN overlap, and TEN distinguished?", b: "By detached body surface area: < 10% SJS, 10–30% overlap, > 30% TEN — all with mucosal involvement.", x: "SJS/TEN is a keratinocyte apoptosis emergency with mucosal injury and painful skin. BSA detachment determines category and prognosis.", t: "Trap: Erythema multiforme major has target lesions but usually less extensive detachment and different triggers.", m: "SJS/TEN is sorted by skin detachment percent",
          tb: { h: ["Category", "Detached BSA", "Shared feature"], r: [["SJS", "<10%", "Mucosal injury"], ["Overlap", "10–30%", "Painful skin"], ["TEN", ">30%", "High mortality"], ["All", "Any category", "Stop culprit drug"]] } },
        { f: "Which drugs most often cause SJS/TEN?", b: "Allopurinol, sulfonamides, aromatic anticonvulsants (carbamazepine, phenytoin, lamotrigine), oxicam NSAIDs, nevirapine — usually 4–28 days after starting.", x: "High-risk drugs usually trigger disease within the first month. Early recognition and permanent avoidance reduce mortality.", t: "Trap: Simple morbilliform drug eruptions are usually pruritic, not exquisitely painful with mucosal erosions.", m: "Painful mucosa after high-risk drug = SJS/TEN alarm" },
        { f: "Which HLA alleles predict SJS/TEN?", b: "HLA-B*15:02 with carbamazepine (Asian ancestry) and HLA-B*58:01 with allopurinol — test before starting in at-risk groups.", x: "HLA testing prevents severe reactions in genetically high-risk groups. The allele-drug associations are specific, not universal for all drugs.", t: "Trap: A negative HLA-B*15:02 does not eliminate all anticonvulsant rash risk.", m: "HLA risk is drug-and-ancestry specific" }
      ]
    },
    {
      id: "obgyn-htn-pregnancy",
      system: "OBGYN",
      task: "RX",
      vignette: "A 32-year-old woman with chronic hypertension, well controlled on lisinopril 20 mg daily, has a positive home pregnancy test; ultrasound confirms a 7-week intrauterine pregnancy. Blood pressure is 134/84 mm Hg. Creatinine and urine protein are normal.",
      leadIn: "What is the most appropriate management of her hypertension?",
      options: [
        "Continue lisinopril; it is safe until the second trimester.",
        "Switch lisinopril to losartan.",
        "Stop lisinopril and start labetalol or extended-release nifedipine.",
        "Stop all antihypertensives for the rest of pregnancy."
      ],
      correct: 2,
      explanation: "Stop <strong>lisinopril</strong> when pregnancy is recognized because ACE inhibitors and ARBs can cause fetal renal injury, oligohydramnios, and other fetotoxic effects, especially later in pregnancy. Continue chronic hypertension treatment using <strong>labetalol or extended-release nifedipine</strong>; methyldopa is an alternative. After CHAP, ACOG recommends <strong>140/90 mm Hg as the threshold for initiation or titration</strong>, rather than waiting for severe hypertension; this advisory does not establish a universal lower BP target. Chronic hypertension also warrants <strong>aspirin 81 mg daily beginning at 12–28 weeks, ideally before 16 weeks</strong>, through delivery for preeclampsia prevention.",
      flashcards: [
        { f: "Which antihypertensives are preferred in pregnancy?", b: "Labetalol or extended-release nifedipine; methyldopa is an alternative. Avoid ACE inhibitors, ARBs, and direct renin inhibitors.", x: "ACOG uses 140/90 as the initiation/titration threshold for chronic hypertension after CHAP; do not wait for severe hypertension.", t: "Trap: CHAP does not justify a universal aggressively low BP goal; ACEi/ARB exposure should stop when pregnancy is recognized.", m: "Pregnancy BP: labetalol or nifedipine, not ACE/ARB",
          tb: { h: ["Drug", "Pregnancy role", "Key caution"], r: [["Labetalol", "Preferred", "Avoid severe asthma"], ["Nifedipine ER", "Preferred", "Use long-acting"], ["Methyldopa", "Acceptable", "Sedation"], ["ACEi or ARB", "Contraindicated", "Fetal renal injury"]] } },
        { f: "Who gets aspirin for preeclampsia prevention?", b: "High-risk patients (prior preeclampsia, chronic HTN, diabetes, CKD, autoimmune disease, multifetal pregnancy): aspirin 81 mg daily from 12 weeks (USPSTF).", x: "Low-dose aspirin improves placental perfusion and lowers preeclampsia risk when started after placentation begins.", t: "Trap: Aspirin is for high-risk or multiple moderate-risk patients, not every pregnancy automatically.", m: "High preeclampsia risk gets baby aspirin at 12 weeks" },
        { f: "How is preeclampsia defined?", b: "New BP ≥ 140/90 after 20 weeks plus proteinuria or severe features (thrombocytopenia, AKI, transaminitis, pulmonary edema, cerebral/visual symptoms).", x: "Severe features reflect endothelial injury and organ dysfunction; proteinuria is not required if severe features are present.", t: "Trap: Hypertension before 20 weeks suggests chronic HTN, not new preeclampsia unless special conditions exist.", m: "After 20 weeks, organs can define preeclampsia without protein" }
      ]
    },
    {
      id: "crit-ards",
      system: "CRIT",
      task: "RX",
      vignette: "A 58-year-old man with severe pneumococcal pneumonia is intubated for hypoxemic respiratory failure. Height is 178 cm (predicted body weight 73 kg); actual weight is 110 kg. Chest radiograph shows new bilateral diffuse opacities. Echocardiogram shows normal LV function. On FiO₂ 0.8 and PEEP 12 cm H₂O, PaO₂ is 96 mm Hg (P/F 120).",
      leadIn: "What is the most appropriate ventilator strategy?",
      options: [
        "Tidal volume 6 mL/kg predicted weight, plateau ≤30 cm H₂O, and prolonged proning.",
        "Tidal volume 8 mL/kg actual weight, plateau ≤35 cm H₂O, and supine ventilation.",
        "Tidal volume 6 mL/kg predicted weight with minimal PEEP and supine ventilation.",
        "Tidal volume 10 mL/kg predicted weight with high PEEP and recruitment maneuvers."
      ],
      correct: 0,
      explanation: "Acute bilateral opacities not fully explained by cardiac failure and P/F ≤ 300 on PEEP ≥ 5 support <strong>ARDS</strong>. This patient's P/F of 120 is moderate ARDS. Use <strong>low tidal volume, initially 6 mL/kg predicted body weight</strong>, and <strong>plateau pressure ≤ 30 cm H₂O</strong>. For persistent P/F &lt; 150 despite optimized ventilation, use prolonged <strong>prone positioning, typically at least 16 hours/day</strong>. Low tidal volume and proning both reduce mortality; higher PEEP without prolonged recruitment maneuvers is appropriate in moderate-to-severe ARDS. Use conservative fluids once shock resolves.",
      flashcards: [
        { f: "How is ARDS defined (Berlin)?", b: "Within 1 week of an insult; bilateral opacities not fully explained by effusion, collapse, or HF; P/F ≤ 300 on PEEP ≥ 5 (≤ 100 severe).", x: "ARDS is noncardiogenic inflammatory alveolar flooding causing shunt physiology. P/F severity is assessed on at least modest PEEP.", t: "Trap: Bilateral infiltrates from cardiogenic pulmonary edema are not ARDS unless not fully explained by HF or overload.", m: "ARDS = acute bilateral noncardiogenic P/F problem",
          tb: { h: ["Severity", "P/F ratio", "Requirement"], r: [["Mild", "201–300", "PEEP ≥5"], ["Moderate", "101–200", "PEEP ≥5"], ["Severe", "≤100", "PEEP ≥5"], ["Not ARDS", ">300", "Seek other cause"]] } },
        { f: "What is lung-protective ventilation in ARDS?", b: "Tidal volume 6 mL/kg (range 4–8) of PREDICTED body weight, plateau pressure ≤ 30 cm H₂O, adequate PEEP.", x: "Low tidal volumes prevent volutrauma and barotrauma; predicted body weight estimates lung size better than actual weight.", t: "Trap: Obese patients still use predicted, not actual, body weight for tidal volume.", m: "ARDS tidal volume uses predicted body weight" },
        { f: "When is prone positioning indicated in intubated ARDS?", b: "Persistent P/F <150 despite optimized ventilation supports proning, typically at least 16 hours/day.", x: "Long prone sessions distribute lung stress more evenly and improve gas exchange; trials used prolonged sessions with lung-protective ventilation.", t: "Trap: A brief turn is not the mortality-tested intervention; evaluate procedural contraindications such as an unstable spine.", m: "P/F under 150: long prone sessions",
          tb: { h: ["Situation", "Approach"], r: [["Persistent P/F <150", "Prolonged proning"], ["Typical session", "At least 16 hours"], ["Unstable spine", "Assess contraindication"]] } }
      ]
    },
    {
      id: "geri-falls",
      system: "GERI",
      task: "RISK",
      vignette: "A 79-year-old woman living independently has fallen twice in the past 6 months without injury. She takes amlodipine, zolpidem nightly, and oxybutynin. Timed Up and Go is 16 seconds. Orthostatic vital signs are normal, vision is corrected, and 25-hydroxyvitamin D is 34 ng/mL.",
      leadIn: "In addition to deprescribing zolpidem and oxybutynin, what is the most effective fall-prevention intervention?",
      options: [
        "Routine high-dose vitamin D and calcium supplementation.",
        "Nighttime bed alarms and daytime hip protectors.",
        "Supervised gait, strength, and balance exercise.",
        "Brain MRI followed by treatment of any small-vessel disease."
      ],
      correct: 2,
      explanation: "In community-dwelling adults ≥ 65 at increased fall risk, <strong>exercise interventions</strong> (gait, balance, strength training; tai chi) have the strongest evidence (USPSTF), together with a <strong>multifactorial assessment</strong>: medication review (sedative-hypnotics and anticholinergics are on the <strong>Beers Criteria</strong>), vision, orthostasis, feet/footwear, and home hazards. <strong>Vitamin D is not recommended for fall prevention</strong> without deficiency.",
      flashcards: [
        { f: "How do you screen for fall risk?", b: "Ask about falls in the past year and fear of falling; Timed Up and Go ≥ 12 s indicates increased risk (CDC STEADI).", x: "Falls are common and multifactorial; a quick mobility test plus history identifies who needs deeper assessment.", t: "Trap: Do not dismiss falls as normal aging; recurrent falls predict morbidity and mortality.", m: "Ask falls, fear, and time the get-up" },
        { f: "Which fall-prevention intervention has the strongest evidence?", b: "Exercise (gait, balance, strength; tai chi), plus multifactorial risk reduction — vitamin D does not prevent falls without deficiency.", x: "Exercise improves strength, reaction time, and balance, directly targeting modifiable fall physiology. Vitamin D helps only if deficient for bone health.", t: "Trap: Vitamin D supplementation alone is not recommended solely to prevent falls in nondeficient adults.", m: "Falls prevention is exercise, not routine vitamin D" },
        { f: "Which Beers Criteria drugs increase fall risk?", b: "Benzodiazepines, Z-drugs (zolpidem), anticholinergics (oxybutynin, diphenhydramine), antipsychotics, and other sedatives.", x: "Sedatives and anticholinergics impair balance, cognition, and orthostatic responses. Deprescribing is a high-yield intervention.", t: "Trap: Z-drugs are not safer than benzodiazepines for falls or delirium in older adults.", m: "Beers sedatives and anticholinergics topple elders" }
      ]
    }
    ,

    /* ─────────────────────────────────────────────────────────────────
     * V2.4 expansion — 27 items on blueprint topics not yet covered, plus
     * a Foundations & Ethics system (capacity, perioperative, screening).
     * Correct answers authored evenly across A–D.
     * ───────────────────────────────────────────────────────────────── */
    {
      id: "cv-wpw-af",
      system: "CV",
      task: "RX",
      vignette: "A 24-year-old man presents with 1 hour of palpitations. Blood pressure is 118/72 mm Hg and he is alert with no chest pain. ECG shows an irregularly irregular wide-complex tachycardia at 230–260/min with QRS complexes that vary in width and morphology from beat to beat. A prior ECG showed a short PR interval and a slurred QRS upstroke.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "IV diltiazem to slow AV nodal conduction during preexcited atrial fibrillation.",
        "IV adenosine to transiently block the AV node during irregular wide-complex tachycardia.",
        "IV procainamide.",
        "IV digoxin to increase vagal tone and control ventricular response in preexcited AF."
      ],
      correct: 2,
      explanation: "An irregular, very fast wide-complex rhythm with <strong>varying QRS morphology</strong> in a patient with a prior <strong>delta wave</strong> is <strong>pre-excited atrial fibrillation (WPW)</strong>. AV nodal blockers such as adenosine, calcium channel blockers, beta-blockers, digoxin, and IV amiodarone push conduction down the accessory pathway, which can cause <strong>ventricular fibrillation</strong>. In a stable patient give <strong>IV procainamide</strong> (or ibutilide); if unstable, use <strong>synchronized cardioversion</strong>. Definitive therapy is <strong>catheter ablation</strong> of the pathway.",
      flashcards: [
        { f: "What are the ECG features of Wolff-Parkinson-White pattern?", b: "Short PR interval (< 120 ms), delta wave (slurred QRS upstroke), and wide QRS from ventricular pre-excitation.", x: "The accessory pathway bypasses the AV node, causing early ventricular activation. Baseline WPW may disappear intermittently.", t: "Trap: WPW pattern is the ECG finding; WPW syndrome means symptoms from tachyarrhythmia.", m: "WPW pattern: short PR, delta, wide QRS" },
        { f: "How is pre-excited atrial fibrillation treated?", b: "Unstable → synchronized cardioversion. Stable → IV procainamide or ibutilide. Never AV nodal blockers (adenosine, CCB, BB, digoxin, IV amiodarone).", x: "In AF, blocking the AV node can force rapid conduction over the bypass tract and trigger VF. Procainamide slows accessory pathway conduction.", t: "Trap: Adenosine is useful for regular AVNRT, not irregular wide-complex pre-excited AF.", m: "Irregular wide WPW AF: procainamide, not AV node blockers",
          tb: { h: ["State", "Treatment", "Avoid"], r: [["Unstable", "Sync cardioversion", "Delay"], ["Stable", "Procainamide", "AV nodal blockers"], ["Alternative", "Ibutilide", "IV amiodarone"], ["Definitive", "Ablation", "AV blocker alone"]] } },
        { f: "What is the definitive therapy for symptomatic WPW?", b: "Catheter ablation of the accessory pathway.", x: "Ablation cures most symptomatic pathways and prevents recurrent SVT or dangerous pre-excited AF.", t: "Trap: Chronic AV nodal blockers are not definitive and may be harmful in pre-excited AF.", m: "Ablate the extra pathway" }
      ]
    },
    {
      id: "cv-htn-emergency",
      system: "CV",
      task: "RX",
      vignette: "A 49-year-old man who stopped his antihypertensives 2 months ago presents with severe headache, blurred vision, and confusion. Blood pressure is 232/138 mm Hg in both arms. Fundoscopy shows bilateral papilledema with flame hemorrhages. Creatinine is 2.4 mg/dL (baseline 1.0) and urinalysis shows proteinuria and hematuria. CT of the head shows no hemorrhage.",
      leadIn: "What is the most appropriate management?",
      options: [
        "ICU admission with IV nicardipine (or clevidipine), lowering mean arterial pressure by no more than 25% in the first hour.",
        "IV labetalol boluses to normalize blood pressure (< 130/80 mm Hg) within 1 hour for rapid end-organ protection and symptom control.",
        "Sublingual nifedipine for rapid outpatient blood pressure reduction, then discharge with oral amlodipine.",
        "Restart his home regimen and recheck in 1 week because CT head shows no hemorrhage."
      ],
      correct: 0,
      explanation: "Severe hypertension with <strong>acute end-organ damage</strong> (encephalopathy, papilledema, AKI) is a <strong>hypertensive emergency</strong>. Treat in the ICU with a titratable IV agent such as <strong>nicardipine, clevidipine, or labetalol</strong>. Lower BP by <strong>no more than 25% in the first hour</strong>, then to about 160/100 over the next 2–6 h, then to normal over 24–48 h. Faster lowering causes cerebral, coronary, and renal ischemia because autoregulation has shifted upward. Aortic dissection, severe preeclampsia, and pheochromocytoma crisis need faster targets. Sublingual nifedipine causes unpredictable drops in BP and is never used.",
      flashcards: [
        { f: "How does hypertensive emergency differ from severe asymptomatic hypertension?", b: "Emergency includes acute BP-related target-organ injury and usually needs monitored IV therapy; asymptomatic severe elevation does not.", x: "BP is often ≥180/120, but organ injury and context, not an absolute number, define the emergency. Recheck technique and address reversible triggers.", t: "Trap: Do not rapidly lower an isolated asymptomatic BP reading with IV drugs; arrange appropriate longitudinal treatment.", m: "End-organ damage makes the emergency" },
        { f: "BP-lowering targets in hypertensive emergency?", b: "≤ 25% reduction in the first hour → 160/100 over 2–6 h → normal over 24–48 h.", x: "Chronic hypertension shifts autoregulation upward, so abrupt drops can underperfuse brain, heart, and kidneys.", t: "Trap: Sublingual nifedipine is unsafe because BP falls unpredictably.", m: "First hour: no more than 25% down",
          tb: { h: ["Time", "BP target", "Reason"], r: [["First hour", "≤25% reduction", "Avoid ischemia"], ["2–6 h", "About 160/100", "Controlled lowering"], ["24–48 h", "Toward normal", "Autoregulation"], ["Urgency", "No rapid IV drop", "No organ damage"]] } },
        { f: "Which hypertensive emergencies need faster BP targets?", b: "Aortic dissection (SBP < 120 within 20 min), severe preeclampsia/eclampsia, and pheochromocytoma crisis (SBP < 140 in the first hour).", x: "Some emergencies have disease-specific targets because ongoing shear or placental risk is immediately dangerous.", t: "Trap: Aortic dissection requires beta-blockade and much faster SBP control than routine hypertensive emergency.", m: "Dissection is the fast BP exception",
          tb: { h: ["Emergency", "Faster target", "Key drug idea"], r: [["Dissection", "SBP <120 in 20 min", "Beta-block first"], ["Preeclampsia", "Prompt control", "Labetalol, nifedipine"], ["Pheochromocytoma", "SBP <140 in 1 h", "Alpha blockade"], ["Most others", "≤25% first hour", "Titrate IV"]] } }
      ]
    },
    {
      id: "cv-pad",
      system: "CV",
      task: "RX",
      vignette: "A 66-year-old man who smokes has 6 months of reproducible right calf cramping after walking 2 blocks, relieved within minutes by standing still. He has no rest pain or tissue loss. Pedal pulses are diminished. Ankle-brachial index is 0.68 on the right and 0.92 on the left. He takes lisinopril only.",
      leadIn: "What is the most appropriate initial management?",
      options: [
        "Referral for endovascular revascularization of the superficial femoral artery before medical therapy or exercise.",
        "Smoking cessation, supervised exercise therapy, a high-intensity statin, and antiplatelet therapy.",
        "Warfarin with a target INR of 2–3 to prevent limb thrombosis in stable claudication.",
        "Pentoxifylline 400 mg three times daily as preferred first-line therapy to improve walking distance."
      ],
      correct: 1,
      explanation: "<strong>ABI ≤ 0.90</strong> with exertional calf pain is <strong>peripheral artery disease with claudication</strong>, a coronary heart disease risk equivalent. First-line care is <strong>smoking cessation, supervised exercise therapy</strong> (the most effective therapy for walking distance), <strong>high-intensity statin, and single antiplatelet therapy</strong> (aspirin or clopidogrel). Low-dose rivaroxaban plus aspirin is an option in selected high-risk patients. <strong>Cilostazol</strong> helps persistent claudication but is contraindicated in heart failure. Revascularization is for lifestyle-limiting symptoms despite GDMT or for <strong>chronic limb-threatening ischemia</strong>.",
      flashcards: [
        { f: "How is the ankle-brachial index interpreted?", b: "≤ 0.90 abnormal (PAD); 0.91–0.99 borderline; 1.00–1.40 normal; > 1.40 noncompressible → obtain toe-brachial index.", x: "ABI compares ankle to brachial systolic pressure; calcified noncompressible arteries falsely elevate ABI, especially in diabetes and CKD.", t: "Trap: ABI >1.40 is not normal reassurance; order toe-brachial index or vascular testing.", m: "ABI under 0.90 = PAD; over 1.40 = calcified",
          tb: { h: ["ABI", "Interpretation", "Next step"], r: [["≤0.90", "PAD", "Risk therapy"], ["0.91–0.99", "Borderline", "Exercise ABI if needed"], ["1.00–1.40", "Normal", "Assess symptoms"], [">1.40", "Noncompressible", "Toe-brachial index"]] } },
        { f: "What is first-line therapy for claudication?", b: "Supervised exercise therapy, smoking cessation, high-intensity statin, antiplatelet therapy; cilostazol for persistent symptoms (not in HF).", x: "Exercise promotes collateral function and walking efficiency; risk-factor therapy reduces MI, stroke, and limb events.", t: "Trap: Cilostazol improves walking distance but is contraindicated in heart failure.", m: "Claudication walks better with supervised walking" },
        { f: "What is chronic limb-threatening ischemia?", b: "PAD with rest pain, nonhealing wounds, or gangrene for > 2 weeks → urgent vascular evaluation for revascularization.", x: "Rest pain and tissue loss signal inadequate perfusion for limb viability and need prompt revascularization planning.", t: "Trap: Claudication alone is not chronic limb-threatening ischemia unless rest pain or tissue loss develops.", m: "Rest pain or tissue loss threatens the limb" }
      ]
    },
    {
      id: "endo-thyroid-nodule",
      system: "ENDO",
      task: "NEXT",
      vignette: "A 44-year-old woman has a 1.8-cm painless thyroid nodule found on a carotid ultrasound. She has no compressive symptoms and no history of head and neck irradiation. TSH is 1.6 µU/mL. Dedicated thyroid ultrasound shows a solid, hypoechoic nodule with irregular margins and microcalcifications.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Radioactive iodine uptake scan to determine whether the suspicious thyroid nodule is autonomous or cold.",
        "Levothyroxine suppression therapy to shrink the nodule before any tissue diagnosis.",
        "Repeat ultrasound in 12 months to document growth kinetics before deciding on fine-needle aspiration.",
        "Ultrasound-guided fine-needle aspiration."
      ],
      correct: 3,
      explanation: "Every thyroid nodule is evaluated first with <strong>TSH and ultrasound</strong>. With a <strong>normal or high TSH</strong>, the decision depends on size and sonographic pattern. A <strong>high-suspicion nodule ≥ 1 cm</strong> (solid hypoechoic, irregular margins, microcalcifications, taller-than-wide) needs <strong>FNA</strong>. A radionuclide scan is useful only when <strong>TSH is low</strong>, because a hyperfunctioning ('hot') nodule is rarely malignant and does not need FNA. Levothyroxine suppression is not recommended.",
      flashcards: [
        { f: "What are the first tests for a thyroid nodule?", b: "Serum TSH and thyroid ultrasound. Low TSH → radionuclide uptake scan (hot nodules rarely malignant).", x: "TSH determines whether to assess function first; autonomous hot nodules rarely harbor cancer. Ultrasound risk-stratifies morphology.", t: "Trap: Do not biopsy before checking TSH; low TSH calls for radionuclide scanning first.", m: "TSH decides hot scan before needle" },
        { f: "Which ultrasound features suggest thyroid cancer?", b: "Solid, hypoechoic, irregular/infiltrative margins, microcalcifications, taller-than-wide shape, extrathyroidal extension.", x: "Malignant nodules tend to invade rather than compress, producing irregular margins and microcalcifications from psammoma bodies.", t: "Trap: Pure cystic or spongiform nodules are usually low risk despite palpable size.", m: "Irregular hypoechoic microcalcified tall nodule worries" },
        { f: "When is FNA indicated for a thyroid nodule?", b: "High/intermediate suspicion ≥ 1 cm, low suspicion ≥ 1.5 cm, very low suspicion (spongiform) ≥ 2 cm or observe — ATA thresholds.", x: "FNA thresholds balance cancer risk against overdiagnosis; smaller nodules are biopsied only when ultrasound risk is high.", t: "Trap: Levothyroxine suppression is not recommended for benign nodules because harms outweigh benefit.", m: "FNA threshold follows ultrasound risk",
          tb: { h: ["US pattern", "FNA threshold", "Example"], r: [["High", "≥1 cm", "Hypoechoic irregular"], ["Intermediate", "≥1 cm", "Hypoechoic smooth"], ["Low", "≥1.5 cm", "Isoechoic solid"], ["Very low", "≥2 cm or observe", "Spongiform"]] } }
      ]
    },
    {
      id: "endo-cushing",
      system: "ENDO",
      task: "TEST",
      vignette: "A 38-year-old woman reports 1 year of weight gain, easy bruising, and difficulty climbing stairs. She takes no glucocorticoids by any route. BP is 158/96 mm Hg. Examination shows facial plethora, supraclavicular fat pads, thin skin, and wide (> 1 cm) violaceous abdominal striae. Hemoglobin A1c is 7.1% (new), and she has osteoporosis at age 38.",
      leadIn: "What is the most appropriate initial diagnostic test?",
      options: [
        "Overnight 1-mg dexamethasone suppression test.",
        "Pituitary MRI as the initial test before biochemical confirmation of hypercortisolism.",
        "Plasma ACTH level as the first study to localize disease before confirming Cushing syndrome.",
        "Random afternoon serum cortisol, interpreted as diagnostic if it is above the laboratory reference range."
      ],
      correct: 0,
      explanation: "Features specific for <strong>hypercortisolism</strong> include easy bruising, facial plethora, proximal myopathy, and wide violaceous striae, especially with new diabetes, hypertension, and early osteoporosis. After excluding <strong>exogenous glucocorticoids</strong> (the most common cause), screen with one of: <strong>overnight 1-mg dexamethasone suppression test</strong>, <strong>late-night salivary cortisol</strong> (×2), or <strong>24-h urine free cortisol</strong> (×2). Only after biochemical confirmation do you measure <strong>ACTH</strong> to localize and then image. Imaging first finds incidental lesions.",
      flashcards: [
        { f: "What are the screening tests for Cushing syndrome?", b: "Overnight 1-mg dexamethasone suppression test (cortisol > 1.8 µg/dL abnormal), late-night salivary cortisol ×2, or 24-h urine free cortisol ×2; confirm with a second test before localizing.", x: "Screen only after excluding exogenous steroids and when features are discriminatory. Abnormal first tests should be confirmed before imaging.", t: "Trap: Random serum cortisol is not a screening test for Cushing syndrome.", m: "Cushing screens: dex, late-night saliva, or 24-hour urine" },
        { f: "How is confirmed Cushing syndrome localized?", b: "Plasma ACTH: low → adrenal source (adrenal CT). Normal/high → pituitary MRI; if equivocal, inferior petrosal sinus sampling vs ectopic source.", x: "ACTH separates adrenal autonomy from ACTH-dependent disease; pituitary incidentalomas are common, so equivocal cases need petrosal sampling.", t: "Trap: Do not image adrenals or pituitary before biochemical confirmation.", m: "ACTH localizes only after cortisol is proven high",
          tb: { h: ["ACTH", "Source", "Next test"], r: [["Low", "Adrenal cortisol", "Adrenal CT"], ["Normal or high", "ACTH-dependent", "Pituitary MRI"], ["Equivocal MRI", "Pituitary vs ectopic", "Petrosal sampling"], ["Before ACTH", "Prove cortisol excess", "Do not image first"]] } },
        { f: "What is the most common cause of Cushing syndrome overall, and of endogenous disease?", b: "Overall: exogenous glucocorticoids. Endogenous: ACTH-secreting pituitary adenoma (Cushing disease).", x: "Exogenous glucocorticoids suppress ACTH and adrenal cortisol; Cushing disease is specifically pituitary ACTH excess.", t: "Trap: Cushing syndrome is any cortisol excess; Cushing disease means pituitary source only.", m: "Syndrome is cortisol excess; disease is pituitary ACTH" }
      ]
    },
    {
      id: "gi-cholangitis",
      system: "GI",
      task: "NEXT",
      vignette: "A 72-year-old woman presents with fever, rigors, and right upper quadrant pain for 1 day. Temperature 39.2 °C, BP 104/62 mm Hg, HR 112/min. She is jaundiced. Total bilirubin 5.4 mg/dL, alkaline phosphatase 410 U/L, ALT 220 U/L, WBC 17,600/µL. Ultrasound shows gallstones and a common bile duct dilated to 11 mm.",
      leadIn: "In addition to IV fluids and blood cultures, what is the most appropriate management?",
      options: [
        "Laparoscopic cholecystectomy today before biliary decompression or source control of the obstructed duct.",
        "HIDA scan to confirm cystic duct obstruction before starting antibiotics or arranging ERCP.",
        "IV piperacillin-tazobactam and ERCP with biliary decompression within 24 hours.",
        "IV antibiotics alone for 14 days, then outpatient MRCP, without urgent biliary drainage."
      ],
      correct: 2,
      explanation: "Fever, jaundice, and RUQ pain (<strong>Charcot triad</strong>) with a dilated duct = <strong>acute cholangitis</strong> from choledocholithiasis. Treat with <strong>broad-spectrum antibiotics</strong> covering enteric gram-negatives and anaerobes, plus <strong>biliary drainage by ERCP</strong>: urgently if septic shock or Reynolds pentad, otherwise within 24–48 h. Do cholecystectomy later in the same admission or once she recovers. A HIDA scan diagnoses cystic duct obstruction (cholecystitis), not cholangitis.",
      flashcards: [
        { f: "What are Charcot triad and Reynolds pentad?", b: "Charcot: fever, jaundice, RUQ pain (cholangitis). Reynolds: + hypotension and altered mental status (suppurative cholangitis).", x: "Charcot triad reflects infected obstructed bile; hypotension and confusion indicate severe sepsis from biliary obstruction.", t: "Trap: Murphy sign with cystic duct obstruction suggests cholecystitis, not cholangitis.", m: "Charcot triad = infected obstructed bile" },
        { f: "How is acute cholangitis treated?", b: "IV fluids + broad-spectrum antibiotics + biliary drainage (ERCP; percutaneous drain if ERCP fails) — urgent if septic.", x: "Antibiotics treat bacteremia, but source control requires decompression of the obstructed duct. Delay increases septic complications.", t: "Trap: Antibiotics alone are inadequate when obstruction persists.", m: "Cholangitis needs antibiotics plus drainage" },
        { f: "Suspected choledocholithiasis: when ERCP vs MRCP/EUS?", b: "High probability (CBD stone on imaging, cholangitis, or bilirubin > 4 with dilated duct) → ERCP. Intermediate → MRCP or EUS first.", x: "ERCP is therapeutic but carries pancreatitis risk, so intermediate-probability stones should be confirmed noninvasively first.", t: "Trap: HIDA evaluates cholecystitis; MRCP/EUS evaluates suspected common duct stones.", m: "ERCP treats high-probability duct stones",
          tb: { h: ["Probability", "Clue", "Test or treatment"], r: [["High", "Stone on imaging", "ERCP"], ["High", "Cholangitis", "ERCP"], ["High", "Bili >4 + duct", "ERCP"], ["Intermediate", "Mixed predictors", "MRCP or EUS"]] } }
      ]
    },
    {
      id: "gi-hbv-reactivation",
      system: "GI",
      task: "NEXT",
      vignette: "A 63-year-old man with newly diagnosed diffuse large B-cell lymphoma is about to begin R-CHOP (rituximab-containing) chemotherapy. Pretreatment hepatitis B testing shows HBsAg negative, total anti-HBc positive, anti-HBs positive, and HBV DNA undetectable. Liver chemistries are normal.",
      leadIn: "What is the most appropriate management?",
      options: [
        "No action; anti-HBs positivity means he is immune from reactivation during rituximab therapy, so monitoring is unnecessary.",
        "Antiviral prophylaxis with entecavir or tenofovir during and for at least 12 months after rituximab.",
        "Hepatitis B vaccine booster series before starting chemotherapy, with HBV DNA monitoring only.",
        "Defer chemotherapy until anti-HBc becomes negative on repeat testing after immune reconstitution."
      ],
      correct: 1,
      explanation: "HBsAg-negative, anti-HBc-positive, anti-HBs-positive = <strong>resolved past HBV infection</strong>. Covalently closed circular DNA persists in hepatocytes, so <strong>B-cell-depleting therapy (rituximab, anti-CD20)</strong> carries a high risk of <strong>HBV reactivation</strong> and potentially fulminant hepatitis. Give <strong>entecavir or tenofovir prophylaxis</strong> during therapy and for <strong>≥ 12 months</strong> after. With lower-risk immunosuppression, monitoring HBV DNA and ALT is an alternative. Screen <strong>HBsAg + anti-HBc (± anti-HBs)</strong> before any chemotherapy or immunosuppression.",
      flashcards: [
        { f: "HBV serology: vaccinated vs resolved infection?", b: "Vaccinated: anti-HBs only. Resolved infection: anti-HBc + anti-HBs, HBsAg negative.", x: "Anti-HBc marks prior natural infection because core antigen is not in vaccines. Anti-HBs can reflect vaccine or recovery depending on core status.", t: "Trap: Anti-HBs positivity does not eliminate reactivation risk if anti-HBc is also positive.", m: "Core antibody means natural HBV exposure",
          tb: { h: ["Pattern", "HBsAg", "Anti-HBc", "Anti-HBs"], r: [["Vaccinated", "Negative", "Negative", "Positive"], ["Resolved", "Negative", "Positive", "Positive"], ["Chronic", "Positive", "IgG positive", "Negative"], ["Window", "Negative", "IgM positive", "Negative"]] } },
        { f: "HBV serology: acute vs chronic infection?", b: "Acute: HBsAg + IgM anti-HBc. Chronic: HBsAg > 6 months + IgG anti-HBc. Window period: IgM anti-HBc alone.", x: "IgM anti-HBc signals recent infection and is the only marker during the window after HBsAg disappears before anti-HBs appears.", t: "Trap: Chronic HBV is defined by persistent HBsAg, not by antibody titers alone.", m: "IgM core fills the HBV window" },
        { f: "Who needs HBV prophylaxis before immunosuppression?", b: "All HBsAg-positive patients, and HBsAg-negative/anti-HBc-positive patients receiving high-risk therapy (anti-CD20, stem cell transplant) — entecavir or tenofovir.", x: "Anti-CD20 therapy removes B-cell immune control, allowing cccDNA-driven HBV replication even after apparent recovery.", t: "Trap: Monitoring alone is not enough for high-risk rituximab exposure; give prophylaxis.", m: "Anti-CD20 wakes sleeping HBV: prophylax",
          tb: { h: ["HBV status", "Immunosuppression", "Plan"], r: [["HBsAg positive", "Any significant", "Entecavir or tenofovir"], ["Core positive", "Anti-CD20", "Prophylaxis"], ["Core positive", "Stem cell transplant", "Prophylaxis"], ["Lower risk", "Other regimens", "Monitor DNA and ALT"]] } }
      ]
    },
    {
      id: "gi-hpylori",
      system: "GI",
      task: "RX",
      vignette: "A 46-year-old man has epigastric pain. Upper endoscopy shows a 9-mm clean-based duodenal ulcer, and gastric biopsies are positive for Helicobacter pylori. He has no penicillin allergy. He received azithromycin for bronchitis last year. Antibiotic susceptibility testing is not available.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Clarithromycin triple therapy (PPI + clarithromycin + amoxicillin) for 7 days.",
        "PPI monotherapy for 8 weeks.",
        "Levofloxacin triple therapy for 10 days.",
        "Bismuth quadruple therapy (PPI + bismuth + tetracycline + metronidazole) for 14 days."
      ],
      correct: 3,
      explanation: "With unknown susceptibility, the ACG (2024) recommends <strong>14-day bismuth quadruple therapy</strong> as preferred first-line treatment (vonoprazan-amoxicillin dual therapy is an alternative). Empiric <strong>clarithromycin triple therapy is no longer advised</strong> because of resistance above 15%, especially after prior macrolide exposure. Levofloxacin regimens are reserved for salvage after susceptibility testing. Confirm eradication with a <strong>test of cure</strong> (urea breath test, stool antigen, or biopsy) <strong>≥ 4 weeks after antibiotics and ≥ 2 weeks off PPI</strong>.",
      flashcards: [
        { f: "First-line H. pylori therapy when susceptibility is unknown?", b: "Bismuth quadruple therapy for 14 days (PPI, bismuth, tetracycline, metronidazole); vonoprazan-amoxicillin dual is an alternative.", x: "Quadruple therapy avoids clarithromycin resistance, now common enough that empiric triple therapy fails unless susceptibility is known.", t: "Trap: Clarithromycin triple therapy is only for proven susceptible strains and no macrolide exposure.", m: "BQT 14: bismuth quadruple for 14 days when susceptibility is unknown",
          tb: { h: ["Regimen", "When", "Duration"], r: [["Bismuth quad", "Unknown susceptibility", "14 days"], ["Vonoprazan-amox", "Alternative empiric", "14 days"], ["Clarithro triple", "Proven susceptible only", "14 days"], ["Levofloxacin", "Salvage with testing", "Usually 14 days"]] } },
        { f: "How and when is H. pylori eradication confirmed?", b: "Urea breath test, stool antigen, or biopsy ≥ 4 weeks after antibiotics and ≥ 2 weeks off PPIs — test of cure in everyone treated.", x: "PPIs and recent antibiotics suppress organism load and can cause false-negative breath or stool antigen tests.", t: "Trap: Do not check immediately after therapy; wait ≥4 weeks after antibiotics and stop PPI ≥2 weeks.", m: "4 and 2: test ≥4 weeks after antibiotics and ≥2 weeks off PPI" },
        { f: "Who should be tested for H. pylori?", b: "Peptic ulcer disease (active or past), gastric MALT lymphoma, early gastric cancer, uninvestigated dyspepsia < 60, unexplained iron deficiency, ITP, long-term NSAID/aspirin starters.", x: "Testing is useful when eradication changes outcomes: ulcer recurrence, lymphoma regression, cancer risk, or unexplained deficiency/ITP.", t: "Trap: Do not screen everyone with reflux alone; test when a recognized indication is present.", m: "Test when killing H. pylori changes outcomes, not for reflux alone" }
      ]
    },
    {
      id: "id-cystitis",
      system: "ID",
      task: "RX",
      vignette: "A 27-year-old nonpregnant woman has 2 days of dysuria, urinary frequency, and suprapubic discomfort. She has no fever, flank pain, vaginal discharge, or recent antibiotics. Urinalysis shows leukocyte esterase and nitrites. She has no allergies and normal kidney function. Local E. coli resistance to TMP-SMX is 26%.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Ciprofloxacin for 7 days.",
        "Nitrofurantoin monohydrate/macrocrystals for 5 days.",
        "Urine culture, with antibiotics only after results return.",
        "TMP-SMX for 3 days."
      ],
      correct: 1,
      explanation: "This is <strong>acute uncomplicated cystitis</strong>. First-line options (IDSA) are <strong>nitrofurantoin × 5 days</strong>, <strong>TMP-SMX × 3 days</strong> (only if local resistance is <strong>&lt; 20%</strong>, so not here), or <strong>fosfomycin single dose</strong>. Fluoroquinolones are reserved because of collateral damage and serious adverse effects. Urine culture is unnecessary for typical uncomplicated cystitis. Obtain one for pyelonephritis, recurrence, treatment failure, pregnancy, or men.",
      flashcards: [
        { f: "First-line antibiotics for uncomplicated cystitis?", b: "Nitrofurantoin × 5 days, TMP-SMX × 3 days (if resistance < 20%), or fosfomycin 3 g × 1 — avoid fluoroquinolones.", x: "Short-course narrow therapy cures bladder infection while limiting collateral damage and resistance selection.", t: "Trap: Fluoroquinolones work but are not first-line for simple cystitis because harms outweigh benefit.", m: "Simple cystitis: nitro 5, TMP-SMX 3, fosfomycin 1",
          tb: { h: ["Drug", "Duration", "Use if"], r: [["Nitrofurantoin", "5 days", "Bladder only"], ["TMP-SMX", "3 days", "Resistance <20%"], ["Fosfomycin", "Single dose", "Uncomplicated"], ["Fluoroquinolone", "Avoid", "Reserve only"]] } },
        { f: "When should asymptomatic bacteriuria be treated?", b: "Only in pregnancy and before urologic procedures with mucosal bleeding — not in older adults, catheters, or diabetes.", x: "Most bacteriuria without symptoms reflects colonization; treatment does not prevent sepsis and increases C. difficile/resistance.", t: "Trap: Pyuria or a positive culture alone is not UTI; treat symptoms except pregnancy or invasive urology.", m: "ASB: babies and blades only — pregnancy or urologic mucosal trauma" },
        { f: "When should nitrofurantoin be avoided?", b: "Pyelonephritis or systemic infection (poor tissue levels) and CrCl < 30 mL/min (Beers).", x: "Nitrofurantoin concentrates in urine but not renal parenchyma or blood, so it fails upper-tract or systemic disease.", t: "Trap: Fever, flank pain, or sepsis means pyelonephritis; choose tissue-penetrating therapy, not nitrofurantoin.", m: "Nitro stays in urine: bladder yes, kidney or blood no" }
      ]
    },
    {
      id: "id-sab",
      system: "ID",
      task: "RX",
      vignette: "A 58-year-old man on hemodialysis via a tunneled catheter develops fever and rigors. Two of two blood culture sets grow Staphylococcus aureus; empiric IV vancomycin was started. Susceptibilities now show methicillin-susceptible S. aureus (MSSA). The catheter has been removed, and transthoracic echocardiogram is pending.",
      leadIn: "What is the most appropriate antibiotic therapy?",
      options: [
        "Switch to IV cefazolin.",
        "Continue IV vancomycin.",
        "Add gentamicin to vancomycin.",
        "Switch to oral doxycycline today."
      ],
      correct: 0,
      explanation: "For <strong>MSSA bacteremia</strong>, a beta-lactam (<strong>cefazolin</strong> or nafcillin/oxacillin) has <strong>lower mortality and relapse than vancomycin</strong>, so switch as soon as susceptibilities return. Cefazolin is convenient after dialysis. The S. aureus bacteremia bundle includes <strong>source control</strong>, <strong>repeat blood cultures until clear</strong>, <strong>echocardiography</strong> (TEE if high risk), and <strong>ID consultation</strong>. Uncomplicated cases need ≥ 14 days IV from the first negative culture; complicated cases need 4–6 weeks. Gentamicin adds nephrotoxicity without benefit.",
      flashcards: [
        { f: "What is the S. aureus bacteremia management bundle?", b: "ID consult, source control (remove lines), repeat blood cultures until negative, echocardiogram in all, beta-lactam for MSSA.", x: "S. aureus frequently seeds valves, bones, and devices; the bundle searches for and removes occult foci that drive relapse.", t: "Trap: Do not stop after one negative culture; repeat cultures until clearance and evaluate for endocarditis.", m: "SAB bundle: source, cultures, echo, ID, right drug" },
        { f: "Best antibiotic for MSSA bacteremia?", b: "Cefazolin or antistaphylococcal penicillin (nafcillin/oxacillin) — superior to vancomycin.", x: "MSSA cell-wall beta-lactams kill faster than vancomycin and reduce mortality; cefazolin is often easiest to dose.", t: "Trap: Vancomycin is for MRSA or severe beta-lactam allergy, not definitive MSSA bacteremia.", m: "MSSA loves beta-lactams; vancomycin is the MRSA fallback" },
        { f: "Uncomplicated S. aureus bacteremia criteria and duration?", b: "No endocarditis/implants/metastatic foci, source removed, defervescence within 72 h, cultures clear in 2–4 days → ≥ 14 days IV; otherwise 4–6 weeks.", x: "Duration starts on the first day blood cultures are negative, not on the day antibiotics began.", t: "Trap: Any prosthetic material, endocarditis, persistent fever/cultures, or metastatic infection makes it complicated.", m: "14 days starts after the first negative culture",
          tb: { h: ["Feature", "Uncomplicated", "Complicated"], r: [["Echo", "No endocarditis", "Endocarditis present"], ["Hardware", "No implants", "Prosthetic material"], ["Cultures", "Clear in 2-4 d", "Persistent positive"], ["Fever", "Resolves ≤72 h", "Persistent fever"], ["Duration", "≥14 d IV", "4-6 wk IV"]] } }
      ]
    },
    {
      id: "id-prep",
      system: "ID",
      task: "RISK",
      vignette: "A 29-year-old man who has sex with men reports condomless anal sex with multiple partners over the past 6 months, and was treated for rectal gonorrhea 2 months ago. His last sexual exposure was 3 weeks ago. Today's laboratory fourth-generation HIV-1/2 antigen/antibody test is negative and HIV-1 RNA is undetectable; he has no acute retroviral symptoms. Creatinine clearance is 105 mL/min and hepatitis B surface antigen is negative.",
      leadIn: "What is the most appropriate recommendation?",
      options: [
        "28 days of 3-drug postexposure prophylaxis for a recent high-risk sexual exposure, with follow-up HIV testing.",
        "Repeat HIV testing in 3 months before deciding on prevention, with condoms alone meanwhile.",
        "Begin HIV pre-exposure prophylaxis (e.g., daily oral emtricitabine-tenofovir).",
        "Condom counseling alone with quarterly HIV and STI screening for behavioral risk reduction."
      ],
      correct: 2,
      explanation: "A recent bacterial STI and condomless sex with multiple partners are strong indications for <strong>HIV pre-exposure prophylaxis</strong>. Options are daily oral <strong>FTC/TDF</strong> (all populations) or <strong>FTC/TAF</strong> (not for receptive vaginal sex), or long-acting injectable <strong>cabotegravir</strong> every 2 months; twice-yearly lenacapavir was FDA-approved in 2025. Confirm a <strong>negative HIV test</strong> right before starting. PEP is only for exposures <strong>within 72 hours</strong>. On oral PrEP, test for HIV every 3 months, screen for STIs regularly, and check kidney function at least yearly (every 6 months if age ≥ 50 or baseline CrCl &lt; 90 mL/min).",
      flashcards: [
        { f: "What are the HIV PrEP options?", b: "Oral FTC/TDF (all) or FTC/TAF (not receptive vaginal sex); injectable cabotegravir q2 months; twice-yearly lenacapavir injection.", x: "PrEP choice depends on exposure type, renal/bone issues, adherence, and injection preference; HIV must be excluded first.", t: "Trap: FTC/TAF is not approved for receptive vaginal sex; use FTC/TDF or injectable options.", m: "PrEP menu: daily pills, q2-month cabotegravir, q6-month lenacapavir",
          tb: { h: ["Option", "Interval", "Key limitation"], r: [["FTC/TDF", "Daily oral", "All exposures"], ["FTC/TAF", "Daily oral", "Not receptive vaginal"], ["Cabotegravir", "Every 2 mo", "Injection visits"], ["Lenacapavir", "Every 6 mo", "Injection"]] } },
        { f: "When and how is HIV postexposure prophylaxis given?", b: "Within 72 hours of exposure: 28 days of a 3-drug regimen (e.g., bictegravir/FTC/TAF or dolutegravir + FTC/TDF).", x: "PEP is an emergency because systemic infection can establish quickly; efficacy falls sharply after 72 hours.", t: "Trap: Ongoing risk is PrEP, not repeated PEP; convert after confirming HIV-negative status.", m: "PEP clock: 72 hours to start, 28 days to finish" },
        { f: "What monitoring does oral PrEP require?", b: "HIV testing before start and every 3 months, STI screening, baseline and serial kidney function, and HBV serology.", x: "Use appropriate antigen/antibody and RNA testing to exclude acute HIV when indicated; stopping tenofovir-containing PrEP can flare chronic HBV.", t: "Trap: Do not start two-drug PrEP in unrecognized acute HIV; monitor kidneys at least yearly and more often for higher-risk patients.", m: "PrEP monitoring: HIV, kidneys, HBV, STIs" }
      ]
    },
    {
      id: "pulm-ipf",
      system: "PULM",
      task: "RX",
      vignette: "A 70-year-old former smoker has 18 months of progressive exertional dyspnea and dry cough. He has bibasilar 'Velcro' inspiratory crackles and digital clubbing. He has no relevant occupational, avian, or medication exposures, and connective tissue disease serologies are negative. PFTs show a restrictive pattern with reduced DLCO. High-resolution CT shows subpleural, basal-predominant reticulation with honeycombing and traction bronchiectasis.",
      leadIn: "What is the most appropriate management?",
      options: [
        "Prednisone 1 mg/kg daily.",
        "Surgical lung biopsy to confirm the diagnosis.",
        "Prednisone plus azathioprine and N-acetylcysteine.",
        "An antifibrotic agent (nintedanib or pirfenidone)."
      ],
      correct: 3,
      explanation: "A <strong>definite usual interstitial pneumonia (UIP) pattern</strong> on HRCT (subpleural, basal reticulation with <strong>honeycombing</strong>), in the right clinical context with no exposure or CTD, is diagnostic of <strong>idiopathic pulmonary fibrosis</strong>, so <strong>no biopsy is needed</strong>. <strong>Nintedanib or pirfenidone</strong> slows FVC decline. <strong>Glucocorticoid-based immunosuppression increases mortality</strong> in IPF (PANTHER trial). Add oxygen, pulmonary rehabilitation, vaccinations, and early <strong>lung transplant referral</strong>.",
      flashcards: [
        { f: "What is the HRCT UIP pattern?", b: "Subpleural, basal-predominant reticulation with honeycombing ± traction bronchiectasis — diagnostic of IPF in the right context without biopsy.", x: "Honeycombing in the correct clinical setting has high specificity for UIP, avoiding surgical lung biopsy risk.", t: "Trap: Ground-glass, nodules, or upper-lobe predominance is atypical UIP and should prompt another diagnosis.", m: "UIP is basal, subpleural, and honeycombed",
          tb: { h: ["Feature", "Typical UIP", "Atypical"], r: [["Distribution", "Basal subpleural", "Upper or central"], ["Key sign", "Honeycombing", "Nodules"], ["Ground glass", "Minimal", "Prominent"], ["Next step", "No biopsy if context fits", "Seek other diagnosis"]] } },
        { f: "What is the treatment of idiopathic pulmonary fibrosis?", b: "Antifibrotics (nintedanib or pirfenidone), oxygen, pulmonary rehab, transplant referral — avoid glucocorticoid/azathioprine regimens.", x: "Antifibrotics slow progression but do not reverse scarring; supportive care and transplant planning address morbidity and survival.", t: "Trap: Steroid/azathioprine regimens increased mortality in IPF; reserve immunosuppression for inflammatory ILD.", m: "IPF: antifibrotics slow scarring; steroids harmed in PANTHER" },
        { f: "What PFT pattern defines restrictive lung disease?", b: "Reduced TLC (< 5th percentile/LLN) with normal or high FEV1/FVC; DLCO is low in parenchymal disease, normal in chest wall/neuromuscular causes.", x: "Restriction requires lung volumes; spirometry alone can suggest but not confirm low TLC.", t: "Trap: Low FVC with low FEV1/FVC is obstruction with air trapping, not true restriction.", m: "Restriction is a TLC diagnosis, not just a low FVC" }
      ]
    },
    {
      id: "rheum-gpa",
      system: "RHEUM",
      task: "RX",
      vignette: "A 52-year-old man has 3 months of chronic sinusitis with bloody nasal crusting, then 2 weeks of cough with hemoptysis. Creatinine has risen from 0.9 to 2.6 mg/dL; urinalysis shows dysmorphic red cells and red blood cell casts. Chest CT shows multiple cavitating nodules. PR3-ANCA (c-ANCA) is strongly positive. Oxygen saturation is 94% on room air.",
      leadIn: "What is the most appropriate induction therapy?",
      options: [
        "High-dose glucocorticoids alone (IV methylprednisolone pulse, then oral prednisone).",
        "High-dose glucocorticoids plus rituximab.",
        "Methotrexate monotherapy.",
        "Plasma exchange alone."
      ],
      correct: 1,
      explanation: "Upper airway disease, cavitating lung nodules, and <strong>rapidly progressive glomerulonephritis</strong> with <strong>PR3-ANCA</strong> = <strong>granulomatosis with polyangiitis</strong>. Organ-threatening disease needs induction with <strong>glucocorticoids plus rituximab</strong> (or cyclophosphamide); reduced-dose steroid tapers are noninferior (PEXIVAS). Methotrexate is only for non-severe disease without renal involvement. Plasma exchange is no longer routine. Give <strong>PJP prophylaxis (TMP-SMX)</strong>, then maintain with rituximab.",
      flashcards: [
        { f: "Which ANCA goes with which vasculitis?", b: "GPA: PR3/c-ANCA. MPA: MPO/p-ANCA. EGPA (asthma, eosinophilia): MPO/p-ANCA in ~40%.", x: "ANCA subtype helps pattern recognition but biopsy or organ involvement still guides urgency and treatment intensity.", t: "Trap: EGPA is suggested by asthma and eosinophilia; ANCA may be absent despite vasculitis.", m: "GPA PR3; MPA and many EGPA MPO",
          tb: { h: ["Disease", "ANCA", "Clinical clue"], r: [["GPA", "PR3/c-ANCA", "ENT, lung, GN"], ["MPA", "MPO/p-ANCA", "GN, capillaritis"], ["EGPA", "Often MPO/p-ANCA", "Asthma, eosinophils"]] } },
        { f: "What is induction therapy for severe ANCA vasculitis?", b: "Glucocorticoids + rituximab (or cyclophosphamide), then rituximab maintenance; PJP prophylaxis with TMP-SMX.", x: "Rituximab and cyclophosphamide induce remission in organ-threatening disease; steroids are tapered to reduce infection/toxicity.", t: "Trap: Methotrexate is only for nonsevere disease without renal, pulmonary hemorrhage, or other organ threat.", m: "Severe ANCA: RTX or cyclophosphamide plus steroids, then RTX maintenance" },
        { f: "What defines a pulmonary-renal syndrome?", b: "Diffuse alveolar hemorrhage + glomerulonephritis — ANCA vasculitis, anti-GBM disease (Goodpasture), or SLE.", x: "Pulmonary capillaritis and crescentic GN can cause rapid respiratory and renal failure, so treatment is urgent.", t: "Trap: Isolated hemoptysis without active urine sediment is not pulmonary-renal syndrome.", m: "Lung bleeding plus nephritic urine is pulmonary-renal syndrome" }
      ]
    },
    {
      id: "neph-membranous",
      system: "NEPH",
      task: "DX",
      vignette: "A 57-year-old man presents with 6 weeks of progressive leg and periorbital edema. BP is 136/84 mm Hg. Urine protein-to-creatinine ratio is 8.2 g/g, serum albumin 2.0 g/dL, LDL 248 mg/dL, creatinine 1.0 mg/dL. Urine sediment is bland. Complement levels are normal; ANA, HBV, HCV, and HIV tests are negative. Serum anti-phospholipase A2 receptor (PLA2R) antibody is positive.",
      leadIn: "What is the most likely diagnosis?",
      options: [
        "Minimal change disease.",
        "IgA nephropathy.",
        "Primary membranous nephropathy.",
        "Postinfectious glomerulonephritis."
      ],
      correct: 2,
      explanation: "<strong>Nephrotic syndrome</strong> (proteinuria &gt; 3.5 g/day, hypoalbuminemia, edema, hyperlipidemia) with a bland sediment in an older adult plus <strong>anti-PLA2R antibodies</strong> (positive in ~70–80%) = <strong>primary membranous nephropathy</strong>. A positive PLA2R often allows diagnosis without biopsy when kidney function is normal. Exclude secondary causes: <strong>malignancy</strong> (age-appropriate cancer screening), HBV, SLE (class V), and NSAIDs. Membranous has the <strong>highest thrombosis risk</strong> of the nephrotic lesions (renal vein thrombosis). IgA and postinfectious GN are <strong>nephritic</strong>.",
      flashcards: [
        { f: "How is nephrotic syndrome defined?", b: "Proteinuria > 3.5 g/day + hypoalbuminemia + edema (± hyperlipidemia, lipiduria) with a bland sediment.", x: "Heavy albuminuria lowers oncotic pressure and drives hepatic lipoprotein synthesis, causing edema and hyperlipidemia.", t: "Trap: RBC casts or dysmorphic hematuria suggest nephritic GN, not a bland nephrotic process.", m: "Nephrotic = protein spills, albumin falls, edema swells" },
        { f: "What are the key features of membranous nephropathy?", b: "Most common primary nephrotic cause in older adults; anti-PLA2R positive; secondary causes: solid tumors, HBV, SLE class V, NSAIDs; high thrombosis risk.", x: "Anti-PLA2R supports primary disease, but secondary causes matter because treating the trigger may resolve proteinuria.", t: "Trap: Do not call it primary without checking cancer risk, HBV, SLE, and drug exposures.", m: "Membranous: PLA2R plus malignancy-HBV-SLE-NSAID check",
          tb: { h: ["Cause", "Clue", "Action"], r: [["Primary", "Anti-PLA2R", "Risk stratify"], ["Malignancy", "Older adult", "Cancer screening"], ["HBV", "Viral risk", "HBV testing"], ["SLE class V", "Autoimmune signs", "ANA, complements"], ["NSAIDs", "Drug exposure", "Stop NSAID"]] } },
        { f: "Why is nephrotic syndrome hypercoagulable?", b: "Urinary loss of antithrombin III (and proteins C/S) plus increased hepatic clotting factors — renal vein thrombosis, DVT/PE.", x: "Loss of anticoagulant proteins plus hepatic procoagulant production makes membranous especially prone to renal vein thrombosis.", t: "Trap: Flank pain/hematuria in nephrotic syndrome may be renal vein thrombosis, not stones alone.", m: "Nephrotic loses anticoagulants in urine: clot risk rises" }
      ]
    },
    {
      id: "heme-hemochromatosis",
      system: "HEME",
      task: "TEST",
      vignette: "A 51-year-old man of Northern European ancestry has fatigue and pain in the second and third metacarpophalangeal joints. He recently developed type 2 diabetes. ALT is 68 U/L. Fasting transferrin saturation is 72% and ferritin is 860 ng/mL. He drinks alcohol rarely and has had no transfusions.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "HFE gene testing.",
        "Bone marrow biopsy.",
        "Deferoxamine chelation.",
        "Abdominal CT."
      ],
      correct: 0,
      explanation: "A fasting <strong>transferrin saturation &gt; 45%</strong> with high ferritin, plus <strong>2nd/3rd MCP arthropathy</strong>, diabetes, and elevated ALT, suggests <strong>hereditary hemochromatosis</strong>. Confirm with <strong>HFE genotyping</strong>; most patients are <strong>C282Y homozygotes</strong>. If ferritin is <strong>&gt; 1,000 ng/mL</strong> or liver enzymes are elevated, assess fibrosis (elastography/MRI or biopsy) because cirrhosis risk rises. Treatment is <strong>therapeutic phlebotomy</strong> to ferritin 50–100 ng/mL. Chelation is for transfusional overload or patients who cannot undergo phlebotomy.",
      flashcards: [
        { f: "What are the screening labs for hereditary hemochromatosis?", b: "Fasting transferrin saturation (> 45%) and ferritin → HFE genotype (C282Y homozygous most common).", x: "Transferrin saturation rises before ferritin; ferritin also increases with inflammation or liver injury, so genotype confirms HFE disease.", t: "Trap: High ferritin alone is nonspecific; look for TSAT >45% before HFE testing.", m: "Iron screen: TSAT first, ferritin second, HFE confirms",
          tb: { h: ["Test", "Abnormal", "Meaning"], r: [["TSAT", ">45%", "Best screen"], ["Ferritin", "High", "Iron burden"], ["HFE genotype", "C282Y homozygote", "Confirms common HFE"], ["Fibrosis check", "Ferritin >1000", "Cirrhosis risk"]] } },
        { f: "What is the treatment of hereditary hemochromatosis?", b: "Weekly phlebotomy until ferritin 50–100 ng/mL, then maintenance — chelation only if phlebotomy is impossible.", x: "Removing iron prevents cirrhosis, diabetes progression, and cardiomyopathy if started before irreversible organ damage.", t: "Trap: Chelation is mainly for transfusional overload or inability to phlebotomize, not routine HFE disease.", m: "Bleed iron down to ferritin 50–100" },
        { f: "Classic clinical features of hemochromatosis?", b: "Cirrhosis/HCC, diabetes, bronze skin, hypogonadism, cardiomyopathy, and 2nd/3rd MCP arthropathy with CPPD/chondrocalcinosis.", x: "Iron deposits in endocrine, hepatic, cardiac, skin, and joint tissues; MCP arthropathy is a classic clue.", t: "Trap: Knee CPPD alone is common; 2nd/3rd MCP disease plus diabetes/liver tests points to hemochromatosis.", m: "Bronze diabetes plus 2nd/3rd MCPs points to iron overload" }
      ]
    },
    {
      id: "heme-cancer-vte",
      system: "HEME",
      task: "RX",
      vignette: "A 61-year-old woman with metastatic breast cancer receiving chemotherapy develops left leg swelling; duplex ultrasound shows a femoral-popliteal DVT. Creatinine clearance is 78 mL/min, platelets 210,000/µL, and she has no bleeding history or GI/GU tumor involvement. She is hemodynamically stable.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Warfarin for 3 months, then ultrasound-guided reassessment.",
        "IVC filter placement with prophylactic-dose enoxaparin.",
        "Apixaban for 3 months, then discontinue anticoagulation.",
        "Apixaban for at least 6 months; reassess with active cancer."
      ],
      correct: 3,
      explanation: "For <strong>cancer-associated VTE</strong>, apixaban or another suitable DOAC, or LMWH, is generally preferred over warfarin. Treat for at least <strong>6 months</strong> and continue while cancer is active when the recurrence benefit outweighs bleeding risk, reassessing periodically. Apixaban is appropriate here because renal function and platelets are adequate and no high-risk mucosal lesion or interacting drug is identified. <strong>LMWH is often favored for active luminal GI/GU lesions or high mucosal bleeding risk</strong>; apixaban is not universally safe in those settings. Edoxaban requires initial parenteral anticoagulation. A filter is not indicated when anticoagulation can be given.",
      flashcards: [
        { f: "How is an anticoagulant selected for cancer-associated VTE?", b: "Use a suitable DOAC or LMWH; favor LMWH when mucosal bleeding risk or drug interactions make a DOAC unsafe.", x: "Apixaban has favorable trial bleeding data but still needs individualized assessment in active GI/GU lesions. Edoxaban requires at least 5 days of parenteral anticoagulation first.", t: "Trap: Severe renal impairment can limit both DOACs and LMWH; UFH may be preferable rather than blindly dose-adjusting LMWH.", m: "Cancer clot: balance recurrence, mucosa, kidneys, interactions",
          tb: { h: ["Scenario", "Consideration"], r: [["Most cancer VTE", "DOAC or LMWH"], ["High-risk GI/GU lesion", "Often favor LMWH"], ["Severe renal impairment", "Individualize; consider UFH"], ["Major active bleeding", "Hold and reassess; filter selectively"]] } },
        { f: "How long is cancer-associated VTE treated?", b: "At least 6 months, then continue with active cancer when benefit outweighs bleeding risk.", x: "Reassess cancer activity, treatment, bleeding, renal function, and patient preferences periodically; continuation is not an irrevocable lifelong commitment.", t: "Trap: A fixed 3-month provoked-VTE course is usually insufficient while cancer remains active.", m: "Treat active cancer risk; reassess the balance" },
        { f: "When is an IVC filter indicated?", b: "Acute proximal DVT/PE with an absolute contraindication to anticoagulation (e.g., active major bleeding) — remove when anticoagulation is possible.", x: "Filters reduce embolization only when anticoagulation cannot be given; they raise DVT risk if left in place.", t: "Trap: Recurrent VTE on inadequate anticoagulation is managed by optimizing/changing anticoagulant, not automatic filter.", m: "Filter only when anticoagulation is impossible" }
      ]
    },
    {
      id: "onc-irae-colitis",
      system: "ONC",
      task: "RX",
      vignette: "A 59-year-old woman with metastatic melanoma received her third cycle of ipilimumab plus nivolumab 3 weeks ago. She now has 8 watery stools per day above baseline with crampy abdominal pain for 4 days. Temperature 37.6 °C, BP 112/70 mm Hg. Stool C. difficile and enteric pathogen panel are negative. CT shows diffuse colonic wall thickening without perforation.",
      leadIn: "What is the most appropriate management?",
      options: [
        "Loperamide and oral hydration, continuing immunotherapy at the current dose.",
        "Hold immunotherapy and start IV methylprednisolone 1–2 mg/kg/day.",
        "Urgent surgical consultation for total colectomy.",
        "Oral vancomycin for presumed Clostridioides difficile colitis."
      ],
      correct: 1,
      explanation: "Diarrhea ≥ 7 stools/day above baseline with pain is <strong>grade 3 immune checkpoint inhibitor colitis</strong>. After excluding infection: <strong>hold the checkpoint inhibitor</strong> and give <strong>high-dose glucocorticoids</strong> (IV methylprednisolone 1–2 mg/kg/day). If no response in <strong>48–72 h</strong>, add <strong>infliximab or vedolizumab</strong>. Combination CTLA-4 + PD-1 therapy carries the highest irAE rates. Antimotility agents alone can mask progression to toxic megacolon.",
      flashcards: [
        { f: "What is the general approach to nonendocrine immune checkpoint toxicities?", b: "Usually monitor grade 1; hold for grade 2; hold and give high-dose steroids for grade 3; usually discontinue for grade 4.", x: "Treatment is organ-specific: cardiac, neurologic, or hematologic toxicities may require urgent action even at low grade. Grade 3 colitis usually requires IV methylprednisolone 1–2 mg/kg/day.", t: "Trap: Do not apply a generic grade table to myocarditis or hormone deficiency without organ-specific guidance.", m: "Grade matters, but the organ matters too",
          tb: { h: ["Typical nonendocrine grade", "General approach"], r: [["1", "Monitor; exceptions by organ"], ["2", "Hold; consider steroids"], ["3", "Hold; high-dose steroids"], ["4", "Usually permanently discontinue"]] } },
        { f: "Steroid-refractory checkpoint inhibitor colitis treatment?", b: "Infliximab (or vedolizumab) if no improvement after 48–72 h of IV glucocorticoids.", x: "TNF or gut-selective integrin blockade is used when steroid response is inadequate to prevent perforation/megacolon.", t: "Trap: Avoid infliximab in significant immune-mediated hepatitis; vedolizumab may be preferred for gut-limited disease.", m: "Steroid-refractory ICI colitis: 48–72 hours to biologic rescue" },
        { f: "How are ICI endocrinopathies managed?", b: "Replace deficient hormones; immunotherapy can often resume after stabilization. Adrenal crisis needs stress-dose hydrocortisone and fluids.", x: "Most uncomplicated thyroid or pituitary deficiencies do not benefit from immunosuppressive high-dose steroids. Consider them for hypophysitis with mass effect or severe headache, not routine hormone deficiency.", t: "Trap: Treat adrenal insufficiency before starting levothyroxine when both deficiencies are present.", m: "Replace endocrine loss; steroids first if cortisol is low" }
      ]
    },
    {
      id: "neuro-gbs",
      system: "NEURO",
      task: "RX",
      vignette: "A 36-year-old man had diarrhea 3 weeks ago. Over 5 days he develops tingling in his feet followed by symmetric ascending leg weakness; he now cannot rise from a chair. Reflexes are absent in all four limbs. Forced vital capacity is 28 mL/kg. Cerebrospinal fluid shows protein 168 mg/dL with 2 white cells/µL.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "IVIG or plasma exchange with respiratory monitoring.",
        "IV methylprednisolone with serial respiratory monitoring.",
        "Pyridostigmine with serial respiratory monitoring.",
        "Supportive inpatient care without immune-directed therapy."
      ],
      correct: 0,
      explanation: "Rapidly progressive symmetric ascending weakness with <strong>areflexia</strong> after <strong>Campylobacter</strong>-like diarrhea, and CSF <strong>albuminocytologic dissociation</strong> (high protein, normal cells) = <strong>Guillain-Barré syndrome</strong>. Treat nonambulatory patients within 2–4 weeks with <strong>IVIG or plasma exchange</strong> (equally effective; not combined). <strong>Glucocorticoids are ineffective</strong>. Admit with monitoring of <strong>FVC, NIF, and autonomic instability</strong>; intubate using the 20/30/40 rule.",
      flashcards: [
        { f: "What are the key features of Guillain-Barré syndrome?", b: "Ascending symmetric weakness, areflexia, CSF high protein with normal cells; triggers: Campylobacter, viral illness; autonomic instability.", x: "Albuminocytologic dissociation appears after the first week; early CSF can be normal despite GBS.", t: "Trap: Many CSF WBCs suggest HIV, Lyme, malignancy, or infection rather than typical GBS.", m: "GBS: ascending weakness, areflexia, albuminocytologic dissociation" },
        { f: "What is the 20/30/40 warning rule in neuromuscular respiratory failure?", b: "FVC <20 mL/kg, MIP weaker than −30 cm H₂O, or MEP <40 cm H₂O signals high respiratory risk.", x: "Use serial mechanics together with bulbar weakness, cough, secretions, fatigue, and rapid decline to decide on early elective intubation.", t: "Trap: These are warning thresholds, not automatic intubation criteria; normal oxygen saturation can be falsely reassuring.", m: "20-30-40 warns before oxygen falls",
          tb: { h: ["Measure", "Warning threshold", "Meaning"], r: [["FVC", "<20 mL/kg", "Low reserve"], ["MIP", "Weaker than −30", "Weak inspiration"], ["MEP", "<40 cm H₂O", "Weak cough"], ["Oximetry", "May remain normal", "Late warning"]] } },
        { f: "What is the treatment of Guillain-Barré syndrome?", b: "IVIG or plasma exchange (equivalent; not combined) — glucocorticoids do not help.", x: "IVIG and plasma exchange remove or neutralize pathogenic antibodies; combining them adds risk without benefit.", t: "Trap: Steroids help many inflammatory neurologic diseases but not Guillain-Barré syndrome.", m: "GBS rescue is IVIG or exchange, never both, never steroids" }
      ]
    },
    {
      id: "neuro-migraine-cad",
      system: "NEURO",
      task: "RX",
      vignette: "A 54-year-old woman with episodic migraine without aura (3 attacks per month) had an NSTEMI treated with a drug-eluting stent 8 months ago. She takes aspirin, clopidogrel, atorvastatin, and metoprolol. Acetaminophen does not relieve her attacks. She asks for a more effective acute migraine treatment.",
      leadIn: "What is the most appropriate acute therapy?",
      options: [
        "Oral sumatriptan at onset of an attack.",
        "Intranasal dihydroergotamine at onset of an attack.",
        "A gepant (e.g., rimegepant or ubrogepant).",
        "Butalbital-acetaminophen-caffeine for acute attacks."
      ],
      correct: 2,
      explanation: "<strong>Triptans and ergots are vasoconstrictors</strong> and are contraindicated in <strong>coronary, cerebrovascular, or peripheral vascular disease</strong> and uncontrolled hypertension. <strong>Gepants</strong> (oral CGRP receptor antagonists) and <strong>lasmiditan</strong> (5-HT1F agonist) lack vasoconstriction and are appropriate. NSAIDs are a concern with dual antiplatelet therapy. <strong>Butalbital and opioids</strong> are discouraged because of dependence and <strong>medication-overuse headache</strong>.",
      flashcards: [
        { f: "When are triptans contraindicated?", b: "Coronary artery disease, prior stroke/TIA, PAD, uncontrolled hypertension, hemiplegic/brainstem aura — use gepants or lasmiditan instead.", x: "Triptans and ergots constrict cranial and coronary vessels; CGRP antagonists and lasmiditan avoid vasoconstriction.", t: "Trap: Chest pressure after triptan in CAD is not benign; choose nonvasoconstrictive acute therapy.", m: "CAD migraine: no constrictors; use gepants or lasmiditan" },
        { f: "When is migraine preventive therapy indicated?", b: "≥ 4 headache days/month or disabling attacks despite acute therapy — propranolol/metoprolol, topiramate, amitriptyline, CGRP mAbs.", x: "Prevention is chosen when attack frequency or disability makes acute-only therapy unsafe or ineffective.", t: "Trap: Do not use opioids or butalbital as prevention; they worsen chronification and overuse headache.", m: "Four headache days a month is the prevention trigger" },
        { f: "What defines medication-overuse headache?", b: "Headache ≥15 days/month with regular acute-drug overuse for more than 3 months: simple analgesics ≥15 days/month or triptans/opioids/combination agents ≥10.", x: "The threshold counts medication-use days rather than tablets. Evaluate the underlying headache disorder and use prevention with a safe withdrawal plan.", t: "Trap: Opioid or barbiturate withdrawal may require tapering and supervised care, not abrupt unsupervised discontinuation.", m: "Overuse for three months: simple 15, triptan/combo 10" }
      ]
    },
    {
      id: "psych-serotonin",
      system: "PSYCH",
      task: "DX",
      vignette: "A 42-year-old woman taking escitalopram for depression was started on tramadol for back pain 2 days ago. Over 12 hours she develops agitation, sweating, diarrhea, and tremor. Temperature 38.9 °C, HR 128/min, BP 162/94 mm Hg. Pupils are dilated. She has hyperreflexia with inducible ankle clonus and ocular clonus, more prominent in the legs. There is no lead-pipe rigidity.",
      leadIn: "What is the most likely diagnosis?",
      options: [
        "Neuroleptic malignant syndrome.",
        "Anticholinergic toxicity.",
        "Malignant hyperthermia.",
        "Serotonin syndrome."
      ],
      correct: 3,
      explanation: "Rapid onset after adding a serotonergic drug, with <strong>clonus (inducible, ocular) and hyperreflexia, especially in the lower extremities</strong>, plus autonomic instability, diarrhea, and mydriasis = <strong>serotonin syndrome</strong> (Hunter criteria). <strong>NMS</strong> develops over days on dopamine antagonists, with <strong>lead-pipe rigidity and bradyreflexia</strong>. Anticholinergic toxicity causes <strong>dry</strong> skin, urinary retention, and absent bowel sounds. Treatment: <strong>stop serotonergic agents</strong>, give <strong>benzodiazepines</strong> and supportive care, and add <strong>cyproheptadine</strong> if symptoms persist.",
      flashcards: [
        { f: "Serotonin syndrome vs neuroleptic malignant syndrome?", b: "SS: hours, serotonergic drug, clonus/hyperreflexia, diarrhea, mydriasis. NMS: days, dopamine antagonist, lead-pipe rigidity, bradyreflexia, high CK.", x: "Clonus and hyperreflexia reflect excess serotonergic neuromuscular excitation; NMS is dopamine blockade with rigidity.", t: "Trap: Lead-pipe rigidity and very high CK after antipsychotic exposure points to NMS, not serotonin syndrome.", m: "Serotonin is fast and twitchy; NMS is slow and rigid",
          tb: { h: ["Feature", "Serotonin syndrome", "NMS"], r: [["Onset", "Hours", "Days"], ["Trigger", "Serotonergic drug", "Dopamine blocker"], ["Tone/reflexes", "Clonus, hyperreflexia", "Lead-pipe, bradyreflexia"], ["GI/pupils", "Diarrhea, mydriasis", "Often absent"], ["CK", "Mild to high", "Often very high"]] } },
        { f: "Which combinations carry important serotonin-toxicity risk?", b: "SSRIs/SNRIs combined with MAOIs, linezolid, methylene blue, tramadol, meperidine, or dextromethorphan.", x: "Excess serotonin is especially hazardous when reuptake inhibition is combined with impaired metabolism. Fentanyl and methadone also warrant interaction review.", t: "Trap: Triptan–SSRI toxicity is uncommon; do not treat every theoretical interaction as an equally high-risk combination.", m: "Reuptake block plus metabolism block overheats serotonin" },
        { f: "How is serotonin syndrome treated?", b: "Stop serotonergic drugs, benzodiazepines, cooling and supportive care, cyproheptadine if persistent; severe hyperthermia → sedation, paralysis, intubation.", x: "Supportive care reduces adrenergic drive; cyproheptadine blocks serotonin receptors when symptoms persist.", t: "Trap: Antipyretics do not fix hyperthermia from muscle activity; cool, sedate, and paralyze if severe.", m: "Stop, sedate, cool; cyproheptadine if symptoms persist" }
      ]
    },
    {
      id: "derm-scabies",
      system: "DERM",
      task: "RX",
      vignette: "A 34-year-old man has 3 weeks of intensely itchy rash that is worst at night. His partner and 6-year-old child are also itchy. Examination shows excoriated papules and short, thin, wavy gray lines in the finger web spaces and on the flexor wrists, with papules on the penile shaft and around the umbilicus. The face and scalp are spared.",
      leadIn: "What is the most appropriate management?",
      options: [
        "Topical triamcinolone for the patient only, since contacts are asymptomatic.",
        "Permethrin 5% cream for the patient and all household contacts, repeated in 1–2 weeks.",
        "Oral cephalexin for presumed secondary bacterial impetiginization.",
        "Oral terbinafine for 2 weeks for presumed widespread dermatophyte infection."
      ],
      correct: 1,
      explanation: "Nocturnal pruritus, <strong>burrows</strong> in web spaces and wrists, genital papules, and itchy household contacts = <strong>scabies</strong>, which can be confirmed by skin scraping. Apply <strong>permethrin 5% cream</strong> from neck to toes, repeat in 1–2 weeks, and <strong>treat all close contacts simultaneously</strong>. Wash bedding and clothing on hot cycles or seal them for 72 hours. <strong>Oral ivermectin</strong> is an alternative. <strong>Crusted (Norwegian) scabies</strong> in immunocompromised patients needs ivermectin plus topical therapy and contact precautions. Itch can persist for weeks after cure.",
      flashcards: [
        { f: "What is the classic presentation of scabies?", b: "Severe nocturnal itch, burrows in finger webs/wrists, papules on genitals, axillae, waistband; household members affected.", x: "Mites burrow in thin stratum corneum areas; nocturnal itch and clustered household symptoms are key clues.", t: "Trap: Eczema is not usually contagious; household itch should trigger scabies treatment.", m: "Scabies itch is worse at night and shared at home" },
        { f: "How is scabies treated?", b: "Permethrin 5% neck-to-toe, repeat in 7–14 days (or oral ivermectin ×2); treat all contacts at once; hot-wash bedding.", x: "Eggs may survive initial treatment, so repeating therapy and treating contacts prevents reinfestation.", t: "Trap: Persistent itch for weeks can be post-scabetic hypersensitivity, not treatment failure by itself.", m: "Treat everyone, repeat in 1–2 weeks" },
        { f: "What is crusted (Norwegian) scabies?", b: "Hyperinfestation with thick crusts in immunocompromised/institutionalized patients — highly contagious; oral ivermectin + topical permethrin.", x: "Impaired immunity permits massive mite burden with minimal itch; crusts shed mites and drive outbreaks.", t: "Trap: Standard single permethrin treatment is insufficient for crusted scabies; add oral ivermectin and precautions.", m: "Crusted scabies is mite overload: oral plus topical and precautions" }
      ]
    },
    {
      id: "obgyn-contraception-aura",
      system: "OBGYN",
      task: "RX",
      vignette: "A 31-year-old woman requests contraception. She has migraine with visual aura (zigzag lines preceding headache) several times a year. She does not smoke and BP is 118/74 mm Hg. She would like a highly effective, reversible method and may want pregnancy in 3–4 years.",
      leadIn: "What is the most appropriate contraceptive method?",
      options: [
        "Levonorgestrel intrauterine device.",
        "Combined oral contraceptive pill.",
        "Combined vaginal ring.",
        "Transdermal estrogen-progestin patch."
      ],
      correct: 0,
      explanation: "<strong>Migraine with aura</strong> is a <strong>US MEC category 4</strong> (unacceptable risk) for <strong>estrogen-containing contraception</strong> because of increased ischemic stroke risk. The pill, ring, and patch all contain estrogen. <strong>Progestin-only or nonhormonal</strong> methods are safe. <strong>LARC</strong> (levonorgestrel IUD, copper IUD, etonogestrel implant) is the most effective reversible option (&lt; 1% failure per year), and fertility returns promptly after removal.",
      flashcards: [
        { f: "When are estrogen-containing contraceptives contraindicated (US MEC 4)?", b: "Migraine with aura, smoker ≥ 35 (≥ 15 cig/day), prior VTE/thrombophilia, BP ≥ 160/100, < 21 days postpartum, current breast cancer, complicated valvular disease, decompensated cirrhosis.", x: "Estrogen increases thrombotic stroke risk; aura independently raises stroke risk, making the combination unacceptable.", t: "Trap: Migraine without aura is different; aura makes combined pill, patch, and ring contraindicated.", m: "Aura means no estrogen",
          tb: { h: ["Condition", "US MEC", "Reason"], r: [["Migraine with aura", "4", "Stroke risk"], ["Smoker ≥35, ≥15/d", "4", "Arterial risk"], ["BP ≥160/100", "4", "Stroke and MI"], ["VTE high recurrence", "4", "Thrombosis"], ["Thrombophilia", "4", "Thrombosis"], ["Current breast cancer", "4", "Hormone sensitive"]] } },
        { f: "What are the most effective reversible contraceptives?", b: "LARC: copper IUD, levonorgestrel IUD, etonogestrel implant — < 1% failure per year.", x: "LARC methods avoid user adherence and have failure rates similar to sterilization but are reversible.", t: "Trap: Depot medroxyprogesterone is effective but not a LARC and can delay fertility return.", m: "LARC forgets nothing: IUDs and implant under 1%" },
        { f: "What are the timing rules for emergency contraception?", b: "Copper IUD within 5 days; ulipristal or levonorgestrel pills as soon as possible within 120 hours.", x: "The copper IUD is most effective. Ulipristal is more effective than levonorgestrel at 3–5 days; levonorgestrel efficacy may be lower with obesity. Pills delay ovulation and do not terminate an established pregnancy.", t: "Trap: After ulipristal, wait 5 days before starting hormonal contraception, then use barrier backup for 7 days after starting it.", m: "EC: act now, five-day window" }
      ]
    },
    {
      id: "geri-dementia-feeding",
      system: "GERI",
      task: "NEXT",
      vignette: "An 86-year-old woman with advanced Alzheimer dementia lives in a nursing home. She is nonverbal, bedbound, and dependent for all care, and has had two aspiration pneumonias in 4 months. She eats less and has lost 8% of her body weight. Her daughter, the health care proxy, asks whether a feeding tube would help her live longer and prevent pneumonia.",
      leadIn: "What is the most appropriate recommendation?",
      options: [
        "Percutaneous endoscopic gastrostomy (PEG) tube to prevent aspiration and maintain nutrition.",
        "Nasogastric tube feeding as a trial for 2–4 weeks.",
        "Total parenteral nutrition through a peripherally inserted central catheter.",
        "Careful hand feeding focused on comfort, and discussion of hospice referral."
      ],
      correct: 3,
      explanation: "In <strong>advanced dementia</strong>, tube feeding <strong>does not prolong survival, prevent aspiration pneumonia, heal pressure injuries, or improve comfort</strong>, and it increases agitation, restraint use, and tube complications. The AGS recommends <strong>careful hand feeding</strong> instead. Eating problems and recurrent infections mark the terminal phase, so this is a time for <strong>goals-of-care discussion</strong> and <strong>hospice</strong> (eligible with an expected prognosis of ≤ 6 months; dementia FAST stage 7).",
      flashcards: [
        { f: "Does tube feeding help in advanced dementia?", b: "No — no survival, aspiration, pressure ulcer, or comfort benefit; careful hand feeding is recommended (AGS, Choosing Wisely).", x: "Aspiration often comes from saliva/reflux and impaired swallow, not just food route, so tubes do not remove risk.", t: "Trap: A feeding tube may increase restraints and aspiration; it is not aspiration prophylaxis in advanced dementia.", m: "Advanced dementia: hand feeding over tube feeding" },
        { f: "What is the Medicare hospice eligibility criterion?", b: "Initial certification by the hospice physician and the attending physician, if there is one, of prognosis ≤6 months, with election of hospice care.", x: "Eligibility is prognosis-based and can coexist with comfort feeding, symptom-directed medications, and other goal-concordant care within the hospice plan.", t: "Trap: Hospice is not only for the last days; continued eligibility allows recertification beyond 6 months.", m: "Hospice is a prognosis, not a countdown" },
        { f: "Which features suggest end-stage dementia (hospice eligible)?", b: "FAST stage 7: < 6 words, nonambulatory, incontinent, dependent in all ADLs, plus complications (aspiration, sepsis, weight loss > 10%, pressure ulcers).", x: "FAST 7 marks profound functional loss; complications identify high near-term mortality in dementia.", t: "Trap: Memory loss alone is not hospice-level dementia; look for nonambulation, minimal speech, dependence, and complications.", m: "FAST 7 plus complications signals end-stage dementia" }
      ]
    },
    {
      id: "found-capacity",
      system: "FOUND",
      task: "NEXT",
      vignette: "A 74-year-old man with diabetes has wet gangrene of the right forefoot. Vascular surgery recommends below-knee amputation and explains that without it he may develop sepsis and die. He is alert and oriented. He accurately restates the risks of refusing, says he understands he could die, and explains that he would rather accept that risk than lose his leg, consistent with values he has expressed for years. His son insists that surgery proceed.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Seek an emergency court order authorizing amputation.",
        "Obtain the son's consent as the available family surrogate.",
        "Honor informed refusal and offer the care he accepts.",
        "Defer the decision pending a formal psychiatry assessment."
      ],
      correct: 2,
      explanation: "<strong>Decision-making capacity</strong> is decision-specific and can be assessed by <strong>any treating physician</strong>. Its four elements are: <strong>communicate a choice, understand the information, appreciate how it applies to oneself, and reason consistently with one's values</strong>. He has all four, so his <strong>informed refusal</strong> must be respected, even if it may lead to death and his family disagrees. Psychiatry consultation is for difficult or uncertain cases, not a requirement. Keep the conversation open and provide the treatment he accepts.",
      flashcards: [
        { f: "What are the four elements of decision-making capacity?", b: "Communicates a clear choice, understands the relevant information, appreciates the situation and consequences, and reasons about options consistently with values.", x: "Capacity is about the process of deciding, not whether the clinician agrees with the decision.", t: "Trap: A risky refusal is not incapacity if the patient understands, appreciates, reasons, and communicates.", m: "Capacity has 4 Cs: choice, comprehension, consequences, consistency" },
        { f: "How does medical decision-making capacity differ from legal competence?", b: "Capacity is a clinical, decision-specific assessment; legal competence and guardianship are determined under jurisdictional law.", x: "Treating clinicians assess capacity. Court orders can have a limited scope, and capacity may fluctuate or differ across decisions.", t: "Trap: Psychiatry is helpful for uncertainty but is not required for every capacity determination.", m: "Capacity is clinical; legal authority depends on law" },
        { f: "Who decides for a patient who lacks capacity?", b: "Honor applicable advance directives and the authorized surrogate; without an appointed proxy, follow the jurisdiction's legal hierarchy.", x: "The scope of guardianship orders and proxy documents matters. Use substituted judgment based on known patient values, then best interests if values are unknown.", t: "Trap: A universal spouse–children–parents hierarchy is not valid in every state.", m: "Patient values first, lawful surrogate second" }
      ]
    },
    {
      id: "found-periop-doac",
      system: "FOUND",
      task: "NEXT",
      vignette: "A 70-year-old man with nonvalvular atrial fibrillation (CHA₂DS₂-VASc 3) takes apixaban 5 mg twice daily. He is scheduled for elective total knee arthroplasty under neuraxial anesthesia. Creatinine clearance is 72 mL/min. He has no history of stroke or VTE.",
      leadIn: "What is the most appropriate perioperative anticoagulation plan?",
      options: [
        "Hold apixaban 72 hours, bridge with therapeutic enoxaparin, and restart after 48 hours.",
        "Hold apixaban 72 hours without bridging; restart after 48–72 hours once safe.",
        "Hold apixaban 24 hours without bridging and restart 24 hours after surgery.",
        "Hold apixaban 48 hours without bridging and restart the evening after surgery."
      ],
      correct: 1,
      explanation: "For <strong>therapeutic-dose apixaban with neuraxial anesthesia</strong>, hold at least <strong>72 hours</strong> before the block (ASRA). This patient does <strong>not need heparin bridging</strong>; bridging during a short DOAC interruption increases bleeding without established benefit. Resume therapeutic anticoagulation <strong>48–72 hours</strong> after high-bleeding-risk surgery only when hemostasis is adequate and neuraxial catheter timing requirements are satisfied. Current ASRA guidance requires needle placement or catheter removal at least 24 hours before the first postoperative high-dose apixaban dose. Prophylactic-dose postoperative thromboprophylaxis may be used when safe until full-dose anticoagulation resumes; this is distinct from therapeutic bridging.",
      flashcards: [
        { f: "How is apixaban interrupted for elective procedures with normal renal function?", b: "Typically 1 day for low bleeding risk, 2 days for high bleeding risk, and at least 72 hours for therapeutic-dose neuraxial procedures.", x: "PAUSE supports short interruptions without therapeutic bridging; neuraxial safety follows separate ASRA dose-specific recommendations.", t: "Trap: Resume only after hemostasis and safe catheter timing; high-dose apixaban requires at least 24 hours after needle placement or catheter removal.", m: "DOAC pause depends on procedure and dose",
          tb: { h: ["Procedure", "Typical hold", "Typical restart"], r: [["Low bleeding risk", "1 day", "At least 24 h"], ["High bleeding risk", "2 days", "48–72 h"], ["High-dose apixaban neuraxial", "At least 72 h", "Hemostasis plus catheter safety"]] } },
        { f: "Is therapeutic heparin bridging routine when warfarin is interrupted?", b: "No. Avoid bridging for most AF patients; exceptionally high thrombotic-risk cases need individualized specialist planning.", x: "CHEST recommends against routine bridging, including conditional recommendations in mechanical-valve and VTE patients. Other guidance permits selected very-high-risk exceptions; recent stroke/VTE and high-risk valves require nuanced assessment.", t: "Trap: A mechanical valve or high CHA₂DS₂-VASc score is not an automatic instruction to bridge, and BRIDGE did not study mechanical valves.", m: "No routine bridge; individualize exceptional risk" },
        { f: "How long before surgery is warfarin stopped?", b: "5 days before; check INR the day before (vitamin K 1–2 mg orally if INR > 1.5); resume 12–24 h after if hemostasis is adequate.", x: "Warfarin takes days for clotting factors to recover; low-dose vitamin K corrects residual INR without prolonged reversal.", t: "Trap: Do not restart before hemostasis; timing depends on bleeding risk and surgical control.", m: "Warfarin stop 5; INR check 1; restart after hemostasis" }
      ]
    },
    {
      id: "found-aaa-screen",
      system: "FOUND",
      task: "RISK",
      vignette: "A 68-year-old man presents for a wellness visit. He smoked 1 pack per day for 15 years and quit 18 years ago. He has hypertension controlled with amlodipine. He has no abdominal or back pain, and his abdominal examination is unremarkable. He has never had abdominal imaging.",
      leadIn: "Which screening test is most appropriate?",
      options: [
        "One-time abdominal aortic ultrasound.",
        "Annual low-dose chest CT.",
        "Screening ankle-brachial index.",
        "Screening carotid duplex ultrasound."
      ],
      correct: 0,
      explanation: "USPSTF: <strong>one-time ultrasound screening for abdominal aortic aneurysm</strong> in <strong>men aged 65–75 who have ever smoked</strong> (≥ 100 cigarettes in a lifetime; grade B). Men who never smoked are screened selectively (C); women who never smoked are not screened (D). He does <strong>not</strong> qualify for lung cancer screening (requires <strong>≥ 20 pack-years</strong> and quitting <strong>within the past 15 years</strong>). ABI and carotid ultrasound are not recommended for screening asymptomatic adults.",
      flashcards: [
        { f: "Who should be screened for abdominal aortic aneurysm (USPSTF)?", b: "One-time ultrasound for men 65–75 who have ever smoked (B); selective in never-smoking men (C); not in never-smoking women (D).", x: "Smoking is the strongest AAA risk factor; ultrasound is accurate, noninvasive, and done once for eligible men.", t: "Trap: A remote light smoking history still counts as ever smoked: ≥100 lifetime cigarettes.", m: "Men 65–75 who ever smoked get one AAA ultrasound",
          tb: { h: ["Group", "USPSTF", "Screening"], r: [["Men 65-75 ever smoked", "B", "One-time US"], ["Men 65-75 never smoked", "C", "Selective US"], ["Women never smoked", "D", "Do not screen"], ["Ever smoked", "≥100 cigarettes", "Counts as risk"]] } },
        { f: "When should an infrarenal AAA prompt repair evaluation?", b: "Symptoms attributable to the AAA, diameter ≥5.5 cm in men or about ≥5.0 cm in women, or rapid growth (≥0.5 cm in 6 months).", x: "Rupture risk depends on diameter, growth, symptoms, anatomy, and operative risk; rapid apparent growth should be confirmed and reviewed with vascular surgery.", t: "Trap: The commonly tested rapid-growth threshold is 0.5 cm in 6 months, not 0.5 cm in a year.", m: "AAA: 5.5 men, 5 women, half-centimeter in half-year" },
        { f: "Which screening tests are NOT recommended in asymptomatic adults?", b: "ABI for PAD, carotid duplex for stenosis, resting/exercise ECG in low-risk adults — USPSTF D or I.", x: "Screening low-risk asymptomatic adults can cause false positives and procedures without proven outcome benefit.", t: "Trap: Do not order carotid duplex for a bruit-free asymptomatic patient as routine screening.", m: "Do not screen quiet arteries just because ultrasound exists" }
      ]
    },
    {
      id: "crit-apap",
      system: "CRIT",
      task: "NEXT",
      vignette: "A 22-year-old woman presents to the emergency department saying she swallowed about 30 extra-strength acetaminophen tablets (500 mg each) 10 hours ago after an argument. She has mild nausea but is otherwise asymptomatic. Vital signs are normal. Serum acetaminophen level, liver chemistries, INR, and a co-ingestant screen have been sent.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Activated charcoal and await the acetaminophen level.",
        "Await the acetaminophen level and plot it on the Rumack-Matthew nomogram before treating.",
        "Hemodialysis.",
        "Start IV N-acetylcysteine now."
      ],
      correct: 3,
      explanation: "She ingested about <strong>15 g</strong> (&gt; 150 mg/kg) of acetaminophen. <strong>N-acetylcysteine</strong> (which replenishes glutathione) is nearly 100% hepatoprotective when started within <strong>8 hours</strong>. Because she is already at <strong>10 hours</strong>, <strong>start NAC immediately</strong> without waiting for the level, then use the level (4–24 h, Rumack-Matthew nomogram) to decide whether to continue. Activated charcoal helps only within about 1–4 h. Refer for liver transplant per <strong>King's College criteria</strong> (pH &lt; 7.30, or INR &gt; 6.5 + creatinine &gt; 3.4 + grade III/IV encephalopathy).",
      flashcards: [
        { f: "When is N-acetylcysteine started immediately in acetaminophen overdose?", b: "Presentation > 8 h after ingestion, unknown time, staggered ingestion, or any evidence of liver injury — do not wait for the level.", x: "NAC replenishes glutathione and is most protective before toxic NAPQI binds hepatocytes; delay worsens outcomes.", t: "Trap: If >8 hours or time unknown, start NAC before the acetaminophen level returns.", m: "After 8 hours, start NAC now" },
        { f: "How is the Rumack-Matthew nomogram used?", b: "Single acute ingestion only: plot a level drawn 4–24 h post-ingestion; above the treatment line (150 µg/mL at 4 h) → NAC.", x: "The nomogram predicts risk only after a single known-time ingestion once absorption should be measurable.", t: "Trap: Do not use the nomogram for chronic supratherapeutic, staggered, or unknown-time ingestions.", m: "Rumack-Matthew: one acute ingestion, known time, 4–24 hour level" },
        { f: "King's College criteria in acetaminophen-induced liver failure?", b: "Arterial pH < 7.30 after resuscitation, OR all of INR > 6.5, creatinine > 3.4 mg/dL, and grade III/IV encephalopathy → transplant listing.", x: "Severe acidosis or the INR/creatinine/encephalopathy triad predicts poor spontaneous survival.", t: "Trap: High aminotransferases alone are not the listing criterion; use Kings College markers of liver failure.", m: "King’s College: acid or INR-creatinine-encephalopathy triad",
          tb: { h: ["Criterion", "Threshold", "Action"], r: [["Acidosis", "pH <7.30", "List transplant"], ["INR", ">6.5", "Needs triad"], ["Creatinine", ">3.4 mg/dL", "Needs triad"], ["Encephalopathy", "Grade III/IV", "Needs triad"]] } }
      ]
    }
    ,

    /* ─────────────────────────────────────────────────────────────────
     * V2.5 expansion — 32 items across every system (thin categories
     * prioritized). Correct answers authored in A→D rotation.
     * ───────────────────────────────────────────────────────────────── */
    {
      id: "cv-stemi-lysis",
      system: "CV",
      task: "NEXT",
      vignette: "A 57-year-old man presents to a rural hospital 90 minutes after onset of crushing substernal chest pain. ECG shows 3-mm ST elevation in leads II, III, and aVF. The nearest PCI-capable center is a 2.5-hour transfer away. BP is 138/84 mm Hg. He has no history of stroke, bleeding, recent surgery, or head trauma. Aspirin has been given.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Fibrinolytic therapy within 30 minutes, then transfer to the PCI center.",
        "Transfer for primary PCI without fibrinolysis, with aspirin, anticoagulation, and continuous telemetry during transport.",
        "Serial troponins and stress testing if negative because he presented early after symptom onset.",
        "Start a heparin infusion and observe in the local ICU until transfer becomes available tomorrow."
      ],
      correct: 0,
      explanation: "<strong>Primary PCI</strong> is preferred for STEMI only if first medical contact-to-device time can be <strong>≤ 120 minutes</strong>. With an anticipated delay beyond that and symptom onset within 12 hours, give <strong>fibrinolytic therapy within 30 minutes of arrival</strong> (door-to-needle) unless contraindicated, then <strong>transfer to a PCI center</strong>: immediately for failed reperfusion (rescue PCI), otherwise angiography within <strong>2–24 hours</strong> (pharmacoinvasive strategy). Never delay reperfusion for troponin results in STEMI.",
      flashcards: [
        { f: "STEMI reperfusion: when PCI vs fibrinolysis?", b: "Primary PCI if first-contact-to-device ≤ 120 min (goal ≤ 90 min); otherwise fibrinolysis within 30 min of arrival if symptoms < 12 h.", x: "Myocardium is time-sensitive; when PCI delay exceeds 120 minutes, early lysis beats waiting in eligible patients.", t: "Trap: Do not wait for troponin when ECG shows STEMI; reperfusion is based on ECG and symptoms.", m: "STEMI clock: PCI ≤120 minutes or lysis in 30",
          tb: { h: ["Strategy", "Use when", "Time goal"], r: [["Primary PCI", "Device ≤120 min", "Goal ≤90 min"], ["Fibrinolysis", "PCI delay >120 min", "Door-needle ≤30 min"], ["Eligible lysis", "Symptoms <12 h", "No contraindication"], ["Troponin", "Do not wait", "ECG drives reperfusion"]] } },
        { f: "What are absolute contraindications to fibrinolysis?", b: "Any prior ICH, ischemic stroke < 3 months, structural cerebral vascular lesion or intracranial tumor, active bleeding, suspected aortic dissection, significant head/facial trauma < 3 months.", x: "Fibrinolytics can convert vulnerable intracranial or bleeding lesions into catastrophic hemorrhage.", t: "Trap: Suspected aortic dissection with ST elevation is a lysis contraindication; diagnose and treat dissection.", m: "Never lyse a brain bleed or a dissection" },
        { f: "What is the pharmacoinvasive strategy after fibrinolysis?", b: "Transfer to a PCI center for angiography within 2–24 h; immediate rescue PCI if < 50% ST resolution at 60–90 min or instability.", x: "Routine early angiography treats residual culprit stenosis after successful lysis and detects failed reperfusion.", t: "Trap: Successful lysis does not mean no cath; transfer for angiography within 2–24 hours.", m: "Lysis is a bridge to cath, not a replacement" }
      ]
    },
    {
      id: "cv-svt",
      system: "CV",
      task: "RX",
      vignette: "A 28-year-old woman has sudden-onset palpitations for 40 minutes. She is alert with BP 116/74 mm Hg and no chest pain or dyspnea. ECG shows a regular narrow-complex tachycardia at 186/min with no visible P waves. A modified Valsalva maneuver performed correctly does not terminate the rhythm. She has no asthma or heart transplant history.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Synchronized cardioversion at 50–100 J after procedural sedation.",
        "Adenosine 6 mg rapid IV push followed by a saline flush.",
        "IV amiodarone 150 mg over 10 minutes.",
        "Oral metoprolol and discharge with outpatient cardiology follow-up."
      ],
      correct: 1,
      explanation: "A stable, regular narrow-complex tachycardia without visible P waves is most likely <strong>AV nodal reentrant tachycardia (AVNRT)</strong>. Start with <strong>vagal maneuvers</strong> (modified Valsalva with leg raise is most effective), then <strong>adenosine 6 mg rapid IV push</strong> with a flush, then 12 mg if needed. Use IV diltiazem or beta-blockers if adenosine fails. <strong>Synchronized cardioversion</strong> is for <strong>hemodynamic instability</strong>. Long-term, <strong>catheter ablation</strong> is curative in over 95%.",
      flashcards: [
        { f: "Stepwise acute management of stable SVT?", b: "Vagal maneuvers → adenosine 6 mg rapid IV push (then 12 mg) → IV diltiazem/verapamil or beta-blocker → synchronized cardioversion if unstable or refractory.", x: "AVNRT depends on AV nodal conduction; vagal tone and adenosine transiently block the node to terminate it.", t: "Trap: Unstable tachycardia gets immediate synchronized cardioversion, not sequential drug trials.", m: "Stable SVT: vagal, adenosine, AV nodal blocker, shock if unstable",
          tb: { h: ["Step", "Stable SVT", "If fails"], r: [["1", "Vagal maneuvers", "Adenosine"], ["2", "Adenosine 6 mg", "Adenosine 12 mg"], ["3", "Diltiazem or beta-blocker", "Cardioversion"], ["Unstable", "Skip drugs", "Synchronized shock"]] } },
        { f: "Adenosine cautions?", b: "Transient asystole/flushing/chest pressure; lower dose (3 mg) via central line or after heart transplant or with dipyridamole/carbamazepine; caution in severe asthma.", x: "Adenosine has a very short half-life, requiring rapid push close to the heart and a flush.", t: "Trap: In irregular wide-complex tachycardia or preexcited AF, AV nodal blockade can be dangerous.", m: "Adenosine is an AV-node pause button" },
        { f: "Definitive therapy for recurrent AVNRT?", b: "Catheter ablation of the slow pathway — > 95% cure, low risk of AV block.", x: "Ablation targets the slow pathway while preserving normal AV conduction in most patients.", t: "Trap: Chronic beta-blockers can reduce episodes but are not definitive for symptomatic recurrent AVNRT.", m: "AVNRT cure: ablate the slow pathway" }
      ]
    },
    {
      id: "endo-subclinical-hypo",
      system: "ENDO",
      task: "NEXT",
      vignette: "A 71-year-old woman has a TSH of 6.8 µU/mL found on routine testing; free T4 is normal. She feels well and has no goiter. She is not planning pregnancy. Thyroid peroxidase antibodies are positive. She takes no amiodarone, lithium, or biotin and has not had a recent acute illness or iodinated contrast.",
      leadIn: "What is the most appropriate management?",
      options: [
        "Start levothyroxine 50 µg daily.",
        "Thyroid ultrasound to evaluate for nodules or thyroiditis.",
        "Repeat TSH and free T4 in 2–3 months; no treatment now.",
        "Start liothyronine (T3) because it acts faster than levothyroxine."
      ],
      correct: 2,
      explanation: "<strong>Subclinical hypothyroidism</strong> means high TSH with normal free T4. First <strong>repeat TSH and free T4 in 2–3 months</strong> to confirm persistence. In older adults with mild TSH elevation, levothyroxine has not improved symptoms or quality of life in trials. Persistent <strong>TSH ≥10</strong> generally favors treatment; lower values require individualized decisions. Pregnancy uses pregnancy-specific TSH thresholds and TPO status rather than treating every mild elevation automatically. Positive TPO antibodies predict progression, so continue monitoring. Ultrasound is unnecessary without a palpable nodule or goiter.",
      flashcards: [
        { f: "When is subclinical hypothyroidism generally treated?", b: "Persistent TSH ≥10 usually favors levothyroxine; lower levels require individualization. Pregnancy thresholds depend on trimester and TPO status.", x: "Mild TSH elevations often normalize, and treatment has not shown routine benefit in older adults with mild disease.", t: "Trap: Pregnancy planning or antibody positivity alone does not make every minimally elevated TSH a mandatory treatment indication.", m: "Confirm persistence; threshold and context decide",
          tb: { h: ["Situation", "Approach", "Note"], r: [["Persistent TSH ≥10", "Usually treat", "Individualize in very old/frail"], ["Pregnant/planning", "Specific guidance", "TSH range and TPO status"], ["Young symptomatic", "Consider", "Shared decision"], ["Older, TSH <10", "Usually observe", "TRUST no symptom benefit"]] } },
        { f: "What should be done before treating a mildly elevated TSH?", b: "Repeat TSH + free T4 in 2–3 months; exclude recovery from nonthyroidal illness, biotin interference, and drugs.", x: "Biotin and acute illness can distort labs; repeating avoids lifelong therapy for transient abnormalities.", t: "Trap: Do not order thyroid ultrasound just for abnormal TSH unless there is a nodule or goiter.", m: "Repeat before you replace" },
        { f: "Levothyroxine dosing pearls?", b: "Full replacement ~1.6 µg/kg/day in young healthy adults with overt hypothyroidism; start 12.5–25 µg/day in known CAD and titrate. Recheck TSH in 6–8 weeks.", x: "Take consistently on an empty stomach and separate calcium/iron by about 4 hours. PPIs can reduce absorption through gastric pH changes, not just simultaneous ingestion.", t: "Trap: Subclinical disease may need a smaller dose; full replacement in CAD can provoke angina or arrhythmia.", m: "Start low in CAD; wait 6–8 weeks for TSH" }
      ]
    },
    {
      id: "endo-incidentaloma",
      system: "ENDO",
      task: "TEST",
      vignette: "A 56-year-old man undergoes CT for kidney stones that incidentally shows a 2.4-cm homogeneous, well-circumscribed right adrenal mass with an unenhanced attenuation of 6 Hounsfield units. He has hypertension treated with amlodipine and lisinopril; potassium is 3.6 mEq/L. He has no cushingoid features or paroxysmal symptoms.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "CT-guided adrenal biopsy to exclude adrenocortical carcinoma.",
        "Laparoscopic adrenalectomy to remove the mass without further testing.",
        "Repeat adrenal CT in 6 months with no laboratory testing.",
        "1-mg overnight dexamethasone suppression test and aldosterone-to-renin ratio."
      ],
      correct: 3,
      explanation: "An <strong>adrenal incidentaloma</strong> needs two questions answered: <strong>is it malignant?</strong> and <strong>does it secrete hormones?</strong> A homogeneous lesion with <strong>≤ 10 HU</strong> on unenhanced CT is a lipid-rich <strong>benign adenoma</strong> regardless of size (ESE 2023), so no further imaging is required. Every incidentaloma needs a <strong>1-mg dexamethasone suppression test</strong> for autonomous cortisol secretion. Check <strong>plasma metanephrines</strong> only if the mass is <strong>&gt; 10 HU</strong> or there are adrenergic symptoms (ESE 2023), and an <strong>aldosterone-to-renin ratio</strong> if hypertension or hypokalemia is present. Biopsy is almost never indicated, and it is dangerous if pheochromocytoma has not been excluded.",
      flashcards: [
        { f: "What hormonal workup is used for an adrenal incidentaloma?", b: "Usually a 1-mg dexamethasone suppression test; metanephrines for lesions not typical of benign adenoma or suspicious symptoms; aldosterone-renin testing with hypertension or hypokalemia.", x: "ESE 2023 permits omitting dexamethasone testing in frail patients with limited life expectancy. Homogeneous ≤10 HU lesions usually do not need metanephrines.", t: "Trap: A benign imaging appearance does not exclude cortisol or aldosterone secretion.", m: "Adrenal testing follows hormone risk and patient context",
          tb: { h: ["Test", "Who gets it", "Purpose"], r: [["1-mg dex test", "Most; individualize in frailty", "Cortisol autonomy"], ["Metanephrines", "Not typical benign or symptoms", "Pheochromocytoma"], ["Aldo-renin testing", "HTN or hypokalemia", "Aldosteronism"], ["Biopsy", "Rare metastasis workup", "After pheo excluded"]] } },
        { f: "What imaging features suggest a benign adrenal adenoma?", b: "Homogeneous, smooth, unenhanced CT ≤ 10 HU indicates a lipid-rich benign adenoma — no further imaging needed regardless of size.", x: "Intracellular lipid lowers HU; a homogeneous ≤10 HU adrenal mass is so likely benign that serial scans add little value.", t: "Trap: Heterogeneity, irregular borders, or HU >10 needs malignancy-focused evaluation.", m: "≤10 HU homogeneous adrenal mass is lipid-rich and benign" },
        { f: "Why must pheochromocytoma be excluded before adrenal biopsy?", b: "Biopsy can precipitate a hypertensive crisis; biopsy is reserved for suspected metastasis after pheo is excluded.", x: "Catecholamine release during biopsy can be fatal; biochemical exclusion comes before needle sampling.", t: "Trap: Biopsy does not distinguish adenoma from adrenocortical carcinoma well; use it mainly for suspected metastasis.", m: "Never needle a possible pheo" }
      ]
    },
    {
      id: "gi-aih",
      system: "GI",
      task: "RX",
      vignette: "A 34-year-old woman with Hashimoto thyroiditis has 3 weeks of fatigue and jaundice. ALT is 820 U/L, AST 690 U/L, total bilirubin 4.2 mg/dL, alkaline phosphatase 160 U/L, INR 1.3. IgG is 2,950 mg/dL (elevated). Anti-smooth muscle antibody is 1:160 and ANA 1:320. Viral hepatitis serologies, ceruloplasmin, and acetaminophen level are negative or normal; she takes no supplements. Liver biopsy shows interface hepatitis with abundant plasma cells.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Prednisone plus azathioprine.",
        "Ursodeoxycholic acid.",
        "Observation with repeat liver chemistries in 3 months.",
        "Entecavir."
      ],
      correct: 0,
      explanation: "High aminotransferases, elevated IgG, ANA/anti-smooth muscle antibodies, and interface hepatitis support <strong>autoimmune hepatitis</strong>. <strong>Prednisone plus azathioprine</strong> is an established induction regimen; check TPMT and monitor CBC/liver tests before and during thiopurine use. The 2025 EASL update also supports mycophenolate as a first-line alternative in appropriate patients, but it is teratogenic. Budesonide is no longer endorsed as first-line in that update and must not be used in cirrhosis or acute severe AIH. Ursodiol is for PBC, not AIH induction.",
      flashcards: [
        { f: "Which autoantibody patterns support autoimmune hepatitis?", b: "ANA/ASMA commonly occur in adults; anti-LKM-1/anti-LC1 are more common in pediatric or young-onset disease.", x: "These were historically called types 1 and 2; EASL 2025 no longer recommends subclassification because treatment is not determined by that label.", t: "Trap: Antibody positivity alone is insufficient; exclude competing causes and integrate IgG, biopsy, and clinical findings.", m: "AIH needs antibodies plus the whole picture",
          tb: { h: ["Pattern", "Antibodies", "Context"], r: [["Common adult", "ANA, ASMA", "Support AIH"], ["Young-onset", "Anti-LKM-1, anti-LC1", "Support AIH"], ["Additional evidence", "High IgG", "Compatible biopsy"], ["Before diagnosis", "Exclude viral/drug", "Assess competing causes"]] } },
        { f: "What is an established first-line treatment of autoimmune hepatitis?", b: "Prednisone plus azathioprine after TPMT assessment; EASL 2025 also supports mycophenolate in suitable patients.", x: "Steroid-sparing therapy permits glucocorticoid taper. Mycophenolate is teratogenic; thiopurines require CBC and liver monitoring.", t: "Trap: Budesonide is not first-line under EASL 2025 and is contraindicated in cirrhosis or acute severe AIH.", m: "Steroid plus a monitored steroid-sparing agent" },
        { f: "Primary biliary cholangitis vs primary sclerosing cholangitis?", b: "PBC: middle-aged women, antimitochondrial antibody, ursodiol. PSC: men with ulcerative colitis, beaded ducts on MRCP, cholangiocarcinoma risk.", x: "PBC is small-duct autoimmune cholestasis; PSC is large-duct fibrostenotic disease linked to IBD.", t: "Trap: Ursodiol is first-line for PBC, not for autoimmune hepatitis induction.", m: "PBC is AMA and ursodiol; PSC is UC and beaded ducts" }
      ]
    },
    {
      id: "gi-severe-uc",
      system: "GI",
      task: "NEXT",
      vignette: "A 29-year-old man with known ulcerative colitis has 10 bloody stools per day for 5 days. Temperature 38.1 °C, HR 108/min. Hemoglobin 9.8 g/dL, CRP 86 mg/L, albumin 2.8 g/dL. Abdominal radiograph shows no colonic dilation. He is admitted.",
      leadIn: "What is the most appropriate initial management?",
      options: [
        "Oral mesalamine and loperamide for inpatient severe colitis while awaiting stool studies.",
        "IV methylprednisolone, stool C. difficile testing, and pharmacologic VTE prophylaxis with heparin.",
        "Immediate total colectomy before a trial of medical therapy because fever and anemia are present.",
        "IV methylprednisolone and mechanical VTE prophylaxis, deferring heparin until rectal bleeding improves."
      ],
      correct: 1,
      explanation: "Six or more bloody stools per day with systemic toxicity (fever, tachycardia, anemia, high CRP) = <strong>acute severe ulcerative colitis</strong> (Truelove-Witts). Management: <strong>IV glucocorticoids</strong>, <strong>exclude C. difficile</strong> (and evaluate CMV on flexible sigmoidoscopy), and give <strong>pharmacologic VTE prophylaxis unless a major contraindication exists</strong>. Stable hematochezia from colitis alone is not a contraindication; uncontrolled major bleeding may be. Avoid antimotility agents, opioids, and anticholinergics (toxic megacolon). If there is no response by <strong>day 3</strong>, assess for <strong>infliximab or cyclosporine</strong> rescue or colectomy.",
      flashcards: [
        { f: "How is acute severe ulcerative colitis defined?", b: "≥ 6 bloody stools/day plus ≥ 1 systemic sign: fever, HR > 90, Hb < 10.5, or ESR > 30 / high CRP (Truelove-Witts).", x: "Systemic toxicity with frequent bloody stool predicts high colectomy risk and requires inpatient therapy.", t: "Trap: Mild outpatient UC therapy is inadequate when Truelove-Witts severe criteria are met.", m: "Severe UC: 6 bloody stools plus systemic toxicity",
          tb: { h: ["Criterion", "Threshold", "Points to"], r: [["Stools", "≥6 bloody/day", "Severe if systemic sign"], ["Fever", "Present", "Systemic toxicity"], ["Heart rate", ">90", "Systemic toxicity"], ["Hemoglobin", "<10.5", "Systemic toxicity"], ["ESR/CRP", "ESR >30 or high CRP", "Systemic toxicity"]] } },
        { f: "Is VTE prophylaxis given during an IBD flare with bleeding?", b: "Give pharmacologic prophylaxis during hospitalization unless a major contraindication exists; stable hematochezia alone is not one.", x: "Inflammation creates a hypercoagulable state. Uncontrolled major bleeding may require mechanical prophylaxis until safe to use heparin.", t: "Trap: Do not withhold prophylactic-dose heparin solely for typical colitis-related rectal bleeding.", m: "IBD flares bleed yet clot: assess both risks" },
        { f: "Rescue therapy for steroid-refractory acute severe UC?", b: "No response by day 3 of IV steroids → infliximab or cyclosporine; colectomy for failure, megacolon, or perforation.", x: "Day-3 nonresponse predicts steroid failure, so rescue therapy or surgery should not be delayed.", t: "Trap: Avoid opioids, anticholinergics, and antimotility agents; they can precipitate toxic megacolon.", m: "Day 3 steroid failure triggers rescue or surgery" }
      ]
    },
    {
      id: "id-crypto",
      system: "ID",
      task: "RX",
      vignette: "A 38-year-old man with untreated HIV (CD4 count 28/µL) has 2 weeks of headache and fever. He has no focal deficits. Head CT is normal. Lumbar puncture shows opening pressure 34 cm H₂O, WBC 12/µL, glucose 32 mg/dL, protein 70 mg/dL, and positive CSF cryptococcal antigen.",
      leadIn: "What is the most appropriate management?",
      options: [
        "Oral fluconazole and start antiretroviral therapy today to treat meningitis while restoring immune function.",
        "IV dexamethasone and acetazolamide to lower intracranial pressure instead of serial therapeutic LPs.",
        "Amphotericin B plus flucytosine, therapeutic LPs, and ART deferred 4–6 weeks.",
        "Voriconazole and immediate ventriculoperitoneal shunt placement before induction antifungal therapy."
      ],
      correct: 2,
      explanation: "<strong>Cryptococcal meningitis</strong> in advanced HIV is treated with <strong>induction amphotericin B (liposomal) + flucytosine</strong> (≥ 2 weeks), then <strong>fluconazole consolidation and maintenance</strong>. Raised intracranial pressure causes much of the mortality: do <strong>therapeutic LPs</strong> to an opening pressure of &lt; 20 cm H₂O or a 50% reduction. Glucocorticoids and acetazolamide are harmful. <strong>Delay ART 4–6 weeks</strong>, because early ART increases mortality from IRIS (COAT trial), unlike most other opportunistic infections, where ART starts within 2 weeks.",
      flashcards: [
        { f: "Induction therapy for HIV-associated cryptococcal meningitis?", b: "Liposomal amphotericin B + flucytosine (≥ 2 weeks), then fluconazole 400–800 mg consolidation, then 200 mg maintenance.", x: "Flucytosine adds rapid fungicidal activity to amphotericin and improves CSF sterilization.", t: "Trap: Fluconazole alone is not adequate induction for severe HIV-associated cryptococcal meningitis.", m: "Crypto CNS induction: ampho plus flucytosine before fluconazole" },
        { f: "How is raised ICP managed in cryptococcal meningitis?", b: "Serial therapeutic LPs to opening pressure < 20 cm H₂O or 50% reduction — not steroids, mannitol, or acetazolamide.", x: "High CSF pressure causes headache, vision loss, and death; removing CSF is the effective pressure treatment.", t: "Trap: Acetazolamide and steroids do not improve cryptococcal ICP and may harm.", m: "Crypto pressure treatment is CSF removal" },
        { f: "How does ART timing differ for PCP, cryptococcal meningitis, and TB meningitis?", b: "PCP: within 2 weeks. Cryptococcal meningitis: usually defer 4–6 weeks. TB meningitis: delay until controlled, with expert-guided timing.", x: "Early ART improves PCP outcomes but can trigger dangerous inflammation in a closed CNS space; NIH ARV guidance for TB meningitis requires at least 2 weeks of TB therapy and clinical control.", t: "Trap: Do not apply a single 4–6-week rule to every CNS opportunistic infection.", m: "PCP starts early; CNS timing is infection-specific",
          tb: { h: ["OI", "ART timing", "Reason"], r: [["PCP", "Within 2 weeks", "Improves outcomes"], ["Crypto meningitis", "Usually 4–6 weeks", "IRIS mortality"], ["TB meningitis", "After control; specialist guided", "Avoid severe CNS IRIS"]] } }
      ]
    },
    {
      id: "id-rmsf",
      system: "ID",
      task: "RX",
      vignette: "In July, a 44-year-old man from North Carolina develops fever, severe headache, and myalgias 6 days after hiking. Two days later, a blanching maculopapular rash appears on his wrists and ankles and spreads centrally; petechiae are now present on his palms and soles. Platelets 88,000/µL, sodium 129 mEq/L, AST 112 U/L. He does not recall a tick bite.",
      leadIn: "What is the most appropriate management?",
      options: [
        "Await Rickettsia rickettsii serologies before treating.",
        "IV ceftriaxone.",
        "Oral amoxicillin.",
        "Start doxycycline immediately."
      ],
      correct: 3,
      explanation: "Fever, headache, and a rash that starts on the <strong>wrists and ankles</strong>, spreads centrally, and involves the <strong>palms and soles</strong> after outdoor exposure in the southeastern US, with <strong>thrombocytopenia and hyponatremia</strong> = <strong>Rocky Mountain spotted fever</strong>. Mortality rises sharply when treatment is delayed past day 5. Treat empirically with <strong>doxycycline</strong> at any age; serologies are negative early. Fewer than half of patients recall a tick bite. Beta-lactams are ineffective against rickettsiae.",
      flashcards: [
        { f: "Classic presentation of Rocky Mountain spotted fever?", b: "Fever, headache, myalgia, then rash starting at wrists/ankles spreading centrally incl. palms/soles; thrombocytopenia, hyponatremia, transaminitis.", x: "Rickettsiae injure vascular endothelium, causing rash, thrombocytopenia, hyponatremia, and organ dysfunction.", t: "Trap: Absence of recalled tick bite does not exclude RMSF; many patients never notice the bite.", m: "RMSF rash marches wrists/ankles to palms/soles" },
        { f: "Treatment of suspected rickettsial infection?", b: "Doxycycline immediately, in all ages, without waiting for serology — delay increases mortality.", x: "Serology is often negative in week 1; treatment delay after day 5 sharply increases fatality.", t: "Trap: Do not wait for confirmatory titers before doxycycline in suspected RMSF.", m: "RMSF: doxy now, titers later" },
        { f: "Which tick-borne infections cause leukopenia and thrombocytopenia?", b: "Ehrlichiosis and anaplasmosis (morulae in leukocytes, usually no rash) — also treated with doxycycline.", x: "Ehrlichia/anaplasma infect leukocytes and suppress marrow lines; rash is less prominent than RMSF.", t: "Trap: Lyme usually causes erythema migrans and normal platelets, not leukopenia/thrombocytopenia.", m: "Low WBC plus low platelets: think ehrlichia/anaplasma" }
      ]
    },
    {
      id: "pulm-copd-aecopd",
      system: "PULM",
      task: "NEXT",
      vignette: "A 69-year-old woman with severe COPD has 3 days of increased dyspnea and purulent sputum. She is alert but tachypneic at 30/min, using accessory muscles. SpO₂ 86% on room air. Arterial blood gas on 2 L/min oxygen: pH 7.28, PaCO₂ 64 mm Hg, PaO₂ 58 mm Hg. Chest radiograph shows hyperinflation without consolidation.",
      leadIn: "In addition to bronchodilators, systemic glucocorticoids, and antibiotics, what is the most appropriate next step?",
      options: [
        "Noninvasive positive-pressure ventilation (BiPAP).",
        "High-flow oxygen by non-rebreather mask to SpO₂ 100%.",
        "Immediate endotracheal intubation for airway protection and ventilatory support.",
        "IV aminophylline."
      ],
      correct: 0,
      explanation: "A COPD exacerbation with <strong>acute hypercapnic respiratory acidosis</strong> (pH ≤ 7.35, PaCO₂ &gt; 45) in an alert patient who can protect her airway is the strongest indication for <strong>NIV (BiPAP)</strong>, which <strong>lowers intubation and mortality</strong>. Titrate oxygen to <strong>SpO₂ 88–92%</strong>; high-flow oxygen worsens hypercapnia through V/Q mismatch and the Haldane effect. Use <strong>prednisone 40 mg × 5 days</strong>, and give antibiotics when sputum purulence increases. Intubate if NIV fails or she cannot protect her airway.",
      flashcards: [
        { f: "When is NIV indicated in a COPD exacerbation?", b: "Acute respiratory acidosis (pH ≤ 7.35 and PaCO₂ > 45) or severe dyspnea with fatigue — reduces intubation and mortality.", x: "NIV unloads respiratory muscles and improves ventilation while treating reversible hypercapnia.", t: "Trap: NIV is unsafe if obtunded, vomiting, facial trauma, or unable to protect airway; intubate instead.", m: "COPD acidosis gets BiPAP if awake and protecting airway" },
        { f: "Oxygen target in COPD exacerbation?", b: "SpO₂ 88–92% (PaO₂ 60–65) — excess oxygen worsens hypercapnia.", x: "Excess oxygen worsens V/Q mismatch and CO₂ retention; controlled oxygen improves safety.", t: "Trap: Do not target 100% saturation in COPD exacerbation; 88–92% is deliberate.", m: "COPD oxygen target is 88–92, not 100" },
        { f: "Steroids and antibiotics in COPD exacerbation?", b: "Prednisone 40 mg × 5 days (REDUCE); antibiotics if increased sputum purulence plus dyspnea or volume, or if ventilated.", x: "Short steroid courses reduce relapse and length of stay; purulence suggests bacterial contribution.", t: "Trap: Antibiotics are not automatic for every COPD flare; use Anthonisen criteria or ventilation need.", m: "COPD flare: prednisone 40 for 5; antibiotics for purulence pattern",
          tb: { h: ["Therapy", "Use when", "Dose or clue"], r: [["Prednisone", "Most exacerbations", "40 mg for 5 days"], ["Antibiotics", "Purulence plus symptom", "Dyspnea or volume"], ["Antibiotics", "Ventilated patient", "Invasive or NIV"], ["No antibiotics", "No purulence pattern", "Supportive care"]] } }
      ]
    },
    {
      id: "pulm-ph-vq",
      system: "PULM",
      task: "TEST",
      vignette: "A 54-year-old woman has 1 year of progressive exertional dyspnea. She had a pulmonary embolism 2 years ago treated with 3 months of anticoagulation. Echocardiogram shows estimated RV systolic pressure 62 mm Hg, RV dilation, and normal LV size and function without valvular disease. Spirometry is normal and HRCT shows no parenchymal disease. Polysomnography is negative.",
      leadIn: "What is the most appropriate next diagnostic test?",
      options: [
        "Repeat echocardiogram in 6 months.",
        "Ventilation-perfusion (V/Q) lung scan.",
        "Start an endothelin receptor antagonist.",
        "Coronary angiography."
      ],
      correct: 1,
      explanation: "When echocardiography suggests <strong>pulmonary hypertension</strong> and left heart and lung disease are excluded, every patient needs a <strong>V/Q scan</strong> to screen for <strong>chronic thromboembolic pulmonary hypertension (CTEPH, group 4)</strong>. A V/Q scan is more sensitive than CT angiography, and a normal scan excludes CTEPH. Confirm PH by <strong>right heart catheterization</strong> (mPAP &gt; 20 mm Hg, PVR &gt; 2 Wood units for precapillary PH) before any targeted therapy. CTEPH is potentially <strong>curable with pulmonary endarterectomy</strong>, plus lifelong anticoagulation.",
      flashcards: [
        { f: "What are the five WHO groups of pulmonary hypertension?", b: "1 PAH; 2 left heart disease (most common); 3 lung disease/hypoxia; 4 CTEPH/pulmonary artery obstruction; 5 unclear/multifactorial.", x: "Classifying PH identifies whether treatment targets left heart disease, hypoxia, thromboembolism, or PAH biology.", t: "Trap: PAH drugs can harm group 2 PH from left heart disease; define the group first.", m: "PH groups: artery, left heart, lung, clot, miscellaneous",
          tb: { h: ["Group", "Cause", "Key treatment focus"], r: [["1", "PAH", "PAH therapy"], ["2", "Left heart disease", "Treat heart disease"], ["3", "Lung disease/hypoxia", "Treat lung, oxygen"], ["4", "CTEPH", "Endarterectomy, anticoag"], ["5", "Multifactorial", "Treat underlying cause"]] } },
        { f: "Best screening test for CTEPH?", b: "V/Q scan (more sensitive than CTPA; normal scan excludes CTEPH) → RHC and pulmonary angiography → endarterectomy if operable.", x: "Chronic organized thrombi may be missed on CT but create mismatched perfusion defects on V/Q.", t: "Trap: A normal V/Q essentially excludes CTEPH; do not rely on CTPA alone as the screen.", m: "CTEPH screen is V/Q; normal rules it out" },
        { f: "Hemodynamic definition of precapillary pulmonary hypertension?", b: "Right heart cath: mPAP > 20 mm Hg, PCWP ≤ 15 mm Hg, PVR > 2 Wood units.", x: "RHC separates precapillary vascular disease from pulmonary venous hypertension due to left-sided filling pressure.", t: "Trap: Echo estimates probability; it does not confirm PH or justify targeted therapy alone.", m: "PH is confirmed in the cath lab" }
      ]
    },
    {
      id: "rheum-src",
      system: "RHEUM",
      task: "RX",
      vignette: "A 46-year-old woman with diffuse cutaneous systemic sclerosis diagnosed 1 year ago (anti-RNA polymerase III positive) was started on prednisone 30 mg daily 3 weeks ago for myositis. She now has headache and blurred vision. BP is 196/112 mm Hg (baseline 118/72). Creatinine is 2.3 mg/dL (baseline 0.8), platelets 96,000/µL, and the smear shows schistocytes. Urinalysis shows mild proteinuria.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "IV nicardipine alone to lower BP by 25% in the first hour.",
        "Plasma exchange.",
        "Captopril, titrated rapidly, continued even if creatinine rises.",
        "Pulse IV methylprednisolone 1 g daily for 3 days."
      ],
      correct: 2,
      explanation: "Abrupt severe hypertension, AKI, and MAHA in early diffuse SSc = <strong>scleroderma renal crisis</strong>. Risk factors are <strong>anti-RNA polymerase III</strong>, early diffuse disease, and <strong>glucocorticoids (prednisone ≥ 15 mg/day)</strong>. Treatment is an <strong>ACE inhibitor</strong> (short-acting captopril, rapidly uptitrated), <strong>continued even if dialysis becomes necessary</strong>, because renal recovery can occur over months to 2 years. Add calcium channel blockers only as adjuncts. Plasma exchange and steroids do not help, and steroids precipitate renal crisis.",
      flashcards: [
        { f: "What are the risk factors for scleroderma renal crisis?", b: "Early diffuse cutaneous SSc, anti-RNA polymerase III antibodies, and glucocorticoids ≥ 15 mg/day prednisone.", x: "RNA polymerase III disease has abrupt diffuse skin involvement and high renal-crisis risk, especially with steroids.", t: "Trap: High-dose prednisone for inflammatory symptoms can precipitate scleroderma renal crisis.", m: "RNA pol III plus early diffuse skin plus steroids equals renal-crisis risk" },
        { f: "What is the treatment of scleroderma renal crisis?", b: "ACE inhibitor (captopril) titrated to normal BP — continue even on dialysis; never stop for rising creatinine.", x: "ACE inhibition reverses renin-driven vasoconstriction; renal recovery may lag even after dialysis starts.", t: "Trap: Do not stop captopril because creatinine rises; stopping worsens renal crisis physiology.", m: "Scleroderma renal crisis: captopril through the creatinine rise" },
        { f: "Which antibodies define limited vs diffuse systemic sclerosis?", b: "Limited (CREST): anticentromere — pulmonary hypertension risk. Diffuse: anti-Scl-70 (ILD) and anti-RNA polymerase III (renal crisis, cancer).", x: "Autoantibodies predict organ surveillance priorities: PAH in limited disease and ILD/renal crisis in diffuse subsets.", t: "Trap: Anticentromere points to limited disease, not the renal-crisis phenotype.", m: "Centromere PAH; Scl-70 ILD; RNA pol III renal crisis",
          tb: { h: ["Antibody", "Subset", "Major risk"], r: [["Anticentromere", "Limited CREST", "Pulmonary HTN"], ["Anti-Scl-70", "Diffuse", "ILD"], ["RNA polymerase III", "Diffuse early", "Renal crisis, cancer"]] } }
      ]
    },
    {
      id: "rheum-dm-malignancy",
      system: "RHEUM",
      task: "RISK",
      vignette: "A 61-year-old woman has 2 months of progressive difficulty climbing stairs and lifting her arms. She has a violaceous periorbital rash, scaly violaceous papules over the MCP and PIP joints, and a V-shaped erythema on the upper chest. Proximal muscle strength is 4/5. CK is 3,800 U/L. Anti-TIF1-γ antibody is positive. She has been started on prednisone.",
      leadIn: "What is the most appropriate additional evaluation?",
      options: [
        "Repeat CK and muscle strength testing in 6 months.",
        "HLA-B27 testing to evaluate for an associated spondyloarthritis.",
        "Electroencephalography to evaluate for central nervous system involvement.",
        "Malignancy screening with CT of the chest, abdomen, and pelvis."
      ],
      correct: 3,
      explanation: "Heliotrope rash, <strong>Gottron papules</strong>, the V sign, proximal weakness, and high CK = <strong>dermatomyositis</strong>. Adult DM, especially with <strong>anti-TIF1-γ or anti-NXP2</strong>, is strongly associated with <strong>cancer</strong> (ovarian, lung, GI, breast, lymphoma), usually within 3 years of diagnosis. Perform <strong>enhanced cancer screening</strong>: CT chest/abdomen/pelvis, <strong>transvaginal ultrasound ± CA-125</strong> in women, and age-appropriate screening. Also screen for <strong>ILD</strong> (anti-MDA5, antisynthetase/anti-Jo-1).",
      flashcards: [
        { f: "What are the pathognomonic skin findings of dermatomyositis?", b: "Gottron papules (over MCP/PIP), heliotrope rash; also V sign, shawl sign, mechanic's hands, periungual changes.", x: "These rashes are highly characteristic and often precede or accompany symmetric proximal inflammatory myopathy.", t: "Trap: SLE photosensitivity lacks Gottron papules over extensor MCP/PIP joints.", m: "Gottron and heliotrope are dermatomyositis fingerprints" },
        { f: "Which myositis antibodies predict cancer vs interstitial lung disease?", b: "Cancer: anti-TIF1-γ, anti-NXP2. ILD: anti-Jo-1/antisynthetase, anti-MDA5 (rapidly progressive ILD).", x: "Autoantibody phenotype guides what complication to search for most aggressively at diagnosis.", t: "Trap: Anti-Jo-1 suggests antisynthetase syndrome with ILD/mechanic hands, not the highest cancer-risk group.", m: "TIF1-γ/NXP2 cancer; Jo-1/MDA5 lung",
          tb: { h: ["Antibody", "Association", "Clinical action"], r: [["TIF1-gamma", "Cancer", "Enhanced screening"], ["NXP2", "Cancer", "Enhanced screening"], ["Jo-1", "Antisynthetase ILD", "Lung screening"], ["MDA5", "Rapid ILD", "Urgent lung eval"]] } },
        { f: "Which cancer screening is recommended in adult dermatomyositis?", b: "Enhanced screening at diagnosis: CT chest/abdomen/pelvis, pelvic/transvaginal US ± CA-125 in women, plus age-appropriate tests; high risk often gets repeat screening for 3 years.", x: "Cancer risk clusters near myositis onset, so screening is intensified initially and repeated in higher-risk phenotypes.", t: "Trap: Age-appropriate screening alone may miss occult malignancy in high-risk adult dermatomyositis.", m: "Adult DM hunts cancer hardest near diagnosis" }
      ]
    },
    {
      id: "neph-hypomag",
      system: "NEPH",
      task: "RX",
      vignette: "A 63-year-old man with alcohol use disorder who takes omeprazole and hydrochlorothiazide is admitted for weakness. Serum potassium is 2.8 mEq/L. Despite 120 mEq of potassium chloride over 2 days, potassium is only 3.0 mEq/L. Creatinine is normal. ECG shows U waves and QT prolongation.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Measure serum magnesium and replete it.",
        "Switch potassium chloride to potassium citrate.",
        "Start spironolactone.",
        "Increase IV potassium chloride to 40 mEq/h through a peripheral line."
      ],
      correct: 0,
      explanation: "<strong>Hypokalemia that does not respond to replacement</strong> suggests <strong>hypomagnesemia</strong>, which is common with alcohol use, <strong>PPIs</strong>, and thiazide/loop diuretics. Low intracellular magnesium releases its inhibition of <strong>ROMK channels</strong>, causing ongoing <strong>renal potassium wasting</strong>. Magnesium must be replaced <strong>before or with</strong> potassium. Hypomagnesemia also causes refractory <strong>hypocalcemia</strong> through impaired PTH secretion and action. Peripheral IV potassium should not exceed about 10 mEq/h.",
      flashcards: [
        { f: "Why does hypomagnesemia cause refractory hypokalemia?", b: "Low intracellular Mg removes ROMK inhibition → renal K⁺ wasting; replete Mg first.", x: "ROMK-mediated kaliuresis continues until magnesium is restored, making potassium replacement ineffective alone.", t: "Trap: Do not keep escalating K⁺ without checking Mg in refractory hypokalemia.", m: "Low Mg opens ROMK and wastes potassium" },
        { f: "Common causes of hypomagnesemia?", b: "Alcohol use, PPIs, loop/thiazide diuretics, diarrhea, aminoglycosides, amphotericin B, cisplatin, refeeding syndrome.", x: "GI loss, renal tubular drug toxicity, and intracellular shifts are common mechanisms for low magnesium.", t: "Trap: A normal serum Mg can miss total-body depletion, but low Mg in this setting must be corrected.", m: "Alcohol, PPIs, diuretics, and toxic tubules waste magnesium" },
        { f: "Why does hypomagnesemia cause hypocalcemia?", b: "Low Mg impairs PTH secretion and causes end-organ PTH resistance — calcium will not correct until Mg is repleted.", x: "Magnesium is needed for PTH release and signaling; deficiency produces functional hypoparathyroidism.", t: "Trap: Giving calcium alone will not sustain correction if magnesium remains low.", m: "Low Mg makes low PTH action: calcium will not stick" }
      ]
    },
    {
      id: "neph-met-alk",
      system: "NEPH",
      task: "TEST",
      vignette: "A 24-year-old woman with recurrent self-induced vomiting presents with fatigue. BP is 98/60 mm Hg. Na 136, K 2.9, Cl 86, HCO₃⁻ 36 mEq/L. Arterial pH 7.51. Urine sodium is 35 mEq/L, urine chloride 8 mEq/L.",
      leadIn: "Which finding best indicates that her metabolic alkalosis will respond to IV saline?",
      options: [
        "Urine sodium of 35 mEq/L.",
        "Urine chloride of 8 mEq/L.",
        "Serum potassium of 2.9 mEq/L.",
        "Blood pressure of 98/60 mm Hg."
      ],
      correct: 1,
      explanation: "In <strong>metabolic alkalosis</strong>, <strong>urine chloride</strong> is the key test. <strong>Urine Cl &lt; 20 mEq/L</strong> means a <strong>chloride-responsive (saline-responsive)</strong> alkalosis (vomiting/NG suction, remote diuretic use) → IV <strong>normal saline + KCl</strong>. Urine sodium can be <strong>misleadingly high</strong> in active vomiting because bicarbonaturia obligates sodium loss. <strong>Urine Cl &gt; 20</strong> points to current diuretic use, Bartter/Gitelman, or mineralocorticoid excess, especially with hypertension.",
      flashcards: [
        { f: "Metabolic alkalosis: what does urine chloride tell you?", b: "<20 mEq/L supports chloride depletion and saline responsiveness; ≥20 suggests ongoing renal chloride loss or mineralocorticoid excess.", x: "Low urine chloride reflects renal chloride conservation. Active diuretics can raise urine chloride despite volume depletion and potential response to chloride repletion.", t: "Trap: Do not label every high-urine-chloride case absolutely saline resistant; integrate BP, volume status, and diuretic timing.", m: "Low chloride favors replacement; high chloride needs context",
          tb: { h: ["Urine Cl", "Interpretation", "Common causes"], r: [["<20 mEq/L", "Usually chloride responsive", "Vomiting, NG suction"], ["<20 mEq/L", "Usually chloride responsive", "Remote diuretics"], ["≥20 mEq/L", "Drug-dependent; assess volume", "Active diuretics"], ["≥20 mEq/L", "Ongoing renal salt loss", "Bartter or Gitelman"], ["≥20 mEq/L", "Usually volume expanded", "Mineralocorticoid excess"]] } },
        { f: "Why is urine sodium unreliable in vomiting-induced alkalosis?", b: "Bicarbonaturia obligates Na⁺ (and K⁺) excretion despite volume depletion — urine Cl is the better marker.", x: "Filtered bicarbonate drags sodium into urine, falsely suggesting volume repletion during active alkalosis.", t: "Trap: Do not classify saline responsiveness by urine sodium in metabolic alkalosis.", m: "Vomiting can make urine sodium lie; chloride tells the truth" },
        { f: "Gitelman vs Bartter syndrome?", b: "Gitelman: mimics thiazide — hypocalciuria, hypomagnesemia, adolescents/adults. Bartter: mimics loop diuretic — hypercalciuria, childhood.", x: "Both cause hypokalemic metabolic alkalosis with high renin/aldosterone but differ by nephron segment and urine calcium.", t: "Trap: Hypertension with metabolic alkalosis suggests mineralocorticoid excess, not Bartter/Gitelman.", m: "Gitelman is thiazide-like; Bartter is loop-like" }
      ]
    },
    {
      id: "heme-sickle-acs",
      system: "HEME",
      task: "RX",
      vignette: "A 22-year-old man with sickle cell anemia (HbSS) admitted for a vaso-occlusive pain crisis develops fever 38.7 °C, pleuritic chest pain, and cough on hospital day 2. SpO₂ is 90% on room air. Chest radiograph shows a new right lower lobe infiltrate. Hemoglobin is 6.9 g/dL (baseline 8.5).",
      leadIn: "What is the most appropriate management?",
      options: [
        "Hydroxyurea initiation alone to raise fetal hemoglobin.",
        "IV fluids at twice maintenance and morphine.",
        "Ceftriaxone, azithromycin, oxygen, and simple transfusion.",
        "Therapeutic anticoagulation for presumed pulmonary embolism."
      ],
      correct: 2,
      explanation: "A new infiltrate with fever, chest pain, or hypoxemia in sickle cell disease = <strong>acute chest syndrome</strong>, the leading cause of death in adults with SCD. Management: <strong>empiric antibiotics</strong> (third-generation cephalosporin + macrolide), <strong>oxygen</strong>, <strong>incentive spirometry</strong>, careful analgesia, and <strong>judicious fluids</strong> (overhydration worsens pulmonary edema). Give <strong>simple transfusion</strong> for hypoxemia or Hb falling below baseline. <strong>Exchange transfusion</strong> is for severe or progressive ACS (worsening hypoxemia, multilobar disease). Hydroxyurea is for prevention.",
      flashcards: [
        { f: "How is acute chest syndrome defined?", b: "New pulmonary infiltrate plus fever and/or respiratory symptoms (chest pain, cough, hypoxemia, tachypnea) in sickle cell disease.", x: "ACS can arise from infection, infarction, fat embolism, or hypoventilation; early treatment prevents respiratory failure.", t: "Trap: Treat new infiltrate plus symptoms as ACS even if it resembles pneumonia.", m: "Sickle new infiltrate plus symptoms is acute chest" },
        { f: "Simple vs exchange transfusion in sickle cell disease?", b: "Simple: symptomatic anemia or mild ACS. Exchange (HbS < 30%): severe/progressive ACS, acute stroke, multiorgan failure — avoid Hb > 10 (hyperviscosity).", x: "Exchange rapidly lowers HbS without raising viscosity; simple transfusion helps less severe anemia/hypoxemia.", t: "Trap: Transfusing above Hb 10 g/dL can worsen viscosity in SCD.", m: "Exchange drops HbS; simple transfusion raises oxygen-carrying capacity",
          tb: { h: ["Approach", "Use for", "Caution"], r: [["Simple transfusion", "Mild ACS or anemia", "Avoid Hb >10"], ["Exchange transfusion", "Severe/progressive ACS", "Target HbS <30%"], ["Exchange transfusion", "Acute stroke", "Rapid HbS reduction"], ["No transfusion", "Stable mild pain only", "Monitor closely"]] } },
        { f: "Which established therapy reduces recurrent sickle cell pain crises and acute chest syndrome?", b: "Hydroxyurea, which increases fetal hemoglobin; maintain appropriate vaccinations and preventive care.", x: "Higher HbF inhibits HbS polymerization. Selected severe cases may be evaluated for transplantation or gene therapy in specialist care; voxelotor was withdrawn in 2024.", t: "Trap: Hydroxyurea prevents future events but does not replace antibiotics, oxygen, spirometry, or indicated transfusion in acute chest syndrome.", m: "HbF prevents polymerization; it does not rescue acute chest today" }
      ]
    },
    {
      id: "heme-pv",
      system: "HEME",
      task: "RX",
      vignette: "A 52-year-old man has pruritus after hot showers and headaches. He does not smoke and has no sleep apnea. Hemoglobin is 18.9 g/dL, hematocrit 57%, WBC 12,800/µL, platelets 520,000/µL. Spleen tip is palpable. Serum erythropoietin is low, and JAK2 V617F mutation is detected. He has never had a thrombosis.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Hydroxyurea alone to lower the hematocrit and platelet count.",
        "Observation with repeat CBC in 6 months.",
        "Warfarin with a target INR of 2–3 for thrombosis prevention.",
        "Phlebotomy to hematocrit < 45% plus low-dose aspirin."
      ],
      correct: 3,
      explanation: "Erythrocytosis with <strong>low EPO</strong>, aquagenic pruritus, splenomegaly, and <strong>JAK2 V617F</strong> = <strong>polycythemia vera</strong>. All patients get <strong>phlebotomy to hematocrit &lt; 45%</strong> (CYTO-PV trial) and <strong>low-dose aspirin</strong>. He is <strong>low risk</strong> (age &lt; 60, no thrombosis), so cytoreduction is not routinely needed. <strong>High-risk</strong> patients (age ≥ 60 or prior thrombosis) add <strong>hydroxyurea</strong> (or interferon). Secondary causes (high EPO) include hypoxia, smoking, OSA, testosterone, and EPO-secreting tumors.",
      flashcards: [
        { f: "How is primary vs secondary erythrocytosis distinguished?", b: "Serum EPO: low → polycythemia vera (JAK2 V617F in ~95%). Normal/high → secondary (hypoxia, smoking, OSA, testosterone, renal/hepatic tumors).", x: "Low EPO means autonomous marrow erythrocytosis; high EPO means a physiologic or tumor-driven response.", t: "Trap: Dehydration causes relative erythrocytosis, not low-EPO JAK2-positive PV.", m: "Low EPO plus JAK2 means PV until proven otherwise" },
        { f: "What is the treatment of polycythemia vera?", b: "All: phlebotomy to Hct < 45% + low-dose aspirin. High risk (≥ 60 y or thrombosis): add hydroxyurea or interferon; ruxolitinib if refractory.", x: "Keeping Hct <45% reduces thrombosis; aspirin addresses platelet-mediated microvascular symptoms and clot risk.", t: "Trap: Low-risk PV still needs phlebotomy and aspirin; observation alone is inadequate.", m: "PV target is 45: hematocrit below 45%" },
        { f: "Which myeloproliferative neoplasms carry JAK2, CALR, or MPL mutations?", b: "PV (JAK2 ~95%), essential thrombocythemia and primary myelofibrosis (JAK2, CALR, or MPL).", x: "These driver mutations activate JAK-STAT signaling and help distinguish clonal MPNs from reactive counts.", t: "Trap: BCR-ABL defines CML, not PV/ET/primary myelofibrosis.", m: "JAK-STAT drivers: JAK2, CALR, MPL; CML is BCR-ABL" }
      ]
    },
    {
      id: "onc-psa",
      system: "ONC",
      task: "RISK",
      vignette: "A 61-year-old man asks whether he should have a PSA test. He has no urinary symptoms, is in good health, and has no family history of prostate cancer. He is not of African ancestry and has no known BRCA mutation.",
      leadIn: "What is the most appropriate recommendation?",
      options: [
        "Discuss PSA screening benefits and harms before deciding.",
        "Recommend annual PSA and DRE as routine tests for his age group.",
        "Recommend against PSA screening until urinary symptoms develop.",
        "Offer screening prostate MRI in place of PSA-based screening."
      ],
      correct: 0,
      explanation: "USPSTF: for men <strong>55–69 years</strong>, PSA screening is an <strong>individual decision (grade C)</strong>. Discuss the small mortality benefit (about 1 prostate cancer death prevented per 1,000 men screened over 13 years) against <strong>false positives, biopsy complications, and overdiagnosis</strong> leading to incontinence and erectile dysfunction from treatment. Do not screen men <strong>≥ 70</strong> (grade D). DRE is not recommended for screening. Higher-risk men (Black men, strong family history, BRCA2) may benefit from earlier discussion.",
      flashcards: [
        { f: "USPSTF recommendation for prostate cancer screening?", b: "Age 55–69: individualized decision with shared decision-making (C). Age ≥ 70: do not screen (D).", x: "Screening has a small population mortality benefit but substantial individual harm variability, so values matter.", t: "Trap: PSA screening is not routine for all men; it is shared decision-making at 55–69.", m: "PSA 55–69 is a conversation, ≥70 is no" },
        { f: "What are the harms of PSA screening?", b: "False positives, biopsy complications (infection, bleeding), overdiagnosis and overtreatment → incontinence and erectile dysfunction.", x: "Many prostate cancers are indolent; detection can trigger biopsies and treatments that impair urinary/sexual function.", t: "Trap: A lower prostate cancer death rate does not mean fewer men harmed by overdiagnosis.", m: "PSA harm chain: false positive, biopsy, overdiagnosis, overtreatment" },
        { f: "Which men are at higher prostate cancer risk?", b: "Black men, first-degree relatives with prostate cancer (especially < 65), and BRCA2 (and BRCA1) carriers.", x: "Genetics and family history shift baseline risk and may justify earlier or more detailed discussion.", t: "Trap: DRE is not recommended as a stand-alone screening strategy for average-risk men.", m: "Black ancestry, family history, BRCA raise prostate risk" }
      ]
    },
    {
      id: "onc-svc",
      system: "ONC",
      task: "NEXT",
      vignette: "A 58-year-old man who smokes has 3 weeks of facial fullness that worsens when bending forward, plus arm swelling. He has dilated veins over his upper chest. He is breathing comfortably with no stridor, and he is alert without headache or confusion. CT shows a large right mediastinal mass compressing the superior vena cava. No tissue diagnosis has been made.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Emergent radiation therapy before biopsy.",
        "Obtain tissue before starting tumor-directed therapy.",
        "High-dose dexamethasone before biopsy.",
        "Systemic anticoagulation alone for presumed SVC thrombosis."
      ],
      correct: 1,
      explanation: "<strong>SVC syndrome</strong> is most often caused by <strong>lung cancer</strong> (especially small cell) or <strong>lymphoma</strong>. It develops over weeks and is rarely immediately life-threatening, so in a <strong>stable patient, tissue diagnosis comes first</strong>, because treatment depends on histology (chemotherapy for SCLC and lymphoma). Empiric radiation or steroids can <strong>obscure the diagnosis</strong>, especially for lymphoma. <strong>Stridor, laryngeal edema, or cerebral edema</strong> require urgent <strong>endovascular stenting</strong>.",
      flashcards: [
        { f: "What are the most common causes of SVC syndrome?", b: "Malignancy (non-small and small cell lung cancer, lymphoma) — increasingly intravascular devices/catheters with thrombosis.", x: "SVC obstruction causes venous congestion; malignancy remains common, but catheter thrombosis is increasing.", t: "Trap: Facial swelling and venous distention do not identify histology; diagnosis still matters.", m: "SVC swelling needs histology unless airway or brain is threatened" },
        { f: "What is the initial approach to SVC syndrome?", b: "Stable → tissue diagnosis first, then histology-directed therapy. Stridor, airway or cerebral edema → urgent endovascular stent.", x: "Most stable patients tolerate time for biopsy; therapy differs greatly for lymphoma, SCLC, NSCLC, or thrombosis.", t: "Trap: Stridor, airway compromise, or cerebral edema is an emergency requiring stenting before full workup.", m: "Stable SVC: biopsy first; unstable airway/brain: stent first" },
        { f: "Why avoid empiric steroids before biopsy of a mediastinal mass?", b: "Glucocorticoids can shrink lymphoma and render biopsy nondiagnostic.", x: "Steroids can lyse lymphoma cells and distort tissue architecture, lowering diagnostic yield.", t: "Trap: Empiric radiation/steroids before biopsy can delay correct lymphoma treatment.", m: "Steroids can melt lymphoma before the pathologist sees it" }
      ]
    },
    {
      id: "neuro-tia-dapt",
      system: "NEURO",
      task: "RX",
      vignette: "A 67-year-old man had 30 minutes of right arm and face weakness with slurred speech that resolved fully 6 hours ago. BP 152/90 mm Hg; he has diabetes. ABCD² score is 6. Exam is now normal (NIHSS 0). MRI shows no infarct; CT angiography shows no carotid stenosis or large-vessel occlusion. ECG shows sinus rhythm. He takes no antithrombotics.",
      leadIn: "What is the most appropriate antithrombotic therapy?",
      options: [
        "Aspirin alone, indefinitely.",
        "Warfarin with a target INR of 2–3 for secondary stroke prevention.",
        "Aspirin plus clopidogrel for 21 days, then single antiplatelet therapy.",
        "No antithrombotic therapy because symptoms resolved."
      ],
      correct: 2,
      explanation: "For a <strong>high-risk TIA (ABCD² ≥ 4)</strong> or <strong>minor ischemic stroke (NIHSS ≤ 3)</strong>, start <strong>dual antiplatelet therapy</strong> (aspirin + clopidogrel with a loading dose) <strong>within 24 hours</strong> and continue for <strong>21 days</strong>, then single antiplatelet therapy. This lowers early recurrent stroke risk (CHANCE, POINT). Longer DAPT increases bleeding. Workup includes vessel imaging, cardiac monitoring for AF, echocardiography, lipids, and A1c. Anticoagulation is for cardioembolic sources such as AF.",
      flashcards: [
        { f: "Which patients get DAPT after TIA or stroke?", b: "Minor stroke (NIHSS ≤ 3) or high-risk TIA (ABCD² ≥ 4): aspirin + clopidogrel within 24 h for 21 days (CHANCE/POINT).", x: "Early recurrence risk is front-loaded; short DAPT reduces platelet-driven recurrence before bleeding risk accumulates.", t: "Trap: Continue DAPT only 21 days for most CHANCE/POINT patients; longer use increases bleeding.", m: "Minor stroke/high-risk TIA: 21 days of DAPT" },
        { f: "What are the components of the ABCD² score?", b: "Age ≥ 60 (1), BP ≥ 140/90 (1), Clinical: unilateral weakness (2) or speech only (1), Duration ≥ 60 min (2) / 10–59 (1), Diabetes (1).", x: "ABCD² estimates early stroke risk after TIA using bedside vascular risk and symptom duration features.", t: "Trap: Low ABCD² does not replace urgent evaluation if symptoms suggest high-risk mechanism.", m: "ABCD²: Age, BP, Clinical, Duration, Diabetes",
          tb: { h: ["ABCD2 item", "Points", "High-risk clue"], r: [["Age ≥60", "1", "Older patient"], ["BP ≥140/90", "1", "At presentation"], ["Unilateral weakness", "2", "Clinical feature"], ["Speech only", "1", "Clinical feature"], ["Duration ≥60 min", "2", "10-59 min gets 1"], ["Diabetes", "1", "Vascular risk"]] } },
        { f: "When is carotid endarterectomy indicated after TIA/stroke?", b: "Symptomatic ipsilateral stenosis 70–99% (and selected 50–69%), ideally within 2 weeks of the event.", x: "Early surgery prevents recurrent emboli from unstable carotid plaque after nondisabling events.", t: "Trap: Complete carotid occlusion is not treated with endarterectomy; stenosis must be surgically accessible.", m: "Carotid window: symptomatic 70–99%, operate within 2 weeks" }
      ]
    },
    {
      id: "neuro-ich-warfarin",
      system: "NEURO",
      task: "RX",
      vignette: "A 76-year-old woman taking warfarin for atrial fibrillation develops sudden headache, vomiting, and left hemiparesis. CT shows a 22-mL right basal ganglia intracerebral hemorrhage without intraventricular extension. INR is 3.4. BP 188/98 mm Hg. Glasgow Coma Scale 14.",
      leadIn: "What is the most appropriate treatment for her coagulopathy?",
      options: [
        "Fresh frozen plasma alone, 15 mL/kg.",
        "Oral vitamin K 10 mg alone.",
        "Platelet transfusion to improve hemostasis.",
        "4-factor PCC plus IV vitamin K."
      ],
      correct: 3,
      explanation: "Warfarin-associated ICH requires immediate reversal with <strong>4-factor PCC plus IV vitamin K 10 mg</strong>. PCC supplies clotting factors within minutes without the volume burden of FFP; vitamin K sustains reversal. For this mild-to-moderate ICH with presenting SBP 188, target about <strong>140 mm Hg</strong>, maintaining 130–150 and avoiding &lt; 130. Dabigatran-associated ICH is reversed with <strong>idarucizumab</strong>; factor Xa inhibitor bleeding is commonly managed with <strong>4F-PCC</strong> per protocol. Andexanet alfa is no longer sold in the US after December 2025 following FDA safety concerns. Routine platelet transfusion for aspirin-associated spontaneous ICH without emergency surgery is harmful.",
      flashcards: [
        { f: "Reversal of warfarin in life-threatening bleeding?", b: "4-factor PCC (preferred over FFP) + IV vitamin K 10 mg.", x: "PCC supplies vitamin K-dependent factors immediately; vitamin K sustains reversal as infused factors wear off.", t: "Trap: FFP is slower and volume-heavy; do not use it first when 4F-PCC is available.", m: "Warfarin bleed reversal is fast PCC plus lasting vitamin K" },
        { f: "What are current US reversal options for life-threatening DOAC bleeding?", b: "Dabigatran: idarucizumab. Apixaban/rivaroxaban: 4F-PCC according to institutional protocol.", x: "Andexanet alfa US sales ended in December 2025 after FDA found serious thromboembolic risk outweighed benefit. PCC is used off-label for factor Xa inhibitor reversal.", t: "Trap: Vitamin K reverses warfarin, not DOACs; also assess time since last dose and renal clearance.", m: "Dabigatran has a binder; Xa bleeding uses PCC",
          tb: { h: ["Anticoagulant", "US reversal approach"], r: [["Warfarin", "4F-PCC + IV vitamin K"], ["Dabigatran", "Idarucizumab"], ["Apixaban/rivaroxaban", "4F-PCC per protocol"]] } },
        { f: "What BP target is reasonable in mild-to-moderate spontaneous ICH with presenting SBP 150–220?", b: "Target SBP about 140 mm Hg, maintaining 130–150; avoid lowering below 130.", x: "Use smooth, sustained control. Evidence is less certain in large/severe hemorrhage or patients needing decompressive surgery, so individualize those cases.", t: "Trap: Do not apply the 140 target indiscriminately to every severity and presenting pressure.", m: "Selected ICH: smooth 140, not below 130" }
      ]
    },
    {
      id: "psych-oud",
      system: "PSYCH",
      task: "RX",
      vignette: "A 31-year-old man with opioid use disorder (daily heroin and fentanyl) presents to the emergency department asking for help to stop using. His last use was 20 hours ago. He has yawning, rhinorrhea, piloerection, dilated pupils, restlessness, and abdominal cramping; Clinical Opiate Withdrawal Scale score is 15. He is not pregnant and has no liver disease.",
      leadIn: "What is the most appropriate management?",
      options: [
        "Begin buprenorphine induction and link to ongoing care.",
        "Begin extended-release naltrexone and link to ongoing care.",
        "Use clonidine for detoxification and refer for counseling.",
        "Provide an outpatient methadone prescription for daily home use."
      ],
      correct: 0,
      explanation: "Offer <strong>buprenorphine</strong> induction now under a monitored protocol: he has objective moderate withdrawal (COWS 15). Fentanyl exposure increases precipitated-withdrawal risk, so use clinical findings rather than an elapsed-time rule; alternative low-dose initiation can be appropriate. Link directly to ongoing treatment and provide <strong>naloxone</strong>. Buprenorphine and methadone substantially reduce mortality. The X-waiver was removed in 2023; prescribing still requires appropriate licensure, DEA authority, and compliance with applicable law. Naltrexone requires completed opioid withdrawal, generally at least 7–10 opioid-free days for short-acting opioids and longer after long-acting agents. Outpatient methadone maintenance generally requires an OTP, not a routine home prescription; limited hospital/emergency dispensing exceptions exist.",
      flashcards: [
        { f: "When is buprenorphine started in opioid withdrawal?", b: "Moderate withdrawal (COWS ≥ 8–12), usually 12–24 h after short-acting opioids — earlier dosing precipitates withdrawal.", x: "Buprenorphine has high receptor affinity and can displace full agonists; waiting for withdrawal avoids abrupt net agonist drop.", t: "Trap: Starting too soon after fentanyl/heroin can precipitate severe withdrawal.", m: "Buprenorphine starts when withdrawal has already begun" },
        { f: "What are the regulatory rules for outpatient OUD medications?", b: "Buprenorphine no longer needs an X-waiver; methadone maintenance generally must be provided through an OTP.", x: "Buprenorphine still requires appropriate licensing and DEA authority. Hospitals and limited emergency dispensing pathways can provide methadone under specific exceptions, but a routine office prescription for OUD is not allowed.", t: "Trap: The emergency methadone exception is a limited bridge to treatment, not permission for an ongoing outpatient prescription.", m: "X-waiver gone; methadone maintenance remains structured",
          tb: { h: ["Medication", "Access rule", "Key note"], r: [["Buprenorphine", "DEA prescriber", "No X-waiver"], ["Methadone for OUD", "Certified OTP", "Dispensed, not Rx"], ["Naltrexone", "Any prescriber", "Needs opioid-free"], ["Naloxone", "Prescribe broadly", "Overdose rescue"]] } },
        { f: "What must precede naltrexone initiation for OUD?", b: "Completed withdrawal and an adequate opioid-free interval: generally 7–10 days after short-acting opioids, often longer after methadone or buprenorphine.", x: "Residual opioid dependence can cause severe precipitated withdrawal. Loss of tolerance increases overdose risk after missed doses or discontinuation; provide naloxone.", t: "Trap: A fixed interval is not a guarantee after fentanyl or long-acting opioids; assess clinically and follow the label/protocol.", m: "Naltrexone needs detox, not just a clock" }
      ]
    },
    {
      id: "psych-lithium",
      system: "PSYCH",
      task: "NEXT",
      vignette: "A 58-year-old woman with bipolar disorder on long-term lithium was started on hydrochlorothiazide and lisinopril 3 weeks ago and has been taking ibuprofen for knee pain. She now has vomiting, diarrhea, coarse tremor, ataxia, and confusion. Lithium level is 3.6 mEq/L (therapeutic 0.6–1.2). Creatinine is 2.1 mg/dL (baseline 0.9).",
      leadIn: "In addition to stopping lithium and giving IV isotonic saline, what is the most appropriate next step?",
      options: [
        "Activated charcoal.",
        "Hemodialysis.",
        "Sodium polystyrene sulfonate alone.",
        "Furosemide to enhance excretion."
      ],
      correct: 1,
      explanation: "Lithium is cleared by the kidneys and handled like sodium. <strong>Thiazides, ACE inhibitors/ARBs, NSAIDs</strong>, and volume depletion raise levels. Coarse tremor, ataxia, and confusion = <strong>neurotoxicity</strong>. <strong>Hemodialysis</strong> (EXTRIP) is indicated for <strong>level &gt; 4.0 with impaired kidney function</strong>, or for <strong>decreased consciousness, seizures, or dysrhythmias regardless of level</strong>; it is suggested for level &gt; 5.0, confusion, or AKI. <strong>Activated charcoal does not bind lithium</strong>. Whole-bowel irrigation is for sustained-release ingestions.",
      flashcards: [
        { f: "Which drugs raise lithium levels?", b: "Thiazides, ACE inhibitors/ARBs, NSAIDs (not aspirin) — plus dehydration and CKD.", x: "Lithium reabsorption increases with proximal sodium retention; drugs that reduce renal perfusion or sodium loss raise levels.", t: "Trap: Acetaminophen does not raise lithium like NSAIDs do; NSAID interaction excludes aspirin in many references.", m: "Lithium rises when kidneys conserve sodium" },
        { f: "When is hemodialysis indicated in lithium toxicity?", b: "Level > 4.0 with impaired kidney function, or decreased consciousness, seizures, or dysrhythmias at any level; suggested for > 5.0 or confusion.", x: "Lithium is small, water soluble, and dialyzable; neurologic or cardiac toxicity overrides the numeric level.", t: "Trap: Activated charcoal is useless for lithium because it does not bind it.", m: "Dialyze lithium for sick brain, sick heart, sick kidneys, or very high levels" },
        { f: "Chronic adverse effects of lithium?", b: "Nephrogenic diabetes insipidus, CKD, hypothyroidism, hyperparathyroidism/hypercalcemia, tremor, weight gain; Ebstein anomaly risk in pregnancy (small).", x: "Chronic renal and endocrine effects require periodic creatinine, TSH, and calcium monitoring.", t: "Trap: New polyuria on lithium suggests nephrogenic DI, not psychogenic polydipsia alone.", m: "Lithium chronic triad to monitor: kidney, thyroid, calcium" }
      ]
    },
    {
      id: "derm-bp",
      system: "DERM",
      task: "DX",
      vignette: "An 81-year-old man with type 2 diabetes treated with metformin and sitagliptin has 2 months of intense pruritus, followed by large tense bullae on urticarial plaques on the flexor arms, thighs, and abdomen. The oral mucosa is spared and the Nikolsky sign is negative. Biopsy shows a subepidermal blister with eosinophils; direct immunofluorescence shows linear IgG and C3 along the basement membrane zone.",
      leadIn: "What is the most likely diagnosis?",
      options: [
        "Pemphigus vulgaris.",
        "Dermatitis herpetiformis.",
        "Bullous pemphigoid.",
        "Stevens-Johnson syndrome."
      ],
      correct: 2,
      explanation: "An older adult with pruritus followed by <strong>tense bullae</strong> on urticarial plaques, <strong>mucosal sparing</strong>, a <strong>negative Nikolsky</strong> sign, and <strong>linear IgG/C3 at the basement membrane</strong> = <strong>bullous pemphigoid</strong> (anti-BP180/BP230). <strong>DPP-4 inhibitors</strong> (gliptins) are a recognized trigger, so stop sitagliptin. First-line therapy is <strong>high-potency topical corticosteroids</strong> (clobetasol). <strong>Pemphigus vulgaris</strong> causes flaccid blisters with mucosal erosions, a positive Nikolsky sign, and intercellular (net-like) IgG.",
      flashcards: [
        { f: "Older adult with pruritic tense bullae, mucosal sparing, Nikolsky negative: diagnosis?", b: "Bullous pemphigoid: linear IgG/C3 at basement membrane from anti-BP180/BP230 antibodies.", x: "Subepidermal splitting makes bullae tense and less likely to rupture; age and itch often precede blisters by weeks.", t: "Trap: Pemphigus vulgaris has flaccid bullae, oral erosions, Nikolsky positive, and intercellular IgG.", m: "Bullous pemphigoid: old, itchy, tense, linear basement membrane",
          tb: { h: ["Feature", "Bullous pemphigoid", "Pemphigus vulgaris"], r: [["Age", "Older adults", "Middle age"], ["Blisters", "Tense", "Flaccid"], ["Mucosa", "Usually spared", "Often involved"], ["Nikolsky", "Negative", "Positive"], ["DIF", "Linear BMZ IgG/C3", "Net-like IgG"]] } },
        { f: "Which medication class is a recognized trigger for bullous pemphigoid in older adults?", b: "DPP-4 inhibitors such as sitagliptin; also loops, spironolactone, and checkpoint inhibitors.", x: "Stopping the culprit is part of treatment because drug-triggered disease may persist if exposure continues.", t: "Trap: SGLT2 inhibitors cause genital mycotic infection/euglycemic DKA, not classic bullous pemphigoid.", m: "Gliptins can blister the basement membrane" },
        { f: "First-line treatment for localized or moderate bullous pemphigoid?", b: "High-potency topical corticosteroids, especially clobetasol.", x: "Topical clobetasol can control disease with fewer systemic steroid harms in frail older patients.", t: "Trap: Systemic prednisone is reserved for extensive disease or failed topical therapy; do not start as default.", m: "Clobetasol first when topical treatment is feasible" }
      ]
    },
    {
      id: "derm-dress",
      system: "DERM",
      task: "NEXT",
      vignette: "A 66-year-old man started allopurinol 5 weeks ago for gout. He now has fever 39.0 °C, a diffuse morbilliform rash covering 70% of his body, marked facial edema, and generalized lymphadenopathy. There are no mucosal erosions or blisters. WBC 15,400/µL with 18% eosinophils and atypical lymphocytes; ALT 412 U/L; creatinine 1.8 mg/dL (baseline 1.0).",
      leadIn: "What is the most appropriate management?",
      options: [
        "Reduce allopurinol and give cetirizine with topical clobetasol.",
        "Stop allopurinol and manage with topical steroids as an outpatient.",
        "Stop allopurinol and begin vancomycin plus piperacillin-tazobactam.",
        "Stop allopurinol permanently and give systemic steroids with a slow taper."
      ],
      correct: 3,
      explanation: "Fever, extensive morbilliform rash, <strong>facial edema</strong>, lymphadenopathy, <strong>eosinophilia/atypical lymphocytes</strong>, and <strong>internal organ involvement</strong> (hepatitis, AKI) <strong>2–8 weeks</strong> after starting a drug = <strong>DRESS</strong> (drug reaction with eosinophilia and systemic symptoms). Common culprits are allopurinol, anticonvulsants, sulfonamides, vancomycin, and minocycline. Management: <strong>stop the drug permanently</strong> and give <strong>systemic glucocorticoids</strong> for organ involvement, tapered over <strong>6–8+ weeks</strong> because relapse is common. Monitor later for <strong>autoimmune thyroiditis</strong> and diabetes. HHV-6 reactivation is typical.",
      flashcards: [
        { f: "Fever, facial edema, eosinophilia, hepatitis/AKI 2–8 weeks after allopurinol: diagnosis?", b: "DRESS: drug reaction with eosinophilia and systemic symptoms.", x: "Delayed T-cell drug hypersensitivity may reactivate herpesviruses and injure organs, especially liver and kidney.", t: "Trap: SJS/TEN occurs sooner with mucosal erosions and skin detachment, not prominent eosinophilia.", m: "DRESS wears organs: rash plus eosinophils plus hepatitis/AKI" },
        { f: "Management of DRESS with internal organ involvement?", b: "Permanently stop the culprit drug and give systemic glucocorticoids with a slow ≥6–8 week taper.", x: "Relapses are common if steroids are tapered quickly; monitor CBC, liver, kidney, and later thyroid/glucose.", t: "Trap: Antihistamines alone treat simple morbilliform eruptions, not DRESS with hepatitis or AKI.", m: "DRESS needs a long undressing: stop drug, slow taper" },
        { f: "Common drug triggers of DRESS?", b: "Allopurinol, aromatic anticonvulsants, sulfonamides, vancomycin, minocycline, and dapsone.", x: "Allopurinol risk rises with kidney disease and certain HLA types; rechallenge can be life-threatening.", t: "Trap: Amoxicillin rash with EBV is common but lacks facial edema, eosinophilia, and organ injury.", m: "Allo-Anti-Sulfa-Vanco-Mino-Dapsone: classic DRESS culprits" }
      ]
    },
    {
      id: "obgyn-pcos",
      system: "OBGYN",
      task: "RX",
      vignette: "A 24-year-old woman has irregular menses (6 periods per year since menarche) and hirsutism on the chin and lower abdomen. BMI is 31. Pregnancy test is negative. Total testosterone is mildly elevated; TSH, prolactin, and morning 17-hydroxyprogesterone are normal. Ultrasound shows > 20 follicles per ovary. She does not want pregnancy now. She does not smoke, BP is 118/76 mm Hg, and she has no migraine.",
      leadIn: "What is the most appropriate first-line treatment?",
      options: [
        "Combined estrogen-progestin oral contraceptive.",
        "Letrozole.",
        "Spironolactone monotherapy without contraception.",
        "Clomiphene citrate."
      ],
      correct: 0,
      explanation: "Oligo-ovulation, clinical/biochemical <strong>hyperandrogenism</strong>, and polycystic ovarian morphology (2 of 3 = <strong>Rotterdam</strong>), after excluding thyroid disease, hyperprolactinemia, and <strong>nonclassic CAH</strong> (17-OHP), = <strong>PCOS</strong>. For a patient <strong>not seeking pregnancy</strong>, <strong>combined hormonal contraceptives</strong> are first-line: they regulate menses, protect the endometrium from unopposed estrogen (hyperplasia/cancer), and reduce androgens. Add <strong>spironolactone</strong> for persistent hirsutism, but <strong>only with reliable contraception</strong> (feminizes a male fetus). <strong>Letrozole</strong> is first-line for ovulation induction when pregnancy is desired. Screen for <strong>diabetes (OGTT), dyslipidemia, and OSA</strong>.",
      flashcards: [
        { f: "What diagnostic criteria establish PCOS after excluding mimics?", b: "Rotterdam: 2 of 3: oligo/anovulation, hyperandrogenism, polycystic ovaries.", x: "Exclude thyroid disease, hyperprolactinemia, and nonclassic CAH because they can cause irregular menses or androgen excess.", t: "Trap: Polycystic ovaries alone do not diagnose PCOS; one other criterion is needed.", m: "Rotterdam = 2 of 3 after excluding look-alikes",
          tb: { h: ["Criterion", "What counts"], r: [["Oligo-ovulation", "Irregular or few menses"], ["Hyperandrogenism", "Clinical or biochemical"], ["Ovarian morphology", "Polycystic ovaries"]] } },
        { f: "First-line treatment for PCOS when pregnancy is not desired?", b: "Combined hormonal contraceptive; add spironolactone for persistent hirsutism with contraception.", x: "Progestin exposure protects the endometrium from chronic unopposed estrogen and reduces ovarian androgen production.", t: "Trap: Letrozole is first-line for ovulation induction when pregnancy is desired, not cycle control.", m: "No baby goal: CHC first; baby goal: letrozole",
          tb: { h: ["Goal", "First choice", "Add-on"], r: [["No pregnancy", "CHC", "Spironolactone"], ["Pregnancy desired", "Letrozole", "Metformin sometimes"]] } },
        { f: "What metabolic screening is recommended in PCOS?", b: "Screen with OGTT preferred, or A1c if OGTT not feasible; also assess lipids, BP, depression, and OSA.", x: "Insulin resistance and obesity increase lifetime cardiometabolic risk even in young patients.", t: "Trap: Normal BMI does not exclude metabolic risk; lean PCOS still needs screening.", m: "PCOS = reproductive plus metabolic diagnosis" }
      ]
    },
    {
      id: "obgyn-pmb",
      system: "OBGYN",
      task: "NEXT",
      vignette: "A 62-year-old woman, postmenopausal for 10 years, reports 2 episodes of light vaginal bleeding over the past month. She has obesity (BMI 36) and type 2 diabetes and does not take hormone therapy. Pelvic examination shows no cervical or vaginal lesion. Transvaginal ultrasound shows an endometrial thickness of 9 mm.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Reassurance; this is atrophic vaginitis.",
        "Endometrial biopsy.",
        "Start combined estrogen-progestin therapy.",
        "Repeat ultrasound in 12 months."
      ],
      correct: 1,
      explanation: "<strong>Postmenopausal bleeding requires evaluation to exclude endometrial cancer</strong>, although benign causes are more common. Obesity and diabetes raise concern, and this patient's 9-mm endometrium requires <strong>endometrial biopsy</strong>. In an initial bleeding episode, TVUS showing ≤4 mm has a very high negative predictive value; persistent or recurrent bleeding requires tissue evaluation regardless of thickness. Persistent bleeding after a benign blind biopsy warrants evaluation for focal lesions with hysteroscopy and appropriate sampling. Lynch-associated endometrial cancer risk varies substantially by gene rather than being uniformly 40–60%.",
      flashcards: [
        { f: "Postmenopausal bleeding with endometrial thickness >4 mm: next step?", b: "Endometrial biopsy; persistent bleeding needs sampling even if stripe is ≤4 mm.", x: "A thin stripe has high negative predictive value, but recurrent bleeding can miss focal cancer or polyps.", t: "Trap: Reassurance is only reasonable after a single episode with stripe ≤4 mm and no recurrent bleeding.", m: "Postmenopausal blood needs a stripe or sample",
          tb: { h: ["Finding", "Next step"], r: [["Stripe ≤4 mm", "Observe if single episode"], ["Stripe >4 mm", "Endometrial biopsy"], ["Persistent bleeding", "Sample regardless"]] } },
        { f: "Major risk factors for endometrial cancer?", b: "Unopposed estrogen, obesity, chronic anovulation/PCOS, tamoxifen, diabetes, nulliparity, Lynch syndrome.", x: "Peripheral aromatization in adipose tissue drives estrogen exposure without progesterone opposition.", t: "Trap: Combined estrogen-progestin therapy protects the endometrium; estrogen-only therapy increases risk.", m: "Unopposed estrogen: fat, PCOS, tamoxifen, Lynch" },
        { f: "What endometrial protection is needed with systemic menopausal estrogen?", b: "With an intact uterus, add a progestogen or use the approved conjugated-estrogen/bazedoxifene combination.", x: "Systemic unopposed estrogen increases endometrial hyperplasia and cancer risk; low-dose local vaginal estrogen generally does not require added progestogen.", t: "Trap: The systemic hormone rule should not be applied automatically to low-dose vaginal therapy; any postmenopausal bleeding still needs evaluation.", m: "Systemic estrogen plus uterus needs protection" }
      ]
    },
    {
      id: "geri-bpsd",
      system: "GERI",
      task: "NEXT",
      vignette: "An 84-year-old woman with moderate Alzheimer dementia in assisted living has become increasingly agitated over 2 weeks, especially during morning care, calling out and pushing staff away. She has severe knee osteoarthritis and grimaces when her legs are moved. She takes donepezil only. She has no fever, urinary symptoms, or constipation, and urinalysis and basic labs are normal.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Begin low-dose risperidone before morning care.",
        "Begin low-dose lorazepam before morning care.",
        "Scheduled acetaminophen and individualized care approaches.",
        "Increase donepezil and add memantine for behavioral symptoms."
      ],
      correct: 2,
      explanation: "<strong>Behavioral and psychological symptoms of dementia</strong> often reflect an <strong>unmet need</strong> such as <strong>pain</strong>, infection, constipation, urinary retention, or sensory deprivation, because patients cannot report symptoms. Agitation during care in someone with painful OA calls for <strong>scheduled analgesia</strong> (acetaminophen), which reduces agitation in trials. Combine it with <strong>nonpharmacologic strategies</strong> (DICE approach, caregiver techniques, routine). <strong>Antipsychotics</strong> carry a <strong>boxed warning for increased mortality</strong> (stroke, infection) in dementia and are reserved for dangerous behavior or psychosis after other measures fail. Benzodiazepines and anticholinergics worsen cognition and falls (Beers).",
      flashcards: [
        { f: "First step for agitation during care in a patient with dementia and painful osteoarthritis?", b: "Treat pain with scheduled acetaminophen and use individualized nonpharmacologic care.", x: "Agitation often signals unmet needs because dementia impairs symptom reporting; analgesia can reduce behaviors.", t: "Trap: Antipsychotics are not first-line unless danger or severe psychosis persists after reversible triggers.", m: "Dementia agitation: pain until proven otherwise" },
        { f: "What boxed warning applies to antipsychotics in dementia-related psychosis?", b: "Increased mortality, often cardiovascular or infectious; use the lowest dose briefly only if necessary.", x: "They also increase stroke, parkinsonism, sedation, orthostasis, and falls in frail older adults.", t: "Trap: Benzodiazepines are not safer; they worsen delirium, cognition, gait, and falls.", m: "Antipsychotics in dementia carry a mortality warning" },
        { f: "Which symptomatic Alzheimer medications are used by stage?", b: "Donepezil: mild–severe; rivastigmine oral: mild–moderate, patch also severe; galantamine: mild–moderate; memantine: moderate–severe.", x: "Cholinesterase inhibitors offer modest symptomatic benefit and can cause bradycardia, syncope, nausea, or weight loss; formulation matters for labeled indications.", t: "Trap: These drugs do not rapidly treat agitation from pain; address reversible triggers before escalating cognitive medications.", m: "Cognitive drugs are not agitation rescue",
          tb: { h: ["Drug/formulation", "Alzheimer stage"], r: [["Donepezil", "Mild to severe"], ["Rivastigmine oral", "Mild to moderate"], ["Rivastigmine patch", "Mild to severe"], ["Galantamine", "Mild to moderate"], ["Memantine", "Moderate to severe"]] } }
      ]
    },
    {
      id: "found-nnt",
      system: "FOUND",
      task: "RISK",
      vignette: "In a randomized trial of a new anticoagulant for patients with atrial fibrillation, stroke occurred in 4% of patients receiving placebo and 3% of patients receiving the drug over 2 years. Major bleeding occurred in 1% with placebo and 2% with the drug.",
      leadIn: "How many patients must be treated for 2 years to prevent one stroke?",
      options: [
        "25 patients",
        "4 patients",
        "33 patients",
        "100 patients"
      ],
      correct: 3,
      explanation: "<strong>Absolute risk reduction</strong> = 4% − 3% = <strong>1%</strong>, or 0.01. <strong>NNT = 1/0.01 = 100 over 2 years</strong>. Relative risk reduction is 1%/4% = <strong>25%</strong>. For major bleeding, absolute risk increase is 2% − 1% = 1%, so <strong>NNH = 100 over 2 years</strong>. These are average expected differences, not a guarantee of exactly one event per group of 100; equal NNT and NNH do not imply equal clinical importance of the outcomes.",
      flashcards: [
        { f: "How do you calculate absolute risk reduction and NNT from a trial?", b: "ARR = control event rate − treatment event rate; NNT = 1/ARR, rounded up.", x: "Use absolute proportions, not percentages; NNT applies over the trial time horizon.", t: "Trap: Relative risk reduction sounds larger but does not give the number of patients helped.", m: "NNT is the inverse of absolute benefit",
          tb: { h: ["Measure", "Formula"], r: [["ARR", "Control risk − treated risk"], ["NNT", "1 ÷ ARR, round up"], ["RRR", "ARR ÷ control risk"]] } },
        { f: "How is relative risk reduction calculated?", b: "RRR = ARR ÷ control event rate = 1 − relative risk.", x: "RRR describes proportional benefit; it can look impressive when baseline risk is low.", t: "Trap: A 25% RRR may be only a 1% ARR if events fall from 4% to 3%.", m: "Relative sounds big; absolute tells bedside impact" },
        { f: "How is number needed to harm calculated?", b: "NNH = 1 ÷ absolute risk increase for the adverse event, rounded up.", x: "Compare NNT and NNH over the same duration to judge net clinical tradeoffs.", t: "Trap: Do not subtract adverse-event relative risks; use absolute event-rate differences.", m: "NNH mirrors NNT for harms" }
      ]
    },
    {
      id: "found-error-disclosure",
      system: "FOUND",
      task: "NEXT",
      vignette: "A 72-year-old hospitalized man was mistakenly given a dose of enoxaparin intended for another patient. He had no bleeding, and his hemoglobin and platelet count are unchanged at 24 hours. The resident who discovered the error asks whether the patient needs to be told, because no harm resulted.",
      leadIn: "What is the most appropriate action?",
      options: [
        "Disclose the error promptly, apologize, and report it through the safety system.",
        "Do not disclose, because no harm occurred and disclosure may cause anxiety.",
        "Disclose only if the patient asks about his medications at discharge.",
        "Notify the hospital attorney before any discussion with the patient."
      ],
      correct: 0,
      explanation: "Disclose this medication error <strong>promptly and honestly</strong>, even though no injury was detected. Explain what happened, known clinical implications, monitoring, and prevention plans, and apologize. Report through the institutional safety system so contributing workflow problems can be addressed. A <strong>just culture</strong> balances systems improvement with appropriate accountability for reckless behavior; it is not a guarantee of no individual accountability. Disclosure is an ethical duty, not contingent on predicted malpractice effects.",
      flashcards: [
        { f: "What should a physician do after a medication error reaches a patient but causes no harm?", b: "Disclose promptly, apologize, explain implications, and report through the safety system.", x: "Transparency preserves trust and reporting enables system fixes that reduce recurrence.", t: "Trap: Near misses are reported internally, but errors reaching the patient also require patient disclosure.", m: "Reached patient → reveal, repair, report" },
        { f: "Key elements of medical error disclosure?", b: "What happened, clinical consequences, apology, care plan, and steps to prevent recurrence.", x: "Avoid speculation or blame; give known facts and update the patient as more information emerges.", t: "Trap: Do not wait for proof of harm before disclosure if the error reached the patient.", m: "Facts, effects, apology, plan, prevention" },
        { f: "What is root cause analysis after an adverse event?", b: "A structured systems review to find latent failures in a just culture, not to blame one person.", x: "It asks how defenses failed: communication, workflow, equipment, staffing, and handoffs.", t: "Trap: Peer review of individual negligence is different from RCA focused on preventable system defects.", m: "RCA asks how the system failed, not who to blame" }
      ]
    },
    {
      id: "found-preop-mets",
      system: "FOUND",
      task: "TEST",
      vignette: "A 68-year-old man with type 2 diabetes (on metformin), hypertension, and hyperlipidemia is scheduled for elective laparoscopic colectomy for a colon adenocarcinoma. He has no history of coronary disease, heart failure, or stroke, and no chest pain or dyspnea. He walks his dog 2 miles daily and climbs two flights of stairs without symptoms. ECG is normal.",
      leadIn: "What is the most appropriate preoperative cardiac evaluation?",
      options: [
        "Pharmacologic nuclear myocardial perfusion imaging.",
        "Transthoracic echocardiography.",
        "No further testing; proceed with surgery.",
        "Coronary CT angiography."
      ],
      correct: 2,
      explanation: "Per ACC/AHA (2024) perioperative guidelines, assess <strong>surgical risk</strong> (intraperitoneal = elevated risk), <strong>clinical risk</strong> (RCRI 1 point for intraperitoneal surgery; metformin-treated diabetes does not count), and <strong>functional capacity</strong>. Patients able to do <strong>≥ 4 METs</strong> without symptoms (climbing 2 flights of stairs, brisk walking) can <strong>proceed to surgery without stress testing</strong>. Testing is only for those with poor or unknown functional capacity in whom results would change management. Prophylactic revascularization before noncardiac surgery does not improve outcomes.",
      flashcards: [
        { f: "When is preoperative stress testing indicated before noncardiac surgery?", b: "Elevated-risk surgery plus poor/unknown functional capacity <4 METs, only if results change management.", x: "Testing low-risk or functional patients delays care and rarely improves outcomes.", t: "Trap: Good functional capacity ≥4 METs means proceed without stress testing even for elevated-risk surgery.", m: "4 METs clears most preop stress-test questions",
          tb: { h: ["Surgery risk", "Capacity", "Stress test"], r: [["Low risk", "Any", "No"], ["Elevated risk", "≥4 METs", "No, proceed"], ["Elevated risk", "<4 METs", "If changes care"], ["Elevated risk", "Unknown", "If changes care"]] } },
        { f: "What are the six Revised Cardiac Risk Index predictors?", b: "High-risk surgery, ischemic heart disease, heart failure, cerebrovascular disease, insulin diabetes, Cr >2.", x: "RCRI estimates perioperative major cardiac events and guides testing only with functional status and surgical risk.", t: "Trap: Diabetes controlled without insulin is not an RCRI point.", m: "RCRI: six simple cardiac risk flags" },
        { f: "What activities suggest functional capacity of at least 4 METs?", b: "Climbing 1–2 flights of stairs, walking uphill, brisk 4-mph walking, heavy housework, doubles tennis.", x: "Ability to perform these without ischemic symptoms predicts acceptable perioperative cardiac reserve.", t: "Trap: Inability from arthritis may make capacity unknown; testing still only if it would change management.", m: "Stairs equal roughly 4 METs" }
      ]
    },
    {
      id: "crit-salicylate",
      system: "CRIT",
      task: "RX",
      vignette: "A 34-year-old woman presents 4 hours after ingesting a bottle of aspirin. She has tinnitus, nausea, and tachypnea but is alert and oriented. Arterial pH 7.47, PaCO₂ 24 mm Hg, HCO₃⁻ 17 mEq/L. Anion gap is 20. Salicylate level is 58 mg/dL. Creatinine is normal, K⁺ 3.9 mEq/L, and chest radiograph is clear.",
      leadIn: "In addition to activated charcoal, what is the most appropriate treatment?",
      options: [
        "Immediate endotracheal intubation for airway protection and ventilatory support.",
        "Hemodialysis now, before alkalinization.",
        "IV N-acetylcysteine, as for acetaminophen co-ingestion.",
        "IV sodium bicarbonate infusion to alkalinize the urine, with potassium repletion."
      ],
      correct: 3,
      explanation: "Tinnitus with <strong>mixed primary respiratory alkalosis + anion gap metabolic acidosis</strong> = <strong>salicylate toxicity</strong>. <strong>Sodium bicarbonate</strong> targets serum pH 7.45–7.55 and <strong>urine pH 7.5–8.0</strong>, trapping ionized salicylate in urine and keeping it out of the CNS. Maintain <strong>normal potassium</strong>, because hypokalemia prevents urinary alkalinization. <strong>Hemodialysis</strong> (EXTRIP) is for a level <strong>&gt; 100 mg/dL</strong> (&gt; 90 with impaired kidney function), <strong>altered mental status</strong>, hypoxemia/pulmonary edema, or pH ≤ 7.20. <strong>Avoid intubation</strong> if possible: loss of compensatory hyperventilation causes rapid acidemia and death. If intubation is unavoidable, hyperventilate.",
      flashcards: [
        { f: "Tinnitus with respiratory alkalosis plus anion-gap metabolic acidosis suggests what poisoning?", b: "Salicylate toxicity.", x: "Salicylates stimulate the medullary respiratory center early and later uncouple oxidative phosphorylation causing acidosis.", t: "Trap: DKA causes anion-gap acidosis without primary respiratory alkalosis or tinnitus.", m: "Tinnitus plus mixed alk-acid = aspirin" },
        { f: "Treatment to enhance salicylate elimination after activated charcoal?", b: "IV sodium bicarbonate to alkalinize urine to pH 7.5–8.0, with potassium repletion.", x: "Alkaline urine traps ionized salicylate and reduces CNS penetration; hypokalemia prevents urine alkalinization.", t: "Trap: Intubation can be dangerous; loss of hyperventilation causes abrupt acidemia and CNS salicylate shift.", m: "Alkaline urine traps aspirin" },
        { f: "When is hemodialysis indicated for salicylate poisoning?", b: "Level >100 mg/dL, >90 with kidney impairment, AMS, pulmonary edema/hypoxemia, pH ≤7.20, or failed therapy.", x: "Dialysis rapidly clears salicylate and corrects acid-base/electrolyte derangements in severe toxicity.", t: "Trap: Do not rely on level alone; symptoms and acidemia can mandate dialysis at lower levels.", m: "Dialyze salicylate when severe by number or symptoms",
          tb: { h: ["Dialysis trigger", "Threshold"], r: [["Level", ">100 mg/dL"], ["Kidney impairment", ">90 mg/dL"], ["Acidemia", "pH ≤7.20"], ["Clinical", "AMS or pulmonary edema"]] } }
      ]
    },
    {
      id: "crit-heat-stroke",
      system: "CRIT",
      task: "RX",
      vignette: "A 19-year-old military recruit collapses during a 10-mile run on a hot, humid day. He is confused and combative. Rectal temperature is 41.5 °C, HR 148/min, BP 96/58 mm Hg. His skin is hot and sweaty. Glucose is normal.",
      leadIn: "What is the most appropriate immediate treatment?",
      options: [
        "Immediate cold-water immersion to rapidly lower core temperature.",
        "IV acetaminophen.",
        "IV dantrolene.",
        "Fan cooling alone during transport, with cooling deferred until labs result."
      ],
      correct: 0,
      explanation: "Core temperature <strong>&gt; 40 °C with CNS dysfunction</strong> = <strong>heat stroke</strong>. Classic heat stroke is seen in older adults during heat waves; this is the <strong>exertional</strong> form, with sweating often still present. Survival depends on how quickly temperature falls: use <strong>cold-water (ice-water) immersion</strong>, the fastest method, targeting <strong>&lt; 39 °C within 30 minutes</strong> (\"cool first, transport second\"). <strong>Antipyretics are ineffective</strong> (hypothalamic set point is normal), and <strong>dantrolene</strong> is for malignant hyperthermia. Monitor for <strong>rhabdomyolysis, AKI, DIC, liver injury, and hypoglycemia</strong>.",
      flashcards: [
        { f: "Core temperature >40 °C with confusion during exertion: diagnosis?", b: "Exertional heat stroke.", x: "CNS dysfunction distinguishes heat stroke from heat exhaustion and predicts multiorgan injury.", t: "Trap: Sweating can be present in exertional heat stroke; anhidrosis is not required.", m: "Hot brain after exertion = heat stroke" },
        { f: "Immediate treatment for exertional heat stroke?", b: "Cold-water immersion; cool to <39 °C within 30 minutes, then transport.", x: "Time above critical temperature drives mortality: cool first, transport second when feasible.", t: "Trap: Acetaminophen and NSAIDs do not work because the hypothalamic set point is normal.", m: "Cool first, transport second",
          tb: { h: ["Intervention", "Role"], r: [["Cold-water immersion", "Fastest cooling"], ["Target temp", "<39 °C"], ["Time goal", "Within 30 min"], ["Antipyretics", "Ineffective"]] } },
        { f: "Major complications to monitor after heat stroke?", b: "Rhabdomyolysis, AKI, DIC, liver injury, ARDS, hypoglycemia, hyperkalemia, and hypocalcemia.", x: "Thermal injury and muscle breakdown can evolve after initial cooling, so serial labs and urine output matter.", t: "Trap: Dantrolene treats malignant hyperthermia, not ordinary exertional heat stroke.", m: "Heat cooks muscle, liver, kidneys, and clotting" }
      ]
    }
    ,
    /* ==================================================================
     * V2.6 expansion — 32 items targeting the thinnest categories
     * (OB/GYN, Psych, Derm, Onc, Neuro) plus uncovered topics: valvular
     * disease, aorta, altitude/sleep, glomerular disease, travel and
     * transplant ID, bleeding disorders, hospice, and test statistics.
     * Correct positions rotate A→D (8 each).
     * ================================================================== */
    {
      id: "cv-ms-warfarin",
      system: "CV",
      task: "RX",
      vignette: "A 46-year-old woman who emigrated from Nepal has progressive exertional dyspnea. She has an irregularly irregular rhythm and a low-pitched diastolic rumble at the apex preceded by an opening snap. ECG shows atrial fibrillation. Echocardiogram shows rheumatic mitral stenosis with a mitral valve area of 1.3 cm².",
      leadIn: "Which is the most appropriate long-term anticoagulant?",
      options: [
        "Warfarin with an INR goal of 2.0–3.0.",
        "Apixaban 5 mg twice daily for atrial fibrillation as fixed-dose anticoagulation that avoids INR monitoring.",
        "Rivaroxaban 20 mg daily as a direct oral anticoagulant alternative to INR monitoring.",
        "Aspirin plus clopidogrel for stroke prevention instead of therapeutic anticoagulation."
      ],
      correct: 0,
      explanation: "AF with <strong>moderate–severe rheumatic mitral stenosis</strong> requires anticoagulation <strong>regardless of CHA₂DS₂-VASc</strong> with a <strong>vitamin K antagonist (warfarin, INR 2–3)</strong>. The <strong>INVICTUS</strong> trial favored VKA over rivaroxaban in rheumatic heart disease-associated AF. DOACs are acceptable for many other native valve lesions and generally &gt; 3 months after bioprosthetic valve implantation when otherwise appropriate. Mechanical valves also require warfarin. Dual antiplatelet therapy is not a substitute.",
      flashcards: [
        { f: "AF with moderate–severe rheumatic mitral stenosis: preferred anticoagulant?", b: "Warfarin with INR goal 2.0–3.0, regardless of CHA₂DS₂-VASc.", x: "Rheumatic MS carries high left atrial thrombus risk and was excluded from DOAC AF trials.", t: "Trap: DOACs are acceptable for many native valve lesions, but not rheumatic MS.", m: "Rheumatic MS and mechanical valves stay with warfarin" },
        { f: "Which valve conditions require warfarin rather than a DOAC for AF?", b: "Mechanical heart valve and moderate–severe rheumatic mitral stenosis.", x: "INVICTUS showed worse outcomes with rivaroxaban than VKA in rheumatic heart disease.", t: "Trap: A bioprosthetic valve >3 months after surgery usually can use a DOAC if otherwise appropriate.", m: "Two DOAC no-go valves: mechanical and rheumatic MS",
          tb: { h: ["Valve setting", "AF anticoagulant"], r: [["Moderate-severe rheum MS", "Warfarin"], ["Mechanical valve", "Warfarin"], ["Native AS or MR", "DOAC ok"], ["Bioprosthetic >3 mo", "DOAC usually ok"]] } },
        { f: "Classic auscultation finding of mitral stenosis?", b: "Opening snap followed by a low-pitched diastolic rumble at the apex.", x: "A shorter A2-to-opening-snap interval suggests more severe stenosis from higher left atrial pressure.", t: "Trap: Mitral regurgitation is a holosystolic blowing murmur radiating to the axilla.", m: "MS murmur: snap then rumble" }
      ]
    },
    {
      id: "cv-ie-prophylaxis",
      system: "CV",
      task: "RX",
      vignette: "A 34-year-old man with a bicuspid aortic valve and mild aortic stenosis is scheduled for a dental extraction. He has never had endocarditis and has no prosthetic material. He has no drug allergies.",
      leadIn: "What is the most appropriate antibiotic recommendation before the procedure?",
      options: [
        "Amoxicillin 2 g orally 30–60 minutes before the procedure.",
        "No antibiotic prophylaxis is indicated.",
        "Amoxicillin 2 g before and 1 g 6 hours after the procedure.",
        "Clindamycin 600 mg orally 1 hour before the procedure."
      ],
      correct: 1,
      explanation: "AHA endocarditis prophylaxis is limited to patients at <strong>highest risk of a poor outcome</strong>: <strong>prosthetic valve or prosthetic material used for valve repair (including TAVR, annuloplasty rings, clips)</strong>, <strong>prior infective endocarditis</strong>, <strong>unrepaired cyanotic congenital heart disease</strong> (or repaired with residual shunt/defect next to prosthetic material, or within 6 months of complete repair), and <strong>cardiac transplant with valvulopathy</strong>. The procedure must involve <strong>manipulation of gingival tissue, the periapical region of teeth, or perforation of the oral mucosa</strong>. A bicuspid valve, mitral valve prolapse, and native valve stenosis/regurgitation do <strong>not</strong> qualify. Prophylaxis is not recommended for GI or GU procedures. Clindamycin is no longer recommended (C. difficile risk); use azithromycin or doxycycline for penicillin allergy.",
      flashcards: [
        { f: "Which cardiac patients need endocarditis prophylaxis before qualifying dental procedures?", b: "Prosthetic valve/material, prior IE, select congenital heart disease, or transplant valvulopathy.", x: "Prophylaxis is limited to highest-risk patients when gingiva, periapical tissue, or oral mucosa is manipulated.", t: "Trap: Bicuspid valve, MVP, and native stenosis/regurgitation alone do not qualify.", m: "Dental IE prophylaxis only for highest-risk hearts",
          tb: { h: ["Qualifies", "Examples"], r: [["Prosthetic valve", "TAVR, ring, clip"], ["Prior IE", "Any prior episode"], ["High-risk CHD", "Cyanotic or residual"], ["Transplant", "With valvulopathy"]] } },
        { f: "Standard antibiotic prophylaxis regimen for dental IE prevention?", b: "Amoxicillin 2 g orally 30–60 minutes before the procedure.", x: "For penicillin allergy, use azithromycin 500 mg or doxycycline 100 mg; avoid clindamycin.", t: "Trap: Clindamycin is no longer preferred because of C. difficile and adverse reactions.", m: "Amox 2 g before dental work" },
        { f: "Do GI or GU procedures require infective endocarditis prophylaxis?", b: "No, IE prophylaxis is not recommended for GI or GU procedures.", x: "Transient bacteremia from daily activities exceeds most procedure-related risk; dental prophylaxis is narrowly targeted.", t: "Trap: Give antibiotics for active infection when indicated, but that is treatment, not IE prophylaxis.", m: "GI/GU gets treatment for infection, not IE prophylaxis" }
      ]
    },
    {
      id: "cv-aaa-surveillance",
      system: "CV",
      task: "NEXT",
      vignette: "A 70-year-old man who currently smokes has an asymptomatic 4.6-cm infrarenal abdominal aortic aneurysm found on screening ultrasonography. He has hypertension controlled with amlodipine. Abdominal exam is unremarkable.",
      leadIn: "What is the most appropriate management?",
      options: [
        "Referral for elective endovascular aneurysm repair.",
        "No further imaging is needed.",
        "Smoking cessation and repeat ultrasonography in 12 months.",
        "Start doxycycline to slow aneurysm growth."
      ],
      correct: 2,
      explanation: "For a stable fusiform AAA, repair is recommended at <strong>≥ 5.5 cm in men</strong> or <strong>≥ 5.0 cm in women</strong>, or for symptoms attributable to the aneurysm. Growth <strong>≥ 0.5 cm in 6 months</strong> may also justify repair. ACC/AHA surveillance: <strong>3.0–3.9 cm every 3 years</strong>; annually for <strong>men 4.0–4.9 cm and women 4.0–4.4 cm</strong>; every 6 months for <strong>men ≥5.0 cm and women ≥4.5 cm</strong> pending repair. This man's 4.6-cm AAA needs annual ultrasound. Smoking cessation, BP control, and appropriate atherosclerotic risk treatment are important. Doxycycline has not reliably slowed AAA growth.",
      flashcards: [
        { f: "AAA size threshold for elective repair in asymptomatic patients?", b: "Men ≥5.5 cm; women ≥5.0 cm. Symptoms warrant repair, and growth ≥0.5 cm in 6 months may justify repair.", x: "Rupture risk rises steeply at these diameters; consider anatomy, operative risk, and patient goals.", t: "Trap: Do not substitute the ascending-aorta growth criterion for the AAA criterion.", m: "AAA: 5.5 men, 5.0 women; rapid half-centimeter in half-year" },
        { f: "What are ACC/AHA ultrasound surveillance intervals for stable unrepaired AAA?", b: "3.0–3.9 cm: every 3 years. Men 4.0–4.9 or women 4.0–4.4: annually. Men ≥5.0 or women ≥4.5: every 6 months.", x: "Women have higher rupture risk at smaller diameters, so their surveillance and repair thresholds are lower.", t: "Trap: Use sex-specific intervals; a woman with a 4.6-cm AAA needs 6-month, not annual, surveillance.", m: "AAA surveillance: size and sex set the clock",
          tb: { h: ["AAA diameter", "Action"], r: [["Either sex 3.0–3.9 cm", "Ultrasound every 3 years"], ["Men 4.0–4.9; women 4.0–4.4", "Ultrasound annually"], ["Men ≥5.0; women ≥4.5", "Ultrasound every 6 months pending repair"], ["Men ≥5.5 cm", "Refer for elective repair"], ["Women ≥5.0 cm", "Refer for elective repair"]] } },
        { f: "Most important modifiable intervention to slow AAA growth/rupture?", b: "Smoking cessation, plus BP control and statin therapy for atherosclerotic risk.", x: "Smoking is the strongest modifiable risk for AAA formation, expansion, and rupture.", t: "Trap: Doxycycline and other medications have not reliably slowed AAA growth.", m: "Smoking is AAA fuel" }
      ]
    },
    {
      id: "pulm-hape",
      system: "PULM",
      task: "RX",
      vignette: "A 32-year-old healthy man is on day 3 of a trek in Nepal and is now at 4,600 m. Over the past day he has developed dyspnea at rest, a dry cough that is now producing pink frothy sputum, and decreased exercise tolerance. SpO₂ is 68%, HR 120/min, temperature 37.8 °C. Crackles are heard in the right mid-lung field. He is alert and has a normal gait.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Oral acetazolamide and rest at the current altitude.",
        "Oral dexamethasone and continue ascent slowly.",
        "Oral furosemide.",
        "Immediate descent and supplemental oxygen."
      ],
      correct: 3,
      explanation: "This is <strong>high-altitude pulmonary edema (HAPE)</strong>: non-cardiogenic edema from <strong>exaggerated hypoxic pulmonary vasoconstriction</strong>, usually 2–4 days after arrival above 2,500 m. Treatment is <strong>descent (at least 300–1,000 m) and supplemental oxygen</strong>. If descent or oxygen is not possible, give <strong>nifedipine</strong> (portable hyperbaric chamber is an alternative). Nifedipine is also used for <strong>prevention</strong> in people with prior HAPE. <strong>Acetazolamide</strong> prevents/treats acute mountain sickness. <strong>Dexamethasone</strong> treats high-altitude cerebral edema (ataxia, confusion). Diuretics are not recommended because these patients are often volume depleted.",
      flashcards: [
        { f: "High-altitude pulmonary edema treatment?", b: "Immediate descent and supplemental oxygen; use nifedipine or portable hyperbaric chamber if descent/O₂ unavailable.", x: "HAPE is noncardiogenic edema from hypoxic pulmonary vasoconstriction, so reversing hypoxia is key.", t: "Trap: Diuretics are not recommended; patients are often volume depleted.", m: "HAPE: down and oxygen" },
        { f: "High-altitude cerebral edema vs acute mountain sickness: treatment?", b: "HACE: descent plus dexamethasone. AMS: stop ascent, acetazolamide, analgesics/antiemetics.", x: "Ataxia or confusion at altitude is HACE until proven otherwise and requires urgent descent.", t: "Trap: Acetazolamide helps AMS prevention/treatment but is not definitive treatment for HACE.", m: "Altitude brain signs: descend and dex",
          tb: { h: ["Altitude illness", "Key sign", "Treatment"], r: [["AMS", "Headache nausea", "Stop ascent, acetazolamide"], ["HACE", "Ataxia confusion", "Descent plus dex"], ["HAPE", "Dyspnea crackles", "Descent plus oxygen"]] } },
        { f: "Mechanism of high-altitude pulmonary edema?", b: "Uneven exaggerated hypoxic pulmonary vasoconstriction → high capillary pressure → leak edema.", x: "Susceptible people develop patchy overperfusion of capillaries despite normal left-sided filling pressures.", t: "Trap: HAPE is not heart failure; normal JVP and no cardiomegaly support noncardiogenic edema.", m: "HAPE is pressure leak, not pump failure" }
      ]
    },
    {
      id: "pulm-ohs",
      system: "PULM",
      task: "DX",
      vignette: "A 52-year-old woman with a BMI of 46 has daytime sleepiness, morning headaches, and leg swelling. She has never smoked. Spirometry shows a mildly reduced FVC with a normal FEV₁/FVC ratio. Room-air ABG while awake: pH 7.37, PaCO₂ 54 mm Hg, PaO₂ 62 mm Hg. Serum bicarbonate is 31 mEq/L. Thyroid studies are normal.",
      leadIn: "What is the most likely diagnosis?",
      options: [
        "Obesity hypoventilation syndrome.",
        "Obstructive sleep apnea alone.",
        "Chronic obstructive pulmonary disease.",
        "Amyotrophic lateral sclerosis."
      ],
      correct: 0,
      explanation: "<strong>Obesity hypoventilation syndrome (OHS)</strong> = <strong>BMI ≥ 30</strong> + <strong>awake daytime hypercapnia (PaCO₂ &gt; 45 mm Hg)</strong> + no other cause of hypoventilation. About <strong>90% also have OSA</strong>, but OSA alone does not cause awake hypercapnia. A <strong>serum bicarbonate ≥ 27 mEq/L</strong> is a useful screening clue (metabolic compensation). Normal FEV₁/FVC rules out COPD. Complications include pulmonary hypertension, right heart failure, and high mortality. Treatment: <strong>positive airway pressure</strong> (CPAP if severe OSA coexists; otherwise noninvasive ventilation/bilevel) plus <strong>weight loss</strong> (including bariatric surgery). Avoid sedatives and excessive oxygen.",
      flashcards: [
        { f: "Diagnostic criteria for obesity hypoventilation syndrome?", b: "BMI ≥30, awake PaCO₂ >45 mm Hg, and no alternative cause of hypoventilation.", x: "Most patients also have OSA, but OSA alone should not cause daytime hypercapnia.", t: "Trap: Normal spirometry helps exclude COPD as the cause of chronic hypercapnia.", m: "OHS = Obesity + Hypercapnia + no other cause" },
        { f: "Serum chemistry clue suggesting obesity hypoventilation syndrome?", b: "Serum bicarbonate ≥27 mEq/L; confirm with arterial blood gas.", x: "Kidneys retain bicarbonate to compensate for chronic respiratory acidosis from hypoventilation.", t: "Trap: Pulse oximetry alone cannot diagnose OHS; hypercapnia is required.", m: "Bicarb 27 flags chronic CO₂ retention" },
        { f: "Treatment for obesity hypoventilation syndrome?", b: "Positive airway pressure plus weight loss; CPAP if severe OSA, otherwise NIV/bilevel.", x: "PAP lowers nocturnal hypoventilation, improves gas exchange, and reduces pulmonary hypertension risk.", t: "Trap: Oxygen alone can worsen CO₂ retention and does not fix hypoventilation.", m: "PAP plus pounds off treats OHS",
          tb: { h: ["OHS setting", "PAP choice"], r: [["Severe OSA present", "CPAP first"], ["No severe OSA", "NIV or bilevel"], ["Persistent hypercapnia", "NIV or bilevel"]] } }
      ]
    },
    {
      id: "neph-iga",
      system: "NEPH",
      task: "DX",
      vignette: "A 22-year-old man notices cola-colored urine 2 days after the start of a sore throat. BP is 126/78 mm Hg. Creatinine is 0.9 mg/dL. Urinalysis shows 3+ blood, 1+ protein, and dysmorphic RBCs. Serum C3 and C4 are normal. He had a similar episode with a cold last year.",
      leadIn: "What is the most likely diagnosis?",
      options: [
        "Post-streptococcal glomerulonephritis.",
        "IgA nephropathy.",
        "Lupus nephritis.",
        "Anti-GBM disease."
      ],
      correct: 1,
      explanation: "<strong>IgA nephropathy</strong> is the most common primary glomerulonephritis worldwide. The hallmark is <strong>\"synpharyngitic\" gross hematuria</strong>: it occurs <strong>within 1–3 days</strong> of a mucosal (upper respiratory or GI) infection and recurs. <strong>Complement levels are normal.</strong> In contrast, <strong>post-streptococcal GN</strong> appears <strong>1–3 weeks after pharyngitis (3–6 weeks after skin infection)</strong> with <strong>low C3</strong>, edema, and hypertension. Lupus nephritis causes low C3 and C4. Biopsy shows <strong>mesangial IgA deposits</strong>. Treatment: <strong>ACE inhibitor/ARB</strong> and an <strong>SGLT2 inhibitor</strong> for proteinuria; immunosuppression if high risk.",
      flashcards: [
        { f: "Gross hematuria 1–3 days after URI with normal complement: diagnosis?", b: "IgA nephropathy with synpharyngitic hematuria.", x: "Mesangial IgA deposition causes recurrent mucosal infection-associated hematuria, often in young adults.", t: "Trap: Post-strep GN occurs 1–3 weeks after pharyngitis and has low C3.", m: "IgA is synpharyngitic: same-time sore throat and blood",
          tb: { h: ["Feature", "IgA nephropathy", "Post-strep GN"], r: [["Timing after URI", "1–3 days", "1–3 weeks"], ["Complement", "Normal", "Low C3"], ["Pattern", "Recurrent hematuria", "Edema, HTN"]] } },
        { f: "Which glomerulonephritides typically have low complement?", b: "Post-infectious GN, lupus nephritis, MPGN/cryoglobulinemia, and endocarditis-associated GN.", x: "Complement consumption points toward immune-complex disease rather than IgA nephropathy or ANCA vasculitis.", t: "Trap: Anti-GBM and pauci-immune ANCA RPGN usually have normal complement.", m: "Low complement points to immune complexes" },
        { f: "Supportive treatment for proteinuric IgA nephropathy?", b: "Max-dose ACE inhibitor or ARB plus SGLT2 inhibitor and BP control.", x: "Lowering intraglomerular pressure and proteinuria slows CKD progression independent of immunosuppression.", t: "Trap: Steroids are not first-line for low-risk disease; reserve immunosuppression for persistent high-risk proteinuria.", m: "Proteinuria control protects IgA kidneys" }
      ]
    },
    {
      id: "neph-anti-gbm",
      system: "NEPH",
      task: "RX",
      vignette: "A 28-year-old man who smokes has 1 week of hemoptysis and decreasing urine output. Creatinine is 4.6 mg/dL (baseline 0.9 mg/dL one month ago). Urinalysis shows RBC casts. Chest radiograph shows bilateral alveolar infiltrates. Anti-GBM antibodies are strongly positive and ANCA is negative. Kidney biopsy shows crescents with linear IgG deposits along the glomerular basement membrane.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "High-dose glucocorticoids alone (IV methylprednisolone pulse, then oral prednisone).",
        "Rituximab alone, as used for ANCA-associated vasculitis.",
        "Plasma exchange, high-dose glucocorticoids, and cyclophosphamide.",
        "ACE inhibitor, BP control, and supportive care with dialysis if needed."
      ],
      correct: 2,
      explanation: "<strong>Anti-GBM disease (Goodpasture)</strong>: antibodies against type IV collagen (α3 chain) in the glomerular and alveolar basement membranes cause <strong>rapidly progressive GN + pulmonary hemorrhage</strong>. Biopsy shows <strong>linear IgG</strong> staining (vs granular immune complexes in lupus/PSGN and pauci-immune in ANCA vasculitis). Smoking increases the risk of lung hemorrhage. Treat urgently with <strong>plasma exchange (removes circulating antibody) + high-dose glucocorticoids + cyclophosphamide (stops antibody production)</strong>. Start treatment as soon as the diagnosis is strongly suspected; do not wait for biopsy if there is lung hemorrhage. About 30% are also ANCA positive (\"double-positive\") and can relapse like vasculitis.",
      flashcards: [
        { f: "Urgent treatment for anti-GBM disease with pulmonary hemorrhage and RPGN?", b: "Plasma exchange plus high-dose glucocorticoids and cyclophosphamide.", x: "Plasma exchange removes antibody; immunosuppression stops new antibody production and limits crescents.", t: "Trap: Do not wait for biopsy if classic lung hemorrhage with RPGN strongly suggests anti-GBM.", m: "Anti-GBM: exchange, steroids, cyclophosphamide" },
        { f: "Immunofluorescence pattern in anti-GBM disease vs immune-complex GN vs ANCA vasculitis?", b: "Anti-GBM linear IgG; immune-complex granular; ANCA pauci-immune.", x: "The staining pattern reflects antibody binding directly to GBM versus deposited complexes versus little immune deposition.", t: "Trap: Lupus nephritis is granular full-house, not linear IgG.", m: "Linear anti-GBM; granular immune complex; pauci-immune ANCA",
          tb: { h: ["Disease group", "IF pattern"], r: [["Anti-GBM", "Linear IgG"], ["Immune-complex GN", "Granular deposits"], ["ANCA vasculitis", "Pauci-immune"], ["Lupus nephritis", "Granular full-house"]] } },
        { f: "Target antigen in Goodpasture anti-GBM disease?", b: "α3 chain of type IV collagen in glomerular and alveolar basement membranes.", x: "Shared antigen explains the pulmonary-renal syndrome; smoking can expose alveolar basement membrane.", t: "Trap: PLA2R is membranous nephropathy, not anti-GBM disease.", m: "Goodpasture targets type IV collagen in lung and kidney" }
      ]
    },
    {
      id: "id-malaria",
      system: "ID",
      task: "RX",
      vignette: "A 38-year-old man returned 10 days ago from visiting family in Nigeria. He did not take malaria prophylaxis. He now has fever, rigors, and confusion. Temperature is 39.8 °C, BP 104/62 mm Hg. Hemoglobin is 8.1 g/dL, platelets 42,000/µL, creatinine 2.4 mg/dL, glucose 68 mg/dL. Thin blood smear shows ring forms in 7% of RBCs, including RBCs with multiple rings.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Oral chloroquine.",
        "Oral artemether–lumefantrine.",
        "Oral atovaquone–proguanil.",
        "IV artesunate."
      ],
      correct: 3,
      explanation: "This is <strong>severe Plasmodium falciparum malaria</strong> with impaired consciousness and <strong>parasitemia ≥5%</strong>. Other severe manifestations include severe anemia, AKI, acidosis, ARDS, shock, or jaundice with another severe feature. Give <strong>IV artesunate</strong>, obtained commercially in the US, then a full oral regimen when appropriate. Oral therapy alone is inadequate for severe malaria. CDC no longer distributes artesunate. Monitor for delayed hemolysis weekly for 4 weeks after treatment. P. vivax/ovale also require hypnozoite eradication with primaquine or eligible tafenoquine use after quantitative G6PD testing.",
      flashcards: [
        { f: "Treatment of severe Plasmodium falciparum malaria?", b: "IV artesunate, followed by a full oral antimalarial course such as artemether-lumefantrine.", x: "Artesunate rapidly lowers parasite burden and mortality; delayed hemolysis can occur 1–3 weeks later.", t: "Trap: Oral regimens alone are for uncomplicated malaria, not severe disease.", m: "Severe falciparum = IV artesunate first" },
        { f: "Which findings trigger treatment for severe malaria under CDC guidance?", b: "Impaired consciousness, parasitemia ≥5%, severe anemia, AKI, acidosis, ARDS, shock, DIC, or jaundice with another severe feature.", x: "Severe falciparum causes microvascular sequestration and rapid deterioration; hypoglycemia also requires urgent correction.", t: "Trap: Jaundice alone is not the CDC severe-malaria criterion; do not delay IV therapy when another severe feature is present.", m: "Severe malaria is organ dysfunction or high parasite burden",
          tb: { h: ["Severe criterion", "Examples"], r: [["Neurologic", "Impaired consciousness"], ["Parasite burden", "Parasitemia ≥5%"], ["Organ failure", "AKI, ARDS, shock"], ["Metabolic", "Acidosis, hypoglycemia"]] } },
        { f: "What extra treatment is needed for P. vivax or P. ovale?", b: "Primaquine or tafenoquine for liver hypnozoites after checking G6PD.", x: "Dormant hypnozoites cause relapses unless eradicated; G6PD deficiency risks severe hemolysis with these drugs.", t: "Trap: P. falciparum has no hypnozoite stage, so primaquine is not used for relapse prevention.", m: "Vivax/ovale hide in liver; check G6PD before primaquine" }
      ]
    },
    {
      id: "id-cmv-transplant",
      system: "ID",
      task: "TEST",
      vignette: "A 48-year-old woman received a deceased-donor kidney transplant 7 months ago (donor CMV IgG positive, recipient negative). She completed 6 months of valganciclovir prophylaxis. She now has 1 week of fever, fatigue, and diarrhea. She takes tacrolimus, mycophenolate, and prednisone. WBC count is 2,600/µL, platelets 98,000/µL, and AST/ALT are mildly elevated.",
      leadIn: "Which test is most appropriate to initially evaluate suspected CMV infection?",
      options: [
        "Quantitative CMV PCR in plasma.",
        "CMV IgG serology to look for a rise in titer.",
        "CMV IgM serology to detect acute infection.",
        "Urine CMV shell-vial culture."
      ],
      correct: 0,
      explanation: "Donor-positive/recipient-negative (<strong>D+/R−</strong>) is the highest-risk combination for <strong>CMV disease</strong>, which often appears <strong>after prophylaxis is stopped</strong> (\"late-onset CMV\"). Typical features: fever, <strong>leukopenia, thrombocytopenia</strong>, hepatitis, colitis, pneumonitis, and allograft dysfunction. Diagnose with <strong>quantitative plasma CMV PCR</strong> (viral load); tissue biopsy confirms invasive disease (e.g., colitis, where blood PCR can be low). <strong>Serology is not useful</strong> in immunosuppressed patients. Urine culture shows shedding, not disease. Treat with <strong>oral valganciclovir</strong> (mild–moderate) or <strong>IV ganciclovir</strong> (severe), and reduce immunosuppression when possible (often mycophenolate).",
      flashcards: [
        { f: "Highest-risk donor/recipient CMV serostatus in solid organ transplant?", b: "Donor positive / recipient negative, D+/R−.", x: "Primary CMV infection after transplant can appear late after prophylaxis stops and injure the allograft.", t: "Trap: Recipient-positive patients can reactivate CMV but are lower risk than D+/R−.", m: "D+/R− is CMV mismatch danger" },
        { f: "Best test to diagnose CMV disease in a transplant recipient?", b: "Quantitative plasma CMV PCR; biopsy confirms tissue-invasive disease.", x: "Viral load helps diagnose and monitor response, but colitis or pneumonitis may need tissue proof.", t: "Trap: CMV serology is not useful after transplant; urine shedding does not prove disease.", m: "CMV after transplant: viral load first, tissue if invasive" },
        { f: "Treatment of CMV disease after transplant?", b: "Valganciclovir for mild–moderate disease or IV ganciclovir for severe disease; reduce immunosuppression if possible.", x: "Both drugs can cause neutropenia and thrombocytopenia, so blood counts guide monitoring.", t: "Trap: Acyclovir treats HSV/VZV and is inadequate for established CMV disease.", m: "ValGAN for mild, IV GAN for grave",
          tb: { h: ["Disease severity", "Treatment"], r: [["Mild to moderate", "Valganciclovir"], ["Severe disease", "IV ganciclovir"], ["If possible", "Reduce immunosuppression"]] } }
      ]
    },
    {
      id: "id-dengue",
      system: "ID",
      task: "RX",
      vignette: "A 26-year-old woman returned 5 days ago from Thailand. She has 4 days of fever, severe headache, pain behind the eyes, and severe muscle and joint pain. She now has a diffuse macular rash. Temperature is 39.0 °C, BP 118/72 mm Hg. WBC count is 2,400/µL, platelets 88,000/µL, hematocrit 41%. Malaria smears are negative.",
      leadIn: "Which is the most appropriate management?",
      options: [
        "Ibuprofen for fever and pain, with oral fluids.",
        "Acetaminophen, oral fluids, and close monitoring for warning signs.",
        "Empiric doxycycline for possible rickettsial infection or leptospirosis.",
        "Prophylactic platelet transfusion because platelets are below 100,000/µL."
      ],
      correct: 1,
      explanation: "This is <strong>dengue</strong> (Aedes mosquito; incubation 4–10 days): fever, severe headache, <strong>retro-orbital pain</strong>, myalgia/arthralgia (\"breakbone fever\"), rash, <strong>leukopenia and thrombocytopenia</strong>. Diagnose with <strong>NS1 antigen or RT-PCR</strong> in the first week (IgM afterward). Treatment is supportive: <strong>acetaminophen and fluids</strong>. <strong>Avoid NSAIDs and aspirin</strong> (bleeding risk). The <strong>critical phase</strong> begins around defervescence (days 3–7): watch for <strong>warning signs</strong> (abdominal pain, persistent vomiting, mucosal bleeding, lethargy, liver enlargement, <strong>rising hematocrit with falling platelets</strong>) that signal plasma leakage and severe dengue. Prophylactic platelet transfusion is not recommended without significant bleeding.",
      flashcards: [
        { f: "Preferred analgesic/antipyretic for suspected dengue?", b: "Acetaminophen with oral fluids; avoid aspirin and NSAIDs.", x: "Thrombocytopenia and capillary fragility increase bleeding risk, which NSAIDs/aspirin worsen.", t: "Trap: Ibuprofen may be fine for viral fever generally, but not when dengue is suspected.", m: "Dengue pain: Tylenol, not NSAIDs" },
        { f: "Warning signs that dengue may progress to severe disease?", b: "Abdominal pain, persistent vomiting, mucosal bleeding, lethargy, hepatomegaly, fluid accumulation, rising Hct with falling platelets.", x: "These findings mark plasma leakage and impending shock during the critical phase.", t: "Trap: Platelet count alone is less important than bleeding, hemodynamics, and hemoconcentration.", m: "Dengue warnings = leak signs",
          tb: { h: ["Warning domain", "Signs"], r: [["Leakage", "Fluid accumulation"], ["GI", "Pain or persistent vomiting"], ["Bleeding", "Mucosal bleeding"], ["Labs", "Rising Hct, falling platelets"]] } },
        { f: "When is dengue most dangerous after fever onset?", b: "Around defervescence, days 3–7, when plasma leakage can cause shock.", x: "Patients may feel fever is improving just as vascular permeability peaks, so anticipatory counseling matters.", t: "Trap: Prophylactic platelet transfusion is not recommended without significant bleeding.", m: "Dengue danger comes as fever falls" }
      ]
    },
    {
      id: "onc-nodule-fleischner",
      system: "ONC",
      task: "NEXT",
      vignette: "A 45-year-old woman who has never smoked undergoes CT angiography for chest pain, which shows no pulmonary embolism. An incidental 4-mm solid nodule is seen in the right lower lobe. She has no history of cancer and no occupational exposures.",
      leadIn: "What is the most appropriate next step for the nodule?",
      options: [
        "CT of the chest in 3 months.",
        "PET-CT.",
        "No routine follow-up imaging.",
        "CT-guided biopsy."
      ],
      correct: 2,
      explanation: "The <strong>Fleischner Society</strong> guidelines apply to <strong>incidental</strong> nodules in adults <strong>≥ 35 years</strong> without cancer or immunosuppression (lung-cancer screening findings use Lung-RADS instead). For a <strong>single solid nodule &lt; 6 mm</strong>: <strong>low-risk</strong> patient → <strong>no routine follow-up</strong>; high-risk patient → optional CT at 12 months. For <strong>6–8 mm</strong>: CT at 6–12 months (then 18–24 months if high risk). For <strong>&gt; 8 mm</strong>: consider CT at 3 months, PET-CT, or tissue sampling. PET is unreliable for nodules smaller than about 8 mm. Over-imaging tiny nodules adds radiation, cost, and anxiety without benefit.",
      flashcards: [
        { f: "Fleischner follow-up for a solitary solid pulmonary nodule <6 mm in a low-risk adult?", b: "No routine follow-up imaging.", x: "Cancer probability is extremely low, and serial CT adds radiation, cost, and anxiety.", t: "Trap: Lung-RADS, not Fleischner, applies to formal lung cancer screening CTs.", m: "Tiny low-risk solid nodule: leave it alone" },
        { f: "Fleischner follow-up for a solitary solid nodule 6–8 mm?", b: "CT at 6–12 months; consider another CT at 18–24 months if low risk, and obtain it if high risk.", x: "Morphology and stability guide the second low-risk follow-up; growth is more useful than PET for a small nodule.", t: "Trap: PET-CT is unreliable below about 8 mm, and formal screening nodules use Lung-RADS.", m: "6–8 mm: 6–12 months, then assess 18–24",
          tb: { h: ["Solid nodule", "Low risk", "High risk"], r: [["<6 mm", "No routine follow-up", "Optional CT 12 mo"], ["6–8 mm", "CT 6–12; consider 18–24 mo", "CT 6–12 and 18–24 mo"], [">8 mm", "CT, PET, or tissue", "CT, PET, or tissue"]] } },
        { f: "Management options for a solitary solid pulmonary nodule >8 mm?", b: "CT at 3 months, PET-CT, or tissue sampling, based on risk and morphology.", x: "Pretest probability, spiculation, upper-lobe site, smoking, and age guide how aggressive to be.", t: "Trap: Fleischner does not apply to patients with known cancer or immunosuppression.", m: ">8 mm opens PET, tissue, or short-interval CT" }
      ]
    },
    {
      id: "onc-lynch",
      system: "ONC",
      task: "NEXT",
      vignette: "A 24-year-old man is referred after genetic testing shows he carries a pathogenic MLH1 variant. His father was diagnosed with colon cancer at age 44 and his paternal aunt with endometrial cancer at age 49. He is asymptomatic.",
      leadIn: "What is the most appropriate colorectal cancer surveillance?",
      options: [
        "Colonoscopy every 10 years beginning at age 45.",
        "Annual fecal immunochemical testing beginning now.",
        "Colonoscopy every 5 years beginning at age 40.",
        "Colonoscopy every 1–2 years beginning now."
      ],
      correct: 3,
      explanation: "<strong>Lynch syndrome</strong> (hereditary nonpolyposis colorectal cancer) is caused by germline mutations in <strong>mismatch repair genes (MLH1, MSH2, MSH6, PMS2)</strong> or EPCAM. Tumors are <strong>microsatellite-instability high</strong>. Cancers develop quickly from adenomas (\"accelerated carcinogenesis\"), so <strong>colonoscopy every 1–2 years starting at age 20–25</strong> (or 2–5 years before the earliest family diagnosis) is recommended for MLH1/MSH2 carriers. Other cancers: <strong>endometrial (most common in women)</strong>, ovarian, gastric, small bowel, urinary tract. Consider <strong>daily aspirin</strong> (CAPP2 trial) and risk-reducing hysterectomy/salpingo-oophorectomy after childbearing. Universal tumor testing for MMR deficiency is recommended for all colorectal and endometrial cancers.",
      flashcards: [
        { f: "Colonoscopy interval for Lynch syndrome due to MLH1/MSH2?", b: "Every 1–2 years starting age 20–25 or 2–5 years before the earliest family diagnosis.", x: "Accelerated adenoma-to-cancer progression makes frequent colonoscopy lifesaving.", t: "Trap: Average-risk 10-year colonoscopy intervals are unsafe in Lynch syndrome.", m: "Lynch colonoscopy is every 1 to 2 years, not every 10",
          tb: { h: ["Gene group", "Colonoscopy start", "Interval"], r: [["MLH1 or MSH2", "Age 20–25", "Every 1–2 years"], ["Family earlier", "2–5 years before", "Every 1–2 years"]] } },
        { f: "Genes and tumor phenotype in Lynch syndrome?", b: "Germline mismatch repair defects: MLH1, MSH2, MSH6, PMS2, or EPCAM; tumors are MSI-high.", x: "Loss of mismatch repair causes microsatellite instability and rapid accumulation of mutations.", t: "Trap: APC causes familial adenomatous polyposis with hundreds of polyps, not Lynch.", m: "Mismatch repair loss makes MSI-high tumors" },
        { f: "Most common extracolonic cancer in women with Lynch syndrome?", b: "Endometrial cancer; also ovarian, gastric, small bowel, and urothelial cancers.", x: "Risk-reducing hysterectomy and salpingo-oophorectomy can be considered after childbearing.", t: "Trap: Breast cancer is not the classic defining extracolonic Lynch cancer on boards.", m: "Lynch in women: endometrium is the classic extra colon" }
      ]
    },
    {
      id: "onc-hyperviscosity",
      system: "ONC",
      task: "RX",
      vignette: "A 68-year-old man has 2 weeks of headache, blurred vision, and recurrent nosebleeds. He has lymphadenopathy and splenomegaly. Funduscopy shows dilated, tortuous \"sausage-link\" retinal veins with hemorrhages. Serum protein electrophoresis shows an IgM monoclonal protein of 5.8 g/dL. Bone marrow biopsy shows lymphoplasmacytic infiltration.",
      leadIn: "What is the most appropriate immediate treatment?",
      options: [
        "Plasmapheresis.",
        "Red blood cell transfusion.",
        "High-dose IV methotrexate.",
        "Observation until the bone marrow MYD88 result returns."
      ],
      correct: 0,
      explanation: "<strong>Waldenström macroglobulinemia</strong> (lymphoplasmacytic lymphoma, <strong>MYD88 L265P</strong> in &gt; 90%) produces large pentameric <strong>IgM</strong>, which causes <strong>hyperviscosity syndrome</strong>: mucosal bleeding, visual change with retinal venous engorgement, headache, dizziness, and heart failure. Hyperviscosity is an <strong>oncologic emergency</strong> treated with urgent <strong>plasmapheresis</strong> (IgM is mostly intravascular, so removal is very effective), followed by definitive therapy (e.g., <strong>bendamustine–rituximab</strong> or a BTK inhibitor). <strong>Avoid nonessential RBC transfusion before plasmapheresis</strong> because it increases viscosity; life-threatening anemia still requires individualized urgent support. Rituximab can cause an <strong>IgM flare</strong>, so symptomatic hyperviscosity must be stabilized before starting it.",
      flashcards: [
        { f: "Immediate treatment for hyperviscosity syndrome from Waldenström macroglobulinemia?", b: "Urgent plasmapheresis; avoid RBC transfusion before pheresis.", x: "IgM is mostly intravascular, so plasmapheresis rapidly lowers viscosity and relieves neurologic/visual bleeding symptoms.", t: "Trap: Chemotherapy treats the clone later but is too slow for acute hyperviscosity.", m: "IgM sludge needs plasmapheresis now",
          tb: { h: ["Step", "Action"], r: [["Immediate", "Plasmapheresis"], ["Avoid before pheresis", "RBC transfusion"], ["After stabilization", "Clone-directed therapy"], ["If IgM very high", "Pheresis before rituximab"]] } },
        { f: "Hallmarks of Waldenström macroglobulinemia?", b: "IgM monoclonal protein, lymphoplasmacytic marrow infiltrate, MYD88 L265P, hyperviscosity/neuropathy.", x: "Pentameric IgM is large and drives serum viscosity more than IgG at similar M-protein levels.", t: "Trap: Multiple myeloma usually has lytic bone lesions, renal failure, and IgG/IgA light-chain disease.", m: "Waldenström = IgM lymphoplasmacytic lymphoma" },
        { f: "Why perform plasmapheresis before rituximab when IgM is very high?", b: "Rituximab can cause an IgM flare that worsens hyperviscosity.", x: "Debulking intravascular IgM first prevents transient symptom worsening while definitive therapy begins.", t: "Trap: Steroids or rituximab alone are not enough for acute vision change or mucosal bleeding.", m: "Pheresis before rituximab when IgM is high" }
      ]
    },
    {
      id: "neuro-nph",
      system: "NEURO",
      task: "NEXT",
      vignette: "A 74-year-old man has 1 year of progressive gait difficulty, urinary urgency with incontinence, and slowed thinking. His gait is wide-based and shuffling, with feet that seem \"stuck to the floor.\" There is no rest tremor. MRI shows enlarged lateral ventricles out of proportion to sulcal atrophy, without obstruction.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Start carbidopa–levodopa and reassess gait after a therapeutic trial.",
        "High-volume lumbar puncture with gait assessment before and after.",
        "Start donepezil and arrange serial gait and cognitive assessment.",
        "Obtain dopamine transporter imaging before referral for shunting."
      ],
      correct: 1,
      explanation: "<strong>Normal pressure hydrocephalus</strong>: the triad is <strong>gait apraxia (\"magnetic\" gait, usually first)</strong>, <strong>urinary incontinence</strong>, and <strong>cognitive decline</strong> (\"wobbly, wet, and wacky\"), with <strong>ventriculomegaly out of proportion to atrophy</strong> on imaging. Opening pressure is normal or mildly raised. The next step is a <strong>high-volume (30–50 mL) lumbar tap test</strong> (or extended lumbar drainage) with gait measured before and after. Improvement predicts response to a <strong>ventriculoperitoneal shunt</strong>. Gait responds best; dementia responds least. Levodopa does not help; donepezil treats Alzheimer disease, not NPH.",
      flashcards: [
        { f: "Clinical triad of normal pressure hydrocephalus?", b: "Magnetic gait apraxia, urinary incontinence, and cognitive decline.", x: "Gait disturbance is usually earliest and most responsive because frontal-subcortical pathways are stretched.", t: "Trap: Alzheimer disease causes early memory loss without ventriculomegaly out of proportion to atrophy.", m: "NPH: wet, wobbly, wacky",
          tb: { h: ["Triad part", "Typical feature"], r: [["Gait", "Magnetic, earliest"], ["Urine", "Incontinence"], ["Cognition", "Frontal decline"]] } },
        { f: "Next step after imaging suggests normal pressure hydrocephalus?", b: "High-volume 30–50 mL lumbar tap test with gait assessment before and after.", x: "Improvement after CSF removal predicts benefit from ventriculoperitoneal shunting.", t: "Trap: A normal opening pressure does not exclude NPH; it is expected.", m: "Tap 30 to 50 mL, then watch the walk" },
        { f: "Definitive treatment of normal pressure hydrocephalus?", b: "Ventriculoperitoneal shunt; gait improves most, cognition least.", x: "Shunting diverts CSF and can restore mobility, but benefit must be balanced against complications.", t: "Trap: Levodopa treats Parkinson disease, not magnetic gait from NPH.", m: "Shunt helps gait most" }
      ]
    },
    {
      id: "neuro-ms",
      system: "NEURO",
      task: "DX",
      vignette: "A 29-year-old woman has 4 days of blurred vision in the left eye with pain on eye movement. Two years ago she had 3 weeks of numbness and tingling in her legs that resolved on its own. Exam shows reduced color vision and a left relative afferent pupillary defect. MRI of the brain shows several ovoid T2 lesions perpendicular to the lateral ventricles and a gadolinium-enhancing juxtacortical lesion.",
      leadIn: "What is the most likely diagnosis?",
      options: [
        "Neuromyelitis optica spectrum disorder.",
        "Giant cell arteritis.",
        "Relapsing–remitting multiple sclerosis.",
        "Nonarteritic anterior ischemic optic neuropathy."
      ],
      correct: 2,
      explanation: "Painful monocular visual loss, color desaturation, and RAPD indicate <strong>optic neuritis</strong>. A previous neurologic episode and characteristic periventricular and juxtacortical lesions strongly support <strong>relapsing multiple sclerosis</strong> after excluding mimics. This case demonstrates clinical events separated in time and lesions in characteristic CNS locations; current diagnostic criteria integrate clinical, MRI, and selected CSF biomarkers. A disabling relapse may be treated with high-dose methylprednisolone to hasten recovery, while disease-modifying therapy reduces future activity. Severe/bilateral optic neuritis, longitudinally extensive myelitis, or area postrema symptoms should prompt evaluation for AQP4-IgG NMOSD, which requires different treatment. NAION is typically painless in older vascular patients.",
      flashcards: [
        { f: "MRI lesion locations typical of multiple sclerosis?", b: "Periventricular Dawson fingers, juxtacortical/cortical, infratentorial, and spinal cord lesions.", x: "Dissemination in space uses lesions in characteristic CNS regions; enhancement helps show dissemination in time.", t: "Trap: Small-vessel ischemic lesions are usually deep white matter and spare U-fibers/corpus callosum.", m: "MS lesions love periventricular, juxtacortical, infratentorial, cord" },
        { f: "Treatment for an acute disabling multiple sclerosis relapse?", b: "IV methylprednisolone 1 g/day for 3–5 days; plasma exchange if steroid-refractory.", x: "Steroids shorten relapse duration but do not change long-term disability; disease-modifying therapy prevents relapses.", t: "Trap: Do not treat pseudo-relapse from infection or heat with steroids before addressing the trigger.", m: "Relapse steroids speed recovery, DMT prevents relapses" },
        { f: "How does NMOSD differ from multiple sclerosis?", b: "Aquaporin-4 IgG, severe/bilateral optic neuritis, longitudinally extensive myelitis ≥3 segments, area postrema syndrome.", x: "Some MS disease-modifying drugs can worsen NMOSD, so antibody testing matters in atypical cases.", t: "Trap: Typical MS spinal cord lesions are shorter and peripheral, not ≥3 vertebral segments.", m: "NMO: AQP4 and long cord lesions",
          tb: { h: ["Feature", "MS", "NMOSD"], r: [["Antibody", "None typical", "AQP4 IgG"], ["Optic neuritis", "Often unilateral", "Severe or bilateral"], ["Cord lesion", "Short", "≥3 segments"], ["Area postrema", "Uncommon", "Characteristic"]] } }
      ]
    },
    {
      id: "neuro-sah-lp",
      system: "NEURO",
      task: "TEST",
      vignette: "A 44-year-old woman has a sudden, severe headache that peaked within 1 minute while lifting a box 14 hours ago. She vomited twice. She is alert with a normal neurologic exam and mild neck stiffness. Noncontrast CT of the head performed now is normal.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Discharge with an NSAID and outpatient follow-up.",
        "MRI of the brain without contrast.",
        "EEG.",
        "Lumbar puncture for RBC count and xanthochromia."
      ],
      correct: 3,
      explanation: "A <strong>thunderclap headache</strong> with vomiting and meningismus requires exclusion of <strong>subarachnoid hemorrhage</strong>. At 14 hours, a negative noncontrast CT is insufficient; perform <strong>lumbar puncture for RBCs and xanthochromia</strong>. A high-quality CT within 6 hours with expert interpretation can exclude SAH in selected neurologically intact patients. CTA is an alternative in some emergency pathways after discussion of missed small hemorrhage and incidental aneurysm risks. <strong>RBC clearing between tubes does not reliably exclude SAH</strong>. Aneurysmal SAH needs early aneurysm treatment and enteral nimodipine to reduce delayed cerebral ischemia.",
      flashcards: [
        { f: "Thunderclap headache with normal noncontrast CT >6 hours after onset: next test?", b: "Lumbar puncture for xanthochromia and RBCs; CT angiography is an alternative.", x: "CT sensitivity for SAH falls after 6 hours, so CSF or vascular imaging is needed if suspicion remains.", t: "Trap: A negative late CT alone does not safely rule out SAH.", m: "Thunderclap after 6 hours: CT then CSF or CTA",
          tb: { h: ["CT timing", "If CT normal"], r: [["≤6 hours", "SAH ruled out if ideal"], [">6 hours", "LP or CTA needed"], ["Abnormal neuro exam", "Further workup"]] } },
        { f: "How sensitive is modern noncontrast CT for SAH within 6 hours?", b: "Nearly 100% in a neurologically intact patient with expert interpretation.", x: "Fresh subarachnoid blood is hyperdense early but becomes less visible as time passes.", t: "Trap: This rule does not apply to delayed presentation, anemia, poor-quality scan, or abnormal neuro exam.", m: "CT is best in the first 6 hours" },
        { f: "Medication given to all patients with aneurysmal subarachnoid hemorrhage?", b: "Oral nimodipine for 21 days.", x: "Nimodipine reduces delayed cerebral ischemia from vasospasm, improving neurologic outcomes.", t: "Trap: It does not secure the aneurysm; early clipping or coiling is still required.", m: "Aneurysmal SAH: nimodipine 21 days plus secure aneurysm" }
      ]
    },
    {
      id: "neuro-et",
      system: "NEURO",
      task: "RX",
      vignette: "A 62-year-old man has a bilateral hand tremor that makes it hard to drink from a cup and sign his name. It has slowly worsened over 10 years and improves after a glass of wine. His mother had a similar tremor. The tremor appears with arms outstretched and during finger-to-nose testing but is absent at rest. Tone, gait, and facial expression are normal. He has no asthma.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Propranolol.",
        "Carbidopa–levodopa.",
        "Trihexyphenidyl.",
        "Clonazepam."
      ],
      correct: 0,
      explanation: "<strong>Essential tremor</strong>: bilateral <strong>postural and kinetic (action) tremor</strong> of the hands (also head/voice), often <strong>familial</strong> (autosomal dominant) and <strong>improved by alcohol</strong>. It is absent at rest and lacks rigidity and bradykinesia. First-line therapy is <strong>propranolol</strong> or <strong>primidone</strong>; use primidone if beta-blockers are contraindicated (asthma). Second-line: topiramate, gabapentin. Refractory: <strong>deep brain stimulation</strong> or focused ultrasound thalamotomy. <strong>Parkinson disease</strong> tremor is an asymmetric <strong>rest tremor</strong> (\"pill-rolling\") with bradykinesia and rigidity, which responds to levodopa. Benzodiazepines are not preferred because of sedation and falls.",
      flashcards: [
        { f: "Essential tremor vs Parkinson tremor at the bedside?", b: "ET is bilateral action/postural and may improve with alcohol; PD is asymmetric resting tremor with bradykinesia/rigidity.", x: "ET commonly affects hands, head, or voice and often has autosomal dominant family history.", t: "Trap: A pill-rolling rest tremor plus slow movement points to Parkinson disease, not ET.", m: "ET acts with action; PD rests",
          tb: { h: ["Feature", "Essential tremor", "Parkinson"], r: [["Timing", "Action or postural", "Resting"], ["Symmetry", "Bilateral", "Asymmetric"], ["Other signs", "Head or voice", "Bradykinesia"], ["Alcohol", "Often improves", "No typical benefit"]] } },
        { f: "First-line medications for essential tremor?", b: "Propranolol or primidone; choose primidone if beta-blockers are contraindicated.", x: "Both reduce tremor amplitude; start low to avoid bradycardia or primidone sedation/ataxia.", t: "Trap: Propranolol can worsen asthma, COPD bronchospasm, bradycardia, or heart block.", m: "Essential tremor first line: propranolol or primidone" },
        { f: "Treatment for disabling essential tremor refractory to medication?", b: "Thalamic VIM deep brain stimulation or MR-guided focused ultrasound thalamotomy.", x: "The ventral intermediate thalamus relays cerebellar tremor circuits targeted by these procedures.", t: "Trap: Levodopa helps Parkinson motor symptoms, not essential tremor.", m: "Refractory tremor target: VIM thalamus" }
      ]
    },
    {
      id: "psych-nms",
      system: "PSYCH",
      task: "DX",
      vignette: "A 34-year-old man with schizophrenia was given repeated doses of IM haloperidol for agitation over the past 2 days. He is now confused and has a temperature of 40.1 °C, BP 168/102 mm Hg, HR 124/min, and diaphoresis. He has severe generalized \"lead-pipe\" rigidity. Reflexes are normal and there is no clonus. Pupils are normal. Creatine kinase is 18,400 U/L and WBC count is 15,000/µL.",
      leadIn: "What is the most likely diagnosis?",
      options: [
        "Serotonin toxicity syndrome.",
        "Neuroleptic malignant syndrome.",
        "Anticholinergic poisoning syndrome.",
        "Malignant hyperthermia syndrome."
      ],
      correct: 1,
      explanation: "<strong>Neuroleptic malignant syndrome (NMS)</strong> follows <strong>dopamine blockade</strong> (antipsychotics, metoclopramide) or abrupt withdrawal of dopaminergic drugs. It develops over <strong>days</strong>, with <strong>fever, lead-pipe rigidity, altered mental status, autonomic instability</strong>, and markedly elevated <strong>CK</strong> (rhabdomyolysis), leukocytosis, and low serum iron. <strong>Serotonin syndrome</strong> develops within <strong>hours</strong> with <strong>clonus and hyperreflexia</strong> (lower limbs), mydriasis, and diarrhea. <strong>Anticholinergic toxicity</strong> causes dry skin, mydriasis, and urinary retention without rigidity. <strong>Malignant hyperthermia</strong> follows volatile anesthetics or succinylcholine. NMS treatment: <strong>stop the drug</strong>, cool, IV fluids, <strong>benzodiazepines</strong>; for severe cases <strong>dantrolene</strong> and/or <strong>bromocriptine</strong>.",
      flashcards: [
        { f: "Dopamine blocker with fever, altered mental status, autonomic instability, lead-pipe rigidity: diagnosis?", b: "Neuroleptic malignant syndrome.", x: "NMS develops over days from dopamine blockade or dopaminergic withdrawal and can cause rhabdomyolysis.", t: "Trap: Serotonin syndrome starts within hours and features clonus, hyperreflexia, mydriasis, and diarrhea.", m: "NMS = dopamine blocked, muscles locked",
          tb: { h: ["Syndrome", "Onset", "Key findings"], r: [["NMS", "Days", "Lead-pipe rigidity"], ["Serotonin", "Hours", "Clonus, hyperreflexia"], ["Anticholinergic", "Hours", "Dry skin, retention"], ["Malignant hyperthermia", "Anesthesia", "Rigidity, hypercarbia"]] } },
        { f: "Treatment of neuroleptic malignant syndrome?", b: "Stop the dopamine blocker, give cooling, IV fluids, benzodiazepines; severe cases: dantrolene and/or bromocriptine.", x: "Aggressive fluids prevent kidney injury from rhabdomyolysis; bromocriptine restores dopaminergic tone.", t: "Trap: Cyproheptadine treats serotonin syndrome, not NMS.", m: "Stop, cool, fluids, benzos; add dantrolene or bromocriptine if severe" },
        { f: "Laboratory hallmark of neuroleptic malignant syndrome?", b: "Markedly elevated creatine kinase from rhabdomyolysis; leukocytosis and low serum iron may occur.", x: "CK elevation reflects sustained rigidity and muscle breakdown and guides renal-protection monitoring.", t: "Trap: Normal CK argues against classic severe NMS, though early cases may not yet peak.", m: "Rigid muscles leak CK" }
      ]
    },
    {
      id: "psych-gad",
      system: "PSYCH",
      task: "RX",
      vignette: "A 31-year-old woman has 8 months of excessive, hard-to-control worry about work, finances, and her children's health. She has restlessness, muscle tension, poor concentration, and difficulty falling asleep. She has no panic attacks, substance use, or prior manic episodes. TSH is normal. Her GAD-7 score is 15. She would like medication in addition to therapy.",
      leadIn: "What is the most appropriate first-line medication?",
      options: [
        "Alprazolam as needed.",
        "Quetiapine.",
        "Escitalopram.",
        "Propranolol."
      ],
      correct: 2,
      explanation: "<strong>Generalized anxiety disorder</strong>: excessive worry about many topics on most days for <strong>≥ 6 months</strong>, with ≥ 3 symptoms (restlessness, fatigue, poor concentration, irritability, muscle tension, sleep disturbance). First-line treatment is <strong>CBT</strong> and/or an <strong>SSRI (escitalopram, sertraline) or SNRI (venlafaxine, duloxetine)</strong>. Start low (anxious patients often feel early jitteriness) and expect full benefit in <strong>4–8 weeks</strong>. <strong>Buspirone</strong> is an alternative or add-on. <strong>Benzodiazepines</strong> should be avoided long-term (dependence, falls, cognitive effects, overdose with opioids/alcohol). Quetiapine has metabolic risks. Propranolol is for performance anxiety only.",
      flashcards: [
        { f: "First-line medication options for generalized anxiety disorder?", b: "SSRI or SNRI such as escitalopram, sertraline, venlafaxine, or duloxetine; CBT is also first-line.", x: "Start low and counsel that early jitteriness can occur before benefit at 4–8 weeks.", t: "Trap: Propranolol is for performance anxiety symptoms, not chronic generalized worry.", m: "GAD maintenance: CBT plus SSRI/SNRI" },
        { f: "DSM duration criterion for generalized anxiety disorder?", b: "Excessive worry on most days for ≥6 months with at least 3 associated symptoms.", x: "Symptoms include restlessness, fatigue, poor concentration, irritability, muscle tension, and sleep disturbance.", t: "Trap: Panic disorder has episodic panic attacks rather than persistent multi-topic worry.", m: "GAD worries most days for 6 months" },
        { f: "Why avoid long-term benzodiazepines for GAD?", b: "Dependence, withdrawal, falls, cognitive impairment, and respiratory depression with alcohol/opioids.", x: "Tolerance develops and abrupt cessation can cause rebound anxiety, seizures, or delirium.", t: "Trap: Short bridging may be used selectively, but it is not maintenance therapy.", m: "Benzos bridge rarely; do not build a home on them" }
      ]
    },
    {
      id: "psych-bipolar-depression",
      system: "PSYCH",
      task: "RX",
      vignette: "A 24-year-old man has 4 weeks of low mood, hypersomnia, poor concentration, and loss of interest. Two years ago he had a 10-day period of sleeping 3 hours a night without fatigue, rapid speech, spending $15,000 on a business idea, and believing he would become famous; he was briefly hospitalized. He has no suicidal ideation. He asks for \"an antidepressant like sertraline.\"",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Sertraline monotherapy.",
        "Bupropion monotherapy.",
        "Venlafaxine monotherapy.",
        "Quetiapine."
      ],
      correct: 3,
      explanation: "The prior episode with markedly decreased sleep need, grandiosity, risky spending, and hospitalization establishes <strong>bipolar I disorder</strong>. For current bipolar depression, <strong>quetiapine</strong> is an evidence-based and FDA-approved option. <strong>Antidepressant monotherapy is not recommended in bipolar I</strong> because efficacy is uncertain and mania or mood destabilization can occur. Other approved bipolar-depression options include lurasidone, cariprazine, lumateperone, and olanzapine–fluoxetine. Lithium and lamotrigine also have roles in bipolar treatment; lamotrigine requires slow titration for serious rash risk and is not a rapid rescue treatment.",
      flashcards: [
        { f: "Why avoid antidepressant monotherapy in bipolar I depression?", b: "It is not recommended because benefit is uncertain and it can precipitate mania or mood destabilization.", x: "Use an evidence-based bipolar-depression treatment and screen for past mania before prescribing an antidepressant.", t: "Trap: Bipolar II management has additional nuance; do not apply an absolute 'never effective' claim to every bipolar subtype.", m: "Past mania changes the depression prescription" },
        { f: "FDA-approved medication options for bipolar depression?", b: "Quetiapine, lurasidone, cariprazine, lumateperone, or olanzapine-fluoxetine.", x: "Lithium and lamotrigine are common maintenance options; lithium also lowers suicide risk.", t: "Trap: Lamotrigine requires slow titration for SJS risk, so it is not a rapid acute fix.", m: "Bipolar depression has its own approved agents" },
        { f: "How do mania and hypomania differ?", b: "Mania lasts ≥7 days or requires hospitalization/psychosis and causes marked impairment; hypomania lasts ≥4 days without marked impairment.", x: "Mania defines bipolar I; hypomania plus major depression defines bipolar II.", t: "Trap: Decreased need for sleep with high energy is different from insomnia with fatigue.", m: "Mania is 7 days or severe; hypomania is 4 days and less impairing",
          tb: { h: ["Feature", "Mania", "Hypomania"], r: [["Duration", "≥7 days", "≥4 days"], ["Impairment", "Marked", "Not marked"], ["Psychosis", "May occur", "Absent"], ["Diagnosis", "Bipolar I", "Bipolar II if MDD"]] } }
      ]
    },
    {
      id: "psych-refeeding",
      system: "PSYCH",
      task: "PATHO",
      vignette: "A 19-year-old woman with anorexia nervosa (BMI 14.2) is admitted for medical stabilization and started on nutritional support. On hospital day 3 she develops generalized weakness, paresthesias, shortness of breath, and new leg edema. HR is 118/min. Admission electrolytes were normal.",
      leadIn: "Which electrolyte abnormality is the most likely cause of her deterioration?",
      options: [
        "Hypophosphatemia.",
        "Hypokalemia.",
        "Hypomagnesemia.",
        "Hyponatremia."
      ],
      correct: 0,
      explanation: "<strong>Refeeding syndrome</strong>: carbohydrate intake triggers <strong>insulin release</strong>, which drives <strong>phosphate, potassium, and magnesium into cells</strong> (and consumes phosphate for ATP and 2,3-DPG). Total-body stores are already depleted by starvation, so serum levels fall sharply, usually in the <strong>first 2–5 days</strong>. <strong>Hypophosphatemia</strong> is the hallmark and causes muscle weakness, rhabdomyolysis, <strong>respiratory failure</strong>, <strong>heart failure</strong>, arrhythmias, hemolysis, seizures, and confusion. Insulin also causes sodium and fluid retention (edema). Prevention: identify high-risk patients, give <strong>thiamine</strong> before feeding, start calories cautiously and advance gradually, and <strong>monitor phosphate, potassium, and magnesium daily</strong>, replacing as needed.",
      flashcards: [
        { f: "Hallmark electrolyte abnormality in refeeding syndrome?", b: "Hypophosphatemia, often with hypokalemia and hypomagnesemia within 2–5 days of feeding.", x: "Phosphate is consumed for ATP and 2,3-DPG just when depleted stores cannot meet demand.", t: "Trap: Edema can occur, but sodium/fluid retention is not the hallmark lab abnormality.", m: "Refeeding hallmark: phosphate falls" },
        { f: "Mechanism of refeeding syndrome after starvation?", b: "Carbohydrate intake → insulin surge → intracellular shift of phosphate, potassium, and magnesium.", x: "Starvation depletes total-body electrolytes despite sometimes normal serum levels before feeding.", t: "Trap: Giving calories aggressively worsens the insulin-driven shift and can trigger arrhythmias or respiratory failure.", m: "Carbs call insulin; insulin pulls electrolytes into cells" },
        { f: "How can refeeding syndrome be prevented?", b: "Give thiamine before calories, start feeds slowly, and monitor/replace phosphate, potassium, and magnesium daily.", x: "Thiamine prevents Wernicke encephalopathy during carbohydrate metabolism in malnourished patients.", t: "Trap: Do not wait for severe hypophosphatemia to supplement in high-risk patients.", m: "Thiamine first, calories slow, electrolytes daily",
          tb: { h: ["Prevention step", "Purpose"], r: [["Thiamine first", "Prevent Wernicke"], ["Slow calories", "Limit insulin shift"], ["Check phosphate", "Detect hallmark drop"], ["Replace K and Mg", "Prevent arrhythmia"]] } }
      ]
    },
    {
      id: "derm-bcc-mohs",
      system: "DERM",
      task: "RX",
      vignette: "A 66-year-old man who worked outdoors has a slowly growing lesion on the side of his nose for 1 year that sometimes bleeds. Exam shows a 9-mm pearly, translucent papule with rolled borders, arborizing telangiectasias, and central ulceration. Shave biopsy shows nodular basal cell carcinoma.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Topical 5-fluorouracil.",
        "Mohs micrographic surgery.",
        "Cryotherapy.",
        "Systemic vismodegib."
      ],
      correct: 1,
      explanation: "<strong>Basal cell carcinoma</strong> is the most common skin cancer: a <strong>pearly papule with rolled borders and arborizing telangiectasias</strong>, often ulcerated (\"rodent ulcer\"), on sun-exposed skin. It rarely metastasizes but can be locally destructive. <strong>Mohs surgery</strong> is preferred for <strong>high-risk BCC</strong>: location on the <strong>\"mask area\" of the face (nose, eyelids, lips, ears)</strong>, hands, feet, genitals; recurrent tumors; aggressive histology; or poorly defined borders. It gives the highest cure rate while sparing tissue. Low-risk BCC on the trunk/limbs can be treated with <strong>standard excision</strong> or curettage and electrodesiccation. Topical 5-FU/imiquimod and cryotherapy are for <strong>superficial</strong> low-risk BCC. <strong>Hedgehog inhibitors</strong> (vismodegib) are for locally advanced or metastatic disease.",
      flashcards: [
        { f: "Classic clinical appearance of basal cell carcinoma?", b: "Pearly translucent papule with rolled borders, arborizing telangiectasias, and possible central ulceration.", x: "BCC grows locally from basal keratinocytes and rarely metastasizes but can destroy tissue.", t: "Trap: Squamous cell carcinoma is often a scaly or keratotic tender plaque/nodule, not pearly.", m: "BCC is pearly with tree-like vessels" },
        { f: "When is Mohs micrographic surgery preferred for BCC?", b: "High-risk sites such as facial mask area, hands, feet, genitals; recurrent, aggressive, or ill-defined tumors.", x: "Mohs examines nearly all margins while sparing tissue, giving high cure rates in cosmetically critical areas.", t: "Trap: Low-risk superficial BCC on trunk can use excision, electrodesiccation/curettage, or topical therapy.", m: "Mohs for mask-area or high-risk BCC",
          tb: { h: ["BCC risk setting", "Preferred treatment"], r: [["Facial mask area", "Mohs"], ["Recurrent tumor", "Mohs"], ["Aggressive histology", "Mohs"], ["Low-risk trunk", "Excision or C and E"]] } },
        { f: "Treatment for locally advanced or metastatic basal cell carcinoma?", b: "Hedgehog inhibitors such as vismodegib or sonidegib; cemiplimab after progression/intolerance.", x: "Most BCCs have Hedgehog pathway activation through PTCH1/SMO signaling.", t: "Trap: Routine chemotherapy is not standard for advanced BCC on board exams.", m: "Advanced BCC follows Hedgehog" }
      ]
    },
    {
      id: "derm-psoriasis-tb",
      system: "DERM",
      task: "TEST",
      vignette: "A 42-year-old man has plaque psoriasis covering 18% of his body surface area and swollen \"sausage\" fingers with morning stiffness. Topical therapy has not helped. You plan to start adalimumab. He was born in the Philippines and has no symptoms of infection.",
      leadIn: "Which test must be performed before starting adalimumab?",
      options: [
        "Antinuclear antibodies to exclude drug-induced lupus risk.",
        "HLA-B27 to assess for axial spondyloarthritis.",
        "Interferon-γ release assay for latent tuberculosis.",
        "Serum IgA level to exclude IgA deficiency."
      ],
      correct: 2,
      explanation: "<strong>Moderate–severe psoriasis</strong> (&gt; 10% body surface area, or high-impact sites) and especially <strong>psoriatic arthritis</strong> (dactylitis, enthesitis, DIP disease) warrant <strong>systemic therapy</strong>. <strong>TNF inhibitors</strong> treat both skin and joints; IL-17 and IL-23 inhibitors are highly effective alternatives. Before any biologic (and especially anti-TNF), screen for <strong>latent tuberculosis (IGRA or TST)</strong> and <strong>hepatitis B</strong> (also hepatitis C, HIV as indicated) and update vaccines. Start latent TB treatment before the TNF inhibitor (ideally ≥ 1 month before). TNF inhibitors are relatively contraindicated in <strong>heart failure</strong> and <strong>demyelinating disease</strong>. IgA level is checked before IVIG; HLA-B27 does not change management here.",
      flashcards: [
        { f: "What screening is required before starting adalimumab or another biologic for psoriasis?", b: "Screen for latent TB with IGRA/TST, hepatitis B/C, and update vaccines; consider HIV by risk.", x: "TNF blockade can reactivate granulomatous infections, especially TB, and HBV can flare with immunosuppression.", t: "Trap: HLA-B27 may support spondyloarthritis but is not required before TNF inhibitor therapy.", m: "Before biologic: TB, hepatitis, vaccines" },
        { f: "Important contraindications or cautions for TNF inhibitors?", b: "Active serious infection, untreated latent TB, NYHA III–IV heart failure, and demyelinating disease.", x: "TNF is needed for granuloma maintenance; inhibition can worsen MS-like demyelination and severe HF.", t: "Trap: Prior treated latent TB is not an absolute contraindication once prophylaxis is underway/complete.", m: "TNF blockers dislike TB, bad HF, and demyelination",
          tb: { h: ["TNF issue", "Why it matters"], r: [["Latent TB", "Reactivation risk"], ["Serious infection", "Can worsen infection"], ["NYHA III–IV HF", "May worsen HF"], ["Demyelination", "May worsen MS-like disease"]] } },
        { f: "Key clinical features of psoriatic arthritis?", b: "Dactylitis, enthesitis, DIP involvement, nail pitting/onycholysis, and possible arthritis mutilans.", x: "Joint disease may occur with mild skin psoriasis, so ask about nails, heel pain, and sausage digits.", t: "Trap: Rheumatoid arthritis usually spares DIP joints and lacks nail pitting.", m: "PsA clues: sausage digits, entheses, DIP, nails" }
      ]
    },
    {
      id: "derm-tinea-koh",
      system: "DERM",
      task: "TEST",
      vignette: "A 37-year-old man has an itchy rash on his thigh for 2 months. It has spread despite twice-daily hydrocortisone cream. Exam shows an expanding, annular plaque with a raised, scaly advancing edge and central clearing. He has scaling between his toes.",
      leadIn: "Which test is most appropriate to confirm the diagnosis?",
      options: [
        "Punch biopsy of the active border for histopathology.",
        "Lyme disease serology for possible erythema migrans.",
        "Patch testing for allergic contact dermatitis to the steroid cream.",
        "Potassium hydroxide (KOH) preparation of skin scrapings."
      ],
      correct: 3,
      explanation: "An annular plaque with a <strong>scaly advancing border and central clearing</strong>, plus <strong>tinea pedis</strong> as the source, suggests <strong>tinea corporis</strong> (dermatophyte). Topical steroids suppress inflammation but let the fungus spread (\"<strong>tinea incognito</strong>\"). Confirm with a <strong>KOH preparation</strong> of scale from the edge (branching septate hyphae) before treatment; fungal culture can identify the species. Treat with a <strong>topical azole or terbinafine</strong> for 2–4 weeks; use oral terbinafine or itraconazole for extensive disease, <strong>tinea capitis</strong>, or <strong>onychomycosis</strong> (confirm onychomycosis before oral therapy). Erythema migrans is not scaly; nummular eczema and granuloma annulare lack scale at the edge or are KOH negative.",
      flashcards: [
        { f: "Best bedside test for a scaly annular plaque with central clearing?", b: "KOH preparation of scale from the active border showing branching septate hyphae.", x: "The advancing edge has the highest fungal burden, improving test yield.", t: "Trap: Erythema migrans expands but is not scaly and has a negative KOH.", m: "Scrape the scaly edge for KOH" },
        { f: "What is tinea incognito?", b: "Dermatophyte infection altered and spread by topical corticosteroids.", x: "Steroids reduce inflammation and scale, masking the border while fungus proliferates.", t: "Trap: Nummular eczema may improve with steroids; tinea often worsens or recurs.", m: "Steroids disguise and spread tinea" },
        { f: "Which tinea infections usually require oral antifungal therapy?", b: "Tinea capitis, confirmed onychomycosis, and extensive or refractory tinea corporis.", x: "Hair follicles and nails are poorly penetrated by topical agents, so systemic terbinafine/itraconazole is needed.", t: "Trap: Do not give oral therapy for suspected onychomycosis without confirmation because mimics are common.", m: "Hair and nails need oral antifungal reach" }
      ]
    },
    {
      id: "derm-pyoderma",
      system: "DERM",
      task: "RX",
      vignette: "A 35-year-old woman with ulcerative colitis has a rapidly enlarging, very painful leg ulcer for 2 weeks. It began as a pustule after she bumped her shin. The ulcer is 5 cm with a purulent base and a violaceous, undermined border. Wound culture grows mixed skin flora. Biopsy of the edge shows a dense neutrophilic infiltrate without vasculitis or organisms.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Systemic glucocorticoids with gentle wound care.",
        "Surgical debridement of the necrotic ulcer base.",
        "IV vancomycin for presumed MRSA skin and soft tissue infection.",
        "Compression stockings and leg elevation for a venous stasis ulcer."
      ],
      correct: 0,
      explanation: "<strong>Pyoderma gangrenosum</strong> is a <strong>neutrophilic dermatosis</strong>: a painful pustule that rapidly becomes an ulcer with a <strong>violaceous, undermined border</strong>. About half of cases are associated with <strong>IBD</strong>, inflammatory arthritis, or hematologic disease (myeloma, myeloid neoplasms). <strong>Pathergy</strong> (new lesions after trauma) is characteristic, so <strong>surgical debridement worsens it</strong>. It is a diagnosis of exclusion (rule out infection, vasculitis, malignancy). Treatment: <strong>systemic glucocorticoids</strong> or <strong>cyclosporine</strong> (topical/intralesional steroids or tacrolimus for small lesions), <strong>TNF inhibitors</strong> (especially with IBD), and moist, nonadherent dressings. Antibiotics do not help without infection.",
      flashcards: [
        { f: "Painful rapidly enlarging ulcer with violaceous undermined border: diagnosis?", b: "Pyoderma gangrenosum.", x: "It is a neutrophilic dermatosis often triggered by minor trauma and associated with systemic inflammatory disease.", t: "Trap: Infection must be excluded, but antibiotics alone do not help without true infection.", m: "Painful purple undermined ulcer = PG" },
        { f: "Diseases associated with pyoderma gangrenosum?", b: "Inflammatory bowel disease, inflammatory arthritis, and hematologic disease such as myeloma, MDS, or leukemia.", x: "Finding an association can guide therapy, especially TNF inhibitors when IBD coexists.", t: "Trap: Diabetes predisposes to ulcers, but a violaceous undermined rapidly progressive border suggests PG.", m: "PG pairs with IBD, arthritis, and blood disease" },
        { f: "Why should surgical debridement be avoided in pyoderma gangrenosum?", b: "Pathergy: trauma can enlarge ulcers; use immunosuppression and gentle nonadherent wound care.", x: "Systemic glucocorticoids or cyclosporine rapidly calm neutrophilic inflammation in severe disease.", t: "Trap: Necrotizing infection requires urgent debridement; PG diagnosis requires excluding infection.", m: "PG pathergy: cutting makes it worse" }
      ]
    },
    {
      id: "obgyn-gdm",
      system: "OBGYN",
      task: "RX",
      vignette: "A 31-year-old woman at 30 weeks of gestation was diagnosed with gestational diabetes 3 weeks ago. Despite following a medical nutrition plan and walking daily, her home glucose readings average fasting 104 mg/dL and 1-hour post-meal 162 mg/dL. Fetal growth is appropriate.",
      leadIn: "What is the most appropriate next step in management?",
      options: [
        "Glyburide.",
        "Insulin.",
        "Continue diet alone and recheck at 36 weeks.",
        "Sitagliptin, a DPP-4 inhibitor, for its weight neutrality."
      ],
      correct: 1,
      explanation: "Her fasting and postmeal readings remain above GDM targets despite nutrition and exercise: <strong>fasting &lt;95, 1-hour &lt;140, or 2-hour &lt;120 mg/dL</strong>. <strong>Insulin is the preferred pharmacotherapy</strong> in ADA/ACOG guidance and does not cross the placenta. Metformin crosses the placenta and may be considered after counseling if insulin is not feasible; long-term offspring effects remain uncertain. Glyburide is not preferred because of neonatal hypoglycemia and other adverse outcomes. Routine GDM screening occurs at 24–28 weeks. After GDM, perform a <strong>75-g OGTT at 4–12 weeks postpartum</strong> and screen every 1–3 years thereafter.",
      flashcards: [
        { f: "Glucose targets for gestational diabetes self-monitoring?", b: "Fasting <95, 1-hour postprandial <140, or 2-hour postprandial <120 mg/dL.", x: "Postprandial hyperglycemia drives fetal hyperinsulinemia, macrosomia, shoulder dystocia, and neonatal hypoglycemia.", t: "Trap: Nonpregnant diabetes targets are not used for GDM.", m: "GDM targets: 95 fasting, 140 one-hour, 120 two-hour",
          tb: { h: ["Measurement", "Target"], r: [["Fasting", "<95 mg/dL"], ["1-hour postmeal", "<140 mg/dL"], ["2-hour postmeal", "<120 mg/dL"]] } },
        { f: "Preferred medication for gestational diabetes when diet/exercise fail?", b: "Insulin.", x: "Insulin is effective and does not cross the placenta; metformin/glyburide cross and are second-line.", t: "Trap: DPP-4 inhibitors, GLP-1 agonists, and SGLT2 inhibitors are not used for GDM treatment.", m: "Diet fails in GDM → insulin first" },
        { f: "Postpartum diabetes screening after gestational diabetes?", b: "75-g OGTT at 4–12 weeks postpartum, then screen every 1–3 years lifelong.", x: "GDM unmasks insulin resistance and predicts high future type 2 diabetes risk.", t: "Trap: A normal delivery glucose does not replace postpartum OGTT.", m: "GDM follow-up: 4 to 12 week OGTT, then lifelong screening" }
      ]
    },
    {
      id: "obgyn-menopause-ht",
      system: "OBGYN",
      task: "RX",
      vignette: "A 51-year-old woman's last menstrual period was 14 months ago. She has 10–12 hot flashes daily and night sweats that disrupt her sleep. She has an intact uterus. She has no history of breast cancer, VTE, stroke, coronary disease, or liver disease. BP is 124/78 mm Hg. Her 10-year ASCVD risk is 3%. Mammography is up to date and normal.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Transdermal estradiol without a progestogen.",
        "Oral micronized progesterone alone.",
        "Transdermal estradiol plus a progestogen.",
        "Low-dose vaginal estradiol without a progestogen."
      ],
      correct: 2,
      explanation: "<strong>Systemic menopausal hormone therapy</strong> is the most effective treatment for vasomotor symptoms, with a generally favorable benefit-risk ratio in appropriately selected symptomatic women under 60 or within 10 years of menopause. An <strong>intact uterus requires a progestogen</strong> with systemic estradiol. Observational evidence suggests lower VTE risk with transdermal than oral estrogen, but transdermal therapy is not risk-free and does not erase contraindications. Avoid systemic therapy with unexplained bleeding, prior breast cancer, VTE, stroke, coronary disease, or active liver disease. Nonhormonal options include selected SSRIs/SNRIs, gabapentin, and <strong>fezolinetant</strong>, which has an FDA boxed warning for rare serious liver injury and requires scheduled liver tests.",
      flashcards: [
        { f: "Who needs progestogen with systemic menopausal estrogen therapy?", b: "Any patient with an intact uterus.", x: "Progestogen prevents estrogen-driven endometrial proliferation, hyperplasia, and cancer.", t: "Trap: After hysterectomy, estrogen alone is used because no endometrium needs protection.", m: "Uterus needs progesterone protection" },
        { f: "When do benefits of menopausal hormone therapy generally outweigh risks?", b: "Healthy symptomatic women age <60 or within 10 years of menopause and without contraindications.", x: "Starting near menopause has a more favorable cardiovascular and VTE risk profile than late initiation.", t: "Trap: Do not start systemic HT for chronic disease prevention or in prior VTE, stroke, CAD, breast cancer, or unexplained bleeding.", m: "Hormone therapy window: under 60 or within 10 years" },
        { f: "What nonhormonal options treat menopausal vasomotor symptoms?", b: "Selected SSRIs/SNRIs, gabapentin, or fezolinetant; oxybutynin has evidence but adds anticholinergic burden.", x: "Fezolinetant requires liver testing before treatment, monthly for the first 3 months, then at months 6 and 9 because of rare serious liver injury.", t: "Trap: Vaginal estrogen is for genitourinary symptoms, not systemic hot flashes; avoid strong CYP2D6 inhibitors such as paroxetine with tamoxifen.", m: "Hot-flash alternatives still need safety checks" }
      ]
    },
    {
      id: "obgyn-cervical-screen",
      system: "OBGYN",
      task: "NEXT",
      vignette: "A 67-year-old woman asks whether she still needs Pap tests. She has a uterus and cervix. Her last three cytology results (at ages 58, 61, and 64) were normal, and she had a negative HPV co-test at 64. She has never had an abnormal result or CIN2+, is not immunocompromised, and was not exposed to DES in utero.",
      leadIn: "What is the most appropriate recommendation?",
      options: [
        "Cytology every 3 years until age 75.",
        "Primary HPV testing every 5 years for life.",
        "Annual pelvic examination with cytology.",
        "Stop cervical cancer screening."
      ],
      correct: 3,
      explanation: "Under routine <strong>USPSTF screening guidance</strong>, this average-risk patient can stop after 65 because she has three negative cytology results within 10 years, the latest within 5 years, and no high-risk history. For ages 21–29, cytology every 3 years is recommended; ages 30–65 may use primary hrHPV every 5 years, cotesting every 5 years, or cytology every 3 years. Prior treated CIN2+ requires at least 25 years of surveillance under ASCCP guidance. HIV/immunosuppression needs condition-specific recommendations. Prenatal DES exposure also uses separate guidance: ASCCP 2024 recommends annual cytology to age 65, with cessation afterward if other stopping criteria are met, rather than automatic lifelong screening. Total hysterectomy for benign disease permits stopping only if there is no relevant high-grade precancer/cancer history.",
      flashcards: [
        { f: "USPSTF cervical cancer screening intervals by age 21–65?", b: "21–29 cytology every 3 years; 30–65 primary hrHPV every 5 years, cotest every 5 years, or cytology every 3 years.", x: "HPV testing is more sensitive after age 30, when transient infections are less common.", t: "Trap: Do not screen average-risk patients younger than 21 regardless of sexual activity.", m: "Cervix screening: 21 starts, 65 can stop if adequately negative",
          tb: { h: ["Age", "Screening options"], r: [["<21", "Do not screen"], ["21–29", "Cytology every 3 yr"], ["30–65", "HPV 5 yr, cotest 5 yr, or cytology 3 yr"], [">65", "Stop if adequate negatives"]] } },
        { f: "When can cervical cancer screening stop after age 65?", b: "Adequate negative prior screening and no CIN2+ within 25 years.", x: "Adequate means 3 negative cytology tests or 2 negative HPV-based tests in 10 years, most recent within 5.", t: "Trap: Continue screening after CIN2+ for 25 years even if this extends beyond age 65.", m: "65 stop rule: adequate negatives and no CIN2+ for 25 years" },
        { f: "Who requires a special cervical surveillance pathway?", b: "Prior CIN2+, HIV/immunosuppression, or prenatal DES exposure; the stopping rules differ by condition.", x: "After CIN2+ treatment, continue surveillance for at least 25 years. ASCCP 2024 allows DES-exposed patients to stop after 65 if otherwise eligible; do not assume lifelong screening.", t: "Trap: A supracervical hysterectomy leaves a cervix; total hysterectomy does not erase prior CIN2+ surveillance needs.", m: "High-risk history changes the pathway, not always the stop age" }
      ]
    },
    {
      id: "obgyn-preconception",
      system: "OBGYN",
      task: "RX",
      vignette: "A 33-year-old woman with chronic hypertension plans pregnancy in 2 months. Her BP is 132/82 mm Hg on extended-release nifedipine, which replaced lisinopril at an earlier preconception visit. She has no kidney disease, diabetes, bleeding disorder, peptic ulcer, or aspirin allergy. She takes a prenatal vitamin and asks how to reduce her risk of preeclampsia once pregnant.",
      leadIn: "Which preventive regimen should be included in her pregnancy care plan?",
      options: [
        "Aspirin 81 mg daily starting at 12 weeks and continuing until delivery.",
        "Aspirin 81 mg daily starting at 32 weeks and continuing until delivery.",
        "Enoxaparin 40 mg daily starting at 12 weeks and continuing until delivery.",
        "Vitamin C and vitamin E daily starting at 12 weeks and continuing until delivery."
      ],
      correct: 0,
      explanation: "<strong>Chronic hypertension is a high-risk indication for low-dose aspirin to prevent preeclampsia</strong>, even when BP is well controlled. ACOG/SMFM recommend <strong>81 mg daily beginning between 12 and 28 weeks, optimally before 16 weeks, and continuing until delivery</strong>. Planning a 12-week start is appropriate; waiting until 32 weeks misses the recommended initiation window. Continue the pregnancy-compatible antihypertensive and routine prenatal surveillance. LMWH is not prescribed solely for preeclampsia prevention in chronic hypertension without another indication, and antioxidant vitamins do not provide established preventive benefit. Aspirin prophylaxis does not replace treatment of hypertension or evaluation for superimposed preeclampsia.",
      flashcards: [
        { f: "Which antihypertensives are preferred during preconception planning?", b: "Labetalol or extended-release nifedipine; methyldopa is an alternative. Replace ACE inhibitors and ARBs before planned conception.", x: "ACE inhibitors and ARBs can cause fetal renal injury and oligohydramnios, especially later in pregnancy; treatment planning should precede conception.", t: "Trap: Switching an ACE inhibitor to an ARB does not solve fetal safety concerns.", m: "Plan pregnancy: change ACE/ARB before conception" },
        { f: "What treatment threshold does ACOG recommend for chronic hypertension in pregnancy after CHAP?", b: "Use 140/90 mm Hg as the threshold for initiating or titrating therapy rather than waiting for severe hypertension.", x: "Active treatment reduces adverse pregnancy outcomes; ACOG distinguishes this treatment threshold from an established universal BP target.", t: "Trap: Well-controlled chronic hypertension still qualifies as high risk for preeclampsia.", m: "CHAP changes the threshold, not the aspirin indication" },
        { f: "What aspirin regimen prevents preeclampsia in a patient with chronic hypertension?", b: "81 mg daily from 12–28 weeks, ideally before 16 weeks, through delivery if no contraindication.", x: "Chronic hypertension is one high-risk factor sufficient to justify prophylaxis; multiple moderate-risk factors can also support it.", t: "Trap: Aspirin prevents risk; it is not treatment for established severe preeclampsia.", m: "High risk: 81 mg after 12 weeks",
          tb: { h: ["Regimen element", "Recommendation"], r: [["Dose", "81 mg daily"], ["Start window", "12–28 weeks; ideally before 16"], ["Duration", "Until delivery"]] } }
      ]
    },
    {
      id: "heme-vwd",
      system: "HEME",
      task: "TEST",
      vignette: "A 22-year-old woman has had heavy menstrual periods since menarche, frequent nosebleeds, and prolonged bleeding after a wisdom tooth extraction. Her mother also has heavy menses. Platelet count is 260,000/µL, PT is normal, and aPTT is 37 s (normal 25–35). She takes no medications.",
      leadIn: "Which is the most appropriate next diagnostic test?",
      options: [
        "Platelet aggregation panel and platelet electron microscopy.",
        "VWF antigen, VWF activity, and factor VIII levels.",
        "Factors VIII, IX, and XI activity levels.",
        "Lupus anticoagulant panel and aPTT mixing study."
      ],
      correct: 1,
      explanation: "<strong>Mucocutaneous bleeding</strong> (menorrhagia, epistaxis, dental bleeding) with a normal platelet count and a <strong>family history</strong> suggests <strong>von Willebrand disease</strong>, the most common inherited bleeding disorder (usually autosomal dominant, type 1 = quantitative deficiency). VWF carries factor VIII, so the <strong>aPTT may be normal or mildly prolonged</strong>. Initial tests: <strong>VWF antigen, VWF platelet-binding activity (VWF:GPIbM or ristocetin cofactor), and factor VIII</strong>. VWF levels rise with estrogen, pregnancy, stress, and inflammation, so repeat testing may be needed. Treatment: <strong>desmopressin</strong> for type 1 (test response first), <strong>tranexamic acid</strong>, hormonal therapy for menorrhagia, and VWF concentrate for major bleeding or type 3. Hemophilia (factor VIII/IX) causes joint and muscle bleeding, mostly in males.",
      flashcards: [
        { f: "Initial diagnostic panel for suspected von Willebrand disease?", b: "VWF antigen, VWF activity, and factor VIII level.", x: "VWF carries factor VIII, so aPTT may be normal or mildly prolonged despite mucocutaneous bleeding.", t: "Trap: Normal platelet count does not exclude VWD; platelet number is usually normal.", m: "VWD panel: antigen, activity, factor VIII" },
        { f: "Treatment options for type 1 von Willebrand disease?", b: "Desmopressin after test response, tranexamic acid, hormonal therapy for menorrhagia, or VWF concentrate for major bleeding.", x: "Desmopressin releases endothelial VWF stores but is ineffective or unsafe in some VWD subtypes.", t: "Trap: Hemophilia A causes deep muscle/joint bleeding in males, not typical menorrhagia/epistaxis.", m: "Type 1 VWD often responds to DDAVP" },
        { f: "Bleeding pattern: platelet/VWF disorder vs coagulation factor deficiency?", b: "Platelet/VWF: mucosal, petechiae, immediate bleeding. Factor deficiency: hemarthrosis, deep muscle, delayed bleeding.", x: "Primary hemostasis defects affect platelet plug formation; coagulation defects impair fibrin stabilization.", t: "Trap: Isolated prolonged PT points to extrinsic pathway/liver/warfarin, not classic VWD.", m: "Mucosa = platelets/VWF; joints = factors",
          tb: { h: ["Bleeding type", "Platelet or VWF", "Factor deficiency"], r: [["Site", "Mucosa, skin", "Joints, deep muscle"], ["Timing", "Immediate", "Delayed"], ["Findings", "Petechiae", "Hemarthrosis"]] } }
      ]
    },
    {
      id: "geri-hospice",
      system: "GERI",
      task: "NEXT",
      vignette: "An 82-year-old man with NYHA class IV heart failure (LVEF 15%) has had 3 hospitalizations in 4 months despite optimal therapy and is not a candidate for advanced therapies. He wants to stay at home and avoid hospital stays but wishes to keep taking his heart failure medications. His family worries that hospice means \"giving up all treatment.\"",
      leadIn: "Which statement about Medicare hospice eligibility is correct?",
      options: [
        "He must elect a do-not-resuscitate order before enrolling in hospice care.",
        "He must discontinue disease-modifying heart failure drugs before enrolling.",
        "Initial physician certification must support prognosis of 6 months or less.",
        "His benefit must end after 6 months regardless of subsequent recertification."
      ],
      correct: 2,
      explanation: "The <strong>Medicare Hospice Benefit</strong> requires initial certification by the hospice physician and attending physician, if the patient has one, of a <strong>prognosis ≤6 months if the illness runs its usual course</strong>, plus election of the benefit. <strong>A DNR order is not required</strong>, and eligible terminal illnesses are not limited to cancer. Symptom-relieving heart failure medications may continue when aligned with the individualized hospice plan; enrollment does not mean stopping all treatment. Patients can be <strong>recertified beyond 6 months</strong> when they remain eligible. Palliative care can be provided at any stage alongside disease-directed treatment.",
      flashcards: [
        { f: "What physician certification supports initial Medicare hospice election?", b: "The hospice physician and attending physician, if there is one, certify prognosis ≤6 months if illness follows its usual course.", x: "The patient elects the benefit; continued eligibility allows recertification beyond 6 months. An exact date of death is not predicted.", t: "Trap: A DNR order and cessation of all disease-related medications are not enrollment requirements.", m: "Certify prognosis, then recertify when still eligible" },
        { f: "Does hospice apply only to cancer or end after 6 months?", b: "No. Any terminal illness can qualify, and hospice can be recertified beyond 6 months.", x: "Hospice may continue symptom-relieving medications, such as diuretics for dyspnea in heart failure.", t: "Trap: Stopping all disease-related drugs is not required if they improve comfort.", m: "Hospice is diagnosis-neutral and recertifiable" },
        { f: "How does palliative care differ from hospice?", b: "Palliative care can occur at any stage with curative treatment; hospice is comfort-focused with prognosis ≤6 months.", x: "Both address symptoms, goals, caregiver support, and serious-illness communication.", t: "Trap: Palliative care is not the same as giving up; it can be concurrent with chemotherapy or dialysis.", m: "Palliative care can ride alongside cure-focused care",
          tb: { h: ["Feature", "Palliative care", "Hospice"], r: [["Timing", "Any serious illness", "Prognosis ≤6 mo"], ["Treatment goal", "Can be curative", "Comfort-focused"], ["Coverage", "Not prognosis tied", "Medicare benefit"]] } }
      ]
    },
    {
      id: "found-ppv",
      system: "FOUND",
      task: "RISK",
      vignette: "A new screening test for a disease has a sensitivity of 90% and a specificity of 80%. It is applied to a population in which the disease prevalence is 10%. A patient from this population has a positive result.",
      leadIn: "What is the approximate probability that this patient has the disease (positive predictive value)?",
      options: [
        "90%",
        "80%",
        "67%",
        "33%"
      ],
      correct: 3,
      explanation: "Use a 2 × 2 table with 1,000 people: <strong>100 have the disease</strong> (10%) and 900 do not. <strong>True positives</strong> = 90% × 100 = <strong>90</strong>. <strong>False positives</strong> = (1 − 0.80) × 900 = <strong>180</strong>. <strong>PPV = TP / (TP + FP) = 90 / 270 ≈ 33%</strong>. Sensitivity and specificity are properties of the test; <strong>PPV and NPV depend on prevalence</strong> (pretest probability). Low prevalence lowers PPV and raises NPV. Equivalent likelihood-ratio approach: <strong>LR+ = sens / (1 − spec) = 0.9 / 0.2 = 4.5</strong>; pretest odds 1:9 × 4.5 = 0.5 → post-test probability 0.5 / 1.5 ≈ 33%.",
      flashcards: [
        { f: "Formula for positive predictive value and negative predictive value?", b: "PPV = TP/(TP+FP); NPV = TN/(TN+FN).", x: "PPV answers: among positive tests, how many truly have disease; NPV answers the reverse for negative tests.", t: "Trap: Sensitivity and specificity are test properties; PPV/NPV change with prevalence.", m: "PPV looks right; NPV looks negative" },
        { f: "How does disease prevalence affect PPV and NPV?", b: "Higher prevalence raises PPV and lowers NPV; lower prevalence lowers PPV and raises NPV.", x: "With rare disease, even a specific test may produce many false positives relative to true positives.", t: "Trap: Sensitivity and specificity do not change just because pretest probability changes.", m: "Prevalence lifts PPV and lowers NPV" },
        { f: "Formulas for likelihood ratios and post-test odds?", b: "LR+ = sensitivity/(1−specificity); LR− = (1−sensitivity)/specificity; post-test odds = pretest odds × LR.", x: "Convert odds back to probability with odds/(1+odds) for bedside interpretation.", t: "Trap: Do not multiply LR by pretest probability; multiply by pretest odds.", m: "LRs multiply odds, not probability" }
      ]
    }
    ,
    /* ==================================================================
     * V3.0 expansion — 80 items (170 → 250), weighted to the blueprint:
     * ACS/HF/arrhythmia/amyloid, thyroid-pituitary-bone, liver & esophagus,
     * PFT patterns, crystal/connective-tissue disease, HIV/ID syndromes,
     * hematologic malignancy, solid-tumor oncology, neuro-psych, derm,
     * women's health, geriatrics, ethics, and toxicology.
     * ================================================================== */
    {
      id: "cv-nstemi-early-invasive",
      system: "CV",
      task: "NEXT",
      vignette: "A 69-year-old man with diabetes and chronic kidney disease has 45 minutes of substernal chest pressure that resolves with nitroglycerin. Blood pressure is 148/86 mm Hg, pulse is 92/min, and oxygen saturation is 97% on room air. ECG shows 1-mm ST depression in V4-V6, and high-sensitivity troponin rises from 42 to 310 ng/L. He receives aspirin, anticoagulation, and high-intensity statin therapy.",
      leadIn: "Which of the following is the most appropriate next step in management?",
      options: [
        "Exercise treadmill testing tomorrow",
        "Coronary angiography within 24 hours",
        "Outpatient cardiology follow-up",
        "Immediate fibrinolytic therapy now in ED"
      ],
      correct: 1,
      explanation: "This patient has NSTEMI with ST depression, rising troponin, diabetes, and CKD, favoring an <strong>invasive strategy during hospitalization</strong>; early angiography within 24 hours is reasonable for high-risk NSTE-ACS. Immediate angiography is for refractory ischemia or hemodynamic/electrical instability. Stress testing or outpatient follow-up would inappropriately delay care in this troponin-positive patient. Fibrinolysis is not used for NSTEMI.",
      flashcards: [
        { f: "Which NSTEMI features favor early invasive angiography?", b: "High-risk features such as GRACE >140, dynamic ST changes, and confirmed NSTEMI favor early angiography, often within 24 hours.", x: "Refractory ischemia, shock, or dangerous arrhythmias require immediate rather than merely next-day angiography.", t: "Trap: Stress testing a troponin-positive patient with ST depression delays an indicated invasive strategy.", m: "Risk sets the cath clock; instability means now.",
          tb: { h: ["NSTE-ACS", "Next step"], r: [["High-risk", "Cath within 24 h"], ["Low-risk", "Stress before discharge"], ["Unstable", "Urgent cath"]] } },
        { f: "When is stress testing appropriate after chest pain?", b: "Low-risk suspected ACS after MI is ruled out and no ongoing ischemia, HF, arrhythmia, or concerning ECG changes remain.", x: "Stress testing risk-stratifies stable low-risk patients; it delays needed revascularization in high-risk NSTEMI.", t: "Trap: using exercise testing before serial troponins are negative.", m: "Rule out first, stress later." },
        { f: "Is fibrinolysis used for NSTEMI?", b: "No. Fibrinolysis is for STEMI when timely PCI cannot be done; it has no role in NSTEMI.", x: "NSTEMI usually has nonocclusive thrombus; lytics add bleeding risk without benefit.", t: "Trap: treating all positive-troponin ACS with lytics.", m: "ST elevation gets lysis; ST depression gets risk stratification." }
      ]
    },
    {
      id: "cv-stable-angina-ccta",
      system: "CV",
      task: "TEST",
      vignette: "A 52-year-old woman has 3 months of exertional substernal pressure that improves with rest. She has hypertension, no known coronary artery disease, and can exercise on a treadmill. Resting ECG is normal, LDL cholesterol is 142 mg/dL, and creatinine is 0.8 mg/dL. Pretest probability for obstructive coronary artery disease is intermediate.",
      leadIn: "Which of the following is the most appropriate initial diagnostic test?",
      options: [
        "Invasive coronary angiography",
        "Resting transthoracic echocardiography",
        "Coronary CT angiography",
        "Ambulatory rhythm monitoring"
      ],
      correct: 2,
      explanation: "For stable chest pain with intermediate pretest probability and no known CAD, <strong>coronary CT angiography</strong> is an appropriate first-line test, especially in patients younger than 65 years. Invasive angiography is reserved for high-risk noninvasive findings or persistent severe symptoms despite medical therapy. Resting echocardiography does not diagnose obstructive CAD in a stable patient with normal exam. Rhythm monitoring evaluates palpitations or syncope, not exertional angina.",
      flashcards: [
        { f: "What first test fits intermediate-risk stable chest pain without known CAD?", b: "CCTA or stress imaging; CCTA is often favored in younger patients and when anatomy is desired.", x: "CCTA has high sensitivity for anatomic CAD and can guide prevention and further testing.", t: "Trap: sending stable intermediate-risk patients directly to cath.", m: "Stable + intermediate + young = CCTA shines.",
          tb: { h: ["Patient", "Useful first test"], r: [["Younger, no CAD", "CCTA"], ["Older or calcified", "Stress imaging"], ["High-risk features", "Invasive cath"]] } },
        { f: "When is invasive angiography first-line for stable chest pain?", b: "Generally when high-risk clinical features, high-risk noninvasive test, or refractory symptoms despite GDMT are present.", x: "Cath has procedural risk and should follow risk stratification unless risk is already high.", t: "Trap: cath for all exertional chest pressure.", m: "Noninvasive before invasive unless high risk." },
        { f: "What does a normal resting ECG allow in chest pain testing?", b: "It permits exercise ECG if the patient can exercise, but CCTA or stress imaging are also guideline-supported options.", x: "An interpretable ECG is needed for treadmill ECG, but anatomy with CCTA is often helpful in younger patients.", t: "Trap: using rhythm monitoring to evaluate angina.", m: "ECG test needs ECG clarity." }
      ]
    },
    {
      id: "cv-constrictive-pericarditis",
      system: "CV",
      task: "DX",
      vignette: "A 58-year-old man treated with chest radiation for lymphoma years ago reports progressive abdominal distention and exertional dyspnea. Blood pressure is 112/70 mm Hg, jugular venous pressure rises with inspiration, and a high-pitched early diastolic sound is heard along the left sternal border. Echocardiography shows preserved LVEF, septal bounce, and marked respiratory variation in mitral inflow velocity. BNP is 95 pg/mL.",
      leadIn: "Which of the following is the most likely diagnosis?",
      options: [
        "Dilated cardiomyopathy",
        "Pulmonary arterial hypertension",
        "Cardiac tamponade",
        "Constrictive pericarditis"
      ],
      correct: 3,
      explanation: "Prior mediastinal radiation, right-sided congestion, Kussmaul sign, pericardial knock, septal bounce, and respiratory variation in inflow strongly indicate <strong>constrictive pericarditis</strong>. Dilated cardiomyopathy typically has reduced LVEF and ventricular dilation. Pulmonary arterial hypertension causes loud P2 and RV strain but not a pericardial knock or septal bounce. Tamponade causes hypotension and pulsus paradoxus rather than chronic Kussmaul physiology.",
      flashcards: [
        { f: "What classic echo findings suggest constrictive pericarditis?", b: "Septal bounce plus exaggerated respiratory variation in mitral and tricuspid inflow with preserved or near-preserved EF.", x: "A rigid pericardium creates ventricular interdependence and dissociation of intrathoracic and intracardiac pressures.", t: "Trap: labeling preserved-EF right HF as restrictive cardiomyopathy.", m: "Constrictive = bounce + breathing variation." },
        { f: "How can BNP help separate constriction from restriction?", b: "BNP is often normal or mildly elevated in constriction but usually higher in restrictive cardiomyopathy.", x: "Myocardial stretch is less prominent when the pericardium, not the myocardium, limits filling.", t: "Trap: assuming all right-sided congestion has high BNP.", m: "Pericardium pinches; myocardium stretches.",
          tb: { h: ["Feature", "Constrictive", "Restrictive"], r: [["BNP", "Often modest", "Often high"], ["Septal bounce", "Common", "Uncommon"], ["Pericardium", "Rigid", "Usually normal"]] } },
        { f: "Which bedside sign supports constrictive pericarditis?", b: "Kussmaul sign: jugular venous pressure fails to fall or rises with inspiration.", x: "Rigid filling prevents the normal inspiratory increase in right-sided venous return from being accommodated.", t: "Trap: mistaking Kussmaul sign for pulsus paradoxus.", m: "Kussmaul = JVP climbs on inspiration." }
      ]
    },
    {
      id: "cv-attr-amyloid-pyp-tafamidis",
      system: "CV",
      task: "TEST",
      vignette: "A 76-year-old man with bilateral carpal tunnel syndrome has worsening exertional dyspnea and leg edema. Echocardiography shows LVEF 55%, concentric left ventricular wall thickening, biatrial enlargement, and apical sparing on strain imaging. Serum free light-chain ratio is normal, and serum and urine immunofixation show no monoclonal protein. Creatinine is 1.1 mg/dL.",
      leadIn: "Which of the following is the most appropriate next step to establish the diagnosis?",
      options: [
        "Technetium-99m PYP scintigraphy",
        "Endomyocardial biopsy for Congo red",
        "Exercise stress echocardiography",
        "Cardiac catheterization with vasoreactivity"
      ],
      correct: 0,
      explanation: "In suspected cardiac amyloidosis, negative monoclonal protein testing makes AL amyloidosis unlikely; <strong>technetium-99m PYP scintigraphy</strong> can noninvasively diagnose transthyretin cardiac amyloidosis when uptake is grade 2 or 3. Biopsy is needed when monoclonal protein is present or imaging is equivocal. Stress echocardiography evaluates ischemia, not amyloid type. Vasoreactivity testing is for select pulmonary arterial hypertension evaluation.",
      flashcards: [
        { f: "How is ATTR cardiac amyloidosis diagnosed noninvasively?", b: "Grade 2 or 3 PYP uptake plus no monoclonal protein on serum free light chains and serum/urine immunofixation.", x: "Bone-avid tracers bind ATTR deposits; excluding AL is essential because AL needs urgent chemotherapy.", t: "Trap: ordering PYP before ruling out AL amyloidosis.", m: "PYP proves ATTR only after AL is absent.",
          tb: { h: ["Test result", "Meaning"], r: [["No monoclonal + PYP 2-3", "ATTR likely"], ["Monoclonal present", "Exclude AL"], ["Equivocal PYP", "Biopsy often needed"]] } },
        { f: "Which clues suggest ATTR cardiac amyloidosis in older adults?", b: "HFpEF with thick LV walls, apical sparing strain, carpal tunnel, biceps tendon rupture, neuropathy, or spinal stenosis.", x: "ATTR deposits in cardiac and connective tissues years before overt HF.", t: "Trap: calling thick walls hypertensive LVH without red flags.", m: "Carpal tunnel + thick ventricle = think TTR." },
        { f: "What disease-modifying drug is used for symptomatic ATTR cardiomyopathy?", b: "Tafamidis for NYHA class I-III ATTR cardiomyopathy to slow transthyretin tetramer dissociation.", x: "Stabilizing TTR reduces new amyloid formation and slows functional decline.", t: "Trap: using standard HFrEF drugs as amyloid-specific therapy.", m: "Tafamidis tames TTR tetramers." }
      ]
    },
    {
      id: "cv-mobitz-ii-pacemaker",
      system: "CV",
      task: "RX",
      vignette: "A 71-year-old man has recurrent presyncope while walking. Blood pressure is 118/64 mm Hg and pulse is 38/min. ECG shows constant PR intervals with intermittent nonconducted P waves and a wide QRS escape rhythm. Serum potassium is 4.3 mEq/L, TSH is normal, and he takes no AV nodal blockers.",
      leadIn: "Which of the following is the most appropriate management?",
      options: [
        "Continuous telemetry without pacing",
        "Dual-chamber permanent pacemaker",
        "Electrophysiology study before pacing",
        "Exercise testing to assess conduction"
      ],
      correct: 1,
      explanation: "Mobitz type II second-degree AV block is usually infranodal and can progress unpredictably to complete heart block. <strong>Permanent pacing</strong> is indicated when no reversible cause exists, even without symptoms. Admit with monitoring and pacing capability while arranging implantation; temporary pacing may be needed if instability develops. Telemetry alone does not prevent asystole. An electrophysiology study or exercise localization test should not delay pacing for established Mobitz II.",
      flashcards: [
        { f: "Which second-degree AV block requires permanent pacing?", b: "Mobitz II, high-grade AV block, or complete heart block without reversible cause generally require permanent pacemaker placement.", x: "Infranodal disease can deteriorate suddenly into asystole or complete block.", t: "Trap: observing Mobitz II because symptoms are intermittent.", m: "Mobitz Two = pacer due." },
        { f: "How does Mobitz II appear on ECG?", b: "Constant PR intervals before dropped QRS complexes, often with a wide QRS if infranodal.", x: "The PR does not progressively lengthen because the problem is His-Purkinje conduction failure.", t: "Trap: confusing with Wenckebach PR lengthening.", m: "Type I lengthens; Type II drops.",
          tb: { h: ["Block", "PR pattern", "Action"], r: [["Mobitz I", "Lengthens", "Observe if mild"], ["Mobitz II", "Constant then drop", "Pacemaker"], ["Complete", "AV dissociation", "Pacemaker"]] } },
        { f: "What reversible causes should be checked before pacing AV block?", b: "Medication toxicity, ischemia, hyperkalemia, Lyme disease when epidemiologic risk exists, and thyroid or metabolic abnormalities.", x: "Correction can remove the need for permanent hardware when conduction disease is not intrinsic.", t: "Trap: implanting before stopping a culprit AV nodal blocker.", m: "Pace after reversible causes are erased." }
      ]
    },
    {
      id: "cv-torsades-magnesium",
      system: "CV",
      task: "RX",
      vignette: "A 44-year-old woman hospitalized for pneumonia becomes lightheaded and has a 20-second episode of polymorphic ventricular tachycardia that terminates spontaneously. She started azithromycin and ondansetron yesterday. ECG after conversion shows QTc 540 ms. Potassium is 3.7 mEq/L and magnesium is 1.6 mg/dL.",
      leadIn: "Which of the following is the most appropriate immediate therapy?",
      options: [
        "IV amiodarone bolus",
        "Oral metoprolol tartrate",
        "IV magnesium sulfate",
        "Synchronized cardioversion"
      ],
      correct: 2,
      explanation: "Polymorphic VT with prolonged QT is torsades de pointes; after this self-terminating episode give <strong>IV magnesium sulfate</strong>, withdraw QT-prolonging drugs, and replete potassium to high-normal. Amiodarone can worsen QT prolongation. Metoprolol is not acute treatment for acquired torsades. Sustained unstable polymorphic VT requires <strong>immediate unsynchronized defibrillation</strong>, because synchronization is unreliable; no shock is needed while she is back in sinus rhythm.",
      flashcards: [
        { f: "What is first-line treatment for torsades de pointes?", b: "IV magnesium sulfate, stop QT-prolonging drugs, and replete potassium to high-normal; shock if unstable or persistent.", x: "Magnesium suppresses early afterdepolarizations that trigger torsades even when serum magnesium is normal.", t: "Trap: giving amiodarone for all ventricular tachycardia.", m: "Twisting points need Mg.",
          tb: { h: ["Rhythm", "Acute treatment"], r: [["Torsades, stable", "IV magnesium"], ["Torsades, unstable", "Shock now"], ["Monomorphic VT", "Amiodarone or shock"]] } },
        { f: "Which ECG feature defines torsades rather than ordinary polymorphic VT?", b: "Polymorphic VT occurring with prolonged QTc, often after QT-prolonging drugs or electrolyte depletion.", x: "Delayed repolarization creates early afterdepolarizations and pause-dependent bursts of VT.", t: "Trap: ignoring QTc after conversion.", m: "Torsades = polymorphic VT + long QT." },
        { f: "What electrical therapy is used for sustained unstable torsades?", b: "Immediate unsynchronized defibrillation, including if pulseless.", x: "Polymorphic QRS complexes prevent reliable synchronization; magnesium treats the substrate but must not delay shock.", t: "Trap: Waiting for a synchronized shock marker or magnesium in a crashing patient.", m: "Polymorphic and unstable: defibrillate." }
      ]
    },
    {
      id: "cv-hf-iron-deficiency-iv-iron",
      system: "CV",
      task: "RX",
      vignette: "A 63-year-old woman with ischemic cardiomyopathy has persistent fatigue despite guideline-directed medical therapy. LVEF is 30%, NYHA class II symptoms are present, hemoglobin is 11.2 g/dL, ferritin is 75 ng/mL, and transferrin saturation is 16%. Colonoscopy last year was normal, and creatinine is 1.0 mg/dL.",
      leadIn: "Which of the following is the most appropriate treatment for this abnormality?",
      options: [
        "Oral ferrous sulfate daily",
        "Red blood cell transfusion today",
        "Epoetin alfa injections",
        "Intravenous iron replacement"
      ],
      correct: 3,
      explanation: "In symptomatic HFrEF, iron deficiency is ferritin &lt;100 ng/mL or ferritin 100-299 ng/mL with transferrin saturation &lt;20%; <strong>IV iron</strong> improves symptoms and quality of life and can reduce HF hospitalizations. Oral iron has poor absorption and has not shown similar benefit in HFrEF trials. Transfusion is reserved for severe or symptomatic anemia, not stable hemoglobin 11.2 g/dL. Erythropoiesis-stimulating agents are not used for routine HF-related iron deficiency and increase thrombotic risk.",
      flashcards: [
        { f: "What defines iron deficiency in symptomatic HFrEF?", b: "Ferritin <100 ng/mL, or ferritin 100-299 ng/mL with transferrin saturation <20%.", x: "Inflammation can raise ferritin, so TSAT identifies functional iron deficiency in HF.", t: "Trap: requiring microcytosis or very low ferritin before treatment.", m: "HF iron rule: 100 alone, or 300 with TSAT <20.",
          tb: { h: ["Ferritin", "TSAT", "HF iron status"], r: [["<100", "Any", "Deficient"], ["100-299", "<20%", "Deficient"], ["≥300", "Any", "Not by HF rule"]] } },
        { f: "Preferred iron treatment for symptomatic HFrEF with iron deficiency?", b: "Intravenous iron replacement, commonly ferric carboxymaltose or ferric derisomaltose depending on formulary.", x: "IV iron bypasses impaired gut absorption and improves exercise capacity and symptoms.", t: "Trap: choosing oral iron because it works for uncomplicated IDA.", m: "Failing heart gets iron by vein." },
        { f: "Does HFrEF iron deficiency require anemia?", b: "No. Treat qualifying iron deficiency in symptomatic HFrEF even if anemia is mild or absent.", x: "Iron supports skeletal muscle and myocardial energetics beyond hemoglobin production.", t: "Trap: waiting until transfusion-level anemia appears.", m: "Iron is fuel, not just hemoglobin." }
      ]
    },
    {
      id: "cv-adhf-loop-diuresis",
      system: "CV",
      task: "NEXT",
      vignette: "A 68-year-old man with HFrEF presents with 5 days of orthopnea and leg swelling after eating salty foods. Blood pressure is 156/88 mm Hg, pulse is 96/min, oxygen saturation is 93% on room air, jugular venous pressure is 12 cm H2O, and bibasilar crackles are present. Creatinine is 1.3 mg/dL, potassium is 4.1 mEq/L, and chest radiograph shows pulmonary edema. He takes furosemide 40 mg orally daily at home.",
      leadIn: "Which of the following is the most appropriate initial management?",
      options: [
        "Start IV furosemide 40 mg twice daily",
        "Start IV dobutamine to improve renal perfusion",
        "Use IV nitroglycerin as the sole decongestive agent",
        "Begin oral metolazone without a loop diuretic"
      ],
      correct: 0,
      explanation: "Acute decompensated HF with preserved perfusion and congestion is treated with <strong>IV loop diuretics</strong>, usually at least the patient's total daily oral loop dose given intravenously and titrated to urine output and decongestion. Dobutamine is not indicated without shock or low-output hypoperfusion. IV nitrates can be an adjunct when blood pressure permits but do not replace natriuresis. Metolazone can augment a loop in resistant congestion; it is not the preferred sole initial agent.",
      flashcards: [
        { f: "Initial therapy for warm, wet acute decompensated HF?", b: "IV loop diuretics, often at least the home total daily oral dose converted to IV, then titrate to urine output and weight loss.", x: "Venous congestion drives dyspnea and renal dysfunction; prompt natriuresis relieves filling pressures.", t: "Trap: avoiding diuresis because creatinine is mildly elevated.", m: "Wet HF: loop it off." },
        { f: "When are thiazides used in acute decompensated HF?", b: "Add metolazone or IV chlorothiazide for inadequate response to adequate IV loop diuretics.", x: "Sequential nephron blockade overcomes distal sodium retention in diuretic resistance.", t: "Trap: starting thiazide alone for pulmonary edema.", m: "Thiazide is the booster, not the base." },
        { f: "What bedside findings identify congestion in HF?", b: "Elevated JVP, orthopnea, edema, crackles, S3, hepatomegaly, weight gain, and pulmonary edema on imaging.", x: "These signs reflect high cardiac filling pressures, the target of diuretic therapy.", t: "Trap: treating crackles from HF with IV fluids.", m: "JVP up means volume up." }
      ]
    },
    {
      id: "cv-brugada-syncope-icd",
      system: "CV",
      task: "RISK",
      vignette: "A 34-year-old man from Southeast Asia has abrupt syncope while seated at night, without prodrome or an orthostatic trigger, and recovers spontaneously. His brother died suddenly at age 29. ECG shows coved ST-segment elevation of 3 mm followed by T-wave inversion in V1-V2. Echocardiography is normal, potassium is 4.0 mEq/L, and troponin is undetectable.",
      leadIn: "Which of the following is the most appropriate management to reduce sudden death risk?",
      options: [
        "Ambulatory monitoring alone",
        "Implantable cardioverter-defibrillator",
        "Quinidine without an implanted defibrillator",
        "EP study before any protective therapy"
      ],
      correct: 1,
      explanation: "Spontaneous type 1 Brugada ECG pattern with probable arrhythmic syncope favors <strong>ICD placement</strong> to reduce sudden-death risk; the family history reinforces concern but is not an ICD indication by itself. Monitoring alone is inadequate. Quinidine may help recurrent arrhythmias or selected patients unable to receive an ICD, but it is not the preferred substitute here. An EP study is not required before protecting a symptomatic high-risk patient.",
      flashcards: [
        { f: "What ECG pattern defines type 1 Brugada?", b: "Coved ST elevation ≥2 mm followed by T-wave inversion in at least one of V1 or V2, including high right-precordial positions.", x: "Brugada is a channelopathy that predisposes to nocturnal VT/VF; pathogenic SCN5A variants explain only a subset of cases.", t: "Trap: A drug-provoked pattern without symptoms is not automatically an ICD indication.", m: "Brugada caves in right precordial leads." },
        { f: "Who with Brugada syndrome needs an ICD?", b: "Survivors of cardiac arrest or patients with spontaneous type 1 ECG plus arrhythmic syncope generally need ICD therapy.", x: "Symptoms identify a high-risk substrate for recurrent VF, and ICD is the proven sudden death prevention.", t: "Trap: using beta-blockers as definitive protection.", m: "Brugada + blackout = box." },
        { f: "What triggers should Brugada patients avoid?", b: "Fever, excess alcohol, cocaine, and sodium-channel-blocking drugs; treat fever promptly.", x: "Fever and sodium-channel blockade worsen the ion-channel defect and can unmask VF risk.", t: "Trap: ignoring fever as an arrhythmia trigger.", m: "Fever fuels Brugada." }
      ]
    },
    {
      id: "cv-myocarditis-exercise-restriction",
      system: "CV",
      task: "NEXT",
      vignette: "A 23-year-old competitive cyclist has chest pain and palpitations 1 week after a viral illness. ECG shows diffuse ST-T changes, troponin I is 1.8 ng/mL, coronary CT angiography is normal, and cardiac MRI shows myocardial edema with late gadolinium enhancement. LVEF is 45%, and telemetry shows occasional premature ventricular contractions. Symptoms improve with supportive care.",
      leadIn: "Which of the following is the most appropriate counseling before discharge?",
      options: [
        "Return to full competition now",
        "Start lifelong oral anticoagulation",
        "Restrict strenuous exercise for 3-6 months",
        "Schedule immediate multivessel coronary angioplasty"
      ],
      correct: 2,
      explanation: "Symptomatic myocarditis with reduced LVEF requires restriction from strenuous exercise, generally with <strong>reassessment after 3–6 months</strong>. Return requires recovered function, resolution of active inflammation, and no clinically relevant arrhythmia on ambulatory/exercise testing through shared decision-making. The 2025 sports statement permits earlier reassessment in selected cases with preserved LV function; that is not this patient's phenotype. Anticoagulation needs a separate indication such as AF or LV thrombus. Normal coronary imaging excludes a target for angioplasty.",
      flashcards: [
        { f: "What guides return to strenuous sport after myocarditis with reduced LV function?", b: "Restrict activity and reassess after at least 3 months, commonly 3–6, with recovered function, resolved inflammation, and no relevant arrhythmias.", x: "Selected preserved-function cases may be reassessed earlier under 2025 sports guidance; timing is individualized with specialist shared decision-making.", t: "Trap: Symptom resolution alone does not establish safe return, and persistent scar is not the same as active inflammation.", m: "Recover function, inflammation, and rhythm before return." },
        { f: "Which MRI findings support myocarditis?", b: "Myocardial edema plus nonischemic late gadolinium enhancement patterns, often subepicardial or mid-wall.", x: "MRI detects inflammation and scar outside a coronary artery distribution.", t: "Trap: diagnosing MI despite normal coronary anatomy and viral prodrome.", m: "Myocarditis MRI is nonischemic and inflamed." },
        { f: "When is anticoagulation used in myocarditis?", b: "For a separate indication such as documented LV thrombus, embolism, or AF with sufficient stroke risk.", x: "Inflammation or reduced EF in sinus rhythm without thrombus does not by itself justify routine anticoagulation.", t: "Trap: Do not anticoagulate every patient with troponin elevation or low EF.", m: "Troponin is not a clot indication." }
      ]
    },
    {
      id: "endo-insulinoma-sulfonylurea-screen",
      system: "ENDO",
      task: "TEST",
      vignette: "A 46-year-old woman has recurrent confusion and diaphoresis before breakfast that resolves after juice. During a supervised fast, plasma glucose is 42 mg/dL, insulin is 18 µU/mL, C-peptide is 4.2 ng/mL, and beta-hydroxybutyrate is suppressed. She has no history of diabetes and takes only lisinopril. CT abdomen is normal.",
      leadIn: "Which of the following is the most appropriate next diagnostic test?",
      options: [
        "Pancreatic MRI for localization",
        "Endoscopic pancreatic ultrasound",
        "Selective arterial calcium stimulation",
        "Plasma sulfonylurea/meglitinide screen"
      ],
      correct: 3,
      explanation: "Whipple triad with hypoglycemia and inappropriately high insulin and C-peptide indicates endogenous insulin secretion. Obtain a <strong>sulfonylurea/meglitinide screen from the hypoglycemic sample</strong> before diagnosing insulinoma. Secretagogues reproduce the insulinoma biochemical pattern. MRI, endoscopic ultrasound, and selective arterial calcium stimulation are localization tests used after biochemical diagnosis and exclusion of drug exposure; a negative CT does not justify skipping that exclusion.",
      flashcards: [
        { f: "What lab pattern shows endogenous hyperinsulinemic hypoglycemia?", b: "Low plasma glucose with high insulin, high C-peptide, high proinsulin, and suppressed beta-hydroxybutyrate.", x: "Insulin blocks ketogenesis and comes with C-peptide when produced by pancreatic beta cells.", t: "Trap: diagnosing insulinoma before excluding sulfonylurea use.", m: "High insulin + high C-peptide = inside source." },
        { f: "How do secretagogue exposure and insulinoma differ biochemically?", b: "Both raise insulin and C-peptide; a sulfonylurea/meglitinide assay on the hypoglycemic sample detects drug exposure.", x: "These drugs force beta cells to secrete insulin, mimicking insulinoma; assay coverage and timing affect sensitivity.", t: "Trap: High C-peptide alone does not prove insulinoma, and a late negative drug assay may miss exposure.", m: "Secretagogue screen before insulinoma localization." },
        { f: "What triad is required before evaluating hypoglycemia?", b: "Whipple triad: symptoms, low plasma glucose during symptoms, and relief when glucose rises.", x: "It prevents overtesting patients with nonspecific symptoms and normal glucose.", t: "Trap: working up dizziness without documented low glucose.", m: "Symptoms + sugar low + sugar helps." }
      ]
    },
    {
      id: "endo-painless-thyroiditis-uptake",
      system: "ENDO",
      task: "DX",
      vignette: "A 36-year-old woman has 6 weeks of palpitations, heat intolerance, and mild weight loss 4 months after delivery. She is not breastfeeding, and pregnancy testing is negative. The thyroid is small and nontender without bruit, pulse is 104/min, TSH is 0.01 µU/mL, free T4 is 2.3 ng/dL, and erythrocyte sedimentation rate is normal. She takes no thyroid hormone, amiodarone, or iodine-containing supplements and has had no recent iodinated contrast. TSH-receptor antibodies are negative, and radioiodine uptake is 1% at 24 hours.",
      leadIn: "Which of the following best explains this patient's thyrotoxicosis?",
      options: [
        "Painless postpartum thyroiditis",
        "Postpartum-onset Graves disease",
        "Painful subacute granulomatous thyroiditis",
        "Exogenous thyroid hormone use"
      ],
      correct: 0,
      explanation: "Early postpartum, nontender thyrotoxicosis with <strong>very low radioiodine uptake</strong> and negative TSH-receptor antibodies favors <strong>painless postpartum thyroiditis</strong>: release of stored hormone rather than increased synthesis. Graves disease usually has positive receptor antibodies and diffusely increased uptake. Painful subacute thyroiditis generally produces thyroid tenderness and elevated inflammatory markers. Exogenous hormone also suppresses uptake but is not supported by this medication history; thyroglobulin can help if that distinction remains uncertain. Recent iodine exposure can also suppress uptake and has been excluded. Uptake testing is unsuitable during pregnancy and generally avoided during lactation; this patient is neither pregnant nor breastfeeding.",
      flashcards: [
        { f: "What radioiodine uptake pattern suggests thyroiditis?", b: "Low uptake during thyrotoxicosis because hormone leaks from damaged follicles rather than being newly synthesized.", x: "Exogenous hormone and recent iodine exposure can also lower uptake; clinical context, receptor antibodies, and sometimes thyroglobulin distinguish causes.", t: "Trap: Low uptake is not specific; do not perform radioiodine testing during pregnancy or routinely during lactation.", m: "Thyroiditis leaks, so uptake is low.",
          tb: { h: ["Cause", "RAIU", "Diagnostic context"], r: [["Painless thyroiditis", "Low", "Nontender; TRAb usually negative"], ["Graves disease", "High diffuse", "TRAb usually positive"], ["Toxic nodules", "Patchy high", "Nodular thyroid"], ["Exogenous hormone", "Low", "Low thyroglobulin if interpretable"]] } },
        { f: "How is symptomatic painless thyroiditis treated?", b: "Beta-blocker for adrenergic symptoms; monitor for a hypothyroid phase and recovery.", x: "The thyrotoxic phase is self-limited as stored hormone is depleted; thionamides do not block this destructive release.", t: "Trap: Methimazole or radioiodine ablation is not appropriate for routine painless thyroiditis.", m: "Low uptake = calm symptoms, not kill thyroid." },
        { f: "What postpartum timing fits painless thyroiditis?", b: "Within 1 year after delivery, commonly with an early thyrotoxic phase followed by hypothyroidism; either phase may occur alone.", x: "Autoimmune thyroid inflammation can flare after pregnancy. Some patients develop permanent hypothyroidism and need longer-term TSH monitoring.", t: "Trap: Timing supports but does not prove the diagnosis; postpartum Graves disease also occurs.", m: "Postpartum thyroid can swing both ways." }
      ]
    },
    {
      id: "endo-graves-pregnancy-ptu",
      system: "ENDO",
      task: "RX",
      vignette: "A 29-year-old woman at 8 weeks' gestation has tremor, palpitations, and weight loss. She has diffuse goiter and mild lid retraction. TSH is undetectable, free T4 is 3.1 ng/dL, and TSH receptor antibody is positive. Liver aminotransferases are normal.",
      leadIn: "Which of the following is the most appropriate therapy now?",
      options: [
        "Radioactive iodine ablation",
        "Propylthiouracil in the first trimester",
        "Methimazole throughout pregnancy",
        "Propranolol monotherapy until term delivery"
      ],
      correct: 1,
      explanation: "Overt Graves hyperthyroidism in the first trimester should be treated with <strong>propylthiouracil</strong> because methimazole is associated with embryopathy during organogenesis; many patients switch to methimazole after the first trimester to reduce PTU hepatotoxicity. Radioactive iodine is contraindicated in pregnancy. Beta-blockers may be used briefly for symptoms but do not control hormone synthesis. Untreated overt hyperthyroidism increases miscarriage, preeclampsia, and fetal growth risks.",
      flashcards: [
        { f: "Which antithyroid drug is preferred in 1st-trimester Graves disease?", b: "Propylthiouracil during the first trimester; consider switching to methimazole after organogenesis.", x: "PTU avoids methimazole embryopathy early, while methimazole avoids PTU liver risk later.", t: "Trap: using radioactive iodine during pregnancy.", m: "PTU for trimester one." },
        { f: "Why treat overt Graves disease in pregnancy?", b: "It lowers risk of miscarriage, preeclampsia, heart failure, prematurity, fetal growth restriction, and fetal thyroid dysfunction.", x: "Excess maternal thyroid hormone and TRAb affect both maternal physiology and fetal thyroid tissue.", t: "Trap: dismissing hyperthyroidism as normal pregnancy symptoms.", m: "Overt Graves threatens two patients." },
        { f: "What thyroid target is used when treating Graves in pregnancy?", b: "Use the lowest antithyroid dose keeping maternal free T4 at or just above the pregnancy-specific upper limit.", x: "Overtreatment can cause fetal hypothyroidism and goiter because antithyroid drugs cross the placenta.", t: "Trap: normalizing TSH quickly with high doses.", m: "Treat mom lightly to protect fetal thyroid." }
      ]
    },
    {
      id: "endo-prolactinoma-cabergoline",
      system: "ENDO",
      task: "RX",
      vignette: "A 31-year-old woman has 9 months of amenorrhea, infertility, and galactorrhea. Pregnancy test is negative, TSH is normal, and prolactin is 168 ng/mL. Pituitary MRI shows a 7-mm pituitary adenoma without optic chiasm compression. Visual fields are normal.",
      leadIn: "Which of the following is the most appropriate initial treatment?",
      options: [
        "Transsphenoidal surgery",
        "Pituitary radiation",
        "Cabergoline therapy",
        "Estrogen-progestin therapy"
      ],
      correct: 2,
      explanation: "Symptomatic microprolactinoma is treated initially with a dopamine agonist; <strong>cabergoline</strong> is preferred because it is effective and better tolerated than bromocriptine. Surgery is reserved for medication intolerance, resistance, apoplexy with visual compromise, or selected compressive tumors. Radiation is rarely used for refractory aggressive disease. Estrogen-progestin therapy may provide contraception or estrogen replacement but does not treat infertility or shrink the adenoma.",
      flashcards: [
        { f: "First-line treatment for symptomatic prolactinoma?", b: "Dopamine agonist therapy, usually cabergoline, for microadenomas and most macroadenomas.", x: "Dopamine inhibits lactotrophs, lowering prolactin and often shrinking the tumor.", t: "Trap: sending uncomplicated microprolactinoma straight to surgery.", m: "Cabergoline calms lactotrophs." },
        { f: "What prolactin level often suggests prolactinoma over stalk effect?", b: "Marked elevation, often >100-200 ng/mL, supports prolactinoma; stalk effect is usually more modest.", x: "Loss of dopamine inhibition raises prolactin mildly, while adenomas secrete prolactin autonomously.", t: "Trap: ignoring medications and hypothyroidism before MRI.", m: "Very high prolactin points to producer." },
        { f: "When is surgery used for prolactinoma?", b: "Medication resistance or intolerance, apoplexy with visual compromise, CSF leak, or selected compressive tumors.", x: "Dopamine agonists are highly effective, so invasive therapy is second-line in most cases.", t: "Trap: radiation as initial therapy.", m: "Pills before pituitary surgery." }
      ]
    },
    {
      id: "endo-atypical-femur-bisphosphonate",
      system: "ENDO",
      task: "NEXT",
      vignette: "A 67-year-old woman has 2 months of dull right thigh pain. She has taken alendronate weekly for 8 years after a vertebral compression fracture. Radiograph shows lateral cortical thickening and a transverse lucent line in the subtrochanteric femur. Calcium is 9.4 mg/dL, 25-hydroxyvitamin D is 31 ng/mL, and creatinine is 0.9 mg/dL.",
      leadIn: "Which of the following is the most appropriate next step?",
      options: [
        "Replace alendronate with denosumab",
        "Start teriparatide without further femoral imaging",
        "Continue alendronate with protected weight-bearing",
        "Stop alendronate and image both femurs"
      ],
      correct: 3,
      explanation: "Prodromal thigh pain with subtrochanteric transverse lucency after long-term bisphosphonate use suggests an <strong>atypical femur fracture</strong>; stop alendronate and image both femurs because bilateral lesions are common. Urgent orthopedic assessment determines whether an incomplete symptomatic fracture needs prophylactic fixation. Continuing alendronate or switching immediately to denosumab perpetuates antiresorptive exposure. Teriparatide may be considered subsequently but does not replace defining fracture extent and orthopedic management.",
      flashcards: [
        { f: "What symptoms suggest atypical femur fracture on bisphosphonates?", b: "Weeks to months of groin or thigh pain with lateral cortical thickening or transverse subtrochanteric or shaft fracture line.", x: "Long-term remodeling suppression can permit microdamage accumulation in high-stress femoral cortex.", t: "Trap: treating prodromal thigh pain as osteoarthritis only.", m: "Thigh pain on long bisphosphonate = image femurs." },
        { f: "Initial step when atypical femur fracture is suspected?", b: "Stop antiresorptive therapy, image both femurs, correct calcium and vitamin D, and refer to orthopedics.", x: "Bilateral stress reactions are common, and incomplete high-risk lesions may need prophylactic fixation.", t: "Trap: continuing the bisphosphonate because osteoporosis persists.", m: "Stop drug, scan both legs." },
        { f: "When can a bisphosphonate holiday be considered?", b: "After about 5 years oral or 3 years IV therapy in low-to-moderate-risk patients; continue if fracture risk remains high.", x: "Residual skeletal binding allows ongoing benefit while reducing rare adverse event risk in selected patients.", t: "Trap: drug holiday after recent vertebral fracture without reassessing risk.", m: "5 oral, 3 IV, then risk-review." }
      ]
    },
    {
      id: "endo-hhs-fluid-insulin",
      system: "ENDO",
      task: "RX",
      vignette: "A 72-year-old man with type 2 diabetes is brought in with confusion after several days of polyuria and poor oral intake. Blood pressure is 92/58 mm Hg, pulse is 118/min, mucous membranes are dry, glucose is 920 mg/dL, sodium is 150 mEq/L, potassium is 4.6 mEq/L, bicarbonate is 22 mEq/L, beta-hydroxybutyrate is 0.8 mmol/L, and calculated effective osmolality is 351 mOsm/kg. Urinalysis shows no infection.",
      leadIn: "Which of the following is the most appropriate initial treatment?",
      options: [
        "IV isotonic crystalloid resuscitation",
        "Subcutaneous rapid-acting insulin every hour",
        "IV insulin before any fluids",
        "IV sodium bicarbonate infusion"
      ],
      correct: 0,
      explanation: "Hyperosmolar hyperglycemic state causes profound volume depletion; initial therapy is <strong>IV isotonic crystalloid resuscitation</strong>, with insulin started after fluids and potassium assessment unless significant ketosis is present. Subcutaneous insulin is inadequate for severe HHS with altered mentation. Starting insulin before fluids can rapidly lower osmolality and worsen circulatory collapse. Bicarbonate is not indicated with bicarbonate 22 mEq/L and no severe acidosis.",
      flashcards: [
        { f: "What is the first treatment priority in HHS?", b: "Restore intravascular volume with IV isotonic crystalloid before routine insulin infusion.", x: "HHS has larger water deficits than DKA; fluids alone lower glucose and improve perfusion.", t: "Trap: starting insulin before correcting hypovolemia.", m: "HHS = Hydrate Hard Soon." },
        { f: "How does HHS differ from DKA under 2024 consensus criteria?", b: "HHS requires glucose ≥600, effective osmolality >300 or total >320, beta-hydroxybutyrate <3, pH ≥7.3, and bicarbonate ≥15.", x: "Residual insulin limits lipolysis and ketogenesis; significant ketosis or acidosis suggests mixed DKA/HHS.", t: "Trap: HHS requires both absence-of-acidosis criteria, not just a normal bicarbonate or normal pH alone.", m: "HHS: Hyperosmolar, Hardly ketotic." },
        { f: "Why monitor sodium and osmolality during HHS treatment?", b: "Target osmolality decline of 3–8 mOsm/kg/hour and sodium decline ≤10 mEq/L per 24 hours; tailor fluids to hemodynamics.", x: "Rapid osmotic shifts can cause neurologic injury. Sodium may initially rise as glucose falls; that alone does not mandate hypotonic fluids.", t: "Trap: Chasing glucose down quickly or switching fluids solely because sodium rises can create unsafe osmotic shifts.", m: "In HHS, lower osmolality steadily after volume." }
      ]
    },
    {
      id: "endo-siadh-vs-cerebral-salt-wasting",
      system: "ENDO",
      task: "DX",
      vignette: "A 48-year-old woman in the neuro ICU 5 days after subarachnoid hemorrhage develops worsening hyponatremia. Blood pressure is 92/56 mm Hg, pulse is 112/min, mucous membranes are dry, and urine output is 4 L/day. Serum sodium is 124 mEq/L, serum osmolality is 260 mOsm/kg, urine osmolality is 520 mOsm/kg, and urine sodium is 95 mEq/L. BUN is 32 mg/dL, creatinine is 0.9 mg/dL, and morning cortisol is 28 µg/dL. She has received no diuretics.",
      leadIn: "Which of the following is the most likely diagnosis?",
      options: [
        "Primary polydipsia",
        "Cerebral salt wasting",
        "Adrenal insufficiency",
        "Syndrome of inappropriate ADH"
      ],
      correct: 1,
      explanation: "Hyponatremia after intracranial disease with high urine sodium, concentrated urine, polyuria, and objective volume depletion favors <strong>cerebral salt wasting</strong>. SIADH has similar urine findings but is clinically euvolemic; volume assessment can be difficult and serial fluid balance is important. Primary polydipsia usually produces dilute urine. The reassuring cortisol and absence of diuretics reduce competing causes. Secondary adrenal insufficiency can mimic SIADH without hyperkalemia, so potassium alone cannot exclude it.",
      flashcards: [
        { f: "Key distinction between SIADH and cerebral salt wasting?", b: "Volume status: SIADH is euvolemic; cerebral salt wasting is hypovolemic with renal sodium loss and polyuria.", x: "Both can have high urine sodium and osmolality, so bedside volume assessment drives treatment.", t: "Trap: diagnosing SIADH from urine sodium alone.", m: "CSW is salty and dry." },
        { f: "How is cerebral salt wasting treated?", b: "Volume and sodium repletion with isotonic or hypertonic saline; fludrocortisone can reduce natriuresis in persistent cases.", x: "Fluid restriction worsens hypovolemia and may reduce cerebral perfusion after brain injury.", t: "Trap: fluid restriction after subarachnoid hemorrhage hyponatremia.", m: "Salt wasting needs salt replacing." },
        { f: "What urine osmolality is expected in primary polydipsia?", b: "Low urine osmolality, often <100 mOsm/kg, due to maximally suppressed ADH.", x: "Excess water intake should shut off ADH, allowing dilute urine unless another process is present.", t: "Trap: blaming polydipsia when urine is concentrated.", m: "Polydipsia pees pure water." }
      ]
    },
    {
      id: "gi-barrett-surveillance-nondysplastic",
      system: "GI",
      task: "NEXT",
      vignette: "A 59-year-old man with chronic gastroesophageal reflux undergoes endoscopy for dyspepsia despite proton pump inhibitor therapy. The gastroesophageal junction has 2 cm of salmon-colored mucosa, and biopsies show intestinal metaplasia without dysplasia. He has no weight loss, dysphagia, or anemia. His creatinine is 0.9 mg/dL and hemoglobin is 14.2 g/dL.",
      leadIn: "Which of the following is the most appropriate next step in management?",
      options: [
        "Endoscopic radiofrequency ablation therapy now",
        "Repeat endoscopy in 12 months",
        "Surveillance endoscopy every 5 years",
        "Esophagectomy for cancer prevention"
      ],
      correct: 2,
      explanation: "<strong>Short-segment nondysplastic Barrett esophagus</strong> is managed with acid suppression and surveillance endoscopy every 5 years; segments 3 cm or longer are generally surveyed every 3 years. Ablation is reserved for confirmed low-grade or high-grade dysplasia, not intestinal metaplasia alone. A 12-month interval is too frequent after adequate sampling without dysplasia. Esophagectomy is inappropriate without invasive cancer or selected unresectable high-grade lesions.",
      flashcards: [
        { f: "What is the surveillance interval for nondysplastic Barrett esophagus?", b: "EGD every 5 years for nondysplastic Barrett <3 cm; every 3 years for segments ≥3 cm.", x: "Cancer risk is low without dysplasia, so surveillance is spaced rather than annual or ablative.", t: "Trap: Ablation now; ablation is for confirmed dysplasia, not nondysplastic Barrett.", m: "Short segment 5; long segment 3.",
          tb: { h: ["Barrett finding", "Surveillance"], r: [["Nondysplastic <3 cm", "Every 5 years"], ["Nondysplastic ≥3 cm", "Every 3 years"], ["Confirmed dysplasia", "Eradication therapy"]] } },
        { f: "Which Barrett finding usually triggers endoscopic eradication therapy?", b: "Confirmed low-grade or high-grade dysplasia, especially if persistent after expert pathology review.", x: "Dysplasia marks higher progression risk and justifies ablation or endoscopic resection of visible lesions.", t: "Trap: Intestinal metaplasia alone; it needs surveillance, not eradication.", m: "Dysplasia destroys; metaplasia monitors." },
        { f: "What sampling method is used during Barrett surveillance?", b: "Seattle protocol: 4-quadrant biopsies every 1 to 2 cm plus targeted biopsies of visible lesions.", x: "Systematic biopsies reduce missed dysplasia in patchy metaplastic mucosa.", t: "Trap: Random gastric biopsies; Barrett surveillance targets the esophageal segment.", m: "Seattle samples squares." }
      ]
    },
    {
      id: "gi-eosinophilic-esophagitis-biopsy",
      system: "GI",
      task: "TEST",
      vignette: "A 27-year-old man has 2 years of intermittent solid-food dysphagia and two episodes of meat impaction. He has asthma and seasonal allergic rhinitis. Endoscopy shows concentric rings and linear furrows in the mid and distal esophagus. His hemoglobin is 15.0 g/dL and eosinophil count is 420/µL.",
      leadIn: "Which of the following is the most appropriate diagnostic step?",
      options: [
        "Barium swallow with tablet challenge",
        "Ambulatory esophageal pH monitoring study",
        "Serum food-specific IgE panel",
        "Esophageal biopsies from multiple levels"
      ],
      correct: 3,
      explanation: "<strong>Eosinophilic esophagitis</strong> requires symptoms of esophageal dysfunction and ≥15 eosinophils per high-power field on biopsy after other causes are evaluated. ACG 2025 recommends <strong>at least 6 biopsies from at least 2 esophageal levels</strong>, targeting abnormalities when present, because disease is patchy. Barium swallow can show narrowing but does not provide histology. pH testing and food-specific IgE panels do not establish EoE or reliably guide an elimination diet.",
      flashcards: [
        { f: "What biopsy threshold supports eosinophilic esophagitis?", b: "≥15 eosinophils per high-power field in esophageal mucosa with compatible symptoms.", x: "Symptoms alone overlap with GERD and strictures; histology confirms mucosal eosinophilic inflammation.", t: "Trap: Peripheral eosinophilia; blood eosinophils are neither required nor diagnostic.", m: "EoE = Esophagus eos ≥15.",
          tb: { h: ["Finding", "Supports EoE"], r: [["Dysphagia or impaction", "Yes"], ["Eos ≥15 per hpf", "Yes"], ["Blood eosinophilia", "Not required"]] } },
        { f: "How should esophageal biopsies be sampled for suspected EoE?", b: "Obtain at least 6 biopsies from at least 2 levels, such as proximal/mid and distal esophagus.", x: "EoE is patchy; sample even if the mucosa appears normal and target visible abnormalities when present.", t: "Trap: A single biopsy or a normal-appearing endoscopy can miss EoE.", m: "Six samples, two levels." },
        { f: "Which endoscopic findings suggest EoE?", b: "Rings, furrows, white plaques or exudates, edema, strictures, and narrow-caliber esophagus.", x: "Chronic type 2 inflammation causes remodeling and fixed narrowing that leads to food impaction.", t: "Trap: Peptic ulcer crater; that suggests acid injury rather than EoE.", m: "Rings and furrows point to EoE." }
      ]
    },
    {
      id: "gi-achalasia-manometry-confirmation",
      system: "GI",
      task: "TEST",
      vignette: "A 46-year-old woman reports progressive dysphagia to solids and liquids with regurgitation of undigested food at night. She has lost 8 lb over 6 months. Upper endoscopy shows retained saliva but no mass or stricture. A barium esophagram shows a dilated esophagus with tapering at the gastroesophageal junction.",
      leadIn: "Which of the following is the most appropriate test to confirm the diagnosis?",
      options: [
        "High-resolution esophageal manometry",
        "Wireless esophageal pH monitoring study",
        "Gastric emptying scintigraphy",
        "CT angiography of the chest"
      ],
      correct: 0,
      explanation: "<strong>High-resolution manometry</strong> confirms achalasia by showing impaired lower esophageal sphincter relaxation and absent or abnormal peristalsis. Endoscopy is needed first to exclude pseudoachalasia from malignancy, which has already been done. pH monitoring evaluates reflux and is not confirmatory for achalasia. Gastric emptying testing and CT angiography do not diagnose the esophageal motor pattern.",
      flashcards: [
        { f: "What is the confirmatory test for achalasia?", b: "High-resolution esophageal manometry showing impaired LES relaxation plus abnormal peristalsis.", x: "Achalasia is a motility disorder; manometry directly measures the physiologic defect.", t: "Trap: Barium swallow; bird-beak supports but does not confirm achalasia subtype.", m: "Achalasia answer = manometry measures motion.",
          tb: { h: ["Test", "Role"], r: [["Endoscopy", "Exclude cancer"], ["Barium swallow", "Suggests achalasia"], ["Manometry", "Confirms diagnosis"]] } },
        { f: "Which symptom pattern suggests achalasia over a mechanical stricture?", b: "Progressive dysphagia to both solids and liquids, often with regurgitation of undigested food.", x: "Liquid dysphagia from onset signals impaired motility rather than a narrowing that first blocks solids.", t: "Trap: Solids only; that pattern suggests ring, stricture, or cancer.", m: "Liquids plus solids = motor problem." },
        { f: "Why perform endoscopy before achalasia therapy?", b: "To exclude pseudoachalasia from cancer or a structural obstruction at the gastroesophageal junction.", x: "Treating presumed motility disease without excluding malignancy can delay cancer diagnosis.", t: "Trap: Skip endoscopy after bird-beak; imaging cannot reliably exclude cancer.", m: "Scope before you split the sphincter." }
      ]
    },
    {
      id: "gi-masld-fib4-risk-stratification",
      system: "GI",
      task: "RISK",
      vignette: "A 58-year-old man with type 2 diabetes and obesity is found to have hepatic steatosis on ultrasonography. He drinks 1 beer weekly and takes no hepatotoxic drugs. Laboratory studies show AST 82 U/L, ALT 70 U/L, platelet count 118,000/µL, albumin 4.0 g/dL, and total bilirubin 0.8 mg/dL. Viral hepatitis testing is negative.",
      leadIn: "Which of the following is the most appropriate next step in fibrosis assessment?",
      options: [
        "Repeat aminotransferases and platelet count in 1 year",
        "Transient elastography or hepatology referral",
        "Start ursodeoxycholic acid therapy",
        "Reassure that fibrosis risk is low"
      ],
      correct: 1,
      explanation: "This patient has MASLD with a high <strong>FIB-4</strong> score because of age, AST elevation, and thrombocytopenia; a value &gt;2.67 warrants secondary fibrosis assessment with elastography or referral. Repeating aminotransferases alone misses advanced fibrosis risk. Ursodeoxycholic acid is used for primary biliary cholangitis, not MASLD fibrosis staging. Reassurance is inappropriate when platelet count is low and FIB-4 is high.",
      flashcards: [
        { f: "What FIB-4 value in MASLD suggests high risk for advanced fibrosis?", b: "FIB-4 >2.67 generally warrants elastography or hepatology referral.", x: "FIB-4 uses age, AST, ALT, and platelets to identify patients needing secondary fibrosis testing.", t: "Trap: Normal bilirubin; advanced fibrosis can exist before bilirubin rises.", m: "FIB-4 over 2.67 = fibrosis second look.",
          tb: { h: ["FIB-4", "Action"], r: [["<1.3", "Primary care follow-up"], ["1.3-2.67", "Second test"], [">2.67", "Elastography or refer"]] } },
        { f: "What is the next fibrosis test after high FIB-4 in MASLD?", b: "Vibration-controlled transient elastography or enhanced liver fibrosis testing, often with hepatology referral.", x: "Noninvasive stiffness testing better estimates advanced fibrosis and guides surveillance needs.", t: "Trap: Liver biopsy first; biopsy is reserved for selected unclear or high-stakes cases.", m: "FIB-4 flags, elastography grades." },
        { f: "Which platelet finding raises concern in MASLD fibrosis scoring?", b: "Thrombocytopenia, especially platelets near or below 150,000/µL, increases FIB-4 and suggests portal fibrosis risk.", x: "Progressive fibrosis and portal hypertension can lower platelet count before decompensation.", t: "Trap: ALT alone; ALT can be mild or normal in advanced MASLD.", m: "Low platelets lift FIB-4." }
      ]
    },
    {
      id: "gi-hepatic-encephalopathy-lactulose",
      system: "GI",
      task: "RX",
      vignette: "A 63-year-old man with alcohol-associated cirrhosis is brought in for 1 day of confusion and sleepiness. He is afebrile, has asterixis, ascites, and no focal neurologic deficits. Sodium is 134 mEq/L, creatinine is 1.0 mg/dL, total bilirubin is 2.1 mg/dL, and ammonia is elevated. Diagnostic paracentesis shows 90 neutrophils/µL and cultures are pending.",
      leadIn: "Which of the following is the most appropriate initial treatment?",
      options: [
        "Rifaximin monotherapy",
        "Protein-free diet",
        "Lactulose titrated to 2 to 3 stools daily",
        "IV ceftriaxone for spontaneous bacterial peritonitis"
      ],
      correct: 2,
      explanation: "Overt hepatic encephalopathy is treated initially with <strong>lactulose</strong>, titrated to 2 to 3 soft bowel movements per day while searching for precipitants. Rifaximin is added for recurrence or inadequate response, not usually as initial monotherapy. Severe protein restriction worsens malnutrition and is not recommended. The ascitic neutrophil count is below 250/µL, so this tap does not diagnose spontaneous bacterial peritonitis.",
      flashcards: [
        { f: "What is first-line therapy for overt hepatic encephalopathy?", b: "Lactulose titrated to 2 to 3 soft stools per day.", x: "Lactulose acidifies the colon and reduces gut ammonia absorption through catharsis and bacterial effects.", t: "Trap: Rifaximin alone; reserve it mainly as add-on prevention after recurrence.", m: "Lactulose loosens to clear ammonia." },
        { f: "When is rifaximin added in hepatic encephalopathy?", b: "After recurrent episodes or inadequate control despite lactulose, commonly for secondary prevention.", x: "Rifaximin lowers ammonia-producing gut flora and reduces recurrence when layered on lactulose.", t: "Trap: Replace lactulose immediately; lactulose remains the backbone unless intolerant.", m: "Rifaximin reinforces lactulose." },
        { f: "What ascitic PMN count diagnoses spontaneous bacterial peritonitis?", b: "≥250 neutrophils/µL in ascitic fluid, even before culture results.", x: "Cirrhosis impairs peritoneal defenses, so neutrophilic ascites requires prompt antibiotics.", t: "Trap: Treat any confusion as SBP; paracentesis threshold is PMN ≥250/µL.", m: "SBP = 250 PMNs.",
          tb: { h: ["Ascitic PMN", "Interpretation"], r: [["<250 per µL", "SBP not diagnosed"], ["≥250 per µL", "Treat for SBP"], ["Positive culture only", "Assess symptoms and PMN"]] } }
      ]
    },
    {
      id: "gi-hepatorenal-syndrome-terlipressin",
      system: "GI",
      task: "RX",
      vignette: "A 55-year-old woman with decompensated cirrhosis and ascites is hospitalized for acute kidney injury. Diuretics are held and clinically indicated volume resuscitation is completed, but within 24 hours creatinine rises from 1.1 to 2.4 mg/dL. Urinalysis is bland, renal ultrasound is normal, and mean arterial pressure is 69 mm Hg. There is no shock, nephrotoxin exposure, or infection. Oxygen saturation is 96% on room air, with no pulmonary edema or active coronary, mesenteric, or peripheral ischemia.",
      leadIn: "Which of the following is the most appropriate treatment?",
      options: [
        "High-dose furosemide infusion",
        "IV sodium bicarbonate infusion",
        "Oral midodrine without albumin",
        "Terlipressin plus IV albumin"
      ],
      correct: 3,
      explanation: "HRS-AKI is treated with a vasoconstrictor and carefully titrated albumin; <strong>terlipressin plus IV albumin</strong> is preferred when appropriate. The 2024 ADQI-ICA criteria require cirrhosis with ascites, AKI without improvement within 24 hours of adequate resuscitation when indicated, and no strong alternative primary cause. A mandatory 48-hour albumin challenge is no longer required and may worsen fluid overload. Terlipressin is contraindicated with hypoxia or active coronary, peripheral, or mesenteric ischemia; monitor oxygenation and volume status. Norepinephrine in an ICU is an alternative. Furosemide escalation and midodrine alone are not appropriate here.",
      flashcards: [
        { f: "What therapy is preferred for hepatorenal syndrome-AKI when available?", b: "Terlipressin plus IV albumin, with monitoring for ischemia and respiratory failure.", x: "Terlipressin constricts splanchnic vessels, improving effective arterial volume and renal perfusion.", t: "Trap: Diuretic escalation; diuretics worsen underfilling in HRS-AKI.", m: "HRS: terli-press pressure back to kidneys." },
        { f: "What response assessment supports HRS-AKI under 2024 consensus criteria?", b: "No improvement within 24 hours of adequate volume resuscitation when indicated, in cirrhosis with ascites and no stronger primary AKI cause.", x: "Rapid volume assessment avoids delaying vasoconstrictors or giving unnecessary albumin to an already overloaded patient.", t: "Trap: A routine 48-hour albumin challenge is no longer a diagnostic requirement.", m: "Assess volume promptly; no automatic two-day wait.",
          tb: { h: ["AKI assessment", "Clue"], r: [["Volume-responsive AKI", "Improves after appropriate resuscitation"], ["HRS-AKI", "Persistent AKI without stronger cause"], ["Tubular injury", "Muddy brown casts support ATN"], ["Albumin", "Individualize; avoid overload"]] } },
        { f: "Which urine finding supports HRS-AKI?", b: "A bland sediment supports HRS, but proteinuria or preexisting CKD does not automatically exclude it.", x: "HRS is predominantly circulatory renal dysfunction and may coexist with tubular injury or chronic renal disease.", t: "Trap: Muddy brown casts suggest tubular injury, but mixed AKI mechanisms can coexist in cirrhosis.", m: "HRS is sick circulation, sometimes mixed injury." }
      ]
    },
    {
      id: "gi-primary-biliary-cholangitis-ursodiol",
      system: "GI",
      task: "RX",
      vignette: "A 52-year-old woman reports 8 months of fatigue and pruritus. Examination shows excoriations but no jaundice or abdominal tenderness. Alkaline phosphatase is 410 U/L, AST is 58 U/L, ALT is 64 U/L, total bilirubin is 0.9 mg/dL, and antimitochondrial antibody is positive. Ultrasound shows no biliary ductal dilation.",
      leadIn: "Which of the following is the most appropriate initial management?",
      options: [
        "Ursodeoxycholic acid therapy",
        "Endoscopic retrograde cholangiography",
        "Prednisone plus azathioprine",
        "Observation until bilirubin rises"
      ],
      correct: 0,
      explanation: "This patient has <strong>primary biliary cholangitis</strong>, a cholestatic autoimmune disease suggested by elevated alkaline phosphatase, positive antimitochondrial antibody, and no obstruction. First-line treatment is ursodeoxycholic acid. ERCP is used when primary sclerosing cholangitis or obstruction is suspected, especially with ductal abnormalities. Prednisone plus azathioprine treats autoimmune hepatitis, and waiting for hyperbilirubinemia delays disease-modifying therapy.",
      flashcards: [
        { f: "What antibody strongly supports primary biliary cholangitis?", b: "Antimitochondrial antibody in a patient with cholestatic alkaline phosphatase elevation.", x: "PBC targets small intrahepatic bile ducts, causing chronic cholestasis and pruritus.", t: "Trap: p-ANCA; it is more associated with PSC and ulcerative colitis.", m: "M in AMA = middle-aged mom with PBC." },
        { f: "What is first-line therapy for primary biliary cholangitis?", b: "Ursodeoxycholic acid for nearly all patients at diagnosis.", x: "Ursodiol improves cholestatic biochemistry and delays progression when started early.", t: "Trap: Wait for jaundice; normal bilirubin does not mean benign disease.", m: "PBC gets UDCA ASAP." },
        { f: "Which imaging finding argues against extrahepatic obstruction in cholestasis?", b: "No biliary ductal dilation on ultrasound.", x: "PBC is an intrahepatic small-duct disease, so ducts are usually not dilated.", t: "Trap: ERCP first; invasive duct imaging is not needed for classic AMA-positive PBC.", m: "PBC: positive antibody, plain ducts." }
      ]
    },
    {
      id: "id-necrotizing-fasciitis",
      system: "ID",
      task: "RX",
      vignette: "A 58-year-old man with diabetes presents with 18 hours of rapidly worsening left calf pain after a scrape. Temperature is 39.2°C, blood pressure is 88/54 mm Hg, and the calf is tense with violaceous bullae and tenderness extending beyond erythema. WBC count is 24,000/µL, sodium is 128 mEq/L, creatinine is 2.1 mg/dL, and lactate is 4.8 mmol/L. Plain radiograph shows soft-tissue gas.",
      leadIn: "Which of the following is the most appropriate immediate management?",
      options: [
        "Clindamycin alone after wound culture",
        "MRI before operative exploration today",
        "Vancomycin plus ceftriaxone and observation",
        "Urgent debridement plus broad antibiotics"
      ],
      correct: 3,
      explanation: "<strong>Necrotizing fasciitis</strong> requires immediate surgical exploration and debridement plus broad empiric therapy, such as vancomycin plus piperacillin-tazobactam plus clindamycin for toxin suppression. Imaging must not delay surgery when shock, bullae, pain out of proportion, and gas are present. Clindamycin alone is inadequate for polymicrobial and MRSA coverage. Vancomycin plus ceftriaxone lacks anaerobic and toxin-suppressing coverage.",
      flashcards: [
        { f: "Pain beyond erythema with bullae and shock after skin trauma suggests what emergency?", b: "Necrotizing fasciitis; do immediate surgical exploration/debridement plus broad antibiotics.", x: "Mortality rises when debridement is delayed; early tissue source control is lifesaving.", t: "Trap: MRI first delays operative source control in a toxic patient.", m: "Nec fasc = knife before nice pictures.",
          tb: { h: ["Clue", "Implication", "Action"], r: [["Bullae, shock", "Nec fasc likely", "Debride now"], ["Soft-tissue gas", "Deep infection", "Do not wait"], ["Simple erythema", "Cellulitis", "Antibiotics alone"]] } },
        { f: "What empiric antibiotic feature is added for suspected streptococcal toxic soft-tissue infection?", b: "Add clindamycin to suppress toxin production, with broad MRSA, gram-negative, and anaerobic coverage.", x: "Protein-synthesis inhibition reduces toxin production even when bacterial burden is high.", t: "Trap: beta-lactam monotherapy misses toxin suppression and MRSA.", m: "Clinda clamps toxins." },
        { f: "Which skin findings make cellulitis unlikely and necrotizing infection likely?", b: "Pain out of proportion, bullae, skin necrosis, crepitus, shock, hyponatremia, or rapidly spreading edema.", x: "Deep fascial necrosis causes severe pain and systemic toxicity before superficial changes are obvious.", t: "Trap: visible erythema size underestimates deep fascial spread.", m: "Bad pain + bullae = blade." }
      ]
    },
    {
      id: "id-diabetic-foot-osteomyelitis",
      system: "ID",
      task: "TEST",
      vignette: "A 64-year-old woman with poorly controlled type 2 diabetes has a plantar ulcer under the first metatarsal head for 5 weeks. The ulcer is 2.5 cm wide, bone is palpable with a sterile metal probe, and there is mild surrounding erythema without systemic toxicity. ESR is 82 mm/h and C-reactive protein is 9.4 mg/dL. Plain radiographs show cortical erosion of the metatarsal head.",
      leadIn: "Which of the following is the most appropriate test to guide definitive antimicrobial therapy?",
      options: [
        "Bone biopsy culture",
        "Superficial swab culture",
        "Serum procalcitonin level",
        "Tagged leukocyte scan"
      ],
      correct: 0,
      explanation: "<strong>Bone biopsy for culture</strong> is the preferred test to identify pathogens and guide targeted treatment of diabetic foot osteomyelitis when feasible. A positive probe-to-bone test, high ESR, and bony erosion make osteomyelitis likely. Superficial swabs reflect colonizers and should not guide definitive therapy. Procalcitonin and tagged leukocyte scans do not provide organism identification for treatment selection.",
      flashcards: [
        { f: "What test best guides definitive antibiotics for diabetic foot osteomyelitis?", b: "Bone biopsy for culture, ideally before or after holding antibiotics when clinically safe.", x: "Bone cultures identify true pathogens; surface wounds are colonized by noncausal organisms.", t: "Trap: superficial swab culture often grows colonizers, not bone pathogens.", m: "Bone bug? Culture bone." },
        { f: "Which bedside finding strongly supports diabetic foot osteomyelitis in a chronic ulcer?", b: "Positive probe-to-bone test, especially with ulcer &gt;2 cm, ESR &gt;70 mm/h, or bony changes on x-ray.", x: "Exposed or palpable bone connects a chronic ulcer to infected cortex.", t: "Trap: normal skin temperature does not exclude bone infection.", m: "Probe bone + ESR 70 = osteo clue." },
        { f: "When is MRI useful in a diabetic foot ulcer?", b: "When diagnosis remains uncertain after exam, labs, and radiographs; MRI defines extent and abscess.", x: "MRI is sensitive for marrow edema but does not replace culture for microbiology.", t: "Trap: MRI cannot identify the antibiotic susceptibility pattern.", m: "MRI maps; biopsy names.",
          tb: { h: ["Test", "Best use", "Limit"], r: [["X-ray", "Bony changes", "Insensitive early"], ["MRI", "Maps extent", "No susceptibilities"], ["Bone culture", "Names pathogen", "Invasive"]] } }
      ]
    },
    {
      id: "id-hiv-art-iris-tb",
      system: "ID",
      task: "NEXT",
      vignette: "A 32-year-old man is newly diagnosed with HIV during evaluation for pulmonary tuberculosis. CD4 count is 38/µL, HIV RNA is 620,000 copies/mL, and sputum nucleic acid amplification is positive for Mycobacterium tuberculosis with no rifampin resistance detected. He has no headache, meningismus, or focal neurologic deficits. Standard rifampin-based tuberculosis therapy is started today.",
      leadIn: "Which of the following is the most appropriate next step for antiretroviral therapy?",
      options: [
        "Defer ART until tuberculosis therapy is completed",
        "Start ART within 2 weeks of TB therapy",
        "Start ART only if IRIS symptoms develop",
        "Delay ART for 8 weeks regardless of CD4 count"
      ],
      correct: 1,
      explanation: "In HIV-associated pulmonary tuberculosis with CD4 count &lt;50/µL, <strong>ART should begin within 2 weeks</strong> of starting TB therapy unless TB meningitis is present. Early ART reduces mortality despite increased IRIS risk. At CD4 ≥50, initiate within 2–8 weeks, not automatically at week 8. TB meningitis needs infection-specific delayed timing. Select an ART regimen compatible with rifampin, which substantially alters antiretroviral drug exposure.",
      flashcards: [
        { f: "When should ART start in pulmonary TB with HIV and CD4 &lt;50/µL?", b: "Within 2 weeks after starting TB therapy, unless TB meningitis is present.", x: "Mortality benefit from immune recovery outweighs increased IRIS risk in advanced immunosuppression.", t: "Trap: waiting 8 weeks is too slow when CD4 is &lt;50 without CNS TB.", m: "CD4 under 50: ART in 2.",
          tb: { h: ["TB setting", "ART timing", "Exception"], r: [["CD4 under 50", "Within 2 wk", "Not TB meningitis"], ["CD4 at least 50", "Within 2–8 wk", "Most cases"], ["TB meningitis", "After control; expert guided", "Avoid CNS IRIS"]] } },
        { f: "Which TB form is the key exception to very early ART because of dangerous inflammation?", b: "Tuberculous meningitis; ART is delayed because CNS IRIS can be life-threatening.", x: "Inflammation in a closed intracranial space can worsen neurologic injury.", t: "Trap: pulmonary TB alone is not a reason to wait months.", m: "Meninges make ART wait." },
        { f: "What is IRIS after ART initiation?", b: "Paradoxical worsening or unmasking of infection after immune recovery, often with low CD4 and high antigen burden.", x: "Restored immune responses cause inflammatory symptoms despite microbiologic treatment.", t: "Trap: IRIS is not automatic ART failure or drug resistance.", m: "IRIS = immunity rebounds, inflammation surges." }
      ]
    },
    {
      id: "id-pcp-steroids-hypoxemia",
      system: "ID",
      task: "RX",
      vignette: "A 41-year-old man with untreated HIV presents with fever, dry cough, and progressive dyspnea. CD4 count is 62/µL, chest CT shows bilateral diffuse ground-glass opacities, and induced sputum stains positive for Pneumocystis jirovecii. Room-air arterial blood gas shows pH 7.46, PaCO2 31 mm Hg, and PaO2 64 mm Hg. Serum creatinine is 0.9 mg/dL.",
      leadIn: "In addition to trimethoprim-sulfamethoxazole, which of the following is the most appropriate therapy?",
      options: [
        "Azithromycin",
        "Fluconazole",
        "Prednisone",
        "Valganciclovir"
      ],
      correct: 2,
      explanation: "Moderate to severe <strong>Pneumocystis pneumonia</strong> requires adjunctive glucocorticoids when PaO2 is &lt;70 mm Hg on room air or the alveolar-arterial gradient is ≥35 mm Hg. Prednisone should be started as soon as possible, ideally within 72 hours of antimicrobial therapy. Azithromycin treats atypical bacterial pathogens, not PCP inflammation. Fluconazole and valganciclovir treat fungal mucosal disease and CMV, respectively, and do not improve PCP hypoxemia.",
      flashcards: [
        { f: "When are steroids indicated for Pneumocystis pneumonia?", b: "PaO2 &lt;70 mm Hg on room air or A-a gradient ≥35 mm Hg; start within 72 hours of PCP therapy.", x: "Steroids blunt inflammatory lung injury that worsens after organisms begin dying.", t: "Trap: CD4 count alone does not determine steroid use.", m: "PCP steroid: 70 or 35.",
          tb: { h: ["Measure", "Steroid cutoff"], r: [["PaO2 room air", "Under 70 mm Hg"], ["A-a gradient", "At least 35 mm Hg"], ["Timing", "Within 72 hr"]] } },
        { f: "First-line treatment for Pneumocystis jirovecii pneumonia is what?", b: "Trimethoprim-sulfamethoxazole for 21 days; add steroids if hypoxemic by PaO2/A-a criteria.", x: "TMP-SMX has the best evidence for efficacy against Pneumocystis.", t: "Trap: azithromycin is for MAC prophylaxis or atypical CAP, not PCP.", m: "PCP = TMP-SMX 21." },
        { f: "Which imaging pattern is classic for PCP in advanced HIV?", b: "Bilateral diffuse ground-glass opacities with dry cough, fever, dyspnea, and elevated LDH often present.", x: "Alveolar filling by organisms and proteinaceous material impairs gas exchange.", t: "Trap: lobar consolidation points more to bacterial pneumonia.", m: "PCP paints glass." }
      ]
    },
    {
      id: "id-influenza-antiviral-hospitalized",
      system: "ID",
      task: "RX",
      vignette: "A 72-year-old man with COPD and chronic kidney disease is admitted in January with 4 days of fever, myalgias, cough, and worsening dyspnea. Oxygen saturation is 88% on room air, chest radiograph shows no focal infiltrate, and nasopharyngeal PCR is positive for influenza A. Serum creatinine is 1.8 mg/dL. He did not receive an influenza vaccine this season.",
      leadIn: "Which of the following is the most appropriate antiviral management?",
      options: [
        "No antiviral therapy because symptoms exceed 48 hours",
        "Baloxavir as single-dose inpatient therapy",
        "Rimantadine adjusted for kidney function",
        "Oseltamivir adjusted for kidney function"
      ],
      correct: 3,
      explanation: "<strong>Oseltamivir</strong> is recommended for hospitalized, severe, progressive, or high-risk influenza even when symptoms began more than 48 hours earlier; dosing should be adjusted for renal function. The 48-hour cutoff applies mainly to otherwise healthy outpatients with uncomplicated illness. Baloxavir is not preferred for hospitalized severe influenza because outcome data are limited. Adamantanes such as rimantadine are not recommended because circulating influenza A resistance is high.",
      flashcards: [
        { f: "Should hospitalized influenza be treated if symptoms began more than 48 hours ago?", b: "Yes. Give oseltamivir for hospitalized, severe, progressive, or high-risk influenza regardless of duration.", x: "High-risk patients can still benefit from reduced progression and complications.", t: "Trap: the 48-hour rule is mainly for uncomplicated low-risk outpatients.", m: "Admitted flu? Oseltamivir through.",
          tb: { h: ["Patient", "Antiviral rule"], r: [["Hospitalized", "Treat any duration"], ["High risk", "Treat any duration"], ["Low-risk outpatient", "Best within 48 hr"]] } },
        { f: "Which influenza antivirals are avoided due to widespread resistance?", b: "Adamantanes such as amantadine and rimantadine are not recommended.", x: "Most circulating influenza A strains are resistant, making these drugs unreliable.", t: "Trap: rimantadine sounds renal-adjustable but resistance makes it wrong.", m: "Adamantanes are abandoned." },
        { f: "Which common influenza antiviral needs renal dose adjustment?", b: "Oseltamivir requires dose adjustment in reduced creatinine clearance.", x: "The active metabolite is renally cleared, so accumulation can occur in CKD.", t: "Trap: withholding therapy is wrong in hospitalized high-risk disease.", m: "O-seltamivir: O for old kidneys adjust." }
      ]
    },
    {
      id: "id-zoster-acute-retinal-necrosis",
      system: "ID",
      task: "RX",
      vignette: "A 67-year-old man with chronic lymphocytic leukemia develops 2 days of right eye pain, photophobia, floaters, and blurred vision. He had a painful vesicular rash on the right forehead and tip of the nose 1 week ago. Visual acuity is 20/100 in the right eye, and funduscopic examination shows peripheral retinal whitening with hemorrhagic vasculitis. Temperature is 37.4°C.",
      leadIn: "Which of the following is the most appropriate immediate treatment?",
      options: [
        "Intravenous acyclovir",
        "Oral valacyclovir alone",
        "Recombinant zoster vaccine",
        "Topical erythromycin ointment"
      ],
      correct: 0,
      explanation: "Herpes zoster ophthalmicus with <strong>acute retinal necrosis</strong> is a sight-threatening emergency requiring immediate high-dose IV acyclovir and urgent ophthalmology involvement, often with intravitreal antiviral therapy. Oral valacyclovir alone is reasonable for uncomplicated zoster ophthalmicus but is inadequate for retinal necrosis in an immunocompromised host. Recombinant zoster vaccine prevents future zoster but does not treat active retinal disease. Topical antibiotics do not treat varicella-zoster virus.",
      flashcards: [
        { f: "Zoster with retinal necrosis in an immunocompromised patient needs what treatment?", b: "Immediate IV acyclovir and urgent ophthalmology, often with intravitreal antiviral therapy.", x: "Retinal viral vasculitis can rapidly progress to retinal detachment and blindness.", t: "Trap: Do not manage this immunocompromised ocular emergency with routine uncomplicated-shingles oral dosing alone.", m: "Threatened retina in an immunocompromised host: urgent IV therapy." },
        { f: "What does Hutchinson sign predict in herpes zoster?", b: "Vesicles on the nose tip suggest nasociliary involvement and higher ocular complication risk.", x: "The nasociliary branch supplies cornea and ocular structures.", t: "Trap: absence of nose lesions does not rule out eye involvement.", m: "Nose tip warns eye trip." },
        { f: "When is recombinant zoster vaccine used after shingles?", b: "For prevention after acute illness resolves; it is not treatment for active zoster or ocular emergencies.", x: "Vaccination boosts future immunity but does not stop current viral replication.", t: "Trap: giving vaccine instead of antivirals risks vision loss.", m: "Vaccine prevents, acyclovir treats." }
      ]
    },
    {
      id: "pulm-hypoventilation-normal-aa-gradient",
      system: "PULM",
      task: "PATHO",
      vignette: "A 34-year-old man is evaluated after being found somnolent with pinpoint pupils. On room air, arterial blood gas shows pH 7.25, PaCO2 68 mm Hg, and PaO2 62 mm Hg. Chest radiograph is clear, and oxygen saturation improves rapidly with supplemental oxygen and naloxone. The calculated A-a gradient is normal for age.",
      leadIn: "Which of the following best explains the hypoxemia?",
      options: [
        "Right-to-left intracardiac shunt",
        "Alveolar hypoventilation from opioid toxicity",
        "Diffusion impairment from interstitial disease",
        "Ventilation-perfusion mismatch from embolism"
      ],
      correct: 1,
      explanation: "A normal A-a gradient with hypoxemia and hypercapnia indicates <strong>alveolar hypoventilation</strong>, here due to opioid respiratory depression. Shunt, diffusion limitation, and pulmonary embolism usually widen the A-a gradient because alveolar oxygen is relatively preserved while arterial oxygen falls. The clear radiograph and rapid response to naloxone further support hypoventilation. Supplemental oxygen corrects hypoxemia, but ventilation must be restored to clear CO2.",
      flashcards: [
        { f: "What does hypoxemia with a normal A-a gradient usually indicate?", b: "Alveolar hypoventilation or low inspired oxygen, not primary gas-exchange failure.", x: "When alveolar oxygen is low, arterial oxygen falls in parallel, so the gradient stays normal.", t: "Trap: Pulmonary embolism; PE typically increases the A-a gradient.", m: "Normal gradient = not a membrane gap." },
        { f: "What ABG pattern is typical of opioid hypoventilation?", b: "Respiratory acidosis with high PaCO2 and low PaO2, often with a normal A-a gradient.", x: "Opioids suppress respiratory drive, reducing alveolar ventilation and retaining CO2.", t: "Trap: Diffusion defect; that lowers O2 but usually does not cause marked CO2 retention early.", m: "Opioids: CO2 climbs, O2 drops." },
        { f: "Which hypoxemia mechanisms widen the A-a gradient?", b: "V/Q mismatch, shunt, and diffusion limitation widen the A-a gradient.", x: "These mechanisms impair transfer from alveoli to arterial blood despite relatively adequate alveolar oxygen.", t: "Trap: Pure hypoventilation; alveolar and arterial O2 fall together.", m: "Bad exchange makes a big gradient.",
          tb: { h: ["Mechanism", "A-a gradient"], r: [["Hypoventilation", "Normal"], ["Low inspired O2", "Normal"], ["V/Q mismatch", "High"], ["Shunt", "High"]] } }
      ]
    },
    {
      id: "pulm-pft-restriction-low-dlco",
      system: "PULM",
      task: "DX",
      vignette: "A 61-year-old woman has 1 year of progressive exertional dyspnea and dry cough. Examination reveals bibasilar inspiratory crackles and oxygen saturation of 91% with ambulation. Pulmonary function tests show FEV1/FVC 0.86, total lung capacity 61% predicted, and DLCO 42% predicted. Chest radiograph shows reticular basilar opacities.",
      leadIn: "Which of the following best characterizes this pulmonary function pattern?",
      options: [
        "Obstructive disease with air trapping",
        "Restriction from obesity with normal diffusion capacity",
        "Parenchymal restriction with impaired diffusion",
        "Upper airway obstruction with fixed flattening"
      ],
      correct: 2,
      explanation: "Low total lung capacity with preserved or high FEV1/FVC indicates <strong>restriction</strong>, and a reduced DLCO suggests parenchymal lung disease such as interstitial lung disease. Obstructive disease has a reduced FEV1/FVC ratio and often air trapping. Obesity can cause restriction but usually has a normal DLCO when the alveolar-capillary membrane is intact. Fixed upper airway obstruction produces flattened inspiratory and expiratory flow-volume loops rather than low TLC with low DLCO.",
      flashcards: [
        { f: "What PFT values define a restrictive ventilatory defect?", b: "Reduced TLC with normal or high FEV1/FVC; spirometry alone cannot confirm restriction.", x: "Restriction means reduced lung volume, so total lung capacity is the defining measurement.", t: "Trap: Low FVC alone; air trapping can lower FVC in obstruction.", m: "Restriction requires TLC reduction." },
        { f: "What does low DLCO add to a restrictive PFT pattern?", b: "It suggests parenchymal ILD or pulmonary vascular disease rather than obesity or chest wall restriction.", x: "DLCO falls when gas transfer surface or pulmonary capillary blood volume is impaired.", t: "Trap: Obesity restriction; DLCO is often normal or high in obesity.", m: "Low DLCO = damaged diffusion surface." },
        { f: "What spirometric ratio suggests obstruction?", b: "Reduced FEV1/FVC, classically below the lower limit of normal or post-bronchodilator below 0.70 for COPD.", x: "Obstruction slows exhalation disproportionately, lowering FEV1 more than FVC.", t: "Trap: High FEV1/FVC; that points away from obstruction.", m: "Obstruction drops the ratio." }
      ]
    },
    {
      id: "pulm-hypersensitivity-pneumonitis-antigen",
      system: "PULM",
      task: "NEXT",
      vignette: "A 44-year-old woman has cough, dyspnea, fever, and malaise that worsen several hours after cleaning her parakeet cages. Chest CT shows diffuse centrilobular ground-glass nodules and mosaic attenuation. Bronchoalveolar lavage shows lymphocytosis, and infectious testing is negative. Oxygen saturation is 94% on room air.",
      leadIn: "Which of the following is the most appropriate next step in management?",
      options: [
        "Long-term macrolide suppression therapy",
        "Empiric antifibrotic therapy",
        "Inhaled bronchodilator therapy",
        "Removal of the bird antigen exposure"
      ],
      correct: 3,
      explanation: "Hypersensitivity pneumonitis is an immune-mediated lung disease triggered by inhaled antigens; <strong>antigen avoidance</strong> is the key initial management. Glucocorticoids may be used for severe or persistent inflammatory disease but do not replace exposure removal. Macrolide suppression is used in selected bronchiectasis, not HP. Antifibrotics are reserved for progressive fibrotic phenotypes, and bronchodilators do not treat the immune trigger.",
      flashcards: [
        { f: "What is the cornerstone of hypersensitivity pneumonitis treatment?", b: "Identify and remove the offending inhaled antigen exposure.", x: "Ongoing antigen exposure perpetuates immune alveolitis and can lead to irreversible fibrosis.", t: "Trap: Steroids alone; symptoms often recur if exposure continues.", m: "HP improves when the antigen exits." },
        { f: "Which CT pattern supports nonfibrotic hypersensitivity pneumonitis?", b: "Centrilobular ground-glass nodules, mosaic attenuation, and air trapping.", x: "Small-airway and alveolar inflammation creates patchy ventilation and perfusion differences.", t: "Trap: Isolated upper-lobe cavitation; think infection or vasculitis instead.", m: "HP has mosaic from mixed air." },
        { f: "What BAL finding supports hypersensitivity pneumonitis?", b: "Lymphocytosis, often with compatible exposure and imaging.", x: "HP is driven by immune sensitization rather than neutrophilic bacterial infection.", t: "Trap: Positive serum precipitins alone; exposure tests support but do not prove disease.", m: "HP lavage likes lymphocytes." }
      ]
    },
    {
      id: "pulm-bronchiectasis-hrct-diagnosis",
      system: "PULM",
      task: "TEST",
      vignette: "A 67-year-old woman has years of daily productive cough with large volumes of purulent sputum and recurrent antibiotic-treated respiratory infections. She has coarse crackles at both lung bases and digital clubbing. Chest radiograph shows tram-track markings. Sputum culture grows Haemophilus influenzae.",
      leadIn: "Which of the following is the most appropriate diagnostic test?",
      options: [
        "High-resolution CT of the chest",
        "Methacholine bronchoprovocation testing",
        "Ventilation-perfusion lung scanning",
        "Cardiopulmonary exercise testing"
      ],
      correct: 0,
      explanation: "<strong>High-resolution chest CT</strong> is the diagnostic test of choice for bronchiectasis and shows airway dilation, lack of tapering, and bronchial wall thickening. Methacholine challenge evaluates asthma, which does not explain chronic purulent sputum with recurrent infections. V/Q scanning evaluates chronic thromboembolic disease. Cardiopulmonary exercise testing is not used to define abnormal airways.",
      flashcards: [
        { f: "What imaging test diagnoses bronchiectasis?", b: "High-resolution CT showing dilated, thick-walled bronchi with lack of tapering.", x: "Bronchiectasis is structural airway dilation, so CT best visualizes the abnormal anatomy.", t: "Trap: Chest x-ray only; it may suggest but cannot reliably confirm bronchiectasis.", m: "Bronchi widened? HRCT decides." },
        { f: "What symptom pattern is classic for bronchiectasis?", b: "Chronic daily productive cough with recurrent infections and purulent sputum.", x: "Damaged dilated airways impair clearance, causing bacterial colonization and repeated inflammation.", t: "Trap: Episodic wheeze alone; that favors asthma over bronchiectasis.", m: "Bronchiectasis = buckets of sputum." },
        { f: "Name two common pathogens in non-CF bronchiectasis exacerbations.", b: "Haemophilus influenzae and Pseudomonas aeruginosa are common pathogens.", x: "Chronic abnormal airways favor colonization by gram-negative respiratory organisms.", t: "Trap: Pneumocystis; it causes opportunistic pneumonia, not typical bronchiectasis flares.", m: "H flu early, Pseudomonas later." }
      ]
    },
    {
      id: "pulm-tension-pneumothorax-decompression",
      system: "PULM",
      task: "RX",
      vignette: "A 24-year-old tall man develops sudden pleuritic chest pain and severe dyspnea while playing basketball. He is anxious and diaphoretic. Blood pressure is 78/46 mm Hg, pulse is 132/min, trachea is deviated to the left, and breath sounds are absent on the right. Oxygen saturation is 84% on a nonrebreather mask.",
      leadIn: "Which of the following is the most appropriate immediate management?",
      options: [
        "Observe with high-flow oxygen",
        "Needle decompression followed by chest tube",
        "CT chest before intervention",
        "Outpatient aspiration within the next 24 hours"
      ],
      correct: 1,
      explanation: "Hemodynamic instability, unilateral absent breath sounds, and tracheal deviation indicate <strong>tension pneumothorax</strong>, requiring immediate needle decompression followed by tube thoracostomy. Observation is appropriate only for small, stable pneumothoraces. CT must not delay lifesaving decompression. Outpatient aspiration is unsafe in shock and hypoxemia.",
      flashcards: [
        { f: "What is the immediate treatment for tension pneumothorax?", b: "Needle decompression now, followed by definitive chest tube placement.", x: "Intrathoracic pressure impairs venous return, so decompression is needed before imaging.", t: "Trap: CT first; unstable tension pneumothorax is a clinical diagnosis.", m: "Tension needs needle now." },
        { f: "Which signs distinguish tension pneumothorax from simple pneumothorax?", b: "Hypotension, severe hypoxemia, tracheal deviation, and obstructive shock physiology.", x: "Mediastinal shift reduces cardiac preload and causes rapid hemodynamic collapse.", t: "Trap: Pleuritic pain alone; stable pain can occur in simple pneumothorax.", m: "Tension = trachea plus trouble pressure." },
        { f: "What definitive procedure follows emergent needle decompression?", b: "Tube thoracostomy to evacuate air and prevent recurrence of tension physiology.", x: "Needle decompression is temporizing; persistent pleural air leak needs ongoing drainage.", t: "Trap: Remove needle and discharge; recurrence can be fatal.", m: "Needle bridges to tube." }
      ]
    },
    {
      id: "pulm-asbestosis-lower-lobe-fibrosis",
      system: "PULM",
      task: "DX",
      vignette: "A 72-year-old retired shipyard worker has progressive exertional dyspnea and dry cough. He smoked 20 pack-years but quit 25 years ago. Examination reveals bibasilar crackles and clubbing. Chest CT shows calcified pleural plaques along the diaphragm and subpleural lower-lobe reticulation.",
      leadIn: "Which of the following is the most likely diagnosis?",
      options: [
        "Silicosis with upper-lobe nodules",
        "Berylliosis with hilar adenopathy",
        "Asbestosis with pleural plaques",
        "Coal worker pneumoconiosis"
      ],
      correct: 2,
      explanation: "Shipyard exposure, calcified diaphragmatic pleural plaques, and lower-lobe subpleural fibrosis indicate <strong>asbestosis</strong>. Silicosis and coal worker pneumoconiosis usually cause upper-lobe nodules and are linked to mining, sandblasting, or coal dust. Berylliosis can mimic sarcoidosis with granulomas and hilar adenopathy. Asbestos exposure increases risks of lung cancer and mesothelioma, with smoking synergistically increasing lung cancer risk.",
      flashcards: [
        { f: "What CT findings are classic for asbestos-related lung disease?", b: "Calcified pleural plaques, often diaphragmatic, plus lower-lobe subpleural fibrosis in asbestosis.", x: "Inhaled asbestos fibers cause pleural scarring and basilar interstitial fibrosis after long latency.", t: "Trap: Upper-lobe nodules; those suggest silicosis or coal worker pneumoconiosis.", m: "Asbestos attacks bases and pleura." },
        { f: "Which jobs commonly expose patients to asbestos?", b: "Shipbuilding, insulation, construction, demolition, and brake or pipe work.", x: "Occupational exposure often precedes disease by decades, so remote work history matters.", t: "Trap: Bird keeping; that suggests hypersensitivity pneumonitis.", m: "Ships and insulation signal asbestos." },
        { f: "How does smoking affect asbestos-related cancer risk?", b: "Smoking synergistically increases lung cancer risk but not clearly mesothelioma risk.", x: "Asbestos and tobacco carcinogens together greatly increase bronchogenic carcinoma risk.", t: "Trap: Smoking causes pleural plaques; plaques indicate asbestos exposure.", m: "Asbestos plus smoke multiplies lung cancer." }
      ]
    },
    {
      id: "pulm-copd-triple-therapy-eosinophils",
      system: "PULM",
      task: "RX",
      vignette: "A 69-year-old man with COPD has had 3 exacerbations requiring prednisone in the past year despite daily tiotropium-olodaterol and correct inhaler technique. He quit smoking 4 years ago and completed pulmonary rehabilitation. Post-bronchodilator FEV1 is 44% predicted, blood eosinophil count is 360/µL, and chest radiograph shows hyperinflation. He has no history of pneumonia.",
      leadIn: "Which of the following is the most appropriate change in maintenance therapy?",
      options: [
        "Stop bronchodilators and use oral steroids",
        "Add chronic theophylline therapy",
        "Switch to short-acting albuterol alone",
        "Add inhaled corticosteroid triple therapy"
      ],
      correct: 3,
      explanation: "In COPD with persistent exacerbations on LABA/LAMA and blood eosinophils ≥300/µL, GOLD guidance supports <strong>triple therapy</strong> with LABA/LAMA/ICS if pneumonia risk is acceptable. Chronic oral steroids are harmful and not maintenance therapy. Theophylline has limited benefit and toxicity. Short-acting bronchodilator monotherapy is inadequate for frequent exacerbations.",
      flashcards: [
        { f: "When should ICS be added to LABA/LAMA in COPD exacerbators?", b: "Persistent exacerbations with blood eosinophils ≥300/µL strongly favor LABA/LAMA/ICS triple therapy.", x: "Higher eosinophils predict better exacerbation reduction from inhaled corticosteroids.", t: "Trap: Add ICS for dyspnea alone; ICS targets exacerbation risk, not primary breathlessness.", m: "Eos ≥300 opens the ICS door.",
          tb: { h: ["Eosinophils", "ICS benefit"], r: [["<100 per µL", "Low"], ["100-299 per µL", "Possible"], ["≥300 per µL", "Strong"]] } },
        { f: "What is the main risk of inhaled corticosteroids in COPD?", b: "Increased pneumonia risk, especially in older patients with prior pneumonia or low eosinophils.", x: "ICS suppresses airway immune defenses, so benefit must outweigh infection risk.", t: "Trap: No downside to ICS; pneumonia risk matters in COPD.", m: "ICS helps flares, hurts pneumonia risk." },
        { f: "What nonpharmacologic therapy improves COPD symptoms and function?", b: "Pulmonary rehabilitation for symptomatic patients, especially after exacerbations.", x: "Exercise training and education improve dyspnea, exercise tolerance, and quality of life.", t: "Trap: Bed rest; deconditioning worsens COPD disability.", m: "Rehab rebuilds reserve." }
      ]
    },
    {
      id: "rheum-cppd-pseudogout-crystals",
      system: "RHEUM",
      task: "DX",
      vignette: "A 78-year-old woman has acute right knee pain and swelling 2 days after hospitalization for pneumonia. Temperature is 37.8 °C, and the knee is warm with a moderate effusion. Synovial fluid leukocyte count is 28,000/µL with negative Gram stain. Polarized microscopy shows rhomboid crystals with weak positive birefringence.",
      leadIn: "Which of the following is the most likely diagnosis?",
      options: [
        "Calcium pyrophosphate crystal arthritis",
        "Monosodium urate crystal arthritis",
        "Septic arthritis due to Staphylococcus aureus",
        "Rheumatoid arthritis flare"
      ],
      correct: 0,
      explanation: "Rhomboid, weakly positively birefringent crystals establish <strong>calcium pyrophosphate crystal arthritis</strong>, also called pseudogout. Gout has needle-shaped, negatively birefringent monosodium urate crystals. Send synovial culture because neither crystals nor a negative Gram stain excludes coexisting infection. CPPD is the best demonstrated diagnosis, but infection must still be assessed. Rheumatoid arthritis does not produce CPP crystals.",
      flashcards: [
        { f: "What crystals are seen in pseudogout?", b: "Rhomboid calcium pyrophosphate crystals with weak positive birefringence.", x: "CPP crystals trigger neutrophilic synovitis that mimics gout or infection.", t: "Trap: Needle-shaped negative crystals; that is gout.", m: "Pseudogout is positive parallelograms." },
        { f: "Which joint is commonly affected by acute CPPD?", b: "The knee is the classic site, especially in older adults or after illness or surgery.", x: "CPPD prevalence rises with age and can flare during physiologic stress.", t: "Trap: First MTP only; podagra is more typical of gout.", m: "CPPD often picks the knee." },
        { f: "What test is essential in acute monoarthritis?", b: "Arthrocentesis with cell count, Gram stain, culture, and crystal analysis.", x: "Septic arthritis and crystal arthritis can look identical and can rarely coexist.", t: "Trap: Treat based on x-ray chondrocalcinosis alone; fluid analysis is decisive.", m: "Hot joint? Tap it." }
      ]
    },
    {
      id: "rheum-reactive-arthritis-chlamydia",
      system: "RHEUM",
      task: "RX",
      vignette: "A 29-year-old man has 2 weeks of right knee and left ankle pain with swelling. One month ago he had dysuria after a new sexual partner, which resolved without treatment. Examination shows conjunctival injection, Achilles tendon tenderness, and an asymmetric oligoarthritis. Synovial fluid cultures are negative, and nucleic acid testing is positive for Chlamydia trachomatis.",
      leadIn: "Which of the following is the most appropriate initial management?",
      options: [
        "Doxycycline alone without anti-inflammatory treatment",
        "NSAIDs plus chlamydia treatment",
        "Prednisone alone without infection treatment",
        "Methotrexate as initial arthritis therapy"
      ],
      correct: 1,
      explanation: "Reactive arthritis after genitourinary infection is treated initially with <strong>NSAIDs for synovitis plus antibiotics for active Chlamydia</strong>, including partner management. Antibiotics clear the mucosal infection but do not reliably resolve established sterile joint inflammation by themselves. Prednisone alone leaves infection untreated. Methotrexate or other DMARDs are reserved for persistent disease after initial anti-inflammatory treatment.",
      flashcards: [
        { f: "What infection commonly precedes reactive arthritis after urethritis?", b: "Chlamydia trachomatis, often weeks before asymmetric lower-extremity arthritis.", x: "Sterile synovitis follows mucosal infection in genetically susceptible hosts, often HLA-B27 positive.", t: "Trap: Staph aureus bacteremia; that causes septic arthritis, not classic reactive arthritis.", m: "Can’t see, can’t pee, can’t climb a tree." },
        { f: "What is first-line arthritis treatment in reactive arthritis?", b: "NSAIDs; add local steroids or DMARDs for persistent disease, and treat active infection.", x: "Inflammation is usually self-limited, so symptom control comes first while clearing active trigger.", t: "Trap: Chronic biologic first; reserve for refractory disease.", m: "Reactive arthritis starts with NSAIDs." },
        { f: "What joint pattern suggests reactive arthritis?", b: "Asymmetric oligoarthritis of lower limbs with enthesitis or dactylitis after GI or GU infection.", x: "Reactive arthritis is a spondyloarthritis pattern rather than symmetric small-joint RA.", t: "Trap: Symmetric MCP synovitis; that suggests rheumatoid arthritis.", m: "Reactive hits heels and knees." }
      ]
    },
    {
      id: "rheum-sjogren-anti-ssa-diagnosis",
      system: "RHEUM",
      task: "TEST",
      vignette: "A 49-year-old woman has 1 year of dry eyes, dry mouth, and difficulty swallowing crackers without water. She has bilateral parotid enlargement and several dental caries. Schirmer testing shows 3 mm of wetting in 5 minutes. ESR is 54 mm/h, and rheumatoid factor is positive.",
      leadIn: "Which of the following serologic tests is most supportive of the diagnosis?",
      options: [
        "Anti-centromere antibody",
        "Anti-cyclic citrullinated peptide antibody",
        "Anti-SSA/Ro antibody",
        "Anti-Jo-1 antibody"
      ],
      correct: 2,
      explanation: "Sicca symptoms, abnormal Schirmer testing, parotid enlargement, and dental caries suggest <strong>Sjögren syndrome</strong>; anti-SSA/Ro is the most supportive listed antibody. Anti-centromere suggests limited systemic sclerosis. Anti-CCP supports rheumatoid arthritis and may coexist but does not explain sicca as specifically. Anti-Jo-1 suggests antisynthetase syndrome with myositis and interstitial lung disease.",
      flashcards: [
        { f: "Which antibody is most associated with Sjögren syndrome?", b: "Anti-SSA/Ro, often with anti-SSB/La, supports Sjögren in a sicca presentation.", x: "Autoimmune exocrine gland inflammation causes keratoconjunctivitis sicca and xerostomia.", t: "Trap: Anti-centromere; that points to limited systemic sclerosis.", m: "Sjögren says SSA." },
        { f: "What Schirmer test result supports dry eye in Sjögren syndrome?", b: "Low tear production, classically ≤5 mm wetting in 5 minutes.", x: "Objective ocular dryness supports autoimmune lacrimal gland dysfunction.", t: "Trap: Normal Schirmer; symptoms alone can be medication-related.", m: "Schirmer short strip supports sicca." },
        { f: "What malignancy risk is increased in Sjögren syndrome?", b: "Non-Hodgkin lymphoma, especially with persistent parotid enlargement or cryoglobulinemia.", x: "Chronic B-cell activation in Sjögren increases lymphoproliferative risk.", t: "Trap: Colon cancer surveillance change; Sjögren does not specifically alter CRC screening.", m: "Sjögren swells glands and B cells." }
      ]
    },
    {
      id: "rheum-antiphospholipid-warfarin",
      system: "RHEUM",
      task: "RX",
      vignette: "A 38-year-old woman has a second unprovoked proximal deep venous thrombosis. She also had three first-trimester miscarriages. Testing 12 weeks apart shows positive lupus anticoagulant, anticardiolipin IgG, and anti-beta-2 glycoprotein I IgG. Platelet count is 145,000/µL and creatinine is 0.8 mg/dL.",
      leadIn: "Which of the following is the most appropriate long-term anticoagulant?",
      options: [
        "Aspirin alone",
        "Rivaroxaban",
        "Low-dose enoxaparin injection monotherapy",
        "Warfarin with INR goal 2 to 3"
      ],
      correct: 3,
      explanation: "Thrombosis plus persistent antiphospholipid antibodies confirms <strong>antiphospholipid syndrome</strong>; long-term warfarin with INR 2 to 3 is preferred for venous thrombosis. Direct oral anticoagulants, especially rivaroxaban, are avoided in high-risk triple-positive APS because of higher recurrent events. Aspirin alone is inadequate after venous thrombosis. Long-term enoxaparin may be used in pregnancy or selected cases but is not first-line lifelong therapy here.",
      flashcards: [
        { f: "What anticoagulant is preferred for thrombotic antiphospholipid syndrome?", b: "Warfarin, usually INR goal 2 to 3 for venous thrombosis.", x: "Vitamin K antagonists have better evidence than DOACs in high-risk APS.", t: "Trap: Rivaroxaban; avoid DOACs in triple-positive or arterial APS.", m: "APS prefers a VKA.",
          tb: { h: ["APS setting", "Preferred anticoagulant"], r: [["Venous thrombosis", "Warfarin INR 2-3"], ["Triple-positive", "Avoid DOACs"], ["Pregnancy", "Heparin + aspirin"]] } },
        { f: "How is persistent antiphospholipid antibody positivity confirmed?", b: "Repeat positive testing at least 12 weeks apart.", x: "Transient antibodies occur with infection, so persistence is required for classification.", t: "Trap: One positive test; that is insufficient for APS diagnosis.", m: "APS antibodies persist past 12 weeks." },
        { f: "Which antibody profile is high risk in APS?", b: "Triple positivity: lupus anticoagulant, anticardiolipin, and anti-beta-2 glycoprotein I.", x: "Multiple antibody positivity predicts greater recurrent thrombosis risk.", t: "Trap: Low-titer single antibody; it is lower risk and may be transient.", m: "Triple positive, triple trouble." }
      ]
    },
    {
      id: "rheum-systemic-sclerosis-ild-mycophenolate",
      system: "RHEUM",
      task: "RX",
      vignette: "A 45-year-old woman with diffuse cutaneous systemic sclerosis has worsening exertional dyspnea and dry cough. Examination shows skin thickening proximal to the elbows and fine bibasilar crackles. Pulmonary function tests show FVC 62% predicted and DLCO 48% predicted. High-resolution CT shows bilateral basilar ground-glass and reticular opacities consistent with nonspecific interstitial pneumonia.",
      leadIn: "Which of the following is the most appropriate initial treatment?",
      options: [
        "Mycophenolate mofetil",
        "High-dose prednisone alone",
        "Methotrexate monotherapy",
        "Colchicine therapy"
      ],
      correct: 0,
      explanation: "Systemic sclerosis-associated interstitial lung disease is commonly treated initially with <strong>mycophenolate mofetil</strong>, which can stabilize or improve lung function. High-dose glucocorticoids are avoided in systemic sclerosis because they increase scleroderma renal crisis risk. Methotrexate can help skin or arthritis but is not preferred for clinically significant ILD. Colchicine treats crystal arthritis and pericarditis, not scleroderma ILD.",
      flashcards: [
        { f: "What first-line immunosuppressant is commonly used for systemic sclerosis ILD?", b: "Mycophenolate mofetil for clinically significant or progressive SSc-ILD.", x: "It targets inflammatory fibrosing lung disease and can preserve FVC with less toxicity than cyclophosphamide.", t: "Trap: High-dose prednisone; it can trigger scleroderma renal crisis.", m: "Mycophenolate maintains lung volume." },
        { f: "What HRCT pattern is common in systemic sclerosis ILD?", b: "Nonspecific interstitial pneumonia with basilar ground-glass and reticular changes.", x: "SSc often causes lower-lobe fibrosing interstitial disease that reduces FVC and DLCO.", t: "Trap: Apical cavitary nodules; think infection or vasculitis instead.", m: "SSc ILD settles at the bases." },
        { f: "Why avoid high-dose steroids in systemic sclerosis?", b: "They increase risk of scleroderma renal crisis, especially in diffuse disease.", x: "Glucocorticoids may precipitate abrupt renal vascular injury with malignant hypertension.", t: "Trap: Steroids for every autoimmune flare; SSc is the exception to remember.", m: "Scleroderma plus steroids can spike kidneys." }
      ]
    },
    {
      id: "rheum-hydroxychloroquine-retina-screening",
      system: "RHEUM",
      task: "RISK",
      vignette: "A 36-year-old woman with systemic lupus erythematosus is starting hydroxychloroquine 300 mg daily. She weighs 70 kg and has normal renal function. She has no visual symptoms and no preexisting retinal disease. She asks how her eyes should be monitored while taking this medication.",
      leadIn: "Which of the following is the most appropriate ophthalmologic screening plan?",
      options: [
        "No baseline imaging; yearly visual acuity testing alone",
        "Baseline retinal imaging; annual screening from year 5",
        "No screening if the dose is below 10 mg/kg daily",
        "Screen only after visual symptoms develop"
      ],
      correct: 1,
      explanation: "The AAO 2025 revision advises a <strong>baseline fundus exam, OCT, and fundus autofluorescence</strong> soon after hydroxychloroquine begins. Annual OCT/FAF screening may be deferred during the first 5 years in patients without significant risk factors, as here. Renal disease, tamoxifen, higher dose, and older age at initiation warrant earlier monitoring. Dose should generally be ≤5 mg/kg/day actual weight; this patient's dose is 4.3 mg/kg/day. Visual acuity alone or waiting for symptoms misses early, potentially irreversible toxicity.",
      flashcards: [
        { f: "What is the AAO 2025 hydroxychloroquine screening schedule for average-risk patients?", b: "Baseline fundus examination, OCT, and FAF soon after starting; annual imaging can be deferred during the first 5 years if no major risks.", x: "OCT and wide-pattern FAF are primary screening tools; visual fields or multifocal ERG help confirm uncertain findings.", t: "Trap: Normal acuity or absent symptoms does not exclude early retinal toxicity.", m: "Baseline images now; annual by year 5." },
        { f: "What hydroxychloroquine dose limit lowers retinal toxicity risk?", b: "≤5 mg/kg/day using actual body weight.", x: "Dose by actual weight best predicts retinal exposure and long-term toxicity risk.", t: "Trap: 10 mg/kg/day; that exceeds modern safety guidance.", m: "HCQ retina rule: 5 mg per kg." },
        { f: "Which risk factors favor earlier annual HCQ retinal screening?", b: "Renal disease, tamoxifen use, high daily dose, or older age at initiation; baseline retinal disease complicates monitoring.", x: "Reduced clearance and greater exposure increase toxicity risk; long duration increases risk even at appropriate dosing.", t: "Trap: The ≤5 mg/kg dose reduces risk but does not eliminate the need for long-term screening.", m: "Kidneys, tamoxifen, dose, older start: screen sooner." }
      ]
    },
    {
      id: "rheum-igg4-related-disease",
      system: "RHEUM",
      task: "DX",
      vignette: "A 59-year-old man has 3 months of painless bilateral submandibular gland swelling and fatigue. CT of the abdomen shows a diffusely enlarged pancreas with a capsule-like rim and mild biliary narrowing. Serum IgG4 is 310 mg/dL, alkaline phosphatase is 220 U/L, and antinuclear antibody is negative. Biopsy of a salivary gland shows dense lymphoplasmacytic infiltrate with storiform fibrosis and obliterative phlebitis.",
      leadIn: "Which of the following is the most likely diagnosis?",
      options: [
        "Primary Sjögren syndrome",
        "IgG4-related disease",
        "Sarcoidosis",
        "Granulomatosis with polyangiitis"
      ],
      correct: 1,
      explanation: "<strong>IgG4-related disease</strong> causes tumefactive fibroinflammatory lesions in organs such as salivary glands, pancreas, bile ducts, kidneys, and retroperitoneum. The biopsy triad of lymphoplasmacytic infiltrate, storiform fibrosis, and obliterative phlebitis with elevated IgG4 supports the diagnosis. Sjögren syndrome causes sicca symptoms and anti-SSA positivity rather than autoimmune pancreatitis. Sarcoidosis and GPA typically show granulomas or necrotizing vasculitis, not storiform fibrosis.",
      flashcards: [
        { f: "Storiform fibrosis, obliterative phlebitis, and tumefactive pancreatitis suggest what?", b: "IgG4-related disease, often with elevated serum IgG4 and multi-organ fibroinflammation.", x: "IgG4-RD mimics malignancy but is immune-mediated and often steroid responsive.", t: "Trap: Sjögren causes sicca and SSA antibodies, not storiform pancreatic masses.", m: "IgG4 = 4 clues: glands, pancreas, fibrosis, phlebitis.",
          tb: { h: ["Feature", "IgG4-RD", "Sjögren"], r: [["Glands", "Painless swelling", "Sicca prominent"], ["Pancreas", "Autoimmune pancreatitis", "Unusual"], ["Biopsy", "Storiform fibrosis", "Focal lymphocytes"]] } },
        { f: "Which biopsy pattern is characteristic of IgG4-related disease?", b: "Dense lymphoplasmacytic infiltrate, storiform fibrosis, and obliterative phlebitis.", x: "Histology is more specific than serum IgG4 alone, which can be nonspecifically elevated.", t: "Trap: relying only on serum IgG4 can misclassify cancer or infection.", m: "IgG4 biopsy: lymphs, lattice, lost veins." },
        { f: "What treatments are used for symptomatic IgG4-related disease?", b: "Glucocorticoids commonly induce remission; B-cell-targeted therapy includes FDA-approved inebilizumab or off-label rituximab in selected patients.", x: "Inebilizumab, an anti-CD19 antibody, was approved for adult IgG4-related disease in 2025 and can reduce flares and steroid exposure.", t: "Trap: Elevated IgG4 alone is not diagnostic; exclude malignancy and infection before immune suppression.", m: "IgG4 therapy targets inflammation and B cells." }
      ]
    },
    {
      id: "neph-distal-rta-stones",
      system: "NEPH",
      task: "DX",
      vignette: "A 28-year-old woman with Sjögren syndrome has recurrent calcium phosphate kidney stones and muscle weakness. Blood pressure is 108/66 mm Hg. Sodium is 140 mEq/L, potassium is 3.0 mEq/L, chloride is 113 mEq/L, bicarbonate is 16 mEq/L, creatinine is 0.8 mg/dL, and anion gap is 11 mEq/L. Urine pH is 6.2 during acidosis.",
      leadIn: "Which of the following is the most likely diagnosis?",
      options: [
        "Type 4 renal tubular acidosis",
        "Proximal renal tubular acidosis",
        "Distal renal tubular acidosis",
        "Lactic acidosis from shock"
      ],
      correct: 2,
      explanation: "Normal anion gap metabolic acidosis, hypokalemia, urine pH persistently &gt;5.5, nephrolithiasis, and Sjögren syndrome indicate <strong>distal type 1 renal tubular acidosis</strong>. Type 4 RTA causes hyperkalemia and usually urine pH &lt;5.5. Proximal type 2 RTA can have hypokalemia but urine pH becomes &lt;5.5 after serum bicarbonate falls and stones are less typical. Lactic acidosis causes a high anion gap and clinical shock.",
      flashcards: [
        { f: "What lab pattern identifies distal type 1 RTA?", b: "Normal anion gap metabolic acidosis, hypokalemia, urine pH >5.5, and often calcium phosphate stones.", x: "Alpha-intercalated cells cannot acidify urine, promoting alkaline urine and hypocitraturia.", t: "Trap: calling any non-gap acidosis diarrhea without checking urine pH.", m: "Distal RTA: acid stuck, urine alkaline.",
          tb: { h: ["RTA type", "Potassium", "Urine pH"], r: [["Type 1 distal", "Low", ">5.5"], ["Type 2 proximal", "Low", "<5.5 later"], ["Type 4", "High", "Often <5.5"]] } },
        { f: "Which RTA causes hyperkalemia?", b: "Type 4 RTA from hypoaldosteronism or aldosterone resistance causes hyperkalemic normal-gap acidosis.", x: "Low aldosterone reduces distal sodium reabsorption, impairing potassium and hydrogen secretion.", t: "Trap: diagnosing type 4 RTA in hypokalemia.", m: "Type 4 = K more." },
        { f: "Why do stones occur in distal RTA?", b: "Alkaline urine, hypocitraturia, and hypercalciuria favor calcium phosphate precipitation.", x: "Citrate normally binds calcium; low citrate leaves calcium free to crystallize.", t: "Trap: assuming acidic urine causes calcium phosphate stones.", m: "Phosphate stones prefer alkaline urine." }
      ]
    },
    {
      id: "neph-contrast-aki-prevention",
      system: "NEPH",
      task: "RISK",
      vignette: "A 74-year-old man with diabetes and stable CKD stage 4 needs contrast-enhanced CT angiography for suspected limb ischemia. Creatinine is 2.5 mg/dL, eGFR is 25 mL/min/1.73 m2, potassium is 4.5 mEq/L, and he is clinically euvolemic. Medications include lisinopril, atorvastatin, and aspirin. There is no pulmonary edema.",
      leadIn: "Which of the following is the most appropriate strategy to reduce contrast-associated acute kidney injury risk?",
      options: [
        "Oral N-acetylcysteine only",
        "Prophylactic hemodialysis after CT angiography",
        "High-dose loop diuretic infusion",
        "IV isotonic saline before and after contrast"
      ],
      correct: 3,
      explanation: "For IV iodinated contrast, <strong>isotonic saline prophylaxis</strong> is indicated in patients with AKI or eGFR &lt;30 who are not on maintenance dialysis, unless fluid-overload risk outweighs benefit. At eGFR 30–44, consider prophylaxis only in selected high-risk circumstances; it is not routine for all CKD. Avoid nephrotoxins and use a diagnostically adequate contrast protocol rather than underdosing necessary imaging. N-acetylcysteine, prophylactic dialysis, and forced diuresis are not recommended.",
      flashcards: [
        { f: "Who should receive saline prophylaxis before IV iodinated contrast?", b: "Patients with AKI or eGFR <30, not on maintenance dialysis, when fluid administration is safe; consider selectively at eGFR 30–44.", x: "Modern IV contrast nephrotoxicity risk is lower than historically assumed; contrast-associated AKI is not necessarily contrast-caused.", t: "Trap: Do not delay urgently needed imaging or routinely hydrate every patient with mild CKD.", m: "Contrast prophylaxis is risk-based, not universal." },
        { f: "Does prophylactic dialysis prevent contrast-associated AKI?", b: "No. Do not use prophylactic hemodialysis solely to remove iodinated contrast.", x: "Dialysis after exposure does not prevent early tubular injury and adds procedural risks.", t: "Trap: dialyzing CKD patients after every contrast study.", m: "Dialysis cleans late, injury starts early." },
        { f: "Which patients are higher risk for contrast-associated AKI?", b: "Advanced CKD, AKI, diabetes with CKD, hypovolemia, heart failure, large contrast dose, and concurrent nephrotoxins.", x: "Reduced renal reserve and medullary hypoxia increase susceptibility to tubular stress.", t: "Trap: giving routine prophylaxis to all low-risk contrast recipients.", m: "Risk rises as GFR falls." }
      ]
    },
    {
      id: "neph-adpkd-tolvaptan",
      system: "NEPH",
      task: "RX",
      vignette: "A 32-year-old man with autosomal dominant polycystic kidney disease asks how to slow kidney decline. His father started dialysis at age 49. MRI shows height-adjusted total kidney volume in Mayo class 1D, eGFR is 82 mL/min/1.73 m2, blood pressure is 128/76 mm Hg on lisinopril, and liver enzymes are normal. He has no history of urinary obstruction.",
      leadIn: "Which of the following is the most appropriate disease-modifying therapy?",
      options: [
        "Tolvaptan therapy",
        "Empagliflozin therapy",
        "Everolimus therapy",
        "Octreotide therapy"
      ],
      correct: 0,
      explanation: "This adult has ADPKD with preserved eGFR but high risk for rapid progression based on Mayo class 1D; <strong>tolvaptan</strong> can slow kidney-function decline. Counsel about aquaresis and mandatory liver monitoring. KDIGO 2025 supports consideration in adults with eGFR ≥25 and rapid progression risk. SGLT2 inhibitors are not established ADPKD-specific disease-modifying therapy. mTOR inhibitors such as everolimus and somatostatin analogues such as octreotide are not recommended routine alternatives for slowing ADPKD kidney decline.",
      flashcards: [
        { f: "Who with ADPKD is considered for tolvaptan under KDIGO 2025?", b: "Adults with eGFR ≥25 and evidence of rapid progression, such as Mayo 1C–1E or historical eGFR decline ≥3 mL/min/1.73 m²/year.", x: "Mayo 1C can include slower progressors and may need additional evidence; family history supports but does not replace progression assessment.", t: "Trap: Do not prescribe solely from a relative's dialysis age or apply Mayo classification to atypical cyst morphology.", m: "Risk and renal reserve select V2 blockade." },
        { f: "What monitoring is essential with tolvaptan?", b: "Baseline and serial liver aminotransferases and bilirubin; counsel about aquaresis, thirst, and polyuria.", x: "Tolvaptan can cause serious idiosyncratic liver injury and predictable free-water diuresis.", t: "Trap: prescribing without liver monitoring.", m: "Tolvaptan: thirsty therapy, liver labs." },
        { f: "What blood pressure approach is typical in ADPKD?", b: "Use RAAS blockade for hypertension; lower BP targets are often used in young patients with preserved kidney function when tolerated.", x: "Blood pressure control reduces cardiovascular risk and may slow kidney enlargement in early disease.", t: "Trap: ignoring mild hypertension in young ADPKD.", m: "ADPKD pressure control protects kidneys." }
      ]
    },
    {
      id: "neph-rhabdomyolysis-aki-prevention",
      system: "NEPH",
      task: "RX",
      vignette: "A 34-year-old man is found after lying on the floor overnight following heroin use. He has diffuse muscle pain and dark brown urine. Blood pressure is 104/66 mm Hg, creatinine is 1.9 mg/dL, potassium is 5.3 mEq/L, calcium is 7.8 mg/dL, and creatine kinase is 38,000 U/L. Urinalysis is strongly positive for blood with 0 to 2 RBCs per high-power field.",
      leadIn: "Which of the following is the most appropriate initial therapy to prevent worsening kidney injury?",
      options: [
        "Fluid restriction until creatinine normalizes",
        "Immediate loop diuretic infusion",
        "Early hemodialysis for creatine kinase removal",
        "Aggressive isotonic IV fluids"
      ],
      correct: 3,
      explanation: "<strong>Rhabdomyolysis</strong> causes myoglobin-mediated tubular injury and requires early aggressive isotonic IV fluids to maintain renal perfusion and urine flow. Urine dipstick positive for blood with few RBCs suggests myoglobinuria. Dialysis is used for standard indications such as refractory hyperkalemia, acidosis, volume overload, or uremia, not to clear creatine kinase. Loop diuretics and fluid restriction can worsen hypovolemia and are not first-line prevention.",
      flashcards: [
        { f: "Dipstick blood with few RBCs after prolonged immobilization suggests what?", b: "Myoglobinuria from rhabdomyolysis, especially with very high creatine kinase.", x: "Urine dipsticks detect heme pigment from myoglobin as well as hemoglobin.", t: "Trap: assuming positive blood always means hematuria.", m: "Blood dip, no RBCs = muscle pigment." },
        { f: "Initial kidney-protective treatment for rhabdomyolysis?", b: "Aggressive isotonic IV fluids, titrated to maintain urine output and renal perfusion.", x: "Volume expansion dilutes tubular myoglobin and reduces pigment cast formation.", t: "Trap: dialysis is not started just to remove creatine kinase.", m: "Rhabdo: rinse the tubules." },
        { f: "When is dialysis indicated in rhabdomyolysis-associated AKI?", b: "Standard indications: refractory hyperkalemia, severe acidosis, volume overload, or uremic complications.", x: "Dialysis treats complications of kidney failure, not the muscle enzyme number itself.", t: "Trap: high CK alone is not a dialysis indication.", m: "AEIOU beats CK." }
      ]
    },
    {
      id: "neph-poststreptococcal-gn",
      system: "NEPH",
      task: "DX",
      vignette: "A 39-year-old man presents with cola-colored urine and facial puffiness 2 weeks after documented streptococcal pharyngitis. Blood pressure is 158/96 mm Hg. Urinalysis shows dysmorphic RBCs, RBC casts, and 2+ protein; creatinine is 1.8 mg/dL (baseline 0.9). Complement C3 is low, C4 is normal, antistreptolysin O titer is elevated, and serum albumin is 3.8 g/dL.",
      leadIn: "Which of the following is the most likely diagnosis?",
      options: [
        "Minimal change nephrotic syndrome",
        "Poststreptococcal glomerulonephritis",
        "Synpharyngitic IgA nephropathy",
        "Primary membranous nephropathy syndrome"
      ],
      correct: 1,
      explanation: "<strong>Poststreptococcal glomerulonephritis</strong> presents as nephritic syndrome 1 to 3 weeks after streptococcal pharyngitis or 3 to 6 weeks after impetigo, with hematuria, RBC casts, hypertension, edema, and low C3. IgA nephropathy causes synpharyngitic hematuria within 1 to 2 days of URI and usually normal complement. Minimal change and membranous nephropathy cause nephrotic syndrome with heavy proteinuria and hypoalbuminemia rather than RBC casts. Management is supportive with blood pressure and volume control.",
      flashcards: [
        { f: "Cola urine 2 weeks after strep throat with low C3 suggests what?", b: "Poststreptococcal glomerulonephritis causing nephritic syndrome.", x: "Immune complex deposition activates complement after a latent period.", t: "Trap: IgA nephropathy occurs during or within days of URI, not weeks later.", m: "Post-strep GN is post, not simultaneous." },
        { f: "Core nephritic urine findings are what?", b: "Hematuria with dysmorphic RBCs or RBC casts, often with hypertension, edema, and subnephrotic proteinuria.", x: "Glomerular inflammation lets RBCs enter tubules and form casts.", t: "Trap: massive proteinuria and lipiduria indicate nephrotic syndrome.", m: "Nephritic = bloody casts and pressure." },
        { f: "Complement pattern in poststreptococcal GN?", b: "Low C3 with usually normal C4; C3 typically normalizes within 6 to 8 weeks.", x: "Alternative complement pathway activation predominates.", t: "Trap: persistently low complement suggests another GN such as MPGN or lupus.", m: "PSGN: C3 sinks then surfaces." }
      ]
    },
    {
      id: "heme-dic-sepsis-labs",
      system: "HEME",
      task: "DX",
      vignette: "A 70-year-old woman in the ICU with gram-negative septic shock develops oozing from venipuncture sites and mottled extremities. Platelet count falls from 210,000/µL to 42,000/µL, hemoglobin is 9.2 g/dL, and schistocytes are present. PT is 24 seconds, aPTT is 58 seconds, fibrinogen is 82 mg/dL, and D-dimer is markedly elevated. Creatinine is 2.4 mg/dL.",
      leadIn: "Which of the following is the most likely diagnosis?",
      options: [
        "Immune thrombocytopenic purpura",
        "Shiga toxin-associated hemolytic uremic syndrome",
        "Disseminated intravascular coagulation",
        "Thrombotic thrombocytopenic purpura syndrome"
      ],
      correct: 2,
      explanation: "Sepsis with bleeding, thrombocytopenia, schistocytes, prolonged PT/aPTT, very low fibrinogen, and high D-dimer indicates <strong>disseminated intravascular coagulation</strong>. DIC causes systemic coagulation activation with consumption of platelets and clotting factors. TTP and HUS cause microangiopathic hemolysis with thrombocytopenia but usually have normal PT/aPTT and fibrinogen. ITP causes isolated thrombocytopenia without schistocytes or coagulation abnormalities.",
      flashcards: [
        { f: "Which labs distinguish DIC from TTP/HUS?", b: "DIC has prolonged PT/aPTT, low fibrinogen, high D-dimer, thrombocytopenia, and schistocytes.", x: "DIC consumes coagulation factors and platelets; TTP/HUS are platelet microthrombi with normal coag tests.", t: "Trap: schistocytes occur in both DIC and TTP, so use PT/aPTT and fibrinogen.", m: "DIC drains factors." },
        { f: "What is the main treatment principle for sepsis-associated DIC?", b: "Treat the underlying cause; give platelets, plasma, or cryoprecipitate only for bleeding or procedures.", x: "Stopping the trigger reduces pathologic thrombin generation and consumption.", t: "Trap: plasma exchange treats TTP, not routine DIC.", m: "DIC fix = driver first." },
        { f: "Classic TTP labs differ from DIC how?", b: "TTP has thrombocytopenia and MAHA with usually normal PT/aPTT and fibrinogen.", x: "ADAMTS13 deficiency causes platelet-rich microthrombi without factor consumption.", t: "Trap: prolonged PT points away from isolated TTP.", m: "TTP = Tiny platelet thrombi, Tests PT normal.",
          tb: { h: ["Disorder", "PT/aPTT", "Fibrinogen"], r: [["DIC", "Prolonged", "Low"], ["TTP/HUS", "Usually normal", "Normal"], ["ITP", "Normal", "Normal"]] } }
      ]
    },
    {
      id: "heme-g6pd-hemolysis",
      system: "HEME",
      task: "DX",
      vignette: "A 24-year-old man of Mediterranean ancestry develops jaundice, dark urine, and fatigue 2 days after starting dapsone for dermatitis herpetiformis. He recalls a similar episode after eating fava beans as a teenager. Hemoglobin is 8.6 g/dL, reticulocyte count is 8%, total bilirubin is 4.2 mg/dL, and haptoglobin is undetectable. Peripheral smear shows bite cells and Heinz bodies with supravital staining. Direct antiglobulin test is negative.",
      leadIn: "Which of the following is the most likely underlying disorder?",
      options: [
        "Pyruvate kinase deficiency anemia",
        "Warm autoimmune hemolytic anemia from drug exposure",
        "Hereditary spherocytosis syndrome",
        "Glucose-6-phosphate dehydrogenase deficiency"
      ],
      correct: 3,
      explanation: "Oxidant drug exposure followed by episodic Coombs-negative hemolysis with bite cells and Heinz bodies is classic for <strong>G6PD deficiency</strong>. G6PD protects red cells by generating NADPH to maintain reduced glutathione. Warm autoimmune hemolysis has a positive direct antiglobulin test and spherocytes. Hereditary spherocytosis causes chronic extravascular hemolysis, and pyruvate kinase deficiency does not cause Heinz bodies after oxidant stress.",
      flashcards: [
        { f: "Bite cells and Heinz bodies after an oxidant drug suggest what enzyme defect?", b: "G6PD deficiency causing episodic oxidative hemolysis.", x: "Low NADPH impairs glutathione regeneration; damaged hemoglobin precipitates and splenic macrophages remove inclusions, forming bite cells.", t: "Trap: Dapsone can also cause hemolysis in patients with normal G6PD; confirm the enzyme defect after recovery if necessary.", m: "G6PD protects glutathione.",
          tb: { h: ["Finding", "G6PD", "Warm AIHA"], r: [["DAT", "Negative", "Positive"], ["Smear", "Bite cells", "Spherocytes"], ["Trigger", "Oxidant stress", "Autoantibody"]] } },
        { f: "When can G6PD testing be falsely normal after hemolysis?", b: "During or soon after an acute episode, because older deficient RBCs are destroyed and reticulocytes have higher activity.", x: "Testing too early samples younger cells with relatively preserved enzyme activity.", t: "Trap: a normal acute G6PD level does not fully exclude the diagnosis.", m: "Retics can rescue the result." },
        { f: "Which exposures are important hemolysis risks in G6PD deficiency?", b: "Infections, fava beans, and high-risk oxidants such as dapsone, rasburicase, and certain primaquine regimens.", x: "Drug risk depends on agent and dose; blanket avoidance of every sulfonamide is not supported by contemporary CPIC guidance.", t: "Trap: Rasburicase is contraindicated in G6PD deficiency; verify status before use in high-risk patients.", m: "Fava, fever, high-risk oxidants." }
      ]
    },
    {
      id: "heme-thalassemia-trait-microcytosis",
      system: "HEME",
      task: "DX",
      vignette: "A 29-year-old woman is evaluated for microcytosis found during prenatal screening. She feels well and has no bleeding. Hemoglobin is 11.8 g/dL, MCV is 64 fL, RBC count is 5.9 million/µL, ferritin is 78 ng/mL, and RDW is normal. Hemoglobin electrophoresis shows HbA2 of 5.2%.",
      leadIn: "Which of the following is the most likely diagnosis?",
      options: [
        "Beta-thalassemia trait",
        "Iron deficiency anemia",
        "Anemia of chronic inflammation",
        "Sideroblastic anemia syndrome"
      ],
      correct: 0,
      explanation: "<strong>Beta-thalassemia trait</strong> causes marked microcytosis with mild anemia, normal or high RBC count, normal iron stores, and elevated HbA2, typically &gt;3.5%. Iron deficiency usually has low ferritin, increased RDW, and a low RBC count; it can lower HbA2 and obscure beta-thalassemia. Anemia of inflammation is usually normocytic or mildly microcytic with low iron availability. Sideroblastic anemia is suggested by ring sideroblasts or high iron indices, not elevated HbA2.",
      flashcards: [
        { f: "Microcytosis with high RBC count and normal ferritin suggests what?", b: "Thalassemia trait; beta-thalassemia trait usually has HbA2 &gt;3.5%.", x: "Many small RBCs are produced because globin synthesis is reduced, unlike iron deficiency where RBC production falls.", t: "Trap: treating normal ferritin microcytosis as iron deficiency misses genetic counseling.", m: "Thal trait: tiny cells, tall RBC count." },
        { f: "How does iron deficiency differ from thalassemia trait on CBC?", b: "Iron deficiency: low ferritin, high RDW, low/normal RBC count. Thal trait: normal ferritin, normal RDW, high RBC count.", x: "Iron shortage limits production; thalassemia produces numerous uniformly small cells.", t: "Trap: MCV alone cannot distinguish them.", m: "Iron low count; thal high count.",
          tb: { h: ["Feature", "Iron deficiency", "Thal trait"], r: [["Ferritin", "Low", "Normal"], ["RBC count", "Low or normal", "High"], ["RDW", "High", "Often normal"], ["HbA2", "Low or normal", "High in beta"]] } },
        { f: "What hemoglobin electrophoresis finding supports beta-thalassemia trait?", b: "Elevated HbA2, usually &gt;3.5%, with mild anemia and marked microcytosis.", x: "Reduced beta chains shift hemoglobin production toward delta-chain HbA2.", t: "Trap: alpha-thal trait often has normal electrophoresis.", m: "Beta trait boosts A2." }
      ]
    },
    {
      id: "heme-mgus-risk-stratification",
      system: "HEME",
      task: "NEXT",
      vignette: "A 68-year-old man has an incidental monoclonal protein on serum protein electrophoresis. He has no bone pain, fatigue, infections, or weight loss. Hemoglobin is 14.1 g/dL, calcium is 9.4 mg/dL, creatinine is 0.9 mg/dL, M-spike is 0.8 g/dL, immunofixation shows IgG kappa, and serum free light-chain ratio is normal. Skeletal imaging shows no lytic lesions.",
      leadIn: "Which of the following is the most appropriate next step?",
      options: [
        "Begin bortezomib-based combination therapy",
        "Repeat laboratory monitoring in 6 months",
        "Perform urgent plasmapheresis for hyperviscosity",
        "Start monthly zoledronic acid infusions"
      ],
      correct: 1,
      explanation: "This patient has low-risk <strong>MGUS</strong>: IgG M-protein &lt;1.5 g/dL, normal free light-chain ratio, and no CRAB features or myeloma-defining events. The appropriate management is observation with repeat labs, commonly at 6 months, then less often if stable. Bortezomib-based therapy and zoledronic acid are for active myeloma-related indications. Plasmapheresis is reserved for symptomatic hyperviscosity, usually with IgM or very high paraprotein levels.",
      flashcards: [
        { f: "What defines low-risk MGUS?", b: "IgG M-protein &lt;1.5 g/dL, normal free light-chain ratio, and no CRAB or myeloma-defining events.", x: "These features predict very low progression risk and support observation rather than therapy.", t: "Trap: any M-spike does not equal multiple myeloma.", m: "MGUS low risk: IgG, little, light-chain normal." },
        { f: "What are CRAB features in plasma cell disorders?", b: "HyperCalcemia, Renal failure, Anemia, Bone lesions attributable to plasma cell disease.", x: "CRAB features mark end-organ damage and generally convert precursor states to active myeloma.", t: "Trap: normal calcium and hemoglobin argue against symptomatic myeloma.", m: "CRAB crawls to myeloma treatment." },
        { f: "Management of asymptomatic low-risk MGUS is what?", b: "Observation with repeat SPEP, CBC, calcium, creatinine, and light chains at about 6 months.", x: "Early chemotherapy does not improve outcomes and exposes patients to harm.", t: "Trap: zoledronic acid is not routine for MGUS without bone disease.", m: "MGUS = Monitor, Generally Use Surveillance." }
      ]
    },
    {
      id: "heme-cll-watch-and-wait",
      system: "HEME",
      task: "NEXT",
      vignette: "A 66-year-old man is referred for stable lymphocytosis present for 6 months. He feels well and denies fevers, night sweats, weight loss, or recurrent infections. Examination shows several 1-cm cervical nodes and no splenomegaly. Hemoglobin is 14.4 g/dL, platelet count is 188,000/µL, absolute lymphocyte count is 18,000/µL, and flow cytometry shows 16,000/µL clonal B cells coexpressing CD5 and CD23 with dim surface immunoglobulin.",
      leadIn: "Which of the following is the most appropriate management?",
      options: [
        "Immediate bendamustine and rituximab",
        "Rituximab monotherapy",
        "Active surveillance",
        "Empiric high-dose prednisone"
      ],
      correct: 2,
      explanation: "Asymptomatic early-stage <strong>chronic lymphocytic leukemia</strong> without cytopenias, bulky or progressive adenopathy, symptomatic splenomegaly, autoimmune complications, or B symptoms is managed with active surveillance. Early treatment has not shown a survival benefit and adds toxicity. Neither bendamustine–rituximab nor rituximab monotherapy is indicated without a treatment trigger. Prednisone may be used for an autoimmune complication, not uncomplicated early CLL.",
      flashcards: [
        { f: "Initial management of asymptomatic early-stage CLL without cytopenias is what?", b: "Active surveillance with periodic exam and CBC; do not treat solely for lymphocytosis.", x: "Early therapy does not improve survival and can cause infection, cytopenias, and secondary malignancy.", t: "Trap: high absolute lymphocyte count alone is not an indication for treatment.", m: "CLL: Calm? Look and listen." },
        { f: "What findings trigger treatment in CLL?", b: "B symptoms, threatened organ function, bulky/progressive nodes or spleen, marrow failure, rapid doubling, or refractory autoimmune cytopenias.", x: "Treatment is reserved for symptomatic or progressive disease where benefits outweigh toxicity.", t: "Trap: small stable nodes are not enough.", m: "Treat CLL when it causes trouble." },
        { f: "What flow cytometry phenotype is typical of CLL?", b: "Clonal B cells coexpress CD5 and CD23 with dim surface immunoglobulin.", x: "Aberrant T-cell marker CD5 on B cells supports the diagnosis.", t: "Trap: CD5 positivity does not automatically mean mantle cell lymphoma.", m: "CLL cells carry CD5 and CD23." }
      ]
    },
    {
      id: "onc-colon-stage-iii-adjuvant",
      system: "ONC",
      task: "RX",
      vignette: "A 56-year-old man underwent right hemicolectomy for colon adenocarcinoma. Pathology shows a moderately differentiated, mismatch-repair-proficient tumor invading through the muscularis propria into pericolonic tissue with 2 of 24 lymph nodes positive and negative margins. CT of the chest, abdomen, and pelvis shows no metastases. ECOG performance status is 0 and creatinine clearance is 85 mL/min.",
      leadIn: "Which of the following is the most appropriate postoperative management?",
      options: [
        "Adjuvant oxaliplatin-based chemotherapy",
        "Observation with serial CEA testing alone",
        "Pelvic radiation with oral capecitabine",
        "Adjuvant pembrolizumab monotherapy"
      ],
      correct: 0,
      explanation: "Node-positive colon cancer is <strong>stage III</strong> and should receive adjuvant oxaliplatin-based chemotherapy, such as FOLFOX or CAPOX, if medically fit. Surgery alone has a higher recurrence risk, and surveillance alone is inappropriate for stage III disease. Pelvic radiation is used selectively in rectal cancer, not routine colon cancer. Pembrolizumab is used in specific metastatic or selected high-risk settings with MSI-H/dMMR features, not regardless of MSI status after resection.",
      flashcards: [
        { f: "Resected colon cancer with positive lymph nodes needs what adjuvant treatment?", b: "Adjuvant oxaliplatin-based chemotherapy such as FOLFOX or CAPOX for stage III disease.", x: "Micrometastatic risk is high with nodal spread; adjuvant therapy improves disease-free and overall survival.", t: "Trap: surveillance alone is for many stage I and selected low-risk stage II cases, not stage III.", m: "Node positive = chemo additive." },
        { f: "What makes colon cancer stage III?", b: "Any regional lymph node involvement without distant metastasis.", x: "Nodal spread is the key prognostic jump that changes postoperative management.", t: "Trap: depth into pericolonic fat alone can be stage II if nodes are negative.", m: "Stage III = nodes in the tree.",
          tb: { h: ["Stage clue", "Meaning", "Postop plan"], r: [["Node negative", "Stage I-II", "Risk-based"], ["Node positive", "Stage III", "Adjuvant chemo"], ["Metastatic", "Stage IV", "Systemic therapy"]] } },
        { f: "Routine pelvic chemoradiation is mainly used for which colorectal site?", b: "Rectal cancer, not typical resected colon cancer.", x: "The pelvis has local recurrence constraints; colon cancer recurrence risk is mainly systemic.", t: "Trap: applying rectal radiation algorithms to colon cancer.", m: "Radiation remembers rectum." }
      ]
    },
    {
      id: "onc-lung-egfr-osimertinib",
      system: "ONC",
      task: "RX",
      vignette: "A 62-year-old never-smoking woman is diagnosed with metastatic lung adenocarcinoma involving the lung, pleura, and bone. PD-L1 tumor proportion score is 5%. Molecular testing shows an EGFR exon 19 deletion; ALK and ROS1 rearrangements are absent. She has mild bone pain but no spinal cord compression or brain metastases.",
      leadIn: "Which of the following is the most appropriate first-line systemic therapy?",
      options: [
        "Carboplatin plus paclitaxel",
        "Osimertinib",
        "Pembrolizumab monotherapy",
        "Alectinib"
      ],
      correct: 1,
      explanation: "For metastatic lung adenocarcinoma with a sensitizing <strong>EGFR exon 19 deletion</strong>, choose <strong>EGFR-directed therapy</strong> rather than pembrolizumab monotherapy. Among the listed options, <strong>osimertinib</strong> is the appropriate EGFR inhibitor and has CNS activity. Contemporary first-line options also include osimertinib plus platinum/pemetrexed and amivantamab plus lazertinib in suitable patients; monotherapy is not the only valid regimen. Alectinib targets ALK, not EGFR, and PD-L1 staining does not supersede the actionable EGFR result.",
      flashcards: [
        { f: "What treatment principle guides metastatic NSCLC with an EGFR exon 19 deletion?", b: "Use first-line EGFR-directed therapy; osimertinib is an established option, alone or in an approved combination.", x: "Osimertinib plus platinum/pemetrexed and amivantamab–lazertinib are other current options; treatment intensity depends on disease and patient factors.", t: "Trap: PD-L1 positivity does not justify first-line pembrolizumab monotherapy instead of EGFR-directed treatment.", m: "Match EGFR to EGFR-directed therapy." },
        { f: "Which lung cancer drug targets ALK rearrangements?", b: "Alectinib is a preferred ALK inhibitor for ALK-positive metastatic NSCLC.", x: "Matching the drug to the driver mutation is essential; ALK and EGFR are different targets.", t: "Trap: alectinib is not an EGFR inhibitor.", m: "Alectinib attacks ALK." },
        { f: "Why obtain broad molecular testing before treating metastatic nonsquamous NSCLC?", b: "Driver results can change systemic therapy selection and sequencing; first-line targeted options depend on the specific alteration.", x: "EGFR, ALK, ROS1, BRAF V600E, MET exon 14, RET, and NTRK can direct initial targeted therapy. Other alterations such as KRAS G12C may direct later-line options.", t: "Trap: Detecting an actionable mutation does not mean every targeted drug is approved for first-line use.", m: "Test before treatment; sequence by the specific driver." }
      ]
    },
    {
      id: "onc-testicular-cancer-markers",
      system: "ONC",
      task: "TEST",
      vignette: "A 27-year-old man has a painless enlarging right testicular mass. Ultrasound shows a solid intratesticular lesion, and radical inguinal orchiectomy is planned. Before surgery, lactate dehydrogenase is mildly elevated. CT of the abdomen and pelvis has not yet been performed.",
      leadIn: "Which of the following tumor marker panels should be obtained for staging and follow-up?",
      options: [
        "PSA, CEA, and CA 19-9",
        "Calcitonin, thyroglobulin, and TSH",
        "AFP, beta-hCG, and LDH",
        "CA-125, inhibin B, and estradiol"
      ],
      correct: 2,
      explanation: "Suspected testicular germ cell tumor should be evaluated with serum <strong>AFP, beta-hCG, and LDH</strong> before orchiectomy and followed after treatment. AFP elevation indicates nonseminomatous elements because pure seminoma does not produce AFP. PSA/CEA/CA 19-9, thyroid markers, and ovarian stromal markers do not stage testicular germ cell tumors. Radical inguinal orchiectomy, not transscrotal biopsy, is the diagnostic and therapeutic step.",
      flashcards: [
        { f: "Which serum markers are used in testicular germ cell tumors?", b: "AFP, beta-hCG, and LDH before orchiectomy and during follow-up.", x: "Markers help risk stratify, stage, assess response, and detect relapse.", t: "Trap: PSA is for prostate cancer, not testicular masses.", m: "Testis markers: A-H-L." },
        { f: "What does elevated AFP imply in a testicular germ cell tumor?", b: "Nonseminomatous component; pure seminoma should not elevate AFP.", x: "Yolk sac and embryonal elements can secrete AFP, changing classification and management.", t: "Trap: calling AFP-positive disease pure seminoma.", m: "AFP = Another Fetal Pattern, nonseminoma." },
        { f: "Preferred diagnostic procedure for a solid intratesticular mass?", b: "Radical inguinal orchiectomy after tumor markers; avoid transscrotal biopsy.", x: "Inguinal approach preserves lymphatic drainage patterns and avoids scrotal seeding.", t: "Trap: needle biopsy through scrotum is avoided.", m: "Testis tumor exits inguinally." }
      ]
    },
    {
      id: "onc-malignant-pleural-effusion",
      system: "ONC",
      task: "NEXT",
      vignette: "A 69-year-old woman with metastatic breast cancer has recurrent dyspnea from a large right pleural effusion. Two therapeutic thoracenteses over 3 weeks each relieved symptoms, and cytology from both showed malignant cells. Lung reexpanded fully after drainage. She is receiving palliative systemic therapy and wants to minimize repeat procedures.",
      leadIn: "Which of the following is the most appropriate next step for symptom control?",
      options: [
        "Serial therapeutic thoracentesis only",
        "Long-term oral furosemide therapy",
        "High-dose systemic glucocorticoid therapy",
        "Indwelling pleural catheter placement"
      ],
      correct: 3,
      explanation: "Recurrent symptomatic <strong>malignant pleural effusion</strong> is best palliated with an indwelling pleural catheter or pleurodesis if the lung reexpands; catheter placement is especially practical to reduce repeated thoracenteses. Serial thoracenteses relieve symptoms temporarily but become burdensome when fluid rapidly recurs. Diuretics help transudative volume overload, not malignant exudates. Systemic glucocorticoids do not reliably control malignant pleural fluid accumulation.",
      flashcards: [
        { f: "Recurrent symptomatic malignant pleural effusion with expandable lung is treated how?", b: "Indwelling pleural catheter or chemical pleurodesis for palliation.", x: "Both reduce recurrent dyspnea and the need for repeated thoracentesis.", t: "Trap: repeated thoracentesis alone becomes burdensome when effusion rapidly recurs.", m: "Malignant effusion returns; catheter lets it leave." },
        { f: "What must be considered before pleurodesis for malignant pleural effusion?", b: "The lung should reexpand after drainage; trapped lung favors indwelling pleural catheter.", x: "Pleurodesis requires pleural surfaces to oppose and scar together.", t: "Trap: pleurodesis fails when lung cannot appose chest wall.", m: "Pleurodesis needs pleura touching." },
        { f: "Do diuretics usually control malignant pleural effusion?", b: "No. Malignant effusions are exudative; diuretics are for transudates from heart, liver, or kidney failure.", x: "Cancer increases pleural permeability and blocks lymphatic drainage, not just hydrostatic pressure.", t: "Trap: treating every effusion with furosemide.", m: "Malignant fluid is not volume overload." }
      ]
    },
    {
      id: "onc-cancer-pain-opioids",
      system: "ONC",
      task: "RX",
      vignette: "A 61-year-old man with metastatic pancreatic cancer has constant abdominal and back pain. For 2 weeks he has taken oxycodone 10 mg every 4 hours around the clock, with pain falling to 3 of 10 but recurring before the next dose. His total use is consistently 60 mg/day without sedation or respiratory depression. He takes senna, has daily bowel movements, and wants a simpler home regimen. Creatinine is 0.8 mg/dL and bilirubin is 1.1 mg/dL.",
      leadIn: "Which of the following is the most appropriate analgesic plan?",
      options: [
        "Long-acting opioid plus rescue doses",
        "Tramadol every 6 hours with oxycodone rescue",
        "Gabapentin as the sole scheduled analgesic",
        "Continue short-acting oxycodone as needed"
      ],
      correct: 0,
      explanation: "This opioid-tolerant patient has an established, stable, tolerated requirement of <strong>60 mg/day of oral oxycodone</strong>. Convert the scheduled daily requirement to a long-acting formulation, for example <strong>extended-release oxycodone 30 mg every 12 hours</strong>, while retaining immediate-release rescue doses and reassessing pain, sedation, and respiratory status. A typical rescue dose is 10%–20% of the daily dose (approximately 6–12 mg oxycodone; 10 mg is a practical dose here). Continue <strong>senna or another stimulant laxative</strong>, adding an osmotic agent if needed. Tramadol would step down effective analgesia; gabapentin can be an adjunct for neuropathic pain but is inadequate alone for this established opioid requirement. An as-needed-only regimen leaves constant baseline pain untreated. If changing to a different opioid, account for incomplete cross-tolerance rather than using the full calculated equianalgesic dose.",
      flashcards: [
        { f: "When is a long-acting opioid appropriate for persistent cancer pain?", b: "After titration establishes a stable effective daily opioid requirement; retain short-acting rescue doses and a bowel regimen.", x: "Initially use immediate-release opioids to establish response and tolerance. Convert based on actual daily use, accounting for incomplete cross-tolerance if changing drugs.", t: "Trap: Do not start a high-dose long-acting formulation in an opioid-naive patient with an undefined requirement.", m: "Titrate first, baseline plus breakthrough next." },
        { f: "Typical breakthrough opioid dose is what fraction of total daily opioid?", b: "About 10% to 20% of the total daily opioid dose, adjusted to response and adverse effects.", x: "Rescue dosing proportional to baseline opioid exposure provides adequate rapid analgesia.", t: "Trap: fixed tiny rescue doses often fail after tolerance develops.", m: "Breakthrough = tenth to fifth." },
        { f: "Why avoid meperidine for chronic cancer pain?", b: "Normeperidine metabolite can cause neurotoxicity and seizures, especially with repeated dosing or renal dysfunction.", x: "Safer opioids are available for ongoing malignant pain.", t: "Trap: meperidine is not a preferred opioid for chronic pain.", m: "Meperidine messes with mind." }
      ]
    },
    {
      id: "neuro-parkinson-levodopa",
      system: "NEURO",
      task: "RX",
      vignette: "A 72-year-old man has 1 year of progressive right-hand resting tremor, bradykinesia, and shuffling gait. Examination shows cogwheel rigidity, reduced arm swing, and a 4-Hz pill-rolling tremor. He has fallen twice and can no longer button his shirts. Mini-Cog score is 4 of 5 and orthostatic vital signs are normal.",
      leadIn: "Which of the following is the most appropriate initial treatment?",
      options: [
        "Carbidopa-levodopa",
        "Trihexyphenidyl tablets",
        "Ropinirole",
        "Selegiline"
      ],
      correct: 0,
      explanation: "<strong>Carbidopa-levodopa</strong> is preferred for older patients or those with function-limiting Parkinson disease symptoms because it provides the greatest symptomatic benefit. Dopamine agonists such as ropinirole are less effective and cause hallucinations, sleep attacks, edema, and impulse-control disorders, especially in older adults. Anticholinergics such as trihexyphenidyl are mainly for tremor-predominant disease in younger patients and worsen cognition, constipation, and urinary retention. MAO-B inhibitors such as selegiline have modest benefit and are inadequate for disabling gait and hand dysfunction.",
      flashcards: [
        { f: "Best initial drug for disabling parkinsonism in an older adult?", b: "Carbidopa-levodopa is first-line when symptoms impair function, especially in older adults.", x: "Levodopa gives the strongest motor benefit; age raises adverse-effect risk from dopamine agonists and anticholinergics.", t: "Trap: Ropinirole causes hallucinations and impulse-control problems in older adults.", m: "Old or impaired → levodopa leads",
          tb: { h: ["Drug", "Best fit", "Geriatric issue"], r: [["Levodopa", "Disabling PD", "Motor benefit"], ["Ropinirole", "Younger mild PD", "Hallucinations"], ["Trihexyphenidyl", "Young tremor", "Confusion"]] } },
        { f: "Which Parkinson drug class is usually avoided in older adults?", b: "Anticholinergics such as benztropine are avoided due to cognitive and autonomic adverse effects.", x: "Central muscarinic blockade worsens memory; peripheral blockade causes constipation, urinary retention, and dry mouth.", t: "Trap: Benztropine may help tremor but is poor geriatric therapy.", m: "Anti-cholinergic = anti-cognition" },
        { f: "What clinical feature pushes Parkinson treatment beyond mild MAO-B therapy?", b: "Functional impairment such as falls, dressing difficulty, or gait limitation favors levodopa.", x: "Treatment is symptomatic; mild non-disabling disease can use observation or modest agents, but disability needs effective therapy.", t: "Trap: Selegiline is too modest for falls and ADL impairment.", m: "Falls and buttons need big benefit" }
      ]
    },
    {
      id: "neuro-trigeminal-carbamazepine",
      system: "NEURO",
      task: "RX",
      vignette: "A 59-year-old woman has recurrent brief episodes of severe stabbing pain over the right cheek and jaw. Attacks last 20 seconds and are triggered by brushing her teeth or touching the nasolabial fold. Neurologic examination is normal, including facial sensation and corneal reflexes. Serum sodium is 139 mEq/L and creatinine is 0.8 mg/dL.",
      leadIn: "Which of the following is the most appropriate initial treatment?",
      options: [
        "Oral prednisone",
        "Carbamazepine",
        "Sumatriptan",
        "Gabapentin"
      ],
      correct: 1,
      explanation: "Classic trigeminal neuralgia causes brief electric or stabbing unilateral facial pain triggered by light touch, chewing, or brushing teeth. <strong>Carbamazepine</strong> or oxcarbazepine is first-line pharmacologic therapy, with monitoring for hyponatremia, leukopenia, and hepatic toxicity. Prednisone is not first-line for classic trigeminal neuralgia. Sumatriptan treats migraine or cluster attacks, and gabapentin is less effective first-line therapy.",
      flashcards: [
        { f: "First-line drug for classic trigeminal neuralgia?", b: "Carbamazepine or oxcarbazepine.", x: "Sodium-channel blockade suppresses ephaptic firing in the trigeminal root that causes shock-like triggered pain.", t: "Trap: Gabapentin is plausible for neuropathy but not best initial therapy.", m: "TrigeminAL pain → carbamazepine channels" },
        { f: "Classic trigger pattern in trigeminal neuralgia?", b: "Seconds-long unilateral facial shocks triggered by light touch, chewing, or tooth brushing.", x: "Trigger zones and refractory paroxysms distinguish it from migraine, dental disease, and sinusitis.", t: "Trap: Continuous aching facial pain suggests another diagnosis.", m: "Touch trigger, lightning pain",
          tb: { h: ["Feature", "Trigeminal", "Migraine"], r: [["Duration", "Seconds", "Hours"], ["Trigger", "Light touch", "Variable"], ["Pain", "Electric shock", "Throbbing often"]] } },
        { f: "What labs require monitoring with carbamazepine?", b: "CBC, liver tests, and sodium; watch for leukopenia, hepatotoxicity, and hyponatremia.", x: "Carbamazepine can suppress marrow, injure liver, and cause SIADH-like hyponatremia.", t: "Trap: No monitoring misses serious drug toxicity.", m: "CBZ: Cells, Bile, Zero sodium" }
      ]
    },
    {
      id: "neuro-als-riluzole",
      system: "NEURO",
      task: "DX",
      vignette: "A 61-year-old man has 8 months of progressive hand weakness, muscle cramps, and slurred speech. Examination shows tongue fasciculations, diffuse hyperreflexia, spasticity in both legs, and atrophy with fasciculations in the intrinsic hand muscles. Sensation, eye movements, and bladder function are normal. Creatine kinase is 110 U/L and cervical MRI shows only mild degenerative changes.",
      leadIn: "Which of the following is the most likely diagnosis?",
      options: [
        "Cervical spondylotic myelopathy",
        "Myasthenia gravis",
        "Amyotrophic lateral sclerosis",
        "Chronic inflammatory demyelinating polyneuropathy"
      ],
      correct: 2,
      explanation: "This patient has combined upper motor neuron signs, lower motor neuron signs, bulbar involvement, and preserved sensation, which is typical of <strong>amyotrophic lateral sclerosis</strong>. Cervical myelopathy can cause hyperreflexia but does not explain tongue fasciculations and widespread lower motor neuron findings. Myasthenia gravis causes fatigable weakness without atrophy, fasciculations, or hyperreflexia. CIDP causes sensory loss and areflexia rather than spastic hyperreflexia.",
      flashcards: [
        { f: "Key exam pattern for ALS?", b: "Upper and lower motor neuron signs in multiple regions with preserved sensation.", x: "ALS degenerates corticospinal tracts and anterior horn cells while sparing sensory pathways until late.", t: "Trap: Cervical myelopathy rarely causes tongue fasciculations.", m: "ALS = Above and Lower motor signs" },
        { f: "Which supportive drug modestly prolongs survival in ALS?", b: "Riluzole; also offer multidisciplinary care and respiratory monitoring.", x: "Riluzole reduces glutamatergic excitotoxicity; survival benefit is modest but guideline-supported.", t: "Trap: Steroids do not treat ALS.", m: "Riluzole rules glutamate" },
        { f: "Respiratory test followed serially in ALS?", b: "Forced vital capacity, with noninvasive ventilation when respiratory weakness develops.", x: "Diaphragm weakness drives morbidity; NIV improves symptoms and survival in appropriate patients.", t: "Trap: Pulse oximetry can be normal despite early ventilatory failure.", m: "ALS lungs: follow FVC" }
      ]
    },
    {
      id: "neuro-restless-legs-iron",
      system: "NEURO",
      task: "RX",
      vignette: "A 46-year-old woman reports an irresistible urge to move her legs when lying in bed. Symptoms are worse in the evening, improve when she walks, and delay sleep onset. Neurologic examination is normal. Hemoglobin is 12.2 g/dL, ferritin is 38 ng/mL, and transferrin saturation is 17%.",
      leadIn: "Which of the following is the most appropriate next step in management?",
      options: [
        "Begin pramipexole therapy",
        "Order overnight polysomnography",
        "Start clonazepam at bedtime",
        "Give oral iron supplementation"
      ],
      correct: 3,
      explanation: "Restless legs syndrome is diagnosed clinically by urge to move the legs that worsens at rest and at night and improves with movement. <strong>Iron replacement</strong> is recommended when ferritin is ≤75 ng/mL or transferrin saturation is &lt;20%, even without anemia. Dopamine agonists can cause augmentation and impulse-control disorders and are not first-line before correcting iron deficiency. Polysomnography is unnecessary for typical RLS, and benzodiazepines do not treat the underlying syndrome.",
      flashcards: [
        { f: "Iron threshold for restless legs syndrome treatment?", b: "Treat if ferritin ≤75 ng/mL or transferrin saturation below 20%.", x: "Low CNS iron contributes to RLS; repletion can improve symptoms and avoids augmentation from dopamine agonists.", t: "Trap: Normal hemoglobin does not exclude iron-responsive RLS.", m: "RLS iron: ferritin 75, TSAT 20",
          tb: { h: ["Iron test", "Treat RLS if"], r: [["Ferritin", "≤75 ng/mL"], ["TSAT", "Under 20%"], ["Hemoglobin", "May be normal"]] } },
        { f: "Four core clinical clues to restless legs syndrome?", b: "Urge to move, worse at rest, worse in evening or night, relieved by movement.", x: "The pattern separates RLS from neuropathy, cramps, claudication, and akathisia.", t: "Trap: Leg pain with exertion points to claudication, not RLS.", m: "RLS = Rest, Late, Shift helps" },
        { f: "Why avoid early dopamine agonists in many RLS patients?", b: "They can cause augmentation and impulse-control disorders.", x: "Augmentation means earlier, more intense, and spreading symptoms caused by dopaminergic therapy.", t: "Trap: Pramipexole works but may worsen long-term disease pattern.", m: "Dopamine can double down" }
      ]
    },
    {
      id: "psych-antipsychotic-metabolic",
      system: "PSYCH",
      task: "RISK",
      vignette: "A 24-year-old man is newly diagnosed with schizophrenia after 7 months of auditory hallucinations and social withdrawal. Risperidone is prescribed. He has no medical history and takes no other medications. BMI is 29 kg/m², blood pressure is 128/82 mm Hg, fasting glucose is 96 mg/dL, and LDL cholesterol is 132 mg/dL.",
      leadIn: "Which of the following monitoring plans is most appropriate?",
      options: [
        "Metabolic monitoring for BMI, BP, glucose, and lipids",
        "Prolactin levels every month and annual thyroid tests",
        "Routine annual ECG monitoring for all second-generation agents",
        "Weekly absolute neutrophil count monitoring for all patients"
      ],
      correct: 0,
      explanation: "Second-generation antipsychotics can cause weight gain, dyslipidemia, hypertension, and diabetes, so <strong>baseline and follow-up metabolic monitoring</strong> of weight or BMI, blood pressure, glucose or A1c, and lipids is required. Prolactin testing is symptom-driven and does not replace metabolic monitoring. Routine annual ECGs are not required for all agents, though QT-risk patients need targeted assessment. Weekly ANC monitoring applies to clozapine, not risperidone.",
      flashcards: [
        { f: "What baseline monitoring is needed with second-generation antipsychotics?", b: "Weight or BMI, waist if used, BP, fasting glucose or A1c, and fasting lipids.", x: "Atypical antipsychotics can rapidly increase cardiometabolic risk, especially early in treatment.", t: "Trap: Prolactin monitoring alone misses diabetes and dyslipidemia risk.", m: "Antipsychotic METS: Mass, Endocrine, Tension, Serum lipids",
          tb: { h: ["Monitor", "Reason"], r: [["Weight or BMI", "Weight gain"], ["Glucose or A1c", "Diabetes"], ["Lipids", "Dyslipidemia"], ["BP", "Hypertension"]] } },
        { f: "Which antipsychotic requires ongoing ANC monitoring?", b: "Clozapine, because of severe neutropenia risk, even though its US REMS was removed in June 2025.", x: "Follow the prescribing-information ANC schedule; FDA no longer requires REMS enrollment or reporting as a dispensing condition.", t: "Trap: REMS removal did not remove neutropenia risk or the recommendation to monitor ANC.", m: "REMS gone, neutrophil checks remain" },
        { f: "Why check lipids and glucose after starting antipsychotics?", b: "To detect dyslipidemia and diabetes from medication-induced metabolic syndrome.", x: "Weight gain and insulin resistance may appear within weeks to months and drive long-term CV disease.", t: "Trap: Waiting for symptoms misses silent hyperglycemia.", m: "Mind meds monitor metabolism" }
      ]
    },
    {
      id: "psych-clozapine-anc",
      system: "PSYCH",
      task: "RX",
      vignette: "A 33-year-old man has schizophrenia with persistent command hallucinations despite adequate 8-week trials of risperidone and aripiprazole at therapeutic doses with confirmed adherence. He has been hospitalized twice for suicidal ideation. He has no history of seizures or myocarditis. Absolute neutrophil count is 2100/µL, A1c is 5.4%, and ECG shows normal QTc.",
      leadIn: "Which of the following is the most appropriate treatment?",
      options: [
        "Add benztropine to the current regimen",
        "Start clozapine with ANC monitoring",
        "Switch to olanzapine monotherapy",
        "Add scheduled lorazepam to aripiprazole"
      ],
      correct: 1,
      explanation: "<strong>Clozapine</strong> is indicated after two adequate antipsychotic trials with verified adherence and also reduces recurrent suicidal behavior in schizophrenia or schizoaffective disorder. Baseline ANC should generally be ≥1500/µL, or ≥1000/µL with documented Duffy-null-associated neutrophil count (historically called benign ethnic neutropenia). The <strong>US clozapine REMS was removed effective June 13, 2025</strong>; ANC monitoring remains recommended under the prescribing information, but REMS registration or ANC reporting is no longer a dispensing prerequisite. Titrate slowly and monitor constipation/ileus, orthostasis, myocarditis, seizures, and metabolic effects as well as ANC.",
      flashcards: [
        { f: "When is clozapine indicated in schizophrenia?", b: "After failure of at least 2 adequate antipsychotic trials, or for recurrent suicidality in schizophrenia.", x: "Clozapine is uniquely effective for treatment-resistant disease and reduces suicidal behavior.", t: "Trap: Repeating another similar antipsychotic delays proven therapy.", m: "Two failures → clozapine" },
        { f: "What baseline ANC supports clozapine initiation?", b: "Generally ≥1500/µL; ≥1000/µL with documented Duffy-null-associated neutrophil count.", x: "Use ANC rather than total WBC and the appropriate prescribing-information pathway; do not infer Duffy-null status from race alone.", t: "Trap: The lower threshold is not permission to ignore new neutropenia or infectious symptoms.", m: "Clozapine baseline: 1500, documented Duffy-null 1000" },
        { f: "What changed in US clozapine monitoring after REMS removal?", b: "No REMS enrollment or ANC reporting requirement for dispensing; label-based ANC surveillance remains recommended.", x: "For stable counts, monitor weekly for 6 months, every 2 weeks for months 6–12, then monthly. Abnormal counts or treatment interruptions require schedule reassessment.", t: "Trap: Also actively monitor severe constipation/ileus, myocarditis symptoms, orthostasis, and metabolic toxicity.", m: "REMS removed; weekly, fortnightly, monthly monitoring stays",
          tb: { h: ["Treatment duration", "Usual ANC frequency"], r: [["First 6 months", "Weekly"], ["Months 6–12", "Every 2 weeks"], ["After 12 months", "Monthly"]] } }
      ]
    },
    {
      id: "psych-ptsd-trauma-therapy",
      system: "PSYCH",
      task: "RX",
      vignette: "A 29-year-old woman has 5 months of nightmares, intrusive memories, hypervigilance, and avoidance after a motor vehicle crash. She startles easily, avoids driving, and feels detached from friends. She drinks one glass of wine weekly and denies suicidal ideation. Physical examination and TSH are normal.",
      leadIn: "Which of the following is the most appropriate first-line treatment?",
      options: [
        "Alprazolam as maintenance therapy",
        "Haloperidol nightly",
        "Trauma-focused psychotherapy",
        "Zolpidem at bedtime"
      ],
      correct: 2,
      explanation: "Symptoms lasting more than 1 month after trauma with intrusion, avoidance, negative mood, and hyperarousal indicate PTSD. <strong>Trauma-focused psychotherapy</strong>, such as prolonged exposure, cognitive processing therapy, or trauma-focused CBT, is first-line. SSRIs or SNRIs are medication options, but benzodiazepines are ineffective and may worsen recovery. Antipsychotics and hypnotics are not first-line core PTSD treatments.",
      flashcards: [
        { f: "First-line psychotherapy for PTSD?", b: "Trauma-focused psychotherapy such as prolonged exposure or cognitive processing therapy.", x: "Structured exposure and cognitive restructuring process traumatic memories and reduce avoidance.", t: "Trap: Benzodiazepines can impair recovery and are not PTSD first-line therapy.", m: "PTSD: face trauma with therapy" },
        { f: "Minimum duration for PTSD after trauma?", b: "Symptoms persist more than 1 month after the traumatic event.", x: "Acute stress disorder occurs from 3 days to 1 month; beyond that, PTSD is considered.", t: "Trap: Calling 2-week symptoms PTSD is too early.", m: "PTSD passes 1 month",
          tb: { h: ["Disorder", "Timing", "Core clue"], r: [["Acute stress", "3 d to 1 mo", "Post-trauma"], ["PTSD", "Over 1 mo", "Avoidance, arousal"], ["Adjustment", "Within 3 mo", "Stressor not trauma"]] } },
        { f: "Which medications have the strongest guideline support for core PTSD symptoms?", b: "Sertraline, paroxetine, or venlafaxine when medication is preferred or trauma-focused therapy is unavailable.", x: "The 2023 VA/DoD guideline supports these specific agents; evidence is insufficient to recommend fluoxetine for core PTSD. Sertraline and paroxetine are FDA-approved for PTSD.", t: "Trap: Evidence is agent-specific; benzodiazepines are recommended against for PTSD.", m: "PTSD medication evidence: sertraline, paroxetine, venlafaxine" }
      ]
    },
    {
      id: "derm-erythema-nodosum",
      system: "DERM",
      task: "DX",
      vignette: "A 34-year-old woman has fever, ankle arthralgias, and painful red nodules on both shins for 5 days. She had a sore throat 3 weeks ago that resolved without treatment. Examination shows several 2- to 4-cm tender subcutaneous nodules on the anterior lower legs without ulceration. Antistreptolysin O titer is elevated, and chest radiograph is normal.",
      leadIn: "Which of the following is the most likely diagnosis?",
      options: [
        "Cellulitis",
        "Leukocytoclastic vasculitis",
        "Pyoderma gangrenosum",
        "Erythema nodosum"
      ],
      correct: 3,
      explanation: "<strong>Erythema nodosum</strong> is a septal panniculitis causing tender erythematous nodules on the anterior shins, often with fever and arthralgias. Common triggers include streptococcal infection, sarcoidosis, inflammatory bowel disease, pregnancy, and medications. Cellulitis is usually unilateral with diffuse warmth rather than multiple bilateral nodules. Leukocytoclastic vasculitis causes palpable purpura, and pyoderma gangrenosum causes painful ulcers with undermined borders.",
      flashcards: [
        { f: "Classic skin finding in erythema nodosum?", b: "Tender red subcutaneous nodules on the anterior shins, usually bilateral and nonulcerating.", x: "It is a septal panniculitis, so inflammation is deep in subcutaneous fat rather than epidermis.", t: "Trap: Cellulitis is usually unilateral and diffuse, not bilateral nodules.", m: "EN = Elevated Nodules on shins" },
        { f: "Common triggers of erythema nodosum?", b: "Strep infection, sarcoidosis, IBD, pregnancy, drugs, and some infections.", x: "EN is a reactive hypersensitivity pattern, so the associated condition should be sought.", t: "Trap: Treating as only skin infection misses systemic triggers.", m: "EN trigger hunt: Strep, Sarcoid, IBD" },
        { f: "Ulcerating painful lesion with undermined violaceous borders suggests what?", b: "Pyoderma gangrenosum, not erythema nodosum.", x: "Pyoderma is a neutrophilic dermatosis often linked to IBD and worsens with trauma.", t: "Trap: Tender shin nodules without ulcers point away from pyoderma.", m: "Pyoderma digs; EN stays nodular" }
      ]
    },
    {
      id: "derm-actinic-keratosis",
      system: "DERM",
      task: "RX",
      vignette: "A 68-year-old fair-skinned man has a rough spot on his left temple. He worked outdoors for 40 years and has no history of skin cancer. Examination shows a 5-mm erythematous gritty papule with adherent scale on sun-damaged skin. There is no bleeding, induration, ulceration, or pigment network.",
      leadIn: "Which of the following is the most appropriate treatment?",
      options: [
        "Liquid nitrogen cryotherapy",
        "Topical triamcinolone cream",
        "Topical salicylic acid treatment",
        "Wide local excision with margins"
      ],
      correct: 0,
      explanation: "An isolated gritty erythematous papule on chronically sun-exposed skin is an <strong>actinic keratosis</strong>, a premalignant keratinocyte lesion. Liquid nitrogen cryotherapy is appropriate for a small number of discrete lesions. Field therapy such as 5-fluorouracil is used for numerous lesions or field cancerization. Topical triamcinolone treats inflammation but does not eradicate dysplastic keratinocytes; salicylic acid is not preferred definitive therapy for an isolated actinic keratosis. Wide excision is unnecessary unless invasive squamous cell carcinoma is suspected.",
      flashcards: [
        { f: "Best treatment for a few isolated actinic keratoses?", b: "Liquid nitrogen cryotherapy.", x: "AKs are premalignant keratinocyte lesions; focal destruction clears discrete lesions efficiently.", t: "Trap: Wide excision is for suspected invasive cancer, not a simple AK.", m: "AK: freeze the few",
          tb: { h: ["Lesion burden", "Typical treatment"], r: [["Few AKs", "Cryotherapy"], ["Many AKs", "Field therapy"], ["Invasive SCC", "Excision"]] } },
        { f: "Classic feel of actinic keratosis?", b: "Rough, gritty, sandpaper-like papule on sun-exposed skin.", x: "Dysplastic keratinocytes produce scale and roughness before an obvious mass appears.", t: "Trap: A pearly papule with telangiectasia suggests basal cell carcinoma.", m: "AK feels like sandpaper" },
        { f: "When use field therapy for actinic keratoses?", b: "Numerous AKs or broad sun-damaged field; options include 5-fluorouracil or imiquimod.", x: "Field therapy treats visible and subclinical dysplasia across chronically damaged skin.", t: "Trap: Terbinafine treats fungus, not UV keratinocyte dysplasia.", m: "Many AKs need field fix" }
      ]
    },
    {
      id: "derm-urticaria-antihistamine",
      system: "DERM",
      task: "RX",
      vignette: "A 31-year-old woman has recurrent intensely pruritic raised wheals for 8 weeks. Individual lesions resolve within 12 hours without bruising or scale, and new lesions appear daily. She has no lip swelling, dyspnea, fever, weight loss, or joint pain. CBC and TSH are normal.",
      leadIn: "Which of the following is the most appropriate initial treatment?",
      options: [
        "Daily oral prednisone",
        "Second-generation H1 antihistamine",
        "Skin biopsy of a wheal",
        "Begin oral montelukast monotherapy"
      ],
      correct: 1,
      explanation: "Chronic spontaneous urticaria causes pruritic transient wheals for at least 6 weeks, with individual lesions lasting &lt;24 hours. A <strong>second-generation H1 antihistamine</strong> is first-line and can be increased up to 4-fold if needed. Chronic daily prednisone has unacceptable toxicity; a brief course may be used for a severe flare. Biopsy is considered when lesions last &gt;24 hours, bruise, burn, or suggest urticarial vasculitis. Montelukast monotherapy has less evidence and does not replace first-line H1 blockade.",
      flashcards: [
        { f: "First-line treatment for chronic spontaneous urticaria?", b: "Daily second-generation H1 antihistamine; titrate up to 4 times standard dose if needed.", x: "Histamine drives wheals; newer H1 blockers control symptoms with less sedation than older agents.", t: "Trap: Daily prednisone is toxic and not chronic first-line therapy.", m: "Urticaria: H1 then up to 4x" },
        { f: "Duration defining chronic urticaria?", b: "Recurrent wheals for 6 weeks or longer.", x: "Most acute urticaria is self-limited; chronic disease is usually spontaneous and not a broad allergy workup problem.", t: "Trap: Extensive food panels rarely help chronic spontaneous urticaria.", m: "Hives for 6 = chronic" },
        { f: "When suspect urticarial vasculitis?", b: "Lesions last more than 24 hours, are painful or burning, or leave bruising or hyperpigmentation.", x: "Vasculitic lesions damage vessels, so they persist and leave residual skin changes unlike ordinary hives.", t: "Trap: Fleeting itchy wheals under 24 hours fit ordinary urticaria.", m: "Vasculitis hives violate 24 hours",
          tb: { h: ["Feature", "Ordinary hive", "Vasculitis"], r: [["Duration", "Under 24 hr", "Over 24 hr"], ["Symptom", "Itchy", "Burning pain"], ["Aftereffect", "None", "Bruising"]] } }
      ]
    },
    {
      id: "obgyn-postpartum-thyroiditis",
      system: "OBGYN",
      task: "RX",
      vignette: "A 32-year-old woman who is exclusively breastfeeding a healthy term infant is evaluated 3 months after delivery for bothersome palpitations and tremor. Pulse is 108/min and BP is 118/72 mm Hg. TSH is 0.02 µU/mL and free T4 is 2.1 ng/dL. She has no thyroid pain, bruit, eye findings, asthma, or conduction disease. TSH-receptor antibodies are negative, and ultrasound shows low thyroid vascularity. Her endocrinologist has diagnosed the thyrotoxic phase of postpartum thyroiditis.",
      leadIn: "Which treatment is most appropriate while she continues breastfeeding?",
      options: [
        "Methimazole 10 mg daily with thyroid-function reassessment.",
        "Levothyroxine 50 mcg daily with thyroid-function reassessment.",
        "Low-dose propranolol for symptoms with thyroid-function follow-up.",
        "Prednisone 40 mg daily with a gradual taper over several weeks."
      ],
      correct: 2,
      explanation: "The thyrotoxic phase of <strong>postpartum thyroiditis</strong> is caused by release of stored hormone, not increased synthesis. Treat bothersome palpitations or tremor with a <strong>short course of low-dose propranolol or metoprolol</strong>, using the lowest effective dose; these agents are compatible with breastfeeding. <strong>Methimazole does not treat destructive thyroiditis</strong>. Levothyroxine is reserved for an indicated hypothyroid phase, and prednisone is not routine therapy for painless postpartum thyroiditis. Reassess thyroid function as symptoms change and about 4–8 weeks after the thyrotoxic phase resolves to detect subsequent hypothyroidism. Avoid diagnostic radioiodine studies during ongoing breastfeeding when the diagnosis can be established clinically and with safer testing.",
      flashcards: [
        { f: "What clinical course can postpartum thyroiditis follow?", b: "Thyrotoxicosis, hypothyroidism, or both within the first postpartum year; not every patient has both phases.", x: "Destructive hormone release produces early excess; subsequent depletion may cause hypothyroidism, and some patients remain hypothyroid permanently.", t: "Trap: Follow thyroid function after symptoms improve rather than assuming recovery is complete.", m: "Postpartum thyroid: excess may precede depletion" },
        { f: "How is symptomatic thyrotoxicosis from postpartum thyroiditis treated during lactation?", b: "A brief course of low-dose propranolol or metoprolol when needed; do not use a thionamide for destructive hormone release.", x: "Use the lowest effective dose and taper off as symptoms settle. These beta blockers are compatible with breastfeeding; antithyroid drugs block synthesis, not release of stored hormone.", t: "Trap: Methimazole may be appropriate for Graves disease during lactation, but not for postpartum destructive thyroiditis.", m: "Leakage: block symptoms, not synthesis",
          tb: { h: ["Phase", "Management"], r: [["Symptomatic thyrotoxic phase", "Short-term beta blocker"], ["Hypothyroid phase needing treatment", "Levothyroxine"], ["Recovery", "Reassess ongoing treatment need"]] } },
        { f: "When should the hypothyroid phase of postpartum thyroiditis be treated?", b: "Offer levothyroxine for significant symptoms or overt hypothyroidism, and when pregnancy is being attempted; it is compatible with lactation.", x: "Mild asymptomatic hypothyroidism may be monitored with repeat TSH in 4–8 weeks. If treated, reassess eventual withdrawal after recovery, avoiding taper during pregnancy or active attempts to conceive. Check TSH annually and before a future pregnancy.", t: "Trap: A temporary postpartum episode can become permanent; long-term TSH surveillance remains important.", m: "Replace when needed, reassess after recovery" }
      ]
    },
    {
      id: "obgyn-ectopic-methotrexate",
      system: "OBGYN",
      task: "RX",
      vignette: "A 27-year-old woman has 6 weeks of amenorrhea and mild left pelvic pain. She is hemodynamically stable and has no peritoneal signs. Transvaginal ultrasound shows a 2.5-cm left adnexal gestational sac containing a yolk sac, no fetal cardiac activity, and no significant free fluid. Serum β-hCG is 2200 mIU/mL, creatinine is 0.7 mg/dL, AST is 22 U/L, and hemoglobin is 12.8 g/dL. She is not breastfeeding, can attend all follow-up visits, and prefers medical treatment.",
      leadIn: "Which of the following is the most appropriate management?",
      options: [
        "Immediate dilation and curettage",
        "Repeat β-hCG in 4 weeks",
        "Emergency salpingectomy",
        "Single-dose methotrexate"
      ],
      correct: 3,
      explanation: "A stable patient with confirmed or highly suspected ectopic pregnancy, small adnexal mass, no fetal cardiac activity, reliable follow-up, and normal renal and liver function is a candidate for <strong>single-dose methotrexate</strong>. Surgery is required for hemodynamic instability, rupture, peritoneal signs, contraindications to methotrexate, or often larger masses or high β-hCG levels. Waiting 4 weeks risks rupture. Dilation and curettage is not treatment for a visualized adnexal ectopic pregnancy.",
      flashcards: [
        { f: "Who can receive methotrexate for ectopic pregnancy?", b: "Stable patient, no rupture, small mass, no fetal cardiac activity, reliable follow-up, normal renal and liver function.", x: "Methotrexate stops trophoblast growth without surgery when rupture risk is low and follow-up is safe.", t: "Trap: Peritoneal signs or instability require surgery, not methotrexate.", m: "Ectopic MTX: stable, small, silent heart" },
        { f: "What is the single-dose methotrexate follow-up schedule for ectopic pregnancy?", b: "Check β-hCG on days 4 and 7; expect a decline of at least 15% between them, then check weekly until undetectable.", x: "An inadequate decline warrants reassessment for another dose or surgery. Rupture risk persists during follow-up even if hCG is falling.", t: "Trap: A day-4 rise can occur; worsening pain, syncope, or instability needs urgent evaluation rather than waiting for scheduled labs.", m: "Days 4 to 7: fifteen percent fall, then weekly" },
        { f: "Which ultrasound finding definitively establishes an ectopic pregnancy?", b: "An extrauterine gestational sac containing a yolk sac or embryo.", x: "An empty uterus or nonspecific adnexal mass alone is not definitive; integrate serial hCG and repeat imaging when the location is uncertain.", t: "Trap: Do not give methotrexate solely because hCG exceeds a discriminatory threshold and no intrauterine sac is seen in a desired pregnancy.", m: "Extrauterine yolk sac proves the location" }
      ]
    },
    {
      id: "obgyn-breast-mass-under30",
      system: "OBGYN",
      task: "TEST",
      vignette: "A 24-year-old woman finds a painless lump in her right breast. She has no nipple discharge, skin dimpling, or family history of breast cancer. Examination reveals a mobile, rubbery 2-cm mass in the upper outer quadrant and no axillary lymphadenopathy. Her last menstrual period was 2 weeks ago.",
      leadIn: "Which of the following is the most appropriate initial diagnostic test?",
      options: [
        "Targeted breast ultrasound",
        "Screening mammography with tomosynthesis",
        "Breast MRI",
        "Serum CA 15-3 level"
      ],
      correct: 0,
      explanation: "For a palpable breast mass in a woman younger than 30 years, <strong>targeted breast ultrasound</strong> is the initial imaging test because dense breast tissue limits mammography and ultrasound distinguishes cystic from solid masses. Diagnostic mammography is generally initial for patients age ≥30 or as an adjunct if ultrasound is suspicious. MRI is not the initial test for an average-risk palpable mass. Tumor markers are not used to diagnose a new breast mass.",
      flashcards: [
        { f: "Initial imaging for palpable breast mass in women under 30?", b: "Targeted breast ultrasound.", x: "Young breasts are dense; ultrasound evaluates cystic versus solid lesions without radiation.", t: "Trap: Screening mammography is not the first test for a 24-year-old palpable mass.", m: "Under 30: ultrasound" },
        { f: "Initial imaging for palpable breast mass at age 30 or older?", b: "Diagnostic mammography, often with targeted ultrasound.", x: "Cancer risk rises with age and mammography better detects calcifications and architectural distortion.", t: "Trap: MRI is reserved for selected high-risk or problem-solving scenarios.", m: "30 and over: mammogram moves up" },
        { f: "Are breast tumor markers useful for diagnosing a new lump?", b: "No. Imaging and tissue diagnosis when indicated are required.", x: "Markers lack sensitivity and specificity for localized breast cancer diagnosis.", t: "Trap: CA 15-3 is not a breast lump workup test.", m: "Lump needs look, not lab marker" }
      ]
    },
    {
      id: "geri-beers-anticholinergic",
      system: "GERI",
      task: "RISK",
      vignette: "A 79-year-old woman is brought in for worsening forgetfulness, dry mouth, and constipation. She recently began taking diphenhydramine nightly for sleep. Other medications are lisinopril and calcium carbonate. Blood pressure is 126/74 mm Hg, Mini-Cog score is 3 of 5, and urinalysis is normal.",
      leadIn: "Which of the following is the most appropriate medication recommendation?",
      options: [
        "Start donepezil",
        "Stop diphenhydramine",
        "Switch to doxylamine",
        "Switch to amitriptyline"
      ],
      correct: 1,
      explanation: "Diphenhydramine is a strongly anticholinergic first-generation antihistamine and is on the <strong>Beers list</strong> of potentially inappropriate medications for older adults. It increases risk for confusion, constipation, urinary retention, dry mouth, blurred vision, and falls. Stop the culprit and reassess cognition before diagnosing dementia or starting donepezil. Doxylamine and amitriptyline also have high anticholinergic burden and would perpetuate these adverse effects rather than provide safer insomnia treatment.",
      flashcards: [
        { f: "Why avoid diphenhydramine for sleep in older adults?", b: "Strong anticholinergic effects: confusion, constipation, urinary retention, dry mouth, and falls.", x: "Older adults have lower cholinergic reserve and higher sensitivity to central and peripheral blockade.", t: "Trap: OTC status does not make diphenhydramine safe for geriatrics.", m: "Benadryl bends brains" },
        { f: "Two common bladder and depression drugs with high anticholinergic burden?", b: "Oxybutynin and amitriptyline.", x: "Cumulative anticholinergic exposure worsens cognition, constipation, urinary retention, and fall risk.", t: "Trap: Adding oxybutynin can worsen retention and cognition.", m: "Oxy and ami are anti-cholinergic" },
        { f: "Best first step for medication-induced geriatric confusion?", b: "Deprescribe the offending deliriogenic or anticholinergic drug when possible.", x: "Removing the cause is safer than adding drugs to treat adverse effects from another drug.", t: "Trap: Cholinesterase inhibitors are not first-line for acute drug toxicity.", m: "First subtract, then add" }
      ]
    },
    {
      id: "geri-pressure-injury-stage",
      system: "GERI",
      task: "DX",
      vignette: "An 84-year-old nursing home resident with advanced dementia is evaluated for a sacral ulcer. The wound has full-thickness skin loss with visible subcutaneous fat and granulation tissue. There is no exposed or directly palpable fascia, bone, tendon, ligament, cartilage, or muscle, and no obscuring eschar. Surrounding skin is mildly erythematous but there is no crepitus or purulence.",
      leadIn: "Which of the following is the correct pressure injury stage?",
      options: [
        "Stage 1 pressure injury",
        "Stage 2 pressure injury",
        "Stage 3 pressure injury",
        "Stage 4 pressure injury"
      ],
      correct: 2,
      explanation: "<strong>Stage 3 pressure injury</strong> is full-thickness skin loss with visible adipose tissue, granulation tissue, or epibole, without exposed deeper structures. Stage 1 is nonblanchable erythema of intact skin. Stage 2 is partial-thickness skin loss with exposed dermis or a serum-filled blister. Stage 4 has exposed or directly palpable fascia, muscle, tendon, ligament, cartilage, or bone.",
      flashcards: [
        { f: "Pressure injury with full-thickness loss and visible fat is what stage?", b: "Stage 3, if no exposed bone, tendon, ligament, cartilage, fascia, or muscle.", x: "Depth of tissue loss determines staging; adipose exposure means full-thickness skin loss.", t: "Trap: Exposed fat is not stage 2 because dermis is fully lost.", m: "Stage 3 shows fat" },
        { f: "What defines stage 4 pressure injury?", b: "Exposed or palpable fascia, muscle, tendon, ligament, cartilage, or bone.", x: "Stage 4 extends beyond subcutaneous tissue into support structures.", t: "Trap: Granulation over fat without bone or tendon is stage 3.", m: "Stage 4 hits floor structures" },
        { f: "What is stage 1 pressure injury?", b: "Nonblanchable erythema of intact skin.", x: "Skin is intact but pressure has caused localized tissue injury and capillary damage.", t: "Trap: An open blister or dermal loss is stage 2, not stage 1.", m: "Stage 1 = intact red" }
      ]
    },
    {
      id: "geri-elder-abuse-report",
      system: "GERI",
      task: "NEXT",
      vignette: "An 82-year-old man with mild cognitive impairment is seen for weight loss and bruising. His son answers all questions and refuses to leave the room. When interviewed alone, the patient says his son sometimes hits him and withholds meals when angry. He asks you not to tell anyone because he fears nursing home placement. Applicable state law requires clinicians to report reasonable suspicion of abuse of an older adult.",
      leadIn: "Which of the following is the most appropriate next step?",
      options: [
        "Schedule routine follow-up in 6 months",
        "Prescribe an antidepressant",
        "Ask the son to promise better care",
        "Report to adult protective services"
      ],
      correct: 3,
      explanation: "Clinicians are generally mandated to report suspected <strong>elder abuse</strong> to adult protective services or the appropriate state agency. Physical harm, neglect, controlling behavior, and fear of retaliation are sufficient for reporting; proof is not required before making a report. Routine follow-up or asking the suspected abuser to promise change leaves the patient at risk. Depression treatment may be needed later but does not replace immediate safety reporting.",
      flashcards: [
        { f: "What should a clinician do for suspected elder abuse?", b: "Assess immediate safety, document findings, and report according to applicable state law to APS or the required agency.", x: "Reporting duties vary by jurisdiction and setting. Explain confidentiality limits, interview privately, and involve emergency services if danger is imminent.", t: "Trap: When reporting is mandated, reasonable suspicion is sufficient; proof and the patient's permission are not required.", m: "Safety, documentation, lawful reporting" },
        { f: "Interview strategy when elder abuse is possible?", b: "Speak with the patient alone in a safe, private setting.", x: "Potential abusers may control answers; privacy allows disclosure and risk assessment.", t: "Trap: Letting the caregiver answer everything can hide abuse.", m: "Abuse assessment needs alone time" },
        { f: "Examples of elder abuse beyond hitting?", b: "Neglect, financial exploitation, emotional abuse, sexual abuse, and abandonment.", x: "Abuse includes omission of care and coercive control, not only visible injuries.", t: "Trap: Weight loss from withheld meals is neglect and abuse.", m: "Elder abuse can be action or omission" }
      ]
    },
    {
      id: "found-advance-directive-proxy",
      system: "FOUND",
      task: "NEXT",
      vignette: "A 70-year-old man with septic shock is intubated and lacks decision-making capacity. He has no living will about this situation. His chart contains a valid durable power of attorney for health care naming his adult niece as proxy. His spouse disagrees and asks to make all decisions because they are legally married.",
      leadIn: "Who should guide medical decisions for this patient?",
      options: [
        "The designated health care proxy",
        "The legally married spouse by default",
        "The attending physician alone",
        "The hospital ethics committee"
      ],
      correct: 0,
      explanation: "A valid durable power of attorney for health care designates a <strong>health care proxy</strong> who has priority to make decisions when the patient lacks capacity. The proxy should use substituted judgment based on the patient's values, or best interests if values are unknown. Default surrogate hierarchy, often including spouse first, applies only when no valid appointed proxy exists. Physicians and ethics committees can help resolve conflict but do not supersede a valid proxy.",
      flashcards: [
        { f: "Who has priority if a valid health care proxy is named?", b: "The designated proxy makes decisions when the patient lacks capacity.", x: "Appointed surrogate authority reflects the patient choice and overrides default hierarchy.", t: "Trap: Spouse is default only when no valid proxy is appointed.", m: "Named proxy beats default" },
        { f: "Decision standard for a surrogate?", b: "Use substituted judgment from patient values; use best interests if values are unknown.", x: "Surrogates represent the patient, not their own preferences.", t: "Trap: Family preference alone is not the ethical standard.", m: "First values, then best interests" },
        { f: "What does an ethics committee do in surrogate conflict?", b: "Helps mediate and advise; it does not replace a valid proxy solely due to disagreement.", x: "Ethics consultation supports process when conflict threatens patient-centered decisions.", t: "Trap: Calling ethics does not erase a durable power of attorney.", m: "Ethics advises; proxy decides" }
      ]
    },
    {
      id: "found-consent-emergency-exception",
      system: "FOUND",
      task: "NEXT",
      vignette: "A 58-year-old man is brought to the emergency department after a motor vehicle collision. He is unconscious, hypotensive, and has a rigid abdomen with a positive focused abdominal sonography for trauma. No family or advance directive can be located despite rapid efforts. The surgeon recommends immediate laparotomy to prevent death.",
      leadIn: "Which of the following is the most appropriate action?",
      options: [
        "Delay surgery until a court order is obtained",
        "Proceed with surgery under implied consent",
        "Ask police officers to sign consent",
        "Provide comfort care until family arrives"
      ],
      correct: 1,
      explanation: "The emergency exception to informed consent permits clinicians to provide immediately necessary treatment when the patient lacks capacity, delay would threaten life or serious harm, and no surrogate is available. <strong>Implied consent</strong> applies because a reasonable person would accept life-saving laparotomy in this circumstance. Waiting for court or family would create preventable death. Police cannot provide medical consent for an adult trauma patient.",
      flashcards: [
        { f: "When can emergency care proceed without explicit consent?", b: "Patient lacks capacity, urgent serious threat exists, and no surrogate is available in time.", x: "Implied consent preserves life when delay for formal consent would cause serious harm.", t: "Trap: Court orders are not required for immediate life-saving treatment.", m: "Emergency consent: incapable, urgent, no surrogate" },
        { f: "Can police consent for adult medical treatment?", b: "No, not unless legally designated; use implied consent if emergency criteria are met.", x: "Law enforcement presence does not create health care surrogate authority.", t: "Trap: A police signature is not valid consent for laparotomy.", m: "Police protect, do not proxy" },
        { f: "What limits the emergency consent exception?", b: "Treatment must be necessary to prevent death or serious harm and only until consent can be obtained.", x: "The exception is narrow and tied to urgent patient benefit, not convenience.", t: "Trap: Nonurgent elective procedures still need informed consent.", m: "Emergency exception is narrow" }
      ]
    },
    {
      id: "found-asplenia-vaccines",
      system: "FOUND",
      task: "RISK",
      vignette: "A 45-year-old woman is scheduled for elective splenectomy for hereditary spherocytosis in 3 weeks. Records confirm no previous Hib, pneumococcal, or meningococcal vaccination. She has no vaccine allergies or other immunocompromising condition.",
      leadIn: "Which of the following vaccine strategies is most appropriate?",
      options: [
        "Influenza vaccine only after surgery",
        "Live varicella vaccine alone now",
        "Pneumococcal, meningococcal, Hib vaccines",
        "No vaccines if childhood series was completed"
      ],
      correct: 2,
      explanation: "Anatomic or functional asplenia increases risk for overwhelming infection with encapsulated organisms. Patients should receive <strong>pneumococcal, meningococcal ACWY and B, and Haemophilus influenzae type b</strong> vaccination, ideally at least 14 days before elective splenectomy when feasible. Annual influenza vaccination is also recommended but is not sufficient alone. Childhood vaccination does not eliminate the need for adult asplenia-specific vaccines and boosters.",
      flashcards: [
        { f: "What vaccines are central to adult asplenia prevention?", b: "Pneumococcal, MenACWY, MenB, Hib if not previously received, and annual influenza.", x: "For pneumococcal-vaccine-naive adults, PCV20 or PCV21 alone, or PCV15 followed by PPSV23, are current options; tailor to prior vaccine history.", t: "Trap: Routine childhood vaccines do not automatically complete the adult high-risk schedule, but a completed Hib history does not require routine repeat adult Hib.", m: "No spleen: pneumococcus and both meningococci; check Hib history",
          tb: { h: ["Vaccine", "Key asplenia point"], r: [["Pneumococcal", "Use current history-based schedule"], ["MenACWY", "Primary series plus ongoing boosters"], ["MenB", "High-risk series plus boosters"], ["Hib", "1 dose if not previously received"]] } },
        { f: "When give vaccines before elective splenectomy?", b: "Ideally at least 14 days before surgery.", x: "Preoperative timing allows antibody response before splenic immune function is lost.", t: "Trap: Waiting until after surgery is less ideal when surgery is elective.", m: "Spleen vaccines 2 weeks before" },
        { f: "What meningococcal boosters are needed with persistent asplenia?", b: "MenACWY every 5 years; MenB 1 year after the primary series, then every 2–3 years while risk persists.", x: "Use the high-risk primary schedules: MenACWY 2 doses at least 8 weeks apart and MenB usually 3 doses at 0, 1–2, and 6 months, following product-specific rules.", t: "Trap: MenACWY and MenB cover different serogroups; completing one does not replace the other.", m: "ACWY five-yearly; B after one year then every two to three" }
      ]
    },
    {
      id: "crit-tca-sodium-bicarbonate",
      system: "CRIT",
      task: "RX",
      vignette: "A 36-year-old woman is found confused next to an empty amitriptyline bottle. Temperature is 37.8°C, heart rate is 132/min, blood pressure is 86/50 mm Hg, and pupils are dilated. ECG shows sinus tachycardia with QRS duration of 142 ms and terminal R wave in aVR. She has a generalized tonic-clonic seizure in the emergency department.",
      leadIn: "Which of the following is the most appropriate immediate treatment?",
      options: [
        "IV flumazenil infusion",
        "IV lipid emulsion bolus",
        "IV sodium bicarbonate",
        "IV physostigmine infusion"
      ],
      correct: 2,
      explanation: "Tricyclic antidepressant overdose with hypotension, seizures, and QRS widening ≥100 ms requires <strong>IV sodium bicarbonate</strong>. Alkalinization and sodium loading narrow the QRS by mitigating fast sodium-channel blockade. Physostigmine is contraindicated in TCA toxicity because it can worsen conduction disturbances and seizures. Flumazenil treats benzodiazepine toxicity but can provoke seizures, and lipid emulsion is reserved for refractory severe lipophilic drug toxicity after standard therapy.",
      flashcards: [
        { f: "TCA overdose with QRS ≥100 ms is treated with what?", b: "IV sodium bicarbonate boluses, targeting QRS narrowing and serum pH about 7.50 to 7.55.", x: "Sodium load and alkalemia reduce TCA binding to myocardial sodium channels.", t: "Trap: physostigmine may worsen seizures and conduction delay in TCA overdose.", m: "Wide TCA? Bicarb away." },
        { f: "ECG clue of severe tricyclic antidepressant toxicity?", b: "QRS widening and terminal R wave in aVR, often with hypotension or ventricular arrhythmias.", x: "Fast sodium-channel blockade slows ventricular depolarization.", t: "Trap: sinus tachycardia alone is nonspecific anticholinergic toxicity.", m: "TCA points right in aVR." },
        { f: "Why avoid flumazenil in mixed or proconvulsant overdose?", b: "It can precipitate seizures, especially in chronic benzodiazepine users or TCA coingestion.", x: "Removing GABAergic protection unmasks excitatory toxic effects.", t: "Trap: treating unknown coma reflexively with flumazenil.", m: "Flumazenil can flip on fits." }
      ]
    },
    {
      id: "crit-carbon-monoxide-hyperbaric",
      system: "CRIT",
      task: "RX",
      vignette: "A 36-year-old man is rescued from a house fire and has headache, nausea, and confusion. Pulse oximetry is 100% on a nonrebreather mask, but arterial blood gas with co-oximetry shows carboxyhemoglobin of 28%. Lactate is 3.8 mmol/L and ECG shows no ischemic changes. He remains disoriented after 100% oxygen is started.",
      leadIn: "Which of the following is the most appropriate next step?",
      options: [
        "Discharge after symptoms improve",
        "Start methylene blue infusion",
        "Give sodium bicarbonate boluses now",
        "Arrange hyperbaric oxygen therapy"
      ],
      correct: 3,
      explanation: "Continue immediate <strong>100% oxygen</strong> and arrange urgent toxicology/hyperbaric consultation for this patient's persistent neurologic impairment and COHb of 28%. CDC guidance supports <strong>consideration of hyperbaric oxygen</strong> for neurologic impairment, loss of consciousness, cardiac involvement, severe acidosis, or COHb generally &gt;25–30%; pregnancy warrants a more aggressive approach. Benefit for preventing delayed neurologic injury is not uniformly established, so decisions also account for transport and treatment risk. Standard pulse oximetry cannot reliably distinguish oxyhemoglobin from carboxyhemoglobin. Methylene blue is for methemoglobinemia, not CO poisoning.",
      flashcards: [
        { f: "When consider hyperbaric oxygen for carbon monoxide poisoning?", b: "Neurologic symptoms, syncope, cardiac ischemia, severe acidosis, pregnancy, or COHb generally above 25%.", x: "Hyperbaric oxygen rapidly displaces CO and may reduce delayed neurologic injury in severe cases.", t: "Trap: Normal pulse ox does not rule out CO poisoning.", m: "CO HBO: brain, heart, baby, high COHb" },
        { f: "Why is pulse oximetry falsely normal in CO poisoning?", b: "Standard pulse ox cannot distinguish oxyhemoglobin from carboxyhemoglobin.", x: "CO-bound hemoglobin absorbs light similarly, so saturation appears high despite tissue hypoxia.", t: "Trap: ABG PaO2 can also be normal while oxygen content is low.", m: "CO fools pulse ox" },
        { f: "Initial treatment for suspected carbon monoxide poisoning?", b: "Immediate 100% oxygen while confirming with co-oximetry.", x: "High inspired oxygen shortens carboxyhemoglobin half-life and improves tissue oxygen delivery.", t: "Trap: Waiting for lab confirmation delays lifesaving oxygen.", m: "CO? Oxygen now" }
      ]
    }
  ];

  /* Answer-key rebalance (v2.3): the correct option is now spread evenly
   * across A–D so position carries no signal. KEY_REMAP[qid][oldIndex] gives
   * the new index, letting the engine migrate answers saved before v2.3. */
  var KEY_VERSION = 2;
  var KEY_REMAP = {
    "cv-rv-infarct": [3,1,2,0],
    "cv-severe-as": [3,1,2,0],
    "endo-adrenal-crisis": [3,1,2,0],
    "gi-variceal": [3,1,2,0],
    "gi-cdiff": [2,1,0,3],
    "id-cap": [3,1,2,0],
    "pulm-osa": [2,1,0,3],
    "pulm-pe-doac": [3,1,2,0],
    "pulm-copd-dx": [2,1,0,3],
    "rheum-gca": [3,1,2,0],
    "rheum-ra-mtx": [2,1,0,3],
    "neph-hyponatremia": [3,1,2,0],
    "heme-ida-gi": [2,1,0,3],
    "heme-hit": [3,1,2,0],
    "onc-tls": [2,1,0,3],
    "onc-hypercalcemia": [3,1,2,0],
    "neuro-stroke-lysis": [2,1,0,3],
    "geri-delirium": [3,1,2,0],
    "cv-pericarditis": [2,1,0,3],
    "endo-phpt-fhh": [3,1,2,0],
    "gi-sbp": [1,0,2,3],
    "pulm-lights": [2,1,0,3],
    "rheum-axspa": [3,1,2,0],
    "neph-hyperk": [1,0,2,3],
    "heme-b12": [2,1,0,3],
    "onc-feb-neutropenia": [3,1,2,0],
    "neuro-bell": [1,0,2,3],
    "geri-osteoporosis": [2,1,0,3],
    "crit-septic-shock": [3,1,2,0]
  };

  window.ABIM_DATA = { SYSTEMS: SYSTEMS, TASKS: TASKS, QUESTIONS: QUESTIONS,
    KEY_VERSION: KEY_VERSION, KEY_REMAP: KEY_REMAP };
})();
