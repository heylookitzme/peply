# Compound Data Audit - Peply

**Audit date:** 2026-04-12
**Auditor:** Claude Code (automated extraction)
**Purpose:** Verbatim extraction of all compound data for owner verification against independent sources.
**Status:** READ-ONLY AUDIT. No data has been changed.

---

## Summary

| # | Compound | Category | Status | Dose Range | Frequency | Vials | Citations |
|---|----------|----------|--------|------------|-----------|-------|-----------|
| 1 | Semaglutide | glp1 | approved | 0.25-2.4 mg | Weekly | 5mg, 10mg | 2 |
| 2 | Tirzepatide | dual-agonist | approved | 2.5-15 mg | Weekly | 5/10/15/30mg | 2 |
| 3 | Retatrutide | triple-agonist | investigational | 2-12 mg | Weekly | 5mg, 10mg | 2 |
| 4 | Tesamorelin | growth-hormone | approved | 2 mg | Daily | 2mg | 2 |
| 5 | BPC-157 | growth-recovery | research/cat2 | 200-800 mcg | 1-2x daily | 5mg, 10mg | 1 |
| 6 | TB-500 | growth-recovery | research/cat2 | 2-5 mg | 2x/week | 2/5/10mg | 1 |
| 7 | GHK-Cu | growth-recovery | research/cat2 | 1-3 mg | Daily | 50mg, 100mg | 1 |
| 8 | AOD-9604 | growth-recovery | research/cat2 | 250-500 mcg | Daily | 5mg, 10mg | 1 |
| 9 | Thymosin Alpha-1 | growth-recovery | research/cat2 | 1.6-3.2 mg | 2x/week | 3mg, 5mg | 1 |
| 10 | Ipamorelin | gh-secretagogue | research/cat2 | 100-300 mcg | 2-3x daily | 2mg, 5mg | 1 |
| 11 | CJC-1295 (no DAC) | gh-secretagogue | research/cat2 | 100-300 mcg | 2-3x daily | 2mg, 5mg | 1 |
| 12 | CJC-1295 (with DAC) | gh-secretagogue | research/cat2 | 1-2 mg | Weekly | 2mg, 5mg | 1 |
| 13 | Semax | neuropeptide | research/cat2 | 200-600 mcg | Daily (IN or SC) | 3mg, 5mg | 1 |
| 14 | Selank | neuropeptide | research/cat2 | 200-400 mcg | Daily (IN or SC) | 3mg, 5mg | 1 |
| 15 | DSIP | neuropeptide | research/cat2 | 100-300 mcg | Daily (before sleep) | 2mg, 5mg | 1 |
| 16 | Epitalon | longevity-immune | research/cat2 | 5-10 mg | Daily (10-day cycles) | 10/20/50mg | 1 |
| 17 | MOTS-C | longevity-immune | research/cat2 | 5-10 mg | 3-5x/week | 5mg, 10mg | 1 |
| 18 | KPV | longevity-immune | research/cat2 | 200-500 mcg | Daily | 5mg, 10mg | 1 |
| 19 | Kisspeptin-10 | longevity-immune | research/cat2 | 1-10 mcg | Single dose/research | 1mg, 5mg | 1 |

---

## Detailed Compound Data

### 1. Semaglutide

| Field | Value |
|-------|-------|
| Slug | semaglutide |
| Aliases | Ozempic, Wegovy, Rybelsus |
| Category | glp1 |
| Manufacturer | Novo Nordisk |
| Route | subcutaneous |
| Approval Status | approved |
| Half-Life | Approximately 1 week (168 hours) |
| Mechanism | Mimics GLP-1 to enhance insulin secretion, suppress glucagon, slow gastric emptying, and reduce appetite via hypothalamic signaling. |
| Default BAC Water | 2 mL |

**Dose Range:** 0.25-2.4 mg, weekly, "Once weekly"

**Vial Sizes:** 5 mg, 10 mg

**Regulatory:**
- currentCategory: approved
- reclassificationStatus: stable
- fdaCategory: FDA-approved (BLA 215256 / NDA 209637)
- lastUpdated: 2024-01-01

**Titration Protocol 1: Wegovy Label Titration**
- Source: Wegovy (semaglutide) prescribing information, Novo Nordisk, 2021
- URL: https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/215256s000lbl.pdf

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 0.25 mg | 4 weeks | Starting dose |
| 2 | 0.5 mg | 4 weeks | First escalation |
| 3 | 1.0 mg | 4 weeks | Second escalation |
| 4 | 1.7 mg | 4 weeks | Third escalation |
| 5 | 2.4 mg | Maintenance | Maintenance dose |

**Titration Protocol 2: Ozempic Label Titration**
- Source: Ozempic (semaglutide) prescribing information, Novo Nordisk, 2017
- URL: https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/209637lbl.pdf

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 0.25 mg | 4 weeks | Starting dose |
| 2 | 0.5 mg | 4 weeks | First escalation |
| 3 | 1.0 mg | Maintenance | Maintenance (may increase to 2 mg) |

**Citations:**
1. **Wegovy PI** - "Wegovy (semaglutide) injection, for subcutaneous use - Prescribing Information" / FDA / Novo Nordisk / Published: 2021-06-04 / Reviewed: 2024-01-01 / URL: https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/215256s000lbl.pdf
2. **STEP 1 Trial** - "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1)" / NEJM, 384(11), 989-1002 / Published: 2021-02-10 / Reviewed: 2024-01-01 / URL: https://doi.org/10.1056/NEJMoa2032183

---

### 2. Tirzepatide

| Field | Value |
|-------|-------|
| Slug | tirzepatide |
| Aliases | Mounjaro, Zepbound |
| Category | dual-agonist |
| Manufacturer | Eli Lilly |
| Route | subcutaneous |
| Approval Status | approved |
| Half-Life | Approximately 5 days (120 hours) |
| Mechanism | Activates both GIP and GLP-1 receptors, enhancing insulin secretion, suppressing glucagon, slowing gastric emptying, and reducing appetite through complementary incretin pathways. |
| Default BAC Water | 2 mL |

**Dose Range:** 2.5-15 mg, weekly, "Once weekly"

**Vial Sizes:** 5 mg, 10 mg, 15 mg, 30 mg

**Regulatory:**
- currentCategory: approved
- reclassificationStatus: stable
- fdaCategory: FDA-approved (NDA 215866)
- lastUpdated: 2024-01-01

**Titration Protocol 1: Mounjaro Label Titration**
- Source: Mounjaro (tirzepatide) prescribing information, Eli Lilly, 2022
- URL: https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/215866s000lbl.pdf

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 2.5 mg | 4 weeks | Starting dose |
| 2 | 5 mg | 4 weeks | First escalation |
| 3 | 7.5 mg | 4 weeks | Second escalation |
| 4 | 10 mg | 4 weeks | Third escalation |
| 5 | 12.5 mg | 4 weeks | Fourth escalation |
| 6 | 15 mg | Maintenance | Maximum dose |

**Citations:**
1. **Mounjaro PI** - "Mounjaro (tirzepatide) injection, for subcutaneous use - Prescribing Information" / FDA / Eli Lilly / Published: 2022-05-13 / Reviewed: 2024-01-01 / URL: https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/215866s000lbl.pdf
2. **SURMOUNT-1 Trial** - "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1)" / NEJM, 387(3), 205-216 / Published: 2022-06-04 / Reviewed: 2024-01-01 / URL: https://doi.org/10.1056/NEJMoa2206038

---

### 3. Retatrutide

| Field | Value |
|-------|-------|
| Slug | retatrutide |
| Aliases | LY3437943 |
| Category | triple-agonist |
| Manufacturer | Eli Lilly |
| Route | subcutaneous |
| Approval Status | investigational |
| Half-Life | Approximately 6 days (144 hours) |
| Mechanism | Activates three receptors simultaneously: GIP (enhances insulin), GLP-1 (suppresses appetite, slows gastric emptying), and glucagon (increases energy expenditure and hepatic fat oxidation). The glucagon component distinguishes it from dual agonists. |
| Default BAC Water | 2 mL |

**Dose Range:** 2-12 mg, weekly, "Once weekly"

**Vial Sizes:** 5 mg, 10 mg

**Regulatory:**
- currentCategory: investigational
- reclassificationStatus: stable
- fdaCategory: Investigational (Phase 3)
- lastUpdated: 2024-06-01
- sourcingNote: Not FDA-approved. Available only through clinical trials or research supply. Phase 3 results expected 2025-2026.

**Titration Protocol 1: Phase 2 Trial Titration (12 mg arm)**
- Source: Jastreboff et al., NEJM 2023 - Triple-Hormone-Receptor Agonist Retatrutide for Obesity
- URL: https://doi.org/10.1056/NEJMoa2301972

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 2 mg | 4 weeks | Starting dose |
| 2 | 4 mg | 4 weeks | First escalation |
| 3 | 6 mg | 4 weeks | Second escalation |
| 4 | 8 mg | 4 weeks | Third escalation |
| 5 | 10 mg | 4 weeks | Fourth escalation |
| 6 | 12 mg | Maintenance | Target dose |

**Citations:**
1. **Phase 2 Trial** - "Triple-Hormone-Receptor Agonist Retatrutide for Obesity - A Phase 2 Trial" / NEJM, 389(6), 514-526 / Published: 2023-06-26 / Reviewed: 2024-06-01 / URL: https://doi.org/10.1056/NEJMoa2301972
2. **TRIUMPH Program** - "A Study of Retatrutide (LY3437943) in Participants With Obesity (TRIUMPH-3)" / ClinicalTrials.gov NCT05929066 / Published: 2023-07-01 / Reviewed: 2024-06-01 / URL: https://clinicaltrials.gov/study/NCT05929066

---

### 4. Tesamorelin

| Field | Value |
|-------|-------|
| Slug | tesamorelin |
| Aliases | Egrifta, Egrifta SV |
| Category | growth-hormone |
| Manufacturer | Theratechnologies |
| Route | subcutaneous |
| Approval Status | approved |
| Half-Life | Approximately 26 minutes (terminal half-life of the peptide itself; GH effects last longer) |
| Mechanism | Synthetic analog of human growth hormone-releasing factor (GRF 1-44). Binds to GRF receptors in the pituitary to stimulate endogenous growth hormone synthesis and release, preserving the pulsatile secretion pattern. |
| Default BAC Water | 2 mL |

**Dose Range:** 2 mg, daily, "Once daily"

**Vial Sizes:** 2 mg

**Regulatory:**
- currentCategory: approved
- reclassificationStatus: stable
- fdaCategory: FDA-approved (NDA 022505)
- lastUpdated: 2024-01-01
- sourcingNote: FDA-approved for HIV-associated lipodystrophy. Off-label use for GH optimization is not covered by the FDA indication.

**Titration Protocol 1: Egrifta SV Label Dosing**
- Source: Egrifta SV (tesamorelin) prescribing information, Theratechnologies, 2019
- URL: https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/022505s010lbl.pdf

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 2 mg | Maintenance | Fixed daily dose, no titration required |

**Citations:**
1. **Egrifta SV PI** - "Egrifta SV (tesamorelin for injection) - Prescribing Information" / FDA / Theratechnologies / Published: 2019-11-01 / Reviewed: 2024-01-01 / URL: https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/022505s010lbl.pdf
2. **LIPO-010 Trial** - "Effects of Tesamorelin on Visceral Fat in HIV-Infected Patients (LIPO-010)" / JCEM, 95(9), 4291-4304 / Published: 2010-09-01 / Reviewed: 2024-01-01 / URL: https://doi.org/10.1210/jc.2010-0285

---

### 5. BPC-157

| Field | Value |
|-------|-------|
| Slug | bpc-157 |
| Aliases | Body Protection Compound-157 |
| Category | growth-recovery |
| Manufacturer | Research peptide (multiple suppliers) |
| Route | subcutaneous |
| Approval Status | research |
| Half-Life | Estimated 4 hours (limited human PK data) |
| Mechanism | Gastric pentadecapeptide. Promotes angiogenesis, tendon/ligament healing, and nitric oxide signaling. Modulates growth factor expression. |
| Default BAC Water | 2 mL |

**Dose Range:** 200-800 mcg, daily, "1-2x daily"

**Vial Sizes:** 5 mg, 10 mg

**Regulatory:**
- currentCategory: cat2
- reclassificationStatus: pending
- fdaCategory: Research peptide (FDA Category 2)
- dateRestricted: 2023-09-29
- dateAnnouncedReturn: 2026-02-27
- lastUpdated: 2026-02-27
- sourcingNote: Not FDA-approved for any indication. Currently FDA Category 2 (restricted). Pending return to Category 1 availability.

**Titration Protocol 1: Research Dosing Protocol**
- Source: Sikiric et al., Current Pharmaceutical Design, 2018
- URL: https://doi.org/10.2174/1381612824666180713101408

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 250 mcg | Maintenance | Typical research dose, no titration |

**Citations:**
1. **Sikiric 2018 Review** - "Stable Gastric Pentadecapeptide BPC 157: Novel Therapy" / Current Pharmaceutical Design, 24(18), 2012-2032 / Published: 2018-01-01 / Reviewed: 2026-02-27 / URL: https://doi.org/10.2174/1381612824666180713101408

---

### 6. TB-500

| Field | Value |
|-------|-------|
| Slug | tb-500 |
| Aliases | Thymosin Beta-4, TB4 |
| Category | growth-recovery |
| Manufacturer | Research peptide (multiple suppliers) |
| Route | subcutaneous |
| Approval Status | research |
| Half-Life | Estimated 2-3 hours |
| Mechanism | Synthetic fragment of Thymosin Beta-4. Upregulates actin, promotes cell migration and differentiation, reduces inflammation, and supports tissue repair. |
| Default BAC Water | 2 mL |

**Dose Range:** 2-5 mg, twice_weekly, "2x/week (loading), 1x/week (maintenance)"

**Vial Sizes:** 2 mg, 5 mg, 10 mg

**Regulatory:**
- currentCategory: cat2
- reclassificationStatus: pending
- fdaCategory: Research peptide (FDA Category 2)
- dateRestricted: 2023-09-29
- dateAnnouncedReturn: 2026-02-27
- lastUpdated: 2026-02-27
- sourcingNote: Not FDA-approved for any indication. Currently FDA Category 2 (restricted). Pending return to Category 1 availability.

**Titration Protocol 1: Loading/Maintenance Protocol**
- Source: Goldstein et al., Expert Opinion on Biological Therapy, 2012
- URL: https://doi.org/10.1517/14712598.2012.697527

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 4 mg | 4 weeks | Loading phase 2x/week |
| 2 | 2.5 mg | Maintenance | Maintenance 1x/week |

**Citations:**
1. **Goldstein 2012** - "Thymosin Beta-4: A Multi-Functional Regenerative Peptide" / Expert Opinion on Biological Therapy, 12(1), 37-51 / Published: 2012-01-01 / Reviewed: 2026-02-27 / URL: https://doi.org/10.1517/14712598.2012.697527

---

### 7. GHK-Cu

| Field | Value |
|-------|-------|
| Slug | ghk-cu |
| Aliases | Copper Peptide GHK, Glycyl-L-histidyl-L-lysine |
| Category | growth-recovery |
| Manufacturer | Research peptide (multiple suppliers) |
| Route | subcutaneous |
| Approval Status | research |
| Half-Life | Estimated 1-2 hours |
| Mechanism | Naturally occurring copper-binding tripeptide. Stimulates collagen synthesis, promotes wound healing, has anti-inflammatory and antioxidant properties. Activates tissue remodeling genes. |
| Default BAC Water | 2 mL |

**Dose Range:** 1-3 mg, daily, "Once daily"

**Vial Sizes:** 50 mg, 100 mg

**Regulatory:**
- currentCategory: cat2
- reclassificationStatus: pending
- fdaCategory: Research peptide (FDA Category 2)
- dateRestricted: 2023-09-29
- dateAnnouncedReturn: 2026-02-27
- lastUpdated: 2026-02-27
- sourcingNote: Not FDA-approved for any indication. Currently FDA Category 2 (restricted). Pending return to Category 1 availability.

**Titration Protocol 1: Research Protocol**
- Source: Pickart et al., International Journal of Molecular Sciences, 2012
- URL: https://doi.org/10.3390/ijms131216324

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 1 mg | Maintenance | Standard research dose |

**Citations:**
1. **Pickart 2012** - "The Human Tripeptide GHK-Cu in Remodeling and Regeneration" / International Journal of Molecular Sciences, 13(12), 16324-16346 / Published: 2012-12-01 / Reviewed: 2026-02-27 / URL: https://doi.org/10.3390/ijms131216324

---

### 8. AOD-9604

| Field | Value |
|-------|-------|
| Slug | aod-9604 |
| Aliases | Anti-Obesity Drug 9604, hGH Fragment 176-191 |
| Category | growth-recovery |
| Manufacturer | Research peptide (multiple suppliers) |
| Route | subcutaneous |
| Approval Status | research |
| Half-Life | Estimated 30-60 minutes |
| Mechanism | Modified fragment of human growth hormone (amino acids 176-191). Stimulates lipolysis and inhibits lipogenesis without affecting IGF-1 levels or insulin sensitivity. |
| Default BAC Water | 2 mL |

**Dose Range:** 250-500 mcg, daily, "Once daily"

**Vial Sizes:** 5 mg, 10 mg

**Regulatory:**
- currentCategory: cat2
- reclassificationStatus: pending
- fdaCategory: Research peptide (FDA Category 2)
- dateRestricted: 2023-09-29
- dateAnnouncedReturn: 2026-02-27
- lastUpdated: 2026-02-27
- sourcingNote: Not FDA-approved for any indication. Currently FDA Category 2 (restricted). Pending return to Category 1 availability.

**Titration Protocol 1: Research Protocol**
- Source: Heffernan et al., Obesity Research, 2001
- URL: https://doi.org/10.1038/oby.2001.120

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 300 mcg | Maintenance | Standard research dose, no titration |

**Citations:**
1. **Heffernan 2001** - "Effects of a Modified Fragment of Growth Hormone on Body Composition" / Obesity Research, 9(S4), A51 / Published: 2001-01-01 / Reviewed: 2026-02-27 / URL: https://doi.org/10.1038/oby.2001.120

---

### 9. Thymosin Alpha-1

| Field | Value |
|-------|-------|
| Slug | thymosin-alpha-1 |
| Aliases | Ta1, Zadaxin |
| Category | growth-recovery |
| Manufacturer | Research peptide (Zadaxin by SciClone Pharmaceuticals in approved markets) |
| Route | subcutaneous |
| Approval Status | research |
| Half-Life | Approximately 2 hours |
| Mechanism | Naturally occurring thymic peptide. Enhances T-cell maturation and function, activates dendritic cells, augments antibody responses. Modulates cytokine production. |
| Default BAC Water | 2 mL |

**Dose Range:** 1.6-3.2 mg, twice_weekly, "2x/week"

**Vial Sizes:** 3 mg, 5 mg

**Regulatory:**
- currentCategory: cat2
- reclassificationStatus: pending
- fdaCategory: Research peptide in US (approved in 30+ countries as Zadaxin)
- dateRestricted: 2023-09-29
- dateAnnouncedReturn: 2026-02-27
- lastUpdated: 2026-02-27
- sourcingNote: Not FDA-approved in the US. Approved as Zadaxin in over 30 countries for hepatitis B/C and as immune adjuvant. Currently FDA Category 2 (restricted) in US.

**Titration Protocol 1: Zadaxin Label Protocol**
- Source: Garaci et al., International Immunopharmacology, 2012
- URL: https://doi.org/10.1016/j.intimp.2012.07.021

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 1.6 mg | Maintenance | Standard dose 2x/week |

**Citations:**
1. **Garaci 2012** - "Thymosin Alpha-1: From Bench to Bedside" / International Immunopharmacology, 12(4), 555-562 / Published: 2012-01-01 / Reviewed: 2026-02-27 / URL: https://doi.org/10.1016/j.intimp.2012.07.021

---

### 10. Ipamorelin

| Field | Value |
|-------|-------|
| Slug | ipamorelin |
| Aliases | (none) |
| Category | gh-secretagogue |
| Manufacturer | Research peptide (multiple suppliers) |
| Route | subcutaneous |
| Approval Status | research |
| Half-Life | Approximately 2 hours |
| Mechanism | Selective growth hormone secretagogue peptide. Binds ghrelin/GHS receptors in the pituitary to stimulate GH release without significantly affecting cortisol, prolactin, or ACTH levels. |
| Default BAC Water | 2 mL |

**Dose Range:** 100-300 mcg, other, "2-3x daily"

**Vial Sizes:** 2 mg, 5 mg

**Regulatory:**
- currentCategory: cat2
- reclassificationStatus: pending
- fdaCategory: Research peptide (FDA Category 2)
- dateRestricted: 2023-09-29
- dateAnnouncedReturn: 2026-02-27
- lastUpdated: 2026-02-27
- sourcingNote: Not FDA-approved. Currently Category 2 (restricted). Pending return to Category 1. Often paired with CJC-1295 (no DAC).

**Titration Protocol 1: Research Dosing Protocol**
- Source: Raun et al., European Journal of Endocrinology, 1998
- URL: https://doi.org/10.1530/eje.0.1390552

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 200 mcg | Maintenance | Standard dose 2-3x/day, often combined with CJC-1295 |

**Citations:**
1. **Raun 1998** - "Ipamorelin, the First Selective Growth Hormone Secretagogue" / European Journal of Endocrinology, 139(5), 552-561 / Published: 1998-11-01 / Reviewed: 2026-02-27 / URL: https://doi.org/10.1530/eje.0.1390552

---

### 11. CJC-1295 (no DAC) / Modified GRF 1-29

| Field | Value |
|-------|-------|
| Slug | cjc-1295-no-dac |
| Aliases | Modified GRF 1-29, Mod GRF 1-29, CJC-1295 without DAC |
| Category | gh-secretagogue |
| Manufacturer | Research peptide (multiple suppliers) |
| Route | subcutaneous |
| Approval Status | research |
| Half-Life | Approximately 30 minutes |
| Mechanism | Synthetic analog of growth hormone-releasing hormone (GHRH). Stimulates pulsatile GH release from the pituitary. The "no DAC" variant has a shorter duration and preserves natural GH pulsatility. |
| Default BAC Water | 2 mL |

**Dose Range:** 100-300 mcg, other, "2-3x daily"

**Vial Sizes:** 2 mg, 5 mg

**Regulatory:**
- currentCategory: cat2
- reclassificationStatus: pending
- fdaCategory: Research peptide (FDA Category 2)
- dateRestricted: 2023-09-29
- dateAnnouncedReturn: 2026-02-27
- lastUpdated: 2026-02-27
- sourcingNote: Not FDA-approved. Currently Category 2 (restricted). Pending return to Category 1. Often paired with Ipamorelin for synergistic GH release.

**Titration Protocol 1: Research Protocol**
- Source: Ionescu & Bhayani, Growth Hormone & IGF Research, 2006
- URL: https://doi.org/10.1016/j.ghir.2006.07.001

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 100 mcg | Maintenance | Standard dose 2-3x/day, often combined with Ipamorelin |

**Citations:**
1. **Ionescu 2006** - "CJC-1295, A Long-Acting GHRH Analog" / Growth Hormone & IGF Research, 16(S1), S62 / Published: 2006-07-01 / Reviewed: 2026-02-27 / URL: https://doi.org/10.1016/j.ghir.2006.07.001

---

### 12. CJC-1295 (with DAC)

| Field | Value |
|-------|-------|
| Slug | cjc-1295-dac |
| Aliases | CJC-1295 DAC, Drug Affinity Complex CJC-1295 |
| Category | gh-secretagogue |
| Manufacturer | Research peptide (multiple suppliers) |
| Route | subcutaneous |
| Approval Status | research |
| Half-Life | Approximately 8 days (due to DAC albumin binding) |
| Mechanism | GHRH analog with a Drug Affinity Complex (DAC) that extends its half-life by binding to albumin. Produces sustained, elevated GH and IGF-1 levels rather than pulsatile release. |
| Default BAC Water | 2 mL |

**Dose Range:** 1-2 mg, weekly, "Once weekly"

**Vial Sizes:** 2 mg, 5 mg

**Regulatory:**
- currentCategory: cat2
- reclassificationStatus: pending
- fdaCategory: Research peptide (FDA Category 2)
- dateRestricted: 2023-09-29
- dateAnnouncedReturn: 2026-02-27
- lastUpdated: 2026-02-27
- sourcingNote: Not FDA-approved. Currently Category 2 (restricted). Pending return to Category 1. The DAC variant produces sustained (non-pulsatile) GH elevation.

**Titration Protocol 1: Research Protocol**
- Source: Teichman et al., Journal of Clinical Endocrinology & Metabolism, 2006
- URL: https://doi.org/10.1210/jc.2005-2664

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 2 mg | Maintenance | Standard weekly dose |

**Citations:**
1. **Teichman 2006** - "Prolonged Stimulation of Growth Hormone and IGF-I After Single Subcutaneous Administration of CJC-1295" / JCEM, 91(3), 799-805 / Published: 2006-03-01 / Reviewed: 2026-02-27 / URL: https://doi.org/10.1210/jc.2005-2664

---

### 13. Semax

| Field | Value |
|-------|-------|
| Slug | semax |
| Aliases | ACTH 4-10 analog |
| Category | neuropeptide |
| Manufacturer | Research peptide (approved in Russia as Semax) |
| Route | subcutaneous |
| Approval Status | research |
| Half-Life | Approximately 3-5 minutes (intranasal bioavailability extends effective duration) |
| Mechanism | Synthetic analog of ACTH (4-10) fragment. Enhances BDNF expression, modulates dopaminergic and serotonergic systems, provides neuroprotective effects. Does not affect adrenal cortex function despite ACTH origin. |
| Default BAC Water | 2 mL |

**Dose Range:** 200-600 mcg, daily, "Once daily (intranasal or SC)"

**Vial Sizes:** 3 mg, 5 mg

**Regulatory:**
- currentCategory: cat2
- reclassificationStatus: pending
- fdaCategory: Research peptide in US (approved in Russia)
- dateRestricted: 2023-09-29
- dateAnnouncedReturn: 2026-02-27
- lastUpdated: 2026-02-27
- sourcingNote: Not FDA-approved. Approved in Russia for cognitive enhancement and stroke recovery. Currently FDA Category 2 (restricted) in US. Pending return to Category 1.

**Titration Protocol 1: Research Protocol**
- Source: Ashmarin et al., Doklady Biological Sciences, 2005
- URL: https://doi.org/10.1007/s10630-005-0008-4

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 300 mcg | Maintenance | Standard research dose |

**Citations:**
1. **Ashmarin 2005** - "ACTH/MSH-like Peptide Semax: Mechanisms of Action and Clinical Applications" / Doklady Biological Sciences, 402(1), 195-197 / Published: 2005-01-01 / Reviewed: 2026-02-27 / **NOTE: sourceUrl missing from citation object**

---

### 14. Selank

| Field | Value |
|-------|-------|
| Slug | selank |
| Aliases | TP-7 |
| Category | neuropeptide |
| Manufacturer | Research peptide (approved in Russia) |
| Route | subcutaneous |
| Approval Status | research |
| Half-Life | Approximately 3-5 minutes (intranasal delivery extends effective duration) |
| Mechanism | Synthetic analog of the immunomodulatory peptide tuftsin with a stabilizing Pro-Gly-Pro sequence. Modulates GABA-A receptor expression, enhances enkephalin levels, and provides anxiolytic effects without sedation or dependence. |
| Default BAC Water | 2 mL |

**Dose Range:** 200-400 mcg, daily, "Once daily (intranasal or SC)"

**Vial Sizes:** 3 mg, 5 mg

**Regulatory:**
- currentCategory: cat2
- reclassificationStatus: pending
- fdaCategory: Research peptide in US (approved in Russia)
- dateRestricted: 2023-09-29
- dateAnnouncedReturn: 2026-02-27
- sourcingNote: Not FDA-approved. Approved in Russia for anxiety and cognitive function. Currently FDA Category 2 (restricted) in US. Pending return to Category 1.

**Titration Protocol 1: Research Protocol**
- Source: Zozulya et al., Bulletin of Experimental Biology and Medicine, 2008
- URL: https://doi.org/10.1007/s10517-008-0006-0

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 300 mcg | Maintenance | Standard research dose |

**Citations:**
1. **Zozulya 2008** - "Selank: A Novel Anxiolytic Peptide" / Bulletin of Experimental Biology and Medicine, 145(2), 225-227 / Published: 2008-02-01 / Reviewed: 2026-02-27 / **NOTE: sourceUrl missing from citation object**

---

### 15. DSIP

| Field | Value |
|-------|-------|
| Slug | dsip |
| Aliases | Delta Sleep-Inducing Peptide, Emideltide |
| Category | neuropeptide |
| Manufacturer | Research peptide (multiple suppliers) |
| Route | subcutaneous |
| Approval Status | research |
| Half-Life | Approximately 15-25 minutes |
| Mechanism | Nonapeptide that modulates sleep architecture. Acts on multiple targets including GABA-A receptors, serotonergic pathways, and cortisol regulation. Promotes delta-wave sleep onset without causing sedation. |
| Default BAC Water | 2 mL |

**Dose Range:** 100-300 mcg, daily, "Once daily (before sleep)"

**Vial Sizes:** 2 mg, 5 mg

**Regulatory:**
- currentCategory: cat2
- reclassificationStatus: pending
- fdaCategory: Research peptide (FDA Category 2)
- dateRestricted: 2023-09-29
- dateAnnouncedReturn: 2026-02-27
- sourcingNote: Not FDA-approved. Limited human clinical data. Currently FDA Category 2 (restricted). Pending return to Category 1.

**Titration Protocol 1: Research Protocol**
- Source: Kovalzon & Strekalova, Peptides, 2006
- URL: https://doi.org/10.1016/j.peptides.2005.10.020

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 100 mcg | Maintenance | Standard research dose before sleep |

**Citations:**
1. **Kovalzon 2006** - "Delta Sleep-Inducing Peptide: An Update" / Peptides, 27(6), 1455-1461 / Published: 2006-06-01 / Reviewed: 2026-02-27 / **NOTE: sourceUrl missing from citation object**

---

### 16. Epitalon

| Field | Value |
|-------|-------|
| Slug | epitalon |
| Aliases | Epithalon, Epithalone, AEDG peptide |
| Category | longevity-immune |
| Manufacturer | Research peptide (multiple suppliers) |
| Route | subcutaneous |
| Approval Status | research |
| Half-Life | Estimated 1-2 hours |
| Mechanism | Synthetic tetrapeptide (Ala-Glu-Asp-Gly) analog of epithalamin. Activates telomerase, the enzyme responsible for maintaining telomere length. May promote pineal gland function and melatonin production. |
| Default BAC Water | 2 mL |

**Dose Range:** 5-10 mg, daily, "Daily in 10-day cycles"

**Vial Sizes:** 10 mg, 20 mg, 50 mg

**Regulatory:**
- currentCategory: cat2
- reclassificationStatus: pending
- fdaCategory: Research peptide (FDA Category 2)
- dateRestricted: 2023-09-29
- dateAnnouncedReturn: 2026-02-27
- sourcingNote: Not FDA-approved. Research on telomerase activation primarily from Russian institutes. Currently FDA Category 2 (restricted). Pending return to Category 1.

**Titration Protocol 1: Research Cycling Protocol**
- Source: Khavinson et al., Bulletin of Experimental Biology and Medicine, 2003
- URL: https://doi.org/10.1023/A:1024626105532

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 10 mg | 2 weeks | 10-day cycle, then break. Repeat 2-3x/year |

**Citations:**
1. **Khavinson 2003** - "Epithalon Peptide Induces Telomerase Activity and Telomere Elongation in Human Somatic Cells" / Bulletin of Experimental Biology and Medicine, 135(6), 590-592 / Published: 2003-06-01 / Reviewed: 2026-02-27 / **NOTE: sourceUrl missing from citation object**

---

### 17. MOTS-C

| Field | Value |
|-------|-------|
| Slug | mots-c |
| Aliases | Mitochondrial-Derived Peptide MOTS-c |
| Category | longevity-immune |
| Manufacturer | Research peptide (multiple suppliers) |
| Route | subcutaneous |
| Approval Status | research |
| Half-Life | Estimated 2-4 hours |
| Mechanism | Mitochondrial-derived peptide encoded within the 12S rRNA gene. Activates AMPK pathway, enhances glucose uptake, improves insulin sensitivity, and regulates cellular metabolism. Functions as a mitochondrial signaling molecule. |
| Default BAC Water | 2 mL |

**Dose Range:** 5-10 mg, other, "3-5x/week"

**Vial Sizes:** 5 mg, 10 mg

**Regulatory:**
- currentCategory: cat2
- reclassificationStatus: pending
- fdaCategory: Research peptide (FDA Category 2)
- dateRestricted: 2023-09-29
- dateAnnouncedReturn: 2026-02-27
- sourcingNote: Not FDA-approved. Early-stage research peptide. Currently FDA Category 2 (restricted). Pending return to Category 1.

**Titration Protocol 1: Research Protocol**
- Source: Lee et al., Cell Metabolism, 2015
- URL: https://doi.org/10.1016/j.cmet.2015.02.009

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 5 mg | Maintenance | Standard research dose 3-5x/week |

**Citations:**
1. **Lee 2015** - "The Mitochondrial-Derived Peptide MOTS-c Promotes Metabolic Homeostasis and Reduces Obesity and Insulin Resistance" / Cell Metabolism, 21(3), 443-454 / Published: 2015-03-03 / Reviewed: 2026-02-27 / **NOTE: sourceUrl missing from citation object**

---

### 18. KPV

| Field | Value |
|-------|-------|
| Slug | kpv |
| Aliases | Lysine-Proline-Valine, Alpha-MSH Fragment |
| Category | longevity-immune |
| Manufacturer | Research peptide (multiple suppliers) |
| Route | subcutaneous |
| Approval Status | research |
| Half-Life | Estimated 30-60 minutes |
| Mechanism | C-terminal tripeptide fragment of alpha-melanocyte-stimulating hormone (alpha-MSH). Potent anti-inflammatory activity via NF-kB inhibition and PGE2 reduction. Modulates gut inflammation and mucosal immune response. |
| Default BAC Water | 2 mL |

**Dose Range:** 200-500 mcg, daily, "Once daily"

**Vial Sizes:** 5 mg, 10 mg

**Regulatory:**
- currentCategory: cat2
- reclassificationStatus: pending
- fdaCategory: Research peptide (FDA Category 2)
- dateRestricted: 2023-09-29
- dateAnnouncedReturn: 2026-02-27
- sourcingNote: Not FDA-approved. Research focus on inflammatory bowel conditions. Currently FDA Category 2 (restricted). Pending return to Category 1.

**Titration Protocol 1: Research Protocol**
- Source: Brzoska et al., Endocrine Reviews, 2008
- URL: https://doi.org/10.1210/er.2007-0029

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 300 mcg | Maintenance | Standard research dose |

**Citations:**
1. **Brzoska 2008** - "Alpha-MSH and Related Tripeptides: Biochemistry, Anti-Inflammatory and Protective Effects" / Endocrine Reviews, 29(5), 581-602 / Published: 2008-08-01 / Reviewed: 2026-02-27 / **NOTE: sourceUrl missing from citation object**

---

### 19. Kisspeptin-10

| Field | Value |
|-------|-------|
| Slug | kisspeptin-10 |
| Aliases | KP-10, Metastin 45-54 |
| Category | longevity-immune |
| Manufacturer | Research peptide (multiple suppliers) |
| Route | subcutaneous |
| Approval Status | research |
| Half-Life | Approximately 4 minutes (IV), 27 minutes (SC) |
| Mechanism | Decapeptide fragment of kisspeptin that activates KISS1R (GPR54) in hypothalamic GnRH neurons. Potently stimulates LH and FSH secretion, serving as a key regulator of the reproductive hormone axis. |
| Default BAC Water | 2 mL |

**Dose Range:** 1-10 mcg, other, "Single dose / research protocol"

**Vial Sizes:** 1 mg, 5 mg

**Regulatory:**
- currentCategory: cat2
- reclassificationStatus: pending
- fdaCategory: Research peptide (FDA Category 2)
- dateRestricted: 2023-09-29
- dateAnnouncedReturn: 2026-02-27
- sourcingNote: Not FDA-approved. Investigational use in reproductive endocrinology. Currently FDA Category 2 (restricted). Pending return to Category 1.

**Titration Protocol 1: Research Protocol**
- Source: Dhillo et al., Journal of Clinical Endocrinology & Metabolism, 2005
- URL: https://doi.org/10.1210/jc.2005-1468

| Step | Dose | Duration | Notes |
|------|------|----------|-------|
| 1 | 1 mcg | Maintenance | Single SC dose (research); dose varies by protocol |

**Citations:**
1. **Dhillo 2005** - "Kisspeptin-54 Stimulates the Hypothalamic-Pituitary-Gonadal Axis in Human Males" / JCEM, 90(12), 6609-6615 / Published: 2005-12-01 / Reviewed: 2026-02-27 / **NOTE: sourceUrl missing from citation object**

---

## Issues Identified During Audit

### Data Quality Issues

1. **Missing sourceUrl on citations for compounds 13-19** (Semax, Selank, DSIP, Epitalon, MOTS-C, KPV, Kisspeptin-10): The citation objects do not include a `sourceUrl` field, even though the titration protocol objects for the same compounds do have `sourceUrl`. The DOI links exist in the protocol but not the citation. This means the "Link" anchor on compound detail pages will not render for these 7 compounds.

2. **Citation count disparity:** FDA-approved compounds (Semaglutide, Tirzepatide, Retatrutide, Tesamorelin) have 2 citations each. All 15 research compounds have only 1 citation each. Per CLAUDE.md: "every supported protocol must include at least one citation." This is met, but the research compounds would benefit from additional supporting references.

3. **All research compounds default BAC water to 2 mL:** This is a reasonable default but may not reflect the most common reconstitution practice for all compounds (e.g., GHK-Cu with 50-100mg vials might use more BAC water).

### Figures to Verify Against Independent Sources

The following figures are the most trust-critical and should be cross-referenced:

| Compound | Figure to Verify | Current Value |
|----------|-----------------|---------------|
| Semaglutide | Wegovy titration steps | 0.25 → 0.5 → 1.0 → 1.7 → 2.4 mg |
| Tirzepatide | Mounjaro titration steps | 2.5 → 5 → 7.5 → 10 → 12.5 → 15 mg |
| Retatrutide | Phase 2 dose escalation | 2 → 4 → 6 → 8 → 10 → 12 mg |
| BPC-157 | Dose range | 200-800 mcg daily |
| TB-500 | Loading/maintenance | 4mg 2x/week → 2.5mg 1x/week |
| Ipamorelin | Dose range | 100-300 mcg 2-3x/day |
| CJC-1295 (no DAC) | Half-life | ~30 minutes |
| CJC-1295 (with DAC) | Half-life | ~8 days |
| Epitalon | Cycling protocol | 10mg daily x 10 days, 2-3x/year |
| Kisspeptin-10 | Dose range | 1-10 mcg (note: research uses mcg/kg) |
