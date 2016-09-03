import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const TodoForm  = ({todo, levels, onSave, onChange, saving, errors}) => {
    return (
        <form>
            <h1>Todo</h1>
            <TextInput 
                name="target" 
                label="Target" 
                value={todo.target} 
                onChange={onChange} 
                error={errors.target} />

            <SelectInput 
                name="level" 
                label="Level" 
                value={todo.level} 
                defaultOption="Select Level" 
                options={levels} 
                onChange={onChange} 
                error={errors.level} />

            <input 
                type="submit"
                disabled={saving}
                value={saving? 'Saving...': 'Save'}
                onClick={onSave}
                className="btn btn-primary" />
                
        </form>
    );
};

TodoForm.propTypes = {
    todo: PropTypes.object.isRequired,
    levels: PropTypes.array,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object,
    saving: PropTypes.bool.isRequired
};

export default TodoForm;