import fs from 'node:fs/promises';
import vm from 'node:vm';

const root = 'pitch';
const original = await fs.readFile(`${root}/index.html`, 'utf8');
const oldNotes = await fs.readFile(`${root}/SPEAKER_NOTES.md`, 'utf8');
await fs.mkdir('tmp/pitch-original', {recursive:true});
for (const name of ['index.html','notes.js','pitch.css','SPEAKER_NOTES.md','README.md','E-JUAN-Pitch.pdf']) {
  await fs.copyFile(`${root}/${name}`, `tmp/pitch-original/${name}`);
}
const census = 'https://rsso11.psa.gov.ph/content/2024-census-population-popcen-official-population-counts-city-davao';
const health = 'https://psa.gov.ph/sites/default/files/infographics/2025%20PNHA%20Infographics-signed.pdf';
const region = 'https://psa.gov.ph/classification/psgc/provinces/1100000000';
const demo = 'Actual prototype screens. Fictional data. Connected operations remain proposed.';
const assumption = 'Illustrative assumptions from the original concept. Pricing, costs and willingness to pay remain unvalidated.';
const slides = [];
function add(kind, tag, title, content, foot, script, sources, target=12) {
  slides.push({kind,tag,title,content,foot,script,sources,target});
}
function statements(items) {
  return `<div class="statement-list">${items.map(([title,body])=>`<div><h3>${title}</h3><p>${body}</p></div>`).join('')}</div>`;
}
function metric(value,label,body,extra='') {
  return `<div class="metric-content"><div><strong class="big-number">${value}</strong><p class="metric-label">${label}</p></div><div class="metric-explanation"><p>${body}</p>${extra}</div></div>`;
}
function screen(name,alt,items) {
  return `<div class="single-walkthrough"><button class="screen-image" data-screen="${name}" aria-label="Enlarge ${alt}"><img src="assets/${name}.png" alt="${alt}" width="800" height="1700"></button>${statements(items)}</div>`;
}
add('problem-opening blue-slide','PSITE XI IT Pitching Competition 2026','One health concern.<br><em>Several decisions.</em>',
  '<p class="problem-question">Where do I start?</p><p class="problem-support">A resident must work out the next step before reaching care.</p>',
  'Healthcare navigation in Davao City',
  'One health concern can lead to several decisions. Before someone reaches care, they have to work out where to start. We are focusing on this navigation problem in Davao City.', 'Original supplied problem narrative. Navigation friction is a hypothesis to validate.',10);
add('problem-focus','THE PROBLEM','Finding care.<br><em>Understanding coverage.</em>',
  statements([['Which provider should I see?','The resident needs an appropriate starting point and an available appointment.'],['What care can I use?','Covered services and sponsored visits have their own eligibility rules.']]),
  'Problem hypothesis. Resident interviews and workflow tests must establish the actual friction.',
  'Finding a provider is one decision. Understanding coverage is another. Public services already exist, but residents still need to understand which option fits and which program rules apply.', 'Original problem and product script. No measured access-friction claim.',10);
add('problem-focus','THE PROBLEM','A prescription leaves<br><em>another decision.</em>',
  '<p class="problem-question">Where can I find my medicine?</p><p class="problem-support">A resident still needs to locate a pharmacy and confirm availability before travelling.</p>',
  'Problem hypothesis. Current medicine listings in the prototype are fictional.',
  'The journey continues after the consultation. A prescription still leaves the resident looking for a pharmacy and checking whether the medicine is available. That is the final gap our proposed journey addresses.', 'Original medicine-navigation narrative.',10);
add('opening blue-slide','INTRODUCING E-JUAN','One concern.<br>A clearer path<br>to <em>care.</em>',
  '<p class="lead">Healthcare navigation and institutional care coordination.<br>Davao City first.</p><button class="screen-image hero-phone" data-screen="ask" aria-label="Enlarge Ask Juan prototype"><img src="assets/ask.png" alt="Actual Ask Juan starting screen" width="800" height="1700"></button><span class="phone-caption">ACTUAL PROTOTYPE / FICTIONAL DATA</span>',
  'ALAGANG ABOT-KAMAY',
  'E-JUAN proposes a guided journey from a concern to care and prescribed medicine. Residents get a clearer next step. Institutions get a proposed way to coordinate approved visits and spending. The screen comes from our actual prototype, with fictional data.', 'Original opening and actual renderAsk() screenshot.',12);
add('metric-slide','THE NEED / LOCAL SCALE','Davao City is<br><em>our starting point</em>',
  metric('1.85M','Davao City residents','A large local population gives us a focused place to test healthcare navigation.','<p class="metric-note">Exact 2024 census count: 1,848,947.<br>Population provides context, not an E-JUAN user forecast.</p>'),
  `<a href="${census}">PSA 2024 Census of Population</a>. Population as of 1 July 2024.`,
  'Davao City had 1,848,947 residents in the 2024 census. That gives us a clear local starting point. It does not mean all residents need or will use E-JUAN. Interviews and pilot participation must establish the actual audience.',census,12);
add('metric-slide','THE NEED / HEALTH SPENDING','Households carry<br><em>a substantial share</em>',
  metric('41.2%','of Philippine current health spending','Households paid this share out of pocket in 2025.','<p class="metric-note">Clear care and funding choices matter.<br>This is national spending context, not a Davao-specific rate.</p>'),
  `<a href="${health}">PSA 2025 Philippine National Health Account</a>. Share of current health expenditure.`,
  'Nationally, households paid 41.2 percent of current health spending out of pocket in 2025. This supports the importance of clear care and funding choices. It is a national spending measure, not the share of Davao residents paying or proof that our software reduces costs.',health,12);
add('metric-slide','THE OPPORTUNITY / POSSIBLE BUYERS','A regional prospect universe',
  metric('54','provincial, city and municipal LGUs','Potential institutional buyers in Davao Region.','<p class="metric-note">5 provinces + 6 cities + 43 municipalities.<br>Each buyer still needs a verified need, budget and purchasing authority.</p>'),
  `<a href="${region}">PSA Philippine Standard Geographic Code</a>. Possible prospects. No signed E-JUAN customers.`,
  'Davao Region has 54 provincial, city and municipal LGU organizations. That is a possible prospect universe, not 54 customers. We would qualify each sponsor by its program need, budget, purchasing authority and reason to renew. Davao City is our initial focus.',region,12);
add('metric-slide','COMMERCIAL FEASIBILITY / THE BUYER','An institution-funded<br><em>software license</em>',
  metric('₱10,000','proposed monthly license per institution','An LGU or healthcare program sponsor would pay for coordination.','<p class="metric-note">Clinical payments remain separate.<br>E-JUAN assumes a fixed license, with no percentage of professional fees.</p>'),
  assumption,
  'Our proposed buyer is an LGU or healthcare program sponsor. The original concept assumes a ten-thousand-peso monthly software license. Clinical payments remain separate. This is a proposed price to test with buyers, not a quotation, contract or established revenue.', 'Original concept financial assumptions.',14);
add('budget-slide','COMMERCIAL FEASIBILITY / ONE ILLUSTRATIVE MONTH','Care spending and software revenue',
  '<p class="section-intro">Assume 100 consultations at ₱500 each.</p><div class="budget-equation"><div><strong>₱50,000</strong><p>Clinical services</p><span>Paid separately to providers</span></div><b>+</b><div><strong>₱10,000</strong><p>E-JUAN software</p><span>Illustrated revenue before costs</span></div><b>=</b><div><strong>₱60,000</strong><p>Sponsor spending</p><span>Before additional charges</span></div></div>',
  assumption,
  'In an illustrative month, one hundred consultations at five hundred pesos cost fifty thousand pesos in clinical services. Add the ten-thousand-peso software license and the sponsor spends sixty thousand pesos. E-JUAN revenue is only the software license before costs.', 'Original assumptions. 100 × 500 = 50,000; 50,000 + 10,000 = 60,000. Prototype provider fees differ.',16);
add('metric-slide','COMMERCIAL FEASIBILITY / VALUE TO TEST','Software cost per visit',
  metric('₱100','per visit at 100 consultations per month','₱10,000 monthly license ÷ 100 consultations.','<p class="metric-note">A sponsor must see enough administrative value to justify this cost.<br>Delivery costs and profitability still need validation.</p>'),
  assumption,
  'At one hundred consultations, the assumed license adds one hundred pesos in software cost per visit. The commercial question is whether easier administration and reliable records justify that cost. We still need to validate delivery costs and profitability.', 'Derived from original concept assumptions: 10,000 / 100 = 100.',12);
add('journey-overview','THE PRODUCT JOURNEY','Five steps through care',
  '<div class="flat-journey">'+[['ASK','Describe the concern'],['MATCH','Compare care options'],['CHECK','Review funding'],['CONSULT','Meet a clinician'],['LOCATE','Find medicine']].map(([a,b],i)=>`<div><span>0${i+1}</span><h3>${a}</h3><p>${b}</p></div>`).join('')+'</div><p class="key-statement">An existing prescription can start directly at medicine search.</p>',
  demo,
  'The five steps are ask, match, check, consult and locate. The prototype demonstrates the experience. Actual care, sponsorship checks and stock confirmation require connected partners. Someone who already has a prescription can begin at medicine search.', 'Original product journey; actual prototype.',10);
add('single-screen','ASK / GUIDED INTAKE','A clearer starting point',
  screen('intake','Actual guided intake screen',[['Three short questions','Who needs care, how long it has lasted, and any warning signs.'],['Navigation without diagnosis','Urgent warning signs lead to separate urgent-care guidance.']]),
  'Actual local demonstration rules. No connected AI model or clinical decision service.',
  'Juan organizes the concern with three short questions: who needs care, duration and warning signs. This guides navigation. It does not diagnose. The current app uses local demonstration rules, with a separate urgent-care route for warning signs.', 'Actual renderIntake(); original script.',12);
add('single-screen','MATCH / CARE OPTIONS','Compare appropriate care options',
  screen('match','Actual care matches screen',[['Doctor and appointment choices','The prototype shows fictional providers and sample slots.'],['Public or covered care first','This intended ranking requires verified participating services.']]),
  'Fictional providers and availability. Connected public-first ranking remains proposed.',
  'The resident can compare doctors and sample appointment slots. In the intended connected service, available public or covered care comes first, followed by relevant participating providers. That ranking still needs real service information and partners.', 'Actual renderRecommendation(); original product script.',12);
add('single-screen','CHECK / FUNDING','Review the funding pathway',
  screen('check','Actual care and funding options screen',[['Standard or sponsored care','Sponsored visits require beneficiary, provider, service, allowance and budget checks.'],['A separate YAKAP pathway','PhilHealth membership alone does not approve an LGU-funded consultation.']]),
  'Fictional approval states. Institutional verification remains proposed.',
  'Funding follows its own rules. A sponsored consultation requires approval for the beneficiary, provider and service within visit and budget limits. YAKAP is a separate primary-care pathway. Membership alone does not approve an LGU-sponsored visit.', 'Actual renderCoverage(); original funding narrative. https://www.philhealth.gov.ph/yakap/',16);
add('single-screen','CONSULT / PATIENT CHOICE','Review details and choose consent',
  screen('review','Actual booking review and optional consent screen',[['Appointment details before confirmation','Review provider, time, mode, funding and sample total.'],['Optional intake sharing','The summary-sharing checkbox starts unchecked.']]),
  'Actual prototype behavior. No doctor is contacted, record transmitted or payment charged.',
  'Before confirming, the resident reviews appointment and funding details. Sharing the intake summary is optional. The actual checkbox begins unchecked. Current confirmation creates only a local sample booking, with no clinician contact or payment.', 'Actual renderReview(); consent unchecked by default.',12);
add('single-screen','CONSULT / CLINICAL AUTHORITY','The clinician makes<br><em>the clinical decisions</em>',
  screen('consult','Actual simulated consultation screen',[['Licensed clinician','Diagnosis and prescribing belong to the authorized care team.'],['Consultation preview today','The screen simulates a visit using fictional data.']]),
  'Simulated consultation. No live clinician, audio, video or medical advice.',
  'In the proposed service, a licensed clinician reviews the concern, diagnoses and prescribes. E-JUAN supports the journey. Today this screen is a simulated consultation, with no clinician or live call.', 'Actual renderConsult(); original clinical boundaries.',10);
add('single-screen','LOCATE / PRESCRIPTION','A prescription has a next step',
  screen('prescription','Actual fictional prescription wallet',[['Prescription wallet','The interface demonstrates how a resident could open a clinician-issued record.'],['Continue to medicine search','The example links a prescription to nearby sample listings.']]),
  'Fictional Paracetamol 500 mg record. Invalid for medical use or dispensing.',
  'The prescription wallet demonstrates a possible handoff from a clinician-issued record to medicine search. This example is fictional and invalid for medical use. A resident with an existing prescription can enter here directly.', 'Actual renderPrescription(); original medicine navigation.',10);
add('single-screen','LOCATE / PHARMACY CONFIRMATION','Confirm medicine before travelling',
  screen('locate','Actual fictional medicine listings',[['Compare the listings','Sample prices, distance, stock status and update age.'],['Confirm availability','A future pharmacy partner must verify stock before the resident travels.']]),
  'Fictional listings. No pharmacy inventory or confirmation service is connected.',
  'Medicine listings show sample prices, distances and stock confidence. A connected pharmacy partner would need to confirm availability before travel. A reported listing alone cannot guarantee current stock.', 'Actual renderPharmacies(); original pharmacy-confirmation proposal.',12);
add('sponsor-focus','INSTITUTIONAL VALUE','Accountable sponsored visits',
  statements([['Before the visit','Apply beneficiary rules and authorize the service within allowance and budget.'],['After the visit','Reconcile the completed consultation with its booking and approved payment.']])+'<p class="key-statement">Sponsor records cover eligibility, booking and spending.<br>Clinical access follows the patient’s consent and the care team’s role.</p>',
  'Proposed workflow. Sponsor dashboards, audit records and production access controls are not implemented.',
  'Sponsors would authorize eligible services before the visit and reconcile completed consultations with payments afterward. They need program records for eligibility, booking and spending. Clinical information follows patient consent and authorized care-team access.', 'Original institutional workflow and role boundaries.',14);
add('alternatives-slide','EXISTING ALTERNATIVES','A specific coordination focus',
  '<div class="alternative-columns"><div><h3>Existing care services</h3><p>NowServing and mWell offer digital care.<br>mWell already has LGU solutions.</p><p>YAKAP and Davao City CHO<br>provide public-care pathways.</p></div><div><h3>E-JUAN’s proposed focus</h3><p>Connect care choices to sponsor rules,<br>approved visits and spending records.</p><p>Add local medicine confirmation<br>through participating pharmacies.</p></div></div>',
  '<a href="https://nowserving.ph/">NowServing</a> · <a href="https://www.mwell.com.ph/lgu-community">mWell</a> · <a href="https://www.philhealth.gov.ph/yakap/">YAKAP</a> · <a href="https://davaocity.gov.ph/departments/social-services/city-health-office/">Davao CHO</a>. Incremental value remains to be tested.',
  'Existing platforms already provide digital care, and mWell already offers LGU solutions. Public pathways also exist. Our proposed focus is joining care choices with sponsor rules, service records and local medicine confirmation. A buyer must see added value over these alternatives and in-house systems.', 'https://nowserving.ph/\nhttps://www.mwell.com.ph/lgu-community\nhttps://www.philhealth.gov.ph/yakap/\nhttps://davaocity.gov.ph/departments/social-services/city-health-office/',16);
add('metric-slide','TECHNICAL FEASIBILITY / CURRENT PROTOTYPE','An experience we can test today',
  metric('23','screens in the local prototype','The interactive demo covers intake, bookings, consent and medicine discovery.','<p class="metric-note">Runs locally without a backend or account.<br>Connected operations and patient outcomes remain unproven.</p>'),
  'Actual repository interface. All records and service interactions are fictional.',
  'Our local prototype has twenty-three screens covering the journey. It runs without a backend or account and lets us test usability now. That establishes an interface we can explore, not a deployed clinical service or proven outcomes.', 'Repository README.md and app.js renderers.',10);
add('pilot-prerequisites','OPERATIONAL FEASIBILITY','What a connected pilot requires',
  statements([['Authorized partners','A healthcare provider, an institutional sponsor and participating pharmacies.'],['Verified operations','Identity, eligibility, appointments, secure handoff and service reconciliation.']])+'<p class="key-statement">Clinical, funding and data-protection arrangements precede live operations.</p>',
  'Proposed pilot requirements. No signed partners or production integrations.',
  'A connected pilot still needs authorized care, sponsor and pharmacy partners. Operations must verify identity, eligibility and availability and protect the clinical handoff. Clinical, funding and data-protection arrangements come before live service.', 'Original pilot conditions and product-status narrative.',14);
add('pilot-focus','PILOT / EVIDENCE BEFORE EXPANSION','A local test with clear measures',
  '<p class="section-intro">Synthetic usability testing, then an authorized Davao City pilot.</p><div class="measure-grid"><div><h3>Resident journey</h3><p>Navigation success<br>Reliable medicine confirmation</p></div><div><h3>Sponsor operations</h3><p>Staff minutes per booking<br>Completed visits reconciled</p></div></div><p class="key-statement">The commercial gate: a qualified sponsor willing to pay and renew.</p>',
  'Expand only after measurable benefit and a feasible institutional purchase. No measured pilot results yet.',
  'We begin with synthetic usability tests, then seek an authorized local pilot. We would measure navigation success, staff effort, visit reconciliation and medicine confirmation. Expansion depends on measurable benefit and a qualified sponsor willing to pay and renew.', 'Original pilot measures and growth gates.',14);
add('closing blue-slide','ONE CREDIBLE DAVAO CITY PILOT','A clearer path<br>to <em>care.</em>',
  '<div class="partner-ask"><p>One willing healthcare provider.</p><p>One authorized institutional sponsor.</p><p>Pharmacy partners.</p><span>To validate one credible local pilot.</span></div><p class="closing-line">ALAGANG ABOT-KAMAY</p><button class="screen-image closing-phone" data-screen="home" aria-label="Enlarge E-JUAN home"><img src="assets/home.png" alt="Actual E-JUAN home screen" width="800" height="1700"></button>',
  'Concept stage. No signed partners, live clinical integrations or proven institutional demand.',
  'We are seeking one willing healthcare provider, one authorized institutional sponsor and pharmacy partners to validate one credible local pilot. That test must show a clearer resident journey and value worth paying for. Thank you.', 'Original closing ask; actual renderHome() screenshot.',10);

slides[20].target = 14;
slides[22].target = 18;
if(slides.length!==24 || slides.reduce((s,n)=>s+n.target,0)!==300) throw Error('Slide count or timing mismatch');
const brand='<div class="brand-lockup"><div class="brand-symbol"><span></span><span></span></div><span>E-JUAN</span></div>';
const markup=slides.map((s,i)=>`      <section class="slide ${s.kind}" aria-labelledby="title-${i+1}"${i?' hidden':''}>
        <header>${i<3?`<span class="section-tag">${s.tag}</span>`:s.kind.includes('blue-slide')?`${brand}<span class="edition">${s.tag}</span>`:`<span class="section-tag">${s.tag}</span><span class="small-brand">E-JUAN</span>`}</header>
        <h${i===0||i===3?'1':'2'} id="title-${i+1}">${s.title}</h${i===0||i===3?'1':'2'}>
        ${s.content}
        <footer><span>${s.foot}</span><span>${String(i+1).padStart(2,'0')} / ${slides.length}</span></footer>
      </section>`).join('\n\n');
const start=original.indexOf('      <section');
const end=original.indexOf('    </div>\n  </main>',start);
let html=original.slice(0,start)+markup+'\n'+original.slice(end);
html=html.replace('13-slide','24-slide').replace('1 / 13','1 / 24');
await fs.writeFile(`${root}/index.html`,html);
const notes=slides.map((s,i)=>({slide:i+1,title:s.title.replace(/<br>/g,' ').replace(/<[^>]+>/g,''),presenter:i<7?'Presenter 1':i<20?'Presenter 2':'Presenter 3',target:s.target,script:s.script,emphasis:[s.title.replace(/<br>/g,' ').replace(/<[^>]+>/g,'')],sources:s.sources}));
await fs.writeFile(`${root}/notes.js`,'window.PITCH_NOTES = '+JSON.stringify(notes,null,2)+';\n');
const appendix=oldNotes.slice(oldNotes.indexOf('## Original supplied seven-slide script'));
await fs.writeFile(`${root}/SPEAKER_NOTES.md`,'# E-JUAN 24-slide speaker notes\n\nProblem first, then the product introduction, need, opportunity and feasibility. Three presenters. Rehearsal targets total 300 seconds.\n\n'+notes.map(n=>`## Slide ${n.slide} - ${n.title}\n\n${n.presenter} | Target ${n.target} seconds\n\n${n.script}\n\nSources and limits:\n${n.sources}\n`).join('\n')+'\n---\n\n'+appendix);
console.log('Updated 24 slides and notes; 300 seconds. Original files retained in tmp/pitch-original.');
