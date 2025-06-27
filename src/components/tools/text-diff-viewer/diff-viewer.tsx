import ReactDiff, {
  DiffMethod,
  type ReactDiffViewerProps,
} from "react-diff-viewer"

import "prismjs/components/prism-asciidoc"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-css"
import "prismjs/components/prism-csv"
import "prismjs/components/prism-dart"
import "prismjs/components/prism-elixir"
import "prismjs/components/prism-go"
import "prismjs/components/prism-haskell"
import "prismjs/components/prism-ini"
import "prismjs/components/prism-java"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-json"
import "prismjs/components/prism-kotlin"
import "prismjs/components/prism-lua"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-matlab"
import "prismjs/components/prism-perl"
import "prismjs/components/prism-properties"
import "prismjs/components/prism-python"
import "prismjs/components/prism-ruby"
import "prismjs/components/prism-rust"
import "prismjs/components/prism-scala"
import "prismjs/components/prism-sql"
import "prismjs/components/prism-swift"
import "prismjs/components/prism-textile"
import "prismjs/components/prism-toml"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-yaml"
import "./dracula-prism.css"

export function DiffViewer(props: ReactDiffViewerProps) {
  const {
    oldValue,
    newValue,
    splitView = true,
    hideLineNumbers = false,
    showDiffOnly = false,
    highlightLines = [],
    onLineNumberClick,
    renderContent,
    useDarkTheme = true,
    ...rest
  } = props

  return (
    <ReactDiff
      oldValue={oldValue}
      newValue={newValue}
      splitView={splitView}
      hideLineNumbers={hideLineNumbers}
      showDiffOnly={showDiffOnly}
      compareMethod={DiffMethod.WORDS}
      highlightLines={highlightLines}
      onLineNumberClick={onLineNumberClick}
      renderContent={renderContent}
      useDarkTheme={useDarkTheme}
      {...rest}
    />
  )
}
