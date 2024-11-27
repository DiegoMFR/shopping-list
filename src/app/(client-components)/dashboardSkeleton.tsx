const DashboardSkeleton: React.FC = async () => {
    const gridClasses = ['bg-indigo-500/75', 'rounded-md']

    return (
        <div className="grid grid-cols-8 auto-rows-max gap-4 content-center">
            {
                [...Array(4)].map(() => {
                    return (
                        <div key={Math.random()} className={`${gridClasses.join(' ')} col-span-2 rounded-md p-4 bg-indigo-900/50 overflow-hidden`}>
                            <div className="animate-pulse flex space-x-4 grow">
                                <div className="flex-1 space-y-2 py-4">
                                    <div className="h-4 bg-indigo-900 rounded-full w-32"></div>
                                    <div className="h-4 bg-indigo-900 rounded-full w-16"></div>
                                
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DashboardSkeleton;