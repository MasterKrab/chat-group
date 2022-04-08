const createHandleFocusLeaveElement = (callback: () => void) => (e: FocusEvent) => {
	const currentTarget = e.currentTarget as HTMLElement

	!currentTarget.contains(e.relatedTarget as Node) && callback()
}

export default createHandleFocusLeaveElement
