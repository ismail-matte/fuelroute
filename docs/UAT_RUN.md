# FuelRoute System UAT Run

## Document Information
- **Document Version:** 1.0
- **Date:** 2025-02-01
- **System:** FuelRoute - Smart Journey Fuel Calculator
- **Environment:** Production/Staging
- **Tester:** [Tester Name]

---

## 1. Overview

### 1.1 Purpose
This User Acceptance Testing (UAT) document provides a comprehensive, step-by-step guide for validating the FuelRoute application's functionality, ensuring all features work as specified before production deployment.

### 1.2 Scope
The UAT covers all major user journeys and system functionality:
- Main fuel calculation workflow
- Location detection and distance calculation
- Vehicle selection and consumption estimation
- Currency conversion and regional settings
- History management
- Export and sharing features
- AI Chatbot functionality
- Admin panel operations

### 1.3 Test Environment
- **Browser:** Chrome 120+, Firefox 120+, Safari 17+, Edge 120+
- **Device:** Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)
- **Network:** Stable internet connection (required for OSM distance calculation)
- **LocalStorage:** Enabled (required for history and analytics)

---

## 2. Prerequisites

### 2.1 System Requirements
- Modern web browser with JavaScript enabled
- Internet connection (for distance calculation and geolocation)
- LocalStorage support
- Geolocation API access (optional but recommended)

### 2.2 Test Data Preparation
Prepare the following test scenarios:

| Scenario | From | To | Via | Vehicle | Distance |
|----------|------|-----|-----|---------|----------|
| Short Trip | London | Manchester | - | Toyota Corolla | ~330 km |
| Long Trip | New York | Los Angeles | Chicago | Tesla Model 3 | ~4,500 km |
| International | Paris | Berlin | Frankfurt | BMW 3 Series | ~1,000 km |
| Manual Distance | - | - | - | Honda Civic | 250 km |

### 2.3 Test Accounts
- **Admin Panel:** Default credentials (check with development team)
- **Email:** Test email address for email sharing functionality

---

## 3. Test Scenarios

### Test Case 1: Application Initialization and Auto-Detection

**ID:** TC-001  
**Priority:** Critical  
**Estimated Time:** 2 minutes

#### Preconditions
- Clear browser cache and LocalStorage
- Open application in fresh browser session

#### Test Steps
1. Navigate to application URL
2. Allow browser location access when prompted
3. Observe initial page load

#### Expected Results
- [ ] Application loads within 3 seconds
- [ ] Header displays "FuelRoute" logo and tagline
- [ ] Location permission dialog appears
- [ ] After allowing location, currency auto-detects based on region
- [ ] Distance unit auto-detects (km or miles)
- [ ] Fuel price estimate populates based on region
- [ ] No JavaScript errors in browser console
- [ ] All UI elements render correctly

#### Post-Conditions
- Application is ready for user input
- Regional settings are applied

---

### Test Case 2: Vehicle Selection and Consumption Estimation

**ID:** TC-002  
**Priority:** Critical  
**Estimated Time:** 5 minutes

#### Preconditions
- Application is loaded
- User is on main calculator page

#### Test Steps
1. Select "Petrol/Gasoline" from Vehicle Type dropdown
2. Type "Toyota" in Car Model field
3. Select "Toyota Corolla" from suggestions
4. Verify auto-populated values
5. Change Vehicle Type to "Electric"
6. Type "Tesla" in Car Model field
7. Select "Tesla Model 3" from suggestions
8. Verify consumption unit changes to kWh/100km
9. Click the "?" help button next to Consumption field
10. Manually override consumption value

#### Expected Results
- [ ] Car suggestions appear after typing 2+ characters
- [ ] Suggestions are filtered by selected vehicle type
- [ ] Selecting a car populates: Engine Size, Consumption, Vehicle Type
- [ ] Consumption unit changes based on vehicle type:
  - Petrol/Diesel: L/100km or MPG
  - Electric: kWh/100km
- [ ] Help button shows typical consumption ranges
- [ ] Manual override of consumption value is accepted
- [ ] Engine size field accepts values between 0.5L and 8.0L
- [ ] Consumption field accepts values between 1 and 50

#### Post-Conditions
- Vehicle parameters are set for calculation

---

### Test Case 3: Location Input and Distance Calculation

**ID:** TC-003  
**Priority:** Critical  
**Estimated Time:** 8 minutes

#### Preconditions
- Vehicle is selected
- Internet connection is active

#### Test Steps
1. Type "London" in "From" location field
2. Select "London, UK" from suggestions
3. Type "Manchester" in "To" location field
4. Select "Manchester, UK" from suggestions
5. Leave "Via" field empty
6. Click "Calculate Journey" button
7. Observe loading indicator
8. Review calculated results
9. Test with "Via" location: Add "Birmingham"
10. Test manual distance: Enter "250" in Manual Distance field
11. Clear location fields and calculate with manual distance only

#### Expected Results
- [ ] Location suggestions appear after typing 2+ characters
- [ ] Suggestions include city names and countries
- [ ] Loading indicator displays during distance calculation
- [ ] Distance is calculated and displayed
- [ ] Distance includes via location when specified
- [ ] Manual distance overrides location-based calculation
- [ ] Alert appears if both locations and manual distance are missing
- [ ] Google Maps link appears if OSM calculation fails
- [ ] Distance is displayed in selected unit (km or miles)

#### Post-Conditions
- Distance value is available for fuel calculation

---

### Test Case 4: Fuel Cost Calculation

**ID:** TC-004  
**Priority:** Critical  
**Estimated Time:** 5 minutes

#### Test Steps
1. Set vehicle to "Toyota Corolla" (Petrol, 6.5 L/100km)
2. Set locations: London → Manchester (~330 km)
3. Set fuel price to 1.50 USD/L
4. Set Journey Type to "One Way"
5. Click "Calculate Journey"
6. Review all calculated values
7. Change Journey Type to "Return"
8. Click "Calculate Journey" again
9. Verify cost doubles

#### Expected Results
- [ ] Fuel amount calculated: (330/100) × 6.5 = 21.45 L
- [ ] Total cost calculated: 21.45 × 1.50 = 32.18 USD
- [ ] Cost per distance calculated: 32.18 / 330 = 0.097 USD/km
- [ ] CO₂ emissions calculated: 21.45 × 2.31 = 49.57 kg
- [ ] Efficiency rating displayed (⭐⭐⭐⭐ for 6.5 L/100km)
- [ ] Verdict text displayed: "Very Good Efficiency"
- [ ] Journey duration estimated (based on average speed)
- [ ] Return journey doubles distance, fuel, and cost
- [ ] All values display with correct currency symbol

#### Post-Conditions
- Complete calculation results are displayed

---

### Test Case 5: Currency Conversion

**ID:** TC-005  
**Priority:** High  
**Estimated Time:** 4 minutes

#### Test Steps
1. Perform calculation with USD currency
2. Note the total cost
3. Change currency to EUR
4. Verify cost converts automatically
5. Change currency to GBP
6. Verify cost converts again
7. Test location-based currency detection:
   - Enter "Paris" as location
   - Verify currency switches to EUR

#### Expected Results
- [ ] Currency dropdown shows all supported currencies
- [ ] Changing currency converts fuel price
- [ ] Changing currency converts calculated costs
- [ ] Currency symbol updates correctly ($, €, £, etc.)
- [ ] Location entry triggers currency detection
- [ ] Conversion rates are accurate (within 5% of market rates)
- [ ] Original currency is tracked for conversion

#### Post-Conditions
- All monetary values display in selected currency

---

### Test Case 6: History Management

**ID:** TC-006  
**Priority:** High  
**Estimated Time:** 6 minutes

#### Test Steps
1. Perform 3 different calculations
2. Click "Show History" button
3. Verify all 3 calculations appear
4. Click "Load" on first history item
5. Verify form fields populate with saved values
6. Click "Delete" (×) on second history item
7. Verify item is removed
8. Perform 4th calculation
9. Verify history shows 3 items (max 20)
10. Refresh page
11. Verify history persists

#### Expected Results
- [ ] History toggle button shows count (e.g., "Show History (3)")
- [ ] History cards display: date, route, distance, cost, vehicle
- [ ] Most recent calculation appears first
- [ ] Load button populates all form fields correctly
- [ ] Delete button removes item immediately
- [ ] History persists across page refreshes
- [ ] Maximum 20 items stored (oldest removed)
- [ ] Date format is relative (e.g., "2 hours ago")
- [ ] Empty history shows appropriate message

#### Post-Conditions
- History is saved in LocalStorage

---

### Test Case 7: Export and Sharing Features

**ID:** TC-007  
**Priority:** Medium  
**Estimated Time:** 8 minutes

#### Test Steps
1. Perform a calculation
2. Click "Download as Image" button
3. Verify image downloads
4. Click "Share via WhatsApp" button
5. Verify WhatsApp opens with pre-filled message
6. Click "Share via Email" button
7. Verify email client opens with pre-filled content
8. Test "Send to Email" feature:
   - Enter test email address
   - Click send
   - Verify email client opens

#### Expected Results
- [ ] Image download creates PNG file
- [ ] Image contains all calculation details
- [ ] WhatsApp link opens in new tab
- [ ] WhatsApp message includes: route, distance, cost, efficiency
- [ ] Email client opens with subject and body pre-filled
- [ ] Email content is formatted correctly
- [ ] All share buttons are functional
- [ ] Shareable text is accurate

#### Post-Conditions
- User can share calculation results via multiple channels

---

### Test Case 8: AI Chatbot Functionality

**ID:** TC-008  
**Priority:** Medium  
**Estimated Time:** 6 minutes

#### Test Steps
1. Click chat widget button (bottom-right corner)
2. Verify welcome message appears
3. Type "How to use FuelRoute?"
4. Verify response is helpful
5. Click quick action "Is it free?"
6. Verify response appears
7. Type a complex question about fuel efficiency
8. Verify response or email form appears
9. Test email submission:
   - Enter email address
   - Click submit
   - Verify confirmation message

#### Expected Results
- [ ] Chat widget button is visible and clickable
- [ ] Chat window opens smoothly
- [ ] Welcome message displays on first open
- [ ] User messages appear on right side
- [ ] Bot responses appear on left side
- [ ] Typing indicator shows during response generation
- [ ] Quick action buttons populate input field
- [ ] Email form appears for complex queries
- [ ] Chat history persists across sessions
- [ ] Close button hides chat window

#### Post-Conditions
- Chat history is saved in LocalStorage

---

### Test Case 9: Admin Panel - Login and Dashboard

**ID:** TC-009  
**Priority:** High  
**Estimated Time:** 5 minutes

#### Preconditions
- Admin credentials are available

#### Test Steps
1. Navigate to `/admin` route
2. Enter admin username
3. Enter admin password
4. Click "Login" button
5. Verify dashboard loads
6. Review analytics overview
7. Click different tabs (Dashboard, Social Media, Settings)

#### Expected Results
- [ ] Login page displays correctly
- [ ] Invalid credentials show error message
- [ ] Valid credentials grant access
- [ ] Dashboard shows: Total Visits, Calculations, Saved Journeys, Social Posts
- [ ] Recent calculations table displays up to 10 items
- [ ] Tab navigation works smoothly
- [ ] Logout button is functional
- [ ] Welcome message displays admin username

#### Post-Conditions
- Admin is logged in and can access all features

---

### Test Case 10: Admin Panel - Password Reset

**ID:** TC-010  
**Priority:** Medium  
**Estimated Time:** 4 minutes

#### Test Steps
1. On login page, click "Forgot Password?"
2. Enter admin email
3. Click "Send Reset Link"
4. Note the reset token (simulated)
5. Enter reset token
6. Enter new password
7. Click "Reset Password"
8. Login with new password

#### Expected Results
- [ ] Password reset form appears
- [ ] Email validation works
- [ ] Reset link sent confirmation appears
- [ ] Reset token is accepted
- [ ] New password is set successfully
- [ ] Can login with new password
- [ ] Old password no longer works

#### Post-Conditions
- Admin password is updated

---

### Test Case 11: Admin Panel - Social Media Integration

**ID:** TC-011  
**Priority:** Low  
**Estimated Time:** 5 minutes

#### Preconditions
- Admin is logged in

#### Test Steps
1. Navigate to "Social Media" tab
2. Click "Generate & Post to Social Media"
3. Verify post generation
4. Enter API credentials for Twitter (test)
5. Click "Save Twitter Config"
6. Review post history table

#### Expected Results
- [ ] Quick post button is functional
- [ ] Post is generated with relevant content
- [ ] API configuration forms accept input
- [ ] Save buttons provide feedback
- [ ] Post history displays recent posts
- [ ] Platform icons display correctly
- [ ] Status indicators show post status

#### Post-Conditions
- Social media configuration is saved

---

### Test Case 12: Admin Panel - Settings Management

**ID:** TC-012  
**Priority:** Medium  
**Estimated Time:** 5 minutes

#### Preconditions
- Admin is logged in

#### Test Steps
1. Navigate to "Settings" tab
2. Review account information (read-only)
3. Change password:
   - Enter old password
   - Enter new password
   - Click "Update Password"
4. Toggle "Enable automatic social media posting"
5. Change "Post Frequency" to "Daily"
6. Review contact information
7. Test "Clear Analytics" button (with confirmation)
8. Test "Clear History" button (with confirmation)

#### Expected Results
- [ ] Account information displays correctly
- [ ] Password change validates old password
- [ ] Auto-post toggle saves state
- [ ] Post frequency dropdown works
- [ ] Contact information is accurate
- [ ] Clear Analytics requires confirmation
- [ ] Clear History requires confirmation
- [ ] Danger zone buttons have appropriate styling

#### Post-Conditions
- Settings are updated and persisted

---

### Test Case 13: Responsive Design - Mobile

**ID:** TC-013  
**Priority:** High  
**Estimated Time:** 5 minutes

#### Preconditions
- Browser DevTools in mobile view (375x667)

#### Test Steps
1. Resize browser to mobile viewport
2. Navigate through application
3. Test all interactive elements
4. Verify layout adapts
5. Test chat widget on mobile
6. Test history section on mobile

#### Expected Results
- [ ] Layout stacks vertically on mobile
- [ ] All buttons are tappable (min 44x44px)
- [ ] Form fields are usable on touch
- [ ] No horizontal scrolling
- [ ] Chat widget is accessible
- [ ] History cards display correctly
- [ ] Dropdowns work on touch
- [ ] Text is readable (min 16px)

#### Post-Conditions
- Application is fully functional on mobile

---

### Test Case 14: Responsive Design - Tablet

**ID:** TC-014  
**Priority:** Medium  
**Estimated Time:** 4 minutes

#### Preconditions
- Browser DevTools in tablet view (768x1024)

#### Test Steps
1. Resize browser to tablet viewport
2. Navigate through application
3. Verify grid layouts adapt
4. Test form interactions

#### Expected Results
- [ ] Grid adjusts to 2-column layout
- [ ] Form fields are appropriately sized
- [ ] History grid shows 2 columns
- [ ] All features remain accessible
- [ ] No layout breaks

#### Post-Conditions
- Application is fully functional on tablet

---

### Test Case 15: Error Handling

**ID:** TC-015  
**Priority:** High  
**Estimated Time:** 5 minutes

#### Test Steps
1. Try to calculate with empty locations and no manual distance
2. Enter invalid fuel price (negative number)
3. Enter invalid consumption (0 or negative)
4. Test with network disconnected
5. Try to access admin with wrong credentials
6. Clear LocalStorage and reload

#### Expected Results
- [ ] Alert appears for missing location/distance
- [ ] Invalid numbers are rejected or handled gracefully
- [ ] Network errors show user-friendly messages
- [ ] Login errors display clear messages
- [ ] Application recovers from LocalStorage clear
- [ ] No JavaScript crashes

#### Post-Conditions
- Application handles errors gracefully

---

### Test Case 16: Performance Testing

**ID:** TC-016  
**Priority:** Medium  
**Estimated Time:** 3 minutes

#### Test Steps
1. Open browser DevTools Performance tab
2. Start recording
3. Perform a complete calculation workflow
4. Stop recording
5. Review performance metrics

#### Expected Results
- [ ] Initial page load < 3 seconds
- [ ] Time to Interactive < 5 seconds
- [ ] Calculation completes < 2 seconds
- [ ] No long tasks (>50ms) blocking main thread
- [ ] Memory usage is stable
- [ ] No memory leaks detected

#### Post-Conditions
- Application meets performance standards

---

### Test Case 17: Cross-Browser Compatibility

**ID:** TC-017  
**Priority:** Medium  
**Estimated Time:** 10 minutes

#### Test Steps
1. Test complete workflow in Chrome
2. Test complete workflow in Firefox
3. Test complete workflow in Safari (if available)
4. Test complete workflow in Edge
5. Note any browser-specific issues

#### Expected Results
- [ ] All features work in Chrome
- [ ] All features work in Firefox
- [ ] All features work in Safari
- [ ] All features work in Edge
- [ ] Styling is consistent across browsers
- [ ] No browser-specific bugs

#### Post-Conditions
- Application is cross-browser compatible

---

### Test Case 18: Accessibility Testing

**ID:** TC-018  
**Priority:** Medium  
**Estimated Time:** 5 minutes

#### Test Steps
1. Navigate using keyboard only (Tab, Enter, Space)
2. Test with screen reader (if available)
3. Check color contrast ratios
4. Verify form labels are associated with inputs
5. Test focus indicators

#### Expected Results
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] Form labels are properly associated
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Alt text is present for images
- [ ] ARIA labels are used where appropriate

#### Post-Conditions
- Application meets accessibility standards

---

## 4. Test Results Summary

### 4.1 Test Execution Log

| Test Case | ID | Status | Tester | Date | Notes |
|-----------|-----|--------|--------|------|-------|
| Application Initialization | TC-001 | ⬜ PASS/FAIL | | | |
| Vehicle Selection | TC-002 | ⬜ PASS/FAIL | | | |
| Location Input | TC-003 | ⬜ PASS/FAIL | | | |
| Fuel Cost Calculation | TC-004 | ⬜ PASS/FAIL | | | |
| Currency Conversion | TC-005 | ⬜ PASS/FAIL | | | |
| History Management | TC-006 | ⬜ PASS/FAIL | | | |
| Export and Sharing | TC-007 | ⬜ PASS/FAIL | | | |
| AI Chatbot | TC-008 | ⬜ PASS/FAIL | | | |
| Admin Login | TC-009 | ⬜ PASS/FAIL | | | |
| Password Reset | TC-010 | ⬜ PASS/FAIL | | | |
| Social Media | TC-011 | ⬜ PASS/FAIL | | | |
| Admin Settings | TC-012 | ⬜ PASS/FAIL | | | |
| Mobile Responsive | TC-013 | ⬜ PASS/FAIL | | | |
| Tablet Responsive | TC-014 | ⬜ PASS/FAIL | | | |
| Error Handling | TC-015 | ⬜ PASS/FAIL | | | |
| Performance | TC-016 | ⬜ PASS/FAIL | | | |
| Cross-Browser | TC-017 | ⬜ PASS/FAIL | | | |
| Accessibility | TC-018 | ⬜ PASS/FAIL | | | |

### 4.2 Pass/Fail Criteria

**Overall UAT Status:** ⬜ PASS / FAIL

**Critical Tests (Must Pass):** TC-001, TC-002, TC-003, TC-004, TC-006, TC-009, TC-013, TC-015

**High Priority Tests:** TC-005, TC-007, TC-008, TC-010, TC-012, TC-016

**Medium Priority Tests:** TC-011, TC-014, TC-017, TC-018

---

## 5. Defect Reporting

### 5.1 Defect Template

| Field | Description |
|-------|-------------|
| Defect ID | BUG-XXX |
| Title | Brief description |
| Severity | Critical/High/Medium/Low |
| Priority | P1/P2/P3/P4 |
| Test Case | Related TC-ID |
| Steps to Reproduce | Detailed steps |
| Expected Result | What should happen |
| Actual Result | What actually happened |
| Environment | Browser, OS, Device |
| Screenshots | Attach if applicable |
| Status | Open/In Progress/Fixed |

### 5.2 Known Issues

| ID | Description | Severity | Workaround |
|----|-------------|----------|------------|
| | | | |

---

## 6. Sign-Off

### 6.1 Tester Sign-Off

**Tester Name:** ______________________  
**Date:** ______________________  
**Signature:** ______________________

**UAT Result:** ⬜ Approved for Production ⬜ Approved with Minor Issues ⬜ Not Approved

**Comments:**
_________________________________________________________________________
_________________________________________________________________________

### 6.2 Product Owner Sign-Off

**Product Owner:** ______________________  
**Date:** ______________________  
**Signature:** ______________________

**Approval:** ⬜ Approved ⬜ Approved with Conditions ⬜ Rejected

**Comments:**
_________________________________________________________________________
_________________________________________________________________________

### 6.3 Development Team Sign-Off

**Lead Developer:** ______________________  
**Date:** ______________________  
**Signature:** ______________________

**Deployment Ready:** ⬜ Yes ⬜ No

**Comments:**
_________________________________________________________________________
_________________________________________________________________________

---

## 7. Appendix

### 7.1 Test Data Reference

**Sample Calculations:**

| Scenario | Vehicle | Distance | Consumption | Fuel Price | Expected Cost |
|----------|---------|----------|-------------|------------|---------------|
| Short Commute | Toyota Corolla | 50 km | 6.5 L/100km | $1.50/L | $4.88 |
| Long Road Trip | Tesla Model 3 | 500 km | 15 kWh/100km | $0.15/kWh | $112.50 |
| City Delivery | Ford Transit | 100 km | 10 L/100km | €1.80/L | €18.00 |

### 7.2 Browser Compatibility Matrix

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| Chrome | 120+ | ✅ | Primary |
| Firefox | 120+ | ✅ | Supported |
| Safari | 17+ | ✅ | Supported |
| Edge | 120+ | ✅ | Supported |
| IE 11 | - | ❌ | Not Supported |

### 7.3 Contact Information

**Technical Support:** info@tech-center.com  
**Project Lead:** imatte@engineer.com  
**Emergency Contact:** +256 782 475 028

---

**Document End**