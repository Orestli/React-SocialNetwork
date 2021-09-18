<<<<<<< HEAD:src/components/Profile/ProfileStatusWithHooks.tsx
import React, {useEffect, useState} from "react";
import '../main.css'

type PSWHType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PSWHType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: any) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}><b>Status:</b> {props.status || '---'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange} autoFocus={true} value={status} onBlur={deactivateEditMode} />
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;
=======
import React, {useEffect, useState} from "react";
import '../main.css'

const ProfileStatusWithHooks = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    // if (prevProps.status !== this.props.status) {
    //     this.setState({
    //         status: this.props.status
    //     })
    // }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}><b>Status:</b> {props.status || '---'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange} autoFocus={true} value={status} onBlur={deactivateEditMode} />
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;
>>>>>>> 2168b5cfc8651cef8a12db09eeb1fd0403ebda77:src/components/Profile/ProfileStatusWithHooks.js
