import { CodeBlock } from 'react-code-block';

function MyCodeBlock({ children, className }) {
  return (
    <CodeBlock code={children} language="js">
      <CodeBlock.Code className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <CodeBlock.LineContent>
          <CodeBlock.Token />
        </CodeBlock.LineContent>
      </CodeBlock.Code>
    </CodeBlock>
  );
}


export default MyCodeBlock;