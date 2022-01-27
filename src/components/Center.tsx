interface ICenter {
	children: React.ReactNode
}

const Center: React.FC<ICenter> = ({ children }) => {
	return <div style={{ display: 'grid', placeItems: 'center', height: 'calc(100vh - 64px)', fontSize: '26px' }}>{children}</div>
}

export default Center
