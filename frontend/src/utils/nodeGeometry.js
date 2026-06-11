const safeSelector = (value) => String(value || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');

export const getNodeElement = (nodeId, root = document) => {
  if (!nodeId || typeof document === 'undefined') return null;
  return root.querySelector(`[data-node-id="${safeSelector(nodeId)}"]`);
};

export const getNodeRect = (nodeId, relativeTo, root = document) => {
  const element = getNodeElement(nodeId, root);
  if (!element) return null;
  const rect = element.getBoundingClientRect();
  if (!relativeTo) return rect;
  const parentRect = relativeTo.getBoundingClientRect();
  return {
    left: rect.left - parentRect.left + relativeTo.scrollLeft,
    top: rect.top - parentRect.top + relativeTo.scrollTop,
    right: rect.right - parentRect.left + relativeTo.scrollLeft,
    bottom: rect.bottom - parentRect.top + relativeTo.scrollTop,
    width: rect.width,
    height: rect.height,
  };
};

export const getConnectorStartPoint = (sourceRect) => ({
  x: sourceRect.right,
  y: sourceRect.top + sourceRect.height / 2,
});

export const getConnectorEndPoint = (targetRect) => ({
  x: targetRect.left,
  y: targetRect.top + targetRect.height / 2,
});

export const createCurvePath = (start, end) => {
  const distance = Math.max(80, Math.abs(end.x - start.x) * 0.45);
  const c1 = { x: start.x + distance, y: start.y };
  const c2 = { x: end.x - distance, y: end.y };
  return `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`;
};

export const getInteractionTargetNodeId = (interaction) => {
  if (!interaction) return null;
  if (interaction.targetType === 'page') return `page-target-${interaction.targetPageId}`;
  if (interaction.targetType === 'section') return interaction.targetSectionId;
  if (interaction.targetType === 'node') return interaction.targetNodeId;
  return `external-target-${interaction.id}`;
};

export const pointFromClient = (position, relativeTo) => {
  if (!position || !relativeTo) return null;
  const rect = relativeTo.getBoundingClientRect();
  return {
    x: position.x - rect.left + relativeTo.scrollLeft,
    y: position.y - rect.top + relativeTo.scrollTop,
  };
};
