export const Tabs = ({ value, onValueChange, children }: any) => <div className="space-y-4">{children}</div>
export const TabsList = ({ children, className }: any) => <div className={`flex gap-2 ${className}`}>{children}</div>
export const TabsTrigger = ({ value, children, className, ...props }: any) => <button data-state={props['data-state']} className={className}>{children}</button>
export const TabsContent = ({ value, children }: any) => <div>{children}</div>