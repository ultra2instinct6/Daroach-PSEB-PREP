/*
 * BOLO.ABIM — question bank data module.
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
      extraTags: [{ label: "🦠 INFECTIOUS DISEASE (9%)", cls: "id-tag" }],
      vignette: "A 58-year-old male presents with new-onset fatigue and dyspnea. Echocardiogram reveals an LVEF of 35%. He is started on sacubitril/valsartan, carvedilol, spironolactone, and dapagliflozin. EKG shows normal sinus rhythm with a QRS of 110 ms.",
      leadIn: "What is the most appropriate next step regarding device therapy?",
      options: [
        "Place an Implantable Cardioverter-Defibrillator (ICD) immediately.",
        "Refer for Cardiac Resynchronization Therapy (CRT).",
        "Not currently indicated; optimize Guideline-Directed Medical Therapy (GDMT) and reassess LVEF in 3 months.",
        "Place an ICD after 40 days of GDMT, since the LVEF is ≤ 35%."
      ],
      correct: 2,
      explanation: "Primary prevention ICDs require strict medical optimization with the four pillars of Guideline-Directed Medical Therapy (GDMT) for at least 3 months before reassessing the ejection fraction. CRT is contraindicated because the QRS is &lt; 130 ms.",
      flashcards: [
        { f: "In HFrEF, what are the 4 medication pillars to optimize before device decisions?", b: "ARNI/ACEi/ARB, evidence-based beta-blocker, MRA, and SGLT2 inhibitor.", x: "These therapies can raise LVEF enough to avoid ICD placement and independently reduce mortality or HF hospitalization.", t: "Trap: Diuretics improve congestion but are not a disease-modifying GDMT pillar for ICD timing." },
        { f: "Before a primary-prevention ICD in newly treated HFrEF, how long should GDMT be optimized?", b: "At least 3 months of optimal GDMT, then reassess LVEF for persistent ≤35%.", x: "Waiting avoids implanting ICDs in patients whose EF recovers with neurohormonal and SGLT2 blockade.", t: "Trap: Do not implant immediately after diagnosis solely because EF is low; optimize therapy first." },
        { f: "In HFrEF on GDMT, what QRS pattern/duration gives a Class I CRT indication?", b: "LBBB with QRS ≥150 ms and LVEF ≤35% in a symptomatic patient.", x: "CRT benefits patients with electrical dyssynchrony; benefit is greatest with true LBBB and very wide QRS.", t: "Trap: QRS <130 ms is not a CRT indication and can be harmful despite low EF." }
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
        { f: "In inferior STEMI with RV infarct on V4R, which drugs should be avoided?", b: "Nitrates and diuretics; give IV fluids for hypotension.", x: "The infarcted right ventricle is preload-dependent, so venodilation or diuresis can collapse LV filling and blood pressure.", t: "Trap: Nitroglycerin helps routine ACS pain but can cause profound hypotension in RV infarction." },
        { f: "In ACS, when is sublingual nitroglycerin contraindicated?", b: "RV infarction, SBP <90 mm Hg, or recent PDE-5 inhibitor use.", x: "Nitrates reduce preload and systemic vascular resistance; PDE-5 inhibitors amplify vasodilation.", t: "Trap: Ongoing chest pain is not enough to give nitrates if hypotension, RV infarct, or PDE-5 exposure is present." },
        { f: "What initial medical bundle is still indicated in RV infarct STEMI?", b: "Aspirin, P2Y12 inhibitor, anticoagulation, high-intensity statin; beta-blocker only if no shock/HF/bradycardia.", x: "RV infarct changes preload management, not the need for antithrombotic and plaque-stabilizing ACS therapy.", t: "Trap: Avoiding nitrates does not mean withholding aspirin, P2Y12 therapy, heparin, or statin." }
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
        { f: "How is HFpEF defined in a patient with dyspnea and edema?", b: "HF symptoms/signs with LVEF ≥50% plus evidence of diastolic dysfunction or elevated filling pressures.", x: "The key physiology is a stiff, noncompliant LV that fills at high pressure despite preserved systolic EF.", t: "Trap: A normal EF does not exclude HF; look for congestion, natriuretic peptides, and diastolic findings." },
        { f: "Which comorbidity cluster commonly drives HFpEF?", b: "Hypertension, obesity/metabolic syndrome, AF, CKD, older age, and systemic inflammation.", x: "Comorbidities promote endothelial dysfunction, fibrosis, and impaired relaxation rather than primary pump failure.", t: "Trap: HFpEF is not simply mild HFrEF; its dominant problem is filling and comorbidity-driven inflammation." },
        { f: "Which drug class reduces HF hospitalization in HFpEF?", b: "SGLT2 inhibitors.", x: "Empagliflozin and dapagliflozin reduce HF events across the EF spectrum, even without diabetes.", t: "Trap: Most classic HFrEF drugs have less robust HFpEF outcome benefit; SGLT2 inhibitors are the high-yield exception." }
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
        { f: "At what CHA₂DS₂-VASc score is anticoagulation recommended for nonvalvular AF?", b: "≥2 in men or ≥3 in women; consider at 1 in men or 2 in women.", x: "Female sex alone is a risk modifier; age, HF, HTN, diabetes, stroke/TIA, and vascular disease drive most stroke risk.", t: "Trap: Bleeding scores guide risk reduction, not automatic withholding of anticoagulation when stroke risk is high." },
        { f: "When is warfarin preferred over a DOAC for stroke prevention in AF?", b: "Mechanical heart valve or moderate-to-severe mitral stenosis.", x: "These valvular AF groups were excluded from pivotal DOAC trials and have higher thrombosis risk requiring VKA therapy.", t: "Trap: Bioprosthetic valves and most native valve lesions are not the same as mechanical valve or severe MS." },
        { f: "Is aspirin adequate stroke prevention for AF with elevated CHA₂DS₂-VASc?", b: "No; use oral anticoagulation unless contraindicated.", x: "Aspirin provides far less embolic protection while still causing clinically important bleeding.", t: "Trap: Aspirin may be used for coronary disease, but it is not a substitute for AF anticoagulation." }
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
      explanation: "Severe aortic stenosis (valve area &lt; 1.0 cm², mean gradient ≥ 40 mm Hg) with symptoms — syncope, angina, or heart failure — is a <strong>Class I indication for valve replacement</strong>. Medical therapy does not alter the disease course, valvuloplasty is only a bridge, and exercise testing is contraindicated in symptomatic severe AS.",
      flashcards: [
        { f: "What is the treatment for symptomatic severe aortic stenosis?", b: "Aortic valve replacement by SAVR or TAVR.", x: "Symptoms such as syncope, angina, or HF mark high mortality; no medication relieves fixed valve obstruction long term.", t: "Trap: Diuretics may palliate congestion but do not alter severe AS prognosis." },
        { f: "What echo criteria define severe aortic stenosis?", b: "Valve area <1.0 cm², mean gradient ≥40 mm Hg, or peak velocity ≥4.0 m/s.", x: "Discordant low-flow states can obscure gradients, so integrate valve area, velocity, EF, and flow.", t: "Trap: A loud murmur alone is not severity; use Doppler hemodynamics and valve area." },
        { f: "When is exercise stress testing contraindicated in aortic stenosis?", b: "Symptomatic severe AS.", x: "Exertion can provoke syncope, ischemia, or sudden death when fixed outflow obstruction is already symptomatic.", t: "Trap: Stress testing can help truly asymptomatic severe AS, but not when symptoms are present." }
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
        { f: "In thyroid storm, when should iodine be given relative to PTU?", b: "Give PTU first, then iodine at least 1 hour later.", x: "Thionamide blocks new hormone synthesis before iodine acutely blocks release, preventing iodine from becoming substrate.", t: "Trap: Iodine before PTU can worsen storm by fueling new thyroid hormone synthesis." },
        { f: "Which thyroid storm therapies reduce peripheral T4→T3 conversion?", b: "PTU, propranolol, and glucocorticoids.", x: "T3 is the more active hormone, so blocking conversion rapidly reduces adrenergic and metabolic toxicity.", t: "Trap: Methimazole blocks synthesis but does not meaningfully block peripheral T4→T3 conversion." },
        { f: "What Burch-Wartofsky score is highly suggestive of thyroid storm?", b: "≥45.", x: "The score weights fever, CNS changes, tachyarrhythmia, GI/hepatic dysfunction, HF, and a precipitant.", t: "Trap: Do not wait for thyroid labs to look extreme; storm is a clinical diagnosis and TSH/T4 may not distinguish severity." }
      ]
    },
    {
      id: "endo-dka-k",
      system: "ENDO",
      task: "NEXT",
      vignette: "A 24-year-old woman with type 1 diabetes presents with nausea, vomiting, and abdominal pain after missing insulin doses. Glucose is 480 mg/dL, arterial pH 7.12, bicarbonate 10 mEq/L, and the anion gap is 24. Serum potassium is 3.1 mEq/L. IV normal saline is infusing.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Begin an IV insulin infusion immediately.",
        "Replete potassium and hold insulin until potassium is at least 3.3 mEq/L.",
        "Give IV sodium bicarbonate to correct the acidosis.",
        "Give subcutaneous long-acting insulin and admit to the ward."
      ],
      correct: 1,
      explanation: "DKA causes total-body potassium depletion despite variable serum levels. Insulin shifts potassium intracellularly, so starting insulin with a potassium of 3.1 mEq/L risks life-threatening hypokalemia and arrhythmia. <strong>Hold insulin until K ≥ 3.3 mEq/L</strong> while repleting. Bicarbonate is reserved for pH &lt; 6.9.",
      flashcards: [
        { f: "In DKA, at what potassium level must insulin be held?", b: "Hold insulin if K <3.3 mEq/L; replete potassium first.", x: "Despite serum K, DKA has total-body potassium depletion; insulin shifts K intracellularly and can trigger fatal arrhythmias.", t: "Trap: The hyperglycemia looks urgent, but insulin before K correction is dangerous when K is <3.3." },
        { f: "During DKA treatment, when should dextrose be added to IV fluids?", b: "When glucose falls to about 200 mg/dL, while continuing insulin until the anion gap closes.", x: "Dextrose prevents hypoglycemia so insulin can keep suppressing ketogenesis and clear ketoacidosis.", t: "Trap: Do not stop insulin just because glucose normalizes; the acidosis may persist." },
        { f: "What defines biochemical resolution of DKA?", b: "Glucose <200 plus two of: HCO₃ ≥15, pH >7.3, or anion gap ≤12.", x: "Gap closure reflects clearance of ketoacids; glucose correction alone is only one part of recovery.", t: "Trap: Bicarbonate is reserved for pH <6.9, not routine DKA with moderate acidosis." }
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
        { f: "What is the immediate treatment for suspected adrenal crisis?", b: "IV hydrocortisone 100 mg plus isotonic fluids and dextrose.", x: "Hydrocortisone replaces cortisol and provides mineralocorticoid effect at stress doses; hypoglycemia and shock can be rapidly fatal.", t: "Trap: Draw cortisol if feasible, but never delay steroids for cosyntropin testing." },
        { f: "Which presentation should trigger empiric treatment for adrenal crisis?", b: "Refractory hypotension with hyponatremia, hypoglycemia, or recent steroid withdrawal.", x: "Loss of cortisol impairs vascular responsiveness to catecholamines and can mimic septic or distributive shock.", t: "Trap: Normal saline alone may not fix shock if cortisol deficiency is the driver." },
        { f: "How does primary adrenal insufficiency differ from secondary adrenal insufficiency?", b: "Primary has hyperkalemia and hyperpigmentation; secondary usually lacks both.", x: "Primary adrenal failure raises ACTH and lowers aldosterone; pituitary or steroid-withdrawal disease preserves aldosterone.", t: "Trap: Chronic steroid withdrawal causes secondary AI, so hyperkalemia is not expected." }
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
        "Fresh frozen plasma and vitamin K to normalize the INR before endoscopy.",
        "IV proton-pump inhibitor alone; transfuse to a hemoglobin of 10 g/dL.",
        "Start a nonselective beta-blocker now to lower portal pressure.",
        "IV octreotide plus IV ceftriaxone; transfuse only if hemoglobin falls below 7 g/dL."
      ],
      correct: 3,
      explanation: "Suspected variceal hemorrhage is managed with a vasoactive agent (<strong>octreotide</strong>) plus <strong>prophylactic antibiotics</strong> (ceftriaxone), which reduce rebleeding and mortality. A <strong>restrictive transfusion threshold (Hb &lt; 7 g/dL)</strong> improves survival — over-transfusion raises portal pressure. Beta-blockers are for prophylaxis after stabilization, not during active bleeding.",
      flashcards: [
        { f: "What drugs are started immediately for suspected acute variceal hemorrhage?", b: "IV octreotide plus prophylactic IV ceftriaxone.", x: "Vasoactive therapy lowers portal inflow; antibiotics reduce infections, rebleeding, and mortality in cirrhotic GI bleeding.", t: "Trap: Endoscopy is urgent, but do not wait for it to start octreotide and antibiotics." },
        { f: "What hemoglobin threshold is used for transfusion in upper GI bleeding?", b: "Transfuse when Hb <7 g/dL in most patients.", x: "Restrictive transfusion avoids raising portal pressure and is associated with better outcomes in variceal bleeding.", t: "Trap: Liberal transfusion to normal Hb can worsen portal hypertensive bleeding." },
        { f: "During active variceal bleeding, what is the role of nonselective beta-blockers?", b: "Hold during the acute bleed; use after stabilization for secondary prophylaxis.", x: "Beta-blockers prevent future variceal bleeding but may worsen hypotension during hemorrhage.", t: "Trap: Carvedilol/nadolol are prophylaxis drugs, not acute hemostatic therapy." }
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
        { f: "When should average-risk colorectal cancer screening begin?", b: "Age 45.", x: "Screening options include colonoscopy every 10 years or stool-based tests at recommended intervals if average risk.", t: "Trap: Family history or hereditary syndromes move patients out of average-risk stool-test pathways." },
        { f: "A first-degree relative had CRC before 60; when and how often is colonoscopy done?", b: "Start at age 40 or 10 years before diagnosis, whichever is earlier; repeat every 5 years.", x: "Early familial CRC risk is high enough that colonoscopy is preferred over stool-based screening.", t: "Trap: Do not use the average-risk age 45 start or 10-year interval in this scenario." },
        { f: "Who can use stool-based colorectal cancer screening tests?", b: "Average-risk patients; any positive stool test requires colonoscopy.", x: "Stool tests detect occult blood or abnormal DNA but cannot remove polyps or diagnose the source.", t: "Trap: A positive FIT is not repeated for confirmation; it mandates colonoscopy." }
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
        { f: "What is first-line therapy for an initial nonfulminant C. difficile infection?", b: "Oral fidaxomicin preferred, or oral vancomycin.", x: "Fidaxomicin is narrower spectrum and lowers recurrence risk compared with vancomycin in many patients.", t: "Trap: Metronidazole is no longer preferred first-line when fidaxomicin or vancomycin is available." },
        { f: "How is fulminant C. difficile infection treated?", b: "High-dose oral vancomycin plus IV metronidazole; add rectal vancomycin if ileus.", x: "Fulminant disease means hypotension, shock, ileus, or megacolon; IV metronidazole reaches inflamed colon systemically.", t: "Trap: IV vancomycin treats bloodstream gram-positives but does not reach the gut lumen for C. difficile." },
        { f: "How are recurrent C. difficile episodes managed?", b: "Fidaxomicin or vancomycin taper-pulse; consider bezlotoxumab or fecal microbiota therapy for multiple recurrences.", x: "Recurrence reflects disrupted microbiota and persistent spores, so taper or microbiota restoration reduces relapse.", t: "Trap: Antimotility monotherapy can worsen toxin-mediated colitis and is not treatment." }
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
        { f: "What is empiric therapy for CAP in a healthy outpatient without recent antibiotics?", b: "High-dose amoxicillin or doxycycline.", x: "These cover typical pneumococcus; macrolide monotherapy depends on low local pneumococcal resistance.", t: "Trap: Broad combination therapy is for comorbid outpatients or inpatients, not healthy low-risk outpatients." },
        { f: "How are comorbid outpatients with CAP treated empirically?", b: "Amoxicillin/clavulanate or cephalosporin plus macrolide/doxycycline, or respiratory fluoroquinolone alone.", x: "Comorbidities increase risk for resistant pneumococcus and gram-negative pathogens, requiring broader coverage.", t: "Trap: MRSA or Pseudomonas coverage requires specific prior isolation or recent hospitalization with IV antibiotics." },
        { f: "What CURB-65 score generally supports hospitalizing CAP?", b: "Score ≥2.", x: "CURB-65 gives 1 point each for confusion, urea >20, RR ≥30, low BP, and age ≥65.", t: "Trap: A low score does not override hypoxemia, inability to take PO, or unsafe outpatient follow-up." }
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
      explanation: "This is <strong>erythema migrans</strong> — a clinical diagnosis sufficient to treat early localized Lyme disease. Serology is frequently <strong>falsely negative in the first weeks</strong> of infection, so testing should not delay therapy. Oral doxycycline (10–14 days) is first-line.",
      flashcards: [
        { f: "How is erythema migrans after tick exposure managed diagnostically?", b: "Diagnose clinically and treat; do not wait for serology.", x: "Antibodies are often negative in the first weeks, while the expanding annular rash is sufficient for early Lyme disease.", t: "Trap: Two-tier serology is for uncertain or disseminated presentations, not classic erythema migrans." },
        { f: "What is first-line oral therapy for early localized Lyme disease?", b: "Doxycycline for 10 days; amoxicillin or cefuroxime are alternatives.", x: "Doxycycline also covers possible Anaplasma coinfection in endemic tick exposures.", t: "Trap: A single prophylactic doxycycline dose is only for high-risk asymptomatic Ixodes bites, not erythema migrans." },
        { f: "When is Lyme serology most appropriate?", b: "Suspected disseminated Lyme disease such as AV block, facial palsy, meningitis, or arthritis.", x: "Later disease has a stronger antibody response, so two-tier testing is more sensitive and specific.", t: "Trap: Testing low-pretest-probability fatigue or aches creates false positives." }
      ]
    },
    {
      id: "id-latent-tb",
      system: "ID",
      task: "NEXT",
      vignette: "An asymptomatic 41-year-old nurse has a positive interferon-gamma release assay on pre-employment screening. She has no cough, fever, night sweats, or weight loss. Chest radiograph is normal. She has never been treated for tuberculosis and has no known hepatic disease.",
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
        { f: "What defines latent TB infection after a positive IGRA?", b: "Positive IGRA or TST with no TB symptoms and a normal chest radiograph.", x: "Active pulmonary disease must be excluded first because monotherapy would select resistance.", t: "Trap: A positive IGRA cannot distinguish latent from active TB; symptoms and imaging do." },
        { f: "What preferred short-course regimens treat latent TB infection?", b: "4 months daily rifampin or 3 months weekly isoniazid plus rifapentine.", x: "Rifamycin-based regimens have higher completion and less hepatotoxicity than 9 months of isoniazid.", t: "Trap: Check drug interactions; rifamycins induce CYP enzymes and can reduce DOAC or contraceptive levels." },
        { f: "Why can latent TB be treated with one or two drugs but active TB cannot?", b: "Latent TB has low organism burden; active TB requires multidrug therapy to prevent resistance.", x: "Rapidly replicating bacilli in active disease harbor spontaneous resistant mutants unless treated with combination therapy.", t: "Trap: Never start latent TB monotherapy until active TB has been ruled out." }
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
        { f: "Who is appropriate for home sleep apnea testing?", b: "Uncomplicated adults with high pretest probability of moderate-to-severe OSA.", x: "Home testing performs best when the clinical likelihood is high and there is no major cardiopulmonary or neuromuscular disease.", t: "Trap: Negative or inconclusive home testing requires in-lab polysomnography if suspicion remains." },
        { f: "Which hypertension pattern should prompt screening for OSA symptoms?", b: "Resistant hypertension.", x: "Intermittent hypoxemia and sympathetic surges worsen BP control and often coexist with obesity and daytime sleepiness.", t: "Trap: Do not screen by sleepiness alone; snoring, witnessed apneas, and resistant HTN are key clues." },
        { f: "What is first-line treatment for symptomatic obstructive sleep apnea?", b: "CPAP.", x: "Positive airway pressure splints the upper airway, improving sleepiness, quality of life, and blood pressure.", t: "Trap: Weight loss helps but should not delay CPAP in symptomatic moderate-to-severe OSA." }
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
        { f: "What is first-line anticoagulation for hemodynamically stable pulmonary embolism?", b: "A DOAC; apixaban or rivaroxaban can start without heparin lead-in.", x: "DOACs are as effective as warfarin for most VTE and cause less intracranial bleeding, with simpler outpatient use.", t: "Trap: Dabigatran and edoxaban require initial parenteral anticoagulation; apixaban/rivaroxaban do not." },
        { f: "When is systemic thrombolysis indicated for pulmonary embolism?", b: "Massive PE with hypotension or shock.", x: "Thrombolysis rapidly relieves obstructive shock but increases major bleeding, so it is reserved for instability.", t: "Trap: RV strain with normal BP is submassive PE; anticoagulation is usual unless deterioration occurs." },
        { f: "How long is anticoagulation given for VTE provoked by a transient risk factor?", b: "3 months.", x: "After surgery, travel, or estrogen exposure, recurrence risk falls once the provoking factor is gone.", t: "Trap: Unprovoked or persistent-risk VTE often needs extended therapy if bleeding risk is acceptable." }
      ]
    },
    {
      id: "pulm-copd-dx",
      system: "PULM",
      task: "TEST",
      vignette: "A 58-year-old man with a 35-pack-year smoking history reports 2 years of progressive exertional dyspnea and a chronic productive cough. Examination reveals a prolonged expiratory phase and scattered wheezes. You suspect chronic obstructive pulmonary disease.",
      leadIn: "What is required to confirm the diagnosis?",
      options: [
        "An elevated serum alpha-1 antitrypsin level.",
        "Hyperinflation on chest radiograph.",
        "A post-bronchodilator FEV1/FVC ratio below 0.70 on spirometry.",
        "A DLCO below 80% of predicted."
      ],
      correct: 2,
      explanation: "COPD is confirmed by demonstrating <strong>fixed airflow obstruction: a post-bronchodilator FEV1/FVC &lt; 0.70</strong>. Imaging and DLCO support assessment but are not diagnostic. Alpha-1 antitrypsin should be checked at least once in every COPD patient but is a cause, not the definition.",
      flashcards: [
        { f: "What spirometry result confirms COPD?", b: "Post-bronchodilator FEV1/FVC <0.70.", x: "Persistent airflow obstruction after bronchodilator distinguishes COPD from fully reversible asthma physiology.", t: "Trap: CT emphysema or symptoms support COPD but do not replace diagnostic spirometry." },
        { f: "Which interventions improve survival in COPD?", b: "Smoking cessation and long-term oxygen for severe resting hypoxemia.", x: "Oxygen improves survival when PaO₂ ≤55 mm Hg or SaO₂ ≤88%, or slightly higher PaO₂ with cor pulmonale/polycythemia.", t: "Trap: Inhalers reduce symptoms/exacerbations but have not matched the survival benefit of quitting smoking and indicated oxygen." },
        { f: "Who with COPD should be tested for alpha-1 antitrypsin deficiency?", b: "All patients with COPD at least once.", x: "Testing is especially high-yield with young onset, minimal smoking, basilar emphysema, or family history.", t: "Trap: Do not restrict testing only to never-smokers; guidelines recommend once-per-patient testing." }
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
        "Accept the elevated serum urate as diagnostic of gout.",
        "Arthrocentesis with polarized light microscopy of synovial fluid.",
        "Plain radiograph of the foot.",
        "Begin empiric allopurinol and reassess in 2 weeks."
      ],
      correct: 1,
      explanation: "Definitive diagnosis of crystal arthropathy — and exclusion of septic arthritis — requires <strong>arthrocentesis</strong>. Gout shows <strong>needle-shaped, negatively birefringent</strong> monosodium urate crystals. Serum urate may be normal during an acute flare, and starting urate-lowering therapy alone during a flare does not treat the acute attack.",
      flashcards: [
        { f: "On synovial fluid microscopy, how do gout and pseudogout crystals differ?", b: "Gout: needle-shaped, negatively birefringent MSU; pseudogout: rhomboid, weakly positively birefringent CPPD.", x: "Crystal identification also helps exclude septic arthritis, which can mimic or coexist with crystal disease.", t: "Trap: Do not diagnose acute monoarthritis by serum urate alone; aspirate when diagnosis or infection is uncertain." },
        { f: "Can a normal serum urate level during an acute flare rule out gout?", b: "No; serum urate may be normal or low during a gout flare.", x: "Inflammation and renal handling can transiently lower urate, so synovial fluid crystals are the diagnostic gold standard.", t: "Trap: Hyperuricemia is common and not diagnostic without compatible arthritis or crystals." },
        { f: "If a patient on allopurinol develops an acute gout flare, what should be done with it?", b: "Continue allopurinol; treat the flare and use prophylaxis when starting urate-lowering therapy.", x: "Stopping urate-lowering therapy causes urate swings that can prolong or trigger flares.", t: "Trap: Do not start urate lowering alone for acute pain; use NSAID, colchicine, or glucocorticoid for the flare." }
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
        { f: "What is the first step in suspected giant cell arteritis with visual symptoms?", b: "Immediate high-dose glucocorticoids, preferably IV methylprednisolone.", x: "Vision loss can become permanent within hours to days, so treatment precedes diagnostic confirmation.", t: "Trap: Temporal artery biopsy is important but must not delay steroids." },
        { f: "After starting steroids for suspected GCA, how long can temporal artery biopsy remain positive?", b: "At least 2 weeks.", x: "Skip lesions require an adequate specimen, but histologic arteritis often persists after therapy begins.", t: "Trap: A negative biopsy does not fully exclude GCA if clinical suspicion is high or disease is segmental." },
        { f: "Which clinical clues strongly suggest giant cell arteritis?", b: "Age >50, new headache, jaw claudication, visual symptoms, and ESR/CRP elevation.", x: "Polymyalgia rheumatica symptoms occur in about half, reflecting shared large-vessel inflammation.", t: "Trap: Jaw claudication is ischemic chewing pain, not TMJ clicking or chronic jaw soreness." }
      ]
    },
    {
      id: "rheum-ra-mtx",
      system: "RHEUM",
      task: "RX",
      vignette: "A 44-year-old woman has 3 months of symmetric pain and swelling of the MCP and PIP joints of both hands with 90 minutes of morning stiffness. Examination confirms synovitis. Anti-CCP antibodies are strongly positive and radiographs show periarticular osteopenia without erosions.",
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
        { f: "Which autoantibody is most specific for rheumatoid arthritis?", b: "Anti-CCP antibody.", x: "Anti-CCP also predicts erosive disease; rheumatoid factor is less specific and can appear in infections or other autoimmune disease.", t: "Trap: A positive RF alone is not diagnostic of RA." },
        { f: "What is first-line disease-modifying therapy for rheumatoid arthritis?", b: "Methotrexate with folic acid supplementation.", x: "Early DMARD therapy prevents erosions and disability; monitor CBC, liver tests, renal function, and hepatitis status.", t: "Trap: Methotrexate is teratogenic; avoid in pregnancy and significant liver disease." },
        { f: "What role do NSAIDs and glucocorticoids have in rheumatoid arthritis?", b: "Symptom relief or short bridge therapy; they do not prevent joint destruction alone.", x: "Inflammation control with DMARDs is needed to change the structural course of RA.", t: "Trap: Pain improvement on prednisone should not delay starting a DMARD." }
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
        "Oral salt tablets and a vasopressin receptor antagonist.",
        "Fluid restriction alone.",
        "Rapid infusion of isotonic saline at 500 mL/h.",
        "A 100-mL bolus of 3% hypertonic saline, repeated as needed for symptoms."
      ],
      correct: 3,
      explanation: "Severe symptomatic hyponatremia (seizures, obtundation) is treated with <strong>100-mL boluses of 3% saline</strong> to urgently raise sodium by 4–6 mEq/L and stop cerebral edema. This is SIADH (euvolemic, concentrated urine, urine Na &gt; 30); isotonic saline can paradoxically worsen the sodium. Correction must not exceed ~8 mEq/L per 24 h to avoid osmotic demyelination.",
      flashcards: [
        { f: "How is severe symptomatic hyponatremia with seizure treated?", b: "3% saline 100-mL IV boluses to raise Na by 4–6 mEq/L initially.", x: "A small rapid rise reduces cerebral edema; after symptoms improve, slow correction prevents demyelination.", t: "Trap: Fluid restriction is for chronic SIADH, not a seizure from acute severe hyponatremia." },
        { f: "What is the maximum usual sodium correction in hyponatremia per 24 hours?", b: "≤8 mEq/L in 24 hours.", x: "Overcorrection can cause osmotic demyelination, especially with alcoholism, malnutrition, liver disease, or hypokalemia.", t: "Trap: Symptom control needs only a 4–6 mEq/L rise, not normalization in one day." },
        { f: "What lab pattern supports SIADH as the cause of hyponatremia?", b: "Euvolemia, serum osm <275, urine osm >100, and urine Na >30 mEq/L.", x: "ADH-driven water retention keeps urine inappropriately concentrated despite hypotonic plasma.", t: "Trap: Isotonic saline can worsen SIADH because sodium is excreted while water is retained." }
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
        { f: "Which urine/lab pattern supports prerenal azotemia?", b: "FeNa <1%, BUN:Cr >20:1, bland sediment, and concentrated urine.", x: "Intact tubules avidly reclaim sodium and water in response to low effective arterial volume.", t: "Trap: FeNa can be misleading on diuretics; use FeUrea instead." },
        { f: "Which urine findings support acute tubular necrosis rather than prerenal AKI?", b: "FeNa >2% with muddy brown granular casts.", x: "Tubular injury impairs sodium reabsorption and sheds pigmented epithelial casts into urine.", t: "Trap: ATN may follow prolonged prerenal hypoperfusion; persistent AKI after fluids suggests tubular injury." },
        { f: "What fractional excretion test is preferred for AKI evaluation in patients taking diuretics?", b: "Fractional excretion of urea; <35% suggests prerenal azotemia.", x: "Diuretics increase urinary sodium and falsely elevate FeNa, but urea handling is less affected.", t: "Trap: Do not rely on FeNa alone after loop or thiazide exposure." }
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
        "Bone marrow biopsy.",
        "A trial of oral iron for 3 months, then reassess.",
        "Bidirectional endoscopy (colonoscopy and upper endoscopy).",
        "Serum erythropoietin level."
      ],
      correct: 2,
      explanation: "New iron deficiency anemia in a man (or postmenopausal woman) is <strong>presumed gastrointestinal blood loss until proven otherwise</strong> — occult malignancy must be excluded with colonoscopy and upper endoscopy, regardless of symptoms. Iron alone would mask the underlying lesion.",
      flashcards: [
        { f: "What evaluation is required for new iron deficiency anemia in a man?", b: "Bidirectional endoscopy: colonoscopy and upper endoscopy.", x: "Occult GI blood loss, including malignancy, is presumed until proven otherwise even without GI symptoms.", t: "Trap: Iron replacement alone can correct anemia while delaying cancer diagnosis." },
        { f: "What ferritin level strongly supports iron deficiency anemia?", b: "Ferritin <30 ng/mL.", x: "Ferritin reflects iron stores but rises with inflammation, so iron deficiency may exist at higher ferritin in chronic disease.", t: "Trap: A normal ferritin does not exclude iron deficiency during inflammation or liver disease." },
        { f: "How do iron studies distinguish IDA from anemia of chronic disease?", b: "IDA: low ferritin, low iron, high TIBC. ACD: normal/high ferritin, low iron, low TIBC.", x: "Inflammation raises hepcidin, trapping iron in macrophages and lowering transferrin production.", t: "Trap: Both can have low serum iron; TIBC and ferritin provide the distinction." }
      ]
    },
    {
      id: "heme-hit",
      system: "HEME",
      task: "NEXT",
      vignette: "A 70-year-old woman on postoperative day 7 after hip arthroplasty, receiving prophylactic unfractionated heparin, develops a platelet count of 62,000/µL (from 210,000 on admission) and a new swollen, painful left leg. Doppler confirms a DVT. Her 4Ts score is high.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Start warfarin immediately as monotherapy.",
        "Transfuse platelets and continue heparin at a lower dose.",
        "Switch unfractionated heparin to low-molecular-weight heparin.",
        "Stop all heparin products and start a non-heparin anticoagulant such as argatroban."
      ],
      correct: 3,
      explanation: "A &gt; 50% platelet fall on days 5–10 of heparin plus new thrombosis is <strong>heparin-induced thrombocytopenia with thrombosis</strong>. All heparin — including LMWH and line flushes — must stop, and a <strong>non-heparin anticoagulant</strong> (argatroban, bivalirudin, or fondaparinux) started. Platelet transfusion fuels thrombosis, and warfarin risks venous limb gangrene until platelets recover.",
      flashcards: [
        { f: "When should heparin-induced thrombocytopenia be suspected?", b: ">50% platelet fall 5–10 days after heparin exposure, especially with new thrombosis.", x: "HIT antibodies activate platelets through PF4-heparin complexes, creating a paradoxically prothrombotic state.", t: "Trap: Platelets often do not fall below 20,000/µL; severe thrombocytopenia suggests another cause." },
        { f: "What is the immediate management of suspected HIT with thrombosis?", b: "Stop all heparin and start argatroban, bivalirudin, or fondaparinux.", x: "All heparin sources include LMWH and line flushes; alternative anticoagulation prevents new and progressive thrombosis.", t: "Trap: Do not wait for confirmatory PF4 testing when clinical probability is intermediate/high." },
        { f: "What should be avoided initially in HIT?", b: "Platelet transfusion and warfarin until platelets recover to >150,000/µL.", x: "Warfarin before recovery can rapidly lower protein C and cause venous limb gangrene.", t: "Trap: HIT is thrombotic, not bleeding; platelet transfusion is avoided unless life-threatening bleeding exists." }
      ]
    },

    /* ================= Oncology (6%) ================= */
    {
      id: "onc-tls",
      system: "ONC",
      task: "RX",
      vignette: "A 23-year-old man with newly diagnosed Burkitt lymphoma develops oliguria, tetany, and an irregular pulse 36 hours after starting chemotherapy. Labs: potassium 6.8 mEq/L, phosphorus 8.1 mg/dL, calcium 6.2 mg/dL, uric acid 15 mg/dL, creatinine 3.1 mg/dL (baseline 0.9).",
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
        { f: "What electrolyte pattern defines tumor lysis syndrome?", b: "Hyperkalemia, hyperphosphatemia, hyperuricemia, hypocalcemia, often with AKI.", x: "Rapid tumor cell breakdown releases intracellular potassium, phosphate, and nucleic acids that become uric acid.", t: "Trap: Treat symptomatic hypocalcemia only; routine calcium can worsen calcium-phosphate precipitation." },
        { f: "In established tumor lysis syndrome, why choose rasburicase over allopurinol?", b: "Rasburicase degrades existing uric acid; allopurinol only prevents new uric acid formation.", x: "Rasburicase rapidly lowers urate but is contraindicated in G6PD deficiency due to hemolysis/methemoglobinemia risk.", t: "Trap: Allopurinol is useful prophylaxis, not rapid rescue for marked existing hyperuricemia." },
        { f: "What is the main prevention strategy for tumor lysis syndrome before chemotherapy?", b: "Aggressive IV hydration, with risk-based urate-lowering prophylaxis.", x: "High urine flow limits uric acid and calcium-phosphate crystal deposition in renal tubules.", t: "Trap: Urine alkalinization is not recommended because it promotes calcium-phosphate precipitation." }
      ]
    },
    {
      id: "onc-hypercalcemia",
      system: "ONC",
      task: "RX",
      vignette: "A 61-year-old woman with squamous cell lung cancer presents with confusion, polyuria, constipation, and dehydration. Serum calcium is 14.6 mg/dL, albumin is normal, and PTH is suppressed with an elevated PTH-related peptide.",
      leadIn: "What is the most appropriate FIRST step in treatment?",
      options: [
        "Hemodialysis.",
        "IV zoledronic acid alone.",
        "Oral furosemide.",
        "Aggressive IV isotonic saline."
      ],
      correct: 3,
      explanation: "Severe hypercalcemia of malignancy is treated first with <strong>aggressive isotonic saline</strong> — these patients are profoundly volume-depleted. Calcitonin adds rapid (hours) but short-lived lowering, while <strong>IV bisphosphonates</strong> are the definitive therapy though they take 2–4 days. Loop diuretics are only for volume overload after repletion; dialysis is for refractory cases or renal failure.",
      flashcards: [
        { f: "What is the first treatment step for severe hypercalcemia of malignancy?", b: "Aggressive IV isotonic saline.", x: "Hypercalcemia causes nephrogenic diabetes insipidus and vomiting, leading to profound volume depletion and reduced calciuresis.", t: "Trap: Loop diuretics are only for volume overload after repletion, not first-line calcium lowering." },
        { f: "How do calcitonin and IV bisphosphonates differ in hypercalcemia treatment?", b: "Calcitonin works in hours but wanes by ~48 h; IV bisphosphonates take 2–4 days and are definitive.", x: "Use calcitonin for a rapid bridge while zoledronic acid or pamidronate suppress osteoclast-mediated resorption.", t: "Trap: Do not rely on calcitonin alone for sustained control." },
        { f: "What lab pattern suggests humoral hypercalcemia of malignancy?", b: "High calcium, suppressed PTH, and elevated PTHrP.", x: "Squamous cancers commonly secrete PTHrP; bone metastases and lymphoma calcitriol are other mechanisms.", t: "Trap: Primary hyperparathyroidism has non-suppressed PTH, not elevated PTHrP." }
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
      explanation: "She is within the <strong>4.5-hour window</strong> for IV thrombolysis with no contraindications, and her blood pressure is below the <strong>185/110 treatment threshold</strong>. Thrombolysis is the single most effective acute therapy; aspirin is withheld for 24 hours after lysis, and anticoagulation has no role in acute ischemic stroke treatment.",
      flashcards: [
        { f: "What time window and BP threshold allow IV thrombolysis for acute ischemic stroke?", b: "Within 4.5 hours of last-known-well and BP <185/110 before treatment.", x: "Eligible patients need rapid noncontrast head CT to exclude hemorrhage before alteplase or tenecteplase.", t: "Trap: Mildly elevated BP below 185/110 is not a reason to withhold thrombolysis." },
        { f: "After IV thrombolysis for ischemic stroke, what is done for the next 24 hours?", b: "Keep BP <180/105 and hold antiplatelets/anticoagulants until repeat imaging.", x: "Early antithrombotics increase hemorrhagic transformation risk after fibrinolysis.", t: "Trap: Aspirin is appropriate when no lysis is given, but it is delayed 24 hours after lysis." },
        { f: "Which stroke patients may benefit from mechanical thrombectomy up to 24 hours?", b: "Selected patients with anterior large-vessel occlusion and favorable imaging mismatch.", x: "Thrombectomy physically removes clot and is additive to IV thrombolysis when both are indicated.", t: "Trap: Thrombectomy eligibility does not mean skipping IV lysis if the patient is eligible and within window." }
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
        "Start donepezil for presumed underlying dementia.",
        "Scheduled lorazepam every 6 hours to control agitation.",
        "Soft wrist restraints overnight to protect the IV line and catheter.",
        "Nonpharmacologic measures: reorient, restore hearing aids, remove the catheter, and stop deliriogenic drugs."
      ],
      correct: 3,
      explanation: "Acute, fluctuating inattention in a hospitalized elder is <strong>delirium</strong>. First-line management is <strong>nonpharmacologic</strong>: reorientation, sensory aids, sleep protocols, mobilization, removing catheters/restraints, and discontinuing deliriogenic drugs (anticholinergics like diphenhydramine, benzodiazepines). Benzodiazepines and restraints worsen delirium; antipsychotics are reserved for dangerous agitation.",
      flashcards: [
        { f: "What CAM features diagnose delirium in a hospitalized older adult?", b: "Acute fluctuating course and inattention, plus disorganized thinking or altered consciousness.", x: "Inattention is the core feature that distinguishes delirium from baseline dementia.", t: "Trap: Dementia is chronic and progressive; delirium is acute, fluctuating, and often reversible." },
        { f: "What is first-line management of hospital delirium?", b: "Nonpharmacologic bundle: reorientation, sensory aids, sleep, mobilization, remove catheters, stop deliriogenic drugs.", x: "Correcting triggers and restoring normal cues treats the brain dysfunction without adding sedating toxicity.", t: "Trap: Diphenhydramine, benzodiazepines, restraints, and Foley catheters often worsen delirium." },
        { f: "When are medications used for delirium agitation?", b: "Low-dose antipsychotic only if agitation threatens safety; benzodiazepines mainly for alcohol/benzo withdrawal.", x: "Sedatives can worsen confusion, falls, and aspiration, so use the lowest dose for the shortest time.", t: "Trap: Treat insomnia or restlessness with environmental measures first, not routine sedatives." }
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
      explanation: "Acute idiopathic/viral pericarditis is treated with a <strong>high-dose NSAID (or aspirin) plus colchicine</strong>; colchicine halves the recurrence rate. Glucocorticoids INCREASE recurrence and are reserved for NSAID contraindications, uremic or autoimmune pericarditis. Diffuse ST elevation with PR depression should not be mistaken for STEMI, and anticoagulation adds hemorrhagic-effusion risk.",
      flashcards: [
        { f: "What clinical and ECG findings suggest acute pericarditis?", b: "Pleuritic positional chest pain, friction rub, diffuse concave ST elevation, and PR depression.", x: "Inflamed pericardium causes pain worse supine and better leaning forward; ECG changes are widespread rather than territorial.", t: "Trap: STEMI has regional ST elevation with reciprocal changes, not diffuse PR depression." },
        { f: "What is first-line treatment for idiopathic or viral acute pericarditis?", b: "High-dose NSAID or aspirin plus colchicine.", x: "Colchicine reduces inflammatory recurrence when added to anti-inflammatory therapy.", t: "Trap: Anticoagulation is not analgesia and may increase hemorrhagic effusion risk." },
        { f: "Why are glucocorticoids avoided as routine initial therapy for acute pericarditis?", b: "They increase recurrence risk.", x: "Reserve steroids for NSAID contraindication or specific etiologies such as autoimmune or uremic pericarditis.", t: "Trap: Quick symptom relief with steroids can create rebound recurrent pericarditis." }
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
      explanation: "Hypercalcemia with a non-suppressed PTH is PTH-dependent: primary hyperparathyroidism or <strong>familial hypocalciuric hypercalcemia (FHH)</strong>. A <strong>24-hour urine calcium</strong> distinguishes them — FHH shows low urinary calcium (calcium/creatinine clearance ratio &lt; 0.01) and is benign, requiring no surgery. Imaging (sestamibi) localizes disease only AFTER the biochemical diagnosis is secure.",
      flashcards: [
        { f: "Hypercalcemia with non-suppressed PTH suggests which two diagnoses?", b: "Primary hyperparathyroidism or familial hypocalciuric hypercalcemia.", x: "PTH should be suppressed by hypercalcemia; a normal or high value is inappropriate and PTH-dependent.", t: "Trap: Malignancy hypercalcemia usually suppresses PTH." },
        { f: "What urine test distinguishes FHH from primary hyperparathyroidism?", b: "24-hour urine calcium with Ca/Cr clearance ratio; FHH is typically <0.01.", x: "FHH has altered calcium-sensing receptor set point, causing renal calcium retention and mild lifelong hypercalcemia.", t: "Trap: Parathyroidectomy does not correct FHH, so identify it before surgery." },
        { f: "Name key surgery indications for asymptomatic primary hyperparathyroidism.", b: "Age <50, Ca >1 mg/dL above normal, osteoporosis/fracture, eGFR <60, stones, or high urine calcium.", x: "These features predict renal or skeletal complications even without classic symptoms.", t: "Trap: Sestamibi localizes a gland only after biochemical diagnosis; it does not diagnose PHPT." }
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
        { f: "What ascitic fluid PMN count diagnoses spontaneous bacterial peritonitis?", b: "PMN ≥250 cells/µL.", x: "Culture may be negative, so PMN threshold drives empiric treatment in cirrhosis with ascites.", t: "Trap: Do not wait for positive ascitic cultures before starting cefotaxime or ceftriaxone." },
        { f: "When treating SBP, what albumin regimen reduces hepatorenal syndrome?", b: "Albumin 1.5 g/kg day 1 and 1 g/kg day 3.", x: "Albumin expands effective arterial volume and lowers renal failure and mortality risk, especially with renal dysfunction or high bilirubin.", t: "Trap: Albumin is adjunctive; it does not replace third-generation cephalosporin therapy." },
        { f: "After recovery from SBP, what long-term prevention is indicated?", b: "Lifelong secondary antibiotic prophylaxis.", x: "Prior SBP has a high recurrence risk because ascitic immune defenses remain impaired.", t: "Trap: Stopping antibiotics after the acute course without prophylaxis invites recurrence." }
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
        { f: "In stable suspected infective endocarditis, what comes before antibiotics?", b: "Obtain 3 sets of blood cultures from separate venipuncture sites.", x: "IE bacteremia is usually continuous, and antibiotics before cultures are a leading cause of culture-negative endocarditis.", t: "Trap: If the patient is septic or unstable, cultures are still drawn promptly but antibiotics are not delayed." },
        { f: "What are the modified Duke major criteria for infective endocarditis?", b: "Typical positive blood cultures and evidence of endocardial involvement on echocardiography.", x: "Major microbiology includes organisms such as S. aureus, viridans streptococci, enterococci, and HACEK.", t: "Trap: Fever and murmur are supportive minor clues, not Duke major criteria by themselves." },
        { f: "What is the echocardiography sequence for suspected endocarditis?", b: "TTE first, then TEE if TTE is negative/nondiagnostic or prosthetic valve/device is present.", x: "TEE is more sensitive for vegetations, abscesses, prosthetic valves, and intracardiac devices.", t: "Trap: A negative TTE does not exclude IE when suspicion remains high." }
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
        { f: "What are Light's criteria for an exudative pleural effusion?", b: "Any one: pleural/serum protein >0.5, pleural/serum LDH >0.6, or pleural LDH >2/3 serum ULN.", x: "The criteria are highly sensitive for inflammation-driven pleural disease and intentionally overcall some transudates.", t: "Trap: Meeting just one criterion is enough to classify the effusion as exudative." },
        { f: "What pathophysiology separates transudative from exudative pleural effusions?", b: "Transudates reflect pressure/oncotic imbalance; exudates reflect pleural inflammation or injury.", x: "HF, cirrhosis, and nephrotic syndrome cause transudates; infection, malignancy, and PE cause exudates.", t: "Trap: Diuresed HF can pseudo-exudate by Light's criteria; use serum-pleural albumin gradient if uncertain." },
        { f: "When does a parapneumonic effusion require chest tube drainage?", b: "Frank pus, pH <7.2, glucose <60 mg/dL, positive culture/Gram stain, or loculation.", x: "Low pH or glucose signals bacterial metabolism and impaired host clearance, making antibiotics alone insufficient.", t: "Trap: A small free-flowing effusion with normal pH/glucose may only need antibiotics." }
      ]
    },
    {
      id: "rheum-axspa",
      system: "RHEUM",
      task: "DX",
      vignette: "A 26-year-old man has 8 months of insidious low back pain and buttock pain with morning stiffness lasting 90 minutes. Pain improves with exercise, worsens with rest, and wakes him in the second half of the night. Examination shows reduced lumbar flexion. Neurologic examination is normal.",
      leadIn: "What is the most appropriate initial diagnostic study?",
      options: [
        "Bone scan.",
        "Immediate MRI of the entire spine.",
        "HLA-B27 testing alone.",
        "Plain radiographs of the sacroiliac joints."
      ],
      correct: 3,
      explanation: "This is <strong>inflammatory back pain</strong> (age &lt; 45, insidious onset &gt; 3 months, morning stiffness, improvement with exercise, night pain) suggesting axial spondyloarthritis. The first imaging study is <strong>plain radiography of the sacroiliac joints</strong>; MRI of the SI joints follows if radiographs are normal but suspicion persists. HLA-B27 supports but never makes the diagnosis alone.",
      flashcards: [
        { f: "What features define inflammatory back pain suggestive of axial spondyloarthritis?", b: "Onset <45, insidious >3 months, morning stiffness, improves with exercise, worse with rest, night pain.", x: "Inflammatory pain improves with movement because stiffness reflects sacroiliac and spinal inflammation, not mechanical strain.", t: "Trap: Mechanical back pain worsens with activity and improves with rest." },
        { f: "What is the first imaging test for suspected axial spondyloarthritis?", b: "Plain radiographs of the sacroiliac joints.", x: "MRI detects early active sacroiliitis if radiographs are normal but clinical suspicion remains high.", t: "Trap: HLA-B27 supports the diagnosis but cannot diagnose axial spondyloarthritis alone." },
        { f: "What is first-line treatment for axial spondyloarthritis?", b: "NSAIDs plus exercise/physical therapy.", x: "Continuous mobility preserves posture and function; TNF or IL-17 inhibitors are used when disease remains active.", t: "Trap: Methotrexate may help peripheral arthritis but is not effective for axial disease." }
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
        { f: "What is the first medication for hyperkalemia with ECG changes?", b: "IV calcium gluconate.", x: "Calcium stabilizes the cardiac membrane within minutes, buying time for shifting and removal therapies.", t: "Trap: Calcium does not lower serum potassium; do not stop after calcium alone." },
        { f: "Which therapies rapidly shift potassium intracellularly?", b: "IV insulin with dextrose and nebulized albuterol.", x: "These stimulate cellular potassium uptake through insulin and beta-2 adrenergic pathways, with temporary effect.", t: "Trap: Sodium bicarbonate is mainly useful when significant metabolic acidosis is present, not routine shifting." },
        { f: "Which treatments remove potassium from the body?", b: "Loop diuretics, GI potassium binders, and hemodialysis.", x: "Removal prevents rebound after temporary intracellular shifting; dialysis is fastest and definitive in ESRD or refractory cases.", t: "Trap: Insulin and albuterol shift potassium but do not eliminate total-body potassium." }
      ]
    },
    {
      id: "heme-b12",
      system: "HEME",
      task: "DX",
      vignette: "A 68-year-old woman has fatigue, a hemoglobin of 10.1 g/dL with an MCV of 112 fL, and new bilateral paresthesias with impaired vibratory and position sense. Serum B12 is 210 pg/mL (low-normal). Methylmalonic acid and homocysteine are both markedly elevated.",
      leadIn: "What is the most appropriate management?",
      options: [
        "Bone marrow biopsy.",
        "Begin high-dose folic acid alone.",
        "Begin vitamin B12 replacement.",
        "Start an SSRI for somatic symptoms."
      ],
      correct: 2,
      explanation: "A low-normal B12 with <strong>elevated methylmalonic acid</strong> confirms tissue B12 deficiency — MMA is the key discriminator, since folate deficiency raises homocysteine but <strong>not MMA</strong>. The neurologic findings (dorsal column dysfunction — subacute combined degeneration) demand prompt B12 repletion; folate alone can correct the anemia while neurologic damage progresses.",
      flashcards: [
        { f: "Which metabolite distinguishes vitamin B12 deficiency from folate deficiency?", b: "Methylmalonic acid; it rises in B12 deficiency but not folate deficiency.", x: "Both deficiencies can raise homocysteine, so MMA is the key biochemical discriminator.", t: "Trap: A low-normal serum B12 can still be true deficiency if MMA is elevated." },
        { f: "What neurologic syndrome is caused by vitamin B12 deficiency?", b: "Subacute combined degeneration of dorsal columns and corticospinal tracts.", x: "Loss of vibration/proprioception, sensory ataxia, and spasticity can occur even before marked macrocytosis.", t: "Trap: Folate deficiency causes megaloblastosis but not dorsal column neurologic disease." },
        { f: "Why should folate not be given alone for megaloblastic anemia until B12 deficiency is excluded?", b: "Folate can correct anemia while B12-related neurologic injury progresses.", x: "Hematologic response can mask the diagnosis and delay irreversible neurologic treatment.", t: "Trap: Treat suspected B12 deficiency promptly; do not wait for neurologic deficits to become irreversible." }
      ]
    },
    {
      id: "onc-feb-neutropenia",
      system: "ONC",
      task: "RX",
      vignette: "A 54-year-old woman on day 10 after chemotherapy for breast cancer presents with a temperature of 38.6 °C and rigors. She looks well, blood pressure is normal, and there is no localizing source. Absolute neutrophil count is 300/µL. Blood cultures are drawn.",
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
        { f: "How is febrile neutropenia defined in a chemotherapy patient?", b: "ANC <500/µL or expected to fall there, plus temp ≥38.3 °C once or ≥38.0 °C sustained.", x: "Neutropenic patients may have few localizing signs, so fever alone can represent life-threatening infection.", t: "Trap: Do not wait for culture results or obvious source before treating." },
        { f: "What empiric antibiotic is first-line for high-risk febrile neutropenia?", b: "Anti-pseudomonal beta-lactam monotherapy such as cefepime, piperacillin-tazobactam, or meropenem.", x: "Pseudomonas coverage within 1 hour reduces mortality; blood cultures should be drawn first if this does not delay therapy.", t: "Trap: Ceftriaxone lacks reliable Pseudomonas coverage for high-risk febrile neutropenia." },
        { f: "When should vancomycin be added to febrile neutropenia therapy?", b: "Catheter infection, skin/soft-tissue infection, pneumonia, hemodynamic instability, or known MRSA risk.", x: "Routine vancomycin adds toxicity and resistance without improving outcomes when gram-positive risk is absent.", t: "Trap: Vancomycin is never adequate monotherapy because it lacks gram-negative/Pseudomonas coverage." }
      ]
    },
    {
      id: "neuro-bell",
      system: "NEURO",
      task: "RX",
      vignette: "A 41-year-old woman awoke yesterday with right facial droop. She cannot raise her right eyebrow, close the right eye completely, or smile on the right. There is no limb weakness, dysarthria, or sensory loss, and the remainder of the neurologic examination is normal.",
      leadIn: "What is the most appropriate management?",
      options: [
        "Urgent CT angiography and thrombolysis evaluation.",
        "Oral prednisone started within 72 hours of onset, plus eye protection.",
        "Observation alone; no therapy changes outcomes.",
        "IV ceftriaxone for presumed Lyme disease."
      ],
      correct: 1,
      explanation: "Weakness involving the <strong>forehead</strong> localizes to a peripheral facial nerve lesion — Bell palsy — not a cortical stroke (which spares the forehead). <strong>Oral glucocorticoids within 72 hours</strong> improve the odds of complete recovery; add lubricating drops/night taping because incomplete eye closure risks exposure keratopathy. Antivirals are optionally added in severe palsy.",
      flashcards: [
        { f: "How does Bell palsy facial weakness differ from cortical stroke facial weakness?", b: "Bell palsy involves the forehead; cortical stroke spares the forehead.", x: "The upper face receives bilateral cortical input, so central lesions usually preserve forehead movement.", t: "Trap: Forehead involvement points peripheral CN VII, but other neurologic deficits still require stroke evaluation." },
        { f: "What treatment improves recovery in Bell palsy if started early?", b: "Oral prednisone within 72 hours of onset.", x: "Steroids reduce facial nerve inflammation and improve the chance of complete functional recovery.", t: "Trap: Antivirals may be added for severe palsy but do not replace corticosteroids." },
        { f: "What eye protection is needed in Bell palsy with incomplete closure?", b: "Lubricating drops by day, ointment and taping or patching at night.", x: "Loss of blinking and lagophthalmos expose the cornea, risking abrasion, ulceration, and vision loss.", t: "Trap: Eye pain or vision change is not benign dryness; evaluate urgently for keratopathy." }
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
        { f: "Who should receive pharmacologic therapy for osteoporosis?", b: "T-score ≤−2.5, hip/vertebral fragility fracture, or osteopenia with FRAX hip ≥3% or major ≥20%.", x: "These thresholds identify patients whose fracture risk is high enough that medication benefits outweigh harms.", t: "Trap: Calcium and vitamin D alone are inadequate once treatment thresholds are met." },
        { f: "How should oral alendronate be taken to reduce esophageal injury?", b: "Take fasting with a full glass of water and remain upright for at least 30 minutes.", x: "Bisphosphonates bind bone but can irritate the esophagus if they reflux or lodge after dosing.", t: "Trap: Avoid oral bisphosphonates with inability to sit upright, major esophageal disease, or eGFR <30–35." },
        { f: "Who should be screened for osteoporosis with DEXA?", b: "All women ≥65, and younger postmenopausal women with elevated fracture risk.", x: "DEXA T-score compares bone density with young adult peak bone mass to classify osteopenia and osteoporosis.", t: "Trap: A Z-score is for age-matched comparison, not the standard diagnostic threshold in postmenopausal osteoporosis." }
      ]
    },
    {
      id: "crit-septic-shock",
      system: "CRIT",
      task: "RX",
      vignette: "A 58-year-old man with pneumonia has a blood pressure of 78/44 mm Hg and lactate of 4.2 mEq/L despite a 30 mL/kg crystalloid bolus. Blood cultures were drawn and broad-spectrum antibiotics started within the first hour. He remains hypotensive with a MAP of 55 mm Hg.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Begin stress-dose hydrocortisone as the next step.",
        "Give another 60 mL/kg crystalloid bolus before any vasopressor.",
        "Start dopamine as the first-line vasopressor.",
        "Start norepinephrine to target a MAP of at least 65 mm Hg."
      ],
      correct: 3,
      explanation: "Hypotension persisting after adequate (30 mL/kg) crystalloid defines <strong>septic shock</strong> physiology: start <strong>norepinephrine, the first-line vasopressor</strong>, targeting MAP ≥ 65 mm Hg. Dopamine causes more arrhythmias; indiscriminate further volume risks fluid overload; hydrocortisone is reserved for shock refractory to fluids AND vasopressors.",
      flashcards: [
        { f: "What are the key hour-1 sepsis bundle actions?", b: "Measure lactate, obtain blood cultures before antibiotics, give broad-spectrum antibiotics, and 30 mL/kg crystalloid if hypotensive or lactate ≥4.", x: "Early source-directed antibiotics and perfusion restoration reduce mortality; cultures should not significantly delay antibiotics.", t: "Trap: Do not give fluids blindly forever; reassess perfusion and overload after the initial bolus." },
        { f: "After 30 mL/kg crystalloid, what vasopressor is first-line for septic shock?", b: "Norepinephrine to target MAP ≥65 mm Hg.", x: "Norepinephrine raises vascular tone with fewer arrhythmias than dopamine; vasopressin is commonly added next.", t: "Trap: Dopamine is not preferred except select bradycardic patients with low arrhythmia risk." },
        { f: "How is septic shock defined after adequate fluid resuscitation?", b: "Vasopressors needed to keep MAP ≥65 plus lactate >2 mmol/L.", x: "The definition captures circulatory failure and cellular/metabolic stress despite volume repletion.", t: "Trap: Hypotension alone before fluids is sepsis-induced hypotension; shock requires persistent vasopressor need after fluids." }
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
        { f: "Which bedside maneuvers make the HOCM murmur louder?", b: "Valsalva and standing; squatting and handgrip make it softer.", x: "Lower preload shrinks the LV cavity and worsens dynamic outflow obstruction, intensifying the murmur.", t: "Trap: Aortic stenosis usually gets softer with Valsalva and has delayed carotid upstroke." },
        { f: "What is the feared complication of hypertrophic cardiomyopathy in young athletes?", b: "Sudden cardiac death from ventricular arrhythmia.", x: "Family history, syncope, massive hypertrophy, NSVT, and abnormal BP response help identify ICD candidates.", t: "Trap: Screen first-degree relatives with echocardiography and sometimes genetic testing; do not reassure by normal ECG alone." },
        { f: "What is first-line therapy for symptomatic obstructive HCM?", b: "Beta-blocker; verapamil or diltiazem if beta-blocker not tolerated.", x: "Slowing heart rate improves diastolic filling and reduces dynamic LVOT obstruction.", t: "Trap: Avoid dehydration, diuretics, nitrates, and vasodilators because they can worsen obstruction." }
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
        { f: "What symptom triad suggests pheochromocytoma in a patient with paroxysmal hypertension?", b: "Episodic headache, palpitations, and diaphoresis.", x: "Catecholamine surges cause abrupt adrenergic symptoms and can be triggered by surgery, anesthesia, or certain drugs.", t: "Trap: Sustained essential hypertension is common; the paroxysmal adrenergic spells are the clue." },
        { f: "What is the initial diagnostic test for suspected pheochromocytoma?", b: "Plasma free metanephrines or 24-hour urine fractionated metanephrines.", x: "Metanephrines are continuously produced within the tumor, making them more sensitive than episodic catecholamine levels.", t: "Trap: Localizing imaging comes after biochemical confirmation, not before." },
        { f: "Before pheochromocytoma surgery, what blockade sequence is required?", b: "Alpha-blockade first for 10–14 days, then beta-blockade if needed.", x: "Alpha blockade prevents hypertensive crisis; beta blockade first leaves unopposed alpha vasoconstriction.", t: "Trap: Never start a beta-blocker before alpha blockade in suspected pheochromocytoma." }
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
        "Begin an empiric gluten-free diet and reassess.",
        "Stool culture and ova/parasites.",
        "HLA-DQ2/DQ8 genotyping as the first test."
      ],
      correct: 0,
      explanation: "Diarrhea + refractory iron deficiency + dermatitis herpetiformis is celiac disease until proven otherwise. The best initial test is <strong>tTG-IgA with a total IgA</strong> (IgA deficiency causes false negatives) — obtained <strong>while still eating gluten</strong>. Starting a gluten-free diet first invalidates both serology and biopsy; HLA typing is only useful for its negative predictive value.",
      flashcards: [
        { f: "What is the best initial test for suspected celiac disease?", b: "tTG-IgA plus total IgA while the patient is eating gluten.", x: "IgA deficiency can cause false-negative tTG-IgA; gluten avoidance can normalize serology and biopsy.", t: "Trap: Do not start a gluten-free diet before testing if the patient is stable." },
        { f: "What duodenal biopsy findings confirm celiac disease?", b: "Villous atrophy, crypt hyperplasia, and increased intraepithelial lymphocytes.", x: "Immune-mediated gluten injury reduces absorptive surface, causing diarrhea, weight loss, and iron deficiency.", t: "Trap: Positive serology usually needs biopsy confirmation in adults before lifelong diet labeling." },
        { f: "Which rash is classically associated with celiac disease?", b: "Dermatitis herpetiformis: intensely pruritic vesicles on extensor surfaces.", x: "It reflects granular IgA deposition in dermal papillae and responds to gluten-free diet; dapsone can speed relief.", t: "Trap: Dapsone treats itching but does not replace a strict gluten-free diet." }
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
      explanation: "A CD4 count <strong>below 200/µL</strong> mandates <strong>Pneumocystis jirovecii prophylaxis with TMP-SMX</strong>, which would also cover toxoplasmosis once CD4 falls below 100 with positive IgG. Routine MAC prophylaxis is no longer recommended when effective ART is being started, and primary fluconazole prophylaxis is not standard of care.",
      flashcards: [
        { f: "When is PCP prophylaxis started in HIV?", b: "CD4 < 200/µL (or oropharyngeal candidiasis) — TMP-SMX, which also covers Toxoplasma at CD4 < 100 with positive IgG.", x: "PCP risk rises steeply below CD4 200; TMP-SMX prevents both PCP and many bacterial infections. It also becomes preferred toxoplasma prophylaxis when IgG-positive and CD4 is very low.", t: "Trap: Do not choose aerosolized pentamidine first-line; it does not protect against toxoplasmosis and TMP-SMX is preferred." },
        { f: "Is MAC prophylaxis still routine in HIV?", b: "No — not needed when effective ART is being initiated (historically azithromycin at CD4 < 50).", x: "Effective ART rapidly lowers disseminated MAC risk, so primary azithromycin is usually unnecessary if ART can start promptly. Reserve MAC treatment for proven disease.", t: "Trap: Azithromycin prophylaxis is only considered at CD4 <50 when ART is not started or remains ineffective." },
        { f: "When is ART started relative to an opportunistic infection?", b: "Promptly — within ~2 weeks for most OIs; DELAY in cryptococcal meningitis because early ART worsens IRIS mortality.", x: "Early ART improves survival for most OIs, but CNS cryptococcosis is different because inflammatory swelling can be fatal. Timing is a board favorite.", t: "Trap: Do not delay ART for PCP; the classic delay is cryptococcal meningitis, not most OIs." }
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
        "Increase scheduled albuterol frequency.",
        "Add a long-acting beta-agonist alone to albuterol.",
        "Begin daily oral prednisone."
      ],
      correct: 0,
      explanation: "Symptoms more than twice weekly mean uncontrolled disease on SABA alone — and SABA-only therapy is no longer recommended at any severity because it leaves inflammation untreated. The preferred strategy is <strong>low-dose ICS-formoterol as needed</strong> (escalating to maintenance-and-reliever therapy). <strong>LABA monotherapy without ICS increases asthma deaths</strong>.",
      flashcards: [
        { f: "Why is SABA-only asthma therapy no longer recommended?", b: "It leaves airway inflammation untreated and increases exacerbations and mortality — every adult should receive ICS-containing therapy.", x: "Asthma symptoms reflect airway inflammation even when intermittent; ICS-containing relievers reduce severe exacerbations compared with albuterol alone.", t: "Trap: Frequent SABA use is a marker of poor control, not reassurance that rescue therapy is working." },
        { f: "What is the preferred asthma reliever strategy?", b: "Low-dose ICS-formoterol as needed — also usable as maintenance-and-reliever therapy (MART/SMART).", x: "Formoterol has rapid onset and can safely pair with ICS for reliever use; other LABAs such as salmeterol are not used as rescue therapy.", t: "Trap: ICS-salmeterol is not a reliever strategy; the as-needed regimen specifically uses ICS-formoterol." },
        { f: "Why is LABA monotherapy dangerous in asthma?", b: "Without an inhaled corticosteroid it increases asthma deaths — LABAs must ALWAYS be paired with ICS.", x: "LABA bronchodilation can mask worsening inflammation, so unopposed LABA increases fatal attacks. Combination inhalers avoid that risk.", t: "Trap: COPD may use LABA/LAMA without ICS; asthma requires ICS whenever a LABA is used." }
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
        { f: "What is the serologic strategy in suspected SLE?", b: "ANA is the sensitive SCREEN (negative ANA nearly excludes SLE); anti-dsDNA and anti-Smith are the SPECIFIC confirmators.", x: "ANA is highly sensitive, making it best for screening when pretest probability is reasonable. Specific antibodies help classify disease and organ risk.", t: "Trap: Anti-dsDNA is specific but not sensitive enough to be the initial screening test." },
        { f: "Which drug belongs in essentially every SLE regimen?", b: "Hydroxychloroquine — reduces flares, thrombosis, and organ damage; requires periodic retinal screening.", x: "Hydroxychloroquine is disease-modifying in SLE and lowers flare and thrombosis risk. Eye toxicity is dose- and duration-related, so screening matters.", t: "Trap: Do not reserve hydroxychloroquine only for rash or arthritis; use it broadly unless contraindicated." },
        { f: "How is lupus nephritis detected early?", b: "Regular urinalysis + urine protein/creatinine ratio, with anti-dsDNA and complement (C3/C4) monitoring; biopsy classifies the lesion.", x: "Proteinuria or cellular casts may be the first sign of nephritis; biopsy guides immunosuppression class rather than simply confirming SLE.", t: "Trap: A normal creatinine can miss active nephritis; screen urine, complements, and anti-dsDNA trends." }
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
      explanation: "In proteinuric (albuminuric) CKD — especially diabetic kidney disease — <strong>ACE inhibitors or ARBs are first-line</strong>: they lower intraglomerular pressure and slow progression. The two must <strong>never be combined</strong> (hyperkalemia, AKI). A creatinine rise up to ~30% after initiation is expected and acceptable.",
      flashcards: [
        { f: "What is first-line antihypertensive therapy in proteinuric CKD?", b: "An ACE inhibitor OR an ARB — slows progression; NEVER combine the two (hyperkalemia, AKI).", x: "Efferent arteriolar dilation lowers intraglomerular pressure, reducing albuminuria and long-term scarring. Benefit is strongest when albuminuria is present.", t: "Trap: Do not combine ACEi plus ARB; dual blockade increases AKI and hyperkalemia without outcome benefit." },
        { f: "How much creatinine rise is acceptable after starting an ACEi/ARB?", b: "Up to ~30% within the first weeks — recheck Cr/K in 1–2 weeks; a larger rise suggests bilateral renal artery stenosis.", x: "A small creatinine rise reflects hemodynamic lowering of filtration pressure, not tubular injury. Monitor potassium because aldosterone falls.", t: "Trap: A rise >30% suggests renal artery stenosis, volume depletion, NSAIDs, or overdiuresis." },
        { f: "Which other drug classes slow diabetic CKD progression?", b: "SGLT2 inhibitors (major renal protection), plus finerenone for residual albuminuria in type 2 diabetes.", x: "SGLT2 inhibitors reduce intraglomerular pressure via tubuloglomerular feedback; finerenone blocks mineralocorticoid-driven fibrosis.", t: "Trap: DPP-4 inhibitors lower glucose but do not provide the same kidney-outcome protection." }
      ]
    },
    {
      id: "heme-aiha",
      system: "HEME",
      task: "DX",
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
        { f: "What is the lab signature of hemolysis?", b: "↑ reticulocytes, ↑ LDH, ↑ indirect bilirubin, and LOW haptoglobin.", x: "Low haptoglobin occurs because free hemoglobin binds it during intravascular or brisk extravascular hemolysis. Reticulocytosis shows marrow compensation.", t: "Trap: Isolated anemia with low retics suggests underproduction, not hemolysis." },
        { f: "What test defines autoimmune hemolytic anemia?", b: "A positive direct antiglobulin (Coombs) test — warm AIHA shows IgG with spherocytes on smear.", x: "DAT detects antibody or complement stuck to RBCs; warm IgG disease is usually extravascular splenic clearance with spherocytes.", t: "Trap: Hereditary spherocytosis also has spherocytes but DAT is negative." },
        { f: "What is first-line therapy for warm AIHA?", b: "Glucocorticoids; rituximab or splenectomy for refractory disease — and transfuse unstable patients even without a perfect crossmatch.", x: "Steroids decrease macrophage clearance of IgG-coated RBCs. Life-threatening anemia is transfused despite crossmatch difficulty.", t: "Trap: Do not wait for compatible blood if unstable; give least-incompatible RBCs with blood bank support." }
      ]
    },
    {
      id: "onc-breast-screen",
      system: "ONC",
      task: "RISK",
      vignette: "A 42-year-old average-risk woman asks when she should begin breast cancer screening. She has no family history of breast or ovarian cancer, no prior chest radiation, and no personal history of breast disease.",
      leadIn: "What is the most appropriate recommendation?",
      options: [
        "Biennial screening mammography now, continuing through age 74.",
        "Annual breast MRI.",
        "Delay all screening until age 50.",
        "Clinical breast examination alone every year."
      ],
      correct: 0,
      explanation: "The USPSTF (2024) recommends <strong>biennial screening mammography for all average-risk women ages 40–74</strong>. Breast MRI is reserved for high-risk women (BRCA carriers, prior chest radiation, lifetime risk ≳ 20%); clinical examination alone is not an adequate screening strategy.",
      flashcards: [
        { f: "What is the current USPSTF breast cancer screening recommendation?", b: "Biennial screening mammography for average-risk women ages 40–74 (2024 update).", x: "The 2024 USPSTF update starts average-risk screening at 40 because benefits outweigh harms in that age range. Shared decision-making still matters.", t: "Trap: Annual mammography is not the USPSTF default; it recommends biennial screening." },
        { f: "Who needs supplemental breast MRI screening?", b: "High-risk women: BRCA carriers, chest radiation at a young age, or estimated lifetime risk ≳ 20%.", x: "MRI is more sensitive but causes false positives, so it is reserved for markedly elevated lifetime risk rather than dense breasts alone.", t: "Trap: Average-risk family history does not automatically mean MRI; use genetics/risk modeling." },
        { f: "Which family history features suggest BRCA and warrant genetics referral?", b: "Breast cancer < 50, bilateral or male breast cancer, ovarian/pancreatic cancer, multiple affected relatives, Ashkenazi ancestry.", x: "BRCA patterns cluster breast and ovarian-spectrum cancers and early onset disease. Identifying carriers changes screening and prevention for relatives.", t: "Trap: A single older postmenopausal breast cancer in one relative is less suggestive than early, bilateral, male, or ovarian cancer." }
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
        { f: "Define status epilepticus.", b: "≥ 5 minutes of continuous seizure activity, or recurrent seizures without recovery of consciousness between them.", x: "Neuronal injury risk rises after about 5 minutes, so treatment starts before waiting for spontaneous termination. Recovery between seizures resets the clock.", t: "Trap: Do not use the old 30-minute definition at the bedside; treat at 5 minutes." },
        { f: "What is the first-line drug in status epilepticus?", b: "An IV benzodiazepine — lorazepam IV, or midazolam IM when there is no IV access.", x: "Benzodiazepines rapidly potentiate GABA and stop seizures fastest. Airway monitoring is essential, but respiratory risk is lower than ongoing seizure risk.", t: "Trap: Levetiracetam is second-line loading, not the first medication before benzodiazepine." },
        { f: "What follows benzodiazepines in status epilepticus?", b: "A second-line agent: fosphenytoin, valproate, or levetiracetam — then anesthetic infusions (propofol/midazolam) if refractory.", x: "Longer-acting antiseizure loading prevents recurrence after the benzodiazepine wears off. Refractory cases require ICU anesthetic coma and EEG.", t: "Trap: Repeating small benzodiazepine doses indefinitely delays definitive second-line therapy." }
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
        { f: "How do stress and urge incontinence differ?", b: "Stress: leak with cough/sneeze/exertion (sphincter/pelvic floor failure). Urge: sudden overwhelming need with large-volume leak (detrusor overactivity).", x: "Stress incontinence is a storage problem from outlet weakness; urge incontinence is detrusor overactivity. History usually distinguishes them.", t: "Trap: Postvoid residual is for overflow symptoms, not classic stress leakage with exertion." },
        { f: "What is first-line therapy for stress incontinence?", b: "Pelvic floor muscle (Kegel) training ± weight loss; midurethral sling surgery for refractory cases.", x: "Kegel training strengthens urethral support and is low risk. Benefit depends on correct technique and sustained practice.", t: "Trap: Antimuscarinics treat urge symptoms; they do not fix sphincter weakness in stress incontinence." },
        { f: "What is first-line therapy for urge incontinence?", b: "Bladder training first; then mirabegron or antimuscarinics — beware anticholinergic cognitive effects in older adults.", x: "Bladder training increases functional bladder capacity and suppresses urgency. Drug choice must consider hypertension, cognition, and constipation.", t: "Trap: Oxybutynin is anticholinergic and can worsen confusion, dry mouth, and falls in older adults." }
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
        "IV diphenhydramine and famotidine.",
        "IV methylprednisolone.",
        "Nebulized albuterol alone."
      ],
      correct: 0,
      explanation: "Skin findings plus respiratory compromise and hypotension after an allergen is <strong>anaphylaxis</strong> — the only first-line therapy is <strong>IM epinephrine (0.3–0.5 mg of 1 mg/mL) in the mid-outer thigh</strong>, repeated every 5–15 minutes as needed. Antihistamines, steroids, and bronchodilators are adjuncts that never substitute for or delay epinephrine.",
      flashcards: [
        { f: "What is the first-line treatment of anaphylaxis?", b: "IM epinephrine 0.3–0.5 mg (1 mg/mL) in the mid-outer thigh, repeated every 5–15 min — antihistamines and steroids are adjuncts only.", x: "IM thigh injection gives fast absorption and treats airway edema, bronchospasm, and shock through α and β effects. Delay increases mortality.", t: "Trap: H1 blockers relieve hives only; they do not treat hypotension or airway edema." },
        { f: "What defines anaphylaxis?", b: "Acute onset with skin/mucosal involvement PLUS respiratory compromise, hypotension, or severe GI symptoms after a likely allergen.", x: "Anaphylaxis is clinical; skin findings may be absent, especially with shock. Treat immediately when two organ systems or hypotension follow exposure.", t: "Trap: Do not wait for tryptase or rash if respiratory compromise and hypotension are present." },
        { f: "What follows epinephrine in anaphylaxis?", b: "Supine positioning + IV fluids, airway support, observation for biphasic reactions, and discharge with an epinephrine autoinjector + allergy referral.", x: "Large-volume crystalloid may be needed because vasodilation and capillary leak cause distributive shock. Biphasic reactions can recur after improvement.", t: "Trap: Steroids do not act fast enough for acute treatment and should never delay epinephrine." }
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
        { f: "What is Beck triad?", b: "Hypotension, elevated JVP, and muffled heart sounds — the classic bedside signature of cardiac tamponade.", x: "Tamponade equalizes diastolic pressures and limits ventricular filling. Beck triad is specific but not always complete.", t: "Trap: Muffled sounds may be absent; echo evidence of chamber collapse plus shock drives action." },
        { f: "What is pulsus paradoxus?", b: "An inspiratory fall in systolic BP of more than 10 mm Hg — seen in tamponade (also severe asthma/COPD).", x: "Inspiratory RV filling shifts the septum left, exaggerating the normal systolic BP drop. It marks constrained ventricular filling.", t: "Trap: Pulsus paradoxus also occurs in severe asthma; JVP elevation and echo point to tamponade." },
        { f: "Which drugs are dangerous in cardiac tamponade?", b: "Diuretics, nitrates, and other vasodilators — the ventricle is preload-dependent; give fluids as a bridge to pericardiocentesis.", x: "Because stroke volume depends on preload, reducing venous return can cause circulatory collapse. Drainage is definitive.", t: "Trap: Diuresis helps volume-overload pericardial effusions, not tamponade physiology with shock." }
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
        { f: "Stanford type A vs type B aortic dissection — management?", b: "Type A (ascending aorta) → emergency surgery. Type B (descending only) → medical therapy unless complicated (malperfusion, rupture → TEVAR).", x: "Ascending dissections threaten rupture, tamponade, and coronary involvement, so surgery is urgent. Uncomplicated descending dissections often heal with impulse control.", t: "Trap: Pain location does not classify dissection; anatomy on imaging determines type A vs B." },
        { f: "What are the targets of anti-impulse therapy in dissection?", b: "IV beta-blocker FIRST to HR 60–80/min, then SBP < 120 mm Hg — add a vasodilator only after beta-blockade.", x: "Reducing shear stress requires slowing heart rate before lowering pressure. Reflex tachycardia can extend the intimal tear.", t: "Trap: Nitroprusside before beta-blockade may worsen dissection through reflex sympathetic activation." },
        { f: "Best imaging for suspected aortic dissection?", b: "CT angiography if stable; bedside TEE if hemodynamically unstable (MRI is accurate but slow).", x: "CTA is fast and widely available; TEE is portable for unstable patients or those who cannot leave the resuscitation bay.", t: "Trap: MRI is accurate but too slow for most unstable acute dissections." }
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
      explanation: "An <strong>LDL ≥ 190 mg/dL</strong> (here with tendon xanthomas and premature family CAD → likely <strong>familial hypercholesterolemia</strong>) is a statin benefit group in its own right: start a <strong>high-intensity statin without risk calculation</strong> (risk calculators underestimate lifetime risk). Add ezetimibe (then a PCSK9 inhibitor) if LDL stays ≥ 100 mg/dL. CAC scoring is for the intermediate-risk primary-prevention patient, not this one.",
      flashcards: [
        { f: "What are the four statin benefit groups (ACC/AHA)?", b: "Clinical ASCVD; LDL ≥ 190 mg/dL; diabetes age 40–75; and 10-year ASCVD risk ≥ 7.5% age 40–75 after a risk discussion.", x: "LDL ≥190 implies high lifetime risk and often familial hypercholesterolemia, so treatment does not depend on 10-year calculators.", t: "Trap: Do not order CAC to decide on statin when LDL is already ≥190 mg/dL." },
        { f: "What defines high-intensity statin therapy?", b: "Lowers LDL by ≥ 50%: atorvastatin 40–80 mg or rosuvastatin 20–40 mg daily.", x: "High-intensity dosing targets percent reduction, not just crossing a single LDL threshold. Recheck lipids to confirm adherence and response.", t: "Trap: Simvastatin 20–40 mg is moderate intensity, not high intensity." },
        { f: "When does a coronary artery calcium score help?", b: "Intermediate-risk primary prevention when the statin decision is uncertain — CAC 0 favors deferring; CAC ≥ 100 (or ≥ 75th percentile) favors a statin.", x: "CAC refines risk when benefit is uncertain; calcium burden identifies subclinical plaque and motivates statin use.", t: "Trap: CAC 0 does not override diabetes, LDL ≥190, active smoking, or strong premature family history." }
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
      explanation: "<strong>Resistant hypertension</strong> with <strong>spontaneous hypokalemia</strong> is the classic screen-positive scenario for <strong>primary aldosteronism</strong>, the most common cause of secondary hypertension. Screen with a morning <strong>aldosterone-to-renin ratio</strong>: high aldosterone with suppressed renin is positive. Then confirm (saline infusion or oral sodium loading), image the adrenals with CT, and lateralize with adrenal vein sampling before surgery.",
      flashcards: [
        { f: "Who should be screened for primary aldosteronism?", b: "Resistant hypertension, hypertension with hypokalemia (spontaneous or diuretic-induced), adrenal incidentaloma, hypertension with sleep apnea, or early-onset hypertension/stroke.", x: "Aldosterone excess causes sodium retention, hypertension, potassium wasting, and suppressed renin. Many patients are normokalemic, so screen high-risk HTN.", t: "Trap: Hypokalemia is classic but absent in many cases; resistant hypertension alone can warrant screening." },
        { f: "What is the diagnostic sequence for primary aldosteronism?", b: "Aldosterone-to-renin ratio (high aldosterone, suppressed renin) → confirmatory salt-loading test → adrenal CT → adrenal vein sampling to lateralize.", x: "Confirmatory salt loading proves autonomous aldosterone secretion; CT finds anatomy, but adrenal vein sampling proves laterality.", t: "Trap: Do not send directly to adrenalectomy based only on a CT nodule; incidentalomas are common." },
        { f: "How is primary aldosteronism treated?", b: "Unilateral adenoma → laparoscopic adrenalectomy. Bilateral hyperplasia → mineralocorticoid receptor antagonist (spironolactone or eplerenone).", x: "Removing a unilateral source can cure or improve hypertension; bilateral disease needs receptor blockade to stop aldosterone effects.", t: "Trap: ACE inhibitors are not definitive therapy for bilateral primary aldosteronism; use spironolactone or eplerenone." }
      ]
    },
    {
      id: "endo-t2dm-ascvd",
      system: "ENDO",
      task: "RX",
      vignette: "A 62-year-old man with type 2 diabetes had a myocardial infarction 1 year ago. He takes metformin 1000 mg twice daily, aspirin, high-intensity atorvastatin, metoprolol succinate, and lisinopril. Hemoglobin A1c is 7.9%. eGFR is 72 mL/min/1.73 m²; urine albumin-to-creatinine ratio is normal. LVEF is 55%. BMI is 33.",
      leadIn: "What is the most appropriate addition to his regimen?",
      options: [
        "Glipizide, a sulfonylurea, titrated to fasting glucose.",
        "A GLP-1 receptor agonist with proven cardiovascular benefit (e.g., semaglutide).",
        "Sitagliptin, a DPP-4 inhibitor, for its weight neutrality.",
        "Basal insulin glargine, titrated to fasting glucose 80–130 mg/dL."
      ],
      correct: 1,
      explanation: "In type 2 diabetes with <strong>established ASCVD</strong>, the ADA recommends a <strong>GLP-1 receptor agonist or SGLT2 inhibitor with demonstrated cardiovascular benefit</strong> — <strong>independent of A1c and of metformin use</strong>. With obesity, a GLP-1 RA also delivers weight loss. Sulfonylureas, DPP-4 inhibitors, and insulin lower glucose without reducing major adverse cardiovascular events.",
      flashcards: [
        { f: "T2DM + established ASCVD: which drug classes are preferred?", b: "GLP-1 receptor agonist or SGLT2 inhibitor with proven CV benefit — regardless of A1c or metformin use.", x: "Cardiorenal benefit from these agents is partly independent of glucose lowering, so use them even when A1c is near goal.", t: "Trap: Sulfonylureas lower A1c but have no proven ASCVD outcome benefit and can cause hypoglycemia." },
        { f: "T2DM + heart failure or CKD: which drug class is preferred?", b: "SGLT2 inhibitor — reduces HF hospitalization and slows CKD progression (GLP-1 RA if SGLT2i not tolerated or for added ASCVD/weight benefit).", x: "SGLT2 inhibitors reduce intraglomerular pressure and HF hospitalization; they are prioritized when HF or CKD dominates the phenotype.", t: "Trap: GLP-1 RA is excellent for weight and ASCVD but is not the first choice for symptomatic HF benefit." },
        { f: "What is the general A1c target in nonpregnant adults?", b: "< 7% for most; less stringent (< 8%) for older adults, frailty, limited life expectancy, or hypoglycemia risk.", x: "Targets are individualized by time to benefit, comorbidity, and hypoglycemia risk. Avoid overtreatment in frail or older patients.", t: "Trap: A universal A1c <6.5% is not appropriate for patients at high hypoglycemia risk." }
      ]
    },
    {
      id: "gi-pancreatitis",
      system: "GI",
      task: "RX",
      vignette: "A 47-year-old woman presents with 12 hours of severe epigastric pain radiating to the back with nausea. Lipase is 1,850 U/L (normal < 60). Temperature 37.4 °C, BP 128/76 mm Hg, HR 102/min. Bilirubin 1.1 mg/dL, ALT 92 U/L. Ultrasound shows cholelithiasis with a normal-caliber common bile duct. She is started on moderate goal-directed lactated Ringer's solution and analgesia.",
      leadIn: "In addition, what is the most appropriate management?",
      options: [
        "Prophylactic IV imipenem to prevent infected pancreatic necrosis.",
        "Strict NPO with total parenteral nutrition until lipase normalizes.",
        "Oral feeding as soon as tolerated, with cholecystectomy during this admission.",
        "ERCP within 24 hours to clear the common bile duct."
      ],
      correct: 2,
      explanation: "<strong>Acute pancreatitis</strong> = 2 of 3: typical pain, <strong>lipase ≥ 3× ULN</strong>, or imaging findings. Care is <strong>moderate goal-directed lactated Ringer's</strong> (aggressive fluids increase volume overload without benefit), analgesia, and <strong>early oral feeding</strong> (enteral beats parenteral). <strong>Prophylactic antibiotics are not indicated</strong>. ERCP within 24 h is only for concomitant <strong>cholangitis</strong>; for mild gallstone pancreatitis, <strong>cholecystectomy during the same admission</strong> prevents recurrence.",
      flashcards: [
        { f: "How is acute pancreatitis diagnosed?", b: "2 of 3: characteristic epigastric pain, lipase (or amylase) ≥ 3× ULN, or characteristic imaging findings.", x: "Enzyme elevation alone is insufficient if symptoms and imaging do not fit. Lipase is preferred because it is more pancreas-specific than amylase.", t: "Trap: CT is not required for straightforward early pancreatitis meeting pain plus lipase criteria." },
        { f: "Fluids and nutrition in acute pancreatitis?", b: "Moderate goal-directed lactated Ringer's (not aggressive) and early oral feeding as tolerated; enteral is preferred to TPN.", x: "Early enteral feeding preserves gut barrier function and reduces infections. LR may reduce inflammatory acidosis compared with normal saline.", t: "Trap: Prolonged NPO and routine TPN are outdated unless enteral feeding truly fails." },
        { f: "When is ERCP indicated in gallstone pancreatitis?", b: "Within 24 h only with concomitant cholangitis (or persistent biliary obstruction) — not routinely; cholecystectomy in the same admission if mild.", x: "ERCP treats infected or persistently obstructed ducts; same-admission cholecystectomy prevents recurrent gallstone pancreatitis.", t: "Trap: Prophylactic antibiotics for sterile pancreatitis or necrosis are not indicated." }
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
      explanation: "A reactive HCV antibody shows <strong>exposure</strong>, not necessarily active infection — about 25% clear the virus spontaneously and remain antibody-positive for life. Confirm <strong>viremia with HCV RNA</strong>. If positive, check <strong>HBsAg/anti-HBc</strong> (HBV can reactivate on DAAs) and assess fibrosis noninvasively (FIB-4, elastography) — biopsy is rarely needed. Pangenotypic DAAs cure > 95%.",
      flashcards: [
        { f: "Who should be screened for hepatitis C?", b: "All adults at least once (CDC ≥ 18 y; USPSTF 18–79 y), every pregnancy, and periodically with ongoing risk such as injection drug use.", x: "Universal screening catches silent chronic infection before cirrhosis and hepatocellular carcinoma. Repeat testing is risk-based.", t: "Trap: Birth-cohort-only screening is outdated; all adults need at least one test." },
        { f: "What follows a positive HCV antibody?", b: "HCV RNA — antibody persists after spontaneous clearance or cure, so only RNA proves active infection.", x: "Antibody cannot distinguish past cleared infection from active viremia. RNA also documents cure after treatment.", t: "Trap: Do not diagnose chronic active HCV from antibody positivity alone." },
        { f: "What are the pangenotypic HCV regimens?", b: "Sofosbuvir-velpatasvir × 12 weeks or glecaprevir-pibrentasvir × 8 weeks — SVR > 95%; screen for HBV first (reactivation risk).", x: "DAAs are short, oral, and highly curative; HBV screening prevents flare when HCV suppression removes viral interference.", t: "Trap: Genotype testing is often unnecessary for simplified pangenotypic treatment, but cirrhosis status still matters." }
      ]
    },
    {
      id: "id-meningitis",
      system: "ID",
      task: "NEXT",
      vignette: "A 64-year-old man is brought in with 18 hours of fever, severe headache, and neck stiffness. He is confused and oriented only to person. Temperature 39.6 °C, BP 118/70 mm Hg. Kernig sign is positive. There is no papilledema or focal deficit. Two sets of blood cultures have just been drawn.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Lumbar puncture immediately, then antibiotics based on CSF Gram stain.",
        "Head CT, then lumbar puncture, then antibiotics.",
        "IV dexamethasone, vancomycin, ceftriaxone, and ampicillin now; head CT before lumbar puncture.",
        "IV acyclovir alone pending MRI."
      ],
      correct: 2,
      explanation: "Suspected <strong>bacterial meningitis</strong> requires antibiotics within the first hour — <strong>never delay therapy for imaging or LP</strong>. Altered consciousness is an indication for <strong>CT before LP</strong>, so give treatment first. Empiric adult regimen: <strong>vancomycin + ceftriaxone</strong>, plus <strong>ampicillin if age ≥ 50</strong> or immunocompromised (Listeria). Give <strong>dexamethasone</strong> just before or with the first antibiotic dose (mortality benefit in pneumococcal meningitis).",
      flashcards: [
        { f: "Empiric therapy for community-acquired bacterial meningitis in adults?", b: "Vancomycin + ceftriaxone (or cefotaxime); add ampicillin if age ≥ 50 or immunocompromised to cover Listeria; plus dexamethasone.", x: "Empiric therapy must cover pneumococcus, meningococcus, and resistant strains; older or immunocompromised adults need Listeria coverage.", t: "Trap: Ceftriaxone alone misses resistant pneumococcus and Listeria risk groups." },
        { f: "When is head CT needed before lumbar puncture?", b: "Immunocompromise, known CNS lesion, new seizure, papilledema, altered consciousness, or focal deficit — but start antibiotics before the scan.", x: "CT indications identify mass-effect risk before LP, but meningitis mortality rises when antibiotics are delayed. Draw blood cultures first if possible.", t: "Trap: Do not wait for CT or LP results before giving antibiotics in a toxic patient." },
        { f: "When should dexamethasone be given in bacterial meningitis?", b: "10–20 min before or with the first antibiotic dose; continue only if pneumococcus is confirmed (mortality and hearing benefit).", x: "Steroids blunt inflammatory injury triggered by bacterial lysis, especially pneumococcus. They work only if given before or with antibiotics.", t: "Trap: Starting dexamethasone hours after antibiotics adds little benefit." }
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
        { f: "Purulent vs nonpurulent skin infection — empiric treatment?", b: "Purulent (abscess/furuncle) → I&D ± MRSA-active agent. Nonpurulent cellulitis → cover β-hemolytic strep (cephalexin, cefazolin).", x: "Pus requires drainage because antibiotics penetrate poorly into walled-off collections. Antibiotics are adjunctive when host or systemic risk is higher.", t: "Trap: Nonpurulent cellulitis is usually streptococcal; MRSA coverage is not always needed." },
        { f: "Which oral antibiotics cover community MRSA?", b: "TMP-SMX, doxycycline/minocycline, clindamycin (variable resistance), and linezolid.", x: "TMP-SMX and doxycycline cover MRSA but have weaker streptococcal coverage, so combine if cellulitis is nonpurulent and strep is a concern.", t: "Trap: Cephalexin alone does not cover community MRSA in a purulent abscess." },
        { f: "What are red flags for necrotizing fasciitis?", b: "Pain out of proportion to exam, rapid spread, crepitus, bullae/skin necrosis, systemic toxicity → emergent surgical exploration + broad antibiotics.", x: "Necrotizing infection is a surgical disease; early exploration saves life and limb. Imaging must not delay surgery when suspicion is high.", t: "Trap: Normal skin early or modest fever does not exclude necrotizing fasciitis if pain is severe." }
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
        { f: "Treatment of primary, secondary, or early latent syphilis?", b: "Benzathine penicillin G 2.4 million units IM × 1 (late latent/unknown duration: weekly × 3).", x: "Benzathine penicillin provides prolonged low levels that eradicate early Treponema pallidum. Stage determines duration.", t: "Trap: Three weekly doses are for late latent or unknown duration, not secondary syphilis." },
        { f: "Treatment of neurosyphilis or ocular syphilis?", b: "Aqueous crystalline penicillin G IV 18–24 million units/day for 10–14 days.", x: "Neurosyphilis needs treponemicidal CSF concentrations, achieved by high-dose aqueous IV penicillin. Eye and ear disease are treated the same.", t: "Trap: Benzathine IM does not achieve adequate CSF levels for neurosyphilis." },
        { f: "Syphilis treatment with penicillin allergy?", b: "Nonpregnant: doxycycline 100 mg BID × 14 days (28 days if late). Pregnant: penicillin desensitization, then penicillin.", x: "Pregnancy is special because only penicillin reliably treats the fetus. Desensitization is mandatory when allergic.", t: "Trap: Doxycycline is contraindicated in pregnancy and cannot replace penicillin for congenital prevention." }
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
      explanation: "Erythema nodosum + bilateral hilar adenopathy + ankle periarthritis/fever = <strong>Löfgren syndrome</strong>, an acute sarcoidosis presentation so specific that biopsy is usually unnecessary and with <strong>&gt; 90% spontaneous remission</strong>. Treat symptoms with <strong>NSAIDs</strong>. Glucocorticoids are reserved for symptomatic/progressive pulmonary disease or cardiac, neurologic, ocular, renal, or hypercalcemic involvement.",
      flashcards: [
        { f: "What is Löfgren syndrome?", b: "Acute sarcoidosis: erythema nodosum + bilateral hilar adenopathy + ankle periarthritis/fever — excellent prognosis, treat with NSAIDs.", x: "This triad is so specific for sarcoidosis that biopsy is usually unnecessary. The natural history is spontaneous remission in most patients.", t: "Trap: Do not biopsy every patient with classic Löfgren syndrome and benign course." },
        { f: "Why does sarcoidosis cause hypercalcemia?", b: "Granuloma macrophages express 1-α-hydroxylase → excess calcitriol (1,25-(OH)₂ vitamin D) → increased gut calcium absorption.", x: "Macrophage 1-α-hydroxylase is not feedback-regulated like kidney enzyme, so vitamin D activation can continue despite hypercalcemia.", t: "Trap: Sarcoid hypercalcemia has high 1,25-OH₂ D, not primary hyperparathyroidism physiology." },
        { f: "When are glucocorticoids indicated in sarcoidosis?", b: "Symptomatic or progressive lung disease, or cardiac, neurologic, ocular, renal involvement, or hypercalcemia.", x: "Steroids are reserved for organ-threatening disease because many cases remit and treatment toxicity is substantial.", t: "Trap: Asymptomatic bilateral hilar adenopathy alone often needs observation, not prednisone." }
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
        { f: "USPSTF lung cancer screening criteria?", b: "Annual low-dose CT for age 50–80, ≥ 20 pack-years, and currently smoking or quit within 15 years.", x: "Low-dose CT detects early lung cancer in high-risk smokers and reduces mortality; CXR and sputum cytology do not.", t: "Trap: A normal chest radiograph is not an adequate screening test for eligible patients." },
        { f: "When does lung cancer screening stop?", b: "After 15 years without smoking, or when health problems limit life expectancy or the ability/willingness to undergo curative surgery.", x: "Screening benefit stops when lung cancer risk falls or curative treatment would not be pursued. Harms include false positives and procedures.", t: "Trap: Do not continue annual CT indefinitely after 15 smoke-free years." },
        { f: "Incidental solid lung nodule < 6 mm in a low-risk patient — follow-up?", b: "No routine follow-up (Fleischner); high-risk patients may have optional CT at 12 months.", x: "Tiny nodules in low-risk patients are usually benign granulomas or scars. Follow-up depends on size, risk, and nodule features.", t: "Trap: Fleischner incidental nodule guidance is not the same as formal lung cancer screening protocols." }
      ]
    },
    {
      id: "rheum-septic-arthritis",
      system: "RHEUM",
      task: "TEST",
      vignette: "A 68-year-old man with a history of gout and type 2 diabetes develops acute pain and swelling of the right knee over 24 hours. Temperature 38.6 °C. The knee is warm, erythematous, and has a large effusion with pain on any passive motion. WBC 15,800/µL.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Start colchicine for presumed gout and reassess in 48 hours.",
        "Arthrocentesis with synovial cell count, Gram stain, culture, and crystal analysis.",
        "Serum uric acid level to confirm or exclude gout.",
        "MRI of the knee to evaluate for osteomyelitis or effusion."
      ],
      correct: 1,
      explanation: "An <strong>acute hot monoarthritis is septic until proven otherwise</strong> — joint destruction begins within days. <strong>Arthrocentesis</strong> (cell count, Gram stain, culture, crystals) is mandatory before antibiotics. A gout history does not exclude infection: <strong>crystals and infection can coexist</strong>. Serum urate can be normal during a flare, and imaging cannot distinguish infection from crystal disease.",
      flashcards: [
        { f: "Which synovial WBC count suggests septic arthritis?", b: "> 50,000/µL with > 90% neutrophils (often > 100,000) — but lower counts do not exclude it; culture decides.", x: "Bacterial joint infection destroys cartilage quickly, so synovial fluid culture is decisive even when WBC is below classic thresholds.", t: "Trap: A WBC below 50,000 does not rule out septic arthritis, especially early or immunosuppressed cases." },
        { f: "Does finding crystals exclude septic arthritis?", b: "No — gout/CPPD and infection can coexist; always send Gram stain and culture.", x: "Crystals cause intense inflammation but do not sterilize the joint. Coexisting infection is uncommon but dangerous.", t: "Trap: Never stop after seeing urate or CPP crystals; still send Gram stain and culture." },
        { f: "Most common organisms in septic arthritis?", b: "Staphylococcus aureus overall; Neisseria gonorrhoeae in young sexually active adults (tenosynovitis, pustules, migratory arthralgia).", x: "S aureus dominates because it adheres to damaged synovium; gonococcal disease often presents with migratory symptoms and dermatitis.", t: "Trap: Young age and sexual activity shift concern to gonococcus, not just gout." }
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
        { f: "What is the classic presentation of polymyalgia rheumatica?", b: "Age > 50, bilateral shoulder and hip girdle aching with prolonged morning stiffness, raised ESR/CRP, normal CK and true strength.", x: "PMR is periarticular inflammation causing pain-limited motion rather than muscle fiber injury. ESR/CRP are typically high.", t: "Trap: Objective weakness or high CK points away from PMR toward inflammatory myopathy." },
        { f: "How is polymyalgia rheumatica treated?", b: "Prednisone 12.5–25 mg/day with a rapid, dramatic response, then a slow taper (≥ 12 months); methotrexate is a steroid-sparing agent for relapse.", x: "Rapid steroid response supports the diagnosis, but relapse is common during taper. Monitor for giant cell arteritis symptoms throughout.", t: "Trap: High-dose steroids are for suspected GCA with vision risk, not uncomplicated PMR." },
        { f: "PMR vs inflammatory myopathy — key distinction?", b: "PMR: pain and stiffness, normal strength and CK. Myositis: true proximal weakness with elevated CK.", x: "Myositis affects muscle cells, causing true weakness and enzyme leak. PMR patients may say weak but test strength is normal when pain controlled.", t: "Trap: Difficulty rising from a chair can be pain inhibition in PMR; check CK and true power." }
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
        { f: "How is the serum anion gap calculated?", b: "Na⁺ − (Cl⁻ + HCO₃⁻); normal ≈ 10–12 — lower the expected value by ~2.5 for every 1 g/dL fall in albumin.", x: "Albumin is a major unmeasured anion; hypoalbuminemia can hide a dangerous gap. Correcting prevents false reassurance.", t: "Trap: A normal uncorrected gap in low albumin does not exclude high-AG acidosis." },
        { f: "What does an elevated osmolar gap (> 10) with high-AG acidosis suggest?", b: "Toxic alcohol: ethylene glycol (AKI, calcium oxalate crystals) or methanol (visual loss) → fomepizole ± hemodialysis.", x: "Parent alcohols raise the osmolar gap early; toxic metabolites later drive acidosis and organ injury. Fomepizole blocks new metabolite formation.", t: "Trap: Isopropanol causes osmolar gap with ketosis but no high anion gap acidosis." },
        { f: "What is Winter's formula?", b: "Expected PaCO₂ = 1.5 × HCO₃⁻ + 8 ± 2 — higher means a concomitant respiratory acidosis, lower a respiratory alkalosis.", x: "Respiratory compensation has predictable limits; mismatches reveal a second primary acid-base disorder. This guides urgency and ventilation.", t: "Trap: Do not call low PaCO₂ panic alone; it may be appropriate compensation for metabolic acidosis." }
      ]
    },
    {
      id: "neph-stone-prevention",
      system: "NEPH",
      task: "RX",
      vignette: "A 45-year-old man has had three calcium oxalate kidney stones in 4 years. A 24-hour urine collection shows urine volume 1.4 L, high urinary calcium, high urinary sodium, and normal citrate, oxalate, and uric acid. Serum calcium and PTH are normal. He has heard he should cut out dairy.",
      leadIn: "What is the most appropriate recommendation?",
      options: [
        "Restrict dietary calcium to < 400 mg/day to lower urinary calcium excretion.",
        "Begin vitamin C 1 g daily to acidify the urine and dissolve crystals.",
        "Increase fluids to urine output > 2.5 L/day, keep normal dietary calcium, reduce sodium, and start a thiazide diuretic.",
        "Start allopurinol 300 mg daily to lower urinary uric acid and calcium oxalate risk."
      ],
      correct: 2,
      explanation: "For recurrent <strong>calcium oxalate stones with idiopathic hypercalciuria</strong>: high fluid intake (<strong>urine &gt; 2.5 L/day</strong>), <strong>normal dietary calcium</strong> (1,000–1,200 mg/day; restriction <em>increases</em> oxalate absorption and stone risk), <strong>low sodium</strong> and moderate animal protein, plus a <strong>thiazide</strong> to lower urinary calcium. Vitamin C is metabolized to oxalate. Allopurinol is for hyperuricosuria.",
      flashcards: [
        { f: "Why should calcium NOT be restricted in calcium oxalate stone formers?", b: "Dietary calcium binds oxalate in the gut — restriction increases oxalate absorption, urinary oxalate, and stone risk.", x: "Calcium in meals binds intestinal oxalate, lowering absorption. Pair calcium with low sodium and high fluid intake for recurrence prevention.", t: "Trap: Calcium supplements between meals may raise risk; normal dietary calcium with meals is preferred." },
        { f: "Drug therapy matched to the 24-hour urine finding?", b: "Hypercalciuria → thiazide; hypocitraturia → potassium citrate; hyperuricosuria → allopurinol (or potassium citrate for uric acid stones).", x: "A 24-hour urine personalizes prevention by identifying calcium, citrate, uric acid, oxalate, sodium, and volume abnormalities.", t: "Trap: Allopurinol is not for every calcium stone; use it when hyperuricosuria is present." },
        { f: "Acute ureteral stone management?", b: "≤ 10 mm distal stone → analgesia + tamsulosin (medical expulsive therapy). Obstruction with infection → emergent decompression (stent or nephrostomy).", x: "Most small distal stones pass; infection behind an obstruction can cause rapid sepsis and kidney damage, requiring drainage.", t: "Trap: Tamsulosin is not enough when fever, pyuria, or sepsis accompanies obstruction." }
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
        { f: "What is the minimum needed to suspect TTP?", b: "MAHA (schistocytes, high LDH, low haptoglobin) + thrombocytopenia — the full pentad (fever, renal, neuro) is usually absent.", x: "TTP is platelet-rich microthrombosis from severe ADAMTS13 deficiency; waiting for the full pentad delays life-saving therapy.", t: "Trap: Renal failure is often milder than HUS and need not be present." },
        { f: "What is the treatment of immune TTP?", b: "Immediate plasma exchange + glucocorticoids, plus caplacizumab ± rituximab — do not wait for ADAMTS13 results.", x: "Plasma exchange removes inhibitor and replaces ADAMTS13; steroids suppress antibody production. Caplacizumab blocks platelet-vWF binding.", t: "Trap: Do not wait for ADAMTS13 activity before starting plasma exchange if suspicion is high." },
        { f: "Which lab confirms TTP, and how do coagulation tests help?", b: "ADAMTS13 activity < 10%. PT/aPTT and fibrinogen are normal in TTP but abnormal in DIC.", x: "Normal coagulation separates TTP from DIC, where clotting factors are consumed and PT/aPTT rise.", t: "Trap: Platelet transfusion can worsen thrombosis in TTP unless bleeding is life-threatening." }
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
        { f: "When should adult ITP be treated?", b: "Platelets < 30,000/µL or clinically significant bleeding — first-line glucocorticoids (prednisone ≤ 6 weeks or dexamethasone pulses).", x: "ITP bleeding risk rises as platelets fall, but asymptomatic mild thrombocytopenia can be observed. Smear rules out pseudothrombocytopenia and TMA.", t: "Trap: Treat the patient, not just a platelet count above 30,000 without bleeding." },
        { f: "When is IVIG used in ITP?", b: "When a rapid platelet rise is needed: serious bleeding or before an urgent procedure (with steroids ± platelet transfusion if life-threatening).", x: "IVIG blocks Fc-mediated platelet clearance and works within days, making it useful for bleeding or procedures. Its effect is temporary.", t: "Trap: Platelet transfusion alone is rapidly destroyed; reserve for life-threatening bleeding with IVIG/steroids." },
        { f: "Which secondary causes must be excluded in suspected ITP?", b: "HIV, hepatitis C, H. pylori, drugs, pregnancy, and lymphoproliferative or autoimmune disease (e.g., SLE).", x: "Secondary ITP can improve when the trigger is treated, and missing HIV or HCV changes management and counseling.", t: "Trap: Bone marrow biopsy is not routine in typical isolated ITP with a normal smear." }
      ]
    },
    {
      id: "onc-cord-compression",
      system: "ONC",
      task: "NEXT",
      vignette: "A 71-year-old man with metastatic castration-resistant prostate cancer reports 3 weeks of worsening mid-back pain that is worse lying down. Since yesterday he has had leg weakness and difficulty climbing stairs. He has 4/5 hip flexor strength bilaterally, brisk knee reflexes, and decreased sensation below the umbilicus. Rectal tone is normal.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Thoracic spine radiographs.",
        "Bone scan.",
        "NSAIDs and physical therapy referral.",
        "IV dexamethasone and urgent MRI of the entire spine."
      ],
      correct: 3,
      explanation: "New back pain in a patient with cancer, plus <strong>motor weakness and a sensory level</strong> = <strong>metastatic spinal cord compression</strong>, an oncologic emergency: neurologic status at treatment predicts outcome. Give <strong>IV dexamethasone immediately</strong> and obtain an <strong>MRI of the entire spine</strong> (multilevel disease is common). Definitive therapy: <strong>surgical decompression</strong> (good candidates, instability) and/or <strong>radiation therapy</strong>.",
      flashcards: [
        { f: "What is the initial management of malignant spinal cord compression?", b: "IV dexamethasone immediately + urgent MRI of the entire spine, then radiation and/or surgical decompression.", x: "Steroids reduce vasogenic edema around the cord while MRI defines level and extent. Entire-spine imaging matters because metastases can be multifocal.", t: "Trap: Do not wait for MRI before giving dexamethasone when neurologic deficits suggest compression." },
        { f: "What predicts outcome in spinal cord compression?", b: "Neurologic function at presentation — patients ambulatory at treatment usually stay ambulatory.", x: "Once paraplegia is established, recovery is unlikely; preserving ambulation is the treatment goal. Time to therapy is critical.", t: "Trap: Pain control alone misses the emergency; neurologic status predicts outcome." },
        { f: "What is a red-flag back pain feature in cancer patients?", b: "New/progressive pain, pain worse lying down or at night, thoracic location, radicular band-like pain, or any neurologic deficit.", x: "Night/rest pain and neurologic signs suggest tumor, infection, or fracture rather than mechanical strain. Cancer history lowers the imaging threshold.", t: "Trap: Lumbar x-ray can miss epidural disease; MRI is the test for cord compression." }
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
        { f: "How is myasthenia gravis diagnosed?", b: "AChR antibodies first (then MuSK); electrodiagnostics: decremental repetitive stimulation, single-fiber EMG (most sensitive); then chest CT for thymoma.", x: "AChR antibodies are specific and common in generalized MG; electrophysiology confirms impaired neuromuscular transmission when antibodies are negative.", t: "Trap: Lambert-Eaton has hyporeflexia and improves with use; test VGCC antibodies instead." },
        { f: "Which drugs can worsen myasthenia gravis?", b: "Aminoglycosides, fluoroquinolones, macrolides, magnesium, beta-blockers, and neuromuscular blockers (also checkpoint inhibitors).", x: "These drugs impair neuromuscular transmission or increase weakness, precipitating respiratory failure in susceptible patients.", t: "Trap: Fluoroquinolones and macrolides are not benign in MG; choose alternatives when possible." },
        { f: "How is myasthenic crisis managed?", b: "ICU monitoring of FVC/NIF (intubate if FVC < 20 mL/kg), IVIG or plasma exchange, then glucocorticoids; hold pyridostigmine if intubated.", x: "FVC and NIF trend respiratory muscle reserve before oxygen saturation falls. IVIG and plasma exchange give faster benefit than steroids alone.", t: "Trap: Normal pulse oximetry does not exclude impending myasthenic respiratory failure." }
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
        { f: "What are the DSM-5 criteria for major depressive disorder?", b: "≥ 5 of 9 symptoms (SIG E CAPS + depressed mood) for ≥ 2 weeks, including depressed mood or anhedonia, with functional impairment.", x: "SIG E CAPS helps recall neurovegetative symptoms, but diagnosis also requires distress or impairment and exclusion of substances or mania.", t: "Trap: Bereavement does not exclude MDD if full criteria and impairment are present." },
        { f: "How long is an adequate antidepressant trial, and how long is treatment continued?", b: "4–8 weeks at a therapeutic dose; continue ≥ 6–12 months after remission (longer if recurrent).", x: "Response takes weeks because downstream receptor and neuroplastic changes lag serotonin reuptake blockade. Continue after remission to prevent relapse.", t: "Trap: Do not switch after only 1 week for lack of effect unless adverse effects are intolerable." },
        { f: "What must be screened for before starting an antidepressant?", b: "Prior mania/hypomania (bipolar disorder) and suicide risk — warn young adults (< 25) about early suicidality.", x: "Antidepressant monotherapy can precipitate mania in bipolar disorder. Safety planning addresses access to lethal means and follow-up.", t: "Trap: Benzodiazepines may reduce anxiety briefly but do not treat core depression or suicide risk." }
      ]
    },
    {
      id: "psych-alcohol-withdrawal",
      system: "PSYCH",
      task: "RX",
      vignette: "A 52-year-old man admitted 2 days ago for a tibial fracture becomes agitated and tremulous. He sees insects crawling on the wall and is disoriented. Temperature 38.1 °C, HR 126/min, BP 168/98 mm Hg; he is diaphoretic. His wife reports he drinks a fifth of vodka daily. Glucose is 112 mg/dL.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "IV haloperidol as monotherapy for agitation and hallucinations.",
        "IV metoprolol and clonidine to control tachycardia and hypertension.",
        "IV benzodiazepine (e.g., diazepam or lorazepam) titrated to symptoms, plus IV thiamine.",
        "Physical restraints and observation in a quiet room until symptoms subside."
      ],
      correct: 2,
      explanation: "Disorientation, hallucinations, fever, and autonomic hyperactivity <strong>48–96 h after the last drink</strong> = <strong>delirium tremens</strong> (mortality up to 5% untreated). <strong>Benzodiazepines</strong> are the cornerstone (symptom-triggered via CIWA-Ar in milder withdrawal; aggressive IV dosing in DTs; phenobarbital if refractory). Give <strong>thiamine</strong> to prevent Wernicke encephalopathy. Antipsychotics lower the seizure threshold and beta-blockers mask signs — adjuncts only.",
      flashcards: [
        { f: "What is the timeline of alcohol withdrawal?", b: "Tremor/anxiety 6–24 h; hallucinosis 12–48 h; seizures 6–48 h; delirium tremens 48–96 h after the last drink.", x: "Withdrawal severity reflects CNS hyperexcitability after chronic GABA enhancement and NMDA upregulation. DTs occur late and are life-threatening.", t: "Trap: Hallucinosis can occur with clear sensorium; delirium tremens includes confusion and autonomic instability." },
        { f: "What is the first-line treatment of alcohol withdrawal?", b: "Benzodiazepines, symptom-triggered by CIWA-Ar (long-acting such as diazepam/chlordiazepoxide; lorazepam in liver failure or elderly patients).", x: "Benzodiazepines replace GABA tone and prevent seizures and DTs. Lorazepam avoids active metabolites in liver disease.", t: "Trap: Antipsychotics may help agitation but lower seizure threshold and are adjuncts only." },
        { f: "Which medications treat alcohol use disorder after withdrawal?", b: "Naltrexone (avoid with opioids or acute hepatitis), acamprosate (renally cleared — avoid in severe CKD), disulfiram (adherence-dependent).", x: "Relapse-prevention medication should start after acute withdrawal is controlled and contraindications are checked. Pair with counseling.", t: "Trap: Naltrexone cannot be used in patients taking opioids; it can precipitate withdrawal." }
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
        { f: "What are the ABCDEs of melanoma?", b: "Asymmetry, Border irregularity, Color variation, Diameter > 6 mm, Evolution (change) — plus the 'ugly duckling' sign.", x: "Evolution is often the most sensitive warning sign; ugly duckling compares a lesion to the patient’s other nevi.", t: "Trap: Symmetry and uniform color favor benign nevus, but changing lesions still need evaluation." },
        { f: "What biopsy is preferred for a suspected melanoma?", b: "Full-thickness excisional biopsy with 1–3 mm margins (deep saucerization acceptable) — never cryotherapy or a superficial shave.", x: "Full-depth sampling preserves Breslow depth, which determines staging and treatment. Narrow margins avoid compromising later definitive excision.", t: "Trap: Superficial shave can transect melanoma and underestimate depth." },
        { f: "What is the most important prognostic factor in localized melanoma?", b: "Breslow thickness (tumor depth) — it determines excision margins and the need for sentinel lymph node biopsy.", x: "Depth correlates with nodal metastasis and survival; ulceration and mitotic rate add risk information.", t: "Trap: Diameter is a screening clue, not the main prognostic factor after diagnosis." }
      ]
    },
    {
      id: "derm-sjs",
      system: "DERM",
      task: "NEXT",
      vignette: "A 31-year-old woman started lamotrigine for bipolar disorder 3 weeks ago. Two days ago she developed fever and sore throat, followed by painful dusky red macules with central blistering on her trunk and face. She has oral erosions, crusted lips, and conjunctival injection. Epidermal detachment involves about 8% of body surface area, and the Nikolsky sign is positive.",
      leadIn: "What is the most important next step?",
      options: [
        "Continue lamotrigine and start oral prednisone 1 mg/kg/day with a slow taper.",
        "Discontinue lamotrigine immediately and admit to a burn unit or ICU, with ophthalmology consultation.",
        "Oral cetirizine and topical steroids, with outpatient dermatology follow-up in 1 week.",
        "Reduce the lamotrigine dose by half and add an antihistamine."
      ],
      correct: 1,
      explanation: "Painful skin with <strong>mucosal involvement</strong> and epidermal detachment &lt; 10% BSA, 1–4 weeks after a high-risk drug = <strong>Stevens-Johnson syndrome</strong> (10–30% overlap; &gt; 30% TEN). <strong>Immediate withdrawal of the culprit</strong> is the most important intervention. Provide burn-unit supportive care, early <strong>ophthalmology</strong> input to prevent scarring and blindness, and never rechallenge. Systemic steroids are controversial and never replace drug withdrawal.",
      flashcards: [
        { f: "How are SJS, SJS/TEN overlap, and TEN distinguished?", b: "By detached body surface area: < 10% SJS, 10–30% overlap, > 30% TEN — all with mucosal involvement.", x: "SJS/TEN is a keratinocyte apoptosis emergency with mucosal injury and painful skin. BSA detachment determines category and prognosis.", t: "Trap: Erythema multiforme major has target lesions but usually less extensive detachment and different triggers." },
        { f: "Which drugs most often cause SJS/TEN?", b: "Allopurinol, sulfonamides, aromatic anticonvulsants (carbamazepine, phenytoin, lamotrigine), oxicam NSAIDs, nevirapine — usually 4–28 days after starting.", x: "High-risk drugs usually trigger disease within the first month. Early recognition and permanent avoidance reduce mortality.", t: "Trap: Simple morbilliform drug eruptions are usually pruritic, not exquisitely painful with mucosal erosions." },
        { f: "Which HLA alleles predict SJS/TEN?", b: "HLA-B*15:02 with carbamazepine (Asian ancestry) and HLA-B*58:01 with allopurinol — test before starting in at-risk groups.", x: "HLA testing prevents severe reactions in genetically high-risk groups. The allele-drug associations are specific, not universal for all drugs.", t: "Trap: A negative HLA-B*15:02 does not eliminate all anticonvulsant rash risk." }
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
      explanation: "<strong>ACE inhibitors and ARBs are contraindicated in pregnancy</strong> because of fetotoxicity (renal dysgenesis, oligohydramnios, skull hypoplasia), and switching after conception is still recommended. Preferred agents are <strong>labetalol, extended-release nifedipine, or methyldopa</strong>, targeting BP &lt; 140/90 (CHAP trial). She also needs <strong>low-dose aspirin 81 mg from 12 weeks</strong> to lower preeclampsia risk.",
      flashcards: [
        { f: "Which antihypertensives are preferred in pregnancy?", b: "Labetalol, extended-release nifedipine, methyldopa — never ACE inhibitors, ARBs, or direct renin inhibitors.", x: "Pregnancy-safe agents control maternal BP without blocking fetal renal angiotensin signaling. CHAP supports treating chronic HTN to <140/90.", t: "Trap: ACEi and ARBs cause fetal renal injury and oligohydramnios; stop them when pregnancy is recognized." },
        { f: "Who gets aspirin for preeclampsia prevention?", b: "High-risk patients (prior preeclampsia, chronic HTN, diabetes, CKD, autoimmune disease, multifetal pregnancy): aspirin 81 mg daily from 12 weeks (USPSTF).", x: "Low-dose aspirin improves placental perfusion and lowers preeclampsia risk when started after placentation begins.", t: "Trap: Aspirin is for high-risk or multiple moderate-risk patients, not every pregnancy automatically." },
        { f: "How is preeclampsia defined?", b: "New BP ≥ 140/90 after 20 weeks plus proteinuria or severe features (thrombocytopenia, AKI, transaminitis, pulmonary edema, cerebral/visual symptoms).", x: "Severe features reflect endothelial injury and organ dysfunction; proteinuria is not required if severe features are present.", t: "Trap: Hypertension before 20 weeks suggests chronic HTN, not new preeclampsia unless special conditions exist." }
      ]
    },
    {
      id: "crit-ards",
      system: "CRIT",
      task: "RX",
      vignette: "A 58-year-old man with severe pneumococcal pneumonia is intubated for hypoxemic respiratory failure. Height is 178 cm (predicted body weight 73 kg); actual weight is 110 kg. Chest radiograph shows new bilateral diffuse opacities. Echocardiogram shows normal LV function. On FiO₂ 0.8 and PEEP 12 cm H₂O, PaO₂ is 96 mm Hg (P/F 120).",
      leadIn: "What is the most appropriate ventilator strategy?",
      options: [
        "Tidal volume 6 mL/kg predicted body weight with plateau pressure ≤ 30 cm H₂O, plus prone positioning.",
        "Tidal volume 10 mL/kg actual body weight to improve oxygenation.",
        "Tidal volume 8 mL/kg actual body weight with zero PEEP.",
        "Liberal fluid resuscitation to a CVP of 15 mm Hg."
      ],
      correct: 0,
      explanation: "Acute onset, bilateral opacities not explained by heart failure, and P/F ≤ 300 on PEEP ≥ 5 = <strong>ARDS</strong> (P/F 100–200 moderate, ≤ 100 severe). The only mortality-proven ventilator strategy is <strong>low tidal volume: 6 mL/kg of predicted (not actual) body weight</strong> with <strong>plateau pressure ≤ 30 cm H₂O</strong>. For <strong>P/F &lt; 150</strong>, add <strong>prone positioning ≥ 12–16 h/day</strong>, which lowers mortality. Use a conservative fluid strategy once shock resolves.",
      flashcards: [
        { f: "How is ARDS defined (Berlin)?", b: "Within 1 week of an insult; bilateral opacities not fully explained by effusion, collapse, or HF; P/F ≤ 300 on PEEP ≥ 5 (≤ 100 severe).", x: "ARDS is noncardiogenic inflammatory alveolar flooding causing shunt physiology. P/F severity is assessed on at least modest PEEP.", t: "Trap: Bilateral infiltrates from cardiogenic pulmonary edema are not ARDS unless not fully explained by HF or overload." },
        { f: "What is lung-protective ventilation in ARDS?", b: "Tidal volume 6 mL/kg (range 4–8) of PREDICTED body weight, plateau pressure ≤ 30 cm H₂O, adequate PEEP.", x: "Low tidal volumes prevent volutrauma and barotrauma; predicted body weight estimates lung size better than actual weight.", t: "Trap: Obese patients still use predicted, not actual, body weight for tidal volume." },
        { f: "When is prone positioning indicated in ARDS?", b: "Moderate-to-severe ARDS with P/F < 150 — prone ≥ 12–16 h/day reduces mortality (PROSEVA).", x: "Proning recruits dorsal lung units and improves V/Q matching in severe hypoxemia. It requires prolonged daily sessions to improve outcomes.", t: "Trap: Proning is mortality-proven for P/F <150, not routine for mild ARDS." }
      ]
    },
    {
      id: "geri-falls",
      system: "GERI",
      task: "RISK",
      vignette: "A 79-year-old woman living independently has fallen twice in the past 6 months without injury. She takes amlodipine, zolpidem nightly, and oxybutynin. Timed Up and Go is 16 seconds. Orthostatic vital signs are normal, vision is corrected, and 25-hydroxyvitamin D is 34 ng/mL.",
      leadIn: "In addition to deprescribing zolpidem and oxybutynin, what is the most effective fall-prevention intervention?",
      options: [
        "Vitamin D 4,000 IU daily to prevent falls in community-dwelling adults.",
        "Bed alarm at night and hip protectors during the day.",
        "Supervised exercise program for gait, strength, and balance (e.g., physical therapy, tai chi).",
        "Brain MRI to look for normal pressure hydrocephalus or small-vessel disease."
      ],
      correct: 2,
      explanation: "In community-dwelling adults ≥ 65 at increased fall risk, <strong>exercise interventions</strong> (gait, balance, strength training; tai chi) have the strongest evidence (USPSTF), together with a <strong>multifactorial assessment</strong>: medication review (sedative-hypnotics and anticholinergics are on the <strong>Beers Criteria</strong>), vision, orthostasis, feet/footwear, and home hazards. <strong>Vitamin D is not recommended for fall prevention</strong> without deficiency.",
      flashcards: [
        { f: "How do you screen for fall risk?", b: "Ask about falls in the past year and fear of falling; Timed Up and Go ≥ 12 s indicates increased risk (CDC STEADI).", x: "Falls are common and multifactorial; a quick mobility test plus history identifies who needs deeper assessment.", t: "Trap: Do not dismiss falls as normal aging; recurrent falls predict morbidity and mortality." },
        { f: "Which fall-prevention intervention has the strongest evidence?", b: "Exercise (gait, balance, strength; tai chi), plus multifactorial risk reduction — vitamin D does not prevent falls without deficiency.", x: "Exercise improves strength, reaction time, and balance, directly targeting modifiable fall physiology. Vitamin D helps only if deficient for bone health.", t: "Trap: Vitamin D supplementation alone is not recommended solely to prevent falls in nondeficient adults." },
        { f: "Which Beers Criteria drugs increase fall risk?", b: "Benzodiazepines, Z-drugs (zolpidem), anticholinergics (oxybutynin, diphenhydramine), antipsychotics, and other sedatives.", x: "Sedatives and anticholinergics impair balance, cognition, and orthostatic responses. Deprescribing is a high-yield intervention.", t: "Trap: Z-drugs are not safer than benzodiazepines for falls or delirium in older adults." }
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
        "IV diltiazem.",
        "IV adenosine.",
        "IV procainamide.",
        "IV digoxin."
      ],
      correct: 2,
      explanation: "An irregular, very fast wide-complex rhythm with <strong>varying QRS morphology</strong> in a patient with a prior <strong>delta wave</strong> is <strong>pre-excited atrial fibrillation (WPW)</strong>. AV nodal blockers such as adenosine, calcium channel blockers, beta-blockers, digoxin, and IV amiodarone push conduction down the accessory pathway, which can cause <strong>ventricular fibrillation</strong>. In a stable patient give <strong>IV procainamide</strong> (or ibutilide); if unstable, use <strong>synchronized cardioversion</strong>. Definitive therapy is <strong>catheter ablation</strong> of the pathway.",
      flashcards: [
        { f: "What are the ECG features of Wolff-Parkinson-White pattern?", b: "Short PR interval (< 120 ms), delta wave (slurred QRS upstroke), and wide QRS from ventricular pre-excitation.", x: "The accessory pathway bypasses the AV node, causing early ventricular activation. Baseline WPW may disappear intermittently.", t: "Trap: WPW pattern is the ECG finding; WPW syndrome means symptoms from tachyarrhythmia." },
        { f: "How is pre-excited atrial fibrillation treated?", b: "Unstable → synchronized cardioversion. Stable → IV procainamide or ibutilide. Never AV nodal blockers (adenosine, CCB, BB, digoxin, IV amiodarone).", x: "In AF, blocking the AV node can force rapid conduction over the bypass tract and trigger VF. Procainamide slows accessory pathway conduction.", t: "Trap: Adenosine is useful for regular AVNRT, not irregular wide-complex pre-excited AF." },
        { f: "What is the definitive therapy for symptomatic WPW?", b: "Catheter ablation of the accessory pathway.", x: "Ablation cures most symptomatic pathways and prevents recurrent SVT or dangerous pre-excited AF.", t: "Trap: Chronic AV nodal blockers are not definitive and may be harmful in pre-excited AF." }
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
        "IV labetalol boluses to normalize blood pressure (< 130/80 mm Hg) within 1 hour.",
        "Sublingual nifedipine and discharge with oral amlodipine.",
        "Restart his home regimen and recheck in 1 week."
      ],
      correct: 0,
      explanation: "Severe hypertension with <strong>acute end-organ damage</strong> (encephalopathy, papilledema, AKI) is a <strong>hypertensive emergency</strong>. Treat in the ICU with a titratable IV agent such as <strong>nicardipine, clevidipine, or labetalol</strong>. Lower BP by <strong>no more than 25% in the first hour</strong>, then to about 160/100 over the next 2–6 h, then to normal over 24–48 h. Faster lowering causes cerebral, coronary, and renal ischemia because autoregulation has shifted upward. Aortic dissection, severe preeclampsia, and pheochromocytoma crisis need faster targets. Sublingual nifedipine causes unpredictable drops in BP and is never used.",
      flashcards: [
        { f: "Hypertensive emergency vs urgency?", b: "Both: BP > 180/120. Emergency = acute end-organ damage → IV therapy in ICU. Urgency = no organ damage → oral agents, outpatient follow-up.", x: "End-organ injury, not the BP number alone, defines emergency. IV titratable drugs allow controlled reduction and neurologic monitoring.", t: "Trap: Severe asymptomatic BP elevation is urgency; avoid rapid IV lowering." },
        { f: "BP-lowering targets in hypertensive emergency?", b: "≤ 25% reduction in the first hour → 160/100 over 2–6 h → normal over 24–48 h.", x: "Chronic hypertension shifts autoregulation upward, so abrupt drops can underperfuse brain, heart, and kidneys.", t: "Trap: Sublingual nifedipine is unsafe because BP falls unpredictably." },
        { f: "Which hypertensive emergencies need faster BP targets?", b: "Aortic dissection (SBP < 120 within 20 min), severe preeclampsia/eclampsia, and pheochromocytoma crisis (SBP < 140 in the first hour).", x: "Some emergencies have disease-specific targets because ongoing shear or placental risk is immediately dangerous.", t: "Trap: Aortic dissection requires beta-blockade and much faster SBP control than routine hypertensive emergency." }
      ]
    },
    {
      id: "cv-pad",
      system: "CV",
      task: "RX",
      vignette: "A 66-year-old man who smokes has 6 months of reproducible right calf cramping after walking 2 blocks, relieved within minutes by standing still. He has no rest pain or tissue loss. Pedal pulses are diminished. Ankle-brachial index is 0.68 on the right and 0.92 on the left. He takes lisinopril only.",
      leadIn: "What is the most appropriate initial management?",
      options: [
        "Referral for endovascular revascularization of the superficial femoral artery.",
        "Smoking cessation, supervised exercise therapy, a high-intensity statin, and antiplatelet therapy.",
        "Warfarin with a target INR of 2–3 to prevent limb thrombosis.",
        "Pentoxifylline 400 mg three times daily to improve walking distance."
      ],
      correct: 1,
      explanation: "<strong>ABI ≤ 0.90</strong> with exertional calf pain is <strong>peripheral artery disease with claudication</strong>, a coronary heart disease risk equivalent. First-line care is <strong>smoking cessation, supervised exercise therapy</strong> (the most effective therapy for walking distance), <strong>high-intensity statin, and single antiplatelet therapy</strong> (aspirin or clopidogrel). Low-dose rivaroxaban plus aspirin is an option in selected high-risk patients. <strong>Cilostazol</strong> helps persistent claudication but is contraindicated in heart failure. Revascularization is for lifestyle-limiting symptoms despite GDMT or for <strong>chronic limb-threatening ischemia</strong>.",
      flashcards: [
        { f: "How is the ankle-brachial index interpreted?", b: "≤ 0.90 abnormal (PAD); 0.91–0.99 borderline; 1.00–1.40 normal; > 1.40 noncompressible → obtain toe-brachial index.", x: "ABI compares ankle to brachial systolic pressure; calcified noncompressible arteries falsely elevate ABI, especially in diabetes and CKD.", t: "Trap: ABI >1.40 is not normal reassurance; order toe-brachial index or vascular testing." },
        { f: "What is first-line therapy for claudication?", b: "Supervised exercise therapy, smoking cessation, high-intensity statin, antiplatelet therapy; cilostazol for persistent symptoms (not in HF).", x: "Exercise promotes collateral function and walking efficiency; risk-factor therapy reduces MI, stroke, and limb events.", t: "Trap: Cilostazol improves walking distance but is contraindicated in heart failure." },
        { f: "What is chronic limb-threatening ischemia?", b: "PAD with rest pain, nonhealing wounds, or gangrene for > 2 weeks → urgent vascular evaluation for revascularization.", x: "Rest pain and tissue loss signal inadequate perfusion for limb viability and need prompt revascularization planning.", t: "Trap: Claudication alone is not chronic limb-threatening ischemia unless rest pain or tissue loss develops." }
      ]
    },
    {
      id: "endo-thyroid-nodule",
      system: "ENDO",
      task: "NEXT",
      vignette: "A 44-year-old woman has a 1.8-cm painless thyroid nodule found on a carotid ultrasound. She has no compressive symptoms and no history of head and neck irradiation. TSH is 1.6 µU/mL. Dedicated thyroid ultrasound shows a solid, hypoechoic nodule with irregular margins and microcalcifications.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Radioactive iodine uptake scan.",
        "Levothyroxine suppression therapy.",
        "Repeat ultrasound in 12 months.",
        "Ultrasound-guided fine-needle aspiration."
      ],
      correct: 3,
      explanation: "Every thyroid nodule is evaluated first with <strong>TSH and ultrasound</strong>. With a <strong>normal or high TSH</strong>, the decision depends on size and sonographic pattern. A <strong>high-suspicion nodule ≥ 1 cm</strong> (solid hypoechoic, irregular margins, microcalcifications, taller-than-wide) needs <strong>FNA</strong>. A radionuclide scan is useful only when <strong>TSH is low</strong>, because a hyperfunctioning ('hot') nodule is rarely malignant and does not need FNA. Levothyroxine suppression is not recommended.",
      flashcards: [
        { f: "What are the first tests for a thyroid nodule?", b: "Serum TSH and thyroid ultrasound. Low TSH → radionuclide uptake scan (hot nodules rarely malignant).", x: "TSH determines whether to assess function first; autonomous hot nodules rarely harbor cancer. Ultrasound risk-stratifies morphology.", t: "Trap: Do not biopsy before checking TSH; low TSH calls for radionuclide scanning first." },
        { f: "Which ultrasound features suggest thyroid cancer?", b: "Solid, hypoechoic, irregular/infiltrative margins, microcalcifications, taller-than-wide shape, extrathyroidal extension.", x: "Malignant nodules tend to invade rather than compress, producing irregular margins and microcalcifications from psammoma bodies.", t: "Trap: Pure cystic or spongiform nodules are usually low risk despite palpable size." },
        { f: "When is FNA indicated for a thyroid nodule?", b: "High/intermediate suspicion ≥ 1 cm, low suspicion ≥ 1.5 cm, very low suspicion (spongiform) ≥ 2 cm or observe — ATA thresholds.", x: "FNA thresholds balance cancer risk against overdiagnosis; smaller nodules are biopsied only when ultrasound risk is high.", t: "Trap: Levothyroxine suppression is not recommended for benign nodules because harms outweigh benefit." }
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
        "Pituitary MRI.",
        "Plasma ACTH level.",
        "Random afternoon serum cortisol."
      ],
      correct: 0,
      explanation: "Features specific for <strong>hypercortisolism</strong> include easy bruising, facial plethora, proximal myopathy, and wide violaceous striae, especially with new diabetes, hypertension, and early osteoporosis. After excluding <strong>exogenous glucocorticoids</strong> (the most common cause), screen with one of: <strong>overnight 1-mg dexamethasone suppression test</strong>, <strong>late-night salivary cortisol</strong> (×2), or <strong>24-h urine free cortisol</strong> (×2). Only after biochemical confirmation do you measure <strong>ACTH</strong> to localize and then image. Imaging first finds incidental lesions.",
      flashcards: [
        { f: "What are the screening tests for Cushing syndrome?", b: "Overnight 1-mg dexamethasone suppression test (cortisol > 1.8 µg/dL abnormal), late-night salivary cortisol ×2, or 24-h urine free cortisol ×2; confirm with a second test before localizing.", x: "Screen only after excluding exogenous steroids and when features are discriminatory. Abnormal first tests should be confirmed before imaging.", t: "Trap: Random serum cortisol is not a screening test for Cushing syndrome." },
        { f: "How is confirmed Cushing syndrome localized?", b: "Plasma ACTH: low → adrenal source (adrenal CT). Normal/high → pituitary MRI; if equivocal, inferior petrosal sinus sampling vs ectopic source.", x: "ACTH separates adrenal autonomy from ACTH-dependent disease; pituitary incidentalomas are common, so equivocal cases need petrosal sampling.", t: "Trap: Do not image adrenals or pituitary before biochemical confirmation." },
        { f: "What is the most common cause of Cushing syndrome overall, and of endogenous disease?", b: "Overall: exogenous glucocorticoids. Endogenous: ACTH-secreting pituitary adenoma (Cushing disease).", x: "Exogenous glucocorticoids suppress ACTH and adrenal cortisol; Cushing disease is specifically pituitary ACTH excess.", t: "Trap: Cushing syndrome is any cortisol excess; Cushing disease means pituitary source only." }
      ]
    },
    {
      id: "gi-cholangitis",
      system: "GI",
      task: "NEXT",
      vignette: "A 72-year-old woman presents with fever, rigors, and right upper quadrant pain for 1 day. Temperature 39.2 °C, BP 104/62 mm Hg, HR 112/min. She is jaundiced. Total bilirubin 5.4 mg/dL, alkaline phosphatase 410 U/L, ALT 220 U/L, WBC 17,600/µL. Ultrasound shows gallstones and a common bile duct dilated to 11 mm.",
      leadIn: "In addition to IV fluids and blood cultures, what is the most appropriate management?",
      options: [
        "Laparoscopic cholecystectomy today.",
        "HIDA scan.",
        "IV piperacillin-tazobactam and ERCP with biliary decompression within 24 hours.",
        "IV antibiotics alone for 14 days, then outpatient MRCP."
      ],
      correct: 2,
      explanation: "Fever, jaundice, and RUQ pain (<strong>Charcot triad</strong>) with a dilated duct = <strong>acute cholangitis</strong> from choledocholithiasis. Treat with <strong>broad-spectrum antibiotics</strong> covering enteric gram-negatives and anaerobes, plus <strong>biliary drainage by ERCP</strong>: urgently if septic shock or Reynolds pentad, otherwise within 24–48 h. Do cholecystectomy later in the same admission or once she recovers. A HIDA scan diagnoses cystic duct obstruction (cholecystitis), not cholangitis.",
      flashcards: [
        { f: "What are Charcot triad and Reynolds pentad?", b: "Charcot: fever, jaundice, RUQ pain (cholangitis). Reynolds: + hypotension and altered mental status (suppurative cholangitis).", x: "Charcot triad reflects infected obstructed bile; hypotension and confusion indicate severe sepsis from biliary obstruction.", t: "Trap: Murphy sign with cystic duct obstruction suggests cholecystitis, not cholangitis." },
        { f: "How is acute cholangitis treated?", b: "IV fluids + broad-spectrum antibiotics + biliary drainage (ERCP; percutaneous drain if ERCP fails) — urgent if septic.", x: "Antibiotics treat bacteremia, but source control requires decompression of the obstructed duct. Delay increases septic complications.", t: "Trap: Antibiotics alone are inadequate when obstruction persists." },
        { f: "Suspected choledocholithiasis: when ERCP vs MRCP/EUS?", b: "High probability (CBD stone on imaging, cholangitis, or bilirubin > 4 with dilated duct) → ERCP. Intermediate → MRCP or EUS first.", x: "ERCP is therapeutic but carries pancreatitis risk, so intermediate-probability stones should be confirmed noninvasively first.", t: "Trap: HIDA evaluates cholecystitis; MRCP/EUS evaluates suspected common duct stones." }
      ]
    },
    {
      id: "gi-hbv-reactivation",
      system: "GI",
      task: "NEXT",
      vignette: "A 63-year-old man with newly diagnosed diffuse large B-cell lymphoma is about to begin R-CHOP (rituximab-containing) chemotherapy. Pretreatment hepatitis B testing shows HBsAg negative, total anti-HBc positive, anti-HBs positive, and HBV DNA undetectable. Liver chemistries are normal.",
      leadIn: "What is the most appropriate management?",
      options: [
        "No action; anti-HBs positivity means he is immune.",
        "Antiviral prophylaxis with entecavir or tenofovir during and for at least 12 months after rituximab.",
        "Hepatitis B vaccine booster series before starting chemotherapy.",
        "Defer chemotherapy until anti-HBc becomes negative on repeat testing."
      ],
      correct: 1,
      explanation: "HBsAg-negative, anti-HBc-positive, anti-HBs-positive = <strong>resolved past HBV infection</strong>. Covalently closed circular DNA persists in hepatocytes, so <strong>B-cell-depleting therapy (rituximab, anti-CD20)</strong> carries a high risk of <strong>HBV reactivation</strong> and potentially fulminant hepatitis. Give <strong>entecavir or tenofovir prophylaxis</strong> during therapy and for <strong>≥ 12 months</strong> after. With lower-risk immunosuppression, monitoring HBV DNA and ALT is an alternative. Screen <strong>HBsAg + anti-HBc (± anti-HBs)</strong> before any chemotherapy or immunosuppression.",
      flashcards: [
        { f: "HBV serology: vaccinated vs resolved infection?", b: "Vaccinated: anti-HBs only. Resolved infection: anti-HBc + anti-HBs, HBsAg negative.", x: "Anti-HBc marks prior natural infection because core antigen is not in vaccines. Anti-HBs can reflect vaccine or recovery depending on core status.", t: "Trap: Anti-HBs positivity does not eliminate reactivation risk if anti-HBc is also positive." },
        { f: "HBV serology: acute vs chronic infection?", b: "Acute: HBsAg + IgM anti-HBc. Chronic: HBsAg > 6 months + IgG anti-HBc. Window period: IgM anti-HBc alone.", x: "IgM anti-HBc signals recent infection and is the only marker during the window after HBsAg disappears before anti-HBs appears.", t: "Trap: Chronic HBV is defined by persistent HBsAg, not by antibody titers alone." },
        { f: "Who needs HBV prophylaxis before immunosuppression?", b: "All HBsAg-positive patients, and HBsAg-negative/anti-HBc-positive patients receiving high-risk therapy (anti-CD20, stem cell transplant) — entecavir or tenofovir.", x: "Anti-CD20 therapy removes B-cell immune control, allowing cccDNA-driven HBV replication even after apparent recovery.", t: "Trap: Monitoring alone is not enough for high-risk rituximab exposure; give prophylaxis." }
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
        { f: "First-line H. pylori therapy when susceptibility is unknown?", b: "Bismuth quadruple therapy for 14 days (PPI, bismuth, tetracycline, metronidazole); vonoprazan-amoxicillin dual is an alternative.", x: "Quadruple therapy avoids clarithromycin resistance, now common enough that empiric triple therapy fails unless susceptibility is known.", t: "Trap: Clarithromycin triple therapy is only for proven susceptible strains and no macrolide exposure." },
        { f: "How and when is H. pylori eradication confirmed?", b: "Urea breath test, stool antigen, or biopsy ≥ 4 weeks after antibiotics and ≥ 2 weeks off PPIs — test of cure in everyone treated.", x: "PPIs and recent antibiotics suppress organism load and can cause false-negative breath or stool antigen tests.", t: "Trap: Do not check immediately after therapy; wait ≥4 weeks after antibiotics and stop PPI ≥2 weeks." },
        { f: "Who should be tested for H. pylori?", b: "Peptic ulcer disease (active or past), gastric MALT lymphoma, early gastric cancer, uninvestigated dyspepsia < 60, unexplained iron deficiency, ITP, long-term NSAID/aspirin starters.", x: "Testing is useful when eradication changes outcomes: ulcer recurrence, lymphoma regression, cancer risk, or unexplained deficiency/ITP.", t: "Trap: Do not screen everyone with reflux alone; test when a recognized indication is present." }
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
        { f: "First-line antibiotics for uncomplicated cystitis?", b: "Nitrofurantoin × 5 days, TMP-SMX × 3 days (if resistance < 20%), or fosfomycin 3 g × 1 — avoid fluoroquinolones.", x: "Short-course narrow therapy cures bladder infection while limiting collateral damage and resistance selection.", t: "Trap: Fluoroquinolones work but are not first-line for simple cystitis because harms outweigh benefit." },
        { f: "When should asymptomatic bacteriuria be treated?", b: "Only in pregnancy and before urologic procedures with mucosal bleeding — not in older adults, catheters, or diabetes.", x: "Most bacteriuria without symptoms reflects colonization; treatment does not prevent sepsis and increases C. difficile/resistance.", t: "Trap: Pyuria or a positive culture alone is not UTI; treat symptoms except pregnancy or invasive urology." },
        { f: "When should nitrofurantoin be avoided?", b: "Pyelonephritis or systemic infection (poor tissue levels) and CrCl < 30 mL/min (Beers).", x: "Nitrofurantoin concentrates in urine but not renal parenchyma or blood, so it fails upper-tract or systemic disease.", t: "Trap: Fever, flank pain, or sepsis means pyelonephritis; choose tissue-penetrating therapy, not nitrofurantoin." }
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
        { f: "What is the S. aureus bacteremia management bundle?", b: "ID consult, source control (remove lines), repeat blood cultures until negative, echocardiogram in all, beta-lactam for MSSA.", x: "S. aureus frequently seeds valves, bones, and devices; the bundle searches for and removes occult foci that drive relapse.", t: "Trap: Do not stop after one negative culture; repeat cultures until clearance and evaluate for endocarditis." },
        { f: "Best antibiotic for MSSA bacteremia?", b: "Cefazolin or antistaphylococcal penicillin (nafcillin/oxacillin) — superior to vancomycin.", x: "MSSA cell-wall beta-lactams kill faster than vancomycin and reduce mortality; cefazolin is often easiest to dose.", t: "Trap: Vancomycin is for MRSA or severe beta-lactam allergy, not definitive MSSA bacteremia." },
        { f: "Uncomplicated S. aureus bacteremia criteria and duration?", b: "No endocarditis/implants/metastatic foci, source removed, defervescence within 72 h, cultures clear in 2–4 days → ≥ 14 days IV; otherwise 4–6 weeks.", x: "Duration starts on the first day blood cultures are negative, not on the day antibiotics began.", t: "Trap: Any prosthetic material, endocarditis, persistent fever/cultures, or metastatic infection makes it complicated." }
      ]
    },
    {
      id: "id-prep",
      system: "ID",
      task: "RISK",
      vignette: "A 29-year-old man who has sex with men reports condomless anal sex with multiple partners over the past 6 months, and was treated for rectal gonorrhea 2 months ago. His last sexual exposure was 3 weeks ago. Today's fourth-generation HIV-1/2 antigen/antibody test is negative. Creatinine clearance is 105 mL/min and hepatitis B surface antigen is negative.",
      leadIn: "What is the most appropriate recommendation?",
      options: [
        "28 days of 3-drug postexposure prophylaxis.",
        "Repeat HIV testing in 3 months before deciding on prevention.",
        "Begin HIV pre-exposure prophylaxis (e.g., daily oral emtricitabine-tenofovir).",
        "Condom counseling alone."
      ],
      correct: 2,
      explanation: "A recent bacterial STI and condomless sex with multiple partners are strong indications for <strong>HIV pre-exposure prophylaxis</strong>. Options are daily oral <strong>FTC/TDF</strong> (all populations) or <strong>FTC/TAF</strong> (not for receptive vaginal sex), or long-acting injectable <strong>cabotegravir</strong> every 2 months; twice-yearly lenacapavir was FDA-approved in 2025. Confirm a <strong>negative HIV test</strong> right before starting. PEP is only for exposures <strong>within 72 hours</strong>. On oral PrEP, test for HIV every 3 months, screen for STIs regularly, and check kidney function at least yearly (every 6 months if age ≥ 50 or baseline CrCl &lt; 90 mL/min).",
      flashcards: [
        { f: "What are the HIV PrEP options?", b: "Oral FTC/TDF (all) or FTC/TAF (not receptive vaginal sex); injectable cabotegravir q2 months; twice-yearly lenacapavir injection.", x: "PrEP choice depends on exposure type, renal/bone issues, adherence, and injection preference; HIV must be excluded first.", t: "Trap: FTC/TAF is not approved for receptive vaginal sex; use FTC/TDF or injectable options." },
        { f: "When and how is HIV postexposure prophylaxis given?", b: "Within 72 hours of exposure: 28 days of a 3-drug regimen (e.g., bictegravir/FTC/TAF or dolutegravir + FTC/TDF).", x: "PEP is an emergency because systemic infection can establish quickly; efficacy falls sharply after 72 hours.", t: "Trap: Ongoing risk is PrEP, not repeated PEP; convert after confirming HIV-negative status." },
        { f: "What monitoring does oral PrEP require?", b: "HIV test before start and every 3 months, STI screening, creatinine clearance at baseline and at least yearly, and HBV status (stopping TDF/TAF can flare HBV).", x: "Tenofovir-emtricitabine also treats HBV, so stopping can trigger hepatitis flares in chronic HBV.", t: "Trap: A negative antibody alone is not enough; know HBV status and monitor renal function on oral PrEP." }
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
        { f: "What is the HRCT UIP pattern?", b: "Subpleural, basal-predominant reticulation with honeycombing ± traction bronchiectasis — diagnostic of IPF in the right context without biopsy.", x: "Honeycombing in the correct clinical setting has high specificity for UIP, avoiding surgical lung biopsy risk.", t: "Trap: Ground-glass, nodules, or upper-lobe predominance is atypical UIP and should prompt another diagnosis." },
        { f: "What is the treatment of idiopathic pulmonary fibrosis?", b: "Antifibrotics (nintedanib or pirfenidone), oxygen, pulmonary rehab, transplant referral — avoid glucocorticoid/azathioprine regimens.", x: "Antifibrotics slow progression but do not reverse scarring; supportive care and transplant planning address morbidity and survival.", t: "Trap: Steroid/azathioprine regimens increased mortality in IPF; reserve immunosuppression for inflammatory ILD." },
        { f: "What PFT pattern defines restrictive lung disease?", b: "Reduced TLC (< 5th percentile/LLN) with normal or high FEV1/FVC; DLCO is low in parenchymal disease, normal in chest wall/neuromuscular causes.", x: "Restriction requires lung volumes; spirometry alone can suggest but not confirm low TLC.", t: "Trap: Low FVC with low FEV1/FVC is obstruction with air trapping, not true restriction." }
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
        { f: "Which ANCA goes with which vasculitis?", b: "GPA: PR3/c-ANCA. MPA: MPO/p-ANCA. EGPA (asthma, eosinophilia): MPO/p-ANCA in ~40%.", x: "ANCA subtype helps pattern recognition but biopsy or organ involvement still guides urgency and treatment intensity.", t: "Trap: EGPA is suggested by asthma and eosinophilia; ANCA may be absent despite vasculitis." },
        { f: "What is induction therapy for severe ANCA vasculitis?", b: "Glucocorticoids + rituximab (or cyclophosphamide), then rituximab maintenance; PJP prophylaxis with TMP-SMX.", x: "Rituximab and cyclophosphamide induce remission in organ-threatening disease; steroids are tapered to reduce infection/toxicity.", t: "Trap: Methotrexate is only for nonsevere disease without renal, pulmonary hemorrhage, or other organ threat." },
        { f: "What defines a pulmonary-renal syndrome?", b: "Diffuse alveolar hemorrhage + glomerulonephritis — ANCA vasculitis, anti-GBM disease (Goodpasture), or SLE.", x: "Pulmonary capillaritis and crescentic GN can cause rapid respiratory and renal failure, so treatment is urgent.", t: "Trap: Isolated hemoptysis without active urine sediment is not pulmonary-renal syndrome." }
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
        { f: "How is nephrotic syndrome defined?", b: "Proteinuria > 3.5 g/day + hypoalbuminemia + edema (± hyperlipidemia, lipiduria) with a bland sediment.", x: "Heavy albuminuria lowers oncotic pressure and drives hepatic lipoprotein synthesis, causing edema and hyperlipidemia.", t: "Trap: RBC casts or dysmorphic hematuria suggest nephritic GN, not a bland nephrotic process." },
        { f: "What are the key features of membranous nephropathy?", b: "Most common primary nephrotic cause in older adults; anti-PLA2R positive; secondary causes: solid tumors, HBV, SLE class V, NSAIDs; high thrombosis risk.", x: "Anti-PLA2R supports primary disease, but secondary causes matter because treating the trigger may resolve proteinuria.", t: "Trap: Do not call it primary without checking cancer risk, HBV, SLE, and drug exposures." },
        { f: "Why is nephrotic syndrome hypercoagulable?", b: "Urinary loss of antithrombin III (and proteins C/S) plus increased hepatic clotting factors — renal vein thrombosis, DVT/PE.", x: "Loss of anticoagulant proteins plus hepatic procoagulant production makes membranous especially prone to renal vein thrombosis.", t: "Trap: Flank pain/hematuria in nephrotic syndrome may be renal vein thrombosis, not stones alone." }
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
        { f: "What are the screening labs for hereditary hemochromatosis?", b: "Fasting transferrin saturation (> 45%) and ferritin → HFE genotype (C282Y homozygous most common).", x: "Transferrin saturation rises before ferritin; ferritin also increases with inflammation or liver injury, so genotype confirms HFE disease.", t: "Trap: High ferritin alone is nonspecific; look for TSAT >45% before HFE testing." },
        { f: "What is the treatment of hereditary hemochromatosis?", b: "Weekly phlebotomy until ferritin 50–100 ng/mL, then maintenance — chelation only if phlebotomy is impossible.", x: "Removing iron prevents cirrhosis, diabetes progression, and cardiomyopathy if started before irreversible organ damage.", t: "Trap: Chelation is mainly for transfusional overload or inability to phlebotomize, not routine HFE disease." },
        { f: "Classic clinical features of hemochromatosis?", b: "Cirrhosis/HCC, diabetes, bronze skin, hypogonadism, cardiomyopathy, and 2nd/3rd MCP arthropathy with CPPD/chondrocalcinosis.", x: "Iron deposits in endocrine, hepatic, cardiac, skin, and joint tissues; MCP arthropathy is a classic clue.", t: "Trap: Knee CPPD alone is common; 2nd/3rd MCP disease plus diabetes/liver tests points to hemochromatosis." }
      ]
    },
    {
      id: "heme-cancer-vte",
      system: "HEME",
      task: "RX",
      vignette: "A 61-year-old woman with metastatic breast cancer receiving chemotherapy develops left leg swelling; duplex ultrasound shows a femoral-popliteal DVT. Creatinine clearance is 78 mL/min, platelets 210,000/µL, and she has no bleeding history or GI/GU tumor involvement. She is hemodynamically stable.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Warfarin with a target INR of 2–3 for 3 months.",
        "Inferior vena cava filter.",
        "Apixaban for 3 months, then stop regardless of cancer status.",
        "Apixaban for at least 6 months, continued while the cancer remains active."
      ],
      correct: 3,
      explanation: "For <strong>cancer-associated VTE</strong>, guidelines (ASCO, ASH, CHEST) recommend a <strong>DOAC (apixaban, rivaroxaban, edoxaban) or LMWH</strong> rather than warfarin, for at least <strong>6 months</strong> and <strong>indefinitely while cancer is active or under treatment</strong>. Edoxaban and rivaroxaban increase bleeding in <strong>luminal GI or GU cancers</strong>, where apixaban or LMWH is preferred. IVC filters are only for acute VTE with an absolute contraindication to anticoagulation.",
      flashcards: [
        { f: "First-line anticoagulant for cancer-associated VTE?", b: "DOAC (apixaban, rivaroxaban, edoxaban) or LMWH — not warfarin; caution with edoxaban/rivaroxaban in luminal GI/GU cancers.", x: "Cancer activates coagulation and recurrence risk is high; DOACs and LMWH outperform warfarin logistics and stability.", t: "Trap: In unresected luminal GI/GU cancer, bleeding risk may favor apixaban or LMWH over rivaroxaban/edoxaban." },
        { f: "How long is cancer-associated VTE treated?", b: "At least 6 months, and indefinitely while the cancer is active or being treated.", x: "Risk persists while tumor or treatment is active, so stopping at 3–6 months can allow recurrence.", t: "Trap: Do not use a fixed 3-month provoked-VTE duration if cancer remains active." },
        { f: "When is an IVC filter indicated?", b: "Acute proximal DVT/PE with an absolute contraindication to anticoagulation (e.g., active major bleeding) — remove when anticoagulation is possible.", x: "Filters reduce embolization only when anticoagulation cannot be given; they raise DVT risk if left in place.", t: "Trap: Recurrent VTE on inadequate anticoagulation is managed by optimizing/changing anticoagulant, not automatic filter." }
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
        { f: "General management of immune-related adverse events by grade?", b: "Grade 1: continue ICI. Grade 2: hold ICI ± prednisone 0.5–1 mg/kg. Grade 3–4: hold/stop ICI + methylprednisolone 1–2 mg/kg.", x: "irAEs reflect immune activation against normal tissue; severity determines whether ICI can safely continue.", t: "Trap: Grade 3 diarrhea is not treated with loperamide alone; hold ICI and give high-dose steroids after infection workup." },
        { f: "Steroid-refractory checkpoint inhibitor colitis treatment?", b: "Infliximab (or vedolizumab) if no improvement after 48–72 h of IV glucocorticoids.", x: "TNF or gut-selective integrin blockade is used when steroid response is inadequate to prevent perforation/megacolon.", t: "Trap: Avoid infliximab in significant immune-mediated hepatitis; vedolizumab may be preferred for gut-limited disease." },
        { f: "How are ICI endocrinopathies managed?", b: "Hormone replacement (levothyroxine, hydrocortisone, insulin); ICI can usually continue — steroids not needed except for hypophysitis symptoms.", x: "Endocrine glands often have permanent hormone failure; replacement treats deficiency while antitumor immunity can continue.", t: "Trap: Do not give high-dose steroids for uncomplicated ICI hypothyroidism; replace hormone instead." }
      ]
    },
    {
      id: "neuro-gbs",
      system: "NEURO",
      task: "RX",
      vignette: "A 36-year-old man had diarrhea 3 weeks ago. Over 5 days he develops tingling in his feet followed by symmetric ascending leg weakness; he now cannot rise from a chair. Reflexes are absent in all four limbs. Forced vital capacity is 28 mL/kg. Cerebrospinal fluid shows protein 168 mg/dL with 2 white cells/µL.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "IV immune globulin (or plasma exchange) with serial FVC monitoring.",
        "IV methylprednisolone.",
        "Pyridostigmine.",
        "Observation; most cases resolve spontaneously."
      ],
      correct: 0,
      explanation: "Rapidly progressive symmetric ascending weakness with <strong>areflexia</strong> after <strong>Campylobacter</strong>-like diarrhea, and CSF <strong>albuminocytologic dissociation</strong> (high protein, normal cells) = <strong>Guillain-Barré syndrome</strong>. Treat nonambulatory patients within 2–4 weeks with <strong>IVIG or plasma exchange</strong> (equally effective; not combined). <strong>Glucocorticoids are ineffective</strong>. Admit with monitoring of <strong>FVC, NIF, and autonomic instability</strong>; intubate using the 20/30/40 rule.",
      flashcards: [
        { f: "What are the key features of Guillain-Barré syndrome?", b: "Ascending symmetric weakness, areflexia, CSF high protein with normal cells; triggers: Campylobacter, viral illness; autonomic instability.", x: "Albuminocytologic dissociation appears after the first week; early CSF can be normal despite GBS.", t: "Trap: Many CSF WBCs suggest HIV, Lyme, malignancy, or infection rather than typical GBS." },
        { f: "What is the 20/30/40 rule in neuromuscular respiratory failure?", b: "Intubate if FVC < 20 mL/kg, max inspiratory pressure weaker than −30 cm H₂O, or max expiratory pressure < 40 cm H₂O.", x: "Declining vital capacity can precede hypoxemia; serial bedside mechanics catch respiratory failure early.", t: "Trap: Normal pulse oximetry does not exclude impending neuromuscular respiratory failure." },
        { f: "What is the treatment of Guillain-Barré syndrome?", b: "IVIG or plasma exchange (equivalent; not combined) — glucocorticoids do not help.", x: "IVIG and plasma exchange remove or neutralize pathogenic antibodies; combining them adds risk without benefit.", t: "Trap: Steroids help many inflammatory neurologic diseases but not Guillain-Barré syndrome." }
      ]
    },
    {
      id: "neuro-migraine-cad",
      system: "NEURO",
      task: "RX",
      vignette: "A 54-year-old woman with episodic migraine without aura (3 attacks per month) had an NSTEMI treated with a drug-eluting stent 8 months ago. She takes aspirin, clopidogrel, atorvastatin, and metoprolol. Acetaminophen does not relieve her attacks. She asks for a more effective acute migraine treatment.",
      leadIn: "What is the most appropriate acute therapy?",
      options: [
        "Sumatriptan.",
        "Dihydroergotamine nasal spray.",
        "A gepant (e.g., rimegepant or ubrogepant).",
        "Butalbital-acetaminophen-caffeine."
      ],
      correct: 2,
      explanation: "<strong>Triptans and ergots are vasoconstrictors</strong> and are contraindicated in <strong>coronary, cerebrovascular, or peripheral vascular disease</strong> and uncontrolled hypertension. <strong>Gepants</strong> (oral CGRP receptor antagonists) and <strong>lasmiditan</strong> (5-HT1F agonist) lack vasoconstriction and are appropriate. NSAIDs are a concern with dual antiplatelet therapy. <strong>Butalbital and opioids</strong> are discouraged because of dependence and <strong>medication-overuse headache</strong>.",
      flashcards: [
        { f: "When are triptans contraindicated?", b: "Coronary artery disease, prior stroke/TIA, PAD, uncontrolled hypertension, hemiplegic/brainstem aura — use gepants or lasmiditan instead.", x: "Triptans and ergots constrict cranial and coronary vessels; CGRP antagonists and lasmiditan avoid vasoconstriction.", t: "Trap: Chest pressure after triptan in CAD is not benign; choose nonvasoconstrictive acute therapy." },
        { f: "When is migraine preventive therapy indicated?", b: "≥ 4 headache days/month or disabling attacks despite acute therapy — propranolol/metoprolol, topiramate, amitriptyline, CGRP mAbs.", x: "Prevention is chosen when attack frequency or disability makes acute-only therapy unsafe or ineffective.", t: "Trap: Do not use opioids or butalbital as prevention; they worsen chronification and overuse headache." },
        { f: "What defines medication-overuse headache?", b: "Headache ≥ 15 days/month with simple analgesics ≥ 15 days/month or triptans, opioids, butalbital, or combination analgesics ≥ 10 days/month.", x: "Frequent acute medication use sensitizes pain pathways and perpetuates daily headache; withdrawal is key.", t: "Trap: The threshold is lower for triptans/opioids/butalbital than for acetaminophen/NSAIDs." }
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
        { f: "Serotonin syndrome vs neuroleptic malignant syndrome?", b: "SS: hours, serotonergic drug, clonus/hyperreflexia, diarrhea, mydriasis. NMS: days, dopamine antagonist, lead-pipe rigidity, bradyreflexia, high CK.", x: "Clonus and hyperreflexia reflect excess serotonergic neuromuscular excitation; NMS is dopamine blockade with rigidity.", t: "Trap: Lead-pipe rigidity and very high CK after antipsychotic exposure points to NMS, not serotonin syndrome." },
        { f: "Which drugs commonly precipitate serotonin syndrome with SSRIs?", b: "Tramadol, meperidine, fentanyl, methadone, linezolid, methylene blue, triptans (rarely), MAOIs, dextromethorphan, ondansetron.", x: "Risk rises when serotonergic agents are combined or metabolism is inhibited, especially with MAOIs or linezolid.", t: "Trap: Ondansetron or triptans rarely cause SS alone; danger is combinations with multiple serotonergic drugs." },
        { f: "How is serotonin syndrome treated?", b: "Stop serotonergic drugs, benzodiazepines, cooling and supportive care, cyproheptadine if persistent; severe hyperthermia → sedation, paralysis, intubation.", x: "Supportive care reduces adrenergic drive; cyproheptadine blocks serotonin receptors when symptoms persist.", t: "Trap: Antipyretics do not fix hyperthermia from muscle activity; cool, sedate, and paralyze if severe." }
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
        { f: "What is the classic presentation of scabies?", b: "Severe nocturnal itch, burrows in finger webs/wrists, papules on genitals, axillae, waistband; household members affected.", x: "Mites burrow in thin stratum corneum areas; nocturnal itch and clustered household symptoms are key clues.", t: "Trap: Eczema is not usually contagious; household itch should trigger scabies treatment." },
        { f: "How is scabies treated?", b: "Permethrin 5% neck-to-toe, repeat in 7–14 days (or oral ivermectin ×2); treat all contacts at once; hot-wash bedding.", x: "Eggs may survive initial treatment, so repeating therapy and treating contacts prevents reinfestation.", t: "Trap: Persistent itch for weeks can be post-scabetic hypersensitivity, not treatment failure by itself." },
        { f: "What is crusted (Norwegian) scabies?", b: "Hyperinfestation with thick crusts in immunocompromised/institutionalized patients — highly contagious; oral ivermectin + topical permethrin.", x: "Impaired immunity permits massive mite burden with minimal itch; crusts shed mites and drive outbreaks.", t: "Trap: Standard single permethrin treatment is insufficient for crusted scabies; add oral ivermectin and precautions." }
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
        { f: "When are estrogen-containing contraceptives contraindicated (US MEC 4)?", b: "Migraine with aura, smoker ≥ 35 (≥ 15 cig/day), prior VTE/thrombophilia, BP ≥ 160/100, < 21 days postpartum, current breast cancer, complicated valvular disease, decompensated cirrhosis.", x: "Estrogen increases thrombotic stroke risk; aura independently raises stroke risk, making the combination unacceptable.", t: "Trap: Migraine without aura is different; aura makes combined pill, patch, and ring contraindicated." },
        { f: "What are the most effective reversible contraceptives?", b: "LARC: copper IUD, levonorgestrel IUD, etonogestrel implant — < 1% failure per year.", x: "LARC methods avoid user adherence and have failure rates similar to sterilization but are reversible.", t: "Trap: Depot medroxyprogesterone is effective but not a LARC and can delay fertility return." },
        { f: "Emergency contraception options?", b: "Copper IUD within 5 days (most effective); ulipristal up to 120 h; levonorgestrel up to 72 h (less effective if BMI > 30).", x: "Copper IUD prevents fertilization and may prevent implantation; ulipristal delays ovulation better near the LH surge.", t: "Trap: Levonorgestrel EC works best early and is less effective at higher BMI; copper IUD is most effective." }
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
        { f: "Does tube feeding help in advanced dementia?", b: "No — no survival, aspiration, pressure ulcer, or comfort benefit; careful hand feeding is recommended (AGS, Choosing Wisely).", x: "Aspiration often comes from saliva/reflux and impaired swallow, not just food route, so tubes do not remove risk.", t: "Trap: A feeding tube may increase restraints and aspiration; it is not aspiration prophylaxis in advanced dementia." },
        { f: "What is the Medicare hospice eligibility criterion?", b: "Two physicians certify prognosis ≤ 6 months if the illness runs its usual course, and the patient elects comfort-focused care over curative treatment for the terminal illness.", x: "Hospice eligibility is prognosis-based and can coexist with comfort feeding, antibiotics, or other goal-concordant care.", t: "Trap: Hospice is not only for the last days; it supports a ≤6-month expected prognosis." },
        { f: "Which features suggest end-stage dementia (hospice eligible)?", b: "FAST stage 7: < 6 words, nonambulatory, incontinent, dependent in all ADLs, plus complications (aspiration, sepsis, weight loss > 10%, pressure ulcers).", x: "FAST 7 marks profound functional loss; complications identify high near-term mortality in dementia.", t: "Trap: Memory loss alone is not hospice-level dementia; look for nonambulation, minimal speech, dependence, and complications." }
      ]
    },
    {
      id: "found-capacity",
      system: "FOUND",
      task: "NEXT",
      vignette: "A 74-year-old man with diabetes has wet gangrene of the right forefoot. Vascular surgery recommends below-knee amputation and explains that without it he may develop sepsis and die. He is alert and oriented. He accurately restates the risks of refusing, says he understands he could die, and explains that he would rather accept that risk than lose his leg, consistent with values he has expressed for years. His son insists that surgery proceed.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Obtain an emergency court order for surgery.",
        "Proceed with surgery under the son's consent.",
        "Respect his refusal, continue to offer surgery, and provide antibiotics and other care he accepts.",
        "Require a psychiatry consultation before his refusal can be honored."
      ],
      correct: 2,
      explanation: "<strong>Decision-making capacity</strong> is decision-specific and can be assessed by <strong>any treating physician</strong>. Its four elements are: <strong>communicate a choice, understand the information, appreciate how it applies to oneself, and reason consistently with one's values</strong>. He has all four, so his <strong>informed refusal</strong> must be respected, even if it may lead to death and his family disagrees. Psychiatry consultation is for difficult or uncertain cases, not a requirement. Keep the conversation open and provide the treatment he accepts.",
      flashcards: [
        { f: "What are the four elements of decision-making capacity?", b: "Communicates a clear choice, understands the relevant information, appreciates the situation and consequences, and reasons about options consistently with values.", x: "Capacity is about the process of deciding, not whether the clinician agrees with the decision.", t: "Trap: A risky refusal is not incapacity if the patient understands, appreciates, reasons, and communicates." },
        { f: "Capacity vs competence?", b: "Capacity: clinical, decision-specific, assessed by any physician. Competence: legal status determined by a court.", x: "Physicians assess capacity at the bedside; courts determine global legal competence.", t: "Trap: Psychiatry is helpful for uncertainty but is not required for every capacity determination." },
        { f: "Who decides for a patient who lacks capacity?", b: "Advance directive / designated health care proxy first; otherwise legal surrogate hierarchy (guardian, spouse, adult children, parents, siblings) using substituted judgment.", x: "Substituted judgment asks what the patient would choose; best interest is used when preferences are unknown.", t: "Trap: Family disagreement does not override a valid proxy or known patient wishes." }
      ]
    },
    {
      id: "found-periop-doac",
      system: "FOUND",
      task: "NEXT",
      vignette: "A 70-year-old man with nonvalvular atrial fibrillation (CHA₂DS₂-VASc 3) takes apixaban 5 mg twice daily. He is scheduled for elective total knee arthroplasty under neuraxial anesthesia. Creatinine clearance is 72 mL/min. He has no history of stroke or VTE.",
      leadIn: "What is the most appropriate perioperative anticoagulation plan?",
      options: [
        "Stop apixaban 5 days before surgery and bridge with enoxaparin.",
        "Hold apixaban for 3 days before surgery without bridging; resume 48–72 hours after.",
        "Continue apixaban without interruption through the perioperative period.",
        "Stop apixaban 7 days before surgery and resume 2 weeks after surgery."
      ],
      correct: 1,
      explanation: "DOACs have short, predictable half-lives, so <strong>heparin bridging is never needed</strong> and only adds bleeding (PAUSE trial). For <strong>apixaban or rivaroxaban</strong>: hold <strong>1 day</strong> before low-bleed-risk surgery, <strong>2 days</strong> before high-bleed-risk surgery, and <strong>3 days (72 h)</strong> before <strong>neuraxial anesthesia</strong> (ASRA). Resume 24 h after low-risk or <strong>48–72 h</strong> after high-risk surgery. <strong>Dabigatran</strong> needs longer holds when CrCl is reduced. For <strong>warfarin</strong>, stop 5 days before and bridge only at high thrombotic risk (mechanical mitral valve, recent stroke, CHA₂DS₂-VASc ≥ 7), per the BRIDGE trial.",
      flashcards: [
        { f: "Perioperative DOAC interruption (PAUSE)?", b: "Apixaban/rivaroxaban: hold 1 day (low bleed risk), 2 days (high bleed risk), or 3 days (neuraxial anesthesia); no bridging; resume 24 h or 48–72 h after.", x: "DOAC effect wanes predictably over a few half-lives; bridging creates anticoagulant overlap and bleeding.", t: "Trap: Neuraxial procedures require the longest apixaban/rivaroxaban hold: 72 hours." },
        { f: "Who needs heparin bridging when warfarin is stopped?", b: "Only high thrombotic risk: mechanical mitral (or older aortic) valve, stroke/TIA < 3 months, VTE < 3 months, severe thrombophilia — most AF patients do not (BRIDGE).", x: "Bridging is reserved for very high embolic risk because most patients bleed more without fewer strokes.", t: "Trap: Nonvalvular AF alone, even common CHA₂DS₂-VASc scores, usually does not need bridging." },
        { f: "How long before surgery is warfarin stopped?", b: "5 days before; check INR the day before (vitamin K 1–2 mg orally if INR > 1.5); resume 12–24 h after if hemostasis is adequate.", x: "Warfarin takes days for clotting factors to recover; low-dose vitamin K corrects residual INR without prolonged reversal.", t: "Trap: Do not restart before hemostasis; timing depends on bleeding risk and surgical control." }
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
        "Ankle-brachial index.",
        "Carotid duplex ultrasound."
      ],
      correct: 0,
      explanation: "USPSTF: <strong>one-time ultrasound screening for abdominal aortic aneurysm</strong> in <strong>men aged 65–75 who have ever smoked</strong> (≥ 100 cigarettes in a lifetime; grade B). Men who never smoked are screened selectively (C); women who never smoked are not screened (D). He does <strong>not</strong> qualify for lung cancer screening (requires <strong>≥ 20 pack-years</strong> and quitting <strong>within the past 15 years</strong>). ABI and carotid ultrasound are not recommended for screening asymptomatic adults.",
      flashcards: [
        { f: "Who should be screened for abdominal aortic aneurysm (USPSTF)?", b: "One-time ultrasound for men 65–75 who have ever smoked (B); selective in never-smoking men (C); not in never-smoking women (D).", x: "Smoking is the strongest AAA risk factor; ultrasound is accurate, noninvasive, and done once for eligible men.", t: "Trap: A remote light smoking history still counts as ever smoked: ≥100 lifetime cigarettes." },
        { f: "When is an AAA repaired?", b: "Diameter ≥ 5.5 cm in men (≥ 5.0 cm in women), growth ≥ 0.5 cm/year, or any symptomatic aneurysm.", x: "Rupture risk rises steeply with diameter and symptoms; smaller aneurysms are monitored by ultrasound intervals.", t: "Trap: Repair is not based on finding AAA alone; size, growth, symptoms, and sex thresholds matter." },
        { f: "Which screening tests are NOT recommended in asymptomatic adults?", b: "ABI for PAD, carotid duplex for stenosis, resting/exercise ECG in low-risk adults — USPSTF D or I.", x: "Screening low-risk asymptomatic adults can cause false positives and procedures without proven outcome benefit.", t: "Trap: Do not order carotid duplex for a bruit-free asymptomatic patient as routine screening." }
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
        { f: "When is N-acetylcysteine started immediately in acetaminophen overdose?", b: "Presentation > 8 h after ingestion, unknown time, staggered ingestion, or any evidence of liver injury — do not wait for the level.", x: "NAC replenishes glutathione and is most protective before toxic NAPQI binds hepatocytes; delay worsens outcomes.", t: "Trap: If >8 hours or time unknown, start NAC before the acetaminophen level returns." },
        { f: "How is the Rumack-Matthew nomogram used?", b: "Single acute ingestion only: plot a level drawn 4–24 h post-ingestion; above the treatment line (150 µg/mL at 4 h) → NAC.", x: "The nomogram predicts risk only after a single known-time ingestion once absorption should be measurable.", t: "Trap: Do not use the nomogram for chronic supratherapeutic, staggered, or unknown-time ingestions." },
        { f: "King's College criteria in acetaminophen-induced liver failure?", b: "Arterial pH < 7.30 after resuscitation, OR all of INR > 6.5, creatinine > 3.4 mg/dL, and grade III/IV encephalopathy → transplant listing.", x: "Severe acidosis or the INR/creatinine/encephalopathy triad predicts poor spontaneous survival.", t: "Trap: High aminotransferases alone are not the listing criterion; use Kings College markers of liver failure." }
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
        "Transfer for primary PCI without fibrinolysis.",
        "Serial troponins and stress testing if negative.",
        "Start a heparin infusion and observe in the local ICU."
      ],
      correct: 0,
      explanation: "<strong>Primary PCI</strong> is preferred for STEMI only if first medical contact-to-device time can be <strong>≤ 120 minutes</strong>. With an anticipated delay beyond that and symptom onset within 12 hours, give <strong>fibrinolytic therapy within 30 minutes of arrival</strong> (door-to-needle) unless contraindicated, then <strong>transfer to a PCI center</strong>: immediately for failed reperfusion (rescue PCI), otherwise angiography within <strong>2–24 hours</strong> (pharmacoinvasive strategy). Never delay reperfusion for troponin results in STEMI.",
      flashcards: [
        { f: "STEMI reperfusion: when PCI vs fibrinolysis?", b: "Primary PCI if first-contact-to-device ≤ 120 min (goal ≤ 90 min); otherwise fibrinolysis within 30 min of arrival if symptoms < 12 h.", x: "Myocardium is time-sensitive; when PCI delay exceeds 120 minutes, early lysis beats waiting in eligible patients.", t: "Trap: Do not wait for troponin when ECG shows STEMI; reperfusion is based on ECG and symptoms." },
        { f: "What are absolute contraindications to fibrinolysis?", b: "Any prior ICH, ischemic stroke < 3 months, structural cerebral vascular lesion or intracranial tumor, active bleeding, suspected aortic dissection, significant head/facial trauma < 3 months.", x: "Fibrinolytics can convert vulnerable intracranial or bleeding lesions into catastrophic hemorrhage.", t: "Trap: Suspected aortic dissection with ST elevation is a lysis contraindication; diagnose and treat dissection." },
        { f: "What is the pharmacoinvasive strategy after fibrinolysis?", b: "Transfer to a PCI center for angiography within 2–24 h; immediate rescue PCI if < 50% ST resolution at 60–90 min or instability.", x: "Routine early angiography treats residual culprit stenosis after successful lysis and detects failed reperfusion.", t: "Trap: Successful lysis does not mean no cath; transfer for angiography within 2–24 hours." }
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
        { f: "Stepwise acute management of stable SVT?", b: "Vagal maneuvers → adenosine 6 mg rapid IV push (then 12 mg) → IV diltiazem/verapamil or beta-blocker → synchronized cardioversion if unstable or refractory.", x: "AVNRT depends on AV nodal conduction; vagal tone and adenosine transiently block the node to terminate it.", t: "Trap: Unstable tachycardia gets immediate synchronized cardioversion, not sequential drug trials." },
        { f: "Adenosine cautions?", b: "Transient asystole/flushing/chest pressure; lower dose (3 mg) via central line or after heart transplant or with dipyridamole/carbamazepine; caution in severe asthma.", x: "Adenosine has a very short half-life, requiring rapid push close to the heart and a flush.", t: "Trap: In irregular wide-complex tachycardia or preexcited AF, AV nodal blockade can be dangerous." },
        { f: "Definitive therapy for recurrent AVNRT?", b: "Catheter ablation of the slow pathway — > 95% cure, low risk of AV block.", x: "Ablation targets the slow pathway while preserving normal AV conduction in most patients.", t: "Trap: Chronic beta-blockers can reduce episodes but are not definitive for symptomatic recurrent AVNRT." }
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
      explanation: "<strong>Subclinical hypothyroidism</strong> means high TSH with normal free T4. First <strong>repeat TSH and free T4 in 2–3 months</strong>, because up to half normalize (recovery from illness, assay variation). In <strong>nonpregnant adults with TSH &lt; 10</strong>, levothyroxine has <strong>no proven benefit</strong> for symptoms or quality of life, especially in older adults (TRUST trial). Treat if <strong>TSH ≥ 10</strong>, during pregnancy or when planning pregnancy, or consider it in younger symptomatic patients. Positive TPO antibodies predict progression (about 4% per year), so monitor annually. Ultrasound is not indicated without a palpable nodule or goiter.",
      flashcards: [
        { f: "When is subclinical hypothyroidism treated?", b: "TSH ≥ 10 µU/mL, pregnancy or planning pregnancy; consider in younger symptomatic patients — not routinely for TSH < 10 in older adults.", x: "Mild TSH elevations often normalize; treatment benefit is clearest at TSH ≥10 or pregnancy-related situations.", t: "Trap: Fatigue with TSH 6 and normal free T4 in an older adult does not mandate levothyroxine." },
        { f: "What should be done before treating a mildly elevated TSH?", b: "Repeat TSH + free T4 in 2–3 months; exclude recovery from nonthyroidal illness, biotin interference, and drugs.", x: "Biotin and acute illness can distort labs; repeating avoids lifelong therapy for transient abnormalities.", t: "Trap: Do not order thyroid ultrasound just for abnormal TSH unless there is a nodule or goiter." },
        { f: "Levothyroxine dosing pearls?", b: "Full dose ~1.6 µg/kg in young healthy adults; start 25–50 µg in older adults or CAD; recheck TSH 6–8 weeks after each change; take on an empty stomach apart from calcium/iron/PPIs.", x: "Levothyroxine has a long half-life; TSH needs 6–8 weeks to equilibrate after dose changes.", t: "Trap: Starting full replacement in CAD/older adults can provoke angina or arrhythmia; start low." }
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
      explanation: "An <strong>adrenal incidentaloma</strong> needs two questions answered: <strong>is it malignant?</strong> and <strong>does it secrete hormones?</strong> A homogeneous lesion under 4 cm with <strong>&lt; 10 HU</strong> on unenhanced CT is a lipid-rich <strong>benign adenoma</strong>, so no further imaging is required. Every incidentaloma needs a <strong>1-mg dexamethasone suppression test</strong> for autonomous cortisol secretion. Check <strong>plasma metanephrines</strong> only if the mass is <strong>&gt; 10 HU</strong> or there are adrenergic symptoms (ESE 2023), and an <strong>aldosterone-to-renin ratio</strong> if hypertension or hypokalemia is present. Biopsy is almost never indicated, and it is dangerous if pheochromocytoma has not been excluded.",
      flashcards: [
        { f: "What hormonal workup does every adrenal incidentaloma need?", b: "1-mg dexamethasone suppression test in all; plasma metanephrines only if > 10 HU or adrenergic symptoms; aldosterone-to-renin ratio if hypertension or hypokalemia.", x: "Incidentalomas can be clinically silent yet secrete cortisol or aldosterone; testing is guided by all-comers vs phenotype.", t: "Trap: Plasma metanephrines are not required for lipid-rich ≤10 HU lesions unless symptoms suggest pheo." },
        { f: "What imaging features suggest a benign adrenal adenoma?", b: "Homogeneous, smooth, < 4 cm, unenhanced CT < 10 HU, or rapid contrast washout — no further imaging needed.", x: "Intracellular lipid lowers HU; benign imaging can spare serial scans and biopsy.", t: "Trap: Size ≥4 cm, heterogeneity, irregular borders, or high HU needs malignancy-focused evaluation." },
        { f: "Why must pheochromocytoma be excluded before adrenal biopsy?", b: "Biopsy can precipitate a hypertensive crisis; biopsy is reserved for suspected metastasis after pheo is excluded.", x: "Catecholamine release during biopsy can be fatal; biochemical exclusion comes before needle sampling.", t: "Trap: Biopsy does not distinguish adenoma from adrenocortical carcinoma well; use it mainly for suspected metastasis." }
      ]
    },
    {
      id: "gi-aih",
      system: "GI",
      task: "RX",
      vignette: "A 34-year-old woman with Hashimoto thyroiditis has 3 weeks of fatigue and jaundice. ALT is 820 U/L, AST 690 U/L, total bilirubin 4.2 mg/dL, alkaline phosphatase 160 U/L, INR 1.3. IgG is 2,950 mg/dL (elevated). Anti-smooth muscle antibody is 1:160 and ANA 1:320. Viral hepatitis serologies, ceruloplasmin, and acetaminophen level are negative or normal; she takes no supplements. Liver biopsy shows interface hepatitis with abundant plasma cells.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Prednisone (or budesonide if no cirrhosis) plus azathioprine.",
        "Ursodeoxycholic acid.",
        "Observation with repeat liver chemistries in 3 months.",
        "Entecavir."
      ],
      correct: 0,
      explanation: "High aminotransferases, <strong>elevated IgG</strong>, <strong>ANA and anti-smooth muscle antibody</strong>, and <strong>interface hepatitis with plasma cells</strong> in a young woman with another autoimmune disease = <strong>type 1 autoimmune hepatitis</strong>. Induction is with <strong>glucocorticoids</strong> (prednisone; <strong>budesonide</strong> if no cirrhosis) <strong>plus azathioprine</strong>. Check <strong>TPMT</strong> activity before azathioprine. Untreated AIH progresses to cirrhosis. Ursodiol is for primary biliary cholangitis.",
      flashcards: [
        { f: "Which antibodies define type 1 vs type 2 autoimmune hepatitis?", b: "Type 1: ANA and anti-smooth muscle (anti-actin). Type 2: anti-LKM-1 and anti-liver cytosol-1 (children/young adults).", x: "Type 1 is the common adult form; high IgG and interface hepatitis with plasma cells strengthen the diagnosis.", t: "Trap: Antibody positivity alone is insufficient; viral, drug, metabolic, and cholestatic diseases must be excluded." },
        { f: "What is first-line treatment of autoimmune hepatitis?", b: "Prednisone (or budesonide if noncirrhotic) + azathioprine — check TPMT first; mycophenolate is second-line.", x: "Azathioprine maintains remission and permits steroid taper; TPMT deficiency predicts severe myelotoxicity.", t: "Trap: Budesonide should not be used in cirrhosis because portosystemic shunting reduces safety and efficacy." },
        { f: "Primary biliary cholangitis vs primary sclerosing cholangitis?", b: "PBC: middle-aged women, antimitochondrial antibody, ursodiol. PSC: men with ulcerative colitis, beaded ducts on MRCP, cholangiocarcinoma risk.", x: "PBC is small-duct autoimmune cholestasis; PSC is large-duct fibrostenotic disease linked to IBD.", t: "Trap: Ursodiol is first-line for PBC, not for autoimmune hepatitis induction." }
      ]
    },
    {
      id: "gi-severe-uc",
      system: "GI",
      task: "NEXT",
      vignette: "A 29-year-old man with known ulcerative colitis has 10 bloody stools per day for 5 days. Temperature 38.1 °C, HR 108/min. Hemoglobin 9.8 g/dL, CRP 86 mg/L, albumin 2.8 g/dL. Abdominal radiograph shows no colonic dilation. He is admitted.",
      leadIn: "What is the most appropriate initial management?",
      options: [
        "Oral mesalamine and loperamide.",
        "IV methylprednisolone, stool C. difficile testing, and pharmacologic VTE prophylaxis with heparin.",
        "Immediate total colectomy.",
        "IV methylprednisolone; withhold heparin prophylaxis because of rectal bleeding."
      ],
      correct: 1,
      explanation: "Six or more bloody stools per day with systemic toxicity (fever, tachycardia, anemia, high CRP) = <strong>acute severe ulcerative colitis</strong> (Truelove-Witts). Management: <strong>IV glucocorticoids</strong>, <strong>exclude C. difficile</strong> (and CMV on flexible sigmoidoscopy), and give <strong>pharmacologic VTE prophylaxis</strong>, because IBD flares carry a high thrombosis risk and <strong>rectal bleeding is not a contraindication</strong>. Avoid antimotility agents, opioids, and anticholinergics (toxic megacolon). If there is no response by <strong>day 3</strong>, use <strong>infliximab or cyclosporine</strong> rescue or colectomy.",
      flashcards: [
        { f: "How is acute severe ulcerative colitis defined?", b: "≥ 6 bloody stools/day plus ≥ 1 systemic sign: fever, HR > 90, Hb < 10.5, or ESR > 30 / high CRP (Truelove-Witts).", x: "Systemic toxicity with frequent bloody stool predicts high colectomy risk and requires inpatient therapy.", t: "Trap: Mild outpatient UC therapy is inadequate when Truelove-Witts severe criteria are met." },
        { f: "Is VTE prophylaxis given during an IBD flare with bleeding?", b: "Yes — pharmacologic prophylaxis for all hospitalized IBD patients; rectal bleeding is not a contraindication.", x: "Inflammation creates a hypercoagulable state; prophylactic heparin lowers VTE risk despite hematochezia.", t: "Trap: Rectal bleeding from colitis is not a reason to withhold prophylactic-dose heparin." },
        { f: "Rescue therapy for steroid-refractory acute severe UC?", b: "No response by day 3 of IV steroids → infliximab or cyclosporine; colectomy for failure, megacolon, or perforation.", x: "Day-3 nonresponse predicts steroid failure, so rescue therapy or surgery should not be delayed.", t: "Trap: Avoid opioids, anticholinergics, and antimotility agents; they can precipitate toxic megacolon." }
      ]
    },
    {
      id: "id-crypto",
      system: "ID",
      task: "RX",
      vignette: "A 38-year-old man with untreated HIV (CD4 count 28/µL) has 2 weeks of headache and fever. He has no focal deficits. Head CT is normal. Lumbar puncture shows opening pressure 34 cm H₂O, WBC 12/µL, glucose 32 mg/dL, protein 70 mg/dL, and positive CSF cryptococcal antigen.",
      leadIn: "What is the most appropriate management?",
      options: [
        "Oral fluconazole and start antiretroviral therapy today.",
        "IV dexamethasone and acetazolamide to lower intracranial pressure.",
        "Amphotericin B plus flucytosine, therapeutic LPs, and ART deferred 4–6 weeks.",
        "Voriconazole and immediate ventriculoperitoneal shunt placement."
      ],
      correct: 2,
      explanation: "<strong>Cryptococcal meningitis</strong> in advanced HIV is treated with <strong>induction amphotericin B (liposomal) + flucytosine</strong> (≥ 2 weeks), then <strong>fluconazole consolidation and maintenance</strong>. Raised intracranial pressure causes much of the mortality: do <strong>therapeutic LPs</strong> to an opening pressure of &lt; 20 cm H₂O or a 50% reduction. Glucocorticoids and acetazolamide are harmful. <strong>Delay ART 4–6 weeks</strong>, because early ART increases mortality from IRIS (COAT trial), unlike most other opportunistic infections, where ART starts within 2 weeks.",
      flashcards: [
        { f: "Induction therapy for HIV-associated cryptococcal meningitis?", b: "Liposomal amphotericin B + flucytosine (≥ 2 weeks), then fluconazole 400–800 mg consolidation, then 200 mg maintenance.", x: "Flucytosine adds rapid fungicidal activity to amphotericin and improves CSF sterilization.", t: "Trap: Fluconazole alone is not adequate induction for severe HIV-associated cryptococcal meningitis." },
        { f: "How is raised ICP managed in cryptococcal meningitis?", b: "Serial therapeutic LPs to opening pressure < 20 cm H₂O or 50% reduction — not steroids, mannitol, or acetazolamide.", x: "High CSF pressure causes headache, vision loss, and death; removing CSF is the effective pressure treatment.", t: "Trap: Acetazolamide and steroids do not improve cryptococcal ICP and may harm." },
        { f: "When is ART started after an opportunistic infection?", b: "Within 2 weeks for most (e.g., PCP); delay 4–6 weeks for cryptococcal and TB meningitis due to IRIS mortality.", x: "Early ART can intensify CNS inflammation before fungal burden falls, increasing mortality in cryptococcal meningitis.", t: "Trap: PCP usually gets ART within 2 weeks; cryptococcal meningitis is the key delay exception." }
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
        { f: "Classic presentation of Rocky Mountain spotted fever?", b: "Fever, headache, myalgia, then rash starting at wrists/ankles spreading centrally incl. palms/soles; thrombocytopenia, hyponatremia, transaminitis.", x: "Rickettsiae injure vascular endothelium, causing rash, thrombocytopenia, hyponatremia, and organ dysfunction.", t: "Trap: Absence of recalled tick bite does not exclude RMSF; many patients never notice the bite." },
        { f: "Treatment of suspected rickettsial infection?", b: "Doxycycline immediately, in all ages, without waiting for serology — delay increases mortality.", x: "Serology is often negative in week 1; treatment delay after day 5 sharply increases fatality.", t: "Trap: Do not wait for confirmatory titers before doxycycline in suspected RMSF." },
        { f: "Which tick-borne infections cause leukopenia and thrombocytopenia?", b: "Ehrlichiosis and anaplasmosis (morulae in leukocytes, usually no rash) — also treated with doxycycline.", x: "Ehrlichia/anaplasma infect leukocytes and suppress marrow lines; rash is less prominent than RMSF.", t: "Trap: Lyme usually causes erythema migrans and normal platelets, not leukopenia/thrombocytopenia." }
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
        { f: "When is NIV indicated in a COPD exacerbation?", b: "Acute respiratory acidosis (pH ≤ 7.35 and PaCO₂ > 45) or severe dyspnea with fatigue — reduces intubation and mortality.", x: "NIV unloads respiratory muscles and improves ventilation while treating reversible hypercapnia.", t: "Trap: NIV is unsafe if obtunded, vomiting, facial trauma, or unable to protect airway; intubate instead." },
        { f: "Oxygen target in COPD exacerbation?", b: "SpO₂ 88–92% (PaO₂ 60–65) — excess oxygen worsens hypercapnia.", x: "Excess oxygen worsens V/Q mismatch and CO₂ retention; controlled oxygen improves safety.", t: "Trap: Do not target 100% saturation in COPD exacerbation; 88–92% is deliberate." },
        { f: "Steroids and antibiotics in COPD exacerbation?", b: "Prednisone 40 mg × 5 days (REDUCE); antibiotics if increased sputum purulence plus dyspnea or volume, or if ventilated.", x: "Short steroid courses reduce relapse and length of stay; purulence suggests bacterial contribution.", t: "Trap: Antibiotics are not automatic for every COPD flare; use Anthonisen criteria or ventilation need." }
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
        { f: "What are the five WHO groups of pulmonary hypertension?", b: "1 PAH; 2 left heart disease (most common); 3 lung disease/hypoxia; 4 CTEPH/pulmonary artery obstruction; 5 unclear/multifactorial.", x: "Classifying PH identifies whether treatment targets left heart disease, hypoxia, thromboembolism, or PAH biology.", t: "Trap: PAH drugs can harm group 2 PH from left heart disease; define the group first." },
        { f: "Best screening test for CTEPH?", b: "V/Q scan (more sensitive than CTPA; normal scan excludes CTEPH) → RHC and pulmonary angiography → endarterectomy if operable.", x: "Chronic organized thrombi may be missed on CT but create mismatched perfusion defects on V/Q.", t: "Trap: A normal V/Q essentially excludes CTEPH; do not rely on CTPA alone as the screen." },
        { f: "Hemodynamic definition of precapillary pulmonary hypertension?", b: "Right heart cath: mPAP > 20 mm Hg, PCWP ≤ 15 mm Hg, PVR > 2 Wood units.", x: "RHC separates precapillary vascular disease from pulmonary venous hypertension due to left-sided filling pressure.", t: "Trap: Echo estimates probability; it does not confirm PH or justify targeted therapy alone." }
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
        { f: "What are the risk factors for scleroderma renal crisis?", b: "Early diffuse cutaneous SSc, anti-RNA polymerase III antibodies, and glucocorticoids ≥ 15 mg/day prednisone.", x: "RNA polymerase III disease has abrupt diffuse skin involvement and high renal-crisis risk, especially with steroids.", t: "Trap: High-dose prednisone for inflammatory symptoms can precipitate scleroderma renal crisis." },
        { f: "What is the treatment of scleroderma renal crisis?", b: "ACE inhibitor (captopril) titrated to normal BP — continue even on dialysis; never stop for rising creatinine.", x: "ACE inhibition reverses renin-driven vasoconstriction; renal recovery may lag even after dialysis starts.", t: "Trap: Do not stop captopril because creatinine rises; stopping worsens renal crisis physiology." },
        { f: "Which antibodies define limited vs diffuse systemic sclerosis?", b: "Limited (CREST): anticentromere — pulmonary hypertension risk. Diffuse: anti-Scl-70 (ILD) and anti-RNA polymerase III (renal crisis, cancer).", x: "Autoantibodies predict organ surveillance priorities: PAH in limited disease and ILD/renal crisis in diffuse subsets.", t: "Trap: Anticentromere points to limited disease, not the renal-crisis phenotype." }
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
        { f: "What are the pathognomonic skin findings of dermatomyositis?", b: "Gottron papules (over MCP/PIP), heliotrope rash; also V sign, shawl sign, mechanic's hands, periungual changes.", x: "These rashes are highly characteristic and often precede or accompany symmetric proximal inflammatory myopathy.", t: "Trap: SLE photosensitivity lacks Gottron papules over extensor MCP/PIP joints." },
        { f: "Which myositis antibodies predict cancer vs interstitial lung disease?", b: "Cancer: anti-TIF1-γ, anti-NXP2. ILD: anti-Jo-1/antisynthetase, anti-MDA5 (rapidly progressive ILD).", x: "Autoantibody phenotype guides what complication to search for most aggressively at diagnosis.", t: "Trap: Anti-Jo-1 suggests antisynthetase syndrome with ILD/mechanic hands, not the highest cancer-risk group." },
        { f: "Which cancer screening is recommended in adult dermatomyositis?", b: "CT chest/abdomen/pelvis, transvaginal US ± CA-125 in women, mammography, colonoscopy, and age-appropriate screening — repeat over 3 years.", x: "Cancer risk clusters near myositis onset, so screening is intensified initially and repeated if high risk.", t: "Trap: Age-appropriate screening alone may miss occult malignancy in high-risk adult dermatomyositis." }
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
        { f: "Why does hypomagnesemia cause refractory hypokalemia?", b: "Low intracellular Mg removes ROMK inhibition → renal K⁺ wasting; replete Mg first.", x: "ROMK-mediated kaliuresis continues until magnesium is restored, making potassium replacement ineffective alone.", t: "Trap: Do not keep escalating K⁺ without checking Mg in refractory hypokalemia." },
        { f: "Common causes of hypomagnesemia?", b: "Alcohol use, PPIs, loop/thiazide diuretics, diarrhea, aminoglycosides, amphotericin B, cisplatin, refeeding syndrome.", x: "GI loss, renal tubular drug toxicity, and intracellular shifts are common mechanisms for low magnesium.", t: "Trap: A normal serum Mg can miss total-body depletion, but low Mg in this setting must be corrected." },
        { f: "Why does hypomagnesemia cause hypocalcemia?", b: "Low Mg impairs PTH secretion and causes end-organ PTH resistance — calcium will not correct until Mg is repleted.", x: "Magnesium is needed for PTH release and signaling; deficiency produces functional hypoparathyroidism.", t: "Trap: Giving calcium alone will not sustain correction if magnesium remains low." }
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
        { f: "Metabolic alkalosis: what does urine chloride tell you?", b: "< 20 mEq/L → saline-responsive (vomiting, NG suction, prior diuretics). > 20 → saline-resistant (current diuretics, Bartter/Gitelman, mineralocorticoid excess).", x: "Low urine chloride means kidneys are conserving chloride in volume/chloride depletion; saline supplies chloride to excrete bicarbonate.", t: "Trap: Urine sodium can be high in vomiting despite volume depletion; use urine chloride." },
        { f: "Why is urine sodium unreliable in vomiting-induced alkalosis?", b: "Bicarbonaturia obligates Na⁺ (and K⁺) excretion despite volume depletion — urine Cl is the better marker.", x: "Filtered bicarbonate drags sodium into urine, falsely suggesting volume repletion during active alkalosis.", t: "Trap: Do not classify saline responsiveness by urine sodium in metabolic alkalosis." },
        { f: "Gitelman vs Bartter syndrome?", b: "Gitelman: mimics thiazide — hypocalciuria, hypomagnesemia, adolescents/adults. Bartter: mimics loop diuretic — hypercalciuria, childhood.", x: "Both cause hypokalemic metabolic alkalosis with high renin/aldosterone but differ by nephron segment and urine calcium.", t: "Trap: Hypertension with metabolic alkalosis suggests mineralocorticoid excess, not Bartter/Gitelman." }
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
        { f: "How is acute chest syndrome defined?", b: "New pulmonary infiltrate plus fever and/or respiratory symptoms (chest pain, cough, hypoxemia, tachypnea) in sickle cell disease.", x: "ACS can arise from infection, infarction, fat embolism, or hypoventilation; early treatment prevents respiratory failure.", t: "Trap: Treat new infiltrate plus symptoms as ACS even if it resembles pneumonia." },
        { f: "Simple vs exchange transfusion in sickle cell disease?", b: "Simple: symptomatic anemia or mild ACS. Exchange (HbS < 30%): severe/progressive ACS, acute stroke, multiorgan failure — avoid Hb > 10 (hyperviscosity).", x: "Exchange rapidly lowers HbS without raising viscosity; simple transfusion helps less severe anemia/hypoxemia.", t: "Trap: Transfusing above Hb 10 g/dL can worsen viscosity in SCD." },
        { f: "Which therapies prevent sickle cell complications?", b: "Hydroxyurea (raises HbF; fewer crises and ACS), plus vaccinations; voxelotor withdrawn 2024; crizanlizumab for pain crises.", x: "Higher HbF reduces HbS polymerization and vaso-occlusion; preventive therapy is chronic, not acute ACS rescue.", t: "Trap: Hydroxyurea is not the acute treatment for ACS; use antibiotics, oxygen, spirometry, and transfusion as needed." }
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
        { f: "How is primary vs secondary erythrocytosis distinguished?", b: "Serum EPO: low → polycythemia vera (JAK2 V617F in ~95%). Normal/high → secondary (hypoxia, smoking, OSA, testosterone, renal/hepatic tumors).", x: "Low EPO means autonomous marrow erythrocytosis; high EPO means a physiologic or tumor-driven response.", t: "Trap: Dehydration causes relative erythrocytosis, not low-EPO JAK2-positive PV." },
        { f: "What is the treatment of polycythemia vera?", b: "All: phlebotomy to Hct < 45% + low-dose aspirin. High risk (≥ 60 y or thrombosis): add hydroxyurea or interferon; ruxolitinib if refractory.", x: "Keeping Hct <45% reduces thrombosis; aspirin addresses platelet-mediated microvascular symptoms and clot risk.", t: "Trap: Low-risk PV still needs phlebotomy and aspirin; observation alone is inadequate." },
        { f: "Which myeloproliferative neoplasms carry JAK2, CALR, or MPL mutations?", b: "PV (JAK2 ~95%), essential thrombocythemia and primary myelofibrosis (JAK2, CALR, or MPL).", x: "These driver mutations activate JAK-STAT signaling and help distinguish clonal MPNs from reactive counts.", t: "Trap: BCR-ABL defines CML, not PV/ET/primary myelofibrosis." }
      ]
    },
    {
      id: "onc-psa",
      system: "ONC",
      task: "RISK",
      vignette: "A 61-year-old man asks whether he should have a PSA test. He has no urinary symptoms, is in good health, and has no family history of prostate cancer. He is not of African ancestry and has no known BRCA mutation.",
      leadIn: "What is the most appropriate recommendation?",
      options: [
        "Shared decision-making about PSA screening, discussing benefits and harms.",
        "Annual PSA with digital rectal examination for all men his age.",
        "PSA screening is not recommended at any age.",
        "Prostate MRI as the initial screening test."
      ],
      correct: 0,
      explanation: "USPSTF: for men <strong>55–69 years</strong>, PSA screening is an <strong>individual decision (grade C)</strong>. Discuss the small mortality benefit (about 1 prostate cancer death prevented per 1,000 men screened over 13 years) against <strong>false positives, biopsy complications, and overdiagnosis</strong> leading to incontinence and erectile dysfunction from treatment. Do not screen men <strong>≥ 70</strong> (grade D). DRE is not recommended for screening. Higher-risk men (Black men, strong family history, BRCA2) may benefit from earlier discussion.",
      flashcards: [
        { f: "USPSTF recommendation for prostate cancer screening?", b: "Age 55–69: individualized decision with shared decision-making (C). Age ≥ 70: do not screen (D).", x: "Screening has a small population mortality benefit but substantial individual harm variability, so values matter.", t: "Trap: PSA screening is not routine for all men; it is shared decision-making at 55–69." },
        { f: "What are the harms of PSA screening?", b: "False positives, biopsy complications (infection, bleeding), overdiagnosis and overtreatment → incontinence and erectile dysfunction.", x: "Many prostate cancers are indolent; detection can trigger biopsies and treatments that impair urinary/sexual function.", t: "Trap: A lower prostate cancer death rate does not mean fewer men harmed by overdiagnosis." },
        { f: "Which men are at higher prostate cancer risk?", b: "Black men, first-degree relatives with prostate cancer (especially < 65), and BRCA2 (and BRCA1) carriers.", x: "Genetics and family history shift baseline risk and may justify earlier or more detailed discussion.", t: "Trap: DRE is not recommended as a stand-alone screening strategy for average-risk men." }
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
        "Obtain a tissue diagnosis before starting any therapy.",
        "High-dose dexamethasone before biopsy.",
        "Systemic anticoagulation alone for presumed SVC thrombosis."
      ],
      correct: 1,
      explanation: "<strong>SVC syndrome</strong> is most often caused by <strong>lung cancer</strong> (especially small cell) or <strong>lymphoma</strong>. It develops over weeks and is rarely immediately life-threatening, so in a <strong>stable patient, tissue diagnosis comes first</strong>, because treatment depends on histology (chemotherapy for SCLC and lymphoma). Empiric radiation or steroids can <strong>obscure the diagnosis</strong>, especially for lymphoma. <strong>Stridor, laryngeal edema, or cerebral edema</strong> require urgent <strong>endovascular stenting</strong>.",
      flashcards: [
        { f: "What are the most common causes of SVC syndrome?", b: "Malignancy (non-small and small cell lung cancer, lymphoma) — increasingly intravascular devices/catheters with thrombosis.", x: "SVC obstruction causes venous congestion; malignancy remains common, but catheter thrombosis is increasing.", t: "Trap: Facial swelling and venous distention do not identify histology; diagnosis still matters." },
        { f: "What is the initial approach to SVC syndrome?", b: "Stable → tissue diagnosis first, then histology-directed therapy. Stridor, airway or cerebral edema → urgent endovascular stent.", x: "Most stable patients tolerate time for biopsy; therapy differs greatly for lymphoma, SCLC, NSCLC, or thrombosis.", t: "Trap: Stridor, airway compromise, or cerebral edema is an emergency requiring stenting before full workup." },
        { f: "Why avoid empiric steroids before biopsy of a mediastinal mass?", b: "Glucocorticoids can shrink lymphoma and render biopsy nondiagnostic.", x: "Steroids can lyse lymphoma cells and distort tissue architecture, lowering diagnostic yield.", t: "Trap: Empiric radiation/steroids before biopsy can delay correct lymphoma treatment." }
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
        { f: "Which patients get DAPT after TIA or stroke?", b: "Minor stroke (NIHSS ≤ 3) or high-risk TIA (ABCD² ≥ 4): aspirin + clopidogrel within 24 h for 21 days (CHANCE/POINT).", x: "Early recurrence risk is front-loaded; short DAPT reduces platelet-driven recurrence before bleeding risk accumulates.", t: "Trap: Continue DAPT only 21 days for most CHANCE/POINT patients; longer use increases bleeding." },
        { f: "What are the components of the ABCD² score?", b: "Age ≥ 60 (1), BP ≥ 140/90 (1), Clinical: unilateral weakness (2) or speech only (1), Duration ≥ 60 min (2) / 10–59 (1), Diabetes (1).", x: "ABCD² estimates early stroke risk after TIA using bedside vascular risk and symptom duration features.", t: "Trap: Low ABCD² does not replace urgent evaluation if symptoms suggest high-risk mechanism." },
        { f: "When is carotid endarterectomy indicated after TIA/stroke?", b: "Symptomatic ipsilateral stenosis 70–99% (and selected 50–69%), ideally within 2 weeks of the event.", x: "Early surgery prevents recurrent emboli from unstable carotid plaque after nondisabling events.", t: "Trap: Complete carotid occlusion is not treated with endarterectomy; stenosis must be surgically accessible." }
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
      explanation: "Warfarin-associated ICH requires immediate reversal with <strong>4-factor PCC</strong>, which corrects the INR within minutes and faster than FFP without the volume load, <strong>plus IV vitamin K 10 mg</strong> for sustained reversal once PCC wears off. Lower <strong>SBP to about 140 mm Hg</strong> (avoid &lt; 130) promptly. DOAC-associated ICH is reversed with <strong>idarucizumab</strong> (dabigatran) or <strong>andexanet alfa or 4F-PCC</strong> (factor Xa inhibitors). Platelet transfusion in antiplatelet-associated ICH without surgery is harmful (PATCH).",
      flashcards: [
        { f: "Reversal of warfarin in life-threatening bleeding?", b: "4-factor PCC (preferred over FFP) + IV vitamin K 10 mg.", x: "PCC supplies vitamin K-dependent factors immediately; vitamin K sustains reversal as infused factors wear off.", t: "Trap: FFP is slower and volume-heavy; do not use it first when 4F-PCC is available." },
        { f: "Reversal agents for DOACs?", b: "Dabigatran → idarucizumab. Apixaban/rivaroxaban → andexanet alfa or 4F-PCC.", x: "Specific antidotes bind dabigatran or factor Xa inhibitors; PCC is used when Xa antidote is unavailable or per protocol.", t: "Trap: Vitamin K reverses warfarin, not DOACs." },
        { f: "BP target in acute intracerebral hemorrhage?", b: "SBP lowered to ~140 mm Hg (range 130–150) within hours — avoid < 130.", x: "Moderate rapid BP lowering limits hematoma expansion while avoiding hypoperfusion from excessive reduction.", t: "Trap: Do not drive SBP below 130 in acute ICH; too low may worsen outcomes." }
      ]
    },
    {
      id: "psych-oud",
      system: "PSYCH",
      task: "RX",
      vignette: "A 31-year-old man with opioid use disorder (daily heroin and fentanyl) presents to the emergency department asking for help to stop using. His last use was 20 hours ago. He has yawning, rhinorrhea, piloerection, dilated pupils, restlessness, and abdominal cramping; Clinical Opiate Withdrawal Scale score is 15. He is not pregnant and has no liver disease.",
      leadIn: "What is the most appropriate management?",
      options: [
        "Start buprenorphine (buprenorphine-naloxone) now and arrange continued outpatient treatment.",
        "Start naltrexone today.",
        "Clonidine for withdrawal and referral to an abstinence-only program.",
        "Prescribe methadone tablets from the emergency department for home use."
      ],
      correct: 0,
      explanation: "<strong>Medications for OUD</strong> (buprenorphine, methadone) <strong>halve mortality</strong>. Start <strong>buprenorphine</strong> once the patient is in <strong>moderate withdrawal (COWS ≥ 8–12)</strong> to avoid precipitated withdrawal; with fentanyl this may take longer, and low-dose initiation is an option. The DATA-2000 X-waiver was eliminated in 2023, so any DEA-registered clinician can prescribe it. <strong>Naltrexone</strong> requires 7–10 opioid-free days. <strong>Methadone for OUD</strong> can be dispensed only through an opioid treatment program, not prescribed for home use. Detox without medication is associated with relapse and overdose death. Prescribe <strong>naloxone</strong> to all.",
      flashcards: [
        { f: "When is buprenorphine started in opioid withdrawal?", b: "Moderate withdrawal (COWS ≥ 8–12), usually 12–24 h after short-acting opioids — earlier dosing precipitates withdrawal.", x: "Buprenorphine has high receptor affinity and can displace full agonists; waiting for withdrawal avoids abrupt net agonist drop.", t: "Trap: Starting too soon after fentanyl/heroin can precipitate severe withdrawal." },
        { f: "What are the regulatory rules for OUD medications?", b: "Buprenorphine: any DEA-registered prescriber (X-waiver removed 2023). Methadone for OUD: only via certified opioid treatment programs.", x: "Regulations differ because methadone has higher overdose/diversion risk and is dispensed in structured OTPs.", t: "Trap: A hospital can administer methadone for withdrawal, but outpatient OUD methadone requires an OTP." },
        { f: "Naltrexone for OUD — key requirement?", b: "Must be opioid-free 7–10 days first (else precipitated withdrawal); extended-release IM monthly; also used for alcohol use disorder.", x: "Opioid blockade prevents relapse reward but also removes tolerance; detox first and counsel overdose risk after stopping.", t: "Trap: Naltrexone is not for patients needing opioid analgesics or not yet opioid-free." }
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
        { f: "Which drugs raise lithium levels?", b: "Thiazides, ACE inhibitors/ARBs, NSAIDs (not aspirin) — plus dehydration and CKD.", x: "Lithium reabsorption increases with proximal sodium retention; drugs that reduce renal perfusion or sodium loss raise levels.", t: "Trap: Acetaminophen does not raise lithium like NSAIDs do; NSAID interaction excludes aspirin in many references." },
        { f: "When is hemodialysis indicated in lithium toxicity?", b: "Level > 4.0 with impaired kidney function, or decreased consciousness, seizures, or dysrhythmias at any level; suggested for > 5.0 or confusion.", x: "Lithium is small, water soluble, and dialyzable; neurologic or cardiac toxicity overrides the numeric level.", t: "Trap: Activated charcoal is useless for lithium because it does not bind it." },
        { f: "Chronic adverse effects of lithium?", b: "Nephrogenic diabetes insipidus, CKD, hypothyroidism, hyperparathyroidism/hypercalcemia, tremor, weight gain; Ebstein anomaly risk in pregnancy (small).", x: "Chronic renal and endocrine effects require periodic creatinine, TSH, and calcium monitoring.", t: "Trap: New polyuria on lithium suggests nephrogenic DI, not psychogenic polydipsia alone." }
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
        { f: "Older adult with pruritic tense bullae, mucosal sparing, Nikolsky negative: diagnosis?", b: "Bullous pemphigoid: linear IgG/C3 at basement membrane from anti-BP180/BP230 antibodies.", x: "Subepidermal splitting makes bullae tense and less likely to rupture; age and itch often precede blisters by weeks.", t: "Trap: Pemphigus vulgaris has flaccid bullae, oral erosions, Nikolsky positive, and intercellular IgG." },
        { f: "Which medication class is a recognized trigger for bullous pemphigoid in older adults?", b: "DPP-4 inhibitors such as sitagliptin; also loops, spironolactone, and checkpoint inhibitors.", x: "Stopping the culprit is part of treatment because drug-triggered disease may persist if exposure continues.", t: "Trap: SGLT2 inhibitors cause genital mycotic infection/euglycemic DKA, not classic bullous pemphigoid." },
        { f: "First-line treatment for localized or moderate bullous pemphigoid?", b: "High-potency topical corticosteroids, especially clobetasol.", x: "Topical clobetasol can control disease with fewer systemic steroid harms in frail older patients.", t: "Trap: Systemic prednisone is reserved for extensive disease or failed topical therapy; do not start as default." }
      ]
    },
    {
      id: "derm-dress",
      system: "DERM",
      task: "NEXT",
      vignette: "A 66-year-old man started allopurinol 5 weeks ago for gout. He now has fever 39.0 °C, a diffuse morbilliform rash covering 70% of his body, marked facial edema, and generalized lymphadenopathy. There are no mucosal erosions or blisters. WBC 15,400/µL with 18% eosinophils and atypical lymphocytes; ALT 412 U/L; creatinine 1.8 mg/dL (baseline 1.0).",
      leadIn: "What is the most appropriate management?",
      options: [
        "Continue allopurinol at a lower dose and add an antihistamine.",
        "Switch allopurinol to febuxostat and observe.",
        "Empiric IV vancomycin and piperacillin-tazobactam.",
        "Stop allopurinol permanently and start systemic glucocorticoids with a slow taper."
      ],
      correct: 3,
      explanation: "Fever, extensive morbilliform rash, <strong>facial edema</strong>, lymphadenopathy, <strong>eosinophilia/atypical lymphocytes</strong>, and <strong>internal organ involvement</strong> (hepatitis, AKI) <strong>2–8 weeks</strong> after starting a drug = <strong>DRESS</strong> (drug reaction with eosinophilia and systemic symptoms). Common culprits are allopurinol, anticonvulsants, sulfonamides, vancomycin, and minocycline. Management: <strong>stop the drug permanently</strong> and give <strong>systemic glucocorticoids</strong> for organ involvement, tapered over <strong>6–8+ weeks</strong> because relapse is common. Monitor later for <strong>autoimmune thyroiditis</strong> and diabetes. HHV-6 reactivation is typical.",
      flashcards: [
        { f: "Fever, facial edema, eosinophilia, hepatitis/AKI 2–8 weeks after allopurinol: diagnosis?", b: "DRESS: drug reaction with eosinophilia and systemic symptoms.", x: "Delayed T-cell drug hypersensitivity may reactivate herpesviruses and injure organs, especially liver and kidney.", t: "Trap: SJS/TEN occurs sooner with mucosal erosions and skin detachment, not prominent eosinophilia." },
        { f: "Management of DRESS with internal organ involvement?", b: "Permanently stop the culprit drug and give systemic glucocorticoids with a slow ≥6–8 week taper.", x: "Relapses are common if steroids are tapered quickly; monitor CBC, liver, kidney, and later thyroid/glucose.", t: "Trap: Antihistamines alone treat simple morbilliform eruptions, not DRESS with hepatitis or AKI." },
        { f: "Common drug triggers of DRESS?", b: "Allopurinol, aromatic anticonvulsants, sulfonamides, vancomycin, minocycline, and dapsone.", x: "Allopurinol risk rises with kidney disease and certain HLA types; rechallenge can be life-threatening.", t: "Trap: Amoxicillin rash with EBV is common but lacks facial edema, eosinophilia, and organ injury." }
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
        { f: "What diagnostic criteria establish PCOS after excluding mimics?", b: "Rotterdam: 2 of 3: oligo/anovulation, hyperandrogenism, polycystic ovaries.", x: "Exclude thyroid disease, hyperprolactinemia, and nonclassic CAH because they can cause irregular menses or androgen excess.", t: "Trap: Polycystic ovaries alone do not diagnose PCOS; one other criterion is needed." },
        { f: "First-line treatment for PCOS when pregnancy is not desired?", b: "Combined hormonal contraceptive; add spironolactone for persistent hirsutism with contraception.", x: "Progestin exposure protects the endometrium from chronic unopposed estrogen and reduces ovarian androgen production.", t: "Trap: Letrozole is first-line for ovulation induction when pregnancy is desired, not cycle control." },
        { f: "What metabolic screening is recommended in PCOS?", b: "Screen for diabetes with OGTT or A1c, dyslipidemia, hypertension, depression, and OSA.", x: "Insulin resistance and obesity increase lifetime cardiometabolic risk even in young patients.", t: "Trap: Normal BMI does not exclude metabolic risk; lean PCOS still needs screening." }
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
      explanation: "<strong>Any postmenopausal bleeding is endometrial cancer until proven otherwise</strong>, especially with obesity and diabetes (unopposed estrogen). Initial evaluation is <strong>transvaginal ultrasound or endometrial biopsy</strong>. An <strong>endometrial thickness ≤ 4 mm</strong> has a very high negative predictive value. A thickness <strong>&gt; 4 mm</strong>, or <strong>persistent bleeding</strong> regardless of thickness, requires <strong>endometrial sampling</strong>. If office biopsy is nondiagnostic, proceed to hysteroscopy with D&amp;C. Lynch syndrome raises lifetime endometrial cancer risk to 40–60%.",
      flashcards: [
        { f: "Postmenopausal bleeding with endometrial thickness >4 mm: next step?", b: "Endometrial biopsy; persistent bleeding needs sampling even if stripe is ≤4 mm.", x: "A thin stripe has high negative predictive value, but recurrent bleeding can miss focal cancer or polyps.", t: "Trap: Reassurance is only reasonable after a single episode with stripe ≤4 mm and no recurrent bleeding." },
        { f: "Major risk factors for endometrial cancer?", b: "Unopposed estrogen, obesity, chronic anovulation/PCOS, tamoxifen, diabetes, nulliparity, Lynch syndrome.", x: "Peripheral aromatization in adipose tissue drives estrogen exposure without progesterone opposition.", t: "Trap: Combined estrogen-progestin therapy protects the endometrium; estrogen-only therapy increases risk." },
        { f: "Hormone therapy rule for menopausal patients with an intact uterus?", b: "Give estrogen with a progestogen or bazedoxifene to prevent endometrial hyperplasia/cancer.", x: "Progesterone converts proliferative endometrium to secretory and counteracts estrogen-driven growth.", t: "Trap: Estrogen alone is appropriate only after hysterectomy, not with a uterus." }
      ]
    },
    {
      id: "geri-bpsd",
      system: "GERI",
      task: "NEXT",
      vignette: "An 84-year-old woman with moderate Alzheimer dementia in assisted living has become increasingly agitated over 2 weeks, especially during morning care, calling out and pushing staff away. She has severe knee osteoarthritis and grimaces when her legs are moved. She takes donepezil only. She has no fever, urinary symptoms, or constipation, and urinalysis and basic labs are normal.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Start risperidone.",
        "Start lorazepam before morning care.",
        "Scheduled acetaminophen and individualized nonpharmacologic care approaches.",
        "Increase donepezil and add diphenhydramine at night."
      ],
      correct: 2,
      explanation: "<strong>Behavioral and psychological symptoms of dementia</strong> often reflect an <strong>unmet need</strong> such as <strong>pain</strong>, infection, constipation, urinary retention, or sensory deprivation, because patients cannot report symptoms. Agitation during care in someone with painful OA calls for <strong>scheduled analgesia</strong> (acetaminophen), which reduces agitation in trials. Combine it with <strong>nonpharmacologic strategies</strong> (DICE approach, caregiver techniques, routine). <strong>Antipsychotics</strong> carry a <strong>boxed warning for increased mortality</strong> (stroke, infection) in dementia and are reserved for dangerous behavior or psychosis after other measures fail. Benzodiazepines and anticholinergics worsen cognition and falls (Beers).",
      flashcards: [
        { f: "First step for agitation during care in a patient with dementia and painful osteoarthritis?", b: "Treat pain with scheduled acetaminophen and use individualized nonpharmacologic care.", x: "Agitation often signals unmet needs because dementia impairs symptom reporting; analgesia can reduce behaviors.", t: "Trap: Antipsychotics are not first-line unless danger or severe psychosis persists after reversible triggers." },
        { f: "What boxed warning applies to antipsychotics in dementia-related psychosis?", b: "Increased mortality, often cardiovascular or infectious; use the lowest dose briefly only if necessary.", x: "They also increase stroke, parkinsonism, sedation, orthostasis, and falls in frail older adults.", t: "Trap: Benzodiazepines are not safer; they worsen delirium, cognition, gait, and falls." },
        { f: "Which Alzheimer drugs are used by stage?", b: "Donepezil/rivastigmine mild–severe; galantamine mild–moderate; memantine moderate–severe.", x: "Cholinesterase inhibitors give modest symptomatic benefit but may cause bradycardia, syncope, nausea, and weight loss.", t: "Trap: These drugs do not rapidly control agitation; look for pain, infection, constipation, or retention first." }
      ]
    },
    {
      id: "found-nnt",
      system: "FOUND",
      task: "RISK",
      vignette: "In a randomized trial of a new anticoagulant for patients with atrial fibrillation, stroke occurred in 4% of patients receiving placebo and 3% of patients receiving the drug over 2 years. Major bleeding occurred in 1% with placebo and 2% with the drug.",
      leadIn: "How many patients must be treated for 2 years to prevent one stroke?",
      options: [
        "25",
        "4",
        "33",
        "100"
      ],
      correct: 3,
      explanation: "<strong>Absolute risk reduction (ARR)</strong> = control event rate − treatment event rate = 4% − 3% = <strong>1%</strong> (0.01). <strong>NNT = 1/ARR = 100</strong>. The <strong>relative risk reduction</strong> = ARR / control rate = 1/4 = <strong>25%</strong>, which sounds more impressive. The <strong>number needed to harm</strong> for major bleeding = 1/(2% − 1%) = <strong>100</strong>, so for every 100 patients treated, one stroke is prevented and one major bleed is caused.",
      flashcards: [
        { f: "How do you calculate absolute risk reduction and NNT from a trial?", b: "ARR = control event rate − treatment event rate; NNT = 1/ARR, rounded up.", x: "Use absolute proportions, not percentages; NNT applies over the trial time horizon.", t: "Trap: Relative risk reduction sounds larger but does not give the number of patients helped." },
        { f: "How is relative risk reduction calculated?", b: "RRR = ARR ÷ control event rate = 1 − relative risk.", x: "RRR describes proportional benefit; it can look impressive when baseline risk is low.", t: "Trap: A 25% RRR may be only a 1% ARR if events fall from 4% to 3%." },
        { f: "How is number needed to harm calculated?", b: "NNH = 1 ÷ absolute risk increase for the adverse event, rounded up.", x: "Compare NNT and NNH over the same duration to judge net clinical tradeoffs.", t: "Trap: Do not subtract adverse-event relative risks; use absolute event-rate differences." }
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
      explanation: "Professional ethics (ACP Ethics Manual) and safety culture require <strong>prompt, honest disclosure of errors that reach the patient</strong>, even when no harm resulted. Disclosure should include <strong>what happened, the implications for the patient, an apology, and steps to prevent recurrence</strong>. <strong>Reporting</strong> to the institutional patient-safety system supports <strong>systems-based root cause analysis</strong> in a <strong>just culture</strong> that does not blame individuals. Disclosure does not increase, and may decrease, malpractice claims.",
      flashcards: [
        { f: "What should a physician do after a medication error reaches a patient but causes no harm?", b: "Disclose promptly, apologize, explain implications, and report through the safety system.", x: "Transparency preserves trust and reporting enables system fixes that reduce recurrence.", t: "Trap: Near misses are reported internally, but errors reaching the patient also require patient disclosure." },
        { f: "Key elements of medical error disclosure?", b: "What happened, clinical consequences, apology, care plan, and steps to prevent recurrence.", x: "Avoid speculation or blame; give known facts and update the patient as more information emerges.", t: "Trap: Do not wait for proof of harm before disclosure if the error reached the patient." },
        { f: "What is root cause analysis after an adverse event?", b: "A structured systems review to find latent failures in a just culture, not to blame one person.", x: "It asks how defenses failed: communication, workflow, equipment, staffing, and handoffs.", t: "Trap: Peer review of individual negligence is different from RCA focused on preventable system defects." }
      ]
    },
    {
      id: "found-preop-mets",
      system: "FOUND",
      task: "TEST",
      vignette: "A 68-year-old man with type 2 diabetes (on metformin), hypertension, and hyperlipidemia is scheduled for elective laparoscopic colectomy for a colon adenocarcinoma. He has no history of coronary disease, heart failure, or stroke, and no chest pain or dyspnea. He walks his dog 2 miles daily and climbs two flights of stairs without symptoms. ECG is normal.",
      leadIn: "What is the most appropriate preoperative cardiac evaluation?",
      options: [
        "Pharmacologic nuclear stress test.",
        "Transthoracic echocardiogram.",
        "No further testing; proceed with surgery.",
        "Coronary CT angiography."
      ],
      correct: 2,
      explanation: "Per ACC/AHA (2024) perioperative guidelines, assess <strong>surgical risk</strong> (intraperitoneal = elevated risk), <strong>clinical risk</strong> (RCRI 1 point for intraperitoneal surgery; metformin-treated diabetes does not count), and <strong>functional capacity</strong>. Patients able to do <strong>≥ 4 METs</strong> without symptoms (climbing 2 flights of stairs, brisk walking) can <strong>proceed to surgery without stress testing</strong>. Testing is only for those with poor or unknown functional capacity in whom results would change management. Prophylactic revascularization before noncardiac surgery does not improve outcomes.",
      flashcards: [
        { f: "When is preoperative stress testing indicated before noncardiac surgery?", b: "Elevated-risk surgery plus poor/unknown functional capacity <4 METs, only if results change management.", x: "Testing low-risk or functional patients delays care and rarely improves outcomes.", t: "Trap: Good functional capacity ≥4 METs means proceed without stress testing even for elevated-risk surgery." },
        { f: "What are the six Revised Cardiac Risk Index predictors?", b: "High-risk surgery, ischemic heart disease, heart failure, cerebrovascular disease, insulin diabetes, Cr >2.", x: "RCRI estimates perioperative major cardiac events and guides testing only with functional status and surgical risk.", t: "Trap: Diabetes controlled without insulin is not an RCRI point." },
        { f: "What activities suggest functional capacity of at least 4 METs?", b: "Climbing 1–2 flights of stairs, walking uphill, brisk 4-mph walking, heavy housework, doubles tennis.", x: "Ability to perform these without ischemic symptoms predicts acceptable perioperative cardiac reserve.", t: "Trap: Inability from arthritis may make capacity unknown; testing still only if it would change management." }
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
        { f: "Tinnitus with respiratory alkalosis plus anion-gap metabolic acidosis suggests what poisoning?", b: "Salicylate toxicity.", x: "Salicylates stimulate the medullary respiratory center early and later uncouple oxidative phosphorylation causing acidosis.", t: "Trap: DKA causes anion-gap acidosis without primary respiratory alkalosis or tinnitus." },
        { f: "Treatment to enhance salicylate elimination after activated charcoal?", b: "IV sodium bicarbonate to alkalinize urine to pH 7.5–8.0, with potassium repletion.", x: "Alkaline urine traps ionized salicylate and reduces CNS penetration; hypokalemia prevents urine alkalinization.", t: "Trap: Intubation can be dangerous; loss of hyperventilation causes abrupt acidemia and CNS salicylate shift." },
        { f: "When is hemodialysis indicated for salicylate poisoning?", b: "Level >100 mg/dL, >90 with kidney impairment, AMS, pulmonary edema/hypoxemia, pH ≤7.20, or failed therapy.", x: "Dialysis rapidly clears salicylate and corrects acid-base/electrolyte derangements in severe toxicity.", t: "Trap: Do not rely on level alone; symptoms and acidemia can mandate dialysis at lower levels." }
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
        { f: "Core temperature >40 °C with confusion during exertion: diagnosis?", b: "Exertional heat stroke.", x: "CNS dysfunction distinguishes heat stroke from heat exhaustion and predicts multiorgan injury.", t: "Trap: Sweating can be present in exertional heat stroke; anhidrosis is not required." },
        { f: "Immediate treatment for exertional heat stroke?", b: "Cold-water immersion; cool to <39 °C within 30 minutes, then transport.", x: "Time above critical temperature drives mortality: cool first, transport second when feasible.", t: "Trap: Acetaminophen and NSAIDs do not work because the hypothalamic set point is normal." },
        { f: "Major complications to monitor after heat stroke?", b: "Rhabdomyolysis, AKI, DIC, liver injury, ARDS, hypoglycemia, hyperkalemia, and hypocalcemia.", x: "Thermal injury and muscle breakdown can evolve after initial cooling, so serial labs and urine output matter.", t: "Trap: Dantrolene treats malignant hyperthermia, not ordinary exertional heat stroke." }
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
        "Apixaban 5 mg twice daily.",
        "Rivaroxaban 20 mg daily.",
        "Aspirin plus clopidogrel."
      ],
      correct: 0,
      explanation: "AF with <strong>moderate–severe rheumatic mitral stenosis</strong> is a form of \"valvular AF\" that is excluded from the DOAC trials. Anticoagulate <strong>regardless of CHA₂DS₂-VASc</strong>, and use a <strong>vitamin K antagonist (warfarin, INR 2–3)</strong>. The <strong>INVICTUS</strong> trial showed rivaroxaban led to <strong>more deaths and strokes</strong> than VKA in rheumatic heart disease. DOACs <em>are</em> acceptable in AF with other native valve disease (e.g., aortic stenosis, mitral regurgitation) and > 3 months after a bioprosthetic valve. Mechanical valves also require warfarin. Dual antiplatelet therapy is not a substitute for anticoagulation.",
      flashcards: [
        { f: "AF with moderate–severe rheumatic mitral stenosis: preferred anticoagulant?", b: "Warfarin with INR goal 2.0–3.0, regardless of CHA₂DS₂-VASc.", x: "Rheumatic MS carries high left atrial thrombus risk and was excluded from DOAC AF trials.", t: "Trap: DOACs are acceptable for many native valve lesions, but not rheumatic MS." },
        { f: "Which valve conditions require warfarin rather than a DOAC for AF?", b: "Mechanical heart valve and moderate–severe rheumatic mitral stenosis.", x: "INVICTUS showed worse outcomes with rivaroxaban than VKA in rheumatic heart disease.", t: "Trap: A bioprosthetic valve >3 months after surgery usually can use a DOAC if otherwise appropriate." },
        { f: "Classic auscultation finding of mitral stenosis?", b: "Opening snap followed by a low-pitched diastolic rumble at the apex.", x: "A shorter A2-to-opening-snap interval suggests more severe stenosis from higher left atrial pressure.", t: "Trap: Mitral regurgitation is a holosystolic blowing murmur radiating to the axilla." }
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
        { f: "Which cardiac patients need endocarditis prophylaxis before qualifying dental procedures?", b: "Prosthetic valve/material, prior IE, select congenital heart disease, or transplant valvulopathy.", x: "Prophylaxis is limited to highest-risk patients when gingiva, periapical tissue, or oral mucosa is manipulated.", t: "Trap: Bicuspid valve, MVP, and native stenosis/regurgitation alone do not qualify." },
        { f: "Standard antibiotic prophylaxis regimen for dental IE prevention?", b: "Amoxicillin 2 g orally 30–60 minutes before the procedure.", x: "For penicillin allergy, use azithromycin 500 mg or doxycycline 100 mg; avoid clindamycin.", t: "Trap: Clindamycin is no longer preferred because of C. difficile and adverse reactions." },
        { f: "Do GI or GU procedures require infective endocarditis prophylaxis?", b: "No, IE prophylaxis is not recommended for GI or GU procedures.", x: "Transient bacteremia from daily activities exceeds most procedure-related risk; dental prophylaxis is narrowly targeted.", t: "Trap: Give antibiotics for active infection when indicated, but that is treatment, not IE prophylaxis." }
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
      explanation: "Elective repair is indicated for an AAA <strong>≥ 5.5 cm in men</strong>, <strong>≥ 5.0 cm in women</strong>, growth <strong>≥ 0.5 cm per year</strong>, or <strong>any symptoms</strong> (pain, tenderness). Below these thresholds, risk of repair exceeds risk of rupture. ACC/AHA 2022 surveillance intervals: <strong>3.0–3.9 cm every 3 years</strong>, <strong>4.0–4.9 cm every 12 months</strong>, <strong>5.0–5.4 cm every 6 months</strong>. <strong>Smoking cessation</strong> is the most important modifiable step to slow growth; also control BP and treat atherosclerotic risk (statin). Doxycycline and other drugs have not been shown to slow AAA growth.",
      flashcards: [
        { f: "AAA size threshold for elective repair in asymptomatic patients?", b: "Men ≥5.5 cm; women ≥5.0 cm; either sex if symptomatic or growth ≥0.5 cm/year.", x: "Rupture risk rises steeply at these diameters; below them surveillance is usually safer than repair.", t: "Trap: A 4.5-cm asymptomatic AAA is surveilled, not repaired." },
        { f: "Ultrasound surveillance intervals for AAA 3.0–5.4 cm?", b: "3.0–3.9 cm every 3 years; 4.0–4.9 cm yearly; 5.0–5.4 cm every 6 months.", x: "Surveillance shortens as diameter increases because expansion and rupture risks accelerate.", t: "Trap: CT angiography is for repair planning or symptoms, not routine surveillance of stable small AAAs." },
        { f: "Most important modifiable intervention to slow AAA growth/rupture?", b: "Smoking cessation, plus BP control and statin therapy for atherosclerotic risk.", x: "Smoking is the strongest modifiable risk for AAA formation, expansion, and rupture.", t: "Trap: Doxycycline and other medications have not reliably slowed AAA growth." }
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
        { f: "High-altitude pulmonary edema treatment?", b: "Immediate descent and supplemental oxygen; use nifedipine or portable hyperbaric chamber if descent/O₂ unavailable.", x: "HAPE is noncardiogenic edema from hypoxic pulmonary vasoconstriction, so reversing hypoxia is key.", t: "Trap: Diuretics are not recommended; patients are often volume depleted." },
        { f: "High-altitude cerebral edema vs acute mountain sickness: treatment?", b: "HACE: descent plus dexamethasone. AMS: stop ascent, acetazolamide, analgesics/antiemetics.", x: "Ataxia or confusion at altitude is HACE until proven otherwise and requires urgent descent.", t: "Trap: Acetazolamide helps AMS prevention/treatment but is not definitive treatment for HACE." },
        { f: "Mechanism of high-altitude pulmonary edema?", b: "Uneven exaggerated hypoxic pulmonary vasoconstriction → high capillary pressure → leak edema.", x: "Susceptible people develop patchy overperfusion of capillaries despite normal left-sided filling pressures.", t: "Trap: HAPE is not heart failure; normal JVP and no cardiomegaly support noncardiogenic edema." }
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
        { f: "Diagnostic criteria for obesity hypoventilation syndrome?", b: "BMI ≥30, awake PaCO₂ >45 mm Hg, and no alternative cause of hypoventilation.", x: "Most patients also have OSA, but OSA alone should not cause daytime hypercapnia.", t: "Trap: Normal spirometry helps exclude COPD as the cause of chronic hypercapnia." },
        { f: "Serum chemistry clue suggesting obesity hypoventilation syndrome?", b: "Serum bicarbonate ≥27 mEq/L; confirm with arterial blood gas.", x: "Kidneys retain bicarbonate to compensate for chronic respiratory acidosis from hypoventilation.", t: "Trap: Pulse oximetry alone cannot diagnose OHS; hypercapnia is required." },
        { f: "Treatment for obesity hypoventilation syndrome?", b: "Positive airway pressure plus weight loss; CPAP if severe OSA, otherwise NIV/bilevel.", x: "PAP lowers nocturnal hypoventilation, improves gas exchange, and reduces pulmonary hypertension risk.", t: "Trap: Oxygen alone can worsen CO₂ retention and does not fix hypoventilation." }
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
        { f: "Gross hematuria 1–3 days after URI with normal complement: diagnosis?", b: "IgA nephropathy with synpharyngitic hematuria.", x: "Mesangial IgA deposition causes recurrent mucosal infection-associated hematuria, often in young adults.", t: "Trap: Post-strep GN occurs 1–3 weeks after pharyngitis and has low C3." },
        { f: "Which glomerulonephritides typically have low complement?", b: "Post-infectious GN, lupus nephritis, MPGN/cryoglobulinemia, and endocarditis-associated GN.", x: "Complement consumption points toward immune-complex disease rather than IgA nephropathy or ANCA vasculitis.", t: "Trap: Anti-GBM and pauci-immune ANCA RPGN usually have normal complement." },
        { f: "Supportive treatment for proteinuric IgA nephropathy?", b: "Max-dose ACE inhibitor or ARB plus SGLT2 inhibitor and BP control.", x: "Lowering intraglomerular pressure and proteinuria slows CKD progression independent of immunosuppression.", t: "Trap: Steroids are not first-line for low-risk disease; reserve immunosuppression for persistent high-risk proteinuria." }
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
        { f: "Urgent treatment for anti-GBM disease with pulmonary hemorrhage and RPGN?", b: "Plasma exchange plus high-dose glucocorticoids and cyclophosphamide.", x: "Plasma exchange removes antibody; immunosuppression stops new antibody production and limits crescents.", t: "Trap: Do not wait for biopsy if classic lung hemorrhage with RPGN strongly suggests anti-GBM." },
        { f: "Immunofluorescence pattern in anti-GBM disease vs immune-complex GN vs ANCA vasculitis?", b: "Anti-GBM linear IgG; immune-complex granular; ANCA pauci-immune.", x: "The staining pattern reflects antibody binding directly to GBM versus deposited complexes versus little immune deposition.", t: "Trap: Lupus nephritis is granular full-house, not linear IgG." },
        { f: "Target antigen in Goodpasture anti-GBM disease?", b: "α3 chain of type IV collagen in glomerular and alveolar basement membranes.", x: "Shared antigen explains the pulmonary-renal syndrome; smoking can expose alveolar basement membrane.", t: "Trap: PLA2R is membranous nephropathy, not anti-GBM disease." }
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
      explanation: "This is <strong>severe Plasmodium falciparum malaria</strong> (West Africa, multiple rings per RBC). Severe criteria include <strong>impaired consciousness, parasitemia ≥ 5%</strong>, severe anemia, AKI, hypoglycemia, acidosis, ARDS, shock, or jaundice. <strong>IV artesunate</strong> is the treatment of choice (available in the US from the CDC and commercially); it lowers mortality versus quinine. Follow it with a full oral course (e.g., artemether–lumefantrine). Oral regimens are for <strong>uncomplicated</strong> malaria. Chloroquine resistance is widespread for P. falciparum. Watch for <strong>delayed hemolysis</strong> 1–3 weeks after artesunate. For P. vivax/ovale, add primaquine or tafenoquine (check G6PD first) to kill liver hypnozoites.",
      flashcards: [
        { f: "Treatment of severe Plasmodium falciparum malaria?", b: "IV artesunate, followed by a full oral antimalarial course such as artemether-lumefantrine.", x: "Artesunate rapidly lowers parasite burden and mortality; delayed hemolysis can occur 1–3 weeks later.", t: "Trap: Oral regimens alone are for uncomplicated malaria, not severe disease." },
        { f: "Findings that define severe malaria?", b: "AMS, parasitemia ≥5%, severe anemia, AKI, hypoglycemia, acidosis, ARDS, shock, jaundice, or bleeding.", x: "Severe falciparum causes microvascular sequestration, organ dysfunction, and rapid deterioration.", t: "Trap: Fever after travel with low parasitemia and no organ dysfunction may be uncomplicated, but monitor closely." },
        { f: "What extra treatment is needed for P. vivax or P. ovale?", b: "Primaquine or tafenoquine for liver hypnozoites after checking G6PD.", x: "Dormant hypnozoites cause relapses unless eradicated; G6PD deficiency risks severe hemolysis with these drugs.", t: "Trap: P. falciparum has no hypnozoite stage, so primaquine is not used for relapse prevention." }
      ]
    },
    {
      id: "id-cmv-transplant",
      system: "ID",
      task: "TEST",
      vignette: "A 48-year-old woman received a deceased-donor kidney transplant 5 months ago (donor CMV IgG positive, recipient negative). She completed 3 months of valganciclovir prophylaxis. She now has 1 week of fever, fatigue, and diarrhea. She takes tacrolimus, mycophenolate, and prednisone. WBC count is 2,600/µL, platelets 98,000/µL, and AST/ALT are mildly elevated.",
      leadIn: "Which test is most appropriate to establish the diagnosis?",
      options: [
        "Quantitative CMV PCR in plasma.",
        "CMV IgG serology to look for a rise in titer.",
        "CMV IgM serology to detect acute infection.",
        "Urine CMV shell-vial culture."
      ],
      correct: 0,
      explanation: "Donor-positive/recipient-negative (<strong>D+/R−</strong>) is the highest-risk combination for <strong>CMV disease</strong>, which often appears <strong>after prophylaxis is stopped</strong> (\"late-onset CMV\"). Typical features: fever, <strong>leukopenia, thrombocytopenia</strong>, hepatitis, colitis, pneumonitis, and allograft dysfunction. Diagnose with <strong>quantitative plasma CMV PCR</strong> (viral load); tissue biopsy confirms invasive disease (e.g., colitis, where blood PCR can be low). <strong>Serology is not useful</strong> in immunosuppressed patients. Urine culture shows shedding, not disease. Treat with <strong>oral valganciclovir</strong> (mild–moderate) or <strong>IV ganciclovir</strong> (severe), and reduce immunosuppression when possible (often mycophenolate).",
      flashcards: [
        { f: "Highest-risk donor/recipient CMV serostatus in solid organ transplant?", b: "Donor positive / recipient negative, D+/R−.", x: "Primary CMV infection after transplant can appear late after prophylaxis stops and injure the allograft.", t: "Trap: Recipient-positive patients can reactivate CMV but are lower risk than D+/R−." },
        { f: "Best test to diagnose CMV disease in a transplant recipient?", b: "Quantitative plasma CMV PCR; biopsy confirms tissue-invasive disease.", x: "Viral load helps diagnose and monitor response, but colitis or pneumonitis may need tissue proof.", t: "Trap: CMV serology is not useful after transplant; urine shedding does not prove disease." },
        { f: "Treatment of CMV disease after transplant?", b: "Valganciclovir for mild–moderate disease or IV ganciclovir for severe disease; reduce immunosuppression if possible.", x: "Both drugs can cause neutropenia and thrombocytopenia, so blood counts guide monitoring.", t: "Trap: Acyclovir treats HSV/VZV and is inadequate for established CMV disease." }
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
        { f: "Preferred analgesic/antipyretic for suspected dengue?", b: "Acetaminophen with oral fluids; avoid aspirin and NSAIDs.", x: "Thrombocytopenia and capillary fragility increase bleeding risk, which NSAIDs/aspirin worsen.", t: "Trap: Ibuprofen may be fine for viral fever generally, but not when dengue is suspected." },
        { f: "Warning signs that dengue may progress to severe disease?", b: "Abdominal pain, persistent vomiting, mucosal bleeding, lethargy, hepatomegaly, fluid accumulation, rising Hct with falling platelets.", x: "These findings mark plasma leakage and impending shock during the critical phase.", t: "Trap: Platelet count alone is less important than bleeding, hemodynamics, and hemoconcentration." },
        { f: "When is dengue most dangerous after fever onset?", b: "Around defervescence, days 3–7, when plasma leakage can cause shock.", x: "Patients may feel fever is improving just as vascular permeability peaks, so anticipatory counseling matters.", t: "Trap: Prophylactic platelet transfusion is not recommended without significant bleeding." }
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
        { f: "Fleischner follow-up for a solitary solid pulmonary nodule <6 mm in a low-risk adult?", b: "No routine follow-up imaging.", x: "Cancer probability is extremely low, and serial CT adds radiation, cost, and anxiety.", t: "Trap: Lung-RADS, not Fleischner, applies to formal lung cancer screening CTs." },
        { f: "Fleischner follow-up for a solitary solid nodule 6–8 mm?", b: "CT at 6–12 months; if high risk, repeat CT at 18–24 months.", x: "Growth over time is more informative than PET for small nodules.", t: "Trap: PET-CT is unreliable for nodules smaller than about 8 mm." },
        { f: "Management options for a solitary solid pulmonary nodule >8 mm?", b: "CT at 3 months, PET-CT, or tissue sampling, based on risk and morphology.", x: "Pretest probability, spiculation, upper-lobe site, smoking, and age guide how aggressive to be.", t: "Trap: Fleischner does not apply to patients with known cancer or immunosuppression." }
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
        { f: "Colonoscopy interval for Lynch syndrome due to MLH1/MSH2?", b: "Every 1–2 years starting age 20–25 or 2–5 years before the earliest family diagnosis.", x: "Accelerated adenoma-to-cancer progression makes frequent colonoscopy lifesaving.", t: "Trap: Average-risk 10-year colonoscopy intervals are unsafe in Lynch syndrome." },
        { f: "Genes and tumor phenotype in Lynch syndrome?", b: "Germline mismatch repair defects: MLH1, MSH2, MSH6, PMS2, or EPCAM; tumors are MSI-high.", x: "Loss of mismatch repair causes microsatellite instability and rapid accumulation of mutations.", t: "Trap: APC causes familial adenomatous polyposis with hundreds of polyps, not Lynch." },
        { f: "Most common extracolonic cancer in women with Lynch syndrome?", b: "Endometrial cancer; also ovarian, gastric, small bowel, and urothelial cancers.", x: "Risk-reducing hysterectomy and salpingo-oophorectomy can be considered after childbearing.", t: "Trap: Breast cancer is not the classic defining extracolonic Lynch cancer on boards." }
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
      explanation: "<strong>Waldenström macroglobulinemia</strong> (lymphoplasmacytic lymphoma, <strong>MYD88 L265P</strong> in > 90%) produces large pentameric <strong>IgM</strong>, which causes <strong>hyperviscosity syndrome</strong>: mucosal bleeding, visual change with retinal venous engorgement, headache, dizziness, and heart failure. Hyperviscosity is an <strong>oncologic emergency</strong> treated with urgent <strong>plasmapheresis</strong> (IgM is mostly intravascular, so removal is very effective), followed by definitive therapy (e.g., <strong>bendamustine–rituximab</strong> or a BTK inhibitor). <strong>Avoid RBC transfusion before plasmapheresis</strong> because it further increases viscosity. Rituximab given alone can cause an <strong>IgM flare</strong>, so plasmapheresis comes first when IgM is very high.",
      flashcards: [
        { f: "Immediate treatment for hyperviscosity syndrome from Waldenström macroglobulinemia?", b: "Urgent plasmapheresis; avoid RBC transfusion before pheresis.", x: "IgM is mostly intravascular, so plasmapheresis rapidly lowers viscosity and relieves neurologic/visual bleeding symptoms.", t: "Trap: Chemotherapy treats the clone later but is too slow for acute hyperviscosity." },
        { f: "Hallmarks of Waldenström macroglobulinemia?", b: "IgM monoclonal protein, lymphoplasmacytic marrow infiltrate, MYD88 L265P, hyperviscosity/neuropathy.", x: "Pentameric IgM is large and drives serum viscosity more than IgG at similar M-protein levels.", t: "Trap: Multiple myeloma usually has lytic bone lesions, renal failure, and IgG/IgA light-chain disease." },
        { f: "Why perform plasmapheresis before rituximab when IgM is very high?", b: "Rituximab can cause an IgM flare that worsens hyperviscosity.", x: "Debulking intravascular IgM first prevents transient symptom worsening while definitive therapy begins.", t: "Trap: Steroids or rituximab alone are not enough for acute vision change or mucosal bleeding." }
      ]
    },
    {
      id: "neuro-nph",
      system: "NEURO",
      task: "NEXT",
      vignette: "A 74-year-old man has 1 year of progressive gait difficulty, urinary urgency with incontinence, and slowed thinking. His gait is wide-based and shuffling, with feet that seem \"stuck to the floor.\" There is no rest tremor. MRI shows enlarged lateral ventricles out of proportion to sulcal atrophy, without obstruction.",
      leadIn: "What is the most appropriate next step?",
      options: [
        "Start carbidopa–levodopa.",
        "High-volume lumbar puncture with gait assessment before and after.",
        "Start donepezil.",
        "Immediate ventriculoperitoneal shunt placement."
      ],
      correct: 1,
      explanation: "<strong>Normal pressure hydrocephalus</strong>: the triad is <strong>gait apraxia (\"magnetic\" gait, usually first)</strong>, <strong>urinary incontinence</strong>, and <strong>cognitive decline</strong> (\"wobbly, wet, and wacky\"), with <strong>ventriculomegaly out of proportion to atrophy</strong> on imaging. Opening pressure is normal or mildly raised. The next step is a <strong>high-volume (30–50 mL) lumbar tap test</strong> (or extended lumbar drainage) with gait measured before and after. Improvement predicts response to a <strong>ventriculoperitoneal shunt</strong>. Gait responds best; dementia responds least. Levodopa does not help; donepezil treats Alzheimer disease, not NPH.",
      flashcards: [
        { f: "Clinical triad of normal pressure hydrocephalus?", b: "Magnetic gait apraxia, urinary incontinence, and cognitive decline.", x: "Gait disturbance is usually earliest and most responsive because frontal-subcortical pathways are stretched.", t: "Trap: Alzheimer disease causes early memory loss without ventriculomegaly out of proportion to atrophy." },
        { f: "Next step after imaging suggests normal pressure hydrocephalus?", b: "High-volume 30–50 mL lumbar tap test with gait assessment before and after.", x: "Improvement after CSF removal predicts benefit from ventriculoperitoneal shunting.", t: "Trap: A normal opening pressure does not exclude NPH; it is expected." },
        { f: "Definitive treatment of normal pressure hydrocephalus?", b: "Ventriculoperitoneal shunt; gait improves most, cognition least.", x: "Shunting diverts CSF and can restore mobility, but benefit must be balanced against complications.", t: "Trap: Levodopa treats Parkinson disease, not magnetic gait from NPH." }
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
      explanation: "<strong>Optic neuritis</strong> (painful monocular vision loss, color desaturation, RAPD) plus a prior episode and MRI showing <strong>periventricular (\"Dawson fingers\"), juxtacortical, infratentorial, or spinal cord lesions</strong> = <strong>multiple sclerosis</strong>. McDonald 2017 criteria require <strong>dissemination in space and time</strong>; enhancing plus non-enhancing lesions, or <strong>CSF oligoclonal bands</strong>, can satisfy time. Treat a disabling relapse with <strong>IV methylprednisolone</strong> (speeds recovery; does not change long-term outcome) and start <strong>disease-modifying therapy</strong>. <strong>NMOSD</strong> (aquaporin-4 IgG) causes severe, often bilateral optic neuritis and <strong>longitudinally extensive myelitis (≥ 3 segments)</strong>; some MS therapies worsen it. NAION is painless and occurs in older vascular patients.",
      flashcards: [
        { f: "MRI lesion locations typical of multiple sclerosis?", b: "Periventricular Dawson fingers, juxtacortical/cortical, infratentorial, and spinal cord lesions.", x: "Dissemination in space uses lesions in characteristic CNS regions; enhancement helps show dissemination in time.", t: "Trap: Small-vessel ischemic lesions are usually deep white matter and spare U-fibers/corpus callosum." },
        { f: "Treatment for an acute disabling multiple sclerosis relapse?", b: "IV methylprednisolone 1 g/day for 3–5 days; plasma exchange if steroid-refractory.", x: "Steroids shorten relapse duration but do not change long-term disability; disease-modifying therapy prevents relapses.", t: "Trap: Do not treat pseudo-relapse from infection or heat with steroids before addressing the trigger." },
        { f: "How does NMOSD differ from multiple sclerosis?", b: "Aquaporin-4 IgG, severe/bilateral optic neuritis, longitudinally extensive myelitis ≥3 segments, area postrema syndrome.", x: "Some MS disease-modifying drugs can worsen NMOSD, so antibody testing matters in atypical cases.", t: "Trap: Typical MS spinal cord lesions are shorter and peripheral, not ≥3 vertebral segments." }
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
      explanation: "A <strong>thunderclap headache</strong> (maximal within 1 minute) requires exclusion of <strong>subarachnoid hemorrhage</strong>. Noncontrast CT is nearly 100% sensitive <strong>within 6 hours</strong> of onset (modern scanner, expert read); in that window a normal CT effectively rules out SAH in a neurologically intact patient. <strong>Beyond 6 hours sensitivity falls</strong>, so a normal CT must be followed by <strong>lumbar puncture</strong> (ideally ≥ 6–12 hours after onset) looking for <strong>xanthochromia</strong> and RBCs that do not clear across tubes. <strong>CT angiography</strong> is a reasonable alternative. If SAH is found, image the vessels for an aneurysm, give <strong>nimodipine</strong>, and secure the aneurysm early. Other thunderclap causes: RCVS, cervical artery dissection, venous sinus thrombosis, pituitary apoplexy.",
      flashcards: [
        { f: "Thunderclap headache with normal noncontrast CT >6 hours after onset: next test?", b: "Lumbar puncture for xanthochromia and RBCs; CT angiography is an alternative.", x: "CT sensitivity for SAH falls after 6 hours, so CSF or vascular imaging is needed if suspicion remains.", t: "Trap: A negative late CT alone does not safely rule out SAH." },
        { f: "How sensitive is modern noncontrast CT for SAH within 6 hours?", b: "Nearly 100% in a neurologically intact patient with expert interpretation.", x: "Fresh subarachnoid blood is hyperdense early but becomes less visible as time passes.", t: "Trap: This rule does not apply to delayed presentation, anemia, poor-quality scan, or abnormal neuro exam." },
        { f: "Medication given to all patients with aneurysmal subarachnoid hemorrhage?", b: "Oral nimodipine for 21 days.", x: "Nimodipine reduces delayed cerebral ischemia from vasospasm, improving neurologic outcomes.", t: "Trap: It does not secure the aneurysm; early clipping or coiling is still required." }
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
        { f: "Essential tremor vs Parkinson tremor at the bedside?", b: "ET is bilateral action/postural and may improve with alcohol; PD is asymmetric resting tremor with bradykinesia/rigidity.", x: "ET commonly affects hands, head, or voice and often has autosomal dominant family history.", t: "Trap: A pill-rolling rest tremor plus slow movement points to Parkinson disease, not ET." },
        { f: "First-line medications for essential tremor?", b: "Propranolol or primidone; choose primidone if beta-blockers are contraindicated.", x: "Both reduce tremor amplitude; start low to avoid bradycardia or primidone sedation/ataxia.", t: "Trap: Propranolol can worsen asthma, COPD bronchospasm, bradycardia, or heart block." },
        { f: "Treatment for disabling essential tremor refractory to medication?", b: "Thalamic VIM deep brain stimulation or MR-guided focused ultrasound thalamotomy.", x: "The ventral intermediate thalamus relays cerebellar tremor circuits targeted by these procedures.", t: "Trap: Levodopa helps Parkinson motor symptoms, not essential tremor." }
      ]
    },
    {
      id: "psych-nms",
      system: "PSYCH",
      task: "DX",
      vignette: "A 34-year-old man with schizophrenia was given repeated doses of IM haloperidol for agitation over the past 2 days. He is now confused and has a temperature of 40.1 °C, BP 168/102 mm Hg, HR 124/min, and diaphoresis. He has severe generalized \"lead-pipe\" rigidity. Reflexes are normal and there is no clonus. Pupils are normal. Creatine kinase is 18,400 U/L and WBC count is 15,000/µL.",
      leadIn: "What is the most likely diagnosis?",
      options: [
        "Serotonin syndrome.",
        "Neuroleptic malignant syndrome.",
        "Anticholinergic toxicity.",
        "Malignant hyperthermia."
      ],
      correct: 1,
      explanation: "<strong>Neuroleptic malignant syndrome (NMS)</strong> follows <strong>dopamine blockade</strong> (antipsychotics, metoclopramide) or abrupt withdrawal of dopaminergic drugs. It develops over <strong>days</strong>, with <strong>fever, lead-pipe rigidity, altered mental status, autonomic instability</strong>, and markedly elevated <strong>CK</strong> (rhabdomyolysis), leukocytosis, and low serum iron. <strong>Serotonin syndrome</strong> develops within <strong>hours</strong> with <strong>clonus and hyperreflexia</strong> (lower limbs), mydriasis, and diarrhea. <strong>Anticholinergic toxicity</strong> causes dry skin, mydriasis, and urinary retention without rigidity. <strong>Malignant hyperthermia</strong> follows volatile anesthetics or succinylcholine. NMS treatment: <strong>stop the drug</strong>, cool, IV fluids, <strong>benzodiazepines</strong>; for severe cases <strong>dantrolene</strong> and/or <strong>bromocriptine</strong>.",
      flashcards: [
        { f: "Dopamine blocker with fever, altered mental status, autonomic instability, lead-pipe rigidity: diagnosis?", b: "Neuroleptic malignant syndrome.", x: "NMS develops over days from dopamine blockade or dopaminergic withdrawal and can cause rhabdomyolysis.", t: "Trap: Serotonin syndrome starts within hours and features clonus, hyperreflexia, mydriasis, and diarrhea." },
        { f: "Treatment of neuroleptic malignant syndrome?", b: "Stop the dopamine blocker, give cooling, IV fluids, benzodiazepines; severe cases: dantrolene and/or bromocriptine.", x: "Aggressive fluids prevent kidney injury from rhabdomyolysis; bromocriptine restores dopaminergic tone.", t: "Trap: Cyproheptadine treats serotonin syndrome, not NMS." },
        { f: "Laboratory hallmark of neuroleptic malignant syndrome?", b: "Markedly elevated creatine kinase from rhabdomyolysis; leukocytosis and low serum iron may occur.", x: "CK elevation reflects sustained rigidity and muscle breakdown and guides renal-protection monitoring.", t: "Trap: Normal CK argues against classic severe NMS, though early cases may not yet peak." }
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
        { f: "First-line medication options for generalized anxiety disorder?", b: "SSRI or SNRI such as escitalopram, sertraline, venlafaxine, or duloxetine; CBT is also first-line.", x: "Start low and counsel that early jitteriness can occur before benefit at 4–8 weeks.", t: "Trap: Propranolol is for performance anxiety symptoms, not chronic generalized worry." },
        { f: "DSM duration criterion for generalized anxiety disorder?", b: "Excessive worry on most days for ≥6 months with at least 3 associated symptoms.", x: "Symptoms include restlessness, fatigue, poor concentration, irritability, muscle tension, and sleep disturbance.", t: "Trap: Panic disorder has episodic panic attacks rather than persistent multi-topic worry." },
        { f: "Why avoid long-term benzodiazepines for GAD?", b: "Dependence, withdrawal, falls, cognitive impairment, and respiratory depression with alcohol/opioids.", x: "Tolerance develops and abrupt cessation can cause rebound anxiety, seizures, or delirium.", t: "Trap: Short bridging may be used selectively, but it is not maintenance therapy." }
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
      explanation: "A prior <strong>manic episode</strong> (≥ 1 week of elevated mood with decreased need for sleep, grandiosity, pressured speech, risky behavior, or hospitalization) establishes <strong>bipolar I disorder</strong>. His current episode is <strong>bipolar depression</strong>. Always <strong>screen for prior mania/hypomania</strong> before starting an antidepressant. <strong>Antidepressant monotherapy</strong> is not effective for bipolar depression and can trigger <strong>mania or rapid cycling</strong>. FDA-approved options for bipolar depression: <strong>quetiapine, lurasidone, cariprazine, lumateperone, olanzapine–fluoxetine</strong>. <strong>Lithium</strong> and <strong>lamotrigine</strong> are used for maintenance (lithium also reduces suicide). Lamotrigine requires slow titration due to SJS risk.",
      flashcards: [
        { f: "Why avoid antidepressant monotherapy in bipolar depression?", b: "It can precipitate mania or rapid cycling and is not effective as monotherapy.", x: "Always screen for past mania/hypomania before prescribing antidepressants for depression.", t: "Trap: A prior manic episode means bipolar I, even if the current episode is depressive." },
        { f: "FDA-approved medication options for bipolar depression?", b: "Quetiapine, lurasidone, cariprazine, lumateperone, or olanzapine-fluoxetine.", x: "Lithium and lamotrigine are common maintenance options; lithium also lowers suicide risk.", t: "Trap: Lamotrigine requires slow titration for SJS risk, so it is not a rapid acute fix." },
        { f: "How do mania and hypomania differ?", b: "Mania lasts ≥7 days or requires hospitalization/psychosis and causes marked impairment; hypomania lasts ≥4 days without marked impairment.", x: "Mania defines bipolar I; hypomania plus major depression defines bipolar II.", t: "Trap: Decreased need for sleep with high energy is different from insomnia with fatigue." }
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
        "Hypernatremia.",
        "Hypercalcemia.",
        "Hyperkalemia."
      ],
      correct: 0,
      explanation: "<strong>Refeeding syndrome</strong>: carbohydrate intake triggers <strong>insulin release</strong>, which drives <strong>phosphate, potassium, and magnesium into cells</strong> (and consumes phosphate for ATP and 2,3-DPG). Total-body stores are already depleted by starvation, so serum levels fall sharply, usually in the <strong>first 2–5 days</strong>. <strong>Hypophosphatemia</strong> is the hallmark and causes muscle weakness, rhabdomyolysis, <strong>respiratory failure</strong>, <strong>heart failure</strong>, arrhythmias, hemolysis, seizures, and confusion. Insulin also causes sodium and fluid retention (edema). Prevention: identify high-risk patients, give <strong>thiamine</strong> before feeding, start calories cautiously and advance gradually, and <strong>monitor phosphate, potassium, and magnesium daily</strong>, replacing as needed.",
      flashcards: [
        { f: "Hallmark electrolyte abnormality in refeeding syndrome?", b: "Hypophosphatemia, often with hypokalemia and hypomagnesemia within 2–5 days of feeding.", x: "Phosphate is consumed for ATP and 2,3-DPG just when depleted stores cannot meet demand.", t: "Trap: Edema can occur, but sodium/fluid retention is not the hallmark lab abnormality." },
        { f: "Mechanism of refeeding syndrome after starvation?", b: "Carbohydrate intake → insulin surge → intracellular shift of phosphate, potassium, and magnesium.", x: "Starvation depletes total-body electrolytes despite sometimes normal serum levels before feeding.", t: "Trap: Giving calories aggressively worsens the insulin-driven shift and can trigger arrhythmias or respiratory failure." },
        { f: "How can refeeding syndrome be prevented?", b: "Give thiamine before calories, start feeds slowly, and monitor/replace phosphate, potassium, and magnesium daily.", x: "Thiamine prevents Wernicke encephalopathy during carbohydrate metabolism in malnourished patients.", t: "Trap: Do not wait for severe hypophosphatemia to supplement in high-risk patients." }
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
        { f: "Classic clinical appearance of basal cell carcinoma?", b: "Pearly translucent papule with rolled borders, arborizing telangiectasias, and possible central ulceration.", x: "BCC grows locally from basal keratinocytes and rarely metastasizes but can destroy tissue.", t: "Trap: Squamous cell carcinoma is often a scaly or keratotic tender plaque/nodule, not pearly." },
        { f: "When is Mohs micrographic surgery preferred for BCC?", b: "High-risk sites such as facial mask area, hands, feet, genitals; recurrent, aggressive, or ill-defined tumors.", x: "Mohs examines nearly all margins while sparing tissue, giving high cure rates in cosmetically critical areas.", t: "Trap: Low-risk superficial BCC on trunk can use excision, electrodesiccation/curettage, or topical therapy." },
        { f: "Treatment for locally advanced or metastatic basal cell carcinoma?", b: "Hedgehog inhibitors such as vismodegib or sonidegib; cemiplimab after progression/intolerance.", x: "Most BCCs have Hedgehog pathway activation through PTCH1/SMO signaling.", t: "Trap: Routine chemotherapy is not standard for advanced BCC on board exams." }
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
        { f: "What screening is required before starting adalimumab or another biologic for psoriasis?", b: "Screen for latent TB with IGRA/TST, hepatitis B/C, and update vaccines; consider HIV by risk.", x: "TNF blockade can reactivate granulomatous infections, especially TB, and HBV can flare with immunosuppression.", t: "Trap: HLA-B27 may support spondyloarthritis but is not required before TNF inhibitor therapy." },
        { f: "Important contraindications or cautions for TNF inhibitors?", b: "Active serious infection, untreated latent TB, NYHA III–IV heart failure, and demyelinating disease.", x: "TNF is needed for granuloma maintenance; inhibition can worsen MS-like demyelination and severe HF.", t: "Trap: Prior treated latent TB is not an absolute contraindication once prophylaxis is underway/complete." },
        { f: "Key clinical features of psoriatic arthritis?", b: "Dactylitis, enthesitis, DIP involvement, nail pitting/onycholysis, and possible arthritis mutilans.", x: "Joint disease may occur with mild skin psoriasis, so ask about nails, heel pain, and sausage digits.", t: "Trap: Rheumatoid arthritis usually spares DIP joints and lacks nail pitting." }
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
        { f: "Best bedside test for a scaly annular plaque with central clearing?", b: "KOH preparation of scale from the active border showing branching septate hyphae.", x: "The advancing edge has the highest fungal burden, improving test yield.", t: "Trap: Erythema migrans expands but is not scaly and has a negative KOH." },
        { f: "What is tinea incognito?", b: "Dermatophyte infection altered and spread by topical corticosteroids.", x: "Steroids reduce inflammation and scale, masking the border while fungus proliferates.", t: "Trap: Nummular eczema may improve with steroids; tinea often worsens or recurs." },
        { f: "Which tinea infections usually require oral antifungal therapy?", b: "Tinea capitis, confirmed onychomycosis, and extensive or refractory tinea corporis.", x: "Hair follicles and nails are poorly penetrated by topical agents, so systemic terbinafine/itraconazole is needed.", t: "Trap: Do not give oral therapy for suspected onychomycosis without confirmation because mimics are common." }
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
        { f: "Painful rapidly enlarging ulcer with violaceous undermined border: diagnosis?", b: "Pyoderma gangrenosum.", x: "It is a neutrophilic dermatosis often triggered by minor trauma and associated with systemic inflammatory disease.", t: "Trap: Infection must be excluded, but antibiotics alone do not help without true infection." },
        { f: "Diseases associated with pyoderma gangrenosum?", b: "Inflammatory bowel disease, inflammatory arthritis, and hematologic disease such as myeloma, MDS, or leukemia.", x: "Finding an association can guide therapy, especially TNF inhibitors when IBD coexists.", t: "Trap: Diabetes predisposes to ulcers, but a violaceous undermined rapidly progressive border suggests PG." },
        { f: "Why should surgical debridement be avoided in pyoderma gangrenosum?", b: "Pathergy: trauma can enlarge ulcers; use immunosuppression and gentle nonadherent wound care.", x: "Systemic glucocorticoids or cyclosporine rapidly calm neutrophilic inflammation in severe disease.", t: "Trap: Necrotizing infection requires urgent debridement; PG diagnosis requires excluding infection." }
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
      explanation: "<strong>Gestational diabetes</strong> is screened for at <strong>24–28 weeks</strong> (75-g OGTT, or 50-g screen then 100-g test). Targets: <strong>fasting &lt; 95 mg/dL</strong>, <strong>1-hour postprandial &lt; 140 mg/dL</strong>, or <strong>2-hour &lt; 120 mg/dL</strong>. Start with <strong>medical nutrition therapy and exercise</strong>. If targets are not met, <strong>insulin is the preferred agent</strong> (ADA and ACOG) because it does not cross the placenta. <strong>Metformin and glyburide cross the placenta</strong>; glyburide is linked with neonatal hypoglycemia and macrosomia, and metformin with smaller babies who later have higher childhood weight. DPP-4 inhibitors and other agents are not used in pregnancy. After delivery, screen with a <strong>75-g OGTT at 4–12 weeks postpartum</strong>, then every 1–3 years (high lifetime risk of type 2 diabetes).",
      flashcards: [
        { f: "Glucose targets for gestational diabetes self-monitoring?", b: "Fasting <95, 1-hour postprandial <140, or 2-hour postprandial <120 mg/dL.", x: "Postprandial hyperglycemia drives fetal hyperinsulinemia, macrosomia, shoulder dystocia, and neonatal hypoglycemia.", t: "Trap: Nonpregnant diabetes targets are not used for GDM." },
        { f: "Preferred medication for gestational diabetes when diet/exercise fail?", b: "Insulin.", x: "Insulin is effective and does not cross the placenta; metformin/glyburide cross and are second-line.", t: "Trap: DPP-4 inhibitors, GLP-1 agonists, and SGLT2 inhibitors are not used for GDM treatment." },
        { f: "Postpartum diabetes screening after gestational diabetes?", b: "75-g OGTT at 4–12 weeks postpartum, then screen every 1–3 years lifelong.", x: "GDM unmasks insulin resistance and predicts high future type 2 diabetes risk.", t: "Trap: A normal delivery glucose does not replace postpartum OGTT." }
      ]
    },
    {
      id: "obgyn-menopause-ht",
      system: "OBGYN",
      task: "RX",
      vignette: "A 51-year-old woman's last menstrual period was 14 months ago. She has 10–12 hot flashes daily and night sweats that disrupt her sleep. She has an intact uterus. She has no history of breast cancer, VTE, stroke, coronary disease, or liver disease. BP is 124/78 mm Hg. Her 10-year ASCVD risk is 3%. Mammography is up to date and normal.",
      leadIn: "What is the most appropriate treatment?",
      options: [
        "Transdermal estradiol alone.",
        "Black cohosh.",
        "Transdermal estradiol plus a progestogen.",
        "Testosterone cream."
      ],
      correct: 2,
      explanation: "<strong>Menopausal hormone therapy</strong> is the most effective treatment for <strong>vasomotor symptoms</strong>. Benefits outweigh risks in healthy women <strong>under 60 or within 10 years of menopause</strong>. Women <strong>with a uterus</strong> need a <strong>progestogen</strong> (or bazedoxifene) with estrogen to prevent <strong>endometrial hyperplasia/cancer</strong>; estrogen alone is for women after hysterectomy. <strong>Transdermal</strong> estrogen has lower VTE and stroke risk than oral. <strong>Contraindications</strong>: breast or estrogen-dependent cancer, unexplained vaginal bleeding, prior VTE or stroke, coronary disease, active liver disease. Nonhormonal options: <strong>low-dose paroxetine</strong>, SNRIs, gabapentin, <strong>fezolinetant</strong> (NK3 receptor antagonist; monitor liver tests). Herbal products like black cohosh are not effective. Vaginal estrogen alone treats genitourinary syndrome of menopause.",
      flashcards: [
        { f: "Who needs progestogen with systemic menopausal estrogen therapy?", b: "Any patient with an intact uterus.", x: "Progestogen prevents estrogen-driven endometrial proliferation, hyperplasia, and cancer.", t: "Trap: After hysterectomy, estrogen alone is used because no endometrium needs protection." },
        { f: "When do benefits of menopausal hormone therapy generally outweigh risks?", b: "Healthy symptomatic women age <60 or within 10 years of menopause and without contraindications.", x: "Starting near menopause has a more favorable cardiovascular and VTE risk profile than late initiation.", t: "Trap: Do not start systemic HT for chronic disease prevention or in prior VTE, stroke, CAD, breast cancer, or unexplained bleeding." },
        { f: "Nonhormonal options for menopausal vasomotor symptoms?", b: "Low-dose paroxetine, SSRIs/SNRIs, gabapentin, fezolinetant, or oxybutynin.", x: "Fezolinetant blocks neurokinin-3 signaling in thermoregulatory neurons; monitor liver tests.", t: "Trap: Vaginal estrogen treats genitourinary symptoms, not systemic hot flashes." }
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
      explanation: "<strong>USPSTF cervical cancer screening</strong>: ages <strong>21–29</strong>, cytology every <strong>3 years</strong>; ages <strong>30–65</strong>, <strong>primary hrHPV every 5 years</strong>, co-testing every 5 years, or cytology alone every 3 years. <strong>Stop after age 65</strong> if prior screening was adequate: <strong>3 consecutive negative cytology results or 2 consecutive negative HPV/co-tests within 10 years</strong>, the most recent within 5 years, and no CIN2+ within 25 years. Also stop after <strong>total hysterectomy for benign disease</strong>. Continue screening if there was a history of CIN2+ (for 25 years), immunosuppression/HIV, or DES exposure. Do not screen under age 21. A pelvic exam is not needed for screening; USPSTF finds insufficient evidence for routine screening pelvic exams.",
      flashcards: [
        { f: "USPSTF cervical cancer screening intervals by age 21–65?", b: "21–29 cytology every 3 years; 30–65 primary hrHPV every 5 years, cotest every 5 years, or cytology every 3 years.", x: "HPV testing is more sensitive after age 30, when transient infections are less common.", t: "Trap: Do not screen average-risk patients younger than 21 regardless of sexual activity." },
        { f: "When can cervical cancer screening stop after age 65?", b: "Adequate negative prior screening and no CIN2+ within 25 years.", x: "Adequate means 3 negative cytology tests or 2 negative HPV-based tests in 10 years, most recent within 5.", t: "Trap: Continue screening after CIN2+ for 25 years even if this extends beyond age 65." },
        { f: "Who needs cervical screening beyond usual age limits?", b: "History of CIN2+, HIV/immunosuppression, or in utero DES exposure.", x: "These higher-risk groups have different surveillance because progression risk remains elevated.", t: "Trap: Total hysterectomy for benign disease stops screening; supracervical hysterectomy does not." }
      ]
    },
    {
      id: "obgyn-preconception",
      system: "OBGYN",
      task: "RX",
      vignette: "A 33-year-old woman with chronic hypertension wants to become pregnant in the next few months. Her BP is 132/82 mm Hg on lisinopril 20 mg daily. She has no diabetes or kidney disease. She is taking a daily multivitamin with 0.4 mg folic acid and uses condoms.",
      leadIn: "What is the most appropriate change to her antihypertensive therapy?",
      options: [
        "Switch lisinopril to nifedipine extended-release or labetalol before conception.",
        "Switch lisinopril to losartan.",
        "Continue lisinopril until pregnancy is confirmed, then stop.",
        "Switch lisinopril to spironolactone."
      ],
      correct: 0,
      explanation: "<strong>ACE inhibitors, ARBs, and direct renin inhibitors are teratogenic</strong> (fetal renal dysgenesis, oligohydramnios, skull hypoplasia, growth restriction), mainly in the 2nd and 3rd trimesters, with possible first-trimester risk. Women planning pregnancy should <strong>switch before conception</strong>. Preferred agents in pregnancy: <strong>labetalol, extended-release nifedipine, methyldopa</strong>. <strong>Spironolactone</strong> is avoided (anti-androgen effects on a male fetus). Treating chronic hypertension in pregnancy to <strong>&lt; 140/90</strong> reduces preeclampsia with severe features (CHAP trial). Also start <strong>low-dose aspirin (81 mg) at 12–28 weeks</strong> (ideally before 16) to prevent preeclampsia. Continue folic acid 0.4 mg daily starting ≥ 1 month before conception.",
      flashcards: [
        { f: "Preferred antihypertensives for patients planning pregnancy?", b: "Labetalol, extended-release nifedipine, or methyldopa; stop ACE inhibitors/ARBs/renin inhibitors.", x: "ACE inhibitors and ARBs can cause fetal renal dysgenesis, oligohydramnios, and skull hypoplasia.", t: "Trap: Do not wait until a positive pregnancy test if conception is planned; switch beforehand." },
        { f: "BP treatment threshold/target for chronic hypertension in pregnancy after CHAP?", b: "Treat to <140/90 mm Hg.", x: "Active treatment lowers severe preeclampsia and adverse pregnancy outcomes without increasing fetal growth restriction.", t: "Trap: Older practice tolerated higher BP unless severe; current evidence supports treating mild chronic HTN." },
        { f: "Low-dose aspirin regimen to prevent preeclampsia in high-risk pregnancy?", b: "Aspirin 81 mg daily from 12–28 weeks, ideally before 16 weeks, until delivery.", x: "Chronic hypertension is a high-risk indication because abnormal placentation raises preeclampsia risk.", t: "Trap: Aspirin before 12 weeks is not the standard start; full-dose aspirin is not used." }
      ]
    },
    {
      id: "heme-vwd",
      system: "HEME",
      task: "TEST",
      vignette: "A 22-year-old woman has had heavy menstrual periods since menarche, frequent nosebleeds, and prolonged bleeding after a wisdom tooth extraction. Her mother also has heavy menses. Platelet count is 260,000/µL, PT is normal, and aPTT is 37 s (normal 25–35). She takes no medications.",
      leadIn: "Which is the most appropriate next diagnostic test?",
      options: [
        "Bone marrow biopsy.",
        "Von Willebrand factor antigen, VWF activity, and factor VIII level.",
        "Factor IX level.",
        "Platelet aggregation study after aspirin challenge."
      ],
      correct: 1,
      explanation: "<strong>Mucocutaneous bleeding</strong> (menorrhagia, epistaxis, dental bleeding) with a normal platelet count and a <strong>family history</strong> suggests <strong>von Willebrand disease</strong>, the most common inherited bleeding disorder (usually autosomal dominant, type 1 = quantitative deficiency). VWF carries factor VIII, so the <strong>aPTT may be normal or mildly prolonged</strong>. Initial tests: <strong>VWF antigen, VWF platelet-binding activity (VWF:GPIbM or ristocetin cofactor), and factor VIII</strong>. VWF levels rise with estrogen, pregnancy, stress, and inflammation, so repeat testing may be needed. Treatment: <strong>desmopressin</strong> for type 1 (test response first), <strong>tranexamic acid</strong>, hormonal therapy for menorrhagia, and VWF concentrate for major bleeding or type 3. Hemophilia (factor VIII/IX) causes joint and muscle bleeding, mostly in males.",
      flashcards: [
        { f: "Initial diagnostic panel for suspected von Willebrand disease?", b: "VWF antigen, VWF activity, and factor VIII level.", x: "VWF carries factor VIII, so aPTT may be normal or mildly prolonged despite mucocutaneous bleeding.", t: "Trap: Normal platelet count does not exclude VWD; platelet number is usually normal." },
        { f: "Treatment options for type 1 von Willebrand disease?", b: "Desmopressin after test response, tranexamic acid, hormonal therapy for menorrhagia, or VWF concentrate for major bleeding.", x: "Desmopressin releases endothelial VWF stores but is ineffective or unsafe in some VWD subtypes.", t: "Trap: Hemophilia A causes deep muscle/joint bleeding in males, not typical menorrhagia/epistaxis." },
        { f: "Bleeding pattern: platelet/VWF disorder vs coagulation factor deficiency?", b: "Platelet/VWF: mucosal, petechiae, immediate bleeding. Factor deficiency: hemarthrosis, deep muscle, delayed bleeding.", x: "Primary hemostasis defects affect platelet plug formation; coagulation defects impair fibrin stabilization.", t: "Trap: Isolated prolonged PT points to extrinsic pathway/liver/warfarin, not classic VWD." }
      ]
    },
    {
      id: "geri-hospice",
      system: "GERI",
      task: "NEXT",
      vignette: "An 82-year-old man with NYHA class IV heart failure (LVEF 15%) has had 3 hospitalizations in 4 months despite optimal therapy and is not a candidate for advanced therapies. He wants to stay at home and avoid hospital stays but wishes to keep taking his heart failure medications. His family worries that hospice means \"giving up all treatment.\"",
      leadIn: "Which statement about Medicare hospice eligibility is correct?",
      options: [
        "He must sign a do-not-resuscitate order to enroll.",
        "Hospice is only available for patients with cancer.",
        "Two physicians must certify a prognosis of 6 months or less if the disease runs its usual course.",
        "Hospice benefits end automatically if he lives longer than 6 months."
      ],
      correct: 2,
      explanation: "The <strong>Medicare Hospice Benefit</strong> requires certification by the attending physician and hospice medical director of a <strong>prognosis of ≤ 6 months if the illness runs its usual course</strong>, and the patient chooses comfort-focused care for the terminal diagnosis. <strong>A DNR order is not required.</strong> Hospice covers <strong>any terminal illness</strong> (heart failure, COPD, dementia, ESKD), not just cancer. Patients may continue medications that relieve symptoms (for heart failure, <strong>diuretics and even GDMT</strong> are often continued for symptom control). There is <strong>no limit on time</strong>: patients can be <strong>recertified</strong> for further benefit periods if they continue to meet criteria. <strong>Palliative care</strong>, in contrast, can be given at any stage alongside disease-directed treatment.",
      flashcards: [
        { f: "Medicare hospice eligibility requirement?", b: "Two physicians certify prognosis ≤6 months if illness runs its usual course and patient elects comfort-focused care.", x: "Eligibility is based on expected prognosis, not certainty; patients may be recertified if decline continues.", t: "Trap: A DNR order is not required to enroll in hospice." },
        { f: "Does hospice apply only to cancer or end after 6 months?", b: "No. Any terminal illness can qualify, and hospice can be recertified beyond 6 months.", x: "Hospice may continue symptom-relieving medications, such as diuretics for dyspnea in heart failure.", t: "Trap: Stopping all disease-related drugs is not required if they improve comfort." },
        { f: "How does palliative care differ from hospice?", b: "Palliative care can occur at any stage with curative treatment; hospice is comfort-focused with prognosis ≤6 months.", x: "Both address symptoms, goals, caregiver support, and serious-illness communication.", t: "Trap: Palliative care is not the same as giving up; it can be concurrent with chemotherapy or dialysis." }
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
        { f: "Formula for positive predictive value and negative predictive value?", b: "PPV = TP/(TP+FP); NPV = TN/(TN+FN).", x: "PPV answers: among positive tests, how many truly have disease; NPV answers the reverse for negative tests.", t: "Trap: Sensitivity and specificity are test properties; PPV/NPV change with prevalence." },
        { f: "How does disease prevalence affect PPV and NPV?", b: "Higher prevalence raises PPV and lowers NPV; lower prevalence lowers PPV and raises NPV.", x: "With rare disease, even a specific test may produce many false positives relative to true positives.", t: "Trap: Sensitivity and specificity do not change just because pretest probability changes." },
        { f: "Formulas for likelihood ratios and post-test odds?", b: "LR+ = sensitivity/(1−specificity); LR− = (1−sensitivity)/specificity; post-test odds = pretest odds × LR.", x: "Convert odds back to probability with odds/(1+odds) for bedside interpretation.", t: "Trap: Do not multiply LR by pretest probability; multiply by pretest odds." }
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
