# MForum M论坛
技术栈
springboot + mybatis + thymeleaf + BootStrap + Es + fastDFS + redis

论坛功能
- 登陆
- 注册 (用户需要验证邮箱才能使用账号,注册系统会发送验证邮件)
- 敏感词过滤 采用字典树过滤敏感词
- 发帖子 
- 帖子展示
- 评论功能
- 评分功能
- 统一异常处理
- 统一日志处理
- 点赞功能  
- 管理员功能 开发中 。。。
- redis优化
    - redis存储验证码 (原先存在Session中)
    - redis存登陆凭证 (原先直接查数据库)
    - redis存缓存信息 
- 缓存
  - 优先从缓存中取值
  - 取不到值时初始化缓存
  - 数据变更时,清除去缓存