---
name: test-case
description: 编写测试用例、运行测试、单元测试、集成测试、E2E测试、测试覆盖率、修复测试失败、Jest、Vitest、Mocha、Playwright、Cypress
metadata:
  language: JavaScript/TypeScript
  audience: developers
---

## What I do

我帮助编写、运行和维护JavaScript/TypeScript项目的测试用例，包括单元测试、集成测试和E2E测试。

## When to use me

- 需要为新功能编写测试用例
- 需要运行现有测试并分析结果
- 需要修复失败的测试
- 需要优化测试覆盖率
- 需要建立测试规范和最佳实践

## Testing Framework Guidelines

根据项目现有配置使用对应的测试框架：

- **Vitest**: 使用 `describe`, `it`, `expect` 语法
- **Jest**: 使用 `describe`, `it`, `expect` 语法
- **Mocha**: 使用 `describe`, `it` 配合 `chai` 断言
- **Playwright**: 用于E2E测试
- **Cypress**: 用于E2E测试

## Test File Conventions

- 测试文件应放在 `__tests__`, `.test.ts`, `.spec.ts` 或 `tests/` 目录中
- 文件名格式: `{filename}.test.ts` 或 `{filename}.spec.ts`
- 测试文件应与源文件放在一起，或集中在 `tests/` 目录

## Writing Tests

### 单元测试结构

```typescript
describe('ModuleName', () => {
  describe('functionName', () => {
    it('should do something specific', () => {
      // Arrange
      const input = ...
      
      // Act
      const result = functionName(input)
      
      // Assert
      expect(result).toBe(...)
    })
    
    it('should handle error case', () => {
      expect(() => functionName(invalidInput)).toThrow()
    })
  })
})
```

### 测试最佳实践

1. **AAA模式**: Arrange(准备) -> Act(执行) -> Assert(断言)
2. **测试名称**: 使用描述性名称，说明测试场景和预期结果
3. **独立性**: 每个测试应该独立运行，不依赖其他测试
4. **单一职责**: 每个测试只验证一个行为
5. **模拟依赖**: 使用 mock 隔离外部依赖

## Running Tests

- 运行所有测试: `npm test` 或 `pnpm test`
- 运行特定文件: `npm test -- --testPathPattern=filename`
- 监听模式: `npm test -- --watch`
- 生成覆盖率: `npm test -- --coverage`

## Test Coverage

- 目标: 保持80%以上的语句覆盖率
- 重点覆盖: 核心业务逻辑、边界条件、错误处理
- 定期检查覆盖率报告，识别未测试的代码

## Debugging Failed Tests

1. 查看测试输出中的错误信息
2. 使用 `console.log` 或调试器检查中间状态
3. 检查测试的 Arrange 阶段是否正确设置
4. 确认被测代码是否发生了预期变化
