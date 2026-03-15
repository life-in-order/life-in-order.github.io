export default function ListItem() {
    return (
        <div
            className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black">
            <h2>Title</h2>
            <h3>Subtitle</h3>
            <div className="flex-col">
                <p>Why?</p>
                <p>Source</p>
            </div>
            <div className="flex-col">
                <h4>How?</h4>
                <li>Step 1</li>
                <li>Step 2</li>
                <li>Step 3</li>
            </div>
            <div className="flex">
                <p>What does it entail?</p>
                <a>Link to article</a>
            </div>
        </div>
    );
}