import React, { useState, useRef } from 'react';

const ProjectInformation = ({ formData, handleInputChange }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  // States for SAP functionality
  const [selectedSDG, setSelectedSDG] = useState('');
  const [sdgDropdownOpen, setSdgDropdownOpen] = useState(false);
  const [selectedSapCodes, setSelectedSapCodes] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Refs
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // SDG data structure
  const sdgData = {
    'SAP-SDG-001': {
      title: 'No Poverty',
      color: '#E5243B',
      codes: [
        { code: 'SAP0101' },
        { code: 'SAP0102' },
        { code: 'SAP0103' },
        { code: 'SAP0104' },
        { code: 'SAP0105' },
        { code: 'SAP010A' },
        { code: 'SAP010B' }
      ]
    },
    'SAP-SDG-002': {
      title: 'Zero Hunger',
      color: '#DDA63A',
      codes: [
        { code: 'SAP0201' },
        { code: 'SAP0202' },
        { code: 'SAP0203' },
        { code: 'SAP0204' },
        { code: 'SAP0205' },
        { code: 'SAP020A' },
        { code: 'SAP020B' },
        { code: 'SAP020C' }
      ]
    },
    'SAP-SDG-003': {
      title: 'Good Health and Well-being',
      color: '#4C9F38',
      codes: [
        { code: 'SAP0301' },
        { code: 'SAP0302' },
        { code: 'SAP0303' },
        { code: 'SAP0304' },
        { code: 'SAP0305' },
        { code: 'SAP0306' },
        { code: 'SAP0307' },
        { code: 'SAP0308' },
        { code: 'SAP0309' },
        { code: 'SAP030A' },
        { code: 'SAP030B' },
        { code: 'SAP030C' },
        { code: 'SAP030D' }
      ]
    },
    'SAP-SDG-004': {
      title: 'Quality Education',
      color: '#C5192D',
      codes: [
        { code: 'SAP0401' },
        { code: 'SAP0402' },
        { code: 'SAP0403' },
        { code: 'SAP0404' },
        { code: 'SAP0405' },
        { code: 'SAP0406' },
        { code: 'SAP0407' },
        { code: 'SAP040A' },
        { code: 'SAP040B' },
        { code: 'SAP040C' }
      ]
    },
    'SAP-SDG-005': {
      title: 'Gender Equality',
      color: '#FF3A21',
      codes: [
        { code: 'SAP0501' },
        { code: 'SAP0502' },
        { code: 'SAP0503' },
        { code: 'SAP0504' },
        { code: 'SAP0505' },
        { code: 'SAP0506' },
        { code: 'SAP050A' },
        { code: 'SAP050B' },
        { code: 'SAP050C' }
      ]
    },
    'SAP-SDG-006': {
      title: 'Clean Water and Sanitation',
      color: '#26BDE2',
      codes: [
        { code: 'SAP0601' },
        { code: 'SAP0602' },
        { code: 'SAP0603' },
        { code: 'SAP0604' },
        { code: 'SAP0605' },
        { code: 'SAP0606' },
        { code: 'SAP060A' },
        { code: 'SAP060B' }
      ]
    },
    'SAP-SDG-007': {
      title: 'Affordable and Clean Energy',
      color: '#FCC30B',
      codes: [
        { code: 'SAP0701' },
        { code: 'SAP0702' },
        { code: 'SAP0703' },
        { code: 'SAP070A' },
        { code: 'SAP070B' }
      ]
    },
    'SAP-SDG-008': {
      title: 'Decent Work and Economic Growth',
      color: '#A21942',
      codes: [
        { code: 'SAP0801' },
        { code: 'SAP0802' },
        { code: 'SAP0803' },
        { code: 'SAP0804' },
        { code: 'SAP0805' },
        { code: 'SAP0806' },
        { code: 'SAP0807' },
        { code: 'SAP0808' },
        { code: 'SAP0809' },
        { code: 'SAP080A' },
        { code: 'SAP080B' }
      ]
    },
    'SAP-SDG-009': {
      title: 'Industry, Innovation and Infrastructure',
      color: '#FD6925',
      codes: [
        { code: 'SAP0901' },
        { code: 'SAP0902' },
        { code: 'SAP0903' },
        { code: 'SAP0904' },
        { code: 'SAP0905' },
        { code: 'SAP090A' },
        { code: 'SAP090B' },
        { code: 'SAP090C' }
      ]
    },
    'SAP-SDG-010': {
      title: 'Reduced Inequalities',
      color: '#DD1367',
      codes: [
        { code: 'SAP1001' },
        { code: 'SAP1002' },
        { code: 'SAP1003' },
        { code: 'SAP1004' },
        { code: 'SAP1005' },
        { code: 'SAP1006' },
        { code: 'SAP1007' },
        { code: 'SAP100A' },
        { code: 'SAP100B' },
        { code: 'SAP100C' }
      ]
    },
    'SAP-SDG-011': {
      title: 'Sustainable Cities and Communities',
      color: '#FD9D24',
      codes: [
        { code: 'SAP1101' },
        { code: 'SAP1102' },
        { code: 'SAP1103' },
        { code: 'SAP1104' },
        { code: 'SAP1105' },
        { code: 'SAP1106' },
        { code: 'SAP1107' },
        { code: 'SAP110A' },
        { code: 'SAP110B' },
        { code: 'SAP110C' }
      ]
    },
    'SAP-SDG-012': {
      title: 'Responsible Consumption and Production',
      color: '#BF8B2E',
      codes: [
        { code: 'SAP1201' },
        { code: 'SAP1202' },
        { code: 'SAP1203' },
        { code: 'SAP1204' },
        { code: 'SAP1205' },
        { code: 'SAP1206' },
        { code: 'SAP1207' },
        { code: 'SAP1208' },
        { code: 'SAP120A' },
        { code: 'SAP120B' },
        { code: 'SAP120C' }
      ]
    },
    'SAP-SDG-013': {
      title: 'Climate Action',
      color: '#3F7E44',
      codes: [
        { code: 'SAP1301' },
        { code: 'SAP1302' },
        { code: 'SAP1303' },
        { code: 'SAP130A' },
        { code: 'SAP130B' }
      ]
    },
    'SAP-SDG-014': {
      title: 'Life Below Water',
      color: '#0A97D9',
      codes: [
        { code: 'SAP1401' },
        { code: 'SAP1402' },
        { code: 'SAP1403' },
        { code: 'SAP1404' },
        { code: 'SAP1405' },
        { code: 'SAP1406' },
        { code: 'SAP1407' },
        { code: 'SAP140A' },
        { code: 'SAP140B' },
        { code: 'SAP140C' }
      ]
    },
    'SAP-SDG-015': {
      title: 'Life on Land',
      color: '#56C02B',
      codes: [
        { code: 'SAP1501' },
        { code: 'SAP1502' },
        { code: 'SAP1503' },
        { code: 'SAP1504' },
        { code: 'SAP1505' },
        { code: 'SAP1506' },
        { code: 'SAP1507' },
        { code: 'SAP1508' },
        { code: 'SAP1509' },
        { code: 'SAP150A' },
        { code: 'SAP150B' },
        { code: 'SAP150C' }
      ]
    },
    'SAP-SDG-016': {
      title: 'Peace, Justice and Strong Institutions',
      color: '#00689D',
      codes: [
        { code: 'SAP1601' },
        { code: 'SAP1602' },
        { code: 'SAP1603' },
        { code: 'SAP1604' },
        { code: 'SAP1605' },
        { code: 'SAP1606' },
        { code: 'SAP1607' },
        { code: 'SAP1608' },
        { code: 'SAP1609' },
        { code: 'SAP160A' },
        { code: 'SAP160B' }
      ]
    },
    'SAP-SDG-017': {
      title: 'Partnership for the Goals',
      color: '#19486A',
      codes: [
        { code: 'SAP1701' },
        { code: 'SAP1702' },
        { code: 'SAP1703' },
        { code: 'SAP1704' },
        { code: 'SAP1705' },
        { code: 'SAP1706' },
        { code: 'SAP1707' },
        { code: 'SAP1708' },
        { code: 'SAP1709' },
        { code: 'SAP1710' },
        { code: 'SAP1711' },
        { code: 'SAP1712' },
        { code: 'SAP1713' },
        { code: 'SAP1714' },
        { code: 'SAP1715' },
        { code: 'SAP1716' },
        { code: 'SAP1717' },
        { code: 'SAP1718' },
        { code: 'SAP1719' }
      ]
    }
  };

  // Define required fields
  const requiredFields = [
    'projectTitle', 'primarySDGGoal', 'teamSize', 'mentorName', 'mentorId', 'sapCode'
  ];

  // Get SDG color for a SAP code
  const getSDGColorForCode = (sapCode) => {
    for (const [sdgKey, sdgInfo] of Object.entries(sdgData)) {
      if (sdgInfo.codes.some(c => c.code === sapCode)) {
        return sdgInfo.color;
      }
    }
    return '#666';
  };

  // Validation function
  const validateField = (name, value) => {
    if (requiredFields.includes(name) && (!value || value.trim() === '')) {
      return 'This field is required';
    }
    
    if (name === 'teamSize' && value && (!/^\d+$/.test(value) || parseInt(value) < 1 || parseInt(value) > 10)) {
      return 'Team size must be 1-10';
    }
    
    if (name === 'sapCode' && value && selectedSapCodes.length === 0) {
      return 'Please select at least one SAP code';
    }
    
    return '';
  };

  // Handle input change with validation
  const handleInputChangeWithValidation = (e) => {
    const { name, value } = e.target;
    
    handleInputChange(e);
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // Handle blur event to mark field as touched
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Handle "Show All SAP Codes" button click
  const handleShowAllCodes = () => {
    setSelectedSDG('ALL');
    setSdgDropdownOpen(false);
  };

  // Handle SAP code card selection (can select from any SDG)
  const handleSapCodeSelect = (codeObj, sdgKey) => {
    let newSelectedCodes;
    const isSelected = selectedSapCodes.some(c => c.code === codeObj.code);
    
    if (isSelected) {
      // Deselect
      newSelectedCodes = selectedSapCodes.filter(c => c.code !== codeObj.code);
    } else if (selectedSapCodes.length < 3) {
      // Select (max 3) - add SDG information
      newSelectedCodes = [...selectedSapCodes, { ...codeObj, sdgKey }];
    } else {
      return; // Max limit reached
    }
    
    setSelectedSapCodes(newSelectedCodes);
    
    // Update form data with selected codes
    const sapCodeString = newSelectedCodes.map(c => c.code).join(', ');
    const formEvent = {
      target: {
        name: 'sapCode',
        value: sapCodeString
      }
    };
    handleInputChange(formEvent);
  };

  // Remove selected code
  const handleRemoveCode = (codeToRemove) => {
    const newSelectedCodes = selectedSapCodes.filter(c => c.code !== codeToRemove);
    setSelectedSapCodes(newSelectedCodes);
    
    const sapCodeString = newSelectedCodes.map(c => c.code).join(', ');
    const formEvent = {
      target: {
        name: 'sapCode',
        value: sapCodeString
      }
    };
    handleInputChange(formEvent);
  };

  // SDG Simple Dropdown Component
  const SDGDropdown = () => (
    <div style={dropdownStyles.container}>
      {/* Show All SAP Codes Option */}
      <div
        style={dropdownStyles.showAllItem}
        onClick={handleShowAllCodes}
      >
        <div style={dropdownStyles.showAllIcon}>🎯</div>
        <div style={dropdownStyles.textContent}>
          <span style={dropdownStyles.showAllText}>Show All SAP Codes</span>
          <span style={dropdownStyles.showAllSubtext}>Browse codes from all 17 SDG goals</span>
        </div>
      </div>
      
      {Object.keys(sdgData).map(sdgKey => (
        <div
          key={sdgKey}
          style={dropdownStyles.item}
          onClick={() => {
            setSelectedSDG(sdgKey);
            setSdgDropdownOpen(false);
          }}
        >
          <div style={{...dropdownStyles.colorBox, backgroundColor: sdgData[sdgKey].color}}></div>
          <div style={dropdownStyles.textContent}>
            <span style={dropdownStyles.sdgCode}>{sdgKey}</span>
            <span style={dropdownStyles.sdgTitle}>{sdgData[sdgKey].title}</span>
          </div>
        </div>
      ))}
    </div>
  );

  // All SAP Codes Grid Component (from all SDGs) with smaller cards
  const AllSAPCodesGrid = () => {
    const allCodes = [];
    
    // Collect all codes from all SDGs
    Object.keys(sdgData).forEach(sdgKey => {
      sdgData[sdgKey].codes.forEach(codeObj => {
        allCodes.push({
          ...codeObj,
          sdgKey,
          color: sdgData[sdgKey].color
        });
      });
    });

    return (
      <div style={gridStyles.container}>
        <div style={gridStyles.header}>
          <div style={gridStyles.headerIcon}>🌍</div>
          <div style={gridStyles.headerText}>
            <h3 style={gridStyles.headerTitle}>All SAP Codes from 17 SDG Goals</h3>
            <p style={gridStyles.headerSubtitle}>
              Select any SAP codes (up to 3) from different SDG goals - {selectedSapCodes.length}/3 selected
            </p>
          </div>
        </div>
        
        <div style={gridStyles.smallGrid}>
          {allCodes.map(codeObj => {
            const isSelected = selectedSapCodes.some(c => c.code === codeObj.code);
            const isDisabled = selectedSapCodes.length >= 3 && !isSelected;
            const isHovered = hoveredCard === codeObj.code;
            
            return (
              <div
                key={codeObj.code}
                style={{
                  ...gridStyles.smallCard,
                  ...(isSelected ? {...gridStyles.selectedSmall, borderColor: codeObj.color, backgroundColor: `${codeObj.color}15`} : {}),
                  ...(isDisabled ? gridStyles.disabled : {}),
                  ...(isHovered ? {
                    ...gridStyles.hoveredSmall,
                    borderColor: codeObj.color,
                    boxShadow: `0 4px 15px ${codeObj.color}40`
                  } : {})
                }}
                onClick={() => !isDisabled && handleSapCodeSelect(codeObj, codeObj.sdgKey)}
                onMouseEnter={() => !isDisabled && setHoveredCard(codeObj.code)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={gridStyles.smallCardContent}>
                  <span style={{...gridStyles.smallCardCode, color: isSelected ? codeObj.color : '#333'}}>
                    {codeObj.code}
                  </span>
                  {isSelected && (
                    <span style={{...gridStyles.selectedCheckmark, color: codeObj.color}}>
                      ✓
                    </span>
                  )}
                </div>
                <div style={{...gridStyles.sdgIndicator, backgroundColor: codeObj.color}}></div>
              </div>
            );
          })}
        </div>
        
        {selectedSapCodes.length > 0 && (
          <div style={gridStyles.selectedSummary}>
            <h4 style={gridStyles.summaryTitle}>Selected SAP Codes:</h4>
            <div style={gridStyles.summaryList}>
              {selectedSapCodes.map(codeObj => (
                <span 
                  key={codeObj.code} 
                  style={{...gridStyles.summaryTag, backgroundColor: getSDGColorForCode(codeObj.code)}}
                >
                  {codeObj.code}
                  <button
                    style={gridStyles.tagRemoveButton}
                    onClick={() => handleRemoveCode(codeObj.code)}
                    type="button"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <button
              style={gridStyles.clearAllButton}
              onClick={() => {
                setSelectedSapCodes([]);
                handleInputChange({
                  target: { name: 'sapCode', value: '' }
                });
              }}
              type="button"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    );
  };

  // Single SDG SAP Codes Grid Component with smaller cards
  const SingleSDGCodesGrid = () => {
    if (!selectedSDG || selectedSDG === 'ALL' || !sdgData[selectedSDG]) return null;

    const sdgInfo = sdgData[selectedSDG];
    
    return (
      <div style={gridStyles.container}>
        <div style={gridStyles.header}>
          <div style={{...gridStyles.headerColorBox, backgroundColor: sdgInfo.color}}></div>
          <div style={gridStyles.headerText}>
            <h3 style={gridStyles.headerTitle}>{selectedSDG} - {sdgInfo.title}</h3>
            <p style={gridStyles.headerSubtitle}>
              Select SAP codes (up to 3) - {selectedSapCodes.length}/3 selected
            </p>
          </div>
        </div>
        
        <div style={gridStyles.smallGrid}>
          {sdgInfo.codes.map(codeObj => {
            const isSelected = selectedSapCodes.some(c => c.code === codeObj.code);
            const isDisabled = selectedSapCodes.length >= 3 && !isSelected;
            const isHovered = hoveredCard === codeObj.code;
            
            return (
              <div
                key={codeObj.code}
                style={{
                  ...gridStyles.smallCard,
                  ...(isSelected ? {...gridStyles.selectedSmall, borderColor: sdgInfo.color, backgroundColor: `${sdgInfo.color}15`} : {}),
                  ...(isDisabled ? gridStyles.disabled : {}),
                  ...(isHovered ? {
                    ...gridStyles.hoveredSmall,
                    borderColor: sdgInfo.color,
                    boxShadow: `0 4px 15px ${sdgInfo.color}40`
                  } : {})
                }}
                onClick={() => !isDisabled && handleSapCodeSelect(codeObj, selectedSDG)}
                onMouseEnter={() => !isDisabled && setHoveredCard(codeObj.code)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={gridStyles.smallCardContent}>
                  <span style={{...gridStyles.smallCardCode, color: isSelected ? sdgInfo.color : '#333'}}>
                    {codeObj.code}
                  </span>
                  {isSelected && (
                    <span style={{...gridStyles.selectedCheckmark, color: sdgInfo.color}}>
                      ✓
                    </span>
                  )}
                </div>
                <div style={{...gridStyles.sdgIndicator, backgroundColor: sdgInfo.color}}></div>
              </div>
            );
          })}
        </div>
        
        {selectedSapCodes.length > 0 && (
          <div style={gridStyles.selectedSummary}>
            <h4 style={gridStyles.summaryTitle}>Selected SAP Codes:</h4>
            <div style={gridStyles.summaryList}>
              {selectedSapCodes.map(codeObj => (
                <span 
                  key={codeObj.code} 
                  style={{...gridStyles.summaryTag, backgroundColor: sdgInfo.color}}
                >
                  {codeObj.code}
                  <button
                    style={gridStyles.tagRemoveButton}
                    onClick={() => handleRemoveCode(codeObj.code)}
                    type="button"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <button
              style={gridStyles.clearAllButton}
              onClick={() => {
                setSelectedSapCodes([]);
                handleInputChange({
                  target: { name: 'sapCode', value: '' }
                });
              }}
              type="button"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    );
  };

  // Error message component
  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: '8px',
        padding: '3px 6px',
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '3px',
        fontSize: '11px',
        whiteSpace: 'nowrap',
        minWidth: 'fit-content',
        maxWidth: '150px',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        <div style={{
          color: '#ef4444',
          marginRight: '3px',
          fontSize: '12px'
        }}>⚠</div>
        <span style={{
          color: '#dc2626',
          fontWeight: '500'
        }}>{error}</span>
      </div>
    );
  };

  // Function to get input style based on error state
  const getInputStyle = (fieldName) => {
    return errors[fieldName] ? {
      borderColor: '#ef4444',
      boxShadow: '0 0 0 1px #ef4444'
    } : {};
  };

  // Input container style for inline alignment
  const getInputContainerStyle = () => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minHeight: '38px'
  });

  // Input wrapper style
  const getInputWrapperStyle = () => ({
    flex: '1',
    minWidth: '0'
  });

  // Dropdown styles
  const dropdownStyles = {
    container: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '8px',
      maxHeight: '300px',
      overflowY: 'auto',
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    },
    showAllItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      cursor: 'pointer',
      borderBottom: '2px solid #007bff',
      backgroundColor: '#f8f9fa',
      transition: 'background-color 0.2s ease'
    },
    showAllIcon: {
      fontSize: '20px',
      marginRight: '12px',
      flexShrink: 0
    },
    showAllText: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#007bff',
      marginBottom: '2px'
    },
    showAllSubtext: {
      fontSize: '11px',
      color: '#6c757d'
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      cursor: 'pointer',
      borderBottom: '1px solid #f1f1f1',
      transition: 'background-color 0.2s ease'
    },
    colorBox: {
      width: '24px',
      height: '24px',
      borderRadius: '4px',
      marginRight: '12px',
      flexShrink: 0
    },
    textContent: {
      display: 'flex',
      flexDirection: 'column'
    },
    sdgCode: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '2px'
    },
    sdgTitle: {
      fontSize: '12px',
      color: '#666'
    }
  };

  // Grid styles for SAP codes (smaller cards)
  const gridStyles = {
    container: {
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      border: '2px solid #e9ecef'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      padding: '16px',
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #dee2e6'
    },
    headerColorBox: {
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      marginRight: '16px',
      flexShrink: 0
    },
    headerIcon: {
      fontSize: '40px',
      marginRight: '16px',
      flexShrink: 0
    },
    headerText: {
      flex: 1
    },
    headerTitle: {
      margin: '0 0 4px 0',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333'
    },
    headerSubtitle: {
      margin: 0,
      fontSize: '14px',
      color: '#666'
    },
    smallGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
      gap: '12px',
      marginBottom: '20px'
    },
    smallCard: {
      backgroundColor: 'white',
      border: '2px solid #e9ecef',
      borderRadius: '8px',
      padding: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      textAlign: 'center',
      minHeight: '60px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    smallCardContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px'
    },
    smallCardCode: {
      fontSize: '14px',
      fontWeight: 'bold',
      fontFamily: 'monospace'
    },
    selectedSmall: {
      borderWidth: '3px'
    },
    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    },
    hoveredSmall: {
      transform: 'scale(1.1) translateY(-2px)',
      borderWidth: '3px',
      backgroundColor: '#ffffff'
    },
    selectedCheckmark: {
      fontSize: '14px',
      fontWeight: 'bold'
    },
    sdgIndicator: {
      position: 'absolute',
      bottom: '4px',
      left: '4px',
      width: '8px',
      height: '8px',
      borderRadius: '50%'
    },
    selectedSummary: {
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #dee2e6'
    },
    summaryTitle: {
      margin: '0 0 12px 0',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333'
    },
    summaryList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '12px'
    },
    summaryTag: {
      color: 'white',
      padding: '6px 12px',
      borderRadius: '16px',
      fontSize: '12px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    tagRemoveButton: {
      background: 'rgba(255,255,255,0.3)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '16px',
      height: '16px',
      cursor: 'pointer',
      fontSize: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    clearAllButton: {
      padding: '8px 16px',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '600'
    }
  };

  // Dropdown container style
  const dropdownContainerStyle = {
    position: 'relative',
    width: '100%'
  };

  return (
    <div className="form-section-page">
      <div className="section-header">
        <h2 className="section-title">SECTION 2: PROJECT INFORMATION</h2>
      </div>
      
      <div className="form-content">
        <div className="form-row">
          <div className="form-group full-width" style={{ marginBottom: '12px' }}>
            <label htmlFor="projectTitle">Project title</label>
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <input
                  type="text"
                  id="projectTitle"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-input-main"
                  style={getInputStyle('projectTitle')}
                  placeholder="Enter project title"
                />
              </div>
              <ErrorMessage error={errors.projectTitle} />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half-width" style={{ marginBottom: '12px' }}>
            <label htmlFor="primarySDGGoal">Primary SDG Goal</label>
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <input
                  type="text"
                  id="primarySDGGoal"
                  name="primarySDGGoal"
                  value={formData.primarySDGGoal}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-input-main"
                  style={getInputStyle('primarySDGGoal')}
                  placeholder="Enter SDG goal"
                />
              </div>
              <ErrorMessage error={errors.primarySDGGoal} />
            </div>
          </div>
          <div className="form-group half-width" style={{ marginBottom: '12px' }}>
            <label htmlFor="teamSize">Team size</label>
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <input
                  type="text"
                  id="teamSize"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-input-main"
                  style={getInputStyle('teamSize')}
                  placeholder="Enter team size"
                />
              </div>
              <ErrorMessage error={errors.teamSize} />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half-width" style={{ marginBottom: '12px' }}>
            <label htmlFor="mentorName">Mentor name</label>
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <input
                  type="text"
                  id="mentorName"
                  name="mentorName"
                  value={formData.mentorName}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-input-main"
                  style={getInputStyle('mentorName')}
                  placeholder="Enter mentor name"
                />
              </div>
              <ErrorMessage error={errors.mentorName} />
            </div>
          </div>
          <div className="form-group half-width" style={{ marginBottom: '12px' }}>
            <label htmlFor="mentorId">Mentor id</label>
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <input
                  type="text"
                  id="mentorId"
                  name="mentorId"
                  value={formData.mentorId}
                  onChange={handleInputChangeWithValidation}
                  onBlur={handleBlur}
                  className="form-input-main"
                  style={getInputStyle('mentorId')}
                  placeholder="Enter mentor ID"
                />
              </div>
              <ErrorMessage error={errors.mentorId} />
            </div>
          </div>
        </div>

        {/* SAP Code Selection with smaller cards and cross-SDG selection */}
        <div className="form-row">
          <div className="form-group full-width" style={{ marginBottom: '12px' }}>
            <label htmlFor="sapCode">
              SAP Code <span className="field-hint">(Select SDG Goal or browse all codes - Select up to 3 codes from any SDG)</span>
            </label>
            
            <div style={getInputContainerStyle()}>
              <div style={getInputWrapperStyle()}>
                <div style={dropdownContainerStyle}>
                  <input
                    ref={inputRef}
                    type="text"
                    id="sapCode"
                    name="sapCode"
                    value={
                      selectedSDG === 'ALL' 
                        ? 'All SAP Codes from 17 SDG Goals' 
                        : selectedSDG && sdgData[selectedSDG] 
                          ? `${selectedSDG} - ${sdgData[selectedSDG].title}` 
                          : ''
                    }
                    onFocus={() => setSdgDropdownOpen(true)}
                    onBlur={handleBlur}
                    className="form-input-main"
                    style={getInputStyle('sapCode')}
                    placeholder="Click to select SDG Goal or browse all SAP codes"
                    readOnly
                  />
                  
                  {/* Enhanced SDG Dropdown with "Show All" option */}
                  {sdgDropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div 
                        style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          zIndex: 999
                        }}
                        onClick={() => setSdgDropdownOpen(false)}
                      />
                      <SDGDropdown />
                    </>
                  )}
                </div>
              </div>
              <ErrorMessage error={errors.sapCode} />
            </div>
            
            {/* Render appropriate grid based on selection */}
            {selectedSDG === 'ALL' ? <AllSAPCodesGrid /> : <SingleSDGCodesGrid />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;
