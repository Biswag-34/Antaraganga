const fs = require('node:fs');
const path = require('node:path');
const babel = require('next/dist/compiled/babel/core');
const parser = require('next/dist/compiled/babel/parser');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const root = path.resolve(__dirname, '..');
const base = 'http://localhost:3000';
function loadContent(relative) {
  const filename = path.join(root, relative);
  const js = babel.transformSync(fs.readFileSync(filename, 'utf8'), {
    filename, configFile: false, babelrc: false,
    presets: [require('next/dist/compiled/babel/preset-typescript')],
    plugins: [require('next/dist/compiled/babel/plugin-transform-modules-commonjs')],
  }).code;
  const module = { exports: {} };
  vm.runInNewContext(js, { module, exports: module.exports, require: createRequire(filename) }, { filename });
  return module.exports;
}
const { navigation, commitments, workStories, services, careSteps } = loadContent('content/site.ts');
const { programmes, enquiryUrl } = loadContent('content/programmes.ts');
const routes = ['/', '/hospital', '/care', '/work', '/network', '/health-card', '/funding', '/contact', '/privacy', '/terms', ...programmes.map(p => `/funding/${p.id}`)];
const rows = [];
const interactive = 'components/interactive.tsx';
const sections = 'components/sections.tsx';
function source(file, owner) {
  const text = fs.readFileSync(path.join(root, file), 'utf8');
  const lines = text.split(/\r?\n/);
  const index = lines.findIndex(line => line.includes(`function ${owner}(`) || line.includes(`function ${owner}({`));
  if (index < 0) throw new Error(`Missing source owner: ${file}:${owner}`);
  return `${file}:${index + 1} (${owner})`;
}
function add(page, section, label, kind, destination, behavior, condition, file, owner) {
  rows.push({ id: `C${String(rows.length + 1).padStart(4, '0')}`, page, section, label, kind, destination: destination || '', absolute_url: destination ? new URL(destination, base + (page === '*' || page.startsWith('[') ? '/' : page)).href : '', behavior: behavior || '', condition: condition || 'Always', source: source(file, owner) });
}
const link = (page, section, label, href, file, owner, condition = 'Always', kind = 'Link') => add(page, section, label, kind, href, kind === 'Download' ? 'Downloads the original DOCX; does not open a programme page.' : href.includes('/contact?') ? 'Opens contact with enquiry type and area of interest preselected.' : href.includes('#') || href.startsWith('#') ? 'Navigates or scrolls to the named section.' : 'Navigates to the destination.', condition, file, owner);
const action = (page, section, label, behavior, file, owner, condition = 'Always', kind = 'Button') => add(page, section, label, kind, '', behavior + ' No redirect.', condition, file, owner);
function arrows(page, section, label, behavior, owner, condition = 'Always') {
  for (const direction of ['Previous', 'Next']) action(page, section, `${direction} ${label}`, `${behavior}; ${direction.toLowerCase()} item, wrapping at the ends.`, interactive, owner, condition);
}
function faq(page, section, questions, file, owner) {
  questions.forEach(q => action(page, section, q, 'Expands/collapses this answer independently. First answer starts open.', file, owner, 'Always', 'Accordion summary'));
}
link('*', 'Accessibility', 'Skip to content', '#main', 'app/layout.tsx', 'RootLayout', 'Visible when keyboard-focused');
link('*', 'Header utility', 'Contact (phone icon and text)', '/contact', 'components/site/header.tsx', 'Header');
link('*', 'Header utility', 'Funding proposals (visible: Proposals)', '/funding#proposals', 'components/site/header.tsx', 'Header');
link('*', 'Header brand', 'Hospital logo / Antharagange Rural Hospital home', '/', 'components/site/header.tsx', 'Header');
for (const n of navigation) {
  link('*', 'Desktop main navigation', n.label, n.href, 'components/site/header.tsx', 'Header', 'Desktop navigation visible');
  n.children.forEach(c => link('*', `Desktop dropdown: ${n.label}`, c.label, c.href, 'components/site/header.tsx', 'Header', 'Parent menu hovered or keyboard-focused'));
}
link('*', 'Header CTA', 'Partner with Us', '/funding', 'components/site/header.tsx', 'Header', 'Header CTA visible at applicable viewport');
action('*', 'Mobile navigation', 'Open navigation', 'Opens mobile menu; URL stays unchanged.', 'components/site/header.tsx', 'Header', 'Mobile menu closed');
action('*', 'Mobile navigation', 'Close navigation', 'Closes mobile menu; URL stays unchanged. Escape also closes it.', 'components/site/header.tsx', 'Header', 'Mobile menu open');
for (const n of navigation) {
  link('*', 'Mobile menu', n.label, n.href, 'components/site/header.tsx', 'Header', 'Mobile menu open; selecting closes menu');
  n.children.forEach(c => link('*', `Mobile submenu: ${n.label}`, c.label, c.href, 'components/site/header.tsx', 'Header', 'Mobile menu open; selecting closes menu'));
}
link('*', 'Mobile menu', 'Partner with Us', '/funding', 'components/site/header.tsx', 'Header', 'Mobile menu open; selecting closes menu');
link('*', 'Mobile menu', 'Funding proposals — 15 programmes', '/funding#proposals', 'components/site/header.tsx', 'Header', 'Mobile menu open; selecting closes menu');
link('*', 'Mobile menu', 'Contact & Collaborate', '/contact', 'components/site/header.tsx', 'Header', 'Mobile menu open; selecting closes menu');
const footer = [
  ['Footer brand', 'Hospital logo', '/'],
  ['Footer hospital', 'Our Hospital', '/hospital'], ['Footer hospital', 'About us', '/hospital#purpose'],
  ['Footer care', 'Care & Services', '/care'], ['Footer care', 'Care overview', '/care'], ['Footer care', 'Health card', '/health-card'],
  ['Footer work', 'Our Work', '/work'], ['Footer work', 'Community programmes', '/work'], ['Footer work', 'Research & Training', enquiryUrl('Research, training and community initiatives', 'outreach')],
  ['Footer locations', 'Locations', '/network'], ['Footer locations', 'Kolar, Karnataka', '/network#campus'],
  ['Footer bottom', 'Privacy', '/privacy'], ['Footer bottom', 'Terms', '/terms'], ['Footer bottom', 'Contact', '/contact'],
];
footer.forEach(([section, label, href]) => link('*', section, label, href, 'components/site/footer.tsx', 'Footer'));
link('/', 'Hero', 'Discover our hospital', '/hospital', 'app/page.tsx', 'Home');
link('/', 'Hero', 'Explore our work', '/work', 'app/page.tsx', 'Home');
link('/', 'Funding proposal highlights', 'View all 15 funding proposals', '/funding#proposals', sections, 'FundingHighlights');
for (const id of ['dialysis', 'rehab', 'icu']) {
  const p = programmes.find(p => p.id === id);
  link('/', 'Funding proposal image card', p.title, `/funding/${id}`, sections, 'FundingHighlights');
}
for (const c of commitments) {
  action('/', 'Commitment rail', `${c.title} — ${c.description}`, `Selects ${c.title} and expands its matching image/caption.`, interactive, 'PurposeHome');
  action('/', 'Commitment image tile', c.title, `Selects ${c.title}; the photograph, caption and arrow are one button.`, interactive, 'PurposeHome');
  action('/', 'Commitment pagination dot', `Show ${c.title}`, `Selects ${c.title}.`, interactive, 'PurposeHome');
}
arrows('/', 'Commitment mobile carousel', 'commitment', 'Selects a commitment', 'PurposeHome', 'Mobile carousel navigation visible');
action('/', 'Commitment image mosaic', 'Swipe left / right', 'Changes selected commitment after horizontal movement greater than 50 pixels.', interactive, 'PurposeHome', 'Touch input', 'Touch gesture');
arrows('/', 'Community work carousel', 'story', 'Changes work story', 'WorkCarousel');
for (const s of workStories) {
  action('/', 'Community work selector', s.tab, `Shows ${s.title}.`, interactive, 'WorkCarousel');
  link('/', 'Community work slide arrow', `Explore ${s.title}`, '/work', interactive, 'WorkCarousel', `${s.title} story selected`);
}
action('/', 'Community work slide', 'Swipe left / right', 'Changes selected story after horizontal movement greater than 50 pixels.', interactive, 'WorkCarousel', 'Touch input', 'Touch gesture');
link('/', 'Care continuum', 'Explore care & services', '/care', sections, 'CareContinuum');
link('/', 'Partnership invitation card', 'Support a clinical programme', '/funding', sections, 'PartnershipInvite');
link('/', 'Partnership invitation card', 'Collaborate with our team', enquiryUrl('Research, training and community initiatives', 'outreach'), sections, 'PartnershipInvite');
link('/', 'Partnership invitation', 'Explore funding proposals', '/funding#proposals', sections, 'PartnershipInvite');
link('/hospital', 'Hero', 'Our hospital', '#purpose', 'app/hospital/page.tsx', 'Hospital');
link('/hospital', 'Hero', 'Our approach', '#approach', 'app/hospital/page.tsx', 'Hospital');
[['01 Our purpose', '#purpose'], ['02 Our approach', '#approach'], ['03 Our vision', '#vision'], ['04 Our people', '#people']].forEach(([label, href]) => link('/hospital', 'On this page navigation', label, href, 'app/hospital/page.tsx', 'Hospital'));
commitments.forEach(c => action('/hospital', 'Mission selector', c.title, `Updates mission image and description to ${c.title}.`, interactive, 'MissionExplorer'));
['Treat', 'Rehabilitate', 'Prevent', 'Support'].forEach(title => {
  action('/hospital', 'Approach selector', title, `Updates approach preview to ${title}.`, interactive, 'ApproachExplorer');
  link('/hospital', 'Approach preview arrow', `Explore ${title.toLowerCase()}`, '/care', interactive, 'ApproachExplorer', `${title} approach selected`);
});
link('/hospital', 'Our people', 'Speak with our team', enquiryUrl('Meet the hospital team', 'hospital'), sections, 'Leadership');
link('/hospital', 'Bottom CTA card', 'See our work', '/work', sections, 'DualCTA');
link('/hospital', 'Bottom CTA card', 'Speak with our team', '/contact', sections, 'DualCTA');
['Clinical care', 'Disability & rehabilitation', 'Community care'].forEach((title, i) => action('/care', 'Service category selector', title, `Selects the first matching service: ${services.find(s => s.group === i).title}.`, interactive, 'ServiceExplorer'));
services.forEach(s => {
  action('/care', 'Service list', s.title, `Updates service photo, description, features and enquiry destination to ${s.title}.`, interactive, 'ServiceExplorer');
  link('/care', 'Service panel CTA', 'Ask about this service', enquiryUrl(s.title, 'hospital'), interactive, 'ServiceExplorer', `${s.title} service selected`);
});
arrows('/care', 'Care journey', 'care step', 'Selects a care journey step', 'CareJourney');
careSteps.forEach((s, i) => action('/care', 'Care journey image/step card', `0${i + 1} ${s.title}`, `Selects ${s.title} and updates detail line. Image and text are one button.`, interactive, 'CareJourney'));
faq('/care', 'Caregiver support FAQ', ['What support can caregivers ask about?', 'How do I confirm service availability?'], sections, 'SupportFamily');
link('/care', 'Caregiver support', 'Learn more about caregiver support', enquiryUrl('Caregiver support', 'hospital'), sections, 'SupportFamily');
link('/care', 'Inclusive care invitation', 'Explore rehabilitation partnership', '/funding/rehab', sections, 'InclusiveCareInvite');
link('/care', 'Inclusive care invitation', 'View all funding proposals', '/funding#proposals', sections, 'InclusiveCareInvite');
['All programmes', ...workStories.map(s => s.tab)].forEach((label, i) => action('/work', 'Programme filter', label, `Shows ${workStories[Math.max(0, i - 1)].title}${i === 0 ? ' as the first story' : ''}.`, interactive, 'WorkCarousel'));
workStories.forEach(s => link('/work', 'Featured programme CTA', 'Explore the programme', enquiryUrl(s.enquiry, 'outreach'), interactive, 'WorkCarousel', `${s.title} story selected`));
arrows('/work', 'Featured programme carousel', 'story', 'Changes story and resets filter to All programmes', 'WorkCarousel');
action('/work', 'Featured programme slide', 'Swipe left / right', 'Changes selected story after horizontal movement greater than 50 pixels; does not reset filter.', interactive, 'WorkCarousel', 'Touch input', 'Touch gesture');
link('/work', 'First-aid feature', 'Explore first-aid training', enquiryUrl('First-aid training', 'outreach'), 'app/work/page.tsx', 'Work');
faq('/work', 'Programme focus accordion', ['Early detection', 'Prevention', 'Continuity'], 'app/work/page.tsx', 'Work');
link('/work', 'Bottom CTA', 'Discuss an outreach collaboration', enquiryUrl('Community programme', 'outreach'), 'app/work/page.tsx', 'Work');
['Hospital campus', 'Community outreach'].forEach(label => action('/network', 'Campus selector', label, `Changes image, description and CTA to ${label}.`, interactive, 'CampusExplorer'));
['Clinical care', 'Rehabilitation', 'Referral support'].forEach(label => link('/network', 'Campus care link', label, '/care', interactive, 'CampusExplorer', 'Shown in both campus and outreach views'));
link('/network', 'Campus view CTA', 'Contact the hospital team', enquiryUrl('Hospital visit', 'hospital'), interactive, 'CampusExplorer', 'Hospital campus selected');
link('/network', 'Outreach view CTA', 'See our community work', '/work', interactive, 'CampusExplorer', 'Community outreach selected');
['Campus', 'Community', 'Follow-up'].forEach(label => action('/network', 'Care connections image card', label, `Sets the pressed/selected styling to ${label}; does not reveal another page.`, interactive, 'ReachExplorer'));
link('/network', 'Conversation image card', 'For a hospital visit', enquiryUrl('Hospital visit', 'hospital'), sections, 'ConversationLinks');
link('/network', 'Conversation image card', 'For a community programme', enquiryUrl('Community programme', 'outreach'), sections, 'ConversationLinks');
action('/health-card', 'Sample health-card image', 'Show back of sample health card', 'Flips sample card to back artwork.', interactive, 'HealthCard', 'Front displayed');
action('/health-card', 'Sample health-card image', 'Show front of sample health card', 'Flips sample card to front artwork.', interactive, 'HealthCard', 'Back displayed');
action('/health-card', 'Card flip control', 'Turn the card', 'Toggles sample card between front and back.', interactive, 'HealthCard');
['Register', 'Identify', 'Print', 'Use at care points'].forEach((label, i) => action('/health-card', 'Process step', `${i + 1} ${label}`, `Selects ${label} and updates workflow content.`, interactive, 'CardProcess'));
['At the clinic or camp', 'Central batch printing'].forEach(label => action('/health-card', 'Printing mode accordion', label, 'Expands/collapses this printing explanation. Clinic/camp starts open.', interactive, 'CardProcess', 'Print step selected', 'Accordion summary'));
faq('/health-card', 'Common questions', ['Does a card guarantee treatment benefits?', 'How do I ask about enrolment?'], 'app/health-card/page.tsx', 'HealthCardPage');
link('/health-card', 'Health-card CTA', 'Ask about the health-card initiative', enquiryUrl('Health-card initiative', 'hospital'), 'app/health-card/page.tsx', 'HealthCardPage');
link('/health-card', 'Care network CTA', 'View the care network', '/network', 'app/health-card/page.tsx', 'HealthCardPage');
link('/funding', 'Hero', 'Discuss a partnership', enquiryUrl('Institutional partnership'), 'app/funding/page.tsx', 'Funding');
link('/funding', 'Hero', 'View all 15 funding proposals', '#proposals', 'app/funding/page.tsx', 'Funding');
link('/funding', 'Hero', 'Explore areas of need', '#needs', 'app/funding/page.tsx', 'Funding');
arrows('/funding', 'Areas of need carousel', 'area of need', 'Changes selected need and programme brief destination', 'FundingExplorer');
['Critical care', 'Diagnostics', 'Rehabilitation', 'Hospital systems'].forEach((label, i) => {
  const id = ['icu', 'lab', 'rehab', 'it'][i];
  action('/funding', 'Need category selector', label, `Shows ${programmes.find(p => p.id === id).title}.`, interactive, 'FundingExplorer');
  link('/funding', 'Need feature CTA', 'Read the programme brief', `/funding/${id}`, interactive, 'FundingExplorer', `${label} selected`);
});
['All proposals', 'Critical care', 'Diagnostics', 'Rehabilitation', 'Hospital systems'].forEach(label => action('/funding', 'Proposal category filter', label, label === 'All proposals' ? 'Shows all 15 funding proposals.' : `Shows proposals in ${label}.`, interactive, 'ProposalDirectory'));
for (const p of programmes) {
  const condition = `Visible initially with All proposals selected, or with ${p.category} filter selected`;
  link('/funding', 'Proposal directory thumbnail', p.title, `/funding/${p.id}`, interactive, 'ProposalDirectory', condition + '; pointer-clickable despite aria-hidden and tabIndex=-1');
  link('/funding', 'Proposal directory title', p.title, `/funding/${p.id}`, interactive, 'ProposalDirectory', condition);
  link('/funding', 'Proposal directory download', `Download ${p.title} proposal DOCX (visible: Download proposal (DOCX))`, `/media/support/${p.source_document}`, interactive, 'ProposalDirectory', condition, 'Download');
  link('/funding', 'Proposal directory arrow', `Read ${p.title} programme`, `/funding/${p.id}`, interactive, 'ProposalDirectory', condition);
}
['Define the scope', 'Review procurement', 'Equip & train', 'Report utilisation'].forEach((label, i) => action('/funding', 'Partnership path step', `${i + 1} ${label}`, 'Selects the step and updates the descriptive line.', interactive, 'PartnershipPath'));
['Proposals', 'Institutional documents', 'Reporting framework'].forEach(label => action('/funding', 'Document category selector', label, `Shows ${label} content.`, interactive, 'DocumentExplorer'));
link('/funding', 'Documents: proposals', 'Download dialysis DOCX', '/media/support/documents/dialysis.docx', interactive, 'DocumentExplorer', 'Proposals selected', 'Download');
link('/funding', 'Documents: proposals', 'Explore all proposals', '#proposals', interactive, 'DocumentExplorer', 'Proposals selected; scrolls to directory and retains the selected filter');
['Institutional documents', 'Reporting framework'].forEach(label => link('/funding', `Documents: ${label}`, 'Request information', enquiryUrl(label), interactive, 'DocumentExplorer', `${label} selected`));
link('/funding', 'Bottom CTA', 'Discuss partnership opportunities', enquiryUrl('Institutional partnership'), 'app/funding/page.tsx', 'Funding');
const contactFile = 'components/contact-form.tsx';
['Hospital enquiry', 'CSR partnership', 'Outreach collaboration'].forEach(label => action('/contact', 'Enquiry type selector', label, 'Changes enquiry type and applicable fields; clears draft-saved status; URL stays unchanged.', contactFile, 'ContactForm'));
const fields = [
  ['Organisation', 'organisation', 'Text input', 'CSR partnership or Outreach collaboration; Your details step'],
  ['Your name', 'name', 'Text input', 'Hospital enquiry; Your details step'],
  ['Contact person', 'name', 'Text input', 'CSR partnership or Outreach collaboration; Your details step'],
  ['Email', 'email', 'Email input', 'Hospital enquiry; Your details step'],
  ['Work email', 'email', 'Email input', 'CSR partnership or Outreach collaboration; Your details step'],
  ['Area of interest', 'interest', 'Select', 'Your details step'],
  ['What would you like to discuss?', 'message', 'Textarea', 'Your details step'],
];
fields.forEach(([label, name, kind, condition]) => {
  action('/contact', 'Enquiry form field', label, `Focuses/edits ${name}; ${kind === 'Select' ? 'opens the area-of-interest choices' : 'stores value in page memory'}.`, contactFile, 'ContactForm', condition, kind);
  action('/contact', 'Enquiry form label', label, `Clicking the associated label focuses ${name}.`, contactFile, 'ContactForm', condition, 'Form label');
});
const standardInterests = ['General enquiry', ...programmes.map(p => p.title), 'Hospital visit', 'Health-card initiative', 'Community health camps', 'First-aid training', 'Institutional documents', 'Reporting framework'];
standardInterests.forEach(label => action('/contact', 'Area of interest option', label, `Sets area of interest to ${label}.`, contactFile, 'ContactForm', 'Your details step; select menu open', 'Select option'));
const extraInterests = [...new Set(rows.filter(r => r.destination.startsWith('/contact?')).map(r => new URL(r.absolute_url).searchParams.get('interest')))].filter(s => !standardInterests.includes(s));
extraInterests.forEach(label => action('/contact', 'Contextual area of interest option', label, `Sets area of interest to ${label}.`, contactFile, 'ContactForm', `Only when seeded by interest=${encodeURIComponent(label)}; retained while selected`, 'Select option'));
action('/contact', 'Contextual area of interest option', 'Any custom interest supplied in the URL', 'Displays the current interest value as an additional selectable option, deduplicated against built-in choices. There are unbounded possible text values.', contactFile, 'ContactForm', 'Nonempty custom interest query parameter', 'Select option');
action('/contact', 'Form submit', 'Review enquiry', 'Runs native required/email/message validation; if valid, advances to Review and focuses heading. No enquiry is transmitted.', contactFile, 'ContactForm', 'Your details step');
action('/contact', 'Review action', 'Edit details', 'Returns to Your details with values retained and focuses heading.', contactFile, 'ContactForm', 'Review step');
add('/contact', 'Review action', 'Save enquiry draft', 'Generated text download', '', 'Creates a temporary blob: URL and downloads antharagange-enquiry-draft.txt. No stable redirect URL and no enquiry transmission.', 'Review step', contactFile, 'ContactForm');
link('/contact', 'Context card', 'Funding proposals', '/funding#proposals', 'app/contact/page.tsx', 'Contact');
link('/contact', 'Context card', 'Institutional documents', enquiryUrl('Institutional documents'), 'app/contact/page.tsx', 'Contact');
link('/contact', 'Context card', 'Site visit enquiry', '#visit', 'app/contact/page.tsx', 'Contact');
link('/contact', 'Visit and connect', 'Prepare a hospital enquiry', enquiryUrl('Hospital visit', 'hospital'), 'app/contact/page.tsx', 'Contact');
link('/contact', 'Visit and connect', 'Explore locations', '/network', 'app/contact/page.tsx', 'Contact');
faq('/contact', 'Common questions', ['Can I enquire about a programme?', 'How do I ask about visiting the hospital?'], 'app/contact/page.tsx', 'Contact');
const programmeFile = 'app/funding/[programme]/page.tsx';
for (const p of programmes) {
  const page = `/funding/${p.id}`;
  const doc = `/media/support/${p.source_document}`;
  link(page, 'Hero breadcrumb', 'CSR Partnerships', '/funding', programmeFile, 'ProgrammePage');
  link(page, 'Hero CTA', 'Partner with this programme', enquiryUrl(p.title), programmeFile, 'ProgrammePage');
  link(page, 'Hero download', 'Download proposal', doc, programmeFile, 'ProgrammePage', 'Always', 'Download');
  [['The need', '#need'], ['Proposed service', '#service'], ['Funding scope', '#scope'], ['Accountability', '#accountability']].forEach(([label, href]) => link(page, 'Programme section navigation', label, href, programmeFile, 'ProgrammePage'));
  link(page, 'Section navigation download', 'Download proposal', doc, programmeFile, 'ProgrammePage', 'Always', 'Download');
  p.scope.forEach((label, i) => {
    action(page, 'Service image numbered hotspot', `Explore ${label} (marker ${i + 1})`, `Selects scope item ${i + 1} and updates image explanation.`, interactive, 'ProgrammeScope');
    action(page, 'Service scope legend button', `${i + 1} ${label}`, `Selects scope item ${i + 1} and updates image explanation.`, interactive, 'ProgrammeScope');
  });
  link(page, 'Funding scope download', 'Download itemised proposal (DOCX)', doc, programmeFile, 'ProgrammePage', 'Always', 'Download');
  ['Procurement records', 'Commissioning record', 'Utilisation reporting'].forEach(label => {
    action(page, 'Accountability selector', label, `Updates accountability content to ${label}.`, interactive, 'Accountability');
    link(page, 'Accountability CTA', 'Discuss reporting', enquiryUrl(label), interactive, 'Accountability', `${label} selected`);
  });
  link(page, 'Bottom CTA', 'Request a programme discussion', enquiryUrl(p.title), programmeFile, 'ProgrammePage');
  link(page, 'Bottom CTA', 'View related care programmes', '/funding#proposals', programmeFile, 'ProgrammePage');
}
// These three contextual interest values originate in programme pages added after the form above.
for (const label of ['Procurement records', 'Commissioning record', 'Utilisation reporting']) action('/contact', 'Contextual area of interest option', label, `Sets area of interest to ${label}.`, contactFile, 'ContactForm', `Only when seeded by interest=${encodeURIComponent(label)}; retained while selected`, 'Select option');
link('[404 page]', 'Recovery CTA', 'Back to home', '/', 'app/not-found.tsx', 'NotFound');
link('[404 page]', 'Recovery CTA', 'Explore programmes', '/funding', 'app/not-found.tsx', 'NotFound');
action('[Error state]', 'Recovery action', 'Try again', 'Calls Next.js reset() to retry rendering the current route.', 'app/error.tsx', 'Error');
// Each executable source site must belong to an explicitly inventoried component.
const coveredOwners = new Set(rows.map(r => r.source.match(/\(([^)]+)\)$/)[1]));
['Button', 'Selector', 'CarouselControls', 'FAQ', 'LandscapeCTA'].forEach(n => coveredOwners.add(n));
const files = [];
function walk(dir) { for (const e of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) { const p = `${dir}/${e.name}`; if (e.isDirectory()) walk(p); else if (/\.tsx$/.test(p)) files.push(p); } }
walk('app'); walk('components');
const sites = [];
for (const file of files) {
  const ast = parser.parse(fs.readFileSync(path.join(root, file), 'utf8'), { sourceType: 'module', plugins: ['typescript', 'jsx'] });
  function visit(n, owner = '(module)') {
    if (n.type === 'FunctionDeclaration' && n.id) owner = n.id.name;
    if (n.type === 'JSXOpeningElement') {
      const tag = n.name.name;
      const events = n.attributes.filter(a => a.type === 'JSXAttribute' && /^(onClick|onChange|onSubmit|onTouchStart|onTouchEnd)$/.test(a.name.name)).map(a => a.name.name);
      if (['a', 'Link', 'Button', 'button', 'summary', 'input', 'select', 'textarea', 'label', 'option'].includes(tag) || events.length) {
        sites.push({ file, line: n.loc.start.line, owner, tag, events, covered: coveredOwners.has(owner) });
      }
    }
    for (const value of Object.values(n)) {
      if (Array.isArray(value)) value.forEach(c => { if (c && typeof c.type === 'string') visit(c, owner); });
      else if (value && typeof value.type === 'string') visit(value, owner);
    }
  }
  visit(ast);
}
const uncovered = sites.filter(s => !s.covered);
if (uncovered.length) throw new Error('Unmapped interaction source sites: ' + JSON.stringify(uncovered));
const esc = s => String(s ?? '').replaceAll('|', '\\|').replaceAll('\n', '<br>');
const mdLink = r => r.absolute_url ? `[${esc(r.destination)}](${r.absolute_url})` : '—';
let md = `# Complete clickable-object inventory\n\nAudited 23 October 2026 against the current local project. Base URL: ${base}.\n\nCovers all ${routes.length} normal routes (including all 15 programme pages), shared desktop/mobile navigation, conditional controls, 404 recovery and error recovery. Each table row identifies a control or one of its conditional labels/destinations; row totals are catalogue entries, not a count of simultaneously visible controls.\n\nShared elements are listed once below and apply to every route, including recovery pages. Separate image, title, download and arrow targets are listed separately. Arrows/icons inside the same anchor/button are part of that one target. Links here use the running server on port 3000.\n\nA dash in Destination means the object has no redirect; see its action. Downloads are marked explicitly. This inventory describes implementation, not proposed future behavior. Native browser chrome and development tooling are outside the website inventory.\n\n`;
function table(title, entries) {
  md += `## ${title}\n\n| ID | Location | Clickable object / accessible label | Type | Destination | Action / behavior | Visibility / state | Source |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n`;
  for (const r of entries) md += `| ${r.id} | ${esc(r.section)} | ${esc(r.label)} | ${esc(r.kind)} | ${mdLink(r)} | ${esc(r.behavior)} | ${esc(r.condition)} | ${esc(r.source)} |\n`;
  md += '\n';
}
table('Shared elements — every page', rows.filter(r => r.page === '*'));
for (const route of routes) {
  const entries = rows.filter(r => r.page === route);
  if (entries.length) table(`${route} — ${programmes.find(p => `/funding/${p.id}` === route)?.title || ({ '/': 'Home', '/hospital': 'Our Hospital', '/care': 'Care & Services', '/work': 'Our Work', '/network': 'Locations & Outreach', '/health-card': 'Health-Card Initiative', '/funding': 'Partnerships', '/contact': 'Contact & Collaborate' }[route] || route)}`, entries);
  else md += `## ${route}\n\nOnly the shared elements above are clickable; this page adds no links, buttons or form controls.\n\n`;
}
table('404 page — invalid routes and unknown programmes', rows.filter(r => r.page === '[404 page]'));
table('Error state — current route failed to render', rows.filter(r => r.page === '[Error state]'));
md += `## Behavior details that affect destinations\n\n- Contact URLs preselect type and interest. Plain /contact defaults to CSR partnership. Changing the type using the form selector does not update the URL.\n- The contact form validates, reviews, edits and downloads a text draft; it has no send endpoint. The generated blob: download URL is temporary and cannot be listed as a stable redirect.\n- The contact sidebar's Institutional documents link currently points to /funding#proposals, which is the proposal directory.\n- Explore all proposals in the document panel scrolls to #proposals; Explore all 15 proposals is the separate expansion button.\n- Programme category text in the breadcrumb, the contact step indicators, service features, organisation blocks, health-card responsibility cards and standalone decorative photographs/icons have no click handlers or enclosing links. Their linked counterparts are listed above.\n- The 15 proposal thumbnails remain pointer-clickable even though they use aria-hidden and tabIndex=-1. They are included individually.\n- Native form labels focus their associated controls; native select options change values. Both are included. A custom interest URL can introduce arbitrary additional option text, represented by the explicit custom-interest row.\n- Touch swipe regions are included in addition to clickable targets. Selection buttons may only update content or selected styling; no destination has been invented for them.\n\n## Scope and source audit\n\n- ${rows.length} catalogue entries, including alternate states, destinations, native options and gestures.\n- ${sites.length} JSX interaction sites inspected across ${files.length} app/component TSX files; every interaction site maps to an inventoried component or shared control primitive.\n- Source references identify the owning function's start line.\n- CSV expands the shared elements onto each normal route and each recovery template so page-by-page filtering includes navigation and footer links.\n- Live route, anchor and document validation is recorded in clickable-inventory-validation.json after verification.\n`;
md = md.replace("The contact sidebar's Institutional documents link currently points to /funding#proposals, which is the proposal directory.", 'The contact sidebar links directly to funding proposals; Institutional documents opens the relevant preselected enquiry.');
md = md.replace('Explore all proposals in the document panel scrolls to #proposals; Explore all 15 proposals is the separate expansion button.', 'All 15 proposals are visible initially. Category filters narrow the directory. Explore all proposals in the document panel scrolls to #proposals and retains the selected filter.');
fs.writeFileSync(path.join(root, 'docs/clickable-inventory.md'), md);
const expanded = rows.flatMap(r => r.page === '*' ? [...routes, '[404 page]', '[Error state]'].map(page => ({ ...r, page, absolute_url: r.destination.startsWith('#') ? (page.startsWith('[') ? '(current route)' + r.destination : new URL(r.destination, base + page).href) : r.absolute_url })) : [r]);
const columns = Object.keys(rows[0]);
const quote = s => '"' + String(s ?? '').replaceAll('"', '""') + '"';
fs.writeFileSync(path.join(root, 'docs/clickable-inventory.csv'), '\uFEFF' + [columns.map(quote).join(','), ...expanded.map(r => columns.map(c => quote(r[c])).join(','))].join('\r\n') + '\r\n');
fs.writeFileSync(path.join(root, 'docs/clickable-inventory-data.json'), JSON.stringify({ base, routes, rows, sourceSites: sites }, null, 2) + '\n');
console.log(JSON.stringify({ catalogueEntries: rows.length, expandedCsvRows: expanded.length, routes: routes.length, sourceSites: sites.length, sourceFiles: files.length, uncoveredSites: uncovered.length }, null, 2));
if (process.argv.includes('--verify')) {
  const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
  const normal = s => decode(s).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
  const attr = (s, key) => decode(s.match(new RegExp(`\\b${key}="([^"]*)"`))?.[1] || '');
  const strip = s => decode(s.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
  async function verify() {
    const report = { base, routes: [], documents: [], linksChecked: 0, controlsChecked: 0, failures: [], sourceSites: sites.length, sourceSitesWithoutInventoriedOwner: uncovered.length, conditionalStates: 'Audited against component source; live HTML check covers server-rendered initial states.' };
    const previousReportPath = path.join(root, 'docs/clickable-inventory-validation.json');
    if (fs.existsSync(previousReportPath)) {
      const previous = JSON.parse(fs.readFileSync(previousReportPath, 'utf8'));
      if (previous.failures.length) report.previousRunFailures = previous.failures;
    }
    const htmlByRoute = new Map();
    // Bound concurrency to avoid overwhelming first-time development compilation.
    let next = 0;
    async function worker() {
      while (next < routes.length) {
        const route = routes[next++];
        try {
          const res = await fetch(base + route, { signal: AbortSignal.timeout(60000) });
          const html = (await res.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '');
          htmlByRoute.set(route, html);
          report.routes.push({ route, status: res.status });
          if (res.status !== 200) report.failures.push(`${route}: HTTP ${res.status}`);
          console.log(`Checked ${route}: ${res.status}`);
        } catch (error) { report.failures.push(`${route}: ${error.message}`); }
      }
    }
    await Promise.all([worker(), worker(), worker()]);
    for (const [route, html] of htmlByRoute) {
      const entries = rows.filter(r => r.page === '*' || r.page === route);
      for (const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
        const href = attr(m[1], 'href');
        if (!href) continue;
        report.linksChecked++;
        const url = new URL(href, base + route);
        if (!entries.some(r => r.destination && new URL(r.destination, base + route).href === url.href)) report.failures.push(`Unlisted live link: ${route} → ${href} (${strip(m[2])})`);
        if (url.hash && url.origin === base) {
          const targetHtml = htmlByRoute.get(url.pathname);
          const id = decodeURIComponent(url.hash.slice(1));
          if (targetHtml && !targetHtml.includes(`id="${id}"`)) report.failures.push(`Broken anchor: ${route} → ${url.pathname}${url.hash}`);
        }
      }
      for (const m of html.matchAll(/<(button|summary|label|option)\b([^>]*)>([\s\S]*?)<\/\1>/g)) {
        const name = attr(m[2], 'aria-label') || strip(m[3]);
        if (!name) continue;
        report.controlsChecked++;
        const n = normal(name);
        if (!entries.some(r => { const rn = normal(r.label); return rn && (n.startsWith(rn) || rn.startsWith(n)); })) report.failures.push(`Unlisted live ${m[1]}: ${route}: ${name}`);
      }
      for (const m of html.matchAll(/<(input|select|textarea)\b([^>]*)>/g)) {
        report.controlsChecked++;
        const name = attr(m[2], 'name');
        if (!['organisation', 'name', 'email', 'interest', 'message'].includes(name) || route !== '/contact') report.failures.push(`Unlisted live field: ${route}: ${name}`);
      }
    }
    for (const p of programmes) {
      const url = `/media/support/${p.source_document}`;
      try {
        const res = await fetch(base + url, { signal: AbortSignal.timeout(15000) });
        const bytes = new Uint8Array(await res.arrayBuffer());
        const valid = res.status === 200 && bytes.length > 1000 && bytes[0] === 80 && bytes[1] === 75;
        report.documents.push({ url, status: res.status, validDocx: valid });
        if (!valid) report.failures.push(`Invalid document: ${url}`);
      } catch (error) { report.failures.push(`${url}: ${error.message}`); }
    }
    for (const route of ['/not-a-page', '/funding/not-a-programme']) {
      try {
        const res = await fetch(base + route, { signal: AbortSignal.timeout(30000) });
        report.routes.push({ route, status: res.status, expected: 404 });
        if (res.status !== 404) report.failures.push(`${route}: expected 404, received ${res.status}`);
      } catch (error) { report.failures.push(`${route}: ${error.message}`); }
    }
    const knownDestinations = new Set(routes);
    for (const r of rows.filter(r => r.destination)) {
      const url = new URL(r.absolute_url);
      if (url.origin === base && !url.pathname.startsWith('/media/') && !knownDestinations.has(url.pathname)) report.failures.push(`Unknown inventoried destination: ${r.id} ${r.destination}`);
    }
    report.completedAt = new Date().toISOString();
    fs.writeFileSync(path.join(root, 'docs/clickable-inventory-validation.json'), JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify({ normalRoutes: htmlByRoute.size, linksChecked: report.linksChecked, controlsChecked: report.controlsChecked, documentsChecked: report.documents.length, failures: report.failures }, null, 2));
    if (report.failures.length) process.exitCode = 1;
  }
  verify().catch(error => { console.error(error); process.exitCode = 1; });
}
