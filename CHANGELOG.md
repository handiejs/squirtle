# 更新日志

## 0.0.6 (2022-05-23)

### 缺陷/优化

- 移除 `DialogViewButtonActionWidget`，使用 `ButtonActionWidget`、`LinkActionWidget` 或 `IconActionWidget` 替代；
- 视图部件 `FormDialogViewWidget` 支持修改数据场景，并可通过配置项 `moduleLabel` 根据新增还是修改数据动态拼接对话框标题。