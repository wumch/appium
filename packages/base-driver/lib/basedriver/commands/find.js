// Override the following function for your own driver, and the rest is taken
// care of!

// async (strategy, selector, mult, context) {}
//   strategy: locator strategy
//   selector: the actual selector for finding an element
//   mult: multiple elements or just one?
//   context: finding an element from the root context? or starting from another element
//
// Returns an object which adheres to the way the JSON Wire Protocol represents elements:
// { ELEMENT: # }    eg: { ELEMENT: 3 }  or { ELEMENT: 1.023 }

export class FindCommands {
  async findElOrElsWithProcessing (strategy, selector, mult, context) {
    this.validateLocatorStrategy(strategy);
    try {
      return await this.findElOrEls(strategy, selector, mult, context);
    } catch (err) {
      if (this.opts.printPageSourceOnFindFailure) {
        const src = await this.getPageSource();
        this.log.debug(`Error finding element${mult ? 's' : ''}: ${err.message}`);
        this.log.debug(`Page source requested through 'printPageSourceOnFindFailure':`);
        this.log.debug(src);
      }
      // still want the error to occur
      throw err;
    }
  }

  async findElement (strategy, selector) {
    return await this.findElOrElsWithProcessing(strategy, selector, false);
  }

  async findElements (strategy, selector) {
    return await this.findElOrElsWithProcessing(strategy, selector, true);
  }

  async findElementFromElement (strategy, selector, elementId) {
    return await this.findElOrElsWithProcessing(strategy, selector, false, elementId);
  }

  async findElementsFromElement (strategy, selector, elementId) {
    return await this.findElOrElsWithProcessing(strategy, selector, true, elementId);
  }

}
