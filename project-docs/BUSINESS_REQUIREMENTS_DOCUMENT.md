# Business Requirements Document (BRD)
## Wise Wealth - Multi-Currency Asset Management Platform

**Document Version:** 1.0  
**Date:** December 10, 2025  
**Project Status:** Active Development  
**Document Owner:** Product Team

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Business Objectives](#3-business-objectives)
4. [Stakeholders](#4-stakeholders)
5. [Scope](#5-scope)
6. [Functional Requirements](#6-functional-requirements)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [User Stories](#8-user-stories)
9. [Technical Architecture](#9-technical-architecture)
10. [Design Requirements](#10-design-requirements)
11. [Data Requirements](#11-data-requirements)
12. [Security & Compliance](#12-security--compliance)
13. [Success Metrics](#13-success-metrics)
14. [Assumptions & Constraints](#14-assumptions--constraints)
15. [Risks & Mitigation](#15-risks--mitigation)
16. [Implementation Roadmap](#16-implementation-roadmap)
17. [Appendix](#17-appendix)

---

## 1. Executive Summary

### 1.1 Purpose
Wise Wealth is a comprehensive multi-currency asset management web application designed to empower investors to track, analyze, and optimize their portfolios across different currencies and asset types. The platform provides secure, modern, and user-friendly tools for complete financial visibility and control.

### 1.2 Business Need
Modern investors face challenges in:
- Managing portfolios across multiple currencies (particularly EGP and USD)
- Tracking diverse asset types in a unified platform
- Understanding real-time precious metals pricing in multiple units and currencies
- Gaining actionable insights from financial data
- Managing household finances with multiple profiles
- Tracking expenses, income, and savings goals holistically

### 1.3 Solution Overview
Wise Wealth delivers a comprehensive financial management platform featuring:
- Multi-currency asset tracking across 7+ asset categories
- Real-time precious metals pricing in EGP and USD across multiple units
- AI-driven financial insights and advisory
- Multi-profile user management for households
- Comprehensive expense and income tracking
- Goal-based savings and emergency fund management
- Modern, responsive UI with dark/light theme support

---

## 2. Project Overview

### 2.1 Product Vision
To become the premier multi-currency asset management platform that empowers investors and households to achieve complete financial visibility, make data-driven decisions, and optimize wealth across all asset classes and currencies.

### 2.2 Target Audience

#### Primary Users
- **Individual Investors**: Managing personal portfolios across multiple asset types
- **Household Financial Managers**: Tracking family finances, income, expenses, and goals
- **Multi-Currency Investors**: Those with assets in EGP, USD, and other currencies
- **Precious Metals Investors**: Traders and holders of gold, silver, and other metals
- **Small Business Owners**: Managing business investments and employee income

#### User Demographics
- Age: 25-65 years
- Financial Literacy: Intermediate to Advanced
- Geographic Focus: Egypt and Middle East (with global applicability)
- Device Usage: Desktop and mobile

### 2.3 Competitive Advantage
- **Multi-currency focus**: Native support for EGP and USD with seamless conversion
- **Precious metals specialization**: Comprehensive pricing across multiple units (gram, ounce, kilo, tola)
- **Holistic financial view**: Assets, expenses, income, and goals in one platform
- **AI-powered insights**: Intelligent recommendations and analysis
- **Multi-profile support**: Manage entire household finances
- **Modern UX**: Wise/Revolut-inspired design with smooth animations

---

## 3. Business Objectives

### 3.1 Primary Objectives
1. **Complete Financial Visibility**: Enable users to track 100% of their assets, expenses, and income in one platform
2. **Multi-Currency Mastery**: Provide accurate, real-time multi-currency support with seamless conversions
3. **Data-Driven Decisions**: Deliver actionable AI insights to optimize financial decisions
4. **User Adoption**: Achieve high user engagement and retention through superior UX
5. **Platform Scalability**: Build architecture that supports future growth and features

### 3.2 Key Results (Success Metrics)
- User completes asset portfolio setup within first 30 minutes
- 80%+ user retention after 30 days
- Average user tracks 5+ different asset types
- 70%+ of users utilize AI insights feature monthly
- Mobile responsive design achieves 90%+ usability score
- Page load times under 2 seconds for 95% of interactions

---

## 4. Stakeholders

### 4.1 Internal Stakeholders
- **Product Owner**: Defines features and priorities
- **Development Team**: Implements technical solution
- **UX/UI Designers**: Creates user experience and visual design
- **QA Team**: Ensures quality and performance
- **Security Team**: Validates security and compliance

### 4.2 External Stakeholders
- **End Users**: Individual investors and household financial managers
- **Data Providers**: Market data and precious metals pricing APIs
- **Compliance Bodies**: Financial data privacy regulations

---

## 5. Scope

### 5.1 In Scope

#### Phase 1: User Authentication & Authorization
- **Standard Authentication**: Secure email and password login and registration.
- **Social Authentication**: Integration with Google and Apple for seamless sign-in.
- **Session Management**: Secure handling of user sessions with auto-logout and persistence options.
- **Password Management**: Forgot password flows, reset capabilities, and strength validation.
- **Profile Management**: Basic user profile settings.

#### Future Phases (TBD)
- Asset Management System
- Expense Tracking
- Income Tracking
- Savings Goals
- AI Advisor

### 5.2 Out of Scope
❌ Direct trading or brokerage functionality  
❌ Tax filing or preparation  
❌ Legal or regulatory advice  
❌ Cryptocurrency wallet functionality  
❌ Payment processing or money transfers  
❌ Loan origination or credit services  

---

## 6. Functional Requirements

### 6.1 User Authentication & Authorization

#### 6.1.1 Registration & Identity
**FR-AUTH-001**: System shall support user registration via email and password.
**FR-AUTH-002**: System shall support OAuth 2.0 / OIDC registration providers:
- **Google**: Scopes `profile`, `email`, `openid`.
- **Apple**: Scopes `name`, `email`.
**FR-AUTH-003**: System shall verify email ownership via a time-limited OTP or magic link before activating the account (for email/password registration).
**FR-AUTH-004**: System shall prevent duplicate accounts by enforcing unique email constraints, handling existing social vs. email account linking gracefully.
**FR-AUTH-005**: System shall enforce a minimum age requirement (18+) during signup certification.

#### 6.1.2 Password & Security Policy
**FR-AUTH-006**: System shall enforce NIST Digital Identity Guidelines (SP 800-63B) for passwords:
- Minimum 12 characters.
- No composition rules (e.g., "must contain 1 number") if checking against a breached password list (HaveIBeenPwned API).
- Alternatively, enforce complexity: Upper, Lower, Number, Special Character.
- Rate limiting on failed attempts (exponential backoff).
**FR-AUTH-007**: System shall securely salt and hash passwords using **Argon2id** or **Bcrypt** (min work factor 12).
**FR-AUTH-008**: System shall implement a "Forgot Password" flow utilizing a short-lived (15 min), cryptographically secure token sent via email.
**FR-AUTH-009**: System shall strictly prohibit password reuse for the last 3 passwords.

#### 6.1.3 Session Management
**FR-AUTH-010**: System shall issue secure, HttpOnly, SameSite=Strict cookies for session management (JWT or opaque token).
**FR-AUTH-011**: System shall implement Access Tokens (short-lived: 15-30 min) and Refresh Tokens (long-lived: 7-30 days) with rotation.
**FR-AUTH-012**: System shall support "Remember Me" functionality extending Refresh Token validity to 30 days.
**FR-AUTH-013**: System shall automatically revoke sessions upon:
- Password change.
- Suspicious activity detection.
- User-initiated global logout ("Sign out of all devices").
**FR-AUTH-014**: System shall implement an inactivity timeout (auto-logout) after 30 minutes of idle time for sensitive sessions.

#### 6.1.4 Multi-Factor Authentication (MFA) [Roadmap]
**FR-AUTH-015**: System shall support Time-based One-Time Password (TOTP) apps (Google Authenticator, Authy).
**FR-AUTH-016**: Users shall be able to generate and download standard 8-digit backup codes.
**FR-AUTH-017**: MFA verification shall be required for:
- Login from a new device/IP.
- Sensitive account changes (e.g., changing password or email).

#### 6.1.5 Profile & Settings
**FR-AUTH-018**: Users shall be able to update their display name and profile picture.
**FR-AUTH-019**: Users shall be able to change their registered email address, requiring verification of the NEW email address before switching.
**FR-AUTH-020**: Users shall be able to delete their account, triggering a soft-delete grace period (7 days) before permanent data removal (GDPR compliance).  

### 6.2 Multi-Profile & User Management

#### 6.2.1 Profile Creation
**FR-PROFILE-001**: Users shall be able to create multiple financial profiles (Personal, Joint, Business, etc.)  
**FR-PROFILE-002**: Each profile shall support independent asset tracking  
**FR-PROFILE-003**: System shall support up to 10 profiles per user account  
**FR-PROFILE-004**: Each profile shall have customizable name and icon  

#### 6.2.2 Profile Switching
**FR-PROFILE-005**: Users shall be able to switch between profiles seamlessly  
**FR-PROFILE-006**: System shall maintain separate data isolation per profile  
**FR-PROFILE-007**: Dashboard shall display current active profile clearly  

#### 6.2.3 Shared Profiles
**FR-PROFILE-008**: Users shall be able to invite other users to shared profiles  
**FR-PROFILE-009**: Shared profiles shall support role-based permissions (Owner, Editor, Viewer)  
**FR-PROFILE-010**: Profile owners shall be able to remove shared users  

### 6.3 Asset Management System

#### 6.3.1 Asset Categories
The system shall support seven primary asset categories:

1. **Precious Metals**
2. **Stocks & Securities**
3. **Real Estate**
4. **Currencies & Cryptocurrency**
5. **Bank Accounts & Certificates of Deposit**
6. **Business Investments**
7. **Other Assets**

#### 6.3.2 Precious Metals Module

**FR-METAL-001**: System shall support tracking of:
- Gold
- Silver
- Platinum
- Palladium
- Other precious metals

**FR-METAL-002**: System shall display prices in multiple units:
- Gram
- Ounce (Troy)
- Kilogram
- Tola
- Custom units

**FR-METAL-003**: **CRITICAL**: System shall display all precious metals prices in BOTH EGP and USD simultaneously across ALL units  

**FR-METAL-004**: System shall support real-time price updates from market data providers  

**FR-METAL-005**: System shall track:
- Purchase date
- Quantity
- Purchase price per unit
- Current market price per unit
- Total value
- Gain/Loss (absolute and percentage)
- Purity (24K, 22K, 18K, etc. for gold)

**FR-METAL-006**: System shall support manual entry and bulk import  

**FR-METAL-007**: System shall display price charts with historical data (1D, 1W, 1M, 3M, 1Y, All)  

**FR-METAL-008**: Users shall be able to set price alerts for precious metals  

#### 6.3.3 Stocks & Securities Module

**FR-STOCK-001**: System shall support tracking of:
- Individual stocks
- ETFs
- Mutual funds
- Bonds
- Options [Future]

**FR-STOCK-002**: System shall integrate with market data APIs for real-time prices  

**FR-STOCK-003**: System shall track:
- Ticker symbol
- Quantity of shares
- Purchase price per share
- Current price per share
- Purchase date
- Market value
- Total gain/loss
- Dividend income

**FR-STOCK-004**: System shall support multiple stock exchanges (NYSE, NASDAQ, EGX, etc.)  

**FR-STOCK-005**: System shall display stock price charts and key metrics (P/E ratio, market cap, 52-week high/low)  

**FR-STOCK-006**: System shall calculate portfolio diversification by sector, region, and asset type  

#### 6.3.4 Real Estate Module

**FR-REALESTATE-001**: System shall support tracking of:
- Residential properties
- Commercial properties
- Land
- REITs

**FR-REALESTATE-002**: System shall track:
- Property address/location
- Purchase price
- Current estimated value
- Purchase date
- Property type
- Size (area)
- Rental income (if applicable)
- Property expenses (maintenance, taxes, insurance)

**FR-REALESTATE-003**: Users shall be able to upload property documents and images  

**FR-REALESTATE-004**: System shall calculate net property value (value - outstanding mortgage)  

**FR-REALESTATE-005**: System shall track rental yield and ROI  

#### 6.3.5 Currencies & Cryptocurrency Module

**FR-CURRENCY-001**: System shall support tracking of:
- Fiat currencies (USD, EUR, GBP, EGP, etc.)
- Cryptocurrencies (BTC, ETH, USDT, etc.)

**FR-CURRENCY-002**: System shall integrate with forex and crypto exchange APIs for real-time rates  

**FR-CURRENCY-003**: System shall track:
- Currency/Crypto type
- Amount held
- Purchase price/rate
- Current rate
- Total value in base currency
- Gain/Loss

**FR-CURRENCY-004**: System shall support conversion between any tracked currencies  

**FR-CURRENCY-005**: System shall display historical exchange rate charts  

#### 6.3.6 Bank Accounts & CDs Module

**FR-BANK-001**: System shall support tracking of:
- Checking accounts
- Savings accounts
- Certificates of Deposit (CDs)
- Money market accounts

**FR-BANK-002**: System shall track:
- Bank name
- Account type
- Account number (masked for security)
- Current balance
- Interest rate
- Maturity date (for CDs)
- Currency

**FR-BANK-003**: System shall calculate projected interest earnings  

**FR-BANK-004**: Users shall be able to link multiple bank accounts  

**FR-BANK-005**: System shall support manual balance updates and transaction history [Future: automatic sync]  

#### 6.3.7 Business Investments Module

**FR-BUSINESS-001**: System shall support tracking of:
- Private company equity
- Partnership investments
- Startup investments
- Business ownership

**FR-BUSINESS-002**: System shall track:
- Business name
- Investment amount
- Ownership percentage
- Current valuation
- Investment date
- Business type/sector
- ROI

**FR-BUSINESS-003**: Users shall be able to add notes and documents related to business investments  

#### 6.3.8 Other Assets Module

**FR-OTHER-001**: System shall support tracking of miscellaneous assets:
- Vehicles
- Art & collectibles
- Jewelry
- Intellectual property
- Other valuable items

**FR-OTHER-002**: System shall track:
- Asset name/description
- Category
- Purchase price
- Current estimated value
- Purchase date
- Notes

**FR-OTHER-003**: Users shall be able to upload photos and documents  

### 6.4 AddAssetModal - Universal Asset Entry System

#### 6.4.1 Modal Structure
**FR-MODAL-001**: System shall provide a unified modal for adding/editing all asset types  

**FR-MODAL-002**: Modal shall contain 4 primary tabs:
1. **Quick Add** - Simplified one-step entry
2. **Detailed Add** - Comprehensive multi-field forms
3. **Bulk Import** - CSV/Excel import functionality
4. **Recent** - Quick access to recently added assets

**FR-MODAL-003**: Modal shall contain 60+ dynamic forms across all asset types and subtypes  

**FR-MODAL-004**: Forms shall adapt based on asset type selection  

**FR-MODAL-005**: System shall validate all required fields before submission  

**FR-MODAL-006**: System shall provide helpful tooltips and field descriptions  

**FR-MODAL-007**: Users shall be able to save drafts and continue later  

#### 6.4.2 Quick Add Tab
**FR-MODAL-008**: Quick Add shall require only essential fields (asset type, name, quantity, value)  

**FR-MODAL-009**: System shall auto-populate remaining fields with sensible defaults  

**FR-MODAL-010**: Users shall be able to add an asset in under 30 seconds via Quick Add  

#### 6.4.3 Detailed Add Tab
**FR-MODAL-011**: Detailed Add shall provide comprehensive forms for each asset type  

**FR-MODAL-012**: Forms shall include:
- Basic information
- Financial details
- Dates and timelines
- Location/exchange information
- Notes and documents
- Custom fields

**FR-MODAL-013**: System shall support file uploads (images, PDFs, documents)  

#### 6.4.4 Bulk Import Tab
**FR-MODAL-014**: System shall support CSV import with predefined templates  

**FR-MODAL-015**: System shall provide downloadable CSV templates for each asset type  

**FR-MODAL-016**: System shall validate imported data and display errors/warnings  

**FR-MODAL-017**: Users shall be able to map CSV columns to asset fields  

**FR-MODAL-018**: System shall support Excel file import [Future]  

#### 6.4.5 Recent Tab
**FR-MODAL-019**: Recent tab shall display last 10 added/edited assets  

**FR-MODAL-020**: Users shall be able to duplicate recent entries for quick similar asset addition  

### 6.5 Dashboard & Portfolio Overview

#### 6.5.1 Main Dashboard
**FR-DASH-001**: Dashboard shall display total portfolio value in user's preferred currency  

**FR-DASH-002**: Dashboard shall show portfolio breakdown by asset category (pie/donut chart)  

**FR-DASH-003**: Dashboard shall display total gain/loss (absolute and percentage)  

**FR-DASH-004**: Dashboard shall show portfolio performance over time (line chart)  

**FR-DASH-005**: Dashboard shall display key metrics:
- Total assets count
- Top performing assets
- Worst performing assets
- Recent activity
- Upcoming events (CD maturity, dividend payments, etc.)

**FR-DASH-006**: Dashboard shall support time period filtering:
- Today
- This Week
- This Month
- This Quarter
- This Year
- All Time
- Custom Range

**FR-DASH-007**: Dashboard shall be fully responsive for mobile and desktop  

#### 6.5.2 Asset Category Boards
**FR-BOARD-001**: Each asset category shall have a dedicated board view  

**FR-BOARD-002**: Board shall display all assets in that category with key metrics  

**FR-BOARD-003**: Board shall support multiple view modes:
- Card view
- List view
- Table view

**FR-BOARD-004**: Board shall support sorting by:
- Name
- Value
- Gain/Loss
- Purchase date
- Performance

**FR-BOARD-005**: Board shall support filtering by:
- Date range
- Value range
- Gain/Loss range
- Custom tags

**FR-BOARD-006**: Users shall be able to search assets by name or attributes  

### 6.6 Expense Tracking System

#### 6.6.1 Expense Entry
**FR-EXPENSE-001**: Users shall be able to add expenses with:
- Amount
- Category (pre-defined and custom)
- Date
- Description/Notes
- Payment method
- Recipient/Vendor
- Receipt upload

**FR-EXPENSE-002**: System shall support expense categories:
- Housing (rent, mortgage, utilities)
- Transportation
- Food & Dining
- Healthcare
- Entertainment
- Education
- Shopping
- Travel
- Insurance
- Taxes
- Investments
- Charitable giving
- Personal care
- Other

**FR-EXPENSE-003**: Users shall be able to create custom expense categories  

**FR-EXPENSE-004**: System shall support recurring expenses (daily, weekly, monthly, yearly)  

**FR-EXPENSE-005**: Users shall be able to split expenses across multiple categories  

**FR-EXPENSE-006**: Users shall be able to tag expenses for better organization  

#### 6.6.2 Expense Dashboard
**FR-EXPENSE-007**: Expense dashboard shall display:
- Total expenses for selected period
- Expenses by category (pie chart)
- Expense trends over time (line chart)
- Top expense categories
- Budget vs actual spending

**FR-EXPENSE-008**: Users shall be able to set budget limits per category  

**FR-EXPENSE-009**: System shall alert users when approaching or exceeding budget limits  

**FR-EXPENSE-010**: Dashboard shall show spending patterns and insights  

#### 6.6.3 Expense AI Insights
**FR-EXPENSE-011**: AI shall analyze expense patterns and provide insights:
- Spending trend analysis
- Unusual spending detection
- Category optimization recommendations
- Budget allocation suggestions
- Savings opportunities

**FR-EXPENSE-012**: AI shall predict future expenses based on historical data  

**FR-EXPENSE-013**: Users shall receive monthly expense summary reports  

### 6.7 Income Tracking System

#### 6.7.1 Employee Income Tracking
**FR-INCOME-001**: System shall support tracking of employee income:
- Salary
- Bonuses
- Commissions
- Overtime
- Benefits

**FR-INCOME-002**: Users shall be able to add income entries with:
- Amount
- Source (employer)
- Income type
- Date received
- Tax withheld
- Net amount
- Notes

**FR-INCOME-003**: System shall support recurring income (weekly, bi-weekly, monthly, etc.)  

**FR-INCOME-004**: System shall track multiple income sources  

#### 6.7.2 Other Income Sources
**FR-INCOME-005**: System shall support tracking of:
- Rental income
- Dividend income
- Interest income
- Capital gains
- Business income
- Freelance/Contract income
- Gifts & inheritances
- Other income

**FR-INCOME-006**: System shall link investment income to respective assets automatically  

#### 6.7.3 Income Dashboard
**FR-INCOME-007**: Income dashboard shall display:
- Total income for selected period
- Income by source (chart)
- Income trends over time
- Net income (after taxes)
- Income vs expenses comparison

**FR-INCOME-008**: System shall calculate income tax estimates [Future]  

### 6.8 Savings Goals & Emergency Fund

#### 6.8.1 Savings Goals
**FR-SAVINGS-001**: Users shall be able to create savings goals with:
- Goal name
- Target amount
- Target date
- Current saved amount
- Category (e.g., vacation, home, car, education)
- Priority (low, medium, high)

**FR-SAVINGS-002**: System shall track progress towards each goal (percentage and amount)  

**FR-SAVINGS-003**: Users shall be able to make manual contributions to goals  

**FR-SAVINGS-004**: System shall suggest monthly savings amounts to reach goal by target date  

**FR-SAVINGS-005**: Users shall be able to link bank accounts to goals for automatic tracking  

**FR-SAVINGS-006**: System shall send reminders and notifications for goal milestones  

**FR-SAVINGS-007**: Users shall be able to pause or modify goals  

#### 6.8.2 Shared Savings Goals
**FR-SAVINGS-008**: Users shall be able to create shared savings goals with other users  

**FR-SAVINGS-009**: Shared goals shall support:
- Multiple contributors
- Individual contribution tracking
- Shared target amount
- Activity feed of contributions
- Comments and updates

**FR-SAVINGS-010**: Goal owner shall be able to manage permissions and contributors  

#### 6.8.3 Emergency Fund
**FR-EMERGENCY-001**: System shall support dedicated emergency fund tracking  

**FR-EMERGENCY-002**: System shall recommend emergency fund target (3-6 months of expenses)  

**FR-EMERGENCY-003**: System shall calculate recommended amount based on average monthly expenses  

**FR-EMERGENCY-004**: Users shall be able to set custom emergency fund target  

**FR-EMERGENCY-005**: Dashboard shall prominently display emergency fund status  

### 6.9 Medical Insurance Module

**FR-INSURANCE-001**: Users shall be able to add medical insurance policies with:
- Insurance provider
- Policy number
- Coverage type (individual, family, etc.)
- Premium amount
- Payment frequency
- Coverage start date
- Coverage end date
- Deductible
- Co-pay
- Out-of-pocket maximum
- Covered family members

**FR-INSURANCE-002**: System shall track premium payments  

**FR-INSURANCE-003**: System shall alert users before policy renewal dates  

**FR-INSURANCE-004**: Users shall be able to upload policy documents  

**FR-INSURANCE-005**: System shall track medical claims and reimbursements  

**FR-INSURANCE-006**: System shall calculate total healthcare costs (premiums + out-of-pocket)  

### 6.10 AI Financial Advisor

#### 6.10.1 AI Insights Page
**FR-AI-001**: System shall provide dedicated AI Insights page with:
- Portfolio analysis and recommendations
- Risk assessment
- Diversification suggestions
- Rebalancing recommendations
- Tax optimization opportunities [Future]

**FR-AI-002**: AI shall analyze entire financial picture (assets, expenses, income, goals)  

**FR-AI-003**: AI shall provide personalized recommendations based on:
- Risk tolerance
- Financial goals
- Current portfolio composition
- Market conditions
- Spending patterns

**FR-AI-004**: AI insights shall update automatically when portfolio changes  

**FR-AI-005**: Users shall be able to ask questions to AI advisor  

#### 6.10.2 AI Chat Interface
**FR-AI-006**: System shall provide conversational AI interface for financial questions  

**FR-AI-007**: AI shall answer questions about:
- Portfolio performance
- Spending habits
- Savings progress
- Investment opportunities
- Financial planning

**FR-AI-008**: AI shall provide source citations for recommendations  

**FR-AI-009**: Users shall be able to rate AI recommendations (helpful/not helpful)  

#### 6.10.3 Automated Insights
**FR-AI-010**: AI shall proactively notify users of:
- Significant portfolio changes
- Unusual spending patterns
- Goal progress milestones
- Market opportunities
- Risk alerts

**FR-AI-011**: AI shall generate monthly financial health reports  

**FR-AI-012**: AI shall provide scenario analysis (What if I invest X in Y?)  

### 6.11 Navigation & Search

#### 6.11.1 Sidebar Navigation
**FR-NAV-001**: System shall provide collapsible sidebar with main navigation menu  

**FR-NAV-002**: Sidebar shall include:
- Dashboard
- All Asset Categories (7 boards)
- Expenses
- Income
- Savings Goals
- Insurance
- AI Advisor
- Settings
- Profile

**FR-NAV-003**: Sidebar shall be fully responsive (hamburger menu on mobile)  

**FR-NAV-004**: Active page shall be visually highlighted in sidebar  

**FR-NAV-005**: Users shall be able to pin favorite pages for quick access  

#### 6.11.2 Command Palette
**FR-SEARCH-001**: System shall provide command palette accessible via keyboard shortcut (Cmd/Ctrl + K)  

**FR-SEARCH-002**: Command palette shall support:
- Global search across all assets, expenses, income
- Quick navigation to any page
- Quick actions (Add Asset, Add Expense, etc.)
- Settings shortcuts

**FR-SEARCH-003**: Search shall support fuzzy matching  

**FR-SEARCH-004**: Search results shall be categorized (Assets, Expenses, Pages, Actions)  

**FR-SEARCH-005**: Recent searches shall be saved and suggested  

**FR-SEARCH-006**: Search shall support keyboard navigation  

#### 6.11.3 User Profile Dropdown
**FR-NAV-006**: System shall provide user profile dropdown in header with:
- User name and email
- Profile switcher
- Settings link
- Theme toggle
- Help & support
- Logout

**FR-NAV-007**: Dropdown shall be accessible on all pages  

### 6.12 Time Period Filtering

**FR-FILTER-001**: All financial dashboards and boards shall support time period filtering  

**FR-FILTER-002**: Available time periods:
- Today
- Yesterday
- Last 7 days
- Last 30 days
- This Month
- Last Month
- This Quarter
- Last Quarter
- This Year
- Last Year
- All Time
- Custom Date Range

**FR-FILTER-003**: Selected time period shall persist across page navigation  

**FR-FILTER-004**: Time period filter shall be visually prominent and easy to change  

**FR-FILTER-005**: Charts and metrics shall update dynamically when time period changes  

### 6.13 Reporting & Export

**FR-REPORT-001**: Users shall be able to generate reports:
- Portfolio summary report
- Asset category reports
- Expense reports
- Income reports
- Tax reports [Future]
- Performance reports

**FR-REPORT-002**: Reports shall support all time period filters  

**FR-REPORT-003**: Users shall be able to export reports as:
- PDF
- Excel
- CSV

**FR-REPORT-004**: Reports shall include:
- Summary metrics
- Detailed tables
- Charts and visualizations
- Comparative analysis

**FR-REPORT-005**: Users shall be able to schedule automated monthly reports [Future]  

---

## 7. Non-Functional Requirements

### 7.1 Performance

**NFR-PERF-001**: Page load time shall be under 2 seconds for 95% of pages  
**NFR-PERF-002**: Dashboard shall load completely within 3 seconds  
**NFR-PERF-003**: Search results shall appear within 500ms  
**NFR-PERF-004**: Asset modal shall open within 200ms  
**NFR-PERF-005**: System shall support portfolios with up to 1,000 assets without degradation  
**NFR-PERF-006**: Charts shall render within 1 second  
**NFR-PERF-007**: API calls shall have 5-second timeout  
**NFR-PERF-008**: System shall implement lazy loading for images and components  
**NFR-PERF-009**: System shall cache frequently accessed data  

### 7.2 Usability

**NFR-USABILITY-001**: Application shall achieve SUS (System Usability Scale) score of 80+  
**NFR-USABILITY-002**: New users shall be able to add their first asset within 5 minutes  
**NFR-USABILITY-003**: UI shall follow WCAG 2.1 Level AA accessibility standards  
**NFR-USABILITY-004**: All interactive elements shall have visible focus states  
**NFR-USABILITY-005**: Error messages shall be clear, specific, and actionable  
**NFR-USABILITY-006**: Forms shall provide inline validation  
**NFR-USABILITY-007**: System shall provide contextual help and tooltips  
**NFR-USABILITY-008**: UI shall be consistent across all pages  

### 7.3 Responsive Design

**NFR-RESPONSIVE-001**: Application shall be fully functional on desktop (1920x1080 and above)  
**NFR-RESPONSIVE-002**: Application shall be fully functional on tablets (768px - 1024px)  
**NFR-RESPONSIVE-003**: Application shall be fully functional on mobile (320px - 767px)  
**NFR-RESPONSIVE-004**: Touch targets shall be minimum 44x44px on mobile  
**NFR-RESPONSIVE-005**: Text shall be readable without zooming (minimum 16px base)  
**NFR-RESPONSIVE-006**: Navigation shall adapt appropriately for mobile (hamburger menu)  
**NFR-RESPONSIVE-007**: Tables shall be scrollable or stacked on mobile  
**NFR-RESPONSIVE-008**: Charts shall be readable and interactive on all screen sizes  

### 7.4 Security

**NFR-SECURITY-001**: All data transmission shall use HTTPS/TLS 1.3  
**NFR-SECURITY-002**: Passwords shall be hashed using bcrypt with minimum cost factor of 12  
**NFR-SECURITY-003**: Session tokens shall expire after 30 minutes of inactivity  
**NFR-SECURITY-004**: System shall implement CSRF protection  
**NFR-SECURITY-005**: System shall implement rate limiting on all API endpoints  
**NFR-SECURITY-006**: System shall sanitize all user inputs to prevent XSS  
**NFR-SECURITY-007**: System shall validate all API requests for authorization  
**NFR-SECURITY-008**: Sensitive data (account numbers) shall be masked in UI  
**NFR-SECURITY-009**: System shall log all authentication attempts  
**NFR-SECURITY-010**: System shall implement multi-factor authentication [Future]  
**NFR-SECURITY-011**: API keys and secrets shall never be exposed in client code  
**NFR-SECURITY-012**: System shall comply with data encryption at rest standards [Future]  

### 7.5 Reliability

**NFR-RELIABILITY-001**: System uptime shall be 99.5% or higher  
**NFR-RELIABILITY-002**: System shall handle graceful degradation when external APIs fail  
**NFR-RELIABILITY-003**: System shall provide offline capability for viewing cached data [Future]  
**NFR-RELIABILITY-004**: System shall auto-save user data every 30 seconds during entry  
**NFR-RELIABILITY-005**: System shall provide error boundaries to prevent full app crashes  
**NFR-RELIABILITY-006**: Data integrity checks shall run on all transactions  

### 7.6 Scalability

**NFR-SCALE-001**: System architecture shall support 10,000+ concurrent users [Future]  
**NFR-SCALE-002**: Database shall support millions of asset records  
**NFR-SCALE-003**: System shall implement horizontal scaling capabilities [Future]  
**NFR-SCALE-004**: System shall use CDN for static assets [Future]  

### 7.7 Maintainability

**NFR-MAINTAIN-001**: Code shall follow consistent style guide (ESLint + Prettier)  
**NFR-MAINTAIN-002**: All components shall be documented with JSDoc comments  
**NFR-MAINTAIN-003**: Code coverage shall be minimum 70% [Future]  
**NFR-MAINTAIN-004**: System shall use TypeScript for type safety  
**NFR-MAINTAIN-005**: Git commits shall follow conventional commit standards  

### 7.8 Browser Compatibility

**NFR-BROWSER-001**: Application shall support latest 2 versions of:
- Chrome
- Firefox
- Safari
- Edge

**NFR-BROWSER-002**: Application shall gracefully degrade on older browsers  

### 7.9 Data Privacy

**NFR-PRIVACY-001**: System shall not collect PII beyond what's necessary for functionality  
**NFR-PRIVACY-002**: Users shall be able to export their data  
**NFR-PRIVACY-003**: Users shall be able to delete their account and all associated data  
**NFR-PRIVACY-004**: System shall provide privacy policy and terms of service  
**NFR-PRIVACY-005**: System shall comply with GDPR for EU users [Future]  

### 7.10 Internationalization

**NFR-I18N-001**: System shall support multiple currencies (EGP, USD, EUR, GBP, etc.)  
**NFR-I18N-002**: Currency formatting shall follow locale standards  
**NFR-I18N-003**: Date/time formatting shall follow locale standards  
**NFR-I18N-004**: System shall support RTL languages (Arabic) [Future]  
**NFR-I18N-005**: System shall support multiple languages (English, Arabic) [Future]  

### 7.11 Animation & UX Polish

**NFR-ANIMATION-001**: All page transitions shall include smooth entry/exit animations  
**NFR-ANIMATION-002**: Animations shall not cause layout shifts (CLS score < 0.1)  
**NFR-ANIMATION-003**: Users shall be able to disable animations (respect prefers-reduced-motion)  
**NFR-ANIMATION-004**: Loading states shall be visually indicated with skeletons or spinners  
**NFR-ANIMATION-005**: Interactive feedback shall be immediate (< 100ms)  
**NFR-ANIMATION-006**: Animations shall use GPU-accelerated properties (transform, opacity)  
**NFR-ANIMATION-007**: Micro-interactions shall enhance usability (hover states, button press effects)  

---

## 8. User Stories

### 8.1 Epic 1: Access & Identity Management

**US-001**: As a new user, I want to sign up with my email and password so that I can create a secure account.
- *Acceptance Criteria*:
    - Email format validation.
    - Password strength indicator (NIST guidelines).
    - Email verification link sent upon submission.

**US-002**: As a user, I want to sign up/login using Google or Apple so that I can access the platform quickly without remembering another password.
- *Acceptance Criteria*:
    - One-click OAuth flow.
    - Account auto-creation if not exists.
    - Profile picture and name imported automatically.

**US-003**: As a registered user, I want to log in securely so that I can access my private financial data.
- *Acceptance Criteria*:
    - Rate limiting triggers after 5 failed attempts.
    - "Remember Me" option keeps session active for 30 days.

**US-004**: As a forgetful user, I want to reset my password via email so that I can regain access to my account.
- *Acceptance Criteria*:
    - Secure token generation.
    - Link expires in 15 minutes.
    - New password cannot be one of the last 3 used.

**US-005**: As a security-conscious user, I want to see a list of my active sessions (devices) so that I can revoke access to unrecognized ones.
- *Acceptance Criteria*:
    - Display IP, Device Type, Location, and Last Active time.
    - "Revoke" button for each session.
    - "Log out of all devices" button.

**US-006**: As a user, I want to be automatically logged out after 30 minutes of inactivity so that my data is safe if I walk away.
- *Acceptance Criteria*:
    - Idle timer resets on user interaction.
    - Warning modal appears 2 minutes before logout.

**US-007**: As a user, I want to update my profile details (Name, Photo) so that I can personalize my account.
- *Acceptance Criteria*:
    - Image upload with size/type validation.

**US-008**: As a user, I want to change my email address securely so that I can maintain access if my email changes.
- *Acceptance Criteria*:
    - Re-authentication required before change.
**US-009**: As a user, I want to permanently delete my account and data so that I can exercise my right to be forgotten (GDPR/Apple requirement).
- *Acceptance Criteria*:
    - "Delete Account" option in settings (danger zone).
    - Hard confirmation modal (type "DELETE").
    - 7-day soft delete grace period before permanent purge.

**US-010**: As a user, I want to link my Google/Apple account to my existing email account so that I can use multiple login methods.
- *Acceptance Criteria*:
    - "Connected Accounts" section in settings.
    - Verification that the email addresses match.
    - Option to unlink social providers (unless it's the only login method).

**US-011**: As a user waiting for a verification email, I want to request a new link so that I can proceed if the first one expired or didn't arrive.
- *Acceptance Criteria*:
    - "Resend Email" button enabled after 60 seconds (rate limiting).
    - Clear feedback message ("Email sent").

**US-012**: As a new user, I must explicitly agree to the Terms of Service and Privacy Policy so that the platform is legally compliant.
- *Acceptance Criteria*:
    - Checkbox in Signup form (unchecked by default).
    - Links to "Terms" and "Privacy" open in new tabs.
    - "Sign Up" button disabled until checked.

**US-013**: As a user attempting to log in, I want clear feedback if my account is locked or credentials are invalid so that I know what to fix.
- *Acceptance Criteria*:
    - Generic error message for invalid credentials ("Invalid email or password").
    - specific message for "Account Locked" instructions.
    - specific message for "Email not verified".
### 8.2 Epic 2: Portfolio Monitoring & Analysis

**US-009**: As an investor, I want to see my total portfolio value at a glance so that I know my net worth  
**US-010**: As a user, I want to view my portfolio breakdown by asset category so that I understand my allocation  
**US-011**: As an investor, I want to see my total gains and losses so that I can evaluate my performance  
**US-012**: As a user, I want to filter portfolio data by time period so that I can analyze specific timeframes  
**US-013**: As a precious metals investor, I want to see real-time gold prices in EGP and USD per gram, ounce, kilo, and tola so that I can make informed decisions  
**US-014**: As a user, I want to view each asset category on its own board so that I can focus on specific asset types  
**US-015**: As a user, I want to search for specific assets quickly so that I can find what I need  

### 8.3 Epic 3: Expense & Income Tracking

**US-016**: As a household manager, I want to track my daily expenses by category so that I understand where my money goes  
**US-017**: As a user, I want to set budget limits per category so that I can control my spending  
**US-018**: As a user, I want to receive alerts when I approach budget limits so that I can adjust my spending  
**US-019**: As an employee, I want to track my salary and bonuses so that I have a complete income record  
**US-020**: As a user, I want to see income vs expenses comparison so that I know if I'm saving or overspending  
**US-021**: As a user, I want to upload receipts to expense entries so that I have documentation  
**US-022**: As a user, I want AI to analyze my spending patterns and suggest improvements so that I can optimize my finances  

### 8.4 Epic 4: Goals & Planning

**US-023**: As a saver, I want to create savings goals with target amounts and dates so that I can work towards specific objectives  
**US-024**: As a user, I want to track my progress towards each goal so that I stay motivated  
**US-025**: As a family member, I want to create shared savings goals so that we can save together for common objectives  
**US-026**: As a user, I want the system to recommend an emergency fund target based on my expenses so that I'm financially prepared  
**US-027**: As a user, I want to see how much I need to save monthly to reach my goals so that I can plan accordingly  

### 8.5 Epic 5: AI Insights & Recommendations

**US-028**: As an investor, I want AI to analyze my portfolio and suggest rebalancing so that I maintain optimal allocation  
**US-029**: As a user, I want AI to identify unusual spending patterns so that I can catch potential issues  
**US-030**: As a user, I want to ask the AI advisor financial questions so that I can get personalized guidance  
**US-031**: As an investor, I want AI to assess my portfolio risk so that I understand my exposure  
**US-032**: As a user, I want monthly AI-generated financial health reports so that I can track my progress over time  

### 8.6 Epic 6: Multi-Profile & Collaboration

**US-033**: As a user, I want to create separate profiles for personal and business finances so that I can keep them organized  
**US-034**: As a household manager, I want to switch between family member profiles so that I can manage everyone's finances  
**US-035**: As a user, I want to invite my spouse to a shared profile so that we can manage joint finances together  
**US-036**: As a profile owner, I want to set permissions for shared users so that I control what they can do  

### 8.7 Epic 7: Insurance & Healthcare

**US-037**: As a user, I want to track my medical insurance policy so that I know my coverage details  
**US-038**: As a user, I want to see when my insurance policy is up for renewal so that I don't miss it  
**US-039**: As a user, I want to track medical claims and reimbursements so that I know my out-of-pocket costs  

### 8.8 Epic 8: Mobile & Accessibility

**US-040**: As a mobile user, I want to access all features on my phone so that I can manage finances on the go  
**US-041**: As a user, I want dark and light themes so that I can use the app comfortably in any environment  
**US-042**: As a keyboard user, I want to navigate with keyboard shortcuts so that I can be efficient  
**US-043**: As a user with vision impairment, I want screen reader support so that I can use the app  

---

## 9. Technical Architecture

### 9.1 Technology Stack


#### Frontend
- Refer to `project-docs/tech-stack.md` for the authoritative technology stack rules.

### 9.2 Architecture Patterns

**Pattern**: Component-Based Architecture  
**Principle**: Separation of Concerns  
**Approach**: Presentational and Container Components  

### 9.3 Folder Structure

```
/
├── src/
│   ├── App.tsx                 # Main app component with routing
│   ├── main.tsx               # Entry point
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components (buttons, inputs, cards)
│   │   ├── layout/           # Layout components (MainLayout, Sidebar, Header)
│   │   ├── modals/           # Modal components (AddAssetModal, etc.)
│   │   ├── charts/           # Chart components
│   │   ├── animations/       # Animation wrappers (AnimatedPage, AnimatedCard)
│   │   └── shared/           # Shared business components
│   ├── pages/                # Page components
│   │   ├── Dashboard.tsx
│   │   ├── PreciousMetalsBoard.tsx
│   │   ├── StocksBoard.tsx
│   │   ├── ExpensesPage.tsx
│   │   ├── IncomePage.tsx
│   │   ├── SavingsGoalsPage.tsx
│   │   ├── AIAdvisorPage.tsx
│   │   └── ...
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Utility functions
│   │   ├── animation-variants.ts
│   │   ├── currency.ts
│   │   ├── date.ts
│   │   └── ...
│   ├── types/                # TypeScript type definitions
│   ├── services/             # API services
│   ├── context/              # React context providers
│   ├── styles/               # Global styles
│   │   └── globals.css       # Tailwind config and design tokens
│   └── assets/               # Static assets
├── public/                   # Public static files
└── package.json
```

### 9.4 Data Models

#### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  profilePicture?: string;
  preferredCurrency: 'EGP' | 'USD' | 'EUR';
  theme: 'light' | 'dark';
  createdAt: Date;
  updatedAt: Date;
}
```

#### Profile
```typescript
interface Profile {
  id: string;
  userId: string;
  name: string;
  icon: string;
  type: 'personal' | 'joint' | 'business';
  isDefault: boolean;
  createdAt: Date;
}
```

#### Asset (Base)
```typescript
interface Asset {
  id: string;
  profileId: string;
  category: AssetCategory;
  type: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: Date;
  currentValue: number;
  currency: string;
  notes?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

type AssetCategory = 
  | 'precious_metals'
  | 'stocks'
  | 'real_estate'
  | 'currencies'
  | 'bank_accounts'
  | 'business'
  | 'other';
```

#### PreciousMetal (extends Asset)
```typescript
interface PreciousMetal extends Asset {
  category: 'precious_metals';
  metalType: 'gold' | 'silver' | 'platinum' | 'palladium';
  unit: 'gram' | 'ounce' | 'kilo' | 'tola';
  purity?: string; // e.g., '24K', '22K'
  pricePerUnitEGP: number;
  pricePerUnitUSD: number;
  currentPricePerUnitEGP: number;
  currentPricePerUnitUSD: number;
}
```

#### Expense
```typescript
interface Expense {
  id: string;
  profileId: string;
  amount: number;
  currency: string;
  category: string;
  subcategory?: string;
  date: Date;
  description: string;
  paymentMethod?: string;
  vendor?: string;
  receipt?: string; // File URL
  isRecurring: boolean;
  recurringFrequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  tags?: string[];
  createdAt: Date;
}
```

#### Income
```typescript
interface Income {
  id: string;
  profileId: string;
  amount: number;
  currency: string;
  source: string;
  type: 'salary' | 'bonus' | 'dividend' | 'rental' | 'business' | 'other';
  date: Date;
  taxWithheld?: number;
  netAmount: number;
  isRecurring: boolean;
  recurringFrequency?: string;
  notes?: string;
  createdAt: Date;
}
```

#### SavingsGoal
```typescript
interface SavingsGoal {
  id: string;
  profileId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  targetDate: Date;
  category: string;
  priority: 'low' | 'medium' | 'high';
  isShared: boolean;
  sharedWith?: string[]; // User IDs
  createdAt: Date;
  updatedAt: Date;
}
```

### 9.5 API Integration Strategy

**Real-time Data**: External APIs called on page load and refreshed every 60 seconds  
**Caching**: API responses cached for 5 minutes to reduce calls  
**Error Handling**: Graceful fallback to last known prices if API fails  
**Rate Limiting**: Respect API rate limits with queuing system  

### 9.6 State Management Strategy

- **Local Component State**: useState for UI state
- **Global App State**: Context API for theme, user, profile
- **Server State**: React Query for API data [Future]
- **Form State**: React Hook Form for all forms

---

## 10. Design Requirements

### 10.1 Visual Design Language

**Design Inspiration**: Wise, Revolut, Modern Financial Apps

**Color Palette**:
- **Primary**: Blue/Navy (#1E3A8A, #3B82F6)
- **Accent**: Teal (#14B8A6), Gold (#F59E0B)
- **Success**: Green (#10B981)
- **Warning**: Amber (#F59E0B)
- **Error**: Red (#EF4444)
- **Neutral**: Gray scale (#F9FAFB to #111827)

**Light Theme**:
- Background: White (#FFFFFF)
- Surface: Light Gray (#F9FAFB)
- Text Primary: Dark Gray (#111827)
- Text Secondary: Medium Gray (#6B7280)

**Dark Theme**:
- Background: Dark Navy (#0F172A)
- Surface: Dark Blue (#1E293B)
- Text Primary: White (#FFFFFF)
- Text Secondary: Light Gray (#CBD5E1)

### 10.2 Typography

**Font Family**: Inter, system-ui, sans-serif

**Scale** (defined in globals.css):
- H1: 2rem (32px)
- H2: 1.5rem (24px)
- H3: 1.25rem (20px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)
- Tiny: 0.75rem (12px)

**Font Weights**:
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### 10.3 Spacing System

Based on 4px base unit:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

### 10.4 Component Design Patterns

**Cards**:
- Rounded corners (8px - 16px)
- Subtle shadows
- White/Surface background
- Padding: 16-24px
- Hover state with slight elevation increase

**Buttons**:
- Primary: Blue with white text
- Secondary: Gray with dark text
- Outline: Border with transparent background
- Rounded: 6-8px
- Padding: 8px 16px (small), 12px 24px (medium), 16px 32px (large)

**Forms**:
- Input fields with border
- Focus state with blue ring
- Inline validation
- Error states in red
- Helper text below inputs

**Charts**:
- Consistent color palette
- Tooltips on hover
- Responsive sizing
- Legend when needed
- Axis labels

**Navigation**:
- Sidebar: 240px width (desktop), collapsible
- Icons: 20-24px
- Active state: Background highlight + icon color change
- Hover state: Background lightness change

### 10.5 Animation Principles

**Timing**:
- Micro-interactions: 100-200ms
- Page transitions: 300-400ms
- Modal open/close: 200-300ms
- Smooth, ease-out easing

**Types**:
- Fade in/out (opacity)
- Slide in/out (transform: translateX/Y)
- Scale (transform: scale)
- Stagger for lists

**Performance**:
- Use transform and opacity only
- Avoid animating width, height, top, left
- Use will-change sparingly
- Respect prefers-reduced-motion

### 10.6 Iconography

**Source**: Lucide React  
**Size**: 16px (small), 20px (medium), 24px (large)  
**Style**: Outline/stroke  
**Usage**: Consistent icons for actions (Plus for add, Trash for delete, Edit for edit)

### 10.7 Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+
- Large Desktop: 1440px+

### 10.8 Accessibility

- **Color Contrast**: WCAG AA (4.5:1 for text)
- **Focus Indicators**: Visible blue ring
- **Alt Text**: All images have descriptive alt text
- **Keyboard Navigation**: Full keyboard support
- **ARIA Labels**: Proper ARIA attributes
- **Screen Reader**: Semantic HTML

---

## 11. Data Requirements

### 11.1 Data Storage

**Primary Storage**: Browser LocalStorage (current), Supabase PostgreSQL (future)  
**File Storage**: Supabase Storage (future)  
**Cache**: Browser Cache API  

### 11.2 Data Volume Estimates

- Users: 10,000+ (Year 1)
- Assets per user: Average 20, Max 1,000
- Expenses per user: Average 500/year
- Income entries per user: Average 50/year
- Total database size: ~10GB (Year 1)

### 11.3 Data Retention

- User data: Indefinite (until user deletes account)
- Deleted items: Soft delete with 30-day recovery period
- API cache: 5 minutes
- Session data: 30 days

### 11.4 Backup & Recovery

- Automated daily backups [Future]
- Point-in-time recovery [Future]
- User-initiated export anytime

---

## 12. Security & Compliance

### 12.1 Authentication & Authorization

### 1.1 Goal
To create "Wise Wealth," a premium, secure, and user-centric asset management platform. The initial release (MVP) focuses on a robust Authentication System, establishing trust through security and a high-end "Deep Navy" visual identity.

### 1.2 Core Value Proposition
*   **Security First**: Adaptive Multi-Factor Authentication (MFA) protects user assets by challenging unknown devices.
*   **Premium Experience**: A "Deep Navy" dark-mode aesthetic with Electric Blue accents and glassmorphism elements communicates stability and sophistication.
*   **Seamless Access**: Frictionless "Continue with Google" integration alongside secure Email/Password flows.

## 2. Functional Requirements

### 2.1 Authentication & Identity (Epic 1 - COMPLETED)
All users must be authenticated to access the dashboard.
*   **Sign Up**: Simple Email/Password registration (reduced friction, no name fields initially) with mandatory email verification (6-digit OTP).
*   **Login**:
    *   **Email/Password**: Standard secure login.
    *   **Social Login**: Google OAuth (One-tap integration). *Apple Login removed per simplified scope.*
    *   **Adaptive MFA**: System detects "Unknown Devices" (via cookie). If a user logs in from a new device, they are challenged with a secondary Email OTP before accessing the dashboard. Known devices bypass this step for convenience.
*   **Password Management**:
    *   Self-service Forgot Password flow via email link (PKCE secure).
    *   "Password Changed" email notifications for security awareness.
*   **Session Management**: Secure, HTTP-only cookies with persisted sessions.
*   **Security Config**:
    *   User Enumeration Protection is **ON** (generic error messages on UI, specific feedback via email).
    *   SMTP configured via Resend for reliable delivery.

### 2.2 User Interface & Experience
*   **Theme**: "Deep Navy" (Dark Mode by default).
    *   Background: `#020617` (Slate 950/Black).
    *   Card Surface: `#0f172a` (Slate 900) with Glassmorphism (`backdrop-blur`).
    *   Primary Accent: `#3B82F6` (Electric Blue) for trusted actions.
    *   Text: White/Grey hierarchy for readability.
*   **Interaction**: Framer Motion animations for smooth page transitions and input focus states.
*   **Feedback**: Toast notifications (Sonner) for all success/error states (e.g., "Login Failed", "Email Sent").

### 12.2 Data Security

- **Encryption in Transit**: TLS 1.3
- **Encryption at Rest**: AES-256 [Future]
- **Data Masking**: Sensitive fields (account numbers) masked in UI
- **Input Validation**: All inputs sanitized and validated
- **SQL Injection Prevention**: Parameterized queries
- **XSS Prevention**: Output encoding, CSP headers

### 12.3 Privacy & Compliance

- **PII Handling**: Minimize collection, secure storage
- **User Consent**: Clear terms of service and privacy policy
- **Data Export**: Users can export all their data
- **Data Deletion**: Users can delete account and all data
- **GDPR Compliance**: Right to access, rectification, erasure [Future for EU users]

### 12.4 Audit & Monitoring

- **Authentication Logs**: All login attempts logged
- **Activity Logs**: Significant actions logged (asset add/edit/delete)
- **Error Monitoring**: Sentry or similar [Future]
- **Security Scanning**: Regular dependency vulnerability scans

### 12.5 Disclaimer

**Important**: Wise Wealth is designed for personal financial tracking and is NOT intended for:
- Collecting or storing sensitive PII at scale
- Highly regulated financial data requiring strict compliance
- Production financial services requiring certifications

Users are responsible for the security of their own data and should use strong passwords and secure devices.

---

## 13. Success Metrics

### 13.1 User Engagement Metrics

- **Daily Active Users (DAU)**: Target 40% of registered users
- **Monthly Active Users (MAU)**: Target 70% of registered users
- **Session Duration**: Average 8+ minutes
- **Sessions per User per Week**: Average 4+
- **Feature Adoption**: 60%+ users use AI Advisor, 80%+ use expense tracking

### 13.2 Business Metrics

- **User Acquisition**: 1,000 users in first 3 months
- **User Retention**: 70% after 30 days, 50% after 90 days
- **User Growth Rate**: 20% MoM
- **Net Promoter Score (NPS)**: 40+

### 13.3 Technical Metrics

- **Page Load Time**: p95 under 2 seconds
- **API Response Time**: p95 under 500ms
- **Error Rate**: < 1% of requests
- **Uptime**: 99.5%+
- **Crash-Free Sessions**: 99.9%+

### 13.4 Product Metrics

- **Time to First Asset**: Average under 5 minutes
- **Assets per User**: Average 20+ after 1 month
- **Portfolio Value Tracked**: Average $50,000+ per user
- **Expense Entries per Month**: Average 30+ per active user
- **Goals Created**: Average 3+ per user

---

## 14. Assumptions & Constraints

### 14.1 Assumptions

- Users have modern web browsers (latest 2 versions)
- Users have stable internet connection for real-time data
- External APIs (precious metals, stocks) have 99%+ uptime
- Users are comfortable with English language UI
- Users understand basic financial concepts
- Most users will access from desktop initially, mobile usage will grow

### 14.2 Constraints

**Technical**:
- Frontend-only architecture initially (no backend/database until Supabase integration)
- LocalStorage limits (~10MB per domain)
- External API rate limits (may affect real-time updates)
- Browser compatibility requirements

**Business**:
- Limited budget for paid APIs initially
- No legal/tax advisory capabilities
- No direct integration with banks initially
- Cannot provide guaranteed data accuracy from external sources

**Regulatory**:
- Not a licensed financial advisor or institution
- Cannot provide personalized investment advice
- Not responsible for user financial decisions
- Must display appropriate disclaimers

**Time**:
- Full feature set delivered in phases
- Animation system implementation in current phase
- Advanced features (banking integration, tax tools) in future phases

---

## 15. Risks & Mitigation

### 15.1 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| External API failures | High | Medium | Cache last known prices, display stale data warning, use multiple provider fallbacks |
| Performance degradation with large datasets | High | Medium | Implement pagination, virtualization, lazy loading, data archiving |
| Browser compatibility issues | Medium | Low | Comprehensive testing, progressive enhancement, polyfills |
| Security vulnerabilities | High | Medium | Regular security audits, dependency updates, penetration testing |
| LocalStorage data loss | High | Low | Implement export/backup reminders, migrate to Supabase soon |

### 15.2 Business Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Low user adoption | High | Medium | User research, marketing, referral program, continuous UX improvements |
| Poor user retention | High | Medium | Engagement features, notifications, AI insights to add value, community building |
| API costs exceed budget | Medium | Low | Monitor usage, implement caching aggressively, negotiate better rates |
| Competitive pressure | Medium | Medium | Focus on differentiation (multi-currency, precious metals), rapid feature development |

### 15.3 Legal & Compliance Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Privacy regulation violations | High | Low | Clear privacy policy, minimal PII collection, user consent, GDPR compliance [Future] |
| Liability for financial advice | High | Low | Clear disclaimers, no personalized advice, educational content only |
| Data breach | High | Low | Strong security measures, encryption, regular audits, incident response plan |

### 15.4 User Experience Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Complexity overwhelms users | High | Medium | Progressive disclosure, onboarding flow, contextual help, Quick Add options |
| Mobile UX not meeting expectations | Medium | Low | Mobile-first design testing, touch-friendly UI, responsive testing |
| Slow performance frustrates users | High | Medium | Performance budgets, optimization, lazy loading, CDN [Future] |

---

## 16. Implementation Roadmap

### Phase 1: Foundation 🚧 PARTIALLY COMPLETED
**Duration**: In Progress
**Status**: Current Phase

- [x] Project setup (Next.js 15, TypeScript, Tailwind v4)
- [x] Design system and globals.css (Deep Navy Theme)
- [x] Authentication system (Login, Signup, Reset, Google OAuth, MFA)
- [/] Main layout with responsive sidebar (Auth Layout done, Dashboard Layout pending)
- [ ] Dashboard with portfolio overview
- [ ] 7 asset category boards
- [ ] AddAssetModal with 4-tab, 60+ form system
- [ ] Basic asset CRUD operations
- [ ] User profile management
- [x] Theme verification (Dark mode enforcement)
- [ ] Multi-profile system
- [ ] Expense tracking system
- [ ] Income tracking system
- [ ] Savings goals & emergency fund
- [ ] Medical insurance module
- [ ] Shared savings goals
- [ ] AI Financial Advisor page
- [ ] Command palette/search
- [ ] Time period filters
- [ ] AI Insights page
- [ ] Full mobile responsiveness (Auth only)

### Phase 2: Polish & Optimization 🔄 IN PROGRESS
**Duration**: 2-3 weeks  
**Status**: Current Phase

- [🔄] Animation system implementation
  - [x] Animation utilities (animation-variants.ts) - needs restoration
  - [x] AnimatedPage wrapper - needs restoration
  - [x] AnimatedCard wrapper - needs restoration
  - [x] AnimatedList wrapper - needs restoration
  - [ ] App.tsx integration with AnimatePresence
  - [ ] Type-safe animation variants
  - [ ] Performance optimization (prevent layout shifts)
  - [ ] Respect prefers-reduced-motion
- [ ] Performance optimization
  - [ ] Code splitting and lazy loading
  - [ ] Image optimization
  - [ ] Bundle size reduction
  - [ ] API response caching
- [ ] Advanced UI polish
  - [ ] Loading skeletons for all pages
  - [ ] Empty states for all boards
  - [ ] Error states and retry logic
  - [ ] Toast notifications system
- [ ] Testing
  - [ ] Unit tests for utilities
  - [ ] Component tests
  - [ ] E2E tests for critical flows
- [ ] Documentation
  - [ ] Code documentation
  - [ ] User guide
  - [ ] API documentation

### Phase 3: Backend Integration 📋 PLANNED
**Duration**: 4-6 weeks  
**Status**: Not Started

- [ ] Supabase setup
  - [ ] Database schema design
  - [ ] Row Level Security policies
  - [ ] Database migrations
- [ ] Supabase Auth integration
  - [ ] Replace mock auth with Supabase Auth
  - [ ] Social login (Google, Apple)
  - [ ] Email verification
  - [ ] Password reset flow
- [ ] Data persistence
  - [ ] Migrate from LocalStorage to Supabase
  - [ ] Real-time subscriptions
  - [ ] Offline support with sync
- [ ] File storage
  - [ ] Profile pictures
  - [ ] Receipt uploads
  - [ ] Document storage
- [ ] API development
  - [ ] Precious metals pricing API integration
  - [ ] Stock market data API integration
  - [ ] Currency/crypto API integration
  - [ ] Custom Supabase Edge Functions

### Phase 4: Advanced Features 📋 PLANNED
**Duration**: 6-8 weeks  
**Status**: Not Started

- [ ] Advanced analytics
  - [ ] Portfolio performance reports
  - [ ] Benchmark comparisons
  - [ ] Risk analysis tools
  - [ ] Correlation analysis
- [ ] Export & reporting
  - [ ] PDF export
  - [ ] Excel export
  - [ ] CSV export
  - [ ] Scheduled reports
- [ ] Notifications system
  - [ ] Email notifications
  - [ ] Push notifications
  - [ ] Price alerts
  - [ ] Goal milestone alerts
  - [ ] Budget alerts
- [ ] Advanced AI features
  - [ ] Predictive analytics
  - [ ] Scenario modeling
  - [ ] Portfolio optimization suggestions
  - [ ] Anomaly detection
- [ ] Collaboration features
  - [ ] Comments on assets
  - [ ] Activity feed
  - [ ] Shared insights
- [ ] Banking integration [Exploration]
  - [ ] Plaid/Yodlee integration research
  - [ ] Automatic transaction import
  - [ ] Account balance sync

### Phase 5: Internationalization & Scale 📋 FUTURE
**Duration**: 4-6 weeks  
**Status**: Not Started

- [ ] Multi-language support
  - [ ] Arabic language
  - [ ] RTL layout support
  - [ ] Translation system
- [ ] Additional currency support
- [ ] Regional pricing sources
- [ ] Scalability improvements
  - [ ] CDN implementation
  - [ ] Database optimization
  - [ ] Caching layers
  - [ ] Performance monitoring
- [ ] Advanced security
  - [ ] Multi-factor authentication
  - [ ] Biometric login (mobile)
  - [ ] Advanced audit logging

---

## 17. Appendix

### 17.1 Glossary

**Asset**: Any item of value owned by the user (stocks, real estate, precious metals, etc.)  
**Portfolio**: Collection of all assets owned by a user  
**Profile**: Separate financial identity within a user account (e.g., Personal, Business)  
**EGP**: Egyptian Pound  
**USD**: United States Dollar  
**ROI**: Return on Investment  
**P/E Ratio**: Price-to-Earnings Ratio  
**CD**: Certificate of Deposit  
**ETF**: Exchange-Traded Fund  
**REIT**: Real Estate Investment Trust  
**Tola**: Unit of mass used in South Asia for precious metals (11.66 grams)  
**Troy Ounce**: Traditional unit for precious metals (31.1 grams)  
**Purity**: Measurement of precious metal content (e.g., 24K gold = 99.9% pure)  
**Base Currency**: User's preferred currency for portfolio valuation  

### 17.2 Acronyms

**API**: Application Programming Interface  
**BRD**: Business Requirements Document  
**CRUD**: Create, Read, Update, Delete  
**CSV**: Comma-Separated Values  
**DAU**: Daily Active Users  
**EGX**: Egyptian Exchange (Stock Market)  
**GDPR**: General Data Protection Regulation  
**HTTPS**: Hypertext Transfer Protocol Secure  
**JWT**: JSON Web Token  
**MAU**: Monthly Active Users  
**MFA**: Multi-Factor Authentication  
**NPS**: Net Promoter Score  
**PII**: Personally Identifiable Information  
**REST**: Representational State Transfer  
**ROI**: Return on Investment  
**RTL**: Right-to-Left  
**SUS**: System Usability Scale  
**TLS**: Transport Layer Security  
**UI**: User Interface  
**UX**: User Experience  
**WCAG**: Web Content Accessibility Guidelines  
**XSS**: Cross-Site Scripting  

### 17.3 References

**Design Inspiration**:
- Wise (wise.com) - Multi-currency design patterns
- Revolut (revolut.com) - Modern financial app UX
- Personal Capital - Portfolio dashboard design
- Mint - Expense tracking patterns

**Technical Documentation**:
- React Documentation (react.dev)
- Tailwind CSS (tailwindcss.com)
- Supabase Documentation (supabase.com/docs)
- Motion (motion.dev)

**Market Data Providers**:
- Gold API (goldapi.io)
- Alpha Vantage (alphavantage.co)
- CoinGecko (coingecko.com)
- Exchange Rates API (exchangeratesapi.io)

### 17.4 Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Dec 10, 2025 | Product Team | Initial comprehensive BRD created covering all implemented and planned features |

### 17.5 Approval

**Prepared By**: Product Team  
**Review Status**: Draft  
**Approval Status**: Pending  

---

## Contact & Feedback

For questions, clarifications, or suggestions regarding this Business Requirements Document, please contact the Product Team.

---

**Document Classification**: Internal Use  
**Confidentiality Level**: Confidential  
**Last Updated**: December 10, 2025

---

*End of Business Requirements Document*
