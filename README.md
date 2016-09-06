# Validol

Validol is an util that validates that object has defined props.

## Arguments

- object `Object`
- props `string || number || Object || Array`
- ?defaultValue

## Result

```javascript
{
	error: false || Error,
	result: Object,
	all: Bool,
	any: Bool
}
```

## Examples

```javascript
validol({myProp: 1}, 'myProp');
/*
returned: {
	error: false,
	result: { myProp: 1 },
	all: true,
	any: true
}
*/
```

```javascript
validol({}, 'myProp');
/*
returned: {
	error: false,
	result: { myProp: undefined },
	all: false,
	any: false
}
*/
```

```javascript
validol({}, 'myProp', null);
/*
returned: {
	error: false,
	result: { myProp: null },
	all: false,
	any: false
}
*/
```

```javascript
validol({
	myProp: 1,
	myProp2: 2
}, ["myProp", "myProp2"]);
/*
returned: {
	error: false,
	result: {
		myProp: 1,
		myProp2: 2
	},
	all: true,
	any: true
}
*/
```

```javascript
validol({
	myProp: 1
}, ["myProp", "myProp2"]);
/*
returned: {
	error: false,
	result: {
		myProp: 1,
		myProp2: undefined
	},
	all: false,
	any: true
}
*/
```

```javascript
validol({}, ["myProp", "myProp2"]);
/*
returned: {
	error: false,
	result: {
		myProp: undefined,
		myProp2: undefined
	},
	all: false,
	any: false
}
*/
```

```javascript
validol({
	myProp: {
		myProp2: 2
	}
}, {myProp: "myProp2"});
/*
returned: {
	error: false,
	result: {
		myProp: {
			myProp2: 2
		}
	},
	all: true,
	any: true
}
*/
```

```javascript
validol({
	myProp: 1
}, {myProp: "myProp2"});
/*
returned: {
	error: false,
	result: {
		myProp: { [Number: 1]
			myProp2: undefined
		}
	},
	all: false,
	any: true
}
*/
```

```javascript
validol({
	myProp: undefined
}, {myProp: "myProp2"});
/*
returned: {
	error: false,
	result: {
		myProp: {
			myProp2: undefined
		}
	},
	all: false,
	any: false
}
*/
```

```javascript
validol({
	myProp: null
}, {myProp: "myProp2"});
/*
returned: {
	error: false,
	result: {
		myProp: {
			myProp2: undefined
		}
	},
	all: false,
	any: true
}
*/
```

```javascript
validol({}, {myProp: "myProp2"});
/*
returned: {
	error: false,
	result: {
		myProp: {
			myProp2: undefined
		}
	},
	all: false,
	any: false
}
*/
```

```javascript
validol({
	myProp: {
		myProp2: 2,
		myProp3: 3
	}
}, {myProp: ["myProp2", "myProp3"]});
/*
returned: {
	error: false,
	result: {
		myProp: {
			myProp2: 2,
			myProp3: 3
		}
	},
	all: true,
	any: true
}
*/
```

```javascript
validol({
	myProp: {
		myProp2: 2
	}
}, {myProp: ["myProp2", "myProp3"]});
/*
returned: {
	error: false,
	result: {
		myProp: {
			myProp2: 2,
			myProp3: undefined
		}
	},
	all: false,
	any: true
}
*/
```

```javascript
validol({
	myProp: 1
}, {myProp: ["myProp2", "myProp3"]});
/*
returned: {
	error: false,
	result: {
		myProp: { [Number: 1]
			myProp2: undefined,
			myProp3: undefined
		}
	},
	all: false,
	any: true
}
*/
```

```javascript
validol({
	myProp: 1
}, {myProp: ["myProp2", "myProp3"]});
/*
returned: {
	error: false,
	result: {
		myProp: {
			myProp2: undefined,
			myProp3: undefined
		}
	},
	all: false,
	any: false
}
*/
```

```javascript
validol({}, {myProp: ["myProp2", "myProp3"]});
/*
returned: {
	error: false,
	result: {
		myProp: {
			myProp2: undefined,
			myProp3: undefined
		}
	},
	all: false,
	any: false
}
*/
```

```javascript
validol({
	myProp: {
		myProp2: {
			myProp4: 4
		},
		myProp3: 3
	}
}, {
	myProp: [
		{
			myProp2: "myProp4"
		},
		"myProp3"
	]
});
/*
returned: {
	error: false,
	result: {
		myProp: {
			myProp2: {
				myProp4: 4
			},
			myProp3: 3
		}
	},
	all: true,
	any: true
}
*/
```

```javascript
validol({
	myProp: {
		myProp2: 2,
		myProp3: 3
	}
}, {
	myProp: [
		{
			myProp2: "myProp4"
		},
		"myProp3"
	]
});
/*
returned: {
	error: false,
	result: {
		myProp: {
			myProp2: { [Number: 2]
				myProp4: undefined
			},
			myProp3: 3
		}
	},
	all: false,
	any: true }
*/
```

```javascript
validol({
	myProp: 1
}, {
	myProp: [
		{
			myProp2: "myProp4"
		},
		"myProp3"
	]
});
/*
returned: {
	error: false,
	result: {
		myProp: { [Number: 1]
			myProp2: {
				myProp4: undefined
			},
			myProp3: undefined
		}
	},
	all: false,
	any: true }
*/
```

```javascript
validol({
	myProp: {
		myProp2: {
			myProp4: {
				myProp5: 5
			}
		},
		myProp3: 3
	}
}, {
	myProp: [
		{
			myProp2: {
				myProp4: "myProp5"
			}
		},
		"myProp3"
	]
});
/*
returned: {
	error: false,
	result: {
		myProp: {
			myProp2: {
				myProp4: {
					myProp5: 5
				}
			},
			myProp3: 3
		}
	},
  all: true,
  any: true
}
*/
```

```javascript
validol({
	myProp:{
		myProp2: 2,
		myProp3: 3
	}
}, {
	myProp: [
		{
			myProp2: {
				myProp4: "myProp5"
			}
		},
		"myProp3"
	]
});
/*
returned: {
	error: false,
	result: {
		myProp: {
			myProp2: { [Number: 2]
				myProp4: {
					myProp5: undefined
				}
			},
			myProp3: 3
		}
	},
	all: false,
	any: true
}
*/
```

```javascript
validol({}, {
	myProp: [
		{myProp2:
			{
				myProp4: "myProp5"
			}
		},
		"myProp3"
	]
}, null);
/*
returned: {
	error: false,
	result: {
		myProp: {
			myProp2: {
				myProp4: {
					myProp5: null
				}
			},
			myProp3: null
		}
	},
	all: false,
	any: false
}
*/
```

```javascript
validol({}, {
	myProp: [
		{myProp2:
			{
				myProp4: "myProp5"
			}
		},
		"myProp3"
	]
}, true);
/*
returned: {
	error: false,
	result: {
		myProp: {
			myProp2: {
				myProp4: {
					myProp5: true
				}
			},
			myProp3: true
		}
	},
	all: false,
	any: false
}
*/
```

```javascript
validol({}, {
	myProp: [
		{myProp2:
			{
				myProp4: "myProp5"
			}
		},
		"myProp3"
	]
}, 1);
/*
returned: {
	error: false,
	result: {
		myProp: {
			myProp2: {
				myProp4: {
					myProp5: 1
				}
			},
			myProp3: 1
		}
	},
	all: false,
	any: false
}
*/
```

```javascript
validol({}, {
	myProp: [
		{myProp2:
			{
				myProp4: "myProp5"
			}
		},
		"myProp3"
	]
}, "a");
/*
returned: {
	error: false,
	result: {
		myProp: {
			myProp2: {
				myProp4: {
					myProp5: "a"
				}
			},
			myProp3: "a"
		}
	},
	all: false,
	any: false
}
*/
```

```javascript
validol({}, {
	myProp: [
		{myProp2:
			{
				myProp4: "myProp5"
			}
		},
		"myProp3"
	]
}, ["a", "b"]);
/*
returned: {
	error: false,
	result: {
		myProp: {
			myProp2: {
				myProp4: {
					myProp5: ["a", "b"]
				}
			},
			myProp3: ["a", "b"]
		}
	},
	all: false,
	any: false
}
*/
```

```javascript
validol({}, {
	myProp: [
		{myProp2:
			{
				myProp4: "myProp5"
			}
		},
		"myProp3"
	]
}, { a: 1 });
/*
returned: {
	error: false,
	result: {
		myProp: {
			myProp2: {
				myProp4: {
					myProp5: { a: 1 }
				}
			},
			myProp3: { a: 1 }
		}
	},
	all: false,
	any: false
}
*/
```

```javascript
validol();
/*
returned: {
	error: Error("object argument is not valid!"),
	result: undefined,
	all: false,
	any: false
}
*/
```

```javascript
validol({}, true);
/*
returned: {
	error: Error("props argument is not valid!"),
	result: {},
	all: false,
	any: false
}
*/
```
