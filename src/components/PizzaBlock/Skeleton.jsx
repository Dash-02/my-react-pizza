import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonLoad = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="410" y="325" rx="0" ry="0" width="139" height="71" /> 
    <circle cx="134" cy="136" r="125" />
    <rect x="0" y="272" rx="10" ry="10" width="280" height="28" /> 
    <rect x="0" y="322" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="433" rx="10" ry="10" width="95" height="30" /> 
    <rect x="128" y="426" rx="23" ry="23" width="152" height="45" />
  </ContentLoader>
)

export default SkeletonLoad