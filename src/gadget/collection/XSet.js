/*! *****************************************************************************
利用 Set 定义一个实用函数库，实现集合的并、差、交、对称差、笛卡尔积和幂集运算。

在实现这些操作时，考虑了以下几个方面：
1、某些 Set 操作是有关联性的，因此最好让实现的方法能支持处理任意多个集合实例；
2、Set 保留插入顺序，所有方法返回的集合必须保证顺序；
3、尽可能高效地使用内存。扩展操作符的语法很简洁，但尽可能避免集合和数组间的相互转换能够节省对象初始化成本；
4、不要修改已有的集合实例。union(a, b)或 a.union(b)应该返回包含结果的新集合实例；

定义了一个子类继承于 Set，在这个子类上实现了静态方法，然后在这个子类的实例方法中使用这些静态方法。
参考：JavaScript高级程序设计（第四版）
***************************************************************************** */

class XSet extends Set {
  // 并集
  union(...sets) {
    return XSet.union(this, ...sets);
  }

  // 交集
  intersection(...sets) {
    return XSet.intersection(this, ...sets);
  }

  // 差集
  difference(set) {
    return XSet.difference(this, set);
  }

  // 对称差集
  symmetricDifference(set) {
    return XSet.symmetricDifference(this, set);
  }

  // 笛卡尔积
  cartesianProduct(set) {
    return XSet.cartesianProduct(this, set);
  }

  // 幂集
  powerSet() {
    return XSet.powerSet(this);
  }

  // 返回两个或更多集合的并集
  static union(a, ...bSets) {
    const unionSet = new XSet(a);
    for (const b of bSets) {
      for (const bValue of b) {
        unionSet.add(bValue);
      }
    }
    return unionSet;
  }

  // 返回两个或更多集合的交集
  static intersection(a,...bSets) {
    const intersectionSet = new XSet(a);
    for (const aValue of intersectionSet) {
      for (const b of bSets) {
        if (!b.has(aValue)) {
          intersectionSet.delete(aValue);
        }
      }
    }
    return intersectionSet;
  }

  // 返回两个集合的差集(a - b)。
  // 一般地，记A和B是两个集合，则所有属于A且不属于B的元素构成的集合,叫做集合A和集合B的差集。
  static difference(a, b) {
    const differenceSet = new XSet(a);
    for (const bValue of b) {
      if (a.has(bValue)) {
        differenceSet.delete(bValue)
      }
    }
    return differenceSet;
  }

  // 返回两个集合的对称差集。
  // 一般地，记A和B是两个集合，集合A与集合B的对称差集定义为集合A与集合B中所有不属于A∩B的元素的集合，记为A Δ B，
  // 也就是说A Δ B = {x|x∈A∪B,x∉A∩B}，即A Δ B=(A∪B)-(A∩B)。也就是A Δ B=(A-B)∪(B-A)
  static symmetricDifference(a, b) {
    // 根据定义，对称差集可以表达为(A∪B)-(A∩B)
    return a.union(b).difference(a.intersection(b));
  }

  // 返回两个集合（数组对形式）的笛卡尔积。
  // 必须返回数组集合，因为笛卡尔积可能包含相同值的对
  static cartesianProduct(a, b) {
    const cartesianSet = new XSet();
    // 迭代顺序也有要求，这里返回的是a x b
    for (const aValue of a) {
      for (const bValue of b) {
        cartesianSet.add([aValue, bValue]);
      }
    }
    return cartesianSet;
  }

  // 返回一个集合的幂集。
  // 设X是一个非空集合，由X的一切子集(包括空集,X自身)为元素形成的集合称为X的幂集。
  static powerSet(a) {
    const powerSet = new XSet().add(new XSet());
    for (const aValue of a) {
      // set是引用传递，所以这里和下面都是new了新的XSet，摆脱了和之前引用的关系
      for (const set of new XSet(powerSet)) {
        powerSet.add(new XSet(set).add(aValue));
      }
    }
    return powerSet;
  }
}

// test
const a = new XSet().add(1).add(2);
const powerSetA = a.powerSet();
console.log(powerSetA);
