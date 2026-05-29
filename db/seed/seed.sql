INSERT INTO users (id, email, role, created_at, updated_at) VALUES
('admin_001', 'marcelloefficace@gmail.com', 'admin', unixepoch(), unixepoch());

INSERT INTO products (
  id, name, slug, subtitle, category, strength, active_ingredients,
  short_description, usage_information, reconstitution_instructions,
  storage_information, enhanced_stability, requires_provider_referral,
  active, created_at, updated_at
) VALUES
(
  'prod_trimix',
  'TriMix',
  'trimix',
  'Precision compounded intracavernosal formulation prepared for reconstitution.',
  'Lyophilized Powder',
  '150MG / 5MG / 50MCG',
  '["Papaverine HCl","Phentolamine","Prostaglandin E1"]',
  'TriMix is a precision-compounded lyophilized formulation for intracavernosal use, combining Papaverine HCl, Phentolamine, and Prostaglandin E1. Prepared in a sterile environment with pharmaceutical-grade ingredients, it is designed for reconstitution prior to use and packaged to ensure enhanced stability and consistent quality.',
  'FOR INTRACAVERNOSAL USE ONLY. Reconstitute prior to administration using an appropriate sterile diluent.',
  '["Draw sterile diluent into syringe","Slowly inject into vial","Gently swirl until dissolved","Withdraw prepared solution","Use as directed"]',
  '["Store refrigerated at 2°C–8°C (36°F–46°F)","Protect from light","Do not freeze","Keep out of reach of children"]',
  'Freeze-dried formulation designed to support improved long-term storage and product consistency.',
  1, 1, unixepoch(), unixepoch()
),
(
  'prod_quadmix',
  'QuadMix',
  'quadmix',
  'Precision compounded intracavernosal formulation prepared for reconstitution.',
  'Lyophilized Powder',
  '150MG / 10MG / 100MCG / 1MG',
  '["Papaverine HCl","Phentolamine","Prostaglandin E1","Atropine Sulfate"]',
  'QuadMix is a precision-compounded lyophilized formulation for intracavernosal use, combining Papaverine HCl, Phentolamine, Prostaglandin E1, and Atropine Sulfate. Prepared in a sterile environment with pharmaceutical-grade ingredients, it is designed for reconstitution prior to use and packaged to ensure enhanced stability and consistent quality.',
  'FOR INTRACAVERNOSAL USE ONLY. Reconstitute prior to administration using an appropriate sterile diluent.',
  '["Draw sterile diluent into syringe","Slowly inject into vial","Gently swirl until dissolved","Withdraw prepared solution","Use as directed"]',
  '["Store refrigerated at 2°C–8°C (36°F–46°F)","Protect from light","Do not freeze","Keep out of reach of children"]',
  'Freeze-dried formulation designed to support improved long-term storage and product consistency.',
  1, 1, unixepoch(), unixepoch()
),
(
  'prod_nad_500mg',
  'NAD+ 500MG',
  'nad-500mg',
  'Nicotinamide Adenine Dinucleotide prepared for reconstitution.',
  'Lyophilized Powder',
  '500MG',
  '["Nicotinamide Adenine Dinucleotide"]',
  'NAD+ 500MG is a precision-compounded lyophilized wellness formulation containing Nicotinamide Adenine Dinucleotide. Prepared in a sterile environment with pharmaceutical-grade ingredients, it is designed for reconstitution prior to use and packaged to ensure enhanced stability and consistent quality.',
  'Use only as prescribed by a licensed medical provider. Reconstitute prior to administration using an appropriate sterile diluent.',
  '["Draw sterile diluent into syringe","Slowly inject into vial","Gently swirl until dissolved","Withdraw prepared solution","Use as directed"]',
  '["Store refrigerated at 2°C–8°C (36°F–46°F)","Protect from light","Do not freeze","Keep out of reach of children"]',
  'Freeze-dried formulation designed to support improved long-term storage and product consistency.',
  1, 1, unixepoch(), unixepoch()
),
(
  'prod_pt_141',
  'PT-141',
  'pt-141',
  'Bremelanotide / PT-141 prepared as a lyophilized formulation for reconstitution.',
  'Lyophilized Peptide',
  '10MG',
  '["Bremelanotide / PT-141"]',
  'PT-141 is a precision-compounded lyophilized peptide formulation containing Bremelanotide / PT-141. Prepared in a sterile environment with pharmaceutical-grade ingredients, it is designed for reconstitution prior to use and packaged to ensure enhanced stability and consistent quality.',
  'Use only as prescribed by a licensed medical provider. Reconstitute prior to administration using an appropriate sterile diluent.',
  '["Draw sterile diluent into syringe","Slowly inject into vial","Gently swirl until dissolved","Withdraw prepared solution","Use as directed"]',
  '["Store refrigerated at 2°C–8°C (36°F–46°F)","Protect from light","Do not freeze","Keep out of reach of children"]',
  'Freeze-dried formulation designed to support improved long-term storage and product consistency.',
  1, 1, unixepoch(), unixepoch()
),
(
  'prod_bac_water',
  'Bacteriostatic Water',
  'bacteriostatic-water',
  'Sterile-style diluent presentation designed for reconstitution support in a clean multi-use vial format.',
  'Diluent',
  'Deionized Pure Water with 0.9% Benzyl Alcohol',
  '["Deionized Pure Water","0.9% Benzyl Alcohol"]',
  'Bacteriostatic Water is a sterile multi-use diluent formulated with deionized pure water and 0.9% benzyl alcohol to support consistent reconstitution of lyophilized preparations. Prepared and packaged for clean handling, it is designed to pair with applicable compounded formulations as directed.',
  'Use only as directed by a licensed medical provider or dispensing instructions. For reconstitution support only.',
  '["Draw sterile diluent into syringe","Slowly inject into vial","Gently swirl until dissolved","Withdraw prepared solution","Use as directed"]',
  '["Store as directed with your order","Protect from contamination","Keep in original packaging until use","Keep out of reach of children"]',
  'Sterile diluent format designed to support clean reconstitution workflows and consistent product preparation.',
  1, 1, unixepoch(), unixepoch()
);

INSERT INTO product_variants (
  id, product_id, name, price_cents, inventory_quantity,
  allow_preorder, active, created_at, updated_at
) VALUES
('var_trimix_25ml', 'prod_trimix', '2.5mL Multi-Dose Vial', 17999, 2, 1, 1, unixepoch(), unixepoch()),
('var_trimix_5ml', 'prod_trimix', '5mL Multi-Dose Vial', 32999, 2, 1, 1, unixepoch(), unixepoch()),
('var_quadmix_25ml', 'prod_quadmix', '2.5mL Multi-Dose Vial', 19999, 0, 1, 1, unixepoch(), unixepoch()),
('var_quadmix_5ml', 'prod_quadmix', '5mL Multi-Dose Vial', 37999, 0, 1, 1, unixepoch(), unixepoch()),
('var_nad_10ml', 'prod_nad_500mg', '10mL Vial', 14999, 0, 1, 1, unixepoch(), unixepoch()),
('var_pt141_10ml', 'prod_pt_141', '10mL Vial', 14999, 0, 1, 1, unixepoch(), unixepoch()),
('var_bacwater_5ml', 'prod_bac_water', '5mL Multi-Use Vial', 1499, 0, 1, 1, unixepoch(), unixepoch()),
('var_bacwater_10ml', 'prod_bac_water', '10mL Multi-Use Vial', 2499, 0, 1, 1, unixepoch(), unixepoch());
