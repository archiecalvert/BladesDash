

export function Animator() {
    
    const [listnerer, setListener] = useState(null)

    useEffect(() => {
        setListener(document.createEvent("AnimationEvent"))
        
    }, [])
}