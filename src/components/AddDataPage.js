import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addField, resetField } from '../actions/index';
import './AddDataPage.css';

const AddDataPage = ({ fields, addField }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFieldType, setSelectedFieldType] = useState('');
  const [confirmedData, setConfirmedData] = useState([]);
  const [newField, setNewField] = useState({
    displayName: '',
    dataType: '',
    maxLength: '',    
    startDate: '',
    endDate: '',
    isMandatory: '',
    fieldInput: ''
  });

  const [isAddingField, setIsAddingField] = useState(false);
  const [retrievalData] = useState({
    department: '',
    mobileNumber: '',
    dob: '',
    pincode: '',
  });

  const [retrievedData, setRetrievedData] = useState([]);

  const handleRetrieveData = () => {
    const filteredData = confirmedData.filter((data) => {
      return (
        data.fieldInput === retrievalData.mobileNumber &&
        data.fieldInput === retrievalData.pincode &&
        data.fieldInput === retrievalData.dob &&
        data.fieldInput === retrievalData.department
      );
    });

    setRetrievedData(filteredData);
  };

  const handleFieldTypeChange = (e) => {
    setSelectedFieldType(e.target.value);
  };

  const handleInputChange = (e) => {
    setNewField({
      ...newField,
      [e.target.name]: e.target.value,
    });
  };

  const isFieldInputValid = () => {
    
    switch (newField.dataType) {
      case 'string':
        const isMaxLengthValid =
          !newField.maxLength || 
          (typeof newField.fieldInput === 'string' &&
            newField.fieldInput.length <= parseInt(newField.maxLength, 10));
  
        return isMaxLengthValid;
    //   case 'number':
  
    //     const isMaxLengthValidForNumber =
    //       !newField.maxLength ||
    //       (typeof newField.fieldInput === 'number' &&
    //         newField.fieldInput.toString().length <= parseInt(newField.maxLength));
  
    //     return isMaxLengthValidForNumber;
      case 'date':
        return (
          !isNaN(Date.parse(newField.fieldInput)) &&
          !isNaN(Date.parse(newField.startDate)) &&
          !isNaN(Date.parse(newField.endDate))
        );
      default:
        return true; 
    }
  };
  

  const handleAddField = () => {
    if(fields.length>=4){
        alert("Cannot Add More Fileds");
    }
    else{

        if (
            newField.displayName !== '' &&
            fields.length < 4 &&
            selectedFieldType !== '' &&
            isFieldInputValid()
            ) {
                
                if (selectedFieldType === 'date' && newField.dataType !== 'date') {
                    alert('Please choose "Date" as the Data Type when Field Type is Date.');
                    return;
        }
        
        if (newField.dataType === 'date') {
            const inputDate = new Date(newField.fieldInput);
            const startDate = new Date(newField.startDate);
            const endDate = new Date(newField.endDate);
      
            if (inputDate < startDate || inputDate > endDate) {
              alert('Please enter a date within the specified range.');
              return;
            }
        }
        
        addField({
            ...newField,
        type: selectedFieldType,
    });
    setNewField({
        displayName: '',
        dataType: '',
        maxLength: '',
        startDate: '',
        endDate: '',
        isMandatory: '',
        fieldInput: ''
    });
    setSelectedFieldType('');
} else {
    alert('(Field Input does not match with the selected data type) or (number/string should be in specified range)');
}
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const getValidationContent = (field) => {
    if (field.type === 'text') {
        return field.maxLength ? `Max Length: ${field.maxLength}` : '';
    } else if (field.type === 'date') {
        return field.startDate && field.endDate ? `Between ${field.startDate} and ${field.endDate}` : '';
    }else if (field.type === 'dropdown') {
        return 'NIL';
    }
    return ''; 
  };
  const confirmData = () => {
    setConfirmedData([...confirmedData, newField]);
    // variable+=1;
  };

  const resetFields = () => {
    resetField(); 
    setConfirmedData([]);
  };
  
  const handleAddFieldButtonClick = () => {
    setIsAddingField(true);
  };

  const handleCancelFieldAddition = () => {
    setIsAddingField(false);
    setSelectedFieldType('');
  };

  return (
    <div>
      <div className='category'>
        <div className="labelCategory">
            <label>Dynamic Data Collection</label>
        </div>
        <div className='optionsCategory'>
            <select onChange={handleCategoryChange} value={selectedCategory}>
             <option value=""> Select Category</option>
                <option value="student">Student</option>
                <option value="selfEmployee">Salaried</option>
                <option value="business">Business</option>
            </select>
        </div>
      </div>

      {selectedCategory && (
        <div className='addField'>
          <h3>Add Field</h3>
          {isAddingField ? (
            <>
              <button onClick={handleCancelFieldAddition}>Cancel</button>
              <select onChange={handleFieldTypeChange} value={selectedFieldType}>
                <option value="">Select Field Type</option>
                <option value="text">Text Box</option>
                <option value="dropdown">Drop-Down</option>
                <option value="date">Date Picker</option>
              </select>
            </>
          ) : (
            <button onClick={handleAddFieldButtonClick}>Add Field</button>
          )}
        </div>
      )}  

    {selectedFieldType === "text" && (
        <div className='dataEntry'>
            <table>
            <thead className='dataHead'>
                <tr >
                <th>Field Display Name</th>
                <th>Field Data Type</th>
                {selectedFieldType === 'text' && <th>Max Length</th>}
                <th>Is Mandatory</th>
                <th>Input Data</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>
                    <input
                    type="text"
                    name="displayName"
                    value={newField.displayName}
                    onChange={handleInputChange}
                    />
                </td>
                <td>
                    <select
                    name="dataType"
                    value={newField.dataType}
                    onChange={handleInputChange}
                    >
                    <option value="">Select Data Type</option>
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    </select>
                </td>
                {selectedFieldType === 'text' && (
                    <td>
                    <input
                        type="number"
                        name="maxLength"
                        value={newField.maxLength}
                        onChange={handleInputChange}
                    />
                    </td>
                )}
                <td>
                    <select
                    name="isMandatory"
                    value={newField.isMandatory}
                    onChange={handleInputChange}
                    >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    </select>
                </td>
                <td>
                    <input
                    type="text"
                    name="fieldInput"
                    value={newField.fieldInput}
                    onChange={handleInputChange}
                    />
                </td>
                <td>
                    <button onClick={handleAddField}>Confirm</button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
    )}



    {selectedFieldType === 'date' && (
        <div className='dataEntry'>
            <table>
            <thead>
                <tr>
                <th>Field Display Name</th>
                <th>Field Data Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Is Mandatory</th>
                <th>Input Data</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>
                    <input
                    type="text"
                    name="displayName"
                    value={newField.displayName}
                    onChange={handleInputChange}
                    />
                </td>
                <td>
                    <select
                    name="dataType"
                    value={newField.dataType}
                    onChange={handleInputChange}
                    >
                    <option value="">Select Data Type</option>
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    </select>
                </td>
                <td>
                    <input
                    type="date"
                    name="startDate"
                    value={newField.startDate}
                    onChange={handleInputChange}
                    />
                </td>
                <td>
                    <input
                    type="date"
                    name="endDate"
                    value={newField.endDate}
                    onChange={handleInputChange}
                    />
                </td>
                <td>
                    <select
                    name="isMandatory"
                    value={newField.isMandatory}
                    onChange={handleInputChange}
                    >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    </select>
                </td>
                <td>
                    <input
                    type="date"
                    name="fieldInput"
                    value={newField.fieldInput}
                    onChange={handleInputChange}
                    />
                </td>
                <td>
                    <button onClick={handleAddField}>Confirm</button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
    )}


    {selectedFieldType === 'dropdown' && (
        <div className='dataEntry'>
            <table>
            <thead>
                <tr>
                <th>Field Display Name</th>
                <th>Field Data Type</th>
                <th>Is Mandatory</th>
                <th>Input Data</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>
                    <input
                    type="text"
                    name="displayName"
                    value={newField.displayName}
                    onChange={handleInputChange}
                    />
                </td>
                <td>
                    <select
                    name="dataType"
                    value={newField.dataType}
                    onChange={handleInputChange}
                    >
                    <option value="">Select Data Type</option>
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    </select>
                </td>
                <td>
                    <select
                    name="isMandatory"
                    value={newField.isMandatory}
                    onChange={handleInputChange}
                    >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    </select>
                </td>
                <td>
                    <select
                    name="fieldInput"
                    value={newField.fieldInput}
                    onChange={handleInputChange}
                    >
                    <option value="">Select Option</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="CSE">CSE</option>
                    <option value="Mech">Mech</option>
                    <option value="EEE">EEE</option>
                    </select>
                </td>
                <td>
                    <button onClick={handleAddField}>Confirm</button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
    )}

    
    {fields.length > 0 && (
        <div className='tableDisplay'>
            <table>
            <thead>
                <tr className='addTitle'>
                <th colSpan="8">Added Fields</th>
                </tr>
                <tr className='addedFields'>
                <th>Sno</th>
                <th>Field Display Name</th>
                <th>Field Type</th>
                <th>Data Type</th>
                <th>Field Validation</th>
                <th>Is Mandatory</th>
                <th>Field Input</th>
                </tr>
            </thead>
            <tbody>
                {fields.map((field, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{field.displayName}</td>
                    <td>{field.type}</td>
                    <td>{field.dataType}</td>
                    <td>{getValidationContent(field)}</td>
                    <td>{field.isMandatory}</td>
                    <td>{field.fieldInput}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )}
        <div className='buttonsContainer'>
            <button onClick={() => {
                    confirmData();
                }}>
                Confirm
            </button>
            <button onClick={() => {
                    setNewField({
                        displayName: '',
                        dataType: '',
                        maxLength: '',
                        startDate: '',
                        endDate: '',
                        isMandatory: '',
                        fieldInput: ''
                    });
                    setSelectedFieldType('');
                    resetFields();
                }}>
                Reset
            </button>
        </div>

        {fields.length>3 && (<div className='retrieveData'>
        <h3>Retrieve Data</h3>
        <div className='categoryData'>
          <label>Department:</label>
          <select
            name="department"
            value={retrievalData.department}
            onChange={handleInputChange}
            className='selectRetrieve'
          >
            <option value="" className='options'>Select Department</option>
            <option value="IT">IT</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="MECH">MECH</option>
          </select>
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            value={retrievalData.mobileNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>DOB:</label>
          <input
            type="date"
            name="dob"
            value={retrievalData.dob}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Pincode:</label>
          <input
            type="text"
            name="pincode"
            value={retrievalData.pincode}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleRetrieveData}>Submit</button>
      </div>)}

      {retrievedData.length > 0 && (
        <div className='retrievedData'>
          <h3>Retrieved Data</h3>
          <table>
            <thead>
              <tr>
                <th>Field Display Name</th>
                <th>Field Type</th>
                <th>Data Type</th>
                <th>Field Input</th>
              </tr>
            </thead>
            <tbody>
              {retrievedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.displayName}</td>
                  <td>{data.type}</td>
                  <td>{data.dataType}</td>
                  <td>{data.fieldInput}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    
  );
};

const mapStateToProps = (state) => ({
  fields: state.fields,
});

const mapDispatchToProps = {
  addField,
  resetField,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDataPage);
