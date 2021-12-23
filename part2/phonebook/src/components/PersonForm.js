import React from 'react'

const PersonForm = (props) => {

    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <div>
                    name:
                    <input
                        value={props.name.value}
                        onChange={props.name.onChange}
                    />
                </div>
                <div>
                    number:
                    <input
                        value={props.num.value}
                        onChange={props.num.onChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm