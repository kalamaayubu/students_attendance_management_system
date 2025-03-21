'use client'

import { useState } from "react"

const { QueryClientProvider, QueryClient } = require("@tanstack/react-query")

const ReactQueryProvider = ({children}) => {
    const [queryClient] = useState(() => new QueryClient())
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ReactQueryProvider