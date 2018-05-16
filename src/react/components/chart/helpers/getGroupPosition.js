const getGroupPosition = (nodes = []) => {
  // console.log("- - - get position - - -");
  // console.log("nodes", nodes);

  if (!nodes.length) return { width: 0, height: 0 };

  const position = (() => {
    const { innerHeight: windowHeight, innerWidth: windowWidth } = window;
    // const { width = 0, height = 0, x: minLeft = 0, y: minTop = 0 } = rootNode
    //   ? rootNode.getBoundingClientRect(rootNode)
    //   : {};

    return {
      maxLeft: windowHeight * -1, // 0,
      maxTop: windowHeight * -1, // 0,
      minTop: windowHeight,
      // right: windowWidth * -1,
      // bottom: windowHeight * -1,
      minLeft: windowWidth
    };
  })();

  // let minTop = 0;
  // let right = 0;
  // let bottom = 0;
  // let minLeft = 0;

  // const nodes = groupNode.querySelectorAll("circle");
  // const nodes = groupNode.querySelectorAll(".xui-measure");

  nodes.forEach(node => {
    const {
      width = 0,
      height = 0,
      x: minLeft = 0,
      y: minTop = 0
    } = node.getBBox(); // getBBox(); // getBoundingClientRect
    // console.log(node, box);
    // const right = minLeft + width;
    // const bottom = minTop + height;

    position.maxLeft = Math.max(width + minLeft, position.maxLeft);
    position.maxTop = Math.max(height + minTop, position.maxTop);
    position.minTop = Math.min(minTop, position.minTop);
    // position.right = Math.max(right, position.right);
    // position.bottom = Math.max(bottom, position.bottom);
    position.minLeft = Math.min(minLeft, position.minLeft);

    // console.log("\n\n");
    // console.log(
    //   `width = "${width}", height = "${height}", minTop = "${minTop}", minLeft = "${minLeft}"`
    // );
    // console.log("\n\n");
  });

  // console.log("***", position);

	const { maxLeft, maxTop, minTop, minLeft } = position;

	return {
		width: maxLeft - minLeft,
		height: maxTop - minTop
	};

  // console.log("- - - done - - -");
};

export default getGroupPosition;
