export const careerGroups = [
  {
    title: 'Nursing & patient care',
    icon: 'heart',
    roles: [
      'Nursing Superintendent',
      'Cardiology Nurses',
      'Senior OT Nurse',
      'Junior OT Nurses',
      'ICU Nurses',
      'Ward Nurses',
      'OPD Nurses',
      'Emergency & Casualty Nurses',
      'Nursing Assistants',
    ],
  },
  {
    title: 'Diagnostics & allied health',
    icon: 'microscope',
    roles: [
      'OT / Anaesthesia Technicians',
      'Dialysis Technicians',
      'Diagnostic Technicians',
      'Radiology Technicians',
      'CT Scan Technicians',
      'X-ray Technicians',
      'Physiotherapists',
    ],
  },
  {
    title: 'Administration & support',
    icon: 'briefcase-business',
    roles: [
      'HR Manager',
      'Billing Manager / Executives',
      'Hospital Operations Manager',
      'Front Office Executives',
      'MRD (Medical Records Department) Executives',
      'Maintenance / Facility Technicians',
      'Hospital Attendants (Group D)',
      'Housekeeping Staff / Sweepers',
    ],
  },
];

export const careerRoles = careerGroups.flatMap(({ roles }) => roles);
export const maxCvBytes = 4 * 1024 * 1024;
