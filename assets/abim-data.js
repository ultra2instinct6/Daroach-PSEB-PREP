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
        { f: "What are the four pillars of GDMT in HFrEF?",
          b: "ARNI (or ACEi/ARB), an evidence-based beta-blocker, an MRA, and an SGLT2 inhibitor." },
        { f: "How long must GDMT be optimized before reassessing the LVEF for a primary-prevention ICD?",
          b: "At least 3 months of optimal GDMT — then re-image the EF to see if an ICD is still indicated." },
        { f: "What are the Class I prerequisites for CRT?",
          b: "LBBB morphology AND a QRS duration ≥ 150 ms (with LVEF ≤ 35% on GDMT)." }
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
        { f: "Which drugs must be avoided in right ventricular infarction?",
          b: "Nitrates and diuretics — the infarcted RV is preload-dependent; treat hypotension with IV fluids." },
        { f: "When is nitroglycerin contraindicated in ACS?",
          b: "RV infarction, SBP < 90 mm Hg, or PDE-5 inhibitor use within 24–48 hours." },
        { f: "What is the initial medical bundle for ACS?",
          b: "Chewed aspirin 325 mg, a P2Y12 inhibitor, systemic anticoagulation, and a high-intensity statin; beta-blocker if no HF, shock, or bradycardia." }
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
        { f: "How is HFpEF defined?",
          b: "HF symptoms + LVEF ≥ 50% + evidence of diastolic dysfunction / elevated filling pressures — a stiff, non-compliant LV." },
        { f: "Which comorbidities drive the HFpEF phenotype?",
          b: "Chronic hypertension, metabolic syndrome, obesity, atrial fibrillation, advanced age, and CKD — a systemic pro-inflammatory state." },
        { f: "Which drug class reduces HF hospitalization in HFpEF?",
          b: "SGLT2 inhibitors — recommended across the entire LVEF spectrum." }
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
        { f: "What does CHA₂DS₂-VASc score, and at what score do you anticoagulate?",
          b: "CHF, HTN, Age ≥ 75 (2 pts), Diabetes, Stroke/TIA (2 pts), Vascular disease, Age 65–74, female Sex — anticoagulate at ≥ 2 (men) / ≥ 3 (women)." },
        { f: "When is warfarin still preferred over a DOAC in atrial fibrillation?",
          b: "Mechanical heart valves and moderate-to-severe mitral stenosis; otherwise DOACs are first-line." },
        { f: "Is aspirin acceptable for stroke prevention in AF?",
          b: "No — aspirin monotherapy adds bleeding risk without adequate stroke protection." }
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
        { f: "What is the management of symptomatic severe aortic stenosis?",
          b: "Valve replacement (surgical or transcatheter) — no medical therapy changes the disease course." },
        { f: "What are the echocardiographic criteria for severe AS?",
          b: "Valve area < 1.0 cm², mean gradient ≥ 40 mm Hg, peak velocity ≥ 4 m/s." },
        { f: "When is exercise testing contraindicated in aortic stenosis?",
          b: "In SYMPTOMATIC severe AS; it may cautiously unmask symptoms in truly asymptomatic patients." }
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
        { f: "In what order are drugs given in thyroid storm?",
          b: "Beta-blocker + PTU first; iodine at least 1 hour AFTER the thionamide, plus glucocorticoids and supportive care." },
        { f: "Which thyroid-storm drugs block peripheral T4 → T3 conversion?",
          b: "PTU and propranolol (glucocorticoids do as well) — the preferred agents in storm." },
        { f: "What Burch-Wartofsky score suggests thyroid storm?",
          b: "≥ 45 is highly suggestive — and always hunt for the precipitant (infection, surgery, iodine load, nonadherence)." }
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
        { f: "When must insulin be held in DKA?",
          b: "If potassium is < 3.3 mEq/L — replete potassium first; insulin shifts K intracellularly and can cause fatal hypokalemia." },
        { f: "When is dextrose added to DKA fluids?",
          b: "When glucose falls below ~200 mg/dL — the insulin infusion continues until the anion gap closes." },
        { f: "What defines resolution of DKA?",
          b: "Gap closure: glucose < 200 plus two of — bicarbonate ≥ 15, pH > 7.3, anion gap ≤ 12. Never glucose alone." }
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
        { f: "What is the immediate treatment of suspected adrenal crisis?",
          b: "IV hydrocortisone 100 mg + fluids + dextrose — NEVER delay steroids for a cosyntropin test." },
        { f: "When should you suspect adrenal crisis?",
          b: "Hypotension refractory to fluids/pressors, especially with hyponatremia, hypoglycemia, or chronic steroid use." },
        { f: "How does primary adrenal insufficiency differ from secondary?",
          b: "Primary adds hyperkalemia and hyperpigmentation (high ACTH); secondary (pituitary disease/steroid withdrawal) does not." }
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
        { f: "What is the acute variceal bleed bundle?",
          b: "A vasoactive drug (octreotide) + prophylactic antibiotics (ceftriaxone) + urgent endoscopic band ligation." },
        { f: "What transfusion threshold applies in upper GI bleeding?",
          b: "Restrictive — transfuse below Hb 7 g/dL; liberal strategies raise portal pressure and mortality." },
        { f: "When do nonselective beta-blockers belong in variceal disease?",
          b: "For bleeding PROPHYLAXIS (carvedilol, nadolol) — hold them during the acute bleed." }
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
        { f: "When does average-risk colorectal cancer screening start?",
          b: "Age 45 — colonoscopy every 10 years, or annual FIT." },
        { f: "How does a first-degree relative with CRC before age 60 change screening?",
          b: "Colonoscopy at age 40 (or 10 years before their diagnosis, whichever is earlier), repeated every 5 years." },
        { f: "Who may use stool-based CRC screening?",
          b: "AVERAGE-risk patients only — and any positive stool test mandates colonoscopy." }
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
        { f: "What is first-line therapy for an initial C. difficile episode?",
          b: "Oral fidaxomicin (preferred) or oral vancomycin — oral metronidazole is no longer first-line." },
        { f: "How is fulminant C. difficile treated?",
          b: "HIGH-dose oral vancomycin PLUS IV metronidazole; add rectal vancomycin if ileus." },
        { f: "How are C. difficile recurrences managed?",
          b: "Fidaxomicin or a vancomycin taper-pulse; consider bezlotoxumab, and fecal microbiota therapy after multiple recurrences." }
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
        { f: "What is first-line therapy for CAP in a healthy outpatient?",
          b: "High-dose amoxicillin or doxycycline; macrolide monotherapy only where pneumococcal resistance is < 25%." },
        { f: "How do comorbidities change outpatient CAP therapy?",
          b: "Beta-lactam + macrolide/doxycycline, or monotherapy with a respiratory fluoroquinolone." },
        { f: "What is CURB-65 and its admission threshold?",
          b: "Confusion, Urea > 20, RR ≥ 30, BP < 90/60, age ≥ 65 — a score ≥ 2 means hospitalize." }
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
        { f: "How is early localized Lyme disease diagnosed?",
          b: "Clinically, by erythema migrans — treat without serology (antibodies are often negative early)." },
        { f: "What is first-line treatment for early Lyme disease?",
          b: "Oral doxycycline; amoxicillin or cefuroxime are alternatives (e.g., pregnancy)." },
        { f: "When is Lyme serology appropriate?",
          b: "For suspected DISSEMINATED disease (carditis/AV block, facial palsy, arthritis) — two-tier testing: EIA, then immunoblot or a second EIA." }
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
        { f: "What defines latent TB infection?",
          b: "A positive IGRA/TST + no symptoms + a normal chest radiograph — always exclude active disease before treating." },
        { f: "What are the preferred latent TB regimens?",
          b: "Short-course rifamycins: 4 months of daily rifampin, or 3 months of weekly isoniazid + rifapentine (3HP)." },
        { f: "Why is single-drug therapy acceptable for latent TB but never for active TB?",
          b: "Latent infection has a tiny organism burden; active TB always needs multi-drug RIPE therapy to prevent resistance." }
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
        { f: "Who qualifies for home sleep apnea testing?",
          b: "Uncomplicated patients with high pretest probability of moderate-severe OSA; a negative home study still requires in-lab polysomnography." },
        { f: "Which hypertension phenotype should prompt OSA screening?",
          b: "Resistant hypertension — ask about snoring, witnessed apneas, and daytime sleepiness." },
        { f: "What is first-line therapy for symptomatic OSA?",
          b: "CPAP — improves sleepiness, quality of life, and blood-pressure control." }
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
        { f: "What is first-line anticoagulation for hemodynamically stable PE?",
          b: "DOACs — apixaban and rivaroxaban need no heparin bridge." },
        { f: "When is systemic thrombolysis indicated in PE?",
          b: "Hemodynamic instability (SBP < 90 mm Hg) — a 'massive' PE." },
        { f: "How long is a provoked VTE anticoagulated?",
          b: "3 months (surgery, travel, estrogen); for unprovoked VTE consider extended therapy after weighing bleeding risk." }
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
        { f: "What confirms the diagnosis of COPD?",
          b: "A post-bronchodilator FEV1/FVC < 0.70 on spirometry; the FEV1 then grades severity." },
        { f: "Which interventions improve COPD survival?",
          b: "Only smoking cessation and long-term oxygen for resting PaO₂ ≤ 55 mm Hg (or SaO₂ ≤ 88%)." },
        { f: "Who gets alpha-1 antitrypsin testing?",
          b: "Every COPD patient at least once — especially young patients, minimal smoking history, or basilar-predominant emphysema." }
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
        { f: "How do gout and pseudogout crystals differ?",
          b: "Gout: needle-shaped, NEGATIVELY birefringent (MSU). Pseudogout: rhomboid, weakly POSITIVELY birefringent (CPPD)." },
        { f: "Can a normal serum urate exclude gout?",
          b: "No — urate may be normal or low during a flare; synovial fluid analysis is the gold standard and also excludes septic arthritis." },
        { f: "How is allopurinol handled during a gout flare?",
          b: "Do not stop it; when STARTING urate-lowering therapy, add colchicine or NSAID prophylaxis." }
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
        { f: "What is the first step in suspected giant cell arteritis?",
          b: "High-dose glucocorticoids IMMEDIATELY (IV methylprednisolone if visual symptoms) — never wait for the biopsy." },
        { f: "Does steroid treatment invalidate the temporal artery biopsy?",
          b: "No — the biopsy remains positive for at least 2 weeks after starting glucocorticoids." },
        { f: "Name the giant cell arteritis pearls.",
          b: "Age > 50, new headache, jaw claudication, ESR often > 50 — and about half of patients have polymyalgia rheumatica." }
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
        { f: "Which antibody is most specific for rheumatoid arthritis?",
          b: "Anti-CCP — it also predicts erosive disease; RF is sensitive but not specific." },
        { f: "What is first-line DMARD therapy in RA?",
          b: "Methotrexate with folic acid; check hepatitis serologies, CBC and liver tests — contraindicated in pregnancy." },
        { f: "What role do NSAIDs and glucocorticoids play in RA?",
          b: "Symptomatic bridges only — DMARDs are what prevent joint destruction." }
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
        { f: "How is severe symptomatic hyponatremia treated?",
          b: "100-mL boluses of 3% saline for an acute 4–6 mEq/L rise — enough to stop cerebral edema, then stop." },
        { f: "What is the sodium correction limit?",
          b: "≤ 8 mEq/L per 24 hours — overcorrection causes osmotic demyelination syndrome." },
        { f: "What is the lab signature of SIADH?",
          b: "Euvolemia + serum osm < 275 + urine osm > 100 + urine Na > 30; first-line chronic therapy is fluid restriction." }
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
        { f: "What distinguishes prerenal AKI on labs?",
          b: "FeNa < 1%, BUN:Cr > 20:1, bland sediment, concentrated urine — intact, sodium-avid tubules." },
        { f: "What distinguishes acute tubular necrosis?",
          b: "FeNa > 2%, muddy brown granular casts, and impaired urinary concentrating ability." },
        { f: "Which index replaces FeNa in patients on diuretics?",
          b: "Fractional excretion of UREA — < 35% suggests prerenal azotemia." }
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
        { f: "What does new iron deficiency anemia mean in a man or postmenopausal woman?",
          b: "GI blood loss until proven otherwise — bidirectional endoscopy regardless of symptoms." },
        { f: "What ferritin level confirms iron deficiency?",
          b: "< 30 ng/mL is essentially diagnostic; ferritin is an acute-phase reactant, so inflammation can mask deficiency." },
        { f: "Contrast iron deficiency with anemia of chronic disease.",
          b: "IDA: ↓ ferritin, ↓ iron, ↑ TIBC. ACD: ↓/normal iron, ↓ TIBC, NORMAL or high ferritin." }
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
        { f: "When should you suspect heparin-induced thrombocytopenia?",
          b: "A > 50% platelet fall 5–10 days after heparin exposure ± new thrombosis; score with the 4Ts, confirm with PF4 antibodies." },
        { f: "What is the management of HIT?",
          b: "Stop ALL heparin (including LMWH and line flushes) and start argatroban, bivalirudin, or fondaparinux." },
        { f: "What two things must you NOT do in HIT?",
          b: "No platelet transfusions, and no warfarin until platelets recover above 150,000/µL (risk of venous limb gangrene)." }
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
        { f: "What is the lab quartet of tumor lysis syndrome?",
          b: "↑ potassium, ↑ phosphorus, ↑ uric acid, ↓ calcium — with AKI; highest risk in high-grade lymphomas and leukemias." },
        { f: "Rasburicase vs allopurinol — what is the difference?",
          b: "Rasburicase destroys EXISTING uric acid (treatment / high-risk prophylaxis; contraindicated in G6PD deficiency). Allopurinol only blocks NEW production." },
        { f: "How is tumor lysis syndrome prevented?",
          b: "Aggressive IV hydration before and during chemotherapy; urine alkalinization is NOT recommended." }
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
        { f: "What is step 1 in severe hypercalcemia?",
          b: "Aggressive IV isotonic saline — these patients are profoundly volume-depleted." },
        { f: "How do calcitonin and bisphosphonates compare in hypercalcemia?",
          b: "Calcitonin works within hours but tachyphylaxis develops in ~48 h; IV bisphosphonates are definitive but take 2–4 days." },
        { f: "What causes humoral hypercalcemia of malignancy?",
          b: "PTHrP secreted by squamous tumors (PTH is suppressed); other mechanisms are osteolytic metastases and lymphoma-produced calcitriol." }
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
        { f: "What is the IV thrombolysis window and BP limit in acute stroke?",
          b: "Within 4.5 hours of last-known-well, with BP < 185/110 mm Hg before the bolus." },
        { f: "What happens in the 24 hours after thrombolysis?",
          b: "Keep BP < 180/105 and hold antiplatelets/anticoagulants pending repeat imaging." },
        { f: "Who qualifies for mechanical thrombectomy?",
          b: "Large-vessel occlusion up to 24 hours in selected patients (perfusion mismatch) — in addition to lysis if eligible." }
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
        { f: "What are the CAM criteria for delirium?",
          b: "Acute onset and fluctuating course + inattention, PLUS disorganized thinking or altered consciousness." },
        { f: "What is first-line delirium management?",
          b: "Nonpharmacologic: reorientation, glasses/hearing aids, sleep hygiene, early mobilization, remove catheters, deprescribe anticholinergics." },
        { f: "What role do benzodiazepines play in delirium?",
          b: "They WORSEN it (reserve for alcohol/benzo withdrawal); low-dose antipsychotics only for agitation threatening safety." }
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
        { f: "What is the clinical signature of acute pericarditis?",
          b: "Pleuritic, positional chest pain (better leaning forward), a friction rub, and diffuse concave ST elevation with PR depression." },
        { f: "What is first-line therapy for acute pericarditis?",
          b: "A high-dose NSAID or aspirin PLUS colchicine — colchicine halves the recurrence rate." },
        { f: "Why are glucocorticoids avoided in acute pericarditis?",
          b: "They increase recurrence; reserve them for NSAID contraindication, uremic, or autoimmune pericarditis." }
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
        { f: "Hypercalcemia with a non-suppressed PTH — what are the two diagnoses?",
          b: "Primary hyperparathyroidism or familial hypocalciuric hypercalcemia (FHH)." },
        { f: "How do you identify FHH?",
          b: "LOW 24-hour urine calcium (Ca/Cr clearance ratio < 0.01) — benign and familial; surgery is NOT indicated." },
        { f: "Name the surgery indications in asymptomatic primary hyperparathyroidism.",
          b: "Age < 50, calcium > 1 mg/dL above normal, osteoporosis/fragility fracture, eGFR < 60, kidney stones, or urine calcium > 250 mg/day (women) or > 300 mg/day (men)." }
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
        { f: "What ascitic fluid finding diagnoses SBP?",
          b: "A PMN count ≥ 250/µL — treat empirically with a third-generation cephalosporin (cefotaxime/ceftriaxone)." },
        { f: "Why is IV albumin added in SBP?",
          b: "1.5 g/kg on day 1 and 1 g/kg on day 3 reduces hepatorenal syndrome and mortality — especially if Cr > 1, BUN > 30, or bilirubin > 4." },
        { f: "What follows an episode of SBP?",
          b: "Lifelong secondary antibiotic prophylaxis (daily norfloxacin/ciprofloxacin or TMP-SMX)." }
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
        { f: "What is the first step in STABLE suspected endocarditis?",
          b: "Three blood culture sets from separate sites BEFORE antibiotics — premature antibiotics are the top cause of culture-negative IE." },
        { f: "Name the modified Duke major criteria.",
          b: "Typical organisms in ≥ 2 cultures (S. aureus, viridans strep, enterococci, HACEK) and endocardial involvement on echocardiography." },
        { f: "What is the echo sequence in suspected endocarditis?",
          b: "Transthoracic echo first; TEE if the TTE is negative/non-diagnostic or a prosthetic valve is involved." }
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
        { f: "State Light's criteria for an exudate.",
          b: "Any ONE: pleural/serum protein > 0.5, pleural/serum LDH > 0.6, or pleural LDH > 2/3 the upper limit of normal serum LDH." },
        { f: "What causes transudative vs exudative effusions?",
          b: "Transudates = pressure problems (HF, cirrhosis, nephrotic syndrome). Exudates = inflammation (malignancy, infection, PE)." },
        { f: "When does a parapneumonic effusion need a chest tube?",
          b: "Frank pus, pH < 7.2, glucose < 60 mg/dL, or positive fluid cultures." }
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
        { f: "What are the features of inflammatory back pain?",
          b: "Age < 45, insidious onset > 3 months, morning stiffness > 30 min, BETTER with exercise, worse with rest, night pain." },
        { f: "What is the first imaging study for suspected axial spondyloarthritis?",
          b: "SI-joint radiographs; MRI of the SI joints if films are normal; HLA-B27 is supportive, never diagnostic alone." },
        { f: "How is axial spondyloarthritis treated?",
          b: "NSAIDs + exercise/PT first-line; TNF or IL-17 inhibitors if refractory — methotrexate does NOT work for axial disease." }
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
        { f: "What is the FIRST drug in hyperkalemia with ECG changes?",
          b: "IV calcium gluconate — stabilizes the myocardium within minutes but does not lower potassium." },
        { f: "Which agents shift potassium into cells?",
          b: "IV insulin + dextrose and nebulized albuterol — fast but temporary." },
        { f: "What actually removes potassium from the body?",
          b: "GI potassium binders, loop diuretics, and hemodialysis (first-line removal in ESRD or refractory cases)." }
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
        { f: "Which metabolite distinguishes B12 from folate deficiency?",
          b: "Methylmalonic acid — elevated only in B12 deficiency; homocysteine rises in both." },
        { f: "What is the neurologic syndrome of B12 deficiency?",
          b: "Subacute combined degeneration — dorsal columns (vibration/proprioception) + corticospinal tracts; may occur with a normal MCV." },
        { f: "Why never treat megaloblastic anemia with folate alone?",
          b: "Folate corrects the blood counts while B12-related neurologic injury progresses — exclude B12 deficiency first." }
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
        { f: "Define febrile neutropenia.",
          b: "ANC < 500/µL (or expected to fall) + a single temp ≥ 38.3 °C or sustained ≥ 38.0 °C — treat within 1 hour." },
        { f: "What is empiric therapy for febrile neutropenia?",
          b: "Anti-pseudomonal beta-lactam MONOTHERAPY: cefepime, piperacillin-tazobactam, or meropenem." },
        { f: "When is vancomycin added in febrile neutropenia?",
          b: "Suspected catheter infection, skin/soft-tissue source, pneumonia, or hemodynamic instability — never routinely." }
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
        { f: "How do you localize facial weakness to peripheral CN VII?",
          b: "Forehead INVOLVED = peripheral (Bell palsy). Forehead SPARED = central — work up for stroke." },
        { f: "What is the treatment of Bell palsy?",
          b: "Oral prednisone within 72 hours of onset; valacyclovir may be added for severe palsy." },
        { f: "What eye care does Bell palsy require?",
          b: "Lubricant drops by day, ointment and taping/patching at night — incomplete closure risks exposure keratopathy." }
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
        { f: "Who gets pharmacotherapy for osteoporosis?",
          b: "T-score ≤ −2.5, any fragility (hip/vertebral) fracture, or osteopenia with high FRAX risk (≥ 3% hip / ≥ 20% major)." },
        { f: "How are oral bisphosphonates taken safely?",
          b: "Fasting with a full glass of water, remain upright 30 minutes; avoid if eGFR < 30–35." },
        { f: "Who is screened for osteoporosis?",
          b: "All women ≥ 65 (earlier with risk factors) by DEXA; the T-score compares to young-adult peak bone mass." }
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
        { f: "What is in the hour-1 sepsis bundle?",
          b: "Lactate, blood cultures BEFORE broad-spectrum antibiotics, and 30 mL/kg crystalloid for hypotension or lactate ≥ 4." },
        { f: "What is the first-line vasopressor in septic shock?",
          b: "Norepinephrine, targeting MAP ≥ 65 mm Hg; vasopressin is the usual second agent." },
        { f: "Define septic shock.",
          b: "Vasopressors required for MAP ≥ 65 PLUS lactate > 2 mmol/L despite adequate fluid resuscitation." }
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
        { f: "Which maneuvers increase the HOCM murmur?",
          b: "Valsalva and standing (↓ preload) make it LOUDER; squatting and handgrip make it softer — the opposite of aortic stenosis." },
        { f: "What is the feared complication of HOCM in young athletes?",
          b: "Sudden cardiac death from ventricular arrhythmia — screen first-degree relatives with echocardiography ± genetic testing." },
        { f: "What is first-line therapy for obstructive HOCM?",
          b: "Beta-blockers (or verapamil); avoid volume depletion, diuretics, and vasodilators; ICD for high-risk features." }
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
        { f: "What is the classic pheochromocytoma triad?",
          b: "Episodic headache, palpitations, and diaphoresis — often with paroxysmal hypertension." },
        { f: "What is the screening test for pheochromocytoma?",
          b: "Plasma free metanephrines or 24-hour urine fractionated metanephrines — biochemistry BEFORE imaging." },
        { f: "How is a pheochromocytoma patient prepared for surgery?",
          b: "Alpha-blockade FIRST (phenoxybenzamine) for 10–14 days, THEN beta-blockade — never beta first (unopposed alpha crisis)." }
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
        { f: "What is the best initial test for celiac disease?",
          b: "Tissue transglutaminase (tTG) IgA PLUS a total IgA level — obtained while the patient is still eating gluten." },
        { f: "What confirms celiac disease after positive serology?",
          b: "Duodenal biopsy: villous atrophy, crypt hyperplasia, and intraepithelial lymphocytes." },
        { f: "Which rash is pathognomonic for celiac disease?",
          b: "Dermatitis herpetiformis — intensely pruritic vesicles on extensor surfaces; treat with a gluten-free diet ± dapsone." }
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
        { f: "When is PCP prophylaxis started in HIV?",
          b: "CD4 < 200/µL (or oropharyngeal candidiasis) — TMP-SMX, which also covers Toxoplasma at CD4 < 100 with positive IgG." },
        { f: "Is MAC prophylaxis still routine in HIV?",
          b: "No — not needed when effective ART is being initiated (historically azithromycin at CD4 < 50)." },
        { f: "When is ART started relative to an opportunistic infection?",
          b: "Promptly — within ~2 weeks for most OIs; DELAY in cryptococcal meningitis because early ART worsens IRIS mortality." }
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
        { f: "Why is SABA-only asthma therapy no longer recommended?",
          b: "It leaves airway inflammation untreated and increases exacerbations and mortality — every adult should receive ICS-containing therapy." },
        { f: "What is the preferred asthma reliever strategy?",
          b: "Low-dose ICS-formoterol as needed — also usable as maintenance-and-reliever therapy (MART/SMART)." },
        { f: "Why is LABA monotherapy dangerous in asthma?",
          b: "Without an inhaled corticosteroid it increases asthma deaths — LABAs must ALWAYS be paired with ICS." }
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
        { f: "What is the serologic strategy in suspected SLE?",
          b: "ANA is the sensitive SCREEN (negative ANA nearly excludes SLE); anti-dsDNA and anti-Smith are the SPECIFIC confirmators." },
        { f: "Which drug belongs in essentially every SLE regimen?",
          b: "Hydroxychloroquine — reduces flares, thrombosis, and organ damage; requires periodic retinal screening." },
        { f: "How is lupus nephritis detected early?",
          b: "Regular urinalysis + urine protein/creatinine ratio, with anti-dsDNA and complement (C3/C4) monitoring; biopsy classifies the lesion." }
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
        { f: "What is first-line antihypertensive therapy in proteinuric CKD?",
          b: "An ACE inhibitor OR an ARB — slows progression; NEVER combine the two (hyperkalemia, AKI)." },
        { f: "How much creatinine rise is acceptable after starting an ACEi/ARB?",
          b: "Up to ~30% within the first weeks — recheck Cr/K in 1–2 weeks; a larger rise suggests bilateral renal artery stenosis." },
        { f: "Which other drug classes slow diabetic CKD progression?",
          b: "SGLT2 inhibitors (major renal protection), plus finerenone for residual albuminuria in type 2 diabetes." }
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
        { f: "What is the lab signature of hemolysis?",
          b: "↑ reticulocytes, ↑ LDH, ↑ indirect bilirubin, and LOW haptoglobin." },
        { f: "What test defines autoimmune hemolytic anemia?",
          b: "A positive direct antiglobulin (Coombs) test — warm AIHA shows IgG with spherocytes on smear." },
        { f: "What is first-line therapy for warm AIHA?",
          b: "Glucocorticoids; rituximab or splenectomy for refractory disease — and transfuse unstable patients even without a perfect crossmatch." }
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
        { f: "What is the current USPSTF breast cancer screening recommendation?",
          b: "Biennial screening mammography for average-risk women ages 40–74 (2024 update)." },
        { f: "Who needs supplemental breast MRI screening?",
          b: "High-risk women: BRCA carriers, chest radiation at a young age, or estimated lifetime risk ≳ 20%." },
        { f: "Which family history features suggest BRCA and warrant genetics referral?",
          b: "Breast cancer < 50, bilateral or male breast cancer, ovarian/pancreatic cancer, multiple affected relatives, Ashkenazi ancestry." }
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
        { f: "Define status epilepticus.",
          b: "≥ 5 minutes of continuous seizure activity, or recurrent seizures without recovery of consciousness between them." },
        { f: "What is the first-line drug in status epilepticus?",
          b: "An IV benzodiazepine — lorazepam IV, or midazolam IM when there is no IV access." },
        { f: "What follows benzodiazepines in status epilepticus?",
          b: "A second-line agent: fosphenytoin, valproate, or levetiracetam — then anesthetic infusions (propofol/midazolam) if refractory." }
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
        { f: "How do stress and urge incontinence differ?",
          b: "Stress: leak with cough/sneeze/exertion (sphincter/pelvic floor failure). Urge: sudden overwhelming need with large-volume leak (detrusor overactivity)." },
        { f: "What is first-line therapy for stress incontinence?",
          b: "Pelvic floor muscle (Kegel) training ± weight loss; midurethral sling surgery for refractory cases." },
        { f: "What is first-line therapy for urge incontinence?",
          b: "Bladder training first; then mirabegron or antimuscarinics — beware anticholinergic cognitive effects in older adults." }
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
        { f: "What is the first-line treatment of anaphylaxis?",
          b: "IM epinephrine 0.3–0.5 mg (1 mg/mL) in the mid-outer thigh, repeated every 5–15 min — antihistamines and steroids are adjuncts only." },
        { f: "What defines anaphylaxis?",
          b: "Acute onset with skin/mucosal involvement PLUS respiratory compromise, hypotension, or severe GI symptoms after a likely allergen." },
        { f: "What follows epinephrine in anaphylaxis?",
          b: "Supine positioning + IV fluids, airway support, observation for biphasic reactions, and discharge with an epinephrine autoinjector + allergy referral." }
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
        { f: "What is Beck triad?",
          b: "Hypotension, elevated JVP, and muffled heart sounds — the classic bedside signature of cardiac tamponade." },
        { f: "What is pulsus paradoxus?",
          b: "An inspiratory fall in systolic BP of more than 10 mm Hg — seen in tamponade (also severe asthma/COPD)." },
        { f: "Which drugs are dangerous in cardiac tamponade?",
          b: "Diuretics, nitrates, and other vasodilators — the ventricle is preload-dependent; give fluids as a bridge to pericardiocentesis." }
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
        { f: "Stanford type A vs type B aortic dissection — management?",
          b: "Type A (ascending aorta) → emergency surgery. Type B (descending only) → medical therapy unless complicated (malperfusion, rupture → TEVAR)." },
        { f: "What are the targets of anti-impulse therapy in dissection?",
          b: "IV beta-blocker FIRST to HR 60–80/min, then SBP < 120 mm Hg — add a vasodilator only after beta-blockade." },
        { f: "Best imaging for suspected aortic dissection?",
          b: "CT angiography if stable; bedside TEE if hemodynamically unstable (MRI is accurate but slow)." }
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
        { f: "What are the four statin benefit groups (ACC/AHA)?",
          b: "Clinical ASCVD; LDL ≥ 190 mg/dL; diabetes age 40–75; and 10-year ASCVD risk ≥ 7.5% age 40–75 after a risk discussion." },
        { f: "What defines high-intensity statin therapy?",
          b: "Lowers LDL by ≥ 50%: atorvastatin 40–80 mg or rosuvastatin 20–40 mg daily." },
        { f: "When does a coronary artery calcium score help?",
          b: "Intermediate-risk primary prevention when the statin decision is uncertain — CAC 0 favors deferring; CAC ≥ 100 (or ≥ 75th percentile) favors a statin." }
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
        { f: "Who should be screened for primary aldosteronism?",
          b: "Resistant hypertension, hypertension with hypokalemia (spontaneous or diuretic-induced), adrenal incidentaloma, hypertension with sleep apnea, or early-onset hypertension/stroke." },
        { f: "What is the diagnostic sequence for primary aldosteronism?",
          b: "Aldosterone-to-renin ratio (high aldosterone, suppressed renin) → confirmatory salt-loading test → adrenal CT → adrenal vein sampling to lateralize." },
        { f: "How is primary aldosteronism treated?",
          b: "Unilateral adenoma → laparoscopic adrenalectomy. Bilateral hyperplasia → mineralocorticoid receptor antagonist (spironolactone or eplerenone)." }
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
        { f: "T2DM + established ASCVD: which drug classes are preferred?",
          b: "GLP-1 receptor agonist or SGLT2 inhibitor with proven CV benefit — regardless of A1c or metformin use." },
        { f: "T2DM + heart failure or CKD: which drug class is preferred?",
          b: "SGLT2 inhibitor — reduces HF hospitalization and slows CKD progression (GLP-1 RA if SGLT2i not tolerated or for added ASCVD/weight benefit)." },
        { f: "What is the general A1c target in nonpregnant adults?",
          b: "< 7% for most; less stringent (< 8%) for older adults, frailty, limited life expectancy, or hypoglycemia risk." }
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
        { f: "How is acute pancreatitis diagnosed?",
          b: "2 of 3: characteristic epigastric pain, lipase (or amylase) ≥ 3× ULN, or characteristic imaging findings." },
        { f: "Fluids and nutrition in acute pancreatitis?",
          b: "Moderate goal-directed lactated Ringer's (not aggressive) and early oral feeding as tolerated; enteral is preferred to TPN." },
        { f: "When is ERCP indicated in gallstone pancreatitis?",
          b: "Within 24 h only with concomitant cholangitis (or persistent biliary obstruction) — not routinely; cholecystectomy in the same admission if mild." }
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
        { f: "Who should be screened for hepatitis C?",
          b: "All adults at least once (CDC ≥ 18 y; USPSTF 18–79 y), every pregnancy, and periodically with ongoing risk such as injection drug use." },
        { f: "What follows a positive HCV antibody?",
          b: "HCV RNA — antibody persists after spontaneous clearance or cure, so only RNA proves active infection." },
        { f: "What are the pangenotypic HCV regimens?",
          b: "Sofosbuvir-velpatasvir × 12 weeks or glecaprevir-pibrentasvir × 8 weeks — SVR > 95%; screen for HBV first (reactivation risk)." }
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
        { f: "Empiric therapy for community-acquired bacterial meningitis in adults?",
          b: "Vancomycin + ceftriaxone (or cefotaxime); add ampicillin if age ≥ 50 or immunocompromised to cover Listeria; plus dexamethasone." },
        { f: "When is head CT needed before lumbar puncture?",
          b: "Immunocompromise, known CNS lesion, new seizure, papilledema, altered consciousness, or focal deficit — but start antibiotics before the scan." },
        { f: "When should dexamethasone be given in bacterial meningitis?",
          b: "10–20 min before or with the first antibiotic dose; continue only if pneumococcus is confirmed (mortality and hearing benefit)." }
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
        { f: "Purulent vs nonpurulent skin infection — empiric treatment?",
          b: "Purulent (abscess/furuncle) → I&D ± MRSA-active agent. Nonpurulent cellulitis → cover β-hemolytic strep (cephalexin, cefazolin)." },
        { f: "Which oral antibiotics cover community MRSA?",
          b: "TMP-SMX, doxycycline/minocycline, clindamycin (variable resistance), and linezolid." },
        { f: "What are red flags for necrotizing fasciitis?",
          b: "Pain out of proportion to exam, rapid spread, crepitus, bullae/skin necrosis, systemic toxicity → emergent surgical exploration + broad antibiotics." }
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
        { f: "Treatment of primary, secondary, or early latent syphilis?",
          b: "Benzathine penicillin G 2.4 million units IM × 1 (late latent/unknown duration: weekly × 3)." },
        { f: "Treatment of neurosyphilis or ocular syphilis?",
          b: "Aqueous crystalline penicillin G IV 18–24 million units/day for 10–14 days." },
        { f: "Syphilis treatment with penicillin allergy?",
          b: "Nonpregnant: doxycycline 100 mg BID × 14 days (28 days if late). Pregnant: penicillin desensitization, then penicillin." }
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
        { f: "What is Löfgren syndrome?",
          b: "Acute sarcoidosis: erythema nodosum + bilateral hilar adenopathy + ankle periarthritis/fever — excellent prognosis, treat with NSAIDs." },
        { f: "Why does sarcoidosis cause hypercalcemia?",
          b: "Granuloma macrophages express 1-α-hydroxylase → excess calcitriol (1,25-(OH)₂ vitamin D) → increased gut calcium absorption." },
        { f: "When are glucocorticoids indicated in sarcoidosis?",
          b: "Symptomatic or progressive lung disease, or cardiac, neurologic, ocular, renal involvement, or hypercalcemia." }
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
        { f: "USPSTF lung cancer screening criteria?",
          b: "Annual low-dose CT for age 50–80, ≥ 20 pack-years, and currently smoking or quit within 15 years." },
        { f: "When does lung cancer screening stop?",
          b: "After 15 years without smoking, or when health problems limit life expectancy or the ability/willingness to undergo curative surgery." },
        { f: "Incidental solid lung nodule < 6 mm in a low-risk patient — follow-up?",
          b: "No routine follow-up (Fleischner); high-risk patients may have optional CT at 12 months." }
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
        { f: "Which synovial WBC count suggests septic arthritis?",
          b: "> 50,000/µL with > 90% neutrophils (often > 100,000) — but lower counts do not exclude it; culture decides." },
        { f: "Does finding crystals exclude septic arthritis?",
          b: "No — gout/CPPD and infection can coexist; always send Gram stain and culture." },
        { f: "Most common organisms in septic arthritis?",
          b: "Staphylococcus aureus overall; Neisseria gonorrhoeae in young sexually active adults (tenosynovitis, pustules, migratory arthralgia)." }
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
        { f: "What is the classic presentation of polymyalgia rheumatica?",
          b: "Age > 50, bilateral shoulder and hip girdle aching with prolonged morning stiffness, raised ESR/CRP, normal CK and true strength." },
        { f: "How is polymyalgia rheumatica treated?",
          b: "Prednisone 12.5–25 mg/day with a rapid, dramatic response, then a slow taper (≥ 12 months); methotrexate is a steroid-sparing agent for relapse." },
        { f: "PMR vs inflammatory myopathy — key distinction?",
          b: "PMR: pain and stiffness, normal strength and CK. Myositis: true proximal weakness with elevated CK." }
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
        { f: "How is the serum anion gap calculated?",
          b: "Na⁺ − (Cl⁻ + HCO₃⁻); normal ≈ 10–12 — lower the expected value by ~2.5 for every 1 g/dL fall in albumin." },
        { f: "What does an elevated osmolar gap (> 10) with high-AG acidosis suggest?",
          b: "Toxic alcohol: ethylene glycol (AKI, calcium oxalate crystals) or methanol (visual loss) → fomepizole ± hemodialysis." },
        { f: "What is Winter's formula?",
          b: "Expected PaCO₂ = 1.5 × HCO₃⁻ + 8 ± 2 — higher means a concomitant respiratory acidosis, lower a respiratory alkalosis." }
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
        { f: "Why should calcium NOT be restricted in calcium oxalate stone formers?",
          b: "Dietary calcium binds oxalate in the gut — restriction increases oxalate absorption, urinary oxalate, and stone risk." },
        { f: "Drug therapy matched to the 24-hour urine finding?",
          b: "Hypercalciuria → thiazide; hypocitraturia → potassium citrate; hyperuricosuria → allopurinol (or potassium citrate for uric acid stones)." },
        { f: "Acute ureteral stone management?",
          b: "≤ 10 mm distal stone → analgesia + tamsulosin (medical expulsive therapy). Obstruction with infection → emergent decompression (stent or nephrostomy)." }
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
        { f: "What is the minimum needed to suspect TTP?",
          b: "MAHA (schistocytes, high LDH, low haptoglobin) + thrombocytopenia — the full pentad (fever, renal, neuro) is usually absent." },
        { f: "What is the treatment of immune TTP?",
          b: "Immediate plasma exchange + glucocorticoids, plus caplacizumab ± rituximab — do not wait for ADAMTS13 results." },
        { f: "Which lab confirms TTP, and how do coagulation tests help?",
          b: "ADAMTS13 activity < 10%. PT/aPTT and fibrinogen are normal in TTP but abnormal in DIC." }
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
        { f: "When should adult ITP be treated?",
          b: "Platelets < 30,000/µL or clinically significant bleeding — first-line glucocorticoids (prednisone ≤ 6 weeks or dexamethasone pulses)." },
        { f: "When is IVIG used in ITP?",
          b: "When a rapid platelet rise is needed: serious bleeding or before an urgent procedure (with steroids ± platelet transfusion if life-threatening)." },
        { f: "Which secondary causes must be excluded in suspected ITP?",
          b: "HIV, hepatitis C, H. pylori, drugs, pregnancy, and lymphoproliferative or autoimmune disease (e.g., SLE)." }
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
        { f: "What is the initial management of malignant spinal cord compression?",
          b: "IV dexamethasone immediately + urgent MRI of the entire spine, then radiation and/or surgical decompression." },
        { f: "What predicts outcome in spinal cord compression?",
          b: "Neurologic function at presentation — patients ambulatory at treatment usually stay ambulatory." },
        { f: "What is a red-flag back pain feature in cancer patients?",
          b: "New/progressive pain, pain worse lying down or at night, thoracic location, radicular band-like pain, or any neurologic deficit." }
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
        { f: "How is myasthenia gravis diagnosed?",
          b: "AChR antibodies first (then MuSK); electrodiagnostics: decremental repetitive stimulation, single-fiber EMG (most sensitive); then chest CT for thymoma." },
        { f: "Which drugs can worsen myasthenia gravis?",
          b: "Aminoglycosides, fluoroquinolones, macrolides, magnesium, beta-blockers, and neuromuscular blockers (also checkpoint inhibitors)." },
        { f: "How is myasthenic crisis managed?",
          b: "ICU monitoring of FVC/NIF (intubate if FVC < 20 mL/kg), IVIG or plasma exchange, then glucocorticoids; hold pyridostigmine if intubated." }
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
        { f: "What are the DSM-5 criteria for major depressive disorder?",
          b: "≥ 5 of 9 symptoms (SIG E CAPS + depressed mood) for ≥ 2 weeks, including depressed mood or anhedonia, with functional impairment." },
        { f: "How long is an adequate antidepressant trial, and how long is treatment continued?",
          b: "4–8 weeks at a therapeutic dose; continue ≥ 6–12 months after remission (longer if recurrent)." },
        { f: "What must be screened for before starting an antidepressant?",
          b: "Prior mania/hypomania (bipolar disorder) and suicide risk — warn young adults (< 25) about early suicidality." }
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
        { f: "What is the timeline of alcohol withdrawal?",
          b: "Tremor/anxiety 6–24 h; hallucinosis 12–48 h; seizures 6–48 h; delirium tremens 48–96 h after the last drink." },
        { f: "What is the first-line treatment of alcohol withdrawal?",
          b: "Benzodiazepines, symptom-triggered by CIWA-Ar (long-acting such as diazepam/chlordiazepoxide; lorazepam in liver failure or elderly patients)." },
        { f: "Which medications treat alcohol use disorder after withdrawal?",
          b: "Naltrexone (avoid with opioids or acute hepatitis), acamprosate (renally cleared — avoid in severe CKD), disulfiram (adherence-dependent)." }
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
        { f: "What are the ABCDEs of melanoma?",
          b: "Asymmetry, Border irregularity, Color variation, Diameter > 6 mm, Evolution (change) — plus the 'ugly duckling' sign." },
        { f: "What biopsy is preferred for a suspected melanoma?",
          b: "Full-thickness excisional biopsy with 1–3 mm margins (deep saucerization acceptable) — never cryotherapy or a superficial shave." },
        { f: "What is the most important prognostic factor in localized melanoma?",
          b: "Breslow thickness (tumor depth) — it determines excision margins and the need for sentinel lymph node biopsy." }
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
        { f: "How are SJS, SJS/TEN overlap, and TEN distinguished?",
          b: "By detached body surface area: < 10% SJS, 10–30% overlap, > 30% TEN — all with mucosal involvement." },
        { f: "Which drugs most often cause SJS/TEN?",
          b: "Allopurinol, sulfonamides, aromatic anticonvulsants (carbamazepine, phenytoin, lamotrigine), oxicam NSAIDs, nevirapine — usually 4–28 days after starting." },
        { f: "Which HLA alleles predict SJS/TEN?",
          b: "HLA-B*15:02 with carbamazepine (Asian ancestry) and HLA-B*58:01 with allopurinol — test before starting in at-risk groups." }
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
        { f: "Which antihypertensives are preferred in pregnancy?",
          b: "Labetalol, extended-release nifedipine, methyldopa — never ACE inhibitors, ARBs, or direct renin inhibitors." },
        { f: "Who gets aspirin for preeclampsia prevention?",
          b: "High-risk patients (prior preeclampsia, chronic HTN, diabetes, CKD, autoimmune disease, multifetal pregnancy): aspirin 81 mg daily from 12 weeks (USPSTF)." },
        { f: "How is preeclampsia defined?",
          b: "New BP ≥ 140/90 after 20 weeks plus proteinuria or severe features (thrombocytopenia, AKI, transaminitis, pulmonary edema, cerebral/visual symptoms)." }
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
        { f: "How is ARDS defined (Berlin)?",
          b: "Within 1 week of an insult; bilateral opacities not fully explained by effusion, collapse, or HF; P/F ≤ 300 on PEEP ≥ 5 (≤ 100 severe)." },
        { f: "What is lung-protective ventilation in ARDS?",
          b: "Tidal volume 6 mL/kg (range 4–8) of PREDICTED body weight, plateau pressure ≤ 30 cm H₂O, adequate PEEP." },
        { f: "When is prone positioning indicated in ARDS?",
          b: "Moderate-to-severe ARDS with P/F < 150 — prone ≥ 12–16 h/day reduces mortality (PROSEVA)." }
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
        { f: "How do you screen for fall risk?",
          b: "Ask about falls in the past year and fear of falling; Timed Up and Go ≥ 12 s indicates increased risk (CDC STEADI)." },
        { f: "Which fall-prevention intervention has the strongest evidence?",
          b: "Exercise (gait, balance, strength; tai chi), plus multifactorial risk reduction — vitamin D does not prevent falls without deficiency." },
        { f: "Which Beers Criteria drugs increase fall risk?",
          b: "Benzodiazepines, Z-drugs (zolpidem), anticholinergics (oxybutynin, diphenhydramine), antipsychotics, and other sedatives." }
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
        { f: "What are the ECG features of Wolff-Parkinson-White pattern?",
          b: "Short PR interval (< 120 ms), delta wave (slurred QRS upstroke), and wide QRS from ventricular pre-excitation." },
        { f: "How is pre-excited atrial fibrillation treated?",
          b: "Unstable → synchronized cardioversion. Stable → IV procainamide or ibutilide. Never AV nodal blockers (adenosine, CCB, BB, digoxin, IV amiodarone)." },
        { f: "What is the definitive therapy for symptomatic WPW?",
          b: "Catheter ablation of the accessory pathway." }
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
        { f: "Hypertensive emergency vs urgency?",
          b: "Both: BP > 180/120. Emergency = acute end-organ damage → IV therapy in ICU. Urgency = no organ damage → oral agents, outpatient follow-up." },
        { f: "BP-lowering targets in hypertensive emergency?",
          b: "≤ 25% reduction in the first hour → 160/100 over 2–6 h → normal over 24–48 h." },
        { f: "Which hypertensive emergencies need faster BP targets?",
          b: "Aortic dissection (SBP < 120 within 20 min), severe preeclampsia/eclampsia, and pheochromocytoma crisis (SBP < 140 in the first hour)." }
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
        { f: "How is the ankle-brachial index interpreted?",
          b: "≤ 0.90 abnormal (PAD); 0.91–0.99 borderline; 1.00–1.40 normal; > 1.40 noncompressible → obtain toe-brachial index." },
        { f: "What is first-line therapy for claudication?",
          b: "Supervised exercise therapy, smoking cessation, high-intensity statin, antiplatelet therapy; cilostazol for persistent symptoms (not in HF)." },
        { f: "What is chronic limb-threatening ischemia?",
          b: "PAD with rest pain, nonhealing wounds, or gangrene for > 2 weeks → urgent vascular evaluation for revascularization." }
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
        { f: "What are the first tests for a thyroid nodule?",
          b: "Serum TSH and thyroid ultrasound. Low TSH → radionuclide uptake scan (hot nodules rarely malignant)." },
        { f: "Which ultrasound features suggest thyroid cancer?",
          b: "Solid, hypoechoic, irregular/infiltrative margins, microcalcifications, taller-than-wide shape, extrathyroidal extension." },
        { f: "When is FNA indicated for a thyroid nodule?",
          b: "High/intermediate suspicion ≥ 1 cm, low suspicion ≥ 1.5 cm, very low suspicion (spongiform) ≥ 2 cm or observe — ATA thresholds." }
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
        { f: "What are the screening tests for Cushing syndrome?",
          b: "Overnight 1-mg dexamethasone suppression test (cortisol > 1.8 µg/dL abnormal), late-night salivary cortisol ×2, or 24-h urine free cortisol ×2; confirm with a second test before localizing." },
        { f: "How is confirmed Cushing syndrome localized?",
          b: "Plasma ACTH: low → adrenal source (adrenal CT). Normal/high → pituitary MRI; if equivocal, inferior petrosal sinus sampling vs ectopic source." },
        { f: "What is the most common cause of Cushing syndrome overall, and of endogenous disease?",
          b: "Overall: exogenous glucocorticoids. Endogenous: ACTH-secreting pituitary adenoma (Cushing disease)." }
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
        { f: "What are Charcot triad and Reynolds pentad?",
          b: "Charcot: fever, jaundice, RUQ pain (cholangitis). Reynolds: + hypotension and altered mental status (suppurative cholangitis)." },
        { f: "How is acute cholangitis treated?",
          b: "IV fluids + broad-spectrum antibiotics + biliary drainage (ERCP; percutaneous drain if ERCP fails) — urgent if septic." },
        { f: "Suspected choledocholithiasis: when ERCP vs MRCP/EUS?",
          b: "High probability (CBD stone on imaging, cholangitis, or bilirubin > 4 with dilated duct) → ERCP. Intermediate → MRCP or EUS first." }
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
        { f: "HBV serology: vaccinated vs resolved infection?",
          b: "Vaccinated: anti-HBs only. Resolved infection: anti-HBc + anti-HBs, HBsAg negative." },
        { f: "HBV serology: acute vs chronic infection?",
          b: "Acute: HBsAg + IgM anti-HBc. Chronic: HBsAg > 6 months + IgG anti-HBc. Window period: IgM anti-HBc alone." },
        { f: "Who needs HBV prophylaxis before immunosuppression?",
          b: "All HBsAg-positive patients, and HBsAg-negative/anti-HBc-positive patients receiving high-risk therapy (anti-CD20, stem cell transplant) — entecavir or tenofovir." }
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
        { f: "First-line H. pylori therapy when susceptibility is unknown?",
          b: "Bismuth quadruple therapy for 14 days (PPI, bismuth, tetracycline, metronidazole); vonoprazan-amoxicillin dual is an alternative." },
        { f: "How and when is H. pylori eradication confirmed?",
          b: "Urea breath test, stool antigen, or biopsy ≥ 4 weeks after antibiotics and ≥ 2 weeks off PPIs — test of cure in everyone treated." },
        { f: "Who should be tested for H. pylori?",
          b: "Peptic ulcer disease (active or past), gastric MALT lymphoma, early gastric cancer, uninvestigated dyspepsia < 60, unexplained iron deficiency, ITP, long-term NSAID/aspirin starters." }
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
        { f: "First-line antibiotics for uncomplicated cystitis?",
          b: "Nitrofurantoin × 5 days, TMP-SMX × 3 days (if resistance < 20%), or fosfomycin 3 g × 1 — avoid fluoroquinolones." },
        { f: "When should asymptomatic bacteriuria be treated?",
          b: "Only in pregnancy and before urologic procedures with mucosal bleeding — not in older adults, catheters, or diabetes." },
        { f: "When should nitrofurantoin be avoided?",
          b: "Pyelonephritis or systemic infection (poor tissue levels) and CrCl < 30 mL/min (Beers)." }
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
        { f: "What is the S. aureus bacteremia management bundle?",
          b: "ID consult, source control (remove lines), repeat blood cultures until negative, echocardiogram in all, beta-lactam for MSSA." },
        { f: "Best antibiotic for MSSA bacteremia?",
          b: "Cefazolin or antistaphylococcal penicillin (nafcillin/oxacillin) — superior to vancomycin." },
        { f: "Uncomplicated S. aureus bacteremia criteria and duration?",
          b: "No endocarditis/implants/metastatic foci, source removed, defervescence within 72 h, cultures clear in 2–4 days → ≥ 14 days IV; otherwise 4–6 weeks." }
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
        { f: "What are the HIV PrEP options?",
          b: "Oral FTC/TDF (all) or FTC/TAF (not receptive vaginal sex); injectable cabotegravir q2 months; twice-yearly lenacapavir injection." },
        { f: "When and how is HIV postexposure prophylaxis given?",
          b: "Within 72 hours of exposure: 28 days of a 3-drug regimen (e.g., bictegravir/FTC/TAF or dolutegravir + FTC/TDF)." },
        { f: "What monitoring does oral PrEP require?",
          b: "HIV test before start and every 3 months, STI screening, creatinine clearance at baseline and at least yearly, and HBV status (stopping TDF/TAF can flare HBV)." }
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
        { f: "What is the HRCT UIP pattern?",
          b: "Subpleural, basal-predominant reticulation with honeycombing ± traction bronchiectasis — diagnostic of IPF in the right context without biopsy." },
        { f: "What is the treatment of idiopathic pulmonary fibrosis?",
          b: "Antifibrotics (nintedanib or pirfenidone), oxygen, pulmonary rehab, transplant referral — avoid glucocorticoid/azathioprine regimens." },
        { f: "What PFT pattern defines restrictive lung disease?",
          b: "Reduced TLC (< 5th percentile/LLN) with normal or high FEV1/FVC; DLCO is low in parenchymal disease, normal in chest wall/neuromuscular causes." }
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
        { f: "Which ANCA goes with which vasculitis?",
          b: "GPA: PR3/c-ANCA. MPA: MPO/p-ANCA. EGPA (asthma, eosinophilia): MPO/p-ANCA in ~40%." },
        { f: "What is induction therapy for severe ANCA vasculitis?",
          b: "Glucocorticoids + rituximab (or cyclophosphamide), then rituximab maintenance; PJP prophylaxis with TMP-SMX." },
        { f: "What defines a pulmonary-renal syndrome?",
          b: "Diffuse alveolar hemorrhage + glomerulonephritis — ANCA vasculitis, anti-GBM disease (Goodpasture), or SLE." }
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
        { f: "How is nephrotic syndrome defined?",
          b: "Proteinuria > 3.5 g/day + hypoalbuminemia + edema (± hyperlipidemia, lipiduria) with a bland sediment." },
        { f: "What are the key features of membranous nephropathy?",
          b: "Most common primary nephrotic cause in older adults; anti-PLA2R positive; secondary causes: solid tumors, HBV, SLE class V, NSAIDs; high thrombosis risk." },
        { f: "Why is nephrotic syndrome hypercoagulable?",
          b: "Urinary loss of antithrombin III (and proteins C/S) plus increased hepatic clotting factors — renal vein thrombosis, DVT/PE." }
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
        { f: "What are the screening labs for hereditary hemochromatosis?",
          b: "Fasting transferrin saturation (> 45%) and ferritin → HFE genotype (C282Y homozygous most common)." },
        { f: "What is the treatment of hereditary hemochromatosis?",
          b: "Weekly phlebotomy until ferritin 50–100 ng/mL, then maintenance — chelation only if phlebotomy is impossible." },
        { f: "Classic clinical features of hemochromatosis?",
          b: "Cirrhosis/HCC, diabetes, bronze skin, hypogonadism, cardiomyopathy, and 2nd/3rd MCP arthropathy with CPPD/chondrocalcinosis." }
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
        { f: "First-line anticoagulant for cancer-associated VTE?",
          b: "DOAC (apixaban, rivaroxaban, edoxaban) or LMWH — not warfarin; caution with edoxaban/rivaroxaban in luminal GI/GU cancers." },
        { f: "How long is cancer-associated VTE treated?",
          b: "At least 6 months, and indefinitely while the cancer is active or being treated." },
        { f: "When is an IVC filter indicated?",
          b: "Acute proximal DVT/PE with an absolute contraindication to anticoagulation (e.g., active major bleeding) — remove when anticoagulation is possible." }
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
        { f: "General management of immune-related adverse events by grade?",
          b: "Grade 1: continue ICI. Grade 2: hold ICI ± prednisone 0.5–1 mg/kg. Grade 3–4: hold/stop ICI + methylprednisolone 1–2 mg/kg." },
        { f: "Steroid-refractory checkpoint inhibitor colitis treatment?",
          b: "Infliximab (or vedolizumab) if no improvement after 48–72 h of IV glucocorticoids." },
        { f: "How are ICI endocrinopathies managed?",
          b: "Hormone replacement (levothyroxine, hydrocortisone, insulin); ICI can usually continue — steroids not needed except for hypophysitis symptoms." }
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
        { f: "What are the key features of Guillain-Barré syndrome?",
          b: "Ascending symmetric weakness, areflexia, CSF high protein with normal cells; triggers: Campylobacter, viral illness; autonomic instability." },
        { f: "What is the 20/30/40 rule in neuromuscular respiratory failure?",
          b: "Intubate if FVC < 20 mL/kg, max inspiratory pressure weaker than −30 cm H₂O, or max expiratory pressure < 40 cm H₂O." },
        { f: "What is the treatment of Guillain-Barré syndrome?",
          b: "IVIG or plasma exchange (equivalent; not combined) — glucocorticoids do not help." }
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
        { f: "When are triptans contraindicated?",
          b: "Coronary artery disease, prior stroke/TIA, PAD, uncontrolled hypertension, hemiplegic/brainstem aura — use gepants or lasmiditan instead." },
        { f: "When is migraine preventive therapy indicated?",
          b: "≥ 4 headache days/month or disabling attacks despite acute therapy — propranolol/metoprolol, topiramate, amitriptyline, CGRP mAbs." },
        { f: "What defines medication-overuse headache?",
          b: "Headache ≥ 15 days/month with simple analgesics ≥ 15 days/month or triptans, opioids, butalbital, or combination analgesics ≥ 10 days/month." }
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
        { f: "Serotonin syndrome vs neuroleptic malignant syndrome?",
          b: "SS: hours, serotonergic drug, clonus/hyperreflexia, diarrhea, mydriasis. NMS: days, dopamine antagonist, lead-pipe rigidity, bradyreflexia, high CK." },
        { f: "Which drugs commonly precipitate serotonin syndrome with SSRIs?",
          b: "Tramadol, meperidine, fentanyl, methadone, linezolid, methylene blue, triptans (rarely), MAOIs, dextromethorphan, ondansetron." },
        { f: "How is serotonin syndrome treated?",
          b: "Stop serotonergic drugs, benzodiazepines, cooling and supportive care, cyproheptadine if persistent; severe hyperthermia → sedation, paralysis, intubation." }
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
        { f: "What is the classic presentation of scabies?",
          b: "Severe nocturnal itch, burrows in finger webs/wrists, papules on genitals, axillae, waistband; household members affected." },
        { f: "How is scabies treated?",
          b: "Permethrin 5% neck-to-toe, repeat in 7–14 days (or oral ivermectin ×2); treat all contacts at once; hot-wash bedding." },
        { f: "What is crusted (Norwegian) scabies?",
          b: "Hyperinfestation with thick crusts in immunocompromised/institutionalized patients — highly contagious; oral ivermectin + topical permethrin." }
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
        { f: "When are estrogen-containing contraceptives contraindicated (US MEC 4)?",
          b: "Migraine with aura, smoker ≥ 35 (≥ 15 cig/day), prior VTE/thrombophilia, BP ≥ 160/100, < 21 days postpartum, current breast cancer, complicated valvular disease, decompensated cirrhosis." },
        { f: "What are the most effective reversible contraceptives?",
          b: "LARC: copper IUD, levonorgestrel IUD, etonogestrel implant — < 1% failure per year." },
        { f: "Emergency contraception options?",
          b: "Copper IUD within 5 days (most effective); ulipristal up to 120 h; levonorgestrel up to 72 h (less effective if BMI > 30)." }
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
        { f: "Does tube feeding help in advanced dementia?",
          b: "No — no survival, aspiration, pressure ulcer, or comfort benefit; careful hand feeding is recommended (AGS, Choosing Wisely)." },
        { f: "What is the Medicare hospice eligibility criterion?",
          b: "Two physicians certify prognosis ≤ 6 months if the illness runs its usual course, and the patient elects comfort-focused care over curative treatment for the terminal illness." },
        { f: "Which features suggest end-stage dementia (hospice eligible)?",
          b: "FAST stage 7: < 6 words, nonambulatory, incontinent, dependent in all ADLs, plus complications (aspiration, sepsis, weight loss > 10%, pressure ulcers)." }
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
        { f: "What are the four elements of decision-making capacity?",
          b: "Communicates a clear choice, understands the relevant information, appreciates the situation and consequences, and reasons about options consistently with values." },
        { f: "Capacity vs competence?",
          b: "Capacity: clinical, decision-specific, assessed by any physician. Competence: legal status determined by a court." },
        { f: "Who decides for a patient who lacks capacity?",
          b: "Advance directive / designated health care proxy first; otherwise legal surrogate hierarchy (guardian, spouse, adult children, parents, siblings) using substituted judgment." }
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
        { f: "Perioperative DOAC interruption (PAUSE)?",
          b: "Apixaban/rivaroxaban: hold 1 day (low bleed risk), 2 days (high bleed risk), or 3 days (neuraxial anesthesia); no bridging; resume 24 h or 48–72 h after." },
        { f: "Who needs heparin bridging when warfarin is stopped?",
          b: "Only high thrombotic risk: mechanical mitral (or older aortic) valve, stroke/TIA < 3 months, VTE < 3 months, severe thrombophilia — most AF patients do not (BRIDGE)." },
        { f: "How long before surgery is warfarin stopped?",
          b: "5 days before; check INR the day before (vitamin K 1–2 mg orally if INR > 1.5); resume 12–24 h after if hemostasis is adequate." }
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
        { f: "Who should be screened for abdominal aortic aneurysm (USPSTF)?",
          b: "One-time ultrasound for men 65–75 who have ever smoked (B); selective in never-smoking men (C); not in never-smoking women (D)." },
        { f: "When is an AAA repaired?",
          b: "Diameter ≥ 5.5 cm in men (≥ 5.0 cm in women), growth ≥ 0.5 cm/year, or any symptomatic aneurysm." },
        { f: "Which screening tests are NOT recommended in asymptomatic adults?",
          b: "ABI for PAD, carotid duplex for stenosis, resting/exercise ECG in low-risk adults — USPSTF D or I." }
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
        { f: "When is N-acetylcysteine started immediately in acetaminophen overdose?",
          b: "Presentation > 8 h after ingestion, unknown time, staggered ingestion, or any evidence of liver injury — do not wait for the level." },
        { f: "How is the Rumack-Matthew nomogram used?",
          b: "Single acute ingestion only: plot a level drawn 4–24 h post-ingestion; above the treatment line (150 µg/mL at 4 h) → NAC." },
        { f: "King's College criteria in acetaminophen-induced liver failure?",
          b: "Arterial pH < 7.30 after resuscitation, OR all of INR > 6.5, creatinine > 3.4 mg/dL, and grade III/IV encephalopathy → transplant listing." }
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
        { f: "STEMI reperfusion: when PCI vs fibrinolysis?",
          b: "Primary PCI if first-contact-to-device ≤ 120 min (goal ≤ 90 min); otherwise fibrinolysis within 30 min of arrival if symptoms < 12 h." },
        { f: "What are absolute contraindications to fibrinolysis?",
          b: "Any prior ICH, ischemic stroke < 3 months, structural cerebral vascular lesion or intracranial tumor, active bleeding, suspected aortic dissection, significant head/facial trauma < 3 months." },
        { f: "What is the pharmacoinvasive strategy after fibrinolysis?",
          b: "Transfer to a PCI center for angiography within 2–24 h; immediate rescue PCI if < 50% ST resolution at 60–90 min or instability." }
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
        { f: "Stepwise acute management of stable SVT?",
          b: "Vagal maneuvers → adenosine 6 mg rapid IV push (then 12 mg) → IV diltiazem/verapamil or beta-blocker → synchronized cardioversion if unstable or refractory." },
        { f: "Adenosine cautions?",
          b: "Transient asystole/flushing/chest pressure; lower dose (3 mg) via central line or after heart transplant or with dipyridamole/carbamazepine; caution in severe asthma." },
        { f: "Definitive therapy for recurrent AVNRT?",
          b: "Catheter ablation of the slow pathway — > 95% cure, low risk of AV block." }
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
        { f: "When is subclinical hypothyroidism treated?",
          b: "TSH ≥ 10 µU/mL, pregnancy or planning pregnancy; consider in younger symptomatic patients — not routinely for TSH < 10 in older adults." },
        { f: "What should be done before treating a mildly elevated TSH?",
          b: "Repeat TSH + free T4 in 2–3 months; exclude recovery from nonthyroidal illness, biotin interference, and drugs." },
        { f: "Levothyroxine dosing pearls?",
          b: "Full dose ~1.6 µg/kg in young healthy adults; start 25–50 µg in older adults or CAD; recheck TSH 6–8 weeks after each change; take on an empty stomach apart from calcium/iron/PPIs." }
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
        { f: "What hormonal workup does every adrenal incidentaloma need?",
          b: "1-mg dexamethasone suppression test in all; plasma metanephrines only if > 10 HU or adrenergic symptoms; aldosterone-to-renin ratio if hypertension or hypokalemia." },
        { f: "What imaging features suggest a benign adrenal adenoma?",
          b: "Homogeneous, smooth, < 4 cm, unenhanced CT < 10 HU, or rapid contrast washout — no further imaging needed." },
        { f: "Why must pheochromocytoma be excluded before adrenal biopsy?",
          b: "Biopsy can precipitate a hypertensive crisis; biopsy is reserved for suspected metastasis after pheo is excluded." }
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
        { f: "Which antibodies define type 1 vs type 2 autoimmune hepatitis?",
          b: "Type 1: ANA and anti-smooth muscle (anti-actin). Type 2: anti-LKM-1 and anti-liver cytosol-1 (children/young adults)." },
        { f: "What is first-line treatment of autoimmune hepatitis?",
          b: "Prednisone (or budesonide if noncirrhotic) + azathioprine — check TPMT first; mycophenolate is second-line." },
        { f: "Primary biliary cholangitis vs primary sclerosing cholangitis?",
          b: "PBC: middle-aged women, antimitochondrial antibody, ursodiol. PSC: men with ulcerative colitis, beaded ducts on MRCP, cholangiocarcinoma risk." }
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
        { f: "How is acute severe ulcerative colitis defined?",
          b: "≥ 6 bloody stools/day plus ≥ 1 systemic sign: fever, HR > 90, Hb < 10.5, or ESR > 30 / high CRP (Truelove-Witts)." },
        { f: "Is VTE prophylaxis given during an IBD flare with bleeding?",
          b: "Yes — pharmacologic prophylaxis for all hospitalized IBD patients; rectal bleeding is not a contraindication." },
        { f: "Rescue therapy for steroid-refractory acute severe UC?",
          b: "No response by day 3 of IV steroids → infliximab or cyclosporine; colectomy for failure, megacolon, or perforation." }
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
        { f: "Induction therapy for HIV-associated cryptococcal meningitis?",
          b: "Liposomal amphotericin B + flucytosine (≥ 2 weeks), then fluconazole 400–800 mg consolidation, then 200 mg maintenance." },
        { f: "How is raised ICP managed in cryptococcal meningitis?",
          b: "Serial therapeutic LPs to opening pressure < 20 cm H₂O or 50% reduction — not steroids, mannitol, or acetazolamide." },
        { f: "When is ART started after an opportunistic infection?",
          b: "Within 2 weeks for most (e.g., PCP); delay 4–6 weeks for cryptococcal and TB meningitis due to IRIS mortality." }
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
        { f: "Classic presentation of Rocky Mountain spotted fever?",
          b: "Fever, headache, myalgia, then rash starting at wrists/ankles spreading centrally incl. palms/soles; thrombocytopenia, hyponatremia, transaminitis." },
        { f: "Treatment of suspected rickettsial infection?",
          b: "Doxycycline immediately, in all ages, without waiting for serology — delay increases mortality." },
        { f: "Which tick-borne infections cause leukopenia and thrombocytopenia?",
          b: "Ehrlichiosis and anaplasmosis (morulae in leukocytes, usually no rash) — also treated with doxycycline." }
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
        { f: "When is NIV indicated in a COPD exacerbation?",
          b: "Acute respiratory acidosis (pH ≤ 7.35 and PaCO₂ > 45) or severe dyspnea with fatigue — reduces intubation and mortality." },
        { f: "Oxygen target in COPD exacerbation?",
          b: "SpO₂ 88–92% (PaO₂ 60–65) — excess oxygen worsens hypercapnia." },
        { f: "Steroids and antibiotics in COPD exacerbation?",
          b: "Prednisone 40 mg × 5 days (REDUCE); antibiotics if increased sputum purulence plus dyspnea or volume, or if ventilated." }
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
        { f: "What are the five WHO groups of pulmonary hypertension?",
          b: "1 PAH; 2 left heart disease (most common); 3 lung disease/hypoxia; 4 CTEPH/pulmonary artery obstruction; 5 unclear/multifactorial." },
        { f: "Best screening test for CTEPH?",
          b: "V/Q scan (more sensitive than CTPA; normal scan excludes CTEPH) → RHC and pulmonary angiography → endarterectomy if operable." },
        { f: "Hemodynamic definition of precapillary pulmonary hypertension?",
          b: "Right heart cath: mPAP > 20 mm Hg, PCWP ≤ 15 mm Hg, PVR > 2 Wood units." }
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
        { f: "What are the risk factors for scleroderma renal crisis?",
          b: "Early diffuse cutaneous SSc, anti-RNA polymerase III antibodies, and glucocorticoids ≥ 15 mg/day prednisone." },
        { f: "What is the treatment of scleroderma renal crisis?",
          b: "ACE inhibitor (captopril) titrated to normal BP — continue even on dialysis; never stop for rising creatinine." },
        { f: "Which antibodies define limited vs diffuse systemic sclerosis?",
          b: "Limited (CREST): anticentromere — pulmonary hypertension risk. Diffuse: anti-Scl-70 (ILD) and anti-RNA polymerase III (renal crisis, cancer)." }
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
        { f: "What are the pathognomonic skin findings of dermatomyositis?",
          b: "Gottron papules (over MCP/PIP), heliotrope rash; also V sign, shawl sign, mechanic's hands, periungual changes." },
        { f: "Which myositis antibodies predict cancer vs interstitial lung disease?",
          b: "Cancer: anti-TIF1-γ, anti-NXP2. ILD: anti-Jo-1/antisynthetase, anti-MDA5 (rapidly progressive ILD)." },
        { f: "Which cancer screening is recommended in adult dermatomyositis?",
          b: "CT chest/abdomen/pelvis, transvaginal US ± CA-125 in women, mammography, colonoscopy, and age-appropriate screening — repeat over 3 years." }
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
        { f: "Why does hypomagnesemia cause refractory hypokalemia?",
          b: "Low intracellular Mg removes ROMK inhibition → renal K⁺ wasting; replete Mg first." },
        { f: "Common causes of hypomagnesemia?",
          b: "Alcohol use, PPIs, loop/thiazide diuretics, diarrhea, aminoglycosides, amphotericin B, cisplatin, refeeding syndrome." },
        { f: "Why does hypomagnesemia cause hypocalcemia?",
          b: "Low Mg impairs PTH secretion and causes end-organ PTH resistance — calcium will not correct until Mg is repleted." }
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
        { f: "Metabolic alkalosis: what does urine chloride tell you?",
          b: "< 20 mEq/L → saline-responsive (vomiting, NG suction, prior diuretics). > 20 → saline-resistant (current diuretics, Bartter/Gitelman, mineralocorticoid excess)." },
        { f: "Why is urine sodium unreliable in vomiting-induced alkalosis?",
          b: "Bicarbonaturia obligates Na⁺ (and K⁺) excretion despite volume depletion — urine Cl is the better marker." },
        { f: "Gitelman vs Bartter syndrome?",
          b: "Gitelman: mimics thiazide — hypocalciuria, hypomagnesemia, adolescents/adults. Bartter: mimics loop diuretic — hypercalciuria, childhood." }
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
        { f: "How is acute chest syndrome defined?",
          b: "New pulmonary infiltrate plus fever and/or respiratory symptoms (chest pain, cough, hypoxemia, tachypnea) in sickle cell disease." },
        { f: "Simple vs exchange transfusion in sickle cell disease?",
          b: "Simple: symptomatic anemia or mild ACS. Exchange (HbS < 30%): severe/progressive ACS, acute stroke, multiorgan failure — avoid Hb > 10 (hyperviscosity)." },
        { f: "Which therapies prevent sickle cell complications?",
          b: "Hydroxyurea (raises HbF; fewer crises and ACS), plus vaccinations; voxelotor withdrawn 2024; crizanlizumab for pain crises." }
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
        { f: "How is primary vs secondary erythrocytosis distinguished?",
          b: "Serum EPO: low → polycythemia vera (JAK2 V617F in ~95%). Normal/high → secondary (hypoxia, smoking, OSA, testosterone, renal/hepatic tumors)." },
        { f: "What is the treatment of polycythemia vera?",
          b: "All: phlebotomy to Hct < 45% + low-dose aspirin. High risk (≥ 60 y or thrombosis): add hydroxyurea or interferon; ruxolitinib if refractory." },
        { f: "Which myeloproliferative neoplasms carry JAK2, CALR, or MPL mutations?",
          b: "PV (JAK2 ~95%), essential thrombocythemia and primary myelofibrosis (JAK2, CALR, or MPL)." }
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
        { f: "USPSTF recommendation for prostate cancer screening?",
          b: "Age 55–69: individualized decision with shared decision-making (C). Age ≥ 70: do not screen (D)." },
        { f: "What are the harms of PSA screening?",
          b: "False positives, biopsy complications (infection, bleeding), overdiagnosis and overtreatment → incontinence and erectile dysfunction." },
        { f: "Which men are at higher prostate cancer risk?",
          b: "Black men, first-degree relatives with prostate cancer (especially < 65), and BRCA2 (and BRCA1) carriers." }
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
        { f: "What are the most common causes of SVC syndrome?",
          b: "Malignancy (non-small and small cell lung cancer, lymphoma) — increasingly intravascular devices/catheters with thrombosis." },
        { f: "What is the initial approach to SVC syndrome?",
          b: "Stable → tissue diagnosis first, then histology-directed therapy. Stridor, airway or cerebral edema → urgent endovascular stent." },
        { f: "Why avoid empiric steroids before biopsy of a mediastinal mass?",
          b: "Glucocorticoids can shrink lymphoma and render biopsy nondiagnostic." }
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
        { f: "Which patients get DAPT after TIA or stroke?",
          b: "Minor stroke (NIHSS ≤ 3) or high-risk TIA (ABCD² ≥ 4): aspirin + clopidogrel within 24 h for 21 days (CHANCE/POINT)." },
        { f: "What are the components of the ABCD² score?",
          b: "Age ≥ 60 (1), BP ≥ 140/90 (1), Clinical: unilateral weakness (2) or speech only (1), Duration ≥ 60 min (2) / 10–59 (1), Diabetes (1)." },
        { f: "When is carotid endarterectomy indicated after TIA/stroke?",
          b: "Symptomatic ipsilateral stenosis 70–99% (and selected 50–69%), ideally within 2 weeks of the event." }
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
        { f: "Reversal of warfarin in life-threatening bleeding?",
          b: "4-factor PCC (preferred over FFP) + IV vitamin K 10 mg." },
        { f: "Reversal agents for DOACs?",
          b: "Dabigatran → idarucizumab. Apixaban/rivaroxaban → andexanet alfa or 4F-PCC." },
        { f: "BP target in acute intracerebral hemorrhage?",
          b: "SBP lowered to ~140 mm Hg (range 130–150) within hours — avoid < 130." }
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
        { f: "When is buprenorphine started in opioid withdrawal?",
          b: "Moderate withdrawal (COWS ≥ 8–12), usually 12–24 h after short-acting opioids — earlier dosing precipitates withdrawal." },
        { f: "What are the regulatory rules for OUD medications?",
          b: "Buprenorphine: any DEA-registered prescriber (X-waiver removed 2023). Methadone for OUD: only via certified opioid treatment programs." },
        { f: "Naltrexone for OUD — key requirement?",
          b: "Must be opioid-free 7–10 days first (else precipitated withdrawal); extended-release IM monthly; also used for alcohol use disorder." }
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
        { f: "Which drugs raise lithium levels?",
          b: "Thiazides, ACE inhibitors/ARBs, NSAIDs (not aspirin) — plus dehydration and CKD." },
        { f: "When is hemodialysis indicated in lithium toxicity?",
          b: "Level > 4.0 with impaired kidney function, or decreased consciousness, seizures, or dysrhythmias at any level; suggested for > 5.0 or confusion." },
        { f: "Chronic adverse effects of lithium?",
          b: "Nephrogenic diabetes insipidus, CKD, hypothyroidism, hyperparathyroidism/hypercalcemia, tremor, weight gain; Ebstein anomaly risk in pregnancy (small)." }
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
        { f: "Bullous pemphigoid vs pemphigus vulgaris?",
          b: "BP: elderly, tense bullae, mucosa spared, Nikolsky −, linear IgG/C3 at BMZ. PV: flaccid bullae, oral erosions, Nikolsky +, intercellular IgG (desmoglein 3)." },
        { f: "Which drugs trigger bullous pemphigoid?",
          b: "DPP-4 inhibitors (gliptins), loop diuretics, checkpoint inhibitors, spironolactone." },
        { f: "What is first-line therapy for bullous pemphigoid?",
          b: "High-potency topical corticosteroids (clobetasol) — systemic steroids, doxycycline, or dupilumab for extensive disease." }
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
        { f: "DRESS vs SJS/TEN — timing and features?",
          b: "DRESS: 2–8 weeks, facial edema, eosinophilia, organ involvement (liver > kidney). SJS/TEN: 4–28 days, mucosal erosions, epidermal detachment." },
        { f: "What is the treatment of DRESS?",
          b: "Stop culprit drug, systemic glucocorticoids with a slow taper (≥ 6–8 weeks); monitor for late autoimmune thyroiditis/diabetes." },
        { f: "Which drugs commonly cause DRESS?",
          b: "Allopurinol, aromatic anticonvulsants (carbamazepine, phenytoin, lamotrigine), sulfonamides, vancomycin, minocycline, dapsone." }
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
        { f: "What are the Rotterdam criteria for PCOS?",
          b: "2 of 3: oligo/anovulation, clinical or biochemical hyperandrogenism, polycystic ovaries on ultrasound — after excluding mimics (TSH, prolactin, 17-OHP)." },
        { f: "PCOS treatment: not seeking vs seeking pregnancy?",
          b: "Not seeking: combined hormonal contraceptive (+ spironolactone for hirsutism) and lifestyle/metformin. Seeking: letrozole for ovulation induction." },
        { f: "What metabolic screening does PCOS require?",
          b: "2-hour OGTT (or A1c), lipid panel, BP, depression and OSA screening — PCOS confers insulin resistance and endometrial cancer risk." }
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
        { f: "How is postmenopausal bleeding evaluated?",
          b: "Transvaginal US or endometrial biopsy; endometrial thickness > 4 mm or persistent bleeding → biopsy (then hysteroscopy/D&C if nondiagnostic)." },
        { f: "What are the risk factors for endometrial cancer?",
          b: "Unopposed estrogen (obesity, anovulation/PCOS, estrogen-only HRT), tamoxifen, nulliparity, early menarche/late menopause, diabetes, Lynch syndrome." },
        { f: "Which hormone therapy is required for women with a uterus?",
          b: "Estrogen must be combined with a progestin to prevent endometrial hyperplasia and cancer." }
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
        { f: "First step for agitation in dementia?",
          b: "Search for unmet needs/triggers (pain, infection, constipation, retention, environment, medications) — then nonpharmacologic care." },
        { f: "What is the antipsychotic boxed warning in dementia?",
          b: "Increased all-cause mortality (cardiovascular, infection) in older adults with dementia-related psychosis — use lowest dose, shortest time, reassess." },
        { f: "Which cholinesterase inhibitors and NMDA antagonist treat Alzheimer disease?",
          b: "Donepezil and rivastigmine (mild–severe), galantamine (mild–moderate); bradycardia, GI effects; memantine for moderate–severe; anti-amyloid mAbs for early AD." }
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
        { f: "How are ARR and NNT calculated?",
          b: "ARR = control event rate − treatment event rate; NNT = 1/ARR (round up)." },
        { f: "How is relative risk reduction calculated?",
          b: "RRR = ARR / control event rate (= 1 − relative risk) — often looks larger than the absolute benefit." },
        { f: "How is number needed to harm calculated?",
          b: "NNH = 1 / (adverse event rate with treatment − rate with control)." }
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
        { f: "Must errors that cause no harm be disclosed?",
          b: "Yes — errors that reach the patient should be disclosed promptly with explanation and apology; near misses are reported to the safety system." },
        { f: "Key elements of error disclosure?",
          b: "Facts of what happened, consequences/implications, apology, what is being done for the patient, and how recurrence will be prevented." },
        { f: "What is root cause analysis?",
          b: "A structured, systems-focused review of an adverse event to identify latent system failures rather than individual blame (just culture)." }
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
        { f: "When is preoperative stress testing indicated?",
          b: "Elevated-risk surgery + poor or unknown functional capacity (< 4 METs) — and only if results would change management." },
        { f: "What are the Revised Cardiac Risk Index factors?",
          b: "High-risk surgery, ischemic heart disease, heart failure, cerebrovascular disease, insulin-treated diabetes, creatinine > 2 mg/dL." },
        { f: "What activities indicate ≥ 4 METs?",
          b: "Climbing 1–2 flights of stairs, walking up a hill, brisk walking (4 mph), heavy housework, golf, doubles tennis." }
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
        { f: "Classic acid-base pattern of salicylate toxicity?",
          b: "Mixed primary respiratory alkalosis (early) + anion gap metabolic acidosis; tinnitus, tachypnea, hyperthermia, AMS." },
        { f: "How is salicylate toxicity treated?",
          b: "Activated charcoal, IV sodium bicarbonate (urine pH 7.5–8.0), keep K⁺ normal, glucose for neuroglycopenia; avoid intubation if possible." },
        { f: "When is hemodialysis indicated in salicylate poisoning?",
          b: "Level > 100 mg/dL (> 90 with impaired kidneys), altered mental status, new hypoxemia/pulmonary edema, pH ≤ 7.20, or failure of standard therapy." }
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
        { f: "Heat stroke vs heat exhaustion?",
          b: "Heat stroke: core > 40 °C with CNS dysfunction (confusion, seizure, coma). Heat exhaustion: < 40 °C, intact mental status." },
        { f: "Best cooling method for exertional heat stroke?",
          b: "Cold-water immersion — goal < 39 °C within 30 min; evaporative cooling if immersion unavailable; no antipyretics." },
        { f: "Complications of heat stroke?",
          b: "Rhabdomyolysis, AKI, DIC, acute liver injury, hypoglycemia, ARDS, and electrolyte disturbances (hyperkalemia, hypocalcemia)." }
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
        { f: "AF + rheumatic mitral stenosis: which anticoagulant?", b: "Warfarin (INR 2–3), regardless of CHA₂DS₂-VASc. DOACs are inferior (INVICTUS trial)." },
        { f: "Two valve situations in which DOACs are NOT used for AF?", b: "Mechanical heart valve and moderate–severe rheumatic mitral stenosis. Use warfarin." },
        { f: "Classic exam findings of mitral stenosis?", b: "Opening snap followed by a low-pitched diastolic rumble at the apex; often AF and left atrial enlargement." }
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
        { f: "Who needs endocarditis prophylaxis before dental work?", b: "Prosthetic valve/repair material (incl. TAVR), prior IE, unrepaired cyanotic CHD (or certain repaired CHD), transplant valvulopathy." },
        { f: "Standard IE prophylaxis regimen?", b: "Amoxicillin 2 g orally, 30–60 min before. Penicillin allergy: azithromycin 500 mg or doxycycline 100 mg (not clindamycin)." },
        { f: "Do bicuspid valve, MVP, or GI/GU procedures warrant IE prophylaxis?", b: "No. Native valve disease without prior IE does not qualify, and GI/GU procedures never require it." }
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
        { f: "AAA size thresholds for elective repair?", b: "≥ 5.5 cm (men), ≥ 5.0 cm (women), growth ≥ 0.5 cm/year, or symptoms." },
        { f: "AAA ultrasound surveillance intervals by size?", b: "3.0–3.9 cm: every 3 years; 4.0–4.9 cm: every 12 months; 5.0–5.4 cm: every 6 months." },
        { f: "Most important modifiable factor for AAA growth/rupture?", b: "Smoking. Cessation is the key intervention, plus BP control and a statin." }
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
        { f: "HAPE treatment?", b: "Descend and give oxygen. If not possible: nifedipine or a portable hyperbaric chamber. Prevention in prior HAPE: nifedipine." },
        { f: "Acute mountain sickness vs HACE: treatment?", b: "AMS: acetazolamide (prevention/treatment), stop ascent. HACE (ataxia, confusion): descend + dexamethasone." },
        { f: "Mechanism of HAPE?", b: "Exaggerated, uneven hypoxic pulmonary vasoconstriction → high capillary pressure → non-cardiogenic edema." }
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
        { f: "Diagnostic criteria for obesity hypoventilation syndrome?", b: "BMI ≥ 30 + awake PaCO₂ above 45 mm Hg + no other cause of hypoventilation." },
        { f: "Screening clue for OHS in an obese patient?", b: "Serum bicarbonate ≥ 27 mEq/L (renal compensation for chronic hypercapnia). Confirm with ABG." },
        { f: "Treatment of OHS?", b: "PAP therapy (CPAP if severe OSA; otherwise NIV/bilevel) plus weight loss. Avoid sedatives and high-flow O₂ alone." }
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
        { f: "IgA nephropathy vs post-strep GN: timing and complement?", b: "IgAN: hematuria 1–3 days after URI, normal C3. PSGN: 1–3 weeks after pharyngitis, low C3." },
        { f: "Glomerulonephritides with LOW complement?", b: "Post-infectious GN, lupus nephritis, membranoproliferative GN (incl. cryoglobulinemia/HCV), endocarditis-associated GN." },
        { f: "Supportive treatment of IgA nephropathy with proteinuria?", b: "Maximally dosed ACE inhibitor or ARB + SGLT2 inhibitor; BP control." }
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
        { f: "Treatment of anti-GBM disease?", b: "Plasma exchange + high-dose glucocorticoids + cyclophosphamide, started urgently." },
        { f: "Immunofluorescence patterns in RPGN?", b: "Linear IgG: anti-GBM. Granular: immune complex (lupus, PSGN, IgA). Pauci-immune: ANCA vasculitis." },
        { f: "Target antigen in anti-GBM (Goodpasture) disease?", b: "α3 chain of type IV collagen (glomerular and alveolar basement membranes)." }
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
        { f: "Treatment of severe falciparum malaria?", b: "IV artesunate, then a full oral course (e.g., artemether–lumefantrine). Monitor for delayed hemolysis." },
        { f: "Features that make malaria 'severe'?", b: "Altered mental status, parasitemia ≥ 5%, severe anemia, AKI, hypoglycemia, acidosis, ARDS, shock, jaundice, bleeding." },
        { f: "Extra step for P. vivax or P. ovale malaria?", b: "Primaquine or tafenoquine to kill dormant liver hypnozoites; check G6PD first." }
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
        { f: "Highest-risk CMV serostatus combination in solid organ transplant?", b: "Donor positive / recipient negative (D+/R−). Disease often appears after prophylaxis stops." },
        { f: "How is CMV disease diagnosed in transplant recipients?", b: "Quantitative plasma CMV PCR; tissue biopsy for invasive disease. Serology is not useful." },
        { f: "Treatment of CMV disease after transplant?", b: "Valganciclovir (mild–moderate) or IV ganciclovir (severe) + reduce immunosuppression. Main toxicity: myelosuppression." }
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
        { f: "Pain/fever medicine in suspected dengue?", b: "Acetaminophen only. Avoid NSAIDs and aspirin (bleeding risk)." },
        { f: "Dengue warning signs of severe disease?", b: "Abdominal pain, persistent vomiting, fluid accumulation, mucosal bleeding, lethargy, hepatomegaly, rising Hct with falling platelets." },
        { f: "When is dengue most dangerous?", b: "Critical phase around defervescence (days 3–7) when plasma leakage can cause shock." }
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
        { f: "Fleischner: solitary solid nodule under 6 mm?", b: "Low risk: no routine follow-up. High risk: optional CT at 12 months." },
        { f: "Fleischner: solitary solid nodule 6–8 mm?", b: "CT at 6–12 months; if high risk, repeat at 18–24 months." },
        { f: "Solid nodule above 8 mm: options?", b: "CT at 3 months, PET-CT, or tissue sampling." }
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
        { f: "Colonoscopy schedule in Lynch syndrome (MLH1/MSH2)?", b: "Every 1–2 years starting at age 20–25 (or 2–5 years before the earliest family diagnosis)." },
        { f: "Genes and tumor marker in Lynch syndrome?", b: "Mismatch repair genes MLH1, MSH2, MSH6, PMS2 (and EPCAM); tumors are MSI-high." },
        { f: "Most common extracolonic cancer in Lynch syndrome?", b: "Endometrial cancer. Others: ovarian, gastric, small bowel, urothelial." }
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
        { f: "Emergency treatment of hyperviscosity syndrome?", b: "Plasmapheresis. Avoid RBC transfusion beforehand (raises viscosity)." },
        { f: "Waldenström macroglobulinemia hallmarks?", b: "IgM paraprotein, lymphoplasmacytic marrow infiltrate, MYD88 L265P; hyperviscosity, neuropathy, cryoglobulins." },
        { f: "Why give plasmapheresis before rituximab in very high IgM?", b: "Rituximab can cause a transient IgM flare that worsens hyperviscosity." }
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
        { f: "Triad of normal pressure hydrocephalus?", b: "Gait apraxia (magnetic gait, earliest), urinary incontinence, cognitive decline." },
        { f: "Next step after imaging suggests NPH?", b: "High-volume (30–50 mL) lumbar tap test with gait assessment before and after; improvement predicts shunt response." },
        { f: "Definitive treatment of NPH and which symptom improves most?", b: "Ventriculoperitoneal shunt; gait improves most, cognition least." }
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
        { f: "Typical MRI lesions of multiple sclerosis?", b: "Periventricular (Dawson fingers), juxtacortical/cortical, infratentorial, and spinal cord T2 lesions." },
        { f: "Treatment of an acute disabling MS relapse?", b: "IV methylprednisolone 1 g/day for 3–5 days (plasma exchange if refractory). Speeds recovery only." },
        { f: "How does NMOSD differ from MS?", b: "Aquaporin-4 IgG; severe/bilateral optic neuritis, longitudinally extensive myelitis ≥ 3 segments, area postrema syndrome." }
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
        { f: "Thunderclap headache with normal CT more than 6 hours after onset: next step?", b: "Lumbar puncture for xanthochromia and RBCs (or CT angiography)." },
        { f: "Sensitivity of noncontrast CT for SAH by timing?", b: "Near 100% within 6 hours of onset; falls significantly afterward." },
        { f: "Drug given to all patients with aneurysmal SAH?", b: "Oral nimodipine for 21 days (reduces delayed cerebral ischemia from vasospasm)." }
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
        { f: "Essential tremor vs Parkinson tremor?", b: "ET: bilateral action/postural, familial, improves with alcohol. PD: asymmetric rest tremor + bradykinesia + rigidity." },
        { f: "First-line drugs for essential tremor?", b: "Propranolol or primidone (primidone if asthma)." },
        { f: "Treatment of disabling, drug-refractory essential tremor?", b: "Deep brain stimulation (thalamic VIM) or MR-guided focused ultrasound thalamotomy." }
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
        { f: "NMS vs serotonin syndrome: key bedside distinction?", b: "NMS: lead-pipe rigidity, slow onset (days), normal reflexes. Serotonin syndrome: clonus/hyperreflexia, rapid onset (hours)." },
        { f: "Treatment of neuroleptic malignant syndrome?", b: "Stop the dopamine blocker, cooling, IV fluids, benzodiazepines; severe: dantrolene and/or bromocriptine." },
        { f: "Lab hallmark of NMS?", b: "Markedly elevated creatine kinase (rhabdomyolysis); also leukocytosis and low serum iron." }
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
        { f: "First-line treatment of generalized anxiety disorder?", b: "CBT and/or an SSRI (escitalopram, sertraline) or SNRI (venlafaxine, duloxetine). Buspirone is an alternative." },
        { f: "Duration criterion for GAD?", b: "Excessive worry on most days for at least 6 months, with ≥ 3 associated symptoms." },
        { f: "Why avoid long-term benzodiazepines in anxiety?", b: "Dependence, withdrawal, falls, cognitive impairment, and respiratory depression with opioids or alcohol." }
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
        { f: "Why avoid antidepressant monotherapy in bipolar disorder?", b: "It is ineffective for bipolar depression and can precipitate mania or rapid cycling." },
        { f: "Medications for bipolar depression?", b: "Quetiapine, lurasidone, cariprazine, lumateperone, olanzapine–fluoxetine; lithium/lamotrigine for maintenance." },
        { f: "Mania vs hypomania?", b: "Mania: ≥ 7 days or hospitalization, marked impairment or psychosis (bipolar I). Hypomania: ≥ 4 days, no marked impairment (bipolar II)." }
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
        { f: "Hallmark electrolyte of refeeding syndrome?", b: "Hypophosphatemia (also hypokalemia and hypomagnesemia), usually within 2–5 days of feeding." },
        { f: "Mechanism of refeeding syndrome?", b: "Carbohydrates → insulin → intracellular shift of phosphate, potassium, magnesium in a total-body-depleted patient." },
        { f: "How to prevent refeeding syndrome?", b: "Thiamine before feeding, start calories low and advance slowly, check and replace phosphate/K/Mg daily." }
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
        { f: "Classic appearance of basal cell carcinoma?", b: "Pearly, translucent papule with rolled borders and arborizing telangiectasias, ± central ulceration." },
        { f: "When is Mohs surgery preferred for skin cancer?", b: "High-risk sites (face 'mask area', hands, feet, genitals), recurrent or aggressive tumors, ill-defined borders." },
        { f: "Treatment for locally advanced/metastatic BCC?", b: "Hedgehog pathway inhibitors (vismodegib, sonidegib); cemiplimab after progression." }
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
        { f: "Screening before starting a TNF inhibitor or other biologic?", b: "Latent TB (IGRA/TST), hepatitis B (and C), ± HIV; update non-live vaccines." },
        { f: "Contraindications to TNF inhibitors?", b: "Active/untreated latent TB, active serious infection, NYHA III–IV heart failure, demyelinating disease (MS)." },
        { f: "Features of psoriatic arthritis?", b: "Dactylitis ('sausage digits'), enthesitis, DIP involvement, nail pitting/onycholysis; arthritis mutilans in severe cases." }
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
        { f: "Bedside test for a scaly annular rash?", b: "KOH prep of scale from the active border: branching septate hyphae = dermatophyte." },
        { f: "What is tinea incognito?", b: "Dermatophyte infection modified and spread by topical steroids, making it less typical-looking." },
        { f: "Which tinea infections need oral therapy?", b: "Tinea capitis, onychomycosis (confirm first), and extensive or refractory tinea corporis." }
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
        { f: "Pyoderma gangrenosum appearance?", b: "Rapidly enlarging painful ulcer with a violaceous, undermined border; often starts as a pustule after trauma." },
        { f: "Diseases associated with pyoderma gangrenosum?", b: "IBD (both UC and Crohn), inflammatory arthritis, hematologic disease (myeloma, MDS, leukemia)." },
        { f: "Why avoid debridement of pyoderma gangrenosum?", b: "Pathergy: trauma triggers ulcer enlargement. Treat with systemic steroids, cyclosporine, or TNF inhibitors." }
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
        { f: "Glucose targets in gestational diabetes?", b: "Fasting under 95, 1-hour postprandial under 140, or 2-hour under 120 mg/dL." },
        { f: "Preferred medication for GDM when diet fails?", b: "Insulin (does not cross the placenta). Metformin and glyburide cross the placenta and are second-line." },
        { f: "Postpartum follow-up after gestational diabetes?", b: "75-g OGTT at 4–12 weeks postpartum, then diabetes screening every 1–3 years for life." }
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
        { f: "Who needs a progestogen with menopausal estrogen?", b: "Any woman with an intact uterus (prevents endometrial hyperplasia and cancer)." },
        { f: "Window when benefits of menopausal HT outweigh risks?", b: "Age under 60 or within 10 years of menopause, without contraindications." },
        { f: "Nonhormonal treatments for hot flashes?", b: "Low-dose paroxetine, venlafaxine/other SSRIs/SNRIs, gabapentin, fezolinetant (NK3 antagonist), oxybutynin." }
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
        { f: "USPSTF cervical cancer screening by age?", b: "21–29: cytology every 3 years. 30–65: hrHPV every 5 years, co-test every 5 years, or cytology every 3 years." },
        { f: "When to stop cervical cancer screening?", b: "After 65 with adequate negative prior screening and no CIN2+ in 25 years, or after hysterectomy for benign disease." },
        { f: "Who continues cervical screening beyond usual limits?", b: "History of CIN2+ (for 25 years), HIV/immunosuppression, or in utero DES exposure." }
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
        { f: "Preferred antihypertensives in pregnancy?", b: "Labetalol, extended-release nifedipine, methyldopa. Avoid ACE inhibitors, ARBs, renin inhibitors, spironolactone." },
        { f: "BP target for chronic hypertension in pregnancy (CHAP trial)?", b: "Treat to below 140/90 mm Hg; reduces preeclampsia with severe features." },
        { f: "Aspirin for preeclampsia prevention?", b: "Low-dose aspirin 81 mg daily from 12–28 weeks (ideally before 16) until delivery for high-risk women (e.g., chronic HTN)." }
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
        { f: "Initial lab panel for suspected von Willebrand disease?", b: "VWF antigen, VWF activity (GPIbM or ristocetin cofactor), and factor VIII level." },
        { f: "Treatment of type 1 von Willebrand disease?", b: "Desmopressin (releases stored VWF), tranexamic acid; VWF concentrate for major bleeding." },
        { f: "Platelet-type vs coagulation-factor bleeding pattern?", b: "Platelet/VWF: mucosal bleeding, petechiae, immediate bleeding. Factor deficiency: hemarthrosis, deep muscle bleeds, delayed bleeding." }
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
        { f: "Medicare hospice eligibility?", b: "Two physicians certify prognosis ≤ 6 months if the disease runs its usual course; patient elects comfort-focused care." },
        { f: "Does hospice require DNR or cancer, or end at 6 months?", b: "No to all: DNR not required, any terminal illness qualifies, and patients can be recertified indefinitely." },
        { f: "Palliative care vs hospice?", b: "Palliative care: any stage, alongside curative treatment. Hospice: prognosis ≤ 6 months, comfort-focused." }
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
        { f: "Formulas for PPV and NPV?", b: "PPV = TP ÷ (TP + FP). NPV = TN ÷ (TN + FN). Both depend on prevalence." },
        { f: "How does prevalence affect PPV and NPV?", b: "Higher prevalence raises PPV and lowers NPV; lower prevalence does the reverse. Sensitivity/specificity do not change." },
        { f: "Formulas for likelihood ratios?", b: "LR+ = sensitivity ÷ (1 − specificity). LR− = (1 − sensitivity) ÷ specificity. Post-test odds = pretest odds × LR." }
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
