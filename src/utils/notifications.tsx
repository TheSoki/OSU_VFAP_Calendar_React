import toast from 'react-hot-toast'

enum NotificationTypeValues {
    'ERROR' = 'ERROR',
    'WARNING' = 'WARNING',
    'INFORMATIONAL' = 'INFORMATIONAL',
    'SUCCESS' = 'SUCCESS',
}

export type NotificationTypeValuesType = keyof typeof NotificationTypeValues

const getNotificationColor = (type: NotificationTypeValuesType) => {
    switch (type) {
        case NotificationTypeValues.ERROR:
            return '#C6394A'
        case NotificationTypeValues.WARNING:
            return '#E6BD19'
        case NotificationTypeValues.INFORMATIONAL:
            return '#2C9DCE'
        case NotificationTypeValues.SUCCESS:
            return '#1EA966'
    }
}

export const pushNotification = (props: { message: string; type: NotificationTypeValuesType }) => {
    const toastId = toast(
        <div className="flex justify-between items-start">
            <span className="flex flex-col">
                <p className="font-bold text-base lowercase first-letter:uppercase">{props.type}</p>
                <p className="mt-1">{props.message}</p>
            </span>

            <span className="ml-2">
                <button type="button" className="mt-1" onClick={() => toast.dismiss(toastId)}>
                    <img
                        src="/cross.svg"
                        style={{
                            color: '#9CA3AF',
                            transform: 'scale(2)',
                        }}
                    />
                </button>
            </span>
        </div>,
        {
            duration: 5000,
            style: {
                borderLeft: '6px solid',
                borderColor: getNotificationColor(props.type),
                padding: '0.5rem',
            },
            ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            },
        }
    )
}
