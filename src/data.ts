import { PracticeArea, CaseResult, Testimonial, BlogPost } from './types';

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'family-law',
    title: 'Family Law & Custody',
    icon: 'Scale',
    shortDesc: 'Protecting your children and securing your assets during challenging family separations.',
    longDesc: 'Family disputes represent some of the most emotionally challenging moments in life. Our compassionate advocates are here to guide you through child custody battles, property division, and divorce while maintaining your dignity and protecting your children’s best interests.',
    commonProblems: [
      'Struggling to reach a fair child custody arrangement with your ex-spouse.',
      'Unresolved disputes over family-owned properties or land on Kampala road.',
      'Unfair child support demands or refusal to provide necessary tuition support.'
    ],
    steps: [
      'Call us or submit our evaluation form to schedule your initial consultation.',
      'We review local family dynamics, existing documentation, and explore potential out-of-court settlements.',
      'We hold a rigorous physical strategy session to design a courtroom-ready action plan.'
    ],
    pricingHonesty: 'Simple uncontested divorce starts at UGX 1,500,000 flat fee. Contested arrangements and property mediation are offered at transparent hourly rates or capped milestone percentages with upfront payment plan options.',
    faqs: [
      {
        question: 'How long does a child custody case take to resolve in Uganda?',
        answer: 'If resolved through formal high court mediation or local council agreement, custody arrangements can take anywhere from 14 days to 3 months. When contested in magistrate court, it may stretch to 6-12 months.'
      },
      {
        question: 'Can child support be altered once a custody decree is signed?',
        answer: 'Yes. In Uganda, child maintenance orders can be reviewed and altered if circumstances change significantly, such as changes in tuition patterns, medical needs, or parental income.'
      }
    ]
  },
  {
    id: 'criminal-defense',
    title: 'Criminal Defense',
    icon: 'Shield',
    shortDesc: 'Immediate, aggressive representation to safeguard your rights, freedom, and reputation.',
    longDesc: 'If you or a loved one is facing criminal charges, time is your worst enemy. Whether accused of professional fraud, theft, assault, or minor traffic violations, we act with swift, uncompromising legal defense to secure bail and preserve your innocence at all costs.',
    commonProblems: [
      'Unlawful police detention beyond the mandatory 48-hour limit.',
      'Absurdly high or denied police bail structures in Kampala police divisions.',
      'False accusations of financial theft or breach of professional trust.'
    ],
    steps: [
      'Call our urgent 24/7 hotline for immediate lawyer representation at custody centers.',
      'We dissect state evidence, witness testimonies, and identify procedural violations.',
      'We enter aggressive litigation or negotiate formal settlement routes for case dismissal.'
    ],
    pricingHonesty: 'Standard pre-trial representation and bail application starts at UGX 2,500,000 flat fee. Complete trial representation is priced based on charge complexity, discussed upfront with strict no-hidden-cost transparency.',
    faqs: [
      {
        question: 'What is my immediate right if arrested in Kampala?',
        answer: 'You have a constitutional right to remain silent, to be represented by an advocate of your choice, and to be produced before court within 48 hours of arrest.'
      },
      {
        question: 'How much does immediate police bond cost?',
        answer: 'Under Ugandan law, police bond is officially free, although local procedural complexities often require experienced advocates to secure prompt execution without delays.'
      }
    ]
  },
  {
    id: 'personal-injury',
    title: 'Personal Injury',
    icon: 'Activity',
    shortDesc: 'No fee unless we win. Maximum compensation for traffic, construction, and boda boda accidents.',
    longDesc: 'When you are injured due to someone else’s negligence on the road or in the workplace, you shouldn’t have to pay for medical bills out of pocket. Our injury experts fight insurance companies to recover maximum medical and pain damages, on a rigorous No-Win, No-Fee guarantee.',
    commonProblems: [
      'Severe injuries from negligent boda boda riders or heavy commercial trucks.',
      'Insurance companies offering insultingly small settlements that won’t cover hospital bills.',
      'Employer denial of liability after workplace accidents or heavy construction falls.'
    ],
    steps: [
      'Get a totally free, zero-obligation assessment of your injury case.',
      'We gather comprehensive medical logs, police collision reports, and accident witnesses.',
      'We file claims and litigate. In personal injury, you pay nothing until we collect your settlement.'
    ],
    pricingHonesty: 'Strictly No Win, No Fee. If we fail to secure compensation, you pay us absolutely zero. Upon success, our fee represents a standard, pre-agreed 15% to 25% of the total cash recovery payload.',
    faqs: [
      {
        question: 'How much is my injury claim worth?',
        answer: 'Compensation is determined based on the severity of physical harm, current and future hospital fees, loss of business income, and long-term suffering. Recent Kampala verdicts range from UGX 10 million for minor fractures to over UGX 150 million for severe truck collisions.'
      },
      {
        question: 'What is the time limit to file a car accident claim in Uganda?',
        answer: 'Under the Law of Limitations in Uganda, personal injury suits must be filed within 3 years from the date of the accident. It is best to act immediately while evidence is fresh.'
      }
    ]
  },
  {
    id: 'estate-planning',
    title: 'Estate Planning & Wills',
    icon: 'FileText',
    shortDesc: 'Securing family inheritances and draft legally airtight Wills to avoid generational disputes.',
    longDesc: 'Protect your legacy and prevent bitter family disputes. We design legally bulletproof Wills, help navigate Letters of Administration, and securely manage land assets so that your life’s efforts are distributed exactly as you envision.',
    commonProblems: [
      'Confusing state inheritance rules leading to bitter land grab attempts by relatives.',
      'Unclear Wills that fail to meet strict legal validity standards in high courts.',
      'Weeks of delays trying to secure Letters of Administration for family bank accounts.'
    ],
    steps: [
      'Schedule a confidential private session to lay out family structures and assets.',
      'We draft a legally watertight Ugandan Will and secure safe structural registration.',
      'We provide secure long-term physical storage and professional executorship services.'
    ],
    pricingHonesty: 'Comprehensive custom Will drafting starts at a flat UGX 1,000,000. Basic Estate Planning packages for family trusts and property protection start at a supportive UGX 2,500,000 including witness registration.',
    faqs: [
      {
        question: 'Who makes a valid Will in Uganda?',
        answer: 'Any person of sound mind who has attained the age of 18 may write a Will. It must be signed by the testator in the presence of at least two independent witnesses who are not beneficiaries.'
      },
      {
        question: 'What happens to my property if I die without a Will?',
        answer: 'Your assets will be managed under the Succession Act of Uganda with strict default ratios: 75% to children, 15% to spouses, 9% to dependent relatives, and 1% to customary heirs. This frequently leads to severe, prolonged lawsuits.'
      }
    ]
  },
  {
    id: 'business-law',
    title: 'Business & Land Law',
    icon: 'Briefcase',
    shortDesc: 'Bulletproof business structures, contract drafting, and safe land title transfers.',
    longDesc: 'Whether starting an exciting Kampala startup or purchasing commercial land, legal errors can ruin you financially. We perform rigorous due diligence to uncover fraudulent duplicate land titles, write robust partnership contracts, and structure businesses for liability shield.',
    commonProblems: [
      'Purchasing land in Central Kampala only to discover the title was forged or disputed.',
      'Rethinking partnerships after contracts turn out to be completely unenforceable.',
      'Unexpected compliance fines or tax penalties due to faulty company registry setups.'
    ],
    steps: [
      'Book a legal planning call to outline transaction objectives or dispute details.',
      'We perform deep search registry inquiries, title cross-references, and draft defense arguments.',
      'Execution of risk-free transactions, regulatory filings, or aggressive commercial recovery.'
    ],
    pricingHonesty: 'New Company incorporation packages start at a fast, friendly flat UGX 1,200,000. Express land title due diligence searches start at UGX 600,000 including written certified safety reports.',
    faqs: [
      {
        question: 'How do you verify if a land title is authentic in Kampala?',
        answer: 'We physically trace the title in the Ministry of Lands registry, cross-reference previous transfer names, and inspect the physical plot boundaries to ensure no local tenancy ownership disputes exist.'
      },
      {
        question: 'Why should I incorporate as a Limited Liability Company?',
        answer: 'An LLC acts as a separate legal shield. This ensures that any business losses, supplier debts, or tenant claims cannot target your personal family home, personal savings, or land holdings.'
      }
    ]
  }
];

export const CASE_RESULTS: CaseResult[] = [
  {
    title: 'Secured UGX 120M for Motorcycle Accident Victim',
    clientInitials: 'A.K.',
    amount: 'UGX 120,000,000',
    practiceArea: 'Personal Injury',
    detail: 'A motorcycle (boda boda) victim suffered critical compound fractures when hit by a speeding delivery van. The insurance firm rejected the claim. We gathered eyewitness footage, hospital reports, and secured full settlement.'
  },
  {
    title: 'Not Guilty Verdict in UGX 80M Employment Theft Allegation',
    clientInitials: 'M.O.',
    amount: 'UGX 80,000,000 Discharged',
    practiceArea: 'Criminal Defense',
    detail: 'A junior financial manager was wrongly accused of stealing company inventory. Upon scrutiny, we proved police evidence was altered and accounting records were falsified by the business partners. Total acquittal.'
  },
  {
    title: 'Successfully Mediated High-Conflict Child Custody in 14 Days',
    clientInitials: 'S.N.',
    amount: 'Out of Court Settlement',
    practiceArea: 'Family Law',
    detail: 'Parents were locked in a destructive court fight over three children. We initiated private round-table mediation, avoiding lengthy hearings and securing joint-parenting schedules with tuition cost covenants.'
  },
  {
    title: 'Secured UGX 45M for Minor Injuries in a Taxi Collision',
    clientInitials: 'J.M.',
    amount: 'UGX 45,000,000',
    practiceArea: 'Personal Injury',
    detail: 'Our client was a passenger in a commuter taxi that collided with an aggressive delivery van on Gulu Highway. Resolved through insurance arbitration in less than 40 days.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Nakato',
    role: 'Mother of Three, Kampala Central',
    text: '“When my custody case started, I was terrified of losing my children. Denis fought for me with wisdom and utmost respect. The court agreed with our joint strategy. He is the most compassionate lawyer in town.”',
    rating: 5
  },
  {
    name: 'Moses Ochieng',
    role: 'Business Owner, Nakasero',
    text: '“I was facing a highly wrongful criminal charges of financial misconduct. Denis stepped in, got me released on bail in hours, and systematically destroyed the prosecutorial evidence. Highly, highly recommended!”',
    rating: 5
  },
  {
    name: 'Dr. Jane Mugisha',
    role: 'Medical Consultant, Kampala',
    text: '“After a severe truck accident on Kampala Road left me with nerve injuries, Denis Advocate team handled the insurance claims. Their No-Fee-Unless-We-Win was true. They recovered UGX 120,000,000.”',
    rating: 5
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'What to do immediately after a boda boda accident in Kampala',
    slug: 'boda-boda-accident-guide',
    excerpt: 'An accident on Kampala roads can leave you disoriented. Review the 5 critical legal and safety steps to take to ensure your injuries are documentable for legal claims.',
    content: `A road accident in Kampala is terrifying, especially involving a commercial motorcycle (boda boda). What you do in the first 30 minutes directly determines whether you will receive fair compensation for your injuries or bear massive hospital bills alone.

Here is your legal emergency battle plan:

### 1. Prioritize Physical Safety & Seek Medical Care Immediately
Even if you believe your injuries are minor, adrenaline masks severe internal damage. Head straight to a certified hospital (such as Mulago National Referral, Nakasero Hospital, or Mengo Hospital). Ensure doctors document every bruise in writing – these medical notes are the cornerstone of your legal compensation case.

### 2. Take Photos of the Scene & Vehicle Number Plates
If physically able, take clear photos of the accident scene, the boda boda license plate, and the colliding vehicle plate. Take close-up shots of any damage, road conditions, and your immediate physical injuries.

### 3. Secure Eyewitness Contacts & the Rider's Information
Boda boda accident scenes clear up in minutes. Quickly write down the phone numbers and names of any onlookers, nearby shopkeepers, or passengers who witnessed the crash.

### 4. File a Police Report Within 24 Hours
Report the collision to the nearest Police Division (e.g., Central Police Station Kampala, Wandegeya, or Kira Road Police). Make sure to request a certified copy of your Police Statement – insurance companies will immediately reject any claims without an authorized police case file.

### 5. Never Accept Cash or Sign Insurer Releases Without a Lawyer
Insurance agents frequently rush to hospitals offering small amounts (e.g., UGX 500,000) for "immediate pharmacy bills" in exchange for signing away your rights. Never sign anything. Speak to Denis Kakeeto Advocates for a free 15-minute consultation first to calculate your true claim payload.`,
    publishDate: 'May 12, 2026',
    author: 'Denis Kakeeto, Principal Advocate',
    readTime: '4 Min Read',
    category: 'Personal Injury'
  },
  {
    id: 'post-2',
    title: '5 fatal mistakes that hurt your child custody case in Uganda',
    slug: 'child-custody-mistakes-uganda',
    excerpt: 'Child custody is governed strictly by the welfare of the child principle. Avoid these common mistakes that judges use to deny custody in family courts.',
    content: `In Ugandan Family Law, custody disputes are governed single-mindedly by the "Welfare of the Child Principle." This means magistrate and high court judges do not care about parental fights; they care strictly about which environment protects the children’s educational, physical, and mental health.

Avoid these 5 fatal custody mistakes:

### 1. Speaking Negatively about your Ex-Spouse in Public or on Social Media
Judges view parental alienation extremely harshly. If you post angry rants on Facebook or criticize your partner in front of your children, you present yourself as a hostile parent who will restrict the children’s moral development.

### 2. Disregarding Tuitional and School Needs
Children’s schooling is paramount. Neglecting to pay tuition, failing to support homework, or altering school schedules without consensus shows a disregard for the kids’ welfare.

### 3. Relocating with the Children Without Written Consent or Court Orders
Moving children to a different district (e.g., moving from Kampala to Jinja) without your ex’s permission or legal clearance is viewed as parental abduction. Always secure written agreements or temporary judicial permission first.

### 4. Refusing Reasonable Visitation Rights to the Other Parent
Unless you have physical proof of active abuse, restricting the other parent from seeing their children without a court order makes you look uncooperative in the eyes of the family court.

### 5. Lacking Proper Legal Representation
Representing yourself or relying on unlicensed clerks to file family standard motions is a recipe for disaster. Family Law involves complex child welfare assessments that require seasoned, sensitive advocates like Denis Kakeeto Advocates.`,
    publishDate: 'April 20, 2026',
    author: 'Denis Kakeeto, Principal Advocate',
    readTime: '6 Min Read',
    category: 'Family Law'
  },
  {
    id: 'post-3',
    title: 'How much does a criminal defence lawyer cost in Uganda?',
    slug: 'criminal-defense-lawyer-cost',
    excerpt: 'Facing criminal charges? Learn about average legal fee structures, flat rate options, bail representation, and why cheap advocates might cost you your freedom.',
    content: `The question of legal fees is often the first concern for anyone arrested or accused of a crime in Kampala. When your freedom, job, and family reputation are on the line, understanding how lawyer fees work in Uganda is crucial.

Here is an honest breakdown of how defense attorneys calculate their charges:

### 1. The Bail Application Flat Fee
A standard bail application involves drafting motion affidavits, visiting the client in custody (e.g., Luzira Prison, Kitalya, or local police cells), presenting reliable sureties to the magistrate, and presenting legal arguments. In Kampala, experienced firms like Denis Kakeeto Advocates offer a flat fee starting at UGX 2,500,000 for standard police and court bail actions.

### 2. The Trial Flat Fee vs. Retainer Structure
For complex cases going to full trial, attorneys generally charge either a one-time flat trial fee or a monthly retainer. Trial fees cover court appearances, document preparation, and witness examination. Standard defense trial fees in Uganda range from UGX 5,000,000 for magistrate-level theft or fraud cases, upwards to UGX 15,000,000+ for High Court criminal capital matters.

### 3. Hourly Fees
A few firms calculate fees purely in hours worked (e.g., UGX 300,000 per hour). While common globally, most Kampala clients prefer flat-rate structures because it prevents unexpected monthly bills when courts delay hearings.

### 4. Be Careful of "Cheap" Advocates
Be extremely cautious of "back-alley" legal brokers who hang around police precincts offering cheap bail for UGX 200,000. These actors frequently lack proper representation licenses and disappear once they receive your upfront funds, leaving you in state nodes for months.

Your freedom and clean record are worth high-quality, professional legal representation. Always demand a written retainer agreement showing exact fees and milestones.`,
    publishDate: 'March 15, 2026',
    author: 'Denis Kakeeto, Principal Advocate',
    readTime: '5 Min Read',
    category: 'Criminal Defense'
  }
];
