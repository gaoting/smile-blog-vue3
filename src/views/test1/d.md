简介：
职责：
1. 数据转换
2. 数据验证

PipeTransform：管道必须实现的接口
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export interface PipeTransform <T = any , R=any > {
  transform(value: T, metadata: ArgumentMetadata): R   // value为请求传来的参数
}
● value<T> 输入参数，T为参数类型
● metadata<ArgumentMetadata> value的元数据，包括参数来源、类型等
● R 为输出参数类型

元数据：又称中介数据、中继数据，主要是描述数据属性的信息（关于数据的组织、数据域及其关系的信息），用来支持如指示存储位置、历史数据、资源查找、文件记录等功能。算电子式目录。
创建管道
// 自动在src下创建pipes文件夹，同时生成 validation.pipe.ts文件
nest g pipe validation pipes

// 需安装2个依赖包
yarn add class-validator class-transformer -S

















